import { GameSummaryTable } from "../GameSummaryTable";
import type { Game, PeriodSummary } from "../types";
import { isFinalGame, isLiveGame } from "../types";
import { GameRecapButtons } from "./GameRecapButtons";

type GameSummaryProps = {
  readonly game: Game;
  readonly periodSummaries: PeriodSummary[];
};

export const GameSummary = ({ game, periodSummaries }: GameSummaryProps) => {
  if (!isLiveGame(game) && !isFinalGame(game)) {
    return <h1 className="text-2xl font-semibold">Game has not started.</h1>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Game Summary</h1>
      <div className="overflow-x-auto">
        <GameSummaryTable game={game} periodSummaries={periodSummaries} />
        <GameRecapButtons game={game} />
      </div>
    </div>
  );
};
