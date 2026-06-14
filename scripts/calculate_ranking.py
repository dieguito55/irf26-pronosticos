from __future__ import annotations

from typing import Any

from common import DATA_DIR, GROUP_IDS, normalize_team_name, now_peru, read_json, write_json


def score_prediction(predicted: list[str], top_two: list[str]) -> int:
    normalized_top_two = {normalize_team_name(team) for team in top_two}
    return sum(1 for team in predicted if normalize_team_name(team) in normalized_top_two)


def calculate_ranking(participants: list[dict[str, Any]], standings: dict[str, Any]) -> dict[str, Any]:
    groups = {group["id"]: group for group in standings.get("groups", [])}
    entries = []
    updated_at = now_peru().isoformat()

    for participant in participants:
        total_points = 0
        perfect_groups = 0
        for group_id in GROUP_IDS:
            predicted = participant["predictions"][group_id]
            group_data = groups[group_id]
            # Un grupo solo otorga puntos si se ha jugado al menos un partido en él.
            total_played = sum(team.get("played", 0) for team in group_data.get("table", []))
            if total_played > 0:
                top_two = group_data["topTwo"]
                points = score_prediction(predicted, top_two)
            else:
                points = 0
            total_points += points
            if points == 2:
                perfect_groups += 1
        entries.append(
            {
                "participantId": participant["id"],
                "totalPoints": total_points,
                "hits": total_points,
                "perfectGroups": perfect_groups,
                "movement": 0,
                "isTied": False,
                "updatedAt": updated_at,
            }
        )

    entries.sort(key=lambda item: (-item["totalPoints"], -item["perfectGroups"], item["participantId"]))
    for index, entry in enumerate(entries):
        first_same_score = next(i for i, item in enumerate(entries) if item["totalPoints"] == entry["totalPoints"])
        tied_count = sum(1 for item in entries if item["totalPoints"] == entry["totalPoints"])
        entry["position"] = first_same_score + 1
        entry["isTied"] = tied_count > 1

    return {"lastUpdated": updated_at, "status": "provisional", "entries": entries}


def main() -> None:
    participants = read_json(DATA_DIR / "participants.json")
    standings = read_json(DATA_DIR / "standings.json")
    write_json(DATA_DIR / "ranking.json", calculate_ranking(participants, standings))


if __name__ == "__main__":
    main()
