import { GameLinescore, GameStatus, GameTeam, ScheduleGame } from "~/types";
import { TeamInfo } from "~/components/TeamInfo";
import { CurrentGameStatus } from "~/components/CurrentGameStatus";
import { TeamScore } from "~/components/TeamScore";

export type GameCardProps = {
  readonly startTime: ScheduleGame["gameDate"];
  readonly homeTeam: GameTeam;
  readonly awayTeam: GameTeam;
  readonly status: GameStatus;
  readonly linescore: GameLinescore;
};

export const GameCard = ({
  linescore,
  startTime,
  homeTeam,
  awayTeam,
  status,
}: GameCardProps) => (
  <article className="flex rounded-lg border border-nhl-black">
    <div className="flex w-full flex-col">
      <div className="flex p-9">
        <TeamInfo team={awayTeam} />
        <div className="mt-3 flex flex-1">
          <TeamScore score={awayTeam.score} gameStatus={status} />
          <p className="flex-1 whitespace-nowrap px-3 pt-1.5 text-center uppercase">
            <CurrentGameStatus
              linescore={linescore}
              status={status}
              startTime={startTime}
            />
          </p>
          <TeamScore score={homeTeam.score} gameStatus={status} />
        </div>
        <TeamInfo team={homeTeam} />
      </div>
    </div>
  </article>
);
