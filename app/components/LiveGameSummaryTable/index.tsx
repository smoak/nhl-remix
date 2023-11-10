import { TableCell } from "../Table";
import { TeamNameTableCell } from "../Table/TeamNameTableCell";
import type { LiveGame, PeriodSummary } from "../types";

type LiveGameSummaryTableProps = {
  readonly game: LiveGame;
  readonly periodSummaries: PeriodSummary[];
};

export const LiveGameSummaryTable = ({
  game,
  periodSummaries,
}: LiveGameSummaryTableProps) => {
  const firstPeriod = periodSummaries[0];
  const secondPeriod = periodSummaries[1];
  const thirdPeriod = periodSummaries[2];

  return (
    <table className="my-5 min-w-full border border-black text-center text-nhl-gray-50 md:min-w-min">
      <thead className="bg-black font-bold">
        <tr>
          <TableCell>Team</TableCell>
          <TableCell>1st</TableCell>
          <TableCell>2nd</TableCell>
          <TableCell>3rd</TableCell>
          <TableCell>T</TableCell>
        </tr>
      </thead>
      <tbody>
        <tr className="text-black">
          <TeamNameTableCell
            team={game.awayTeam}
            shotsOnGoal={game.gameStats.awayTeam.sog}
          />
          <TableCell>{firstPeriod.awayScore}</TableCell>
          <TableCell>{secondPeriod?.awayScore ?? "-"}</TableCell>
          <TableCell>{thirdPeriod?.awayScore ?? "-"}</TableCell>
          <TableCell className="font-bold">
            {game.gameStats.awayTeam.score}
          </TableCell>
        </tr>
        <tr className="text-black">
          <TeamNameTableCell
            team={game.homeTeam}
            shotsOnGoal={game.gameStats.homeTeam.sog}
          />
          <TableCell>{firstPeriod.homeScore}</TableCell>
          <TableCell>{secondPeriod?.homeScore ?? "-"}</TableCell>
          <TableCell>{thirdPeriod?.homeScore ?? "-"}</TableCell>
          <TableCell className="font-bold">
            {game.gameStats.homeTeam.score}
          </TableCell>
        </tr>
      </tbody>
    </table>
  );
};
