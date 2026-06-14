import type { Participant, RankingData, StandingsData, TournamentData } from "../types/tournament";
import { publicUrl } from "../utils/publicUrl";

const fetchJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`No se pudo cargar ${path}`);
  }
  return (await response.json()) as T;
};

export interface TournamentPayload {
  participants: Participant[];
  standings: StandingsData;
  tournament: TournamentData;
  ranking: RankingData;
}

export const loadTournamentData = async (): Promise<TournamentPayload> => {
  const [participants, standings, tournament, ranking] = await Promise.all([
    fetchJson<Participant[]>(publicUrl("data/participants.json")),
    fetchJson<StandingsData>(publicUrl("data/standings.json")),
    fetchJson<TournamentData>(publicUrl("data/tournament.json")),
    fetchJson<RankingData>(publicUrl("data/ranking.json"))
  ]);

  return { participants, standings, tournament, ranking };
};
