import { CurrentGameStatus } from "~/components/CurrentGameStatus";
import { TeamScore } from "~/components/TeamScore";
import { PlayoffSeriesSummary } from "../PlayoffSeriesSummary";
import type { Game } from "../types";
import { HomeTeamInfo } from "../HomeTeamInfo";
import { AwayTeamInfo } from "../AwayTeamInfo";

export type GameCardProps = {
  readonly game: Game;
};

export const GameCard = ({ game }: GameCardProps) => {
  const isScheduledGame = game.status.abstract === "Preview";

  return (
    <article className="flex h-36 rounded-lg border border-nhl-black">
      <div className="flex w-full flex-col">
        <div className="flex p-8">
          <HomeTeamInfo game={game} />
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
          <AwayTeamInfo game={game} />
        </div>
      </div>
    </article>
  );
};
