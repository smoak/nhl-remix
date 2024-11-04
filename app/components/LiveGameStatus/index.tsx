import { PeriodOrdinal } from "../PeriodOrdinal";
import type { GameClock } from "../types";
import { WhistleIcon } from "../WhistleIcon";
import { ZambonieIcon } from "../ZambonieIcon";

export type LiveGameStatusProps = {
  readonly isRegularSeasonGame: boolean;
  readonly gameClock: GameClock;
};

const LiveIndicator = () => (
  <span className="mx-auto block pt-2 text-xs tracking-widest">
    <span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-red-700" />
    Live
  </span>
);

type ClockStatusIconProps = {
  readonly isWhistle: boolean;
  readonly isIntermission: boolean;
};
const ClockStatusIcon = ({
  isWhistle,
  isIntermission,
}: ClockStatusIconProps) => {
  if (isIntermission) {
    return (
      <span className="flex max-h-6 justify-center">
        <ZambonieIcon />
      </span>
    );
  }

  if (isWhistle) {
    return (
      <span className="flex justify-center">
        <WhistleIcon />
      </span>
    );
  }

  return null;
};

export const LiveGameStatus = ({
  gameClock,
  isRegularSeasonGame,
}: LiveGameStatusProps) => {
  const { currentPeriod } = gameClock;

  if (currentPeriod < 4) {
    return (
      <>
        <span className="flex flex-row gap-1">
          <span>
            <PeriodOrdinal period={currentPeriod} />
          </span>
          {gameClock.isIntermission ? "END" : gameClock.timeRemaining}
        </span>
        <ClockStatusIcon
          isIntermission={gameClock.isIntermission}
          isWhistle={!gameClock.isRunning}
        />
        <LiveIndicator />
      </>
    );
  }

  if (currentPeriod === 4) {
    return (
      <>
        OT - {gameClock.timeRemaining}
        <LiveIndicator />
      </>
    );
  }

  if (isRegularSeasonGame) {
    return (
      <>
        SO - {gameClock.timeRemaining}
        <LiveIndicator />
      </>
    );
  }

  const otPeriods = currentPeriod - 3;

  return (
    <>
      {otPeriods}OT - {gameClock.timeRemaining}
      <LiveIndicator />
    </>
  );
};
