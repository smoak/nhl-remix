import { CurrentGameStatus } from "~/components/CurrentGameStatus";
import { TeamScore } from "~/components/TeamScore";
import { PlayoffSeriesSummary } from "../PlayoffSeriesSummary";
import { isScheduledGame, type Game } from "../types";
import { TeamInfo } from "../TeamInfo";

export type GameCardProps = {
  readonly game: Game;
};

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <article className="flex h-36 rounded-lg border border-nhl-black">
      <div className="flex w-full flex-col">
        <div className="flex p-5">
          <TeamInfo
            isGoaliePulled={game.homeTeam.isGoaliePulled}
            isOnPowerPlay={game.homeTeam.isOnPowerPlay}
            teamAbbrev={game.homeTeam.abbreviation}
            teamName={game.homeTeam.name}
            teamRecord={game.awayTeam.record}
          />
          <div className="mt-3 flex flex-1">
            <TeamScore
              score={game.homeTeam.score}
              isScheduledGame={isScheduledGame(game)}
            />
            <p className="flex-1 whitespace-nowrap px-3 pt-1.5 text-center uppercase">
              <CurrentGameStatus game={game} />
              <PlayoffSeriesSummary
                seriesStatusShort={game.seriesStatusShort}
              />
            </p>
            <TeamScore
              score={game.awayTeam.score}
              isScheduledGame={isScheduledGame(game)}
            />
          </div>
          <TeamInfo
            isGoaliePulled={game.awayTeam.isGoaliePulled}
            isOnPowerPlay={game.awayTeam.isOnPowerPlay}
            teamAbbrev={game.awayTeam.abbreviation}
            teamName={game.awayTeam.name}
            teamRecord={game.awayTeam.record}
          />
        </div>
      </div>
    </article>
  );
};
