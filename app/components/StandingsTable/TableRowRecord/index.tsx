import type { TeamRecord } from "~/api/types";
import type { StandingsMode } from "../types";
import { TableCell } from "~/components/Table";
import { TeamLogo } from "~/components/TeamLogo";
import { StreakCell } from "../StreakCell";

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

type TableRowRecordProps = {
  readonly record: TeamRecord;
  readonly standingsMode: StandingsMode;
};
export const TableRowRecord = ({
  record,
  standingsMode,
}: TableRowRecordProps) => {
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
      <StreakCell streak={streak} />
    </tr>
  );
};
