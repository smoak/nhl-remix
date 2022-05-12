import { GameLinescore, GameStatus, GameType, ScheduleGame } from "~/types";
import { TeamInfo } from "~/components/TeamInfo";
import { CurrentGameStatus } from "~/components/CurrentGameStatus";
import { TeamScore } from "~/components/TeamScore";
import { PlayoffSeriesSummary } from "../PlayoffSeriesSummary";

export type GameCardProps = {
  readonly startTime: ScheduleGame["gameDate"];
  readonly homeTeam: Team;
  readonly awayTeam: Team;
  readonly status: GameStatus;
  readonly linescore: GameLinescore;
  readonly gameType: GameType;
};

type Record = {
  readonly wins: number;
  readonly losses: number;
  readonly ot?: number;
};

type Team = {
  readonly name: string;
  readonly abbreviation: string;
  readonly id: number;
  readonly record: Record;
  readonly score: number;
};

export const GameCard = ({
  linescore,
  startTime,
  homeTeam,
  awayTeam,
  status,
  gameType,
}: GameCardProps) => (
  <article className="flex rounded-lg border border-nhl-black">
    <div className="flex w-full flex-col">
      <div className="flex p-9">
        <TeamInfo
          teamName={awayTeam.name}
          teamId={awayTeam.id}
          losses={awayTeam.record.losses}
          ot={awayTeam.record.ot}
          wins={awayTeam.record.wins}
          linescoreTeam={linescore.teams.away}
          abstractGameState={status.abstractGameState}
          gameType={gameType}
        />
        <div className="mt-3 flex flex-1">
          <TeamScore
            score={awayTeam.score}
            gameState={status.abstractGameState}
          />
          <p className="flex-1 whitespace-nowrap px-3 pt-1.5 text-center uppercase">
            <CurrentGameStatus
              currentPeriod={linescore.currentPeriod}
              currentPeriodTimeRemaining={linescore.currentPeriodTimeRemaining}
              gameState={status.abstractGameState}
              gameType={gameType}
              startTime={startTime}
            />
            <PlayoffSeriesSummary
              homeTeam={{
                abbreviation: homeTeam.abbreviation,
                wins: homeTeam.record.wins,
              }}
              awayTeam={{
                abbreviation: awayTeam.abbreviation,
                wins: awayTeam.record.wins,
              }}
              gameType={gameType}
            />
          </p>
          <TeamScore
            score={homeTeam.score}
            gameState={status.abstractGameState}
          />
        </div>
        <TeamInfo
          losses={homeTeam.record.losses}
          wins={homeTeam.record.wins}
          ot={homeTeam.record.ot}
          teamId={homeTeam.id}
          teamName={homeTeam.name}
          linescoreTeam={linescore.teams.home}
          abstractGameState={status.abstractGameState}
          gameType={gameType}
        />
      </div>
    </div>
  </article>
);
