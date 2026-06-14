from __future__ import annotations

import json
import urllib.error
import urllib.request
from abc import ABC, abstractmethod
from typing import Any

from calculate_ranking import calculate_ranking
from calculate_standings import calculate_group_standings
from common import DATA_DIR, Match, now_peru, read_json, write_json
from validate_data import validate_participants, validate_standings

OPENFOOTBALL_RESULTS_URL = "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json"


class FootballDataProvider(ABC):
    @abstractmethod
    def fetch_matches(self) -> list[Match]:
        raise NotImplementedError


class OpenFootballDataProvider(FootballDataProvider):
    def fetch_matches(self) -> list[Match]:
        request = urllib.request.Request(
            OPENFOOTBALL_RESULTS_URL,
            headers={
                "Accept": "application/json",
                "User-Agent": "irf26-pronosticos/1.0 (+https://github.com/dieguito55/irf26-pronosticos)",
            },
        )
        with urllib.request.urlopen(request, timeout=30) as response:
            payload = response.read().decode("utf-8")

        data: dict[str, Any] = json.loads(payload)
        matches = parse_openfootball_matches(data)
        print(f"Fuente publica: {OPENFOOTBALL_RESULTS_URL}")
        print(f"Partidos finalizados de fase de grupos encontrados: {len(matches)}")
        for match in matches:
            print(
                f"- Grupo {match.group}: {match.home_team} {match.home_score}-"
                f"{match.away_score} {match.away_team}"
            )
        return matches


def parse_openfootball_matches(data: dict[str, Any]) -> list[Match]:
    matches: list[Match] = []

    for item in data.get("matches", []):
        group = str(item.get("group", ""))
        if not group.startswith("Group "):
            continue

        score = item.get("score")
        full_time_score = score.get("ft") if isinstance(score, dict) else None
        if not isinstance(full_time_score, list) or len(full_time_score) < 2:
            continue

        matches.append(
            Match.from_payload(
                {
                    "group": group.replace("Group ", ""),
                    "homeTeam": item.get("team1", ""),
                    "awayTeam": item.get("team2", ""),
                    "homeScore": full_time_score[0],
                    "awayScore": full_time_score[1],
                    "status": "finished",
                    "stage": "group",
                    "round": str(item.get("round", "1")).replace("Matchday", "").strip() or 1,
                }
            )
        )

    return matches


class ManualFallbackProvider(FootballDataProvider):
    def fetch_matches(self) -> list[Match]:
        manual = read_json(DATA_DIR / "manual-results.json")
        return [Match.from_payload(item) for item in manual.get("matches", [])]


def update_tournament(matches: list[Match], existing: dict[str, Any]) -> dict[str, Any]:
    if not matches:
        return existing

    processed_matches = len(
        [match for match in matches if match.stage == "group" and match.status in {"finished", "final", "ft"}]
    )
    current_round = min(3, max(1, ((processed_matches - 1) // 24) + 1)) if processed_matches else 1
    now = now_peru()

    rounds = []
    for round_info in existing.get("rounds", []):
        round_id = int(round_info["id"])
        start = (round_id - 1) * 24
        round_processed = max(0, min(24, processed_matches - start))
        status = "completed" if round_processed == 24 else "in_progress" if round_processed > 0 else "pending"
        rounds.append({**round_info, "processedMatches": round_processed, "status": status})

    status = "finished" if processed_matches >= int(existing.get("totalMatches", 72)) else "in_progress"
    return {
        **existing,
        "status": status,
        "currentRound": current_round,
        "processedMatches": processed_matches,
        "lastUpdated": now.astimezone().isoformat(),
        "lastSuccessfulUpdate": now.isoformat(),
        "updateStatus": "finalized" if status == "finished" else "updated",
        "rounds": rounds,
    }


def main() -> None:
    provider: FootballDataProvider = OpenFootballDataProvider()
    try:
        matches = provider.fetch_matches()
        if not matches:
            raise RuntimeError("La fuente publica no devolvio partidos finalizados.")
    except (RuntimeError, urllib.error.URLError, TimeoutError, ValueError) as error:
        print(f"Usando fallback manual: {error}")
        matches = ManualFallbackProvider().fetch_matches()
        if not matches:
            print("Fallback manual vacío. Se conservan los JSON confirmados.")

    initial_errors = validate_participants()
    if initial_errors:
        print("\n".join(initial_errors))
        raise SystemExit(1)

    existing_standings = read_json(DATA_DIR / "standings.json")
    standings = calculate_group_standings(matches, existing_standings)
    write_json(DATA_DIR / "standings.json", standings)

    participants = read_json(DATA_DIR / "participants.json")
    ranking = calculate_ranking(participants, standings)
    write_json(DATA_DIR / "ranking.json", ranking)

    tournament = update_tournament(matches, read_json(DATA_DIR / "tournament.json"))
    write_json(DATA_DIR / "tournament.json", tournament)

    final_errors = [*validate_participants(), *validate_standings()]
    if final_errors:
        print("\n".join(final_errors))
        raise SystemExit(1)


if __name__ == "__main__":
    main()
