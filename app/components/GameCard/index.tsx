import {
  GameLinescore,
  GameStatus,
  GameTeam,
  GameType,
  ScheduleGame,
} from "~/types";
import { TeamInfo } from "~/components/TeamInfo";
import { CurrentGameStatus } from "~/components/CurrentGameStatus";
import { TeamScore } from "~/components/TeamScore";
import { PlayoffSeriesSummary } from "../PlayoffSeriesSummary";

export type GameCardProps = {
  readonly startTime: ScheduleGame["gameDate"];
  readonly homeTeam: GameTeam;
  readonly awayTeam: GameTeam;
  readonly status: GameStatus;
  readonly linescore: GameLinescore;
  readonly gameType: GameType;
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
          teamName={awayTeam.team.teamName}
          teamId={awayTeam.team.id}
          leagueRecord={awayTeam.leagueRecord}
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
              homeTeam={homeTeam}
              awayTeam={awayTeam}
              gameType={gameType}
            />
          </p>
          <TeamScore
            score={homeTeam.score}
            gameState={status.abstractGameState}
          />
        </div>
        <TeamInfo
          leagueRecord={homeTeam.leagueRecord}
          teamId={homeTeam.team.id}
          teamName={homeTeam.team.teamName}
          linescoreTeam={linescore.teams.home}
          abstractGameState={status.abstractGameState}
          gameType={gameType}
        />
      </div>
    </div>
  </article>
);
