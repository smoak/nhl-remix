import { TeamInfo } from "../TeamInfo";
import type { Game } from "../types";
import { isLiveGame } from "../types";

type HomeTeamInfoProps = {
  readonly game: Game;
};

export const HomeTeamInfo = ({ game }: HomeTeamInfoProps) => {
  if (isLiveGame(game)) {
    return (
      <TeamInfo
        gameType={game.type}
        isGameInProgress={true}
        isGoaliePulled={game.linescore.home.isGoaliePulled}
        isOnPowerPlay={game.linescore.home.isOnPowerPlay}
        team={game.homeTeam}
      />
    );
  }

  return (
    <TeamInfo
      gameType={game.type}
      isGameInProgress={true}
      isGoaliePulled={false}
      isOnPowerPlay={false}
      team={game.homeTeam}
    />
  );
};