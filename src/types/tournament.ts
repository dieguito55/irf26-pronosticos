export const groupIds = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"] as const;

export type GroupId = (typeof groupIds)[number];
export type TournamentStatus = "before_start" | "in_progress" | "update_error" | "finished";
export type RoundStatus = "pending" | "in_progress" | "completed";

export interface Participant {
  id: string;
  name: string;
  predictions: Record<GroupId, [string, string]>;
}

export interface TeamStanding {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface GroupStanding {
  id: GroupId;
  name: string;
  topTwo: [string, string];
  table: TeamStanding[];
}

export interface StandingsData {
  lastUpdated: string;
  timezone: string;
  status: TournamentStatus;
  groups: GroupStanding[];
}

export interface RoundInfo {
  id: number;
  name: string;
  description: string;
  status: RoundStatus;
  startsAt: string;
  endsAt: string;
  processedMatches: number;
  totalMatches: number;
}

export interface TournamentData {
  name: string;
  competition: string;
  phase: string;
  status: TournamentStatus;
  currentRound: number;
  totalRounds: number;
  processedMatches: number;
  totalMatches: number;
  participants: number;
  groups: number;
  maxPoints: number;
  lastUpdated: string;
  lastSuccessfulUpdate: string;
  nextUpdate: string;
  updateStatus: "updated" | "live" | "finalized" | "error";
  rounds: RoundInfo[];
  messages: Record<"beforeStart" | "inProgress" | "updateError" | "finished" | "empty", string>;
}

export interface ParticipantScore {
  participantId: string;
  position: number;
  totalPoints: number;
  hits: number;
  perfectGroups: number;
  movement: number;
  isTied: boolean;
  updatedAt: string;
}

export interface RankingData {
  lastUpdated: string;
  status: "provisional" | "final";
  entries: ParticipantScore[];
}

export interface GroupPredictionScore {
  groupId: GroupId;
  predicted: [string, string];
  topTwo: [string, string];
  points: 0 | 1 | 2;
}

export interface EnrichedParticipantScore extends ParticipantScore {
  participant: Participant;
  groupsWithOneHit: number;
  groupsWithZeroHits: number;
  groupScores: GroupPredictionScore[];
}
