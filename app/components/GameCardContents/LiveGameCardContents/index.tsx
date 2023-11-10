import { LiveGameStatus } from "~/components/LiveGameStatus";
import { TeamInfo } from "~/components/TeamInfo";
import { TeamScore } from "~/components/TeamScore";
import type { LiveGame } from "~/components/types";

type LiveGameCardContentsProps = {
  readonly game: LiveGame;
};

export const LiveGameCardContents = ({ game }: LiveGameCardContentsProps) => {
  return (
    <>
      <TeamInfo
        teamAbbrev={game.homeTeam.abbreviation}
        teamName={game.homeTeam.name}
        isGoaliePulled={game.gameSituation.homeTeam === "en"}
        isOnPowerPlay={game.gameSituation.homeTeam === "pp"}
        teamRecord={game.homeTeam.record}
      />
      <div className="mt-3 flex flex-1">
        <TeamScore score={game.gameStats.homeTeam.score} />
        <p className="flex-1 whitespace-nowrap px-3 pt-1.5 text-center uppercase">
          <LiveGameStatus
            currentPeriod={game.gameClock.currentPeriod}
            currentPeriodTimeRemaining={game.gameClock.timeRemaining}
            isRegularSeasonGame={game.type === "RegularSeason"}
          />
        </p>
        <TeamScore score={game.gameStats.awayTeam.score} />
      </div>
      <TeamInfo
        teamAbbrev={game.awayTeam.abbreviation}
        teamName={game.awayTeam.name}
        isGoaliePulled={game.gameSituation.awayTeam === "en"}
        isOnPowerPlay={game.gameSituation.awayTeam === "pp"}
        teamRecord={game.awayTeam.record}
      />
    </>
  );
};
