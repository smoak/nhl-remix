import { AbstractGameState, GameTeam, LinescoreTeam } from "~/types";
import { TeamLogo } from "~/components/TeamLogo";
import { TeamName } from "../TeamName";
import { TeamRecord } from "../TeamRecord";

export type TeamInfoProps = {
  readonly team: GameTeam;
  readonly linescoreTeam: LinescoreTeam;
  readonly abstractGameState: AbstractGameState;
};

export const TeamInfo = ({
  abstractGameState,
  linescoreTeam,
  team,
}: TeamInfoProps) => (
  <div className="flex w-1/3 flex-col items-center text-center">
    <TeamLogo teamId={team.team.id} size={48} />
    <TeamName
      name={team.team.teamName}
      linescoreTeam={linescoreTeam}
      abstractGameState={abstractGameState}
    />
    <TeamRecord
      wins={team.leagueRecord.wins}
      losses={team.leagueRecord.losses}
      otWins={team.leagueRecord.ot}
    />
  </div>
);
