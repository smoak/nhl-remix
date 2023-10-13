import type { StandingsRecord } from "~/api/types";
import type { StandingsMode } from "./types";
import { TableRowRecord } from "./TableRowRecord";
import { TableCell } from "../Table";

type StandingsTableProps = {
  readonly label: string;
  readonly standingsRecord: StandingsRecord;
  readonly standingsMode?: StandingsMode;
};

export const StandingsTable = ({
  label,
  standingsMode = "Conference",
  standingsRecord,
}: StandingsTableProps) => {
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
