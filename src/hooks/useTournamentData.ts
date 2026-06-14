import { useEffect, useMemo, useState } from "react";
import { loadTournamentData, type TournamentPayload } from "../services/data";
import type { EnrichedParticipantScore } from "../types/tournament";
import { buildRanking, enrichRanking, validateParticipantShape } from "../utils/scoring";

interface TournamentState {
  data: TournamentPayload | null;
  ranking: EnrichedParticipantScore[];
  loading: boolean;
  error: string | null;
}

export const useTournamentData = (): TournamentState => {
  const [data, setData] = useState<TournamentPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    loadTournamentData()
      .then((payload) => {
        if (!active) return;
        const invalidParticipant = payload.participants.find((participant) => !validateParticipantShape(participant));
        if (invalidParticipant) {
          throw new Error(`Datos incompletos para ${invalidParticipant.name}`);
        }
        setData(payload);
      })
      .catch((unknownError: unknown) => {
        if (!active) return;
        setError(unknownError instanceof Error ? unknownError.message : "Error inesperado al cargar datos.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const ranking = useMemo(() => {
    if (!data) return [];
    const computed = buildRanking(data.participants, data.standings.groups, data.tournament.lastSuccessfulUpdate);
    const source = computed;
    return enrichRanking(data.participants, data.standings.groups, source);
  }, [data]);

  return { data, ranking, loading, error };
};
