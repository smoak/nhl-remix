import { LiveGameSummaryTable } from "../LiveGameSummaryTable";
import { TableCell } from "../Table";
import type { FinalGame, LiveGame } from "../types";
import { isLiveGame } from "../types";

type GameSummaryTableProps = {
  readonly game: LiveGame | FinalGame;
};

export const GameSummaryTable = ({ game }: GameSummaryTableProps) => {
  if (isLiveGame(game)) {
    return <LiveGameSummaryTable game={game} />;
  }

  return (
    <table className="my-5 min-w-full border border-black text-center text-nhl-gray-50 md:min-w-min">
      <thead className="bg-black font-bold">
        <tr>
          <TableCell>Team</TableCell>
          {game.linescore.periods.map((p) => (
            <TableCell key={p.ordinalNum}>{p.ordinalNum}</TableCell>
          ))}
          <TableCell>T</TableCell>
        </tr>
      </thead>
      <tbody>
        <tr className="text-black">
          <TableCell>{game.awayTeam.abbreviation}</TableCell>
          {game.linescore.periods.map((p) => (
            <TableCell key={[p.ordinalNum, game.awayTeam.id].join("")}>
              {p.away.goals}
            </TableCell>
          ))}
          <TableCell>{game.awayTeam.score}</TableCell>
        </tr>
        <tr className="text-black">
          <TableCell>{game.homeTeam.abbreviation}</TableCell>
          {game.linescore.periods.map((p) => (
            <TableCell key={[p.ordinalNum, game.homeTeam.id].join("")}>
              {p.home.goals}
            </TableCell>
          ))}
          <TableCell>{game.homeTeam.score}</TableCell>
        </tr>
      </tbody>
    </table>
  );
};
