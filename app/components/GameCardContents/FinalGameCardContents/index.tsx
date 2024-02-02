import { FinalGameStatus } from "~/components/FinalGameStatus";
import { TeamInfo } from "~/components/TeamInfo";
import { TeamScore } from "~/components/TeamScore";
import type { FinalGame } from "~/components/types";

type FinalGameCardContentsProps = {
  readonly game: FinalGame;
};

export const FinalGameCardContents = ({ game }: FinalGameCardContentsProps) => {
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
        <TeamScore score={game.gameStats.homeTeam.score} />
        <p className="flex-1 whitespace-nowrap px-3 pt-1.5 text-center uppercase">
          <FinalGameStatus
            gameType={game.type}
            endedInPeriod={game.endedInPeriod}
          />
        </p>
        <TeamScore score={game.gameStats.awayTeam.score} />
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
