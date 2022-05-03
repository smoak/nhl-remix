import { GameTeam, GameType } from "~/types";

export type PlayoffSeriesSummaryProps = {
  readonly homeTeam: GameTeam;
  readonly awayTeam: GameTeam;
  readonly gameType: GameType;
};

type UseSeriesSummaryTextOptions = {
  readonly homeTeam: GameTeam;
  readonly awayTeam: GameTeam;
};

const useSeriesSummaryText = ({
  homeTeam,
  awayTeam,
}: UseSeriesSummaryTextOptions): string => {
  const homeTeamWins = homeTeam.leagueRecord.wins;
  const awayTeamWins = awayTeam.leagueRecord.wins;

  const isTied = homeTeamWins === awayTeamWins;
  const isHomeTeamLeading = homeTeamWins > awayTeamWins;
  const isHomeTeamWinner = homeTeamWins === 4;
  const isAwayTeamWinner = awayTeamWins === 4;

  if (isTied) {
    return `Series ${homeTeamWins}-${awayTeamWins}`;
  }

  if (isHomeTeamWinner) {
    return `${homeTeam.team.abbreviation} wins ${homeTeamWins}-${awayTeamWins}`;
  }

  if (isAwayTeamWinner) {
    return `${awayTeam.team.abbreviation} wins ${awayTeamWins}-${homeTeamWins}`;
  }

  if (isHomeTeamLeading) {
    return `${homeTeam.team.abbreviation} leads ${homeTeamWins}-${awayTeamWins}`;
  }

  return `${awayTeam.team.abbreviation} leads ${awayTeamWins}-${homeTeamWins}`;
};

export const PlayoffSeriesSummary = ({
  awayTeam,
  gameType,
  homeTeam,
}: PlayoffSeriesSummaryProps) => {
  const seriesSummaryText = useSeriesSummaryText({ homeTeam, awayTeam });
  if (gameType !== "P") {
    return null;
  }

  return (
    <span className="mt-3 block text-center text-xs font-semibold capitalize">
      {seriesSummaryText}
    </span>
  );
};
