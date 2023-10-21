import { CurrentGameStatus } from "~/components/CurrentGameStatus";
import { TeamScore } from "~/components/TeamScore";
import { PlayoffSeriesSummary } from "../PlayoffSeriesSummary";
import type { Game } from "../types";
import { TeamInfo } from "../TeamInfo";

export type GameCardProps = {
  readonly game: Game;
};

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <article className="flex h-36 rounded-lg border border-nhl-black">
      <div className="flex w-full flex-col">
        <div className="flex p-8">
          <TeamInfo
            abbrev={game.homeTeam.abbreviation}
            isGoaliePulled={false}
            isOnPowerPlay={false}
            name={game.homeTeam.name}
          />
          <div className="mt-3 flex flex-1">
            <TeamScore score={game.homeTeam.score} />
            <p className="flex-1 whitespace-nowrap px-3 pt-1.5 text-center uppercase">
              <CurrentGameStatus game={game} />
              <PlayoffSeriesSummary
                seriesStatusShort={game.seriesStatusShort}
              />
            </p>
            <TeamScore score={game.awayTeam.score} />
          </div>
          <TeamInfo
            abbrev={game.awayTeam.abbreviation}
            isGoaliePulled={false}
            isOnPowerPlay={false}
            name={game.awayTeam.name}
          />
        </div>
      </div>
    </article>
  );
};
