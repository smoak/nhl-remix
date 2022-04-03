import { ScheduleGame, GameStatus, GameLinescore } from "~/types";

export type CurrentGameStatusProps = {
  readonly status: GameStatus;
  readonly startTime: ScheduleGame["gameDate"];
  readonly linescore: GameLinescore;
};

// TODO: i18n
const pr = new Intl.PluralRules("en-US", { type: "ordinal" });
const suffixes = new Map([
  ["one", "st"],
  ["two", "nd"],
  ["few", "rd"],
  ["other", "th"],
]);
const formatOrdinals = (n: number) => {
  const rule = pr.select(n);
  const suffix = suffixes.get(rule);
  return `${n}${suffix}`;
};

export const CurrentGameStatus = ({
  linescore,
  startTime,
  status,
}: CurrentGameStatusProps) => {
  if (status.abstractGameState === "Live") {
    return (
      <>
        {formatOrdinals(linescore.currentPeriod)} -{" "}
        {linescore.currentPeriodTimeRemaining}
        <span className="mx-auto block pt-2 text-xs tracking-widest">
          <span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-red-700" />
          Live
        </span>
      </>
    );
  }

  if (
    status.abstractGameState === "Final" &&
    linescore.currentPeriodOrdinal === "OT"
  ) {
    return <>Final/OT</>;
  }

  if (
    status.abstractGameState === "Final" &&
    linescore.currentPeriodOrdinal === "SO"
  ) {
    return <>Final/SO</>;
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
