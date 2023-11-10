import { GameCardContents } from "../GameCardContents";
import type { Game } from "../types";

export type GameCardProps = {
  readonly game: Game;
};

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <article className="flex h-36 rounded-lg border border-nhl-black">
      <div className="flex w-full p-8">
        <GameCardContents game={game} />
      </div>
    </article>
  );
};
