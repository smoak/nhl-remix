import { CurrentGameStatus } from "~/components/CurrentGameStatus";
import { TeamScore } from "~/components/TeamScore";
import { PlayoffSeriesSummary } from "../PlayoffSeriesSummary";
import type { Game } from "../types";
import { HomeTeamInfo } from "../HomeTeamInfo";
import { AwayTeamInfo } from "../AwayTeamInfo";

export type GameCardProps = {
  readonly game: Game;
};

export const GameCard = ({ game }: GameCardProps) => (
  <article className="flex rounded-lg border border-nhl-black">
    <div className="flex w-full flex-col">
      <div className="flex p-9">
        <HomeTeamInfo game={game} />
        <div className="mt-3 flex flex-1">
          <TeamScore
            score={game.homeTeam.score}
            gameState={game.status.abstract}
          />
          <p className="flex-1 whitespace-nowrap px-3 pt-1.5 text-center uppercase">
            <CurrentGameStatus game={game} />
            <PlayoffSeriesSummary seriesStatusShort={game.seriesStatusShort} />
          </p>
          <TeamScore
            score={game.awayTeam.score}
            gameState={game.status.abstract}
          />
        </div>
        <AwayTeamInfo game={game} />
      </div>
    </div>
  </article>
);
