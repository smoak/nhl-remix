export type LiveGameStatusProps = {
  readonly isRegularSeasonGame: boolean;
  readonly currentPeriod: number;
  readonly currentPeriodTimeRemaining: string;
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
}: LiveGameStatusProps) => {
  if (currentPeriod < 4) {
    return (
      <>
        {formatOrdinals(currentPeriod)} - {currentPeriodTimeRemaining}
        <LiveIndicator />
      </>
    );
  }

  if (currentPeriod === 4) {
    return (
      <>
        OT - {currentPeriodTimeRemaining}
        <LiveIndicator />
      </>
    );
  }

  if (isRegularSeasonGame) {
    return (
      <>
        SO - {currentPeriodTimeRemaining}
        <LiveIndicator />
      </>
    );
  }

  const otPeriods = currentPeriod - 3;

  return (
    <>
      {otPeriods}OT - {currentPeriodTimeRemaining}
      <LiveIndicator />
    </>
  );
};
