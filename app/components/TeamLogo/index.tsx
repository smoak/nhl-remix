import type { Team } from "~/api/types";
import { TeamIdToLogo } from "~/components/NHLLogos";

export type TeamLogoProps = {
  readonly teamAbbreviation: Team["abbreviation"];
  readonly teamId: Team["id"];
  readonly size?: number;
};

export const TeamLogo = ({ size, teamAbbreviation, teamId }: TeamLogoProps) => {
  const Icon = TeamIdToLogo[teamId];

  if (!Icon) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-400 text-xl font-bold text-gray-900">
        {teamAbbreviation}
      </div>
    );
  }

  return <Icon size={size} />;
};
