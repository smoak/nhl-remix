import { FinalGameStatus } from "../FinalGameStatus";
import { LiveGameStatus } from "../LiveGameStatus";
import type { Game } from "../types";
import { isPostponedGame } from "../types";
import { isFinalGame, isLiveGame } from "../types";

export type CurrentGameStatusProps = {
  readonly game: Game;
};

export const CurrentGameStatus = ({ game }: CurrentGameStatusProps) => {
  if (isLiveGame(game)) {
    return (
      <LiveGameStatus
        gameType={game.type}
        currentPeriod={game.currentPeriod}
        currentPeriodTimeRemaining={game.currentPeriodTimeRemaining}
      />
    );
  }

  if (isFinalGame(game)) {
    return (
      <FinalGameStatus
        gameType={game.type}
        endedInPeriod={game.currentPeriod}
      />
    );
  }

  if (isPostponedGame(game)) {
    return <span className="mx-auto block">Postponed</span>;
  }

  return (
    <>
      {new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(
        new Date(game.startTime)
      )}
    </>
  );
};
