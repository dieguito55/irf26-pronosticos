import { describe, expect, it } from "vitest";
import type { TournamentData } from "../types/tournament";

const messages: TournamentData["messages"] = {
  beforeStart: "Los resultados estarán disponibles cuando comiencen los partidos.",
  inProgress: "Clasificación provisional.",
  updateError: "No se pudo obtener una nueva actualización. Se muestran los últimos datos confirmados.",
  finished: "Resultados definitivos de la fase de grupos.",
  empty: "Aún no hay datos confirmados para mostrar."
};

describe("mensajes de estado", () => {
  it("incluye estado antes del inicio", () => {
    expect(messages.beforeStart).toContain("comiencen");
  });

  it("incluye estado de error de actualización", () => {
    expect(messages.updateError).toContain("últimos datos confirmados");
  });

  it("incluye estado de fase finalizada", () => {
    expect(messages.finished).toContain("definitivos");
  });
});
