import { GameSummaryTable } from "../GameSummaryTable";
import type { Game, PeriodSummary } from "../types";
import { isPostponedGame, isFinalGame, isLiveGame } from "../types";

type GameSummaryProps = {
  readonly game: Game;
  readonly periodSummaries: PeriodSummary[];
};

export const GameSummary = ({ game, periodSummaries }: GameSummaryProps) => {
  if (isPostponedGame(game)) {
    return <h1 className="text-2xl font-semibold">Game has been postponed.</h1>;
  }

  if (!isLiveGame(game) && !isFinalGame(game)) {
    return <h1 className="text-2xl font-semibold">Game has not started.</h1>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Game Summary</h1>
      <div className="overflow-x-auto">
        <GameSummaryTable game={game} periodSummaries={periodSummaries} />
      </div>
    </div>
  );
};
