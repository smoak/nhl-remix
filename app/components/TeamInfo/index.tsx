import { TeamLogo } from "~/components/TeamLogo";
import { TeamName } from "../TeamName";
import { TeamRecord } from "../TeamRecord";
import { TeamShotsOnGoal } from "../TeamShotsOnGoal";

export type TeamInfoProps = {
  readonly abbrev: string;
  readonly name: string;
  readonly isGoaliePulled: boolean;
  readonly isOnPowerPlay: boolean;
  readonly record?: string;
  readonly sog?: number;
};

export const TeamInfo = ({
  abbrev,
  isGoaliePulled,
  isOnPowerPlay,
  name,
  record,
  sog,
}: TeamInfoProps) => (
  <div className="flex w-1/3 w-16 flex-col items-center text-center">
    <TeamLogo teamAbbreviation={abbrev} teamName={name} />
    <TeamName
      isGoaliePulled={isGoaliePulled}
      isOnPowerPlay={isOnPowerPlay}
      name={name}
    />
    <TeamRecord record={record} />
    <TeamShotsOnGoal sog={sog} />
  </div>
);
