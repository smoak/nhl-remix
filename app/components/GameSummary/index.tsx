import { TableCell } from "../Table";
import type { Game } from "../types";
import { isPostponedGame, isFinalGame, isLiveGame } from "../types";

type GameSummaryProps = {
  readonly game: Game;
};

export const GameSummary = ({ game }: GameSummaryProps) => {
  if (isPostponedGame(game)) {
    return <h1 className="text-2xl font-semibold">Game has been postponed.</h1>;
  }

  if (!isLiveGame(game) && !isFinalGame(game)) {
    return <h1 className="text-2xl font-semibold">Game has not started.</h1>;
  }

  return (
    <div className="py-5">
      <h1 className="text-2xl font-semibold">Game Summary</h1>
      <div className="overflow-x-auto">
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
      </div>
    </div>
  );
};
