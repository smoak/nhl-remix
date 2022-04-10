import { ScheduleGame, AbstractGameState, CurrentPeriodOrdinal } from "~/types";

export type CurrentGameStatusProps = {
  readonly gameState: AbstractGameState;
  readonly startTime: ScheduleGame["gameDate"];
  readonly currentPeriod: number;
  readonly currentPeriodTimeRemaining: string;
  readonly currentPeriodOrdinal: CurrentPeriodOrdinal;
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
  currentPeriod,
  currentPeriodOrdinal,
  currentPeriodTimeRemaining,
  startTime,
  gameState,
}: CurrentGameStatusProps) => {
  if (gameState === "Live") {
    return (
      <>
        {formatOrdinals(currentPeriod)} - {currentPeriodTimeRemaining}
        <span className="mx-auto block pt-2 text-xs tracking-widest">
          <span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-red-700" />
          Live
        </span>
      </>
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
