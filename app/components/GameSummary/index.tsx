import { GameSummaryTable } from "../GameSummaryTable";
import type { Game } from "../types";
import { isPostponedGame, isFinalGame, isLiveGame } from "../types";

type GameSummaryProps = {
  readonly game: Game;
};

export const GameSummary = ({ game }: GameSummaryProps) => {
  if (isPostponedGame(game)) {
    return <h1 className="text-2xl font-semibold">Game has been postponed.</h1>;
  }

  if (!isLiveGame(game) && !isFinalGame(game)) {
    return <h1 className="text-2xl font-semibold">Game has not started.</h1>;
  }

  return (
    <div className="py-5">
      <h1 className="text-2xl font-semibold">Game Summary</h1>
      <div className="overflow-x-auto">
        <GameSummaryTable game={game} />
      </div>
    </div>
  );
};
