import { GameLinescore, GameStatus, GameType } from "~/api/types";
import { TeamInfo } from "~/components/TeamInfo";
import { CurrentGameStatus } from "~/components/CurrentGameStatus";
import { TeamScore } from "~/components/TeamScore";
import { PlayoffSeriesSummary } from "../PlayoffSeriesSummary";
import { Game } from "../types";

export type GameCardProps = {
  readonly game: Game;
  readonly status: GameStatus;
  readonly linescore: GameLinescore;
  readonly gameType: GameType;
  readonly seriesStatusShort: string;
};

export const GameCard = ({
  game,
  linescore,
  status,
  gameType,
  seriesStatusShort,
}: GameCardProps) => (
  <article className="flex rounded-lg border border-nhl-black">
    <div className="flex w-full flex-col">
      <div className="flex p-9">
        <TeamInfo
          teamName={game.awayTeam.name}
          teamId={game.awayTeam.id}
          losses={game.awayTeam.record.losses}
          ot={game.awayTeam.record.ot}
          wins={game.awayTeam.record.wins}
          isGameInProgress={game.isCurrentlyInProgress}
          isGoaliePulled={linescore.teams.away.goaliePulled}
          isOnPowerPlay={linescore.teams.away.powerPlay}
          gameType={gameType}
          teamAbbreviation={game.awayTeam.abbreviation}
        />
        <div className="mt-3 flex flex-1">
          <TeamScore
            score={game.awayTeam.score}
            gameState={status.abstractGameState}
          />
          <p className="flex-1 whitespace-nowrap px-3 pt-1.5 text-center uppercase">
            <CurrentGameStatus
              currentPeriod={linescore.currentPeriod}
              currentPeriodTimeRemaining={linescore.currentPeriodTimeRemaining}
              gameState={status.abstractGameState}
              gameType={gameType}
              startTime={game.startTime}
            />
            <PlayoffSeriesSummary
              gameType={gameType}
              seriesStatusShort={seriesStatusShort}
            />
          </p>
          <TeamScore
            score={game.homeTeam.score}
            gameState={status.abstractGameState}
          />
        </div>
        <TeamInfo
          losses={game.homeTeam.record.losses}
          wins={game.homeTeam.record.wins}
          ot={game.homeTeam.record.ot}
          teamId={game.homeTeam.id}
          teamName={game.homeTeam.name}
          isGameInProgress={game.isCurrentlyInProgress}
          isGoaliePulled={linescore.teams.home.goaliePulled}
          isOnPowerPlay={linescore.teams.home.powerPlay}
          gameType={gameType}
          teamAbbreviation={game.homeTeam.abbreviation}
        />
      </div>
    </div>
  </article>
);
