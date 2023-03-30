import type { FC } from "react";
import type { StandingsRecord, TeamRecord } from "~/api/types";
import { TeamLogo } from "../TeamLogo";

type StandingsMode = "Conference" | "Division" | "WildCard";

type StandingsTableProps = {
  readonly label: string;
  readonly standingsRecord: StandingsRecord;
  readonly standingsMode?: StandingsMode;
};

type GetRankFromRecordOptions = {
  readonly standingsMode: StandingsMode;
  readonly record: TeamRecord;
};
const getRankFromRecord = ({
  standingsMode,
  record,
}: GetRankFromRecordOptions) => {
  if (standingsMode === "Conference") {
    return record.conferenceRank;
  }

  if (standingsMode === "Division") {
    return record.divisionRank;
  }

  return record.wildCardRank;
};

const TableCell: FC = ({ children }) => {
  return <td className="border border-nhl-silver px-3 py-2">{children}</td>;
};

type TableRowRecordProps = {
  readonly record: TeamRecord;
  readonly standingsMode: StandingsMode;
};
const TableRowRecord: FC<TableRowRecordProps> = ({ record, standingsMode }) => {
  const {
    team,
    gamesPlayed,
    leagueRecord,
    points,
    streak,
    records,
    clinchIndicator,
  } = record;
  const rank = getRankFromRecord({ standingsMode, record });
  const homeRecord = records.overallRecords.find((or) => or.type === "home");
  const awayRecord = records.overallRecords.find((or) => or.type === "away");
  const lastTenRecord = records.overallRecords.find(
    (or) => or.type === "lastTen"
  );
  const teamName = clinchIndicator
    ? `${clinchIndicator}-${team.shortName}`
    : team.shortName;

  return (
    <tr className="text-black">
      <TableCell>{rank}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <TeamLogo
            teamAbbreviation={team.abbreviation}
            teamId={team.id}
            size={32}
          />
          <span>{teamName}</span>
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

export const StandingsTable: FC<StandingsTableProps> = ({
  label,
  standingsMode = "Conference",
  standingsRecord,
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
          {standingsRecord.teamRecords.map((record) => (
            <TableRowRecord
              key={record.team.abbreviation}
              record={record}
              standingsMode={standingsMode}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
