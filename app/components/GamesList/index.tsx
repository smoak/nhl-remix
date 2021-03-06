import { Link } from "remix";
import { ScheduleGame } from "~/types";
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
          return (
            <Link prefetch="intent" to={`/game/${gamePk}`} key={gamePk}>
              <GameCard
                status={status}
                startTime={gameDate}
                homeTeam={homeTeam}
                awayTeam={awayTeam}
                linescore={linescore}
                gameType={gameType}
                seriesStatusShort={seriesSummary?.seriesStatusShort ?? ""}
              />
            </Link>
          );
        }
      )}
    </div>
  );
};
