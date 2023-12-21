import { StartTime } from "~/components/StartTime";
import { TeamInfo } from "~/components/TeamInfo";
import type { ScheduledGame } from "~/components/types";

type ScheduledGameCardContentsProps = {
  readonly game: ScheduledGame;
};

export const ScheduledGameCardContents = ({
  game,
}: ScheduledGameCardContentsProps) => {
  return (
    <>
      <TeamInfo
        teamAbbrev={game.homeTeam.abbreviation}
        teamName={game.homeTeam.name}
        isGoaliePulled={false}
        isOnPowerPlay={false}
        teamRecord={game.homeTeam.record}
      />
      <div className="mt-3 flex flex-1">
        <p className="flex flex-1 justify-center whitespace-nowrap px-3 pt-1.5 text-center uppercase">
          <StartTime date={new Date(game.startTime)} />
        </p>
      </div>
      <TeamInfo
        teamAbbrev={game.awayTeam.abbreviation}
        teamName={game.awayTeam.name}
        isGoaliePulled={false}
        isOnPowerPlay={false}
        teamRecord={game.awayTeam.record}
      />
    </>
  );
};
