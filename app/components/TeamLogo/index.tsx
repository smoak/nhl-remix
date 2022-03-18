import { Team } from "~/types";
import { TeamIdToLogo } from "~/components/NHLLogos";

export type TeamLogoProps = {
  readonly teamId: Team["id"];
  readonly size?: number;
};

export const TeamLogo = ({ size, teamId }: TeamLogoProps) => {
  const Icon = TeamIdToLogo[teamId];

  if (!Icon) {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-400 text-xl font-bold text-gray-900">
        {teamId}
      </div>
    );
  }

  return <Icon size={size} />;
};
