import { ScheduleGame, AbstractGameState, CurrentPeriodOrdinal } from "~/types";
import { LiveGameStatus } from "../LiveGameStatus";

export type CurrentGameStatusProps = {
  readonly gameState: AbstractGameState;
  readonly startTime: ScheduleGame["gameDate"];
  readonly currentPeriod: number;
  readonly currentPeriodTimeRemaining: string;
  readonly currentPeriodOrdinal: CurrentPeriodOrdinal;
};

export const CurrentGameStatus = ({
  currentPeriod,
  currentPeriodOrdinal,
  currentPeriodTimeRemaining,
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

  if (gameState === "Final" && currentPeriodOrdinal === "OT") {
    return <>Final/OT</>;
  }

  if (gameState === "Final" && currentPeriodOrdinal === "SO") {
    return <>Final/SO</>;
  }

  if (gameState === "Final") {
    return <>Final</>;
  }

  return (
    <>
      {new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(
        new Date(startTime)
      )}
    </>
  );
};
