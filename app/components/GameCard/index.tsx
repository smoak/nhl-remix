import { GameStatus, GameTeam, ScheduleGame } from "~/types";
import { TeamInfo } from "~/components/TeamInfo";
import { CurrentGameStatus } from "~/components/CurrentGameStatus";

export type GameCardProps = {
  readonly startTime: ScheduleGame["gameDate"];
  readonly homeTeam: GameTeam;
  readonly awayTeam: GameTeam;
  readonly status: GameStatus;
};

export const GameCard = ({
  startTime,
  homeTeam,
  awayTeam,
  status,
}: GameCardProps) => (
  <article className="flex rounded-lg border border-xiketic">
    <div className="flex w-full flex-col">
      <div className="flex p-6">
        <TeamInfo team={awayTeam} />
        <div className="mt-6 flex flex-1">
          <p className="text-left text-2xl font-bold">{awayTeam.score}</p>
          <p className="flex-1 whitespace-nowrap px-3 pt-1.5 text-center uppercase">
            <CurrentGameStatus status={status} />
          </p>
          <p className="text-right text-2xl font-bold">{homeTeam.score}</p>
        </div>
        <TeamInfo team={homeTeam} />
      </div>
    </div>
  </article>
);
