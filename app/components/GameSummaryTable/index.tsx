import { LiveGameSummaryTable } from "../LiveGameSummaryTable";
import { TableCell } from "../Table";
import type { FinalGame, LiveGame, PeriodSummary } from "../types";
import { isLiveGame } from "../types";

type GameSummaryTableProps = {
  readonly game: LiveGame | FinalGame;
  readonly periodSummaries: PeriodSummary[];
};

export const GameSummaryTable = ({
  game,
  periodSummaries,
}: GameSummaryTableProps) => {
  if (isLiveGame(game)) {
    return <LiveGameSummaryTable game={game} />;
  }

  return (
    <table className="my-5 min-w-full border border-black text-center text-nhl-gray-50 md:min-w-min">
      <thead className="bg-black font-bold">
        <tr>
          <TableCell>Team</TableCell>
          {periodSummaries.map((p) => (
            <TableCell key={p.periodNumber}>{p.periodNumber}</TableCell>
          ))}
          <TableCell>T</TableCell>
        </tr>
      </thead>
      <tbody>
        <tr className="text-black">
          <TableCell>{game.awayTeam.abbreviation}</TableCell>
          {periodSummaries.map((p) => (
            <TableCell key={[p.periodNumber, game.awayTeam.id].join("")}>
              {p.awayScore}
            </TableCell>
          ))}
          <TableCell>{game.awayTeam.score}</TableCell>
        </tr>
        <tr className="text-black">
          <TableCell>{game.homeTeam.abbreviation}</TableCell>
          {periodSummaries.map((p) => (
            <TableCell key={[p.periodNumber, game.homeTeam.id].join("")}>
              {p.homeScore}
            </TableCell>
          ))}
          <TableCell>{game.homeTeam.score}</TableCell>
        </tr>
      </tbody>
    </table>
  );
};
