import { AbstractGameState, LeagueRecord, LinescoreTeam } from "~/types";
import { TeamLogo } from "~/components/TeamLogo";
import { TeamName } from "../TeamName";
import { TeamRecord } from "../TeamRecord";

export type TeamInfoProps = {
  readonly teamId: number;
  readonly teamName: string;
  readonly leagueRecord: LeagueRecord;
  readonly linescoreTeam: LinescoreTeam;
  readonly abstractGameState: AbstractGameState;
};

export const TeamInfo = ({
  abstractGameState,
  leagueRecord,
  linescoreTeam,
  teamId,
  teamName,
}: TeamInfoProps) => (
  <div className="flex w-1/3 flex-col items-center text-center">
    <TeamLogo teamId={teamId} size={48} />
    <TeamName
      name={teamName}
      linescoreTeam={linescoreTeam}
      abstractGameState={abstractGameState}
    />
    <TeamRecord
      wins={leagueRecord.wins}
      losses={leagueRecord.losses}
      otWins={leagueRecord.ot}
    />
  </div>
);
