import type { PlayoffMatchupTeam, PlayoffSeries, Playoffs } from "~/api/types";
import type { Matchup, PlayoffBracket, PlayoffTeam } from "~/components/types";

type NormalizePlayoffMatchupTeam = (
  team: PlayoffMatchupTeam,
  abbrev: string
) => PlayoffTeam;
const normalizePlayoffMatchupTeam: NormalizePlayoffMatchupTeam = (
  team,
  abbrev
) => ({
  abbrev,
  id: team.team.id,
  seriesLosses: team.seriesRecord.losses,
  seriesWins: team.seriesRecord.wins,
});

type NormalizeSeries = (series: PlayoffSeries) => Matchup;
const normalizeSeries: NormalizeSeries = ({
  conference,
  currentGame,
  names,
  round,
  seriesCode,
  matchupTeams,
  seriesNumber,
}) => {
  const id = currentGame.seriesSummary.gamePk?.toString() ?? "todo";
  const seriesSummary = currentGame.seriesSummary.seriesStatusShort;
  const topMatchupTeam = matchupTeams?.find((mt) => mt.seed.isTop);
  const bottomMatchupTeam = matchupTeams?.find((mt) => !mt.seed.isTop);
  const topTeam = topMatchupTeam
    ? normalizePlayoffMatchupTeam(topMatchupTeam, names.teamAbbreviationA)
    : undefined;
  const bottomTeam = bottomMatchupTeam
    ? normalizePlayoffMatchupTeam(bottomMatchupTeam, names.teamAbbreviationB)
    : undefined;

  return {
    id,
    bottomTeam,
    seriesSummary,
    topTeam,
  };
};

type NormalizePlayoffs = (playoffs: Playoffs) => PlayoffBracket;
export const normalizePlayoffs: NormalizePlayoffs = ({ rounds }) => {
  const firstRound = rounds[0].series;
  const secondRound = rounds[1].series;
  const thirdRound = rounds[2].series;
  console.log(secondRound);

  const eastern = {
    1: {
      matchups: firstRound
        .filter((s) => s.conference.id === 6)
        .map(normalizeSeries),
    },
    2: {
      matchups: secondRound
        .filter((s) => s.conference.id === 6)
        .map(normalizeSeries),
    },
    3: {
      matchups: thirdRound
        .filter((s) => s.conference.id === 6)
        .map(normalizeSeries),
    },
  };

  const western = {
    1: {
      matchups: firstRound
        .filter((s) => s.conference.id === 5)
        .map(normalizeSeries),
    },
    2: {
      matchups: secondRound
        .filter((s) => s.conference.id === 5)
        .map(normalizeSeries),
    },
    3: {
      matchups: thirdRound
        .filter((s) => s.conference.id === 5)
        .map(normalizeSeries),
    },
  };

  // we need to fill any missing

  const finalRound = normalizeSeries(rounds[3].series[0]);

  return {
    eastern,
    finalRound,
    western,
  };
};
