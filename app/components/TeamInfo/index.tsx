import { TeamLogo } from "~/components/TeamLogo";
import { TeamName } from "../TeamName";
import { TeamRecord } from "../TeamRecord";

export type TeamInfoProps = {
  readonly isGoaliePulled: boolean;
  readonly isOnPowerPlay: boolean;
  readonly teamAbbrev: string;
  readonly teamName: string;
  readonly teamRecord?: string;
};

export const TeamInfo = ({
  isGoaliePulled,
  isOnPowerPlay,
  teamAbbrev,
  teamName,
  teamRecord,
}: TeamInfoProps) => (
  <div className="flex w-1/3 flex-col items-center text-center">
    <TeamLogo teamAbbreviation={teamAbbrev} teamName={teamName} size="md" />
    <TeamName
      isGoaliePulled={isGoaliePulled}
      isOnPowerPlay={isOnPowerPlay}
      name={teamName}
    />
    <TeamRecord record={teamRecord} />
  </div>
);
