import { describe, expect, it } from "vitest";
import type { GroupStanding, Participant } from "../types/tournament";
import { buildRanking, normalizeTeamName, scoreGroupPrediction, validateParticipantShape } from "../utils/scoring";

const participant = (id: string, name: string, firstGroup: [string, string]): Participant => ({
  id,
  name,
  predictions: {
    A: firstGroup,
    B: ["Canadá", "Suiza"],
    C: ["Brasil", "Marruecos"],
    D: ["Estados Unidos", "Paraguay"],
    E: ["Alemania", "Ecuador"],
    F: ["Países Bajos", "Japón"],
    G: ["Bélgica", "Egipto"],
    H: ["España", "Uruguay"],
    I: ["Francia", "Noruega"],
    J: ["Argentina", "Austria"],
    K: ["Portugal", "Colombia"],
    L: ["Inglaterra", "Ghana"]
  }
});

const startedTable: GroupStanding["table"] = [
  {
    position: 1,
    team: "Equipo de prueba",
    played: 1,
    won: 1,
    drawn: 0,
    lost: 0,
    goalsFor: 1,
    goalsAgainst: 0,
    goalDifference: 1,
    points: 3
  }
];

const standings: GroupStanding[] = [
  {
    id: "A",
    name: "Grupo A",
    topTwo: ["México", "Sudáfrica"],
    table: startedTable
  },
  ...(["B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"] as const).map((id) => ({
    id,
    name: `Grupo ${id}`,
    topTwo: participant("seed", "Seed", ["México", "Sudáfrica"]).predictions[id],
    table: startedTable
  }))
];

describe("scoreGroupPrediction", () => {
  it("suma 2 puntos cuando hay dos aciertos", () => {
    expect(scoreGroupPrediction(["México", "Sudáfrica"], ["México", "Sudáfrica"])).toBe(2);
  });

  it("suma 1 punto cuando hay un acierto", () => {
    expect(scoreGroupPrediction(["México", "República de Corea"], ["México", "Sudáfrica"])).toBe(1);
  });

  it("suma 0 puntos cuando no hay aciertos", () => {
    expect(scoreGroupPrediction(["Canadá", "Suiza"], ["México", "Sudáfrica"])).toBe(0);
  });

  it("no depende del orden primero/segundo", () => {
    expect(scoreGroupPrediction(["Sudáfrica", "México"], ["México", "Sudáfrica"])).toBe(2);
  });
});

describe("buildRanking", () => {
  it("mantiene posiciones compartidas cuando hay empate", () => {
    const result = buildRanking(
      [
        participant("P01", "Uno", ["México", "Sudáfrica"]),
        participant("P02", "Dos", ["Sudáfrica", "México"]),
        participant("P03", "Tres", ["México", "Corea"])
      ],
      standings,
      "2026-06-14T00:35:00-05:00"
    );

    expect(result[0].position).toBe(1);
    expect(result[1].position).toBe(1);
    expect(result[2].position).toBe(3);
    expect(result[0].isTied).toBe(true);
  });
});

describe("normalización y validación", () => {
  it("normaliza nombres de selecciones frecuentes en APIs", () => {
    expect(normalizeTeamName("South Korea")).toBe("República de Corea");
    expect(normalizeTeamName("USA")).toBe("Estados Unidos");
  });

  it("detecta datos incompletos", () => {
    const invalid = participant("P04", "Inválido", ["México", "Sudáfrica"]);
    invalid.predictions.A = ["México"] as unknown as [string, string];
    expect(validateParticipantShape(invalid)).toBe(false);
  });
});
