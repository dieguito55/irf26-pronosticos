from __future__ import annotations

import json
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "public" / "data"
GROUP_IDS = tuple("ABCDEFGHIJKL")
PERU_TZ = ZoneInfo("America/Lima")

TEAM_ALIASES = {
    "Mexico": "México",
    "South Africa": "Sudáfrica",
    "Korea Republic": "República de Corea",
    "South Korea": "República de Corea",
    "Czechia": "República Checa",
    "Czech Republic": "República Checa",
    "Canada": "Canadá",
    "Switzerland": "Suiza",
    "Bosnia & Herzegovina": "Bosnia y Herzegovina",
    "USA": "Estados Unidos",
    "United States": "Estados Unidos",
    "Ivory Coast": "Costa de Marfil",
    "Côte d'Ivoire": "Costa de Marfil",
    "Netherlands": "Países Bajos",
    "DR Congo": "República Democrática del Congo",
    "Bosnia-Herzegovina": "Bosnia y Herzegovina",
    "Curacao": "Curazao",
    "Curaçao": "Curazao",
    "Sweden": "Suecia",
    "Scotland": "Escocia",
    "Turkey": "Turquía",
    "New Zealand": "Nueva Zelanda",
    "Cape Verde": "Cabo Verde",
    "Saudi Arabia": "Arabia Saudita",
    "Algeria": "Argelia",
    "Jordan": "Jordania",
    "Panama": "Panamá",
    "Croatia": "Croacia",
    "Belgium": "Bélgica",
    "Egypt": "Egipto",
    "Iran": "Irán",
    "Brazil": "Brasil",
    "Morocco": "Marruecos",
    "Haiti": "Haití",
    "Germany": "Alemania",
    "Japan": "Japón",
    "Tunisia": "Túnez",
    "Spain": "España",
    "Norway": "Noruega",
    "Uzbekistan": "Uzbekistán",
    "England": "Inglaterra",
}

GROUP_TEAMS = {
    "A": {"México", "Sudáfrica", "República de Corea", "República Checa"},
    "B": {"Canadá", "Suiza", "Bosnia y Herzegovina", "Qatar"},
    "C": {"Brasil", "Marruecos", "Haití", "Escocia"},
    "D": {"Estados Unidos", "Paraguay", "Turquía", "Australia"},
    "E": {"Alemania", "Ecuador", "Costa de Marfil", "Curazao"},
    "F": {"Países Bajos", "Japón", "Suecia", "Túnez"},
    "G": {"Bélgica", "Egipto", "Irán", "Nueva Zelanda"},
    "H": {"España", "Uruguay", "Arabia Saudita", "Cabo Verde"},
    "I": {"Francia", "Noruega", "Senegal", "Iraq"},
    "J": {"Argentina", "Argelia", "Austria", "Jordania"},
    "K": {"Portugal", "Colombia", "República Democrática del Congo", "Uzbekistán"},
    "L": {"Inglaterra", "Ghana", "Croacia", "Panamá"},
}



def normalize_team_name(name: str) -> str:
    return TEAM_ALIASES.get(name.strip(), name.strip())


def read_json(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as file:
        return json.load(file)


def write_json(path: Path, data: Any) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def now_peru() -> datetime:
    return datetime.now(PERU_TZ)


@dataclass(frozen=True)
class Match:
    group: str
    home_team: str
    away_team: str
    home_score: int
    away_score: int
    status: str
    stage: str = "group"
    round: int = 1

    @classmethod
    def from_payload(cls, payload: dict[str, Any]) -> "Match":
        return cls(
            group=str(payload.get("group", "")).replace("Grupo ", "").strip().upper(),
            home_team=normalize_team_name(str(payload.get("homeTeam", payload.get("home_team", "")))),
            away_team=normalize_team_name(str(payload.get("awayTeam", payload.get("away_team", "")))),
            home_score=int(payload.get("homeScore", payload.get("home_score", 0))),
            away_score=int(payload.get("awayScore", payload.get("away_score", 0))),
            status=str(payload.get("status", "")).lower(),
            stage=str(payload.get("stage", "group")).lower(),
            round=int(payload.get("round", 1)),
        )
