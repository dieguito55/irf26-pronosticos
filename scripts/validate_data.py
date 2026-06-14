from __future__ import annotations

from common import DATA_DIR, GROUP_IDS, read_json, GROUP_TEAMS


def validate_participants() -> list[str]:
    errors: list[str] = []
    participants = read_json(DATA_DIR / "participants.json")
    for participant in participants:
        predictions = participant.get("predictions", {})
        missing = [group for group in GROUP_IDS if group not in predictions]
        if missing:
            errors.append(f"{participant.get('name')} no tiene grupos: {', '.join(missing)}")
        for group in GROUP_IDS:
            values = predictions.get(group, [])
            if len(values) != 2:
                errors.append(f"{participant.get('name')} debe tener 2 selecciones en grupo {group}")
        total_predictions = sum(len(predictions.get(group, [])) for group in GROUP_IDS)
        if total_predictions != 24:
            errors.append(f"{participant.get('name')} tiene {total_predictions} pronósticos, se esperaban 24")
    return errors


def validate_standings() -> list[str]:
    errors: list[str] = []
    standings = read_json(DATA_DIR / "standings.json")
    groups = {group.get("id"): group for group in standings.get("groups", [])}
    for group_id in GROUP_IDS:
        group = groups.get(group_id)
        if not group:
            errors.append(f"Falta grupo {group_id} en standings.json")
            continue
        table = group.get("table", [])
        if len(table) != 4:
            errors.append(f"Grupo {group_id} debe tener 4 selecciones")
        
        expected_teams = GROUP_TEAMS.get(group_id, set())
        actual_teams = {team.get("team") for team in table}
        mismatched = actual_teams - expected_teams
        if mismatched:
            errors.append(f"Grupo {group_id} contiene selecciones inválidas: {', '.join(mismatched)}")

        if len(group.get("topTwo", [])) != 2:
            errors.append(f"Grupo {group_id} debe tener topTwo con 2 selecciones")
    return errors


def main() -> None:
    errors = [*validate_participants(), *validate_standings()]
    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        raise SystemExit(1)
    print("Datos públicos válidos.")


if __name__ == "__main__":
    main()
