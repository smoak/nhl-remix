import { TeamInfo } from "../TeamInfo";
import type { Game } from "../types";
import { isLiveGame } from "../types";

type AwayTeamInfoProps = {
  readonly game: Game;
};

export const AwayTeamInfo = ({ game }: AwayTeamInfoProps) => {
  if (isLiveGame(game)) {
    return (
      <TeamInfo
        isGameInProgress={true}
        isGoaliePulled={game.linescore.away.isGoaliePulled}
        isOnPowerPlay={game.linescore.away.isOnPowerPlay}
        teamAbbrev={game.awayTeam.abbreviation}
        teamName={game.awayTeam.name}
        teamRecord={game.awayTeam.record}
      />
    );
  }

  return (
    <TeamInfo
      isGameInProgress={true}
      isGoaliePulled={false}
      isOnPowerPlay={false}
      teamAbbrev={game.awayTeam.abbreviation}
      teamName={game.awayTeam.name}
      teamRecord={game.awayTeam.record}
    />
  );
};
