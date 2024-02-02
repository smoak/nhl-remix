import { TeamLogo } from "~/components/TeamLogo";
import { TeamName } from "../TeamName";

export type TeamInfoProps = {
  readonly isGoaliePulled: boolean;
  readonly isOnPowerPlay: boolean;
  readonly logoUrl: string;
  readonly teamName: string;
  readonly teamRecord: string;
};

export const TeamInfo = ({
  isGoaliePulled,
  isOnPowerPlay,
  logoUrl,
  teamName,
  teamRecord,
}: TeamInfoProps) => (
  <div className="flex w-1/3 flex-col items-center text-center">
    <TeamLogo logoUrl={logoUrl} teamName={teamName} size="lg" />
    <TeamName
      isGoaliePulled={isGoaliePulled}
      isOnPowerPlay={isOnPowerPlay}
      name={teamName}
    />
    <p className="text-xs">{teamRecord}</p>
  </div>
);
