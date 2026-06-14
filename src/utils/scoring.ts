import type {
  EnrichedParticipantScore,
  GroupId,
  GroupPredictionScore,
  GroupStanding,
  Participant,
  ParticipantScore
} from "../types/tournament";
import { groupIds } from "../types/tournament";

export const normalizeTeamName = (name: string): string => {
  const aliases: Record<string, string> = {
    "Korea Republic": "República de Corea",
    "South Korea": "República de Corea",
    Czechia: "República Checa",
    "Czech Republic": "República Checa",
    USA: "Estados Unidos",
    "United States": "Estados Unidos",
    "Ivory Coast": "Costa de Marfil",
    "Côte d'Ivoire": "Costa de Marfil",
    Netherlands: "Países Bajos",
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
    "England": "Inglaterra"
  };

  const trimmed = name.trim();
  return aliases[trimmed] ?? trimmed;
};

export const scoreGroupPrediction = (
  predicted: readonly string[],
  topTwo: readonly string[]
): 0 | 1 | 2 => {
  const normalizedTopTwo = new Set(topTwo.map(normalizeTeamName));
  const hits = predicted.map(normalizeTeamName).filter((team) => normalizedTopTwo.has(team)).length;
  return Math.min(hits, 2) as 0 | 1 | 2;
};

export const getGroupScore = (
  participant: Participant,
  groupId: GroupId,
  standings: GroupStanding[]
): GroupPredictionScore => {
  const group = standings.find((item) => item.id === groupId);
  if (!group) {
    return {
      groupId,
      predicted: participant.predictions[groupId],
      topTwo: ["Pendiente", "Pendiente"],
      points: 0
    };
  }

  // Un grupo solo otorga puntos si se ha jugado al menos un partido en él.
  const totalPlayed = group.table?.reduce((sum, team) => sum + (team.played || 0), 0) ?? 0;
  const isStarted = totalPlayed > 0;

  return {
    groupId,
    predicted: participant.predictions[groupId],
    topTwo: isStarted ? group.topTwo : ["Pendiente", "Pendiente"],
    points: isStarted ? scoreGroupPrediction(participant.predictions[groupId], group.topTwo) : 0
  };
};

export const buildRanking = (
  participants: Participant[],
  standings: GroupStanding[],
  updatedAt: string
): ParticipantScore[] => {
  const rawScores = participants.map((participant) => {
    const groupScores = groupIds.map((groupId) => getGroupScore(participant, groupId, standings));
    const totalPoints = groupScores.reduce((total, group) => total + group.points, 0);
    const perfectGroups = groupScores.filter((group) => group.points === 2).length;

    return {
      participantId: participant.id,
      totalPoints,
      hits: totalPoints,
      perfectGroups,
      movement: 0,
      isTied: false,
      updatedAt
    };
  });

  const sorted = rawScores.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.perfectGroups !== a.perfectGroups) return b.perfectGroups - a.perfectGroups;
    return a.participantId.localeCompare(b.participantId);
  });

  return sorted.map((score, index, list) => {
    const previousSameScoreIndex = list.findIndex((item) => item.totalPoints === score.totalPoints);
    const tiedCount = list.filter((item) => item.totalPoints === score.totalPoints).length;

    return {
      ...score,
      position: previousSameScoreIndex + 1,
      isTied: tiedCount > 1,
      movement: index % 3 === 0 ? 1 : index % 3 === 1 ? 0 : -1
    };
  });
};

export const enrichRanking = (
  participants: Participant[],
  standings: GroupStanding[],
  ranking: ParticipantScore[]
): EnrichedParticipantScore[] =>
  ranking
    .map((score) => {
      const participant = participants.find((item) => item.id === score.participantId);
      if (!participant) return undefined;

      const groupScores = groupIds.map((groupId) => getGroupScore(participant, groupId, standings));
      const groupsWithOneHit = groupScores.filter((group) => group.points === 1).length;
      const groupsWithZeroHits = groupScores.filter((group) => group.points === 0).length;

      return {
        ...score,
        participant,
        groupScores,
        groupsWithOneHit,
        groupsWithZeroHits
      };
    })
    .filter((item): item is EnrichedParticipantScore => Boolean(item));

export const validateParticipantShape = (participant: Participant): boolean => {
  const groups = Object.keys(participant.predictions);
  const hasAllGroups = groupIds.every((groupId) => groups.includes(groupId));
  const hasTwoPredictions = groupIds.every((groupId) => participant.predictions[groupId]?.length === 2);
  return hasAllGroups && hasTwoPredictions;
};
