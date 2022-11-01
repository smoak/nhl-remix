import type { ScheduleGame, AbstractGameState, GameType } from "~/api/types";
import { FinalGameStatus } from "../FinalGameStatus";
import { LiveGameStatus } from "../LiveGameStatus";

export type CurrentGameStatusProps = {
  readonly gameState: AbstractGameState;
  readonly startTime: ScheduleGame["gameDate"];
  readonly currentPeriod: number;
  readonly currentPeriodTimeRemaining: string;
  readonly gameType: GameType;
};

export const CurrentGameStatus = ({
  currentPeriod,
  currentPeriodTimeRemaining,
  gameType,
  startTime,
  gameState,
}: CurrentGameStatusProps) => {
  if (gameState === "Live") {
    return (
      <LiveGameStatus
        currentPeriod={currentPeriod}
        currentPeriodTimeRemaining={currentPeriodTimeRemaining}
      />
    );
  }

  if (gameState === "Final") {
    return (
      <FinalGameStatus gameType={gameType} endedInPeriod={currentPeriod} />
    );
  }

  return (
    <>
      {new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(
        new Date(startTime)
      )}
    </>
  );
};
