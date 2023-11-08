import { CurrentGameStatus } from "~/components/CurrentGameStatus";
import { TeamScore } from "~/components/TeamScore";
import { PlayoffSeriesSummary } from "../PlayoffSeriesSummary";
import { isLiveGame, type Game } from "../types";
import { TeamInfo } from "../TeamInfo";

export type GameCardProps = {
  readonly game: Game;
};

export const GameCard = ({ game }: GameCardProps) => {
  const isScheduledGame = game.status.abstract === "Preview";

  return (
    <article className="flex h-36 rounded-lg border border-nhl-black">
      <div className="flex w-full flex-col">
        <div className="flex p-8">
          <TeamInfo
            isGameInProgress={isLiveGame(game)}
            isGoaliePulled={false}
            isOnPowerPlay={false}
            teamAbbrev={game.homeTeam.abbreviation}
            teamName={game.homeTeam.name}
          />
          <div className="mt-3 flex flex-1">
            <TeamScore
              score={game.homeTeam.score}
              isScheduledGame={isScheduledGame}
            />
            <p className="flex-1 whitespace-nowrap px-3 pt-1.5 text-center uppercase">
              <CurrentGameStatus game={game} />
              <PlayoffSeriesSummary
                seriesStatusShort={game.seriesStatusShort}
              />
            </p>
            <TeamScore
              score={game.awayTeam.score}
              isScheduledGame={isScheduledGame}
            />
          </div>
          <TeamInfo
            isGameInProgress={isLiveGame(game)}
            isGoaliePulled={false}
            isOnPowerPlay={false}
            teamAbbrev={game.awayTeam.abbreviation}
            teamName={game.awayTeam.name}
          />
        </div>
      </div>
    </article>
  );
};
