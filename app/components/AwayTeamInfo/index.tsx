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
        team={game.awayTeam}
      />
    );
  }

  return (
    <TeamInfo
      isGameInProgress={true}
      isGoaliePulled={false}
      isOnPowerPlay={false}
      team={game.awayTeam}
    />
  );
};
