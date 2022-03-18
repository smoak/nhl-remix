import { ScheduleGame, GameStatus } from "~/types";

export type CurrentGameStatusProps = {
  readonly status: GameStatus;
  readonly startTime: ScheduleGame["gameDate"];
};

export const CurrentGameStatus = ({
  startTime,
  status,
}: CurrentGameStatusProps) => {
  if (status.abstractGameState === "Live") {
    return (
      <span className="mx-auto block pt-2 text-xs tracking-widest">
        <span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-red-700" />
        Live
      </span>
    );
  }

  if (status.abstractGameState === "Final") {
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
