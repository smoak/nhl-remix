import type { GameType } from "~/api/types";
import { TeamLogo } from "~/components/TeamLogo";
import { TeamName } from "../TeamName";
import { TeamRecord } from "../TeamRecord";
import type { Team } from "../types";

export type TeamInfoProps = {
  readonly team: Team;
  readonly isGameInProgress: boolean;
  readonly isGoaliePulled: boolean;
  readonly isOnPowerPlay: boolean;
  readonly gameType: GameType;
};

export const TeamInfo = ({
  gameType,
  isGameInProgress,
  isGoaliePulled,
  isOnPowerPlay,
  team,
}: TeamInfoProps) => (
  <div className="flex w-1/3 w-16 flex-col items-center text-center">
    <TeamLogo teamId={team.id} size={48} teamAbbreviation={team.abbreviation} />
    <TeamName
      isGameInProgress={isGameInProgress}
      isGoaliePulled={isGoaliePulled}
      isOnPowerPlay={isOnPowerPlay}
      name={team.name}
    />
    <TeamRecord record={team.record} gameType={gameType} />
  </div>
);
