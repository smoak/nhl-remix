import { PeriodOrdinal } from "../PeriodOrdinal";

export type LiveGameStatusProps = {
  readonly isRegularSeasonGame: boolean;
  readonly currentPeriod: number;
  readonly currentPeriodTimeRemaining: string;
  readonly isInIntermission: boolean;
};

const LiveIndicator = () => (
  <span className="mx-auto block pt-2 text-xs tracking-widest">
    <span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-red-700" />
    Live
  </span>
);

export const LiveGameStatus = ({
  currentPeriod,
  currentPeriodTimeRemaining,
  isRegularSeasonGame,
  isInIntermission,
}: LiveGameStatusProps) => {
  const timeRemaining = isInIntermission ? "END" : currentPeriodTimeRemaining;

  if (currentPeriod < 4) {
    return (
      <>
        <PeriodOrdinal period={currentPeriod} /> - {timeRemaining}
        <LiveIndicator />
      </>
    );
  }

  if (currentPeriod === 4) {
    return (
      <>
        OT - {timeRemaining}
        <LiveIndicator />
      </>
    );
  }

  if (isRegularSeasonGame) {
    return (
      <>
        SO - {timeRemaining}
        <LiveIndicator />
      </>
    );
  }

  const otPeriods = currentPeriod - 3;

  return (
    <>
      {otPeriods}OT - {timeRemaining}
      <LiveIndicator />
    </>
  );
};
