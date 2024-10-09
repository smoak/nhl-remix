import { StartTime } from "~/components/StartTime";
import { TeamInfo } from "~/components/TeamInfo";
import type { ScheduledGame } from "~/components/types";

type GameStartTimeProps = {
  readonly game: ScheduledGame;
};
const GameStartTime = ({ game }: GameStartTimeProps) => {
  if (game.isCancelled) {
    return (
      <p className="flex h-8 flex-1 items-center justify-center gap-1 rounded bg-amber-300 px-3 text-center font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
        Cancelled
      </p>
    );
  }

  return (
    <p className="flex flex-1 justify-center whitespace-nowrap px-3 pt-1.5 text-center uppercase">
      <StartTime date={new Date(game.startTime)} />
    </p>
  );
};

// </div>

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
