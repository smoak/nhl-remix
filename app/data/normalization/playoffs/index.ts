import {
  isLivePlayoffSeries,
  LivePlayoffSeries,
  PlayoffBracketResponse,
  PlayoffBracketSeries,
} from "~/api/types";
import {
  PlayoffBracket,
  PlayoffMatchup,
  PlayoffRound,
  PlayoffTeam,
} from "~/components/types";

type DetermineMatchupWinnerOptions = {
  readonly highSeed: PlayoffTeam;
  readonly lowSeed: PlayoffTeam;
  readonly winningTeamId?: number;
};
const determineMatchupWinner = ({
  highSeed,
  lowSeed,
  winningTeamId,
}: DetermineMatchupWinnerOptions) => {
  if (!winningTeamId) {
    return;
  }

  const highSeedWon = winningTeamId === highSeed.id;

  if (highSeedWon) {
    return highSeed;
  }

  return lowSeed;
};

const normalizePlayoffMatchup = ({
  bottomSeedWins,
  bottomSeedTeam,
  topSeedWins,
  topSeedTeam,
  winningTeamId,
  seriesAbbrev,
}: LivePlayoffSeries): PlayoffMatchup => {
  const highSeed: PlayoffTeam = {
    abbrev: topSeedTeam.abbrev,
    id: topSeedTeam.id,
    logo: topSeedTeam.logo,
    name: topSeedTeam.name.default,
    seriesWins: topSeedWins,
  };
  const lowSeed: PlayoffTeam = {
    abbrev: bottomSeedTeam.abbrev,
    id: bottomSeedTeam.id,
    logo: bottomSeedTeam.logo,
    name: bottomSeedTeam.name.default,
    seriesWins: bottomSeedWins,
  };
  const winner = determineMatchupWinner({ highSeed, lowSeed, winningTeamId });

  return {
    highSeed,
    lowSeed,
    winsRequired: 7,
    id: seriesAbbrev,
    winner,
  };
};

type NormalizePlayoffRoundOptions = {
  readonly round: string;
  readonly series: PlayoffBracketSeries[];
};
const normalizePlayoffRound = ({
  round,
  series,
}: NormalizePlayoffRoundOptions): PlayoffRound => {
  const roundNumber = Number(round);

  if (series.some(isLivePlayoffSeries)) {
    return {
      hasStarted: true,
      matchups: series.filter(isLivePlayoffSeries).map(normalizePlayoffMatchup),
      round: roundNumber,
    };
  }

  return {
    hasStarted: false,
    matchups: [],
    round: Number(round),
  };
};

export const normalizePlayoffRounds = ({
  series,
}: PlayoffBracketResponse): PlayoffBracket => {
  const grouped = series.reduce<Record<number, PlayoffBracketSeries[]>>(
    (acc, series) => {
      if (!acc[series.playoffRound]) {
        acc[series.playoffRound] = [];
      }

      acc[series.playoffRound].push(series);

      return acc;
    },
    {},
  );

  return {
    rounds: Object.entries(grouped)
      .sort(([roundA], [roundB]) => Number(roundA) - Number(roundB))
      .map(([round, series]) => normalizePlayoffRound({ round, series })),
  };
};
