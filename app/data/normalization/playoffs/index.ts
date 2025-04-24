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
} from "~/components/types";

const normalizePlayoffMatchup = ({
  bottomSeedWins,
  bottomSeedTeam,
  topSeedWins,
  topSeedTeam,
  winningTeamId,
  losingTeamId,
  seriesAbbrev,
}: LivePlayoffSeries): PlayoffMatchup => {
  return {
    highSeed: {
      abbrev: topSeedTeam.abbrev,
      id: topSeedTeam.id,
      logo: topSeedTeam.logo,
      name: topSeedTeam.name.default,
      seriesWins: topSeedWins,
    },
    lowSeed: {
      abbrev: bottomSeedTeam.abbrev,
      id: bottomSeedTeam.id,
      logo: bottomSeedTeam.logo,
      name: bottomSeedTeam.name.default,
      seriesWins: bottomSeedWins,
    },
    winsRequired: 7,
    id: seriesAbbrev,
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

  // Convert to sorted array
  return {
    rounds: Object.entries(grouped)
      .sort(([roundA], [roundB]) => Number(roundA) - Number(roundB))
      .map(([round, series]) => normalizePlayoffRound({ round, series })),
  };
};
