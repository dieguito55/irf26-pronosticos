from __future__ import annotations

import json
import re
import unicodedata
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "public" / "data"
GROUP_IDS = tuple("ABCDEFGHIJKL")
PERU_TZ = ZoneInfo("America/Lima")

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

TEAM_ALIASES = {
    "Mexico": "México",
    "South Africa": "Sudáfrica",
    "Korea Republic": "República de Corea",
    "Republic of Korea": "República de Corea",
    "South Korea": "República de Corea",
    "Korea Rep.": "República de Corea",
    "Czechia": "República Checa",
    "Czech Republic": "República Checa",
    "Czech Rep.": "República Checa",
    "Canada": "Canadá",
    "Switzerland": "Suiza",
    "Bosnia & Herzegovina": "Bosnia y Herzegovina",
    "Bosnia and Herzegovina": "Bosnia y Herzegovina",
    "Bosnia-Herzegovina": "Bosnia y Herzegovina",
    "USA": "Estados Unidos",
    "United States": "Estados Unidos",
    "United States of America": "Estados Unidos",
    "USMNT": "Estados Unidos",
    "Ivory Coast": "Costa de Marfil",
    "Côte d'Ivoire": "Costa de Marfil",
    "Cote d'Ivoire": "Costa de Marfil",
    "Cote d Ivoire": "Costa de Marfil",
    "Netherlands": "Países Bajos",
    "The Netherlands": "Países Bajos",
    "Holland": "Países Bajos",
    "DR Congo": "República Democrática del Congo",
    "Congo DR": "República Democrática del Congo",
    "Democratic Republic of the Congo": "República Democrática del Congo",
    "DRC": "República Democrática del Congo",
    "Curacao": "Curazao",
    "Curaçao": "Curazao",
    "Sweden": "Suecia",
    "Scotland": "Escocia",
    "Turkey": "Turquía",
    "Turkiye": "Turquía",
    "Türkiye": "Turquía",
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
    "France": "Francia",
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


def _alias_key(name: str) -> str:
    ascii_name = unicodedata.normalize("NFKD", name.strip()).encode("ascii", "ignore").decode("ascii")
    normalized = ascii_name.lower().replace("&", " and ")
    normalized = re.sub(r"[^a-z0-9]+", " ", normalized)
    return re.sub(r"\s+", " ", normalized).strip()


TEAM_ALIAS_INDEX = {
    _alias_key(team): team
    for teams in GROUP_TEAMS.values()
    for team in teams
}
TEAM_ALIAS_INDEX.update({_alias_key(alias): canonical for alias, canonical in TEAM_ALIASES.items()})


def normalize_team_name(name: str) -> str:
    trimmed = name.strip()
    return TEAM_ALIAS_INDEX.get(_alias_key(trimmed), trimmed)


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
            group=str(payload.get("group", "")).replace("Grupo ", "").replace("Group ", "").strip().upper(),
            home_team=normalize_team_name(str(payload.get("homeTeam", payload.get("home_team", "")))),
            away_team=normalize_team_name(str(payload.get("awayTeam", payload.get("away_team", "")))),
            home_score=int(payload.get("homeScore", payload.get("home_score", 0))),
            away_score=int(payload.get("awayScore", payload.get("away_score", 0))),
            status=str(payload.get("status", "")).lower(),
            stage=str(payload.get("stage", "group")).lower(),
            round=int(payload.get("round", 1)),
        )
