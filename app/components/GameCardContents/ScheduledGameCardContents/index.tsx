import { ExclamationTriangleIcon } from "~/components/ExclamationTriangleIcon";
import { StartTime } from "~/components/StartTime";
import { TeamInfo } from "~/components/TeamInfo";
import type { ScheduledGame } from "~/components/types";

type GameStartTimeProps = {
  readonly game: ScheduledGame;
};

const GameStartTime = ({ game }: GameStartTimeProps) => {
  if (game.gameState === "Cancelled") {
    return (
      <p className="flex h-8 flex-1 items-center justify-center gap-1 rounded bg-amber-300 px-3 text-center font-bold">
        <ExclamationTriangleIcon />
        Cancelled
      </p>
    );
  }

  if (game.gameState === "Postponed") {
    return (
      <p className="flex h-8 flex-1 items-center justify-center gap-1 rounded bg-amber-300 px-3 text-center font-bold">
        <ExclamationTriangleIcon />
        Postponed
      </p>
    );
  }

  return (
    <p className="flex flex-1 justify-center whitespace-nowrap px-3 pt-1.5 text-center uppercase">
      <StartTime date={new Date(game.startTime)} />
    </p>
  );
};

type ScheduledGameCardContentsProps = {
  readonly game: ScheduledGame;
};

export const ScheduledGameCardContents = ({
  game,
}: ScheduledGameCardContentsProps) => {
  return (
    <>
      <TeamInfo
        logoUrl={game.homeTeam.logo}
        teamName={game.homeTeam.name}
        isGoaliePulled={false}
        isOnPowerPlay={false}
        teamRecord={game.homeTeam.record}
      />
      <div className="mt-3 flex flex-1">
        <GameStartTime game={game} />
      </div>
      <TeamInfo
        logoUrl={game.awayTeam.logo}
        teamName={game.awayTeam.name}
        isGoaliePulled={false}
        isOnPowerPlay={false}
        teamRecord={game.awayTeam.record}
      />
    </>
  );
};
