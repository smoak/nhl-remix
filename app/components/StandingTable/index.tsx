import React, { FC } from "react";
import { StandingsRecord, TeamRecord } from "~/api/types";
import { TeamLogo } from "../TeamLogo";

type StandingTableProps = {
  readonly label: string;
  readonly conference: StandingsRecord;
};

const TableCell: FC = ({ children }) => {
  return <td className="border-main border px-3 py-2">{children}</td>;
};

type TableRowRecordProps = {
  readonly record: TeamRecord;
};
const TableRowRecord: FC<TableRowRecordProps> = ({ record }) => {
  const {
    team,
    gamesPlayed,
    conferenceRank,
    leagueRecord,
    points,
    streak,
    records,
  } = record;
  const homeRecord = records.overallRecords.find((or) => or.type === "home");
  const awayRecord = records.overallRecords.find((or) => or.type === "away");
  const lastTenRecord = records.overallRecords.find(
    (or) => or.type === "lastTen"
  );

  return (
    <tr className="text-black">
      <TableCell>{conferenceRank}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <TeamLogo
            teamAbbreviation={team.abbreviation}
            teamId={team.id}
            size={32}
          />
          <span>{team.shortName}</span>
        </div>
      </TableCell>
      <TableCell>{gamesPlayed}</TableCell>
      <TableCell>{leagueRecord.wins}</TableCell>
      <TableCell>{leagueRecord.losses}</TableCell>
      <TableCell>{leagueRecord.ot}</TableCell>
      <TableCell>{points}</TableCell>
      <TableCell>
        {homeRecord?.wins}-{homeRecord?.losses}-{homeRecord?.ot}
      </TableCell>
      <TableCell>
        {awayRecord?.wins}-{awayRecord?.losses}-{awayRecord?.ot}
      </TableCell>
      <TableCell>
        {lastTenRecord?.wins}-{lastTenRecord?.losses}-{lastTenRecord?.ot}
      </TableCell>
      <TableCell>{streak.streakCode}</TableCell>
    </tr>
  );
};

export const StandingTable: FC<StandingTableProps> = ({
  conference,
  label,
}) => {
  return (
    <div className="overflow-x-auto py-5">
      <h1 className="text-3xl font-bold">{label}</h1>
      <table className="border-main bg-glass my-5 min-w-full border text-center text-nhl-gray-50">
        <thead className="bg-black font-bold">
          <tr>
            <TableCell>Rank</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Games Played</TableCell>
            <TableCell>Win</TableCell>
            <TableCell>Loss</TableCell>
            <TableCell>OT/SO Losses</TableCell>
            <TableCell>Points</TableCell>
            <TableCell>Home Record</TableCell>
            <TableCell>Away Record</TableCell>
            <TableCell>Last 10</TableCell>
            <TableCell>Streak</TableCell>
          </tr>
        </thead>
        <tbody>
          {conference.teamRecords.map((record) => (
            <TableRowRecord key={record.team.abbreviation} record={record} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
