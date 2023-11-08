import { TableCell } from "../Table";
// import { TeamLogo } from "../TeamLogo";
import type { LiveGame /* , Team */ } from "../types";

type LiveGameSummaryTableProps = {
  readonly game: LiveGame;
};

// type TeamNameTableCellProps = {
//   readonly team: Team;
//   readonly shotsOnGoal: number;
// };

// const TeamNameTableCell = ({ shotsOnGoal, team }: TeamNameTableCellProps) => {
//   return (
//     <TableCell>
//       <div className="flex">
//         <TeamLogo teamAbbreviation={team.abbreviation} teamName={team.name} />
//         <div className="items-center px-2 text-left text-sm">
//           {team.name}
//           <p className="text-xs">{shotsOnGoal} SOG</p>
//         </div>
//       </div>
//     </TableCell>
//   );
// };

export const LiveGameSummaryTable = ({ game }: LiveGameSummaryTableProps) => {
  // const { periods } = game.linescore;
  // const firstPeriod = periods[0];
  // const secondPeriod = periods[1];
  // const thirdPeriod = periods[2];

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
      {/* <tbody>
        <tr className="text-black">
          <TeamNameTableCell
            team={game.awayTeam}
            shotsOnGoal={game.linescore.away.shotsOnGoal}
          />
          <TableCell>{firstPeriod.away.goals}</TableCell>
          <TableCell>{secondPeriod?.away.goals ?? "-"}</TableCell>
          <TableCell>{thirdPeriod?.away.goals ?? "-"}</TableCell>
          <TableCell>{game.awayTeam.score}</TableCell>
        </tr>
        <tr className="text-black">
          <TeamNameTableCell
            team={game.homeTeam}
            shotsOnGoal={game.linescore.home.shotsOnGoal}
          />
          <TableCell>{firstPeriod.home.goals}</TableCell>
          <TableCell>{secondPeriod?.home.goals ?? "-"}</TableCell>
          <TableCell>{thirdPeriod?.home.goals ?? "-"}</TableCell>
          <TableCell>{game.homeTeam.score}</TableCell>
        </tr>
      </tbody> */}
    </table>
  );
};
