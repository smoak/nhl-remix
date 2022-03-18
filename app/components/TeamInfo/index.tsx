import { GameTeam } from "~/types";
import { TeamLogo } from "~/components/TeamLogo";

export type TeamInfoProps = {
  readonly team: GameTeam;
};

export const TeamInfo = ({ team }: TeamInfoProps) => (
  <div className="flex flex-col items-center text-center break-words">
    <TeamLogo teamId={team.team.id} size={48} />
    <p className="mt-1 whitespace-nowrap text-sm font-semibold">
      {team.team.name}
    </p>
    <p className="text-xs text-gray-400">
      {team.leagueRecord.wins}-{team.leagueRecord.losses}-{team.leagueRecord.ot}
    </p>
  </div>
);
