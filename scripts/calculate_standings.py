from __future__ import annotations

from collections import defaultdict
from typing import Any

from common import DATA_DIR, GROUP_IDS, Match, now_peru, read_json, write_json, GROUP_TEAMS


def _empty_team(team: str) -> dict[str, Any]:
    return {
        "team": team,
        "played": 0,
        "won": 0,
        "drawn": 0,
        "lost": 0,
        "goalsFor": 0,
        "goalsAgainst": 0,
        "goalDifference": 0,
        "points": 0,
    }


def calculate_group_standings(matches: list[Match], existing_standings: dict[str, Any]) -> dict[str, Any]:
    # Always initialize with the correct official teams to clean up any historical bad data
    teams_by_group: dict[str, dict[str, dict[str, Any]]] = {}
    for group_id, teams in GROUP_TEAMS.items():
        teams_by_group[group_id] = {team: _empty_team(team) for team in teams}

    finished_group_matches = [
        match
        for match in matches
        if match.stage == "group" and match.status in {"finished", "final", "ft"}
    ]

    for match in finished_group_matches:
        home_team = match.home_team
        away_team = match.away_team

        # Resolve group using home team membership
        detected_group = None
        for gid, teams in GROUP_TEAMS.items():
            if home_team in teams:
                detected_group = gid
                break

        if not detected_group:
            print(f"Advertencia: Selección local '{home_team}' no pertenece a ningún grupo oficial. Omitiendo partido.")
            continue

        if away_team not in GROUP_TEAMS[detected_group]:
            print(f"Advertencia: Selección visitante '{away_team}' no pertenece al mismo grupo que '{home_team}' ({detected_group}). Omitiendo partido.")
            continue

        group_table = teams_by_group[detected_group]
        home = group_table[home_team]
        away = group_table[away_team]

        home["played"] += 1
        away["played"] += 1
        home["goalsFor"] += match.home_score
        home["goalsAgainst"] += match.away_score
        away["goalsFor"] += match.away_score
        away["goalsAgainst"] += match.home_score

        if match.home_score > match.away_score:
            home["won"] += 1
            away["lost"] += 1
            home["points"] += 3
        elif match.home_score < match.away_score:
            away["won"] += 1
            home["lost"] += 1
            away["points"] += 3
        else:
            home["drawn"] += 1
            away["drawn"] += 1
            home["points"] += 1
            away["points"] += 1

    groups = []
    for group_id in GROUP_IDS:
        table = []
        for item in teams_by_group[group_id].values():
            item["goalDifference"] = item["goalsFor"] - item["goalsAgainst"]
            table.append(item)
        table.sort(key=lambda item: (-item["points"], -item["goalDifference"], -item["goalsFor"], item["team"]))
        ranked_table = [{**item, "position": index + 1} for index, item in enumerate(table)]
        groups.append(
            {
                "id": group_id,
                "name": f"Grupo {group_id}",
                "topTwo": [team["team"] for team in ranked_table[:2]],
                "table": ranked_table,
            }
        )

    return {
        "lastUpdated": now_peru().astimezone().isoformat(),
        "timezone": "America/Lima",
        "status": "in_progress",
        "groups": groups,
    }


def main() -> None:
    manual = read_json(DATA_DIR / "manual-results.json")
    existing = read_json(DATA_DIR / "standings.json")
    matches = [Match.from_payload(item) for item in manual.get("matches", [])]
    write_json(DATA_DIR / "standings.json", calculate_group_standings(matches, existing))


if __name__ == "__main__":
    main()
