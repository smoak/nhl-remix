import { GameType } from "~/types";

type Team = {
  readonly abbreviation: string;
  readonly wins: number;
};

export type PlayoffSeriesSummaryProps = {
  readonly homeTeam: Team;
  readonly awayTeam: Team;
  readonly gameType: GameType;
};

type UseSeriesSummaryTextOptions = {
  readonly homeTeam: Team;
  readonly awayTeam: Team;
};

const useSeriesSummaryText = ({
  homeTeam,
  awayTeam,
}: UseSeriesSummaryTextOptions): string => {
  const homeTeamWins = homeTeam.wins;
  const awayTeamWins = awayTeam.wins;

  const isTied = homeTeamWins === awayTeamWins;
  const isHomeTeamLeading = homeTeamWins > awayTeamWins;
  const isHomeTeamWinner = homeTeamWins === 4;
  const isAwayTeamWinner = awayTeamWins === 4;

  if (isTied) {
    return `Series ${homeTeamWins}-${awayTeamWins}`;
  }

  if (isHomeTeamWinner) {
    return `${homeTeam.abbreviation} wins ${homeTeamWins}-${awayTeamWins}`;
  }

  if (isAwayTeamWinner) {
    return `${awayTeam.abbreviation} wins ${awayTeamWins}-${homeTeamWins}`;
  }

  if (isHomeTeamLeading) {
    return `${homeTeam.abbreviation} leads ${homeTeamWins}-${awayTeamWins}`;
  }

  return `${awayTeam.abbreviation} leads ${awayTeamWins}-${homeTeamWins}`;
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
