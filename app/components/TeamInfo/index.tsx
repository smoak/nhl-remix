import { AbstractGameState, GameType, LinescoreTeam } from "~/types";
import { TeamLogo } from "~/components/TeamLogo";
import { TeamName } from "../TeamName";
import { TeamRecord } from "../TeamRecord";

export type TeamInfoProps = {
  readonly teamId: number;
  readonly teamName: string;
  readonly wins: number;
  readonly losses: number;
  readonly ot?: number;
  readonly isGameInProgress: boolean;
  readonly isGoaliePulled: boolean;
  readonly isOnPowerPlay: boolean;
  readonly gameType: GameType;
};

export const TeamInfo = ({
  isGameInProgress,
  isGoaliePulled,
  isOnPowerPlay,
  gameType,
  losses,
  ot,
  teamId,
  teamName,
  wins,
}: TeamInfoProps) => (
  <div className="flex w-1/3 flex-col items-center text-center">
    <TeamLogo teamId={teamId} size={48} />
    <TeamName
      isGameInProgress={isGameInProgress}
      isGoaliePulled={isGoaliePulled}
      isOnPowerPlay={isOnPowerPlay}
      name={teamName}
    />
    <TeamRecord wins={wins} losses={losses} otWins={ot} gameType={gameType} />
  </div>
);
