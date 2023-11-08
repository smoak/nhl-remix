import { FinalGameStatus } from "../FinalGameStatus";
import { LiveGameStatus } from "../LiveGameStatus";
import type { Game } from "../types";
import { isFinalGame, isLiveGame } from "../types";

export type CurrentGameStatusProps = {
  readonly game: Game;
};

export const CurrentGameStatus = ({ game }: CurrentGameStatusProps) => {
  if (isLiveGame(game)) {
    return (
      <LiveGameStatus
        currentPeriod={game.currentPeriod}
        currentPeriodTimeRemaining={game.currentPeriodTimeRemaining}
        isRegularSeasonGame={game.type === "R"}
      />
    );
  }

  if (isFinalGame(game)) {
    return (
      <FinalGameStatus
        gameType={game.type}
        endedInPeriod={game.endedInPeriod}
      />
    );
  }

  return (
    <>
      {new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(
        new Date(game.startTime)
      )}
    </>
  );
};
