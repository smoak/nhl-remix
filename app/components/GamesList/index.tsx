import { Link } from "@remix-run/react";
import type { ScheduleGame } from "~/api/types";
import { GameCard } from "~/components/GameCard";

export type GamesListProps = {
  readonly games: ScheduleGame[];
};

type GamesListFunction = (props: GamesListProps) => JSX.Element;
export const GamesList: GamesListFunction = ({ games }) => {
  if (games.length === 0) {
    return (
      <div className="grid grid-cols-auto-fill gap-5">
        <h1 className="mt-9 text-center text-3xl font-bold md:col-span-4">
          No games today
        </h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-auto-fill gap-5">
      {games.map(
        ({
          gamePk,
          gameDate,
          gameType,
          linescore,
          teams,
          seriesSummary,
          status,
        }) => {
          const homeTeam = {
            id: teams.home.team.id,
            name: teams.home.team.teamName,
            score: teams.home.score,
            record: teams.home.leagueRecord,
            abbreviation: teams.home.team.abbreviation,
          };
          const awayTeam = {
            id: teams.away.team.id,
            name: teams.away.team.teamName,
            score: teams.away.score,
            record: teams.away.leagueRecord,
            abbreviation: teams.away.team.abbreviation,
          };
          const game = {
            id: gamePk,
            startTime: gameDate,
            homeTeam,
            awayTeam,
            isCurrentlyInProgress: status.abstractGameState === "Live",
          };
          return (
            <Link prefetch="intent" to={`/game/${gamePk}`} key={gamePk}>
              <GameCard
                status={status}
                linescore={linescore}
                gameType={gameType}
                game={game}
                seriesStatusShort={seriesSummary?.seriesStatusShort ?? ""}
              />
            </Link>
          );
        }
      )}
    </div>
  );
};
