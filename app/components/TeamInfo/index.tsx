import { TeamLogo } from "~/components/TeamLogo";
import { TeamName } from "../TeamName";
import { TeamRecord } from "../TeamRecord";

export type TeamInfoProps = {
  readonly isGameInProgress: boolean;
  readonly isGoaliePulled: boolean;
  readonly isOnPowerPlay: boolean;
  readonly teamId: number;
  readonly teamAbbrev: string;
  readonly teamName: string;
  readonly teamRecord?: string;
};

export const TeamInfo = ({
  isGameInProgress,
  isGoaliePulled,
  isOnPowerPlay,
  teamAbbrev,
  teamId,
  teamName,
  teamRecord,
}: TeamInfoProps) => (
  <div className="flex w-1/3 w-16 flex-col items-center text-center">
    <TeamLogo teamId={teamId} size={48} teamAbbreviation={teamAbbrev} />
    <TeamName
      isGameInProgress={isGameInProgress}
      isGoaliePulled={isGoaliePulled}
      isOnPowerPlay={isOnPowerPlay}
      name={teamName}
    />
    <TeamRecord record={teamRecord} />
  </div>
);
