import type { ScheduleGame } from "~/api/types";
import { isLiveGame } from "~/api/types";
import type { Game, GameList } from "~/components/types";

type NormalizeScheduleGames = (games: ScheduleGame[]) => GameList;
export const normalizeScheduleGames: NormalizeScheduleGames = (games) => {
  return {
    games: games.map(normalizeScheduleGame),
  };
};

type NormalizeScheduleGame = (game: ScheduleGame) => Game;
export const normalizeScheduleGame: NormalizeScheduleGame = (game) => {
  const {
    gamePk,
    gameDate,
    gameType,
    linescore,
    teams,
    status,
    seriesSummary,
  } = game;

  const homeTeam = {
    id: teams.home.team.id,
    name: teams.home.team.teamName,
    score: teams.home.score,
    record: teams.home.leagueRecord,
    abbreviation: teams.home.team.abbreviation,
  };
  const awayTeam = {
    id: teams.away.team.id,
    name: teams.away.team.teamName,
    score: teams.away.score,
    record: teams.away.leagueRecord,
    abbreviation: teams.away.team.abbreviation,
  };

  const baseGame = {
    id: gamePk,
    currentPeriod: linescore.currentPeriod,
    startTime: gameDate,
    awayTeam,
    homeTeam,
    type: gameType,
    seriesStatusShort: seriesSummary?.seriesStatusShort,
  };

  if (isLiveGame(game)) {
    return {
      ...baseGame,
      isCurrentlyInProgress: true,
      status: {
        abstract: "Live",
        detailed: game.status.detailedState,
      },
      currentPeriodTimeRemaining: game.linescore.currentPeriodTimeRemaining,
      currentPeriodOrdinal: game.linescore.currentPeriodOrdinal,
      linescore: {
        periods: linescore.periods,
        away: {
          isGoaliePulled: linescore.teams.away.goaliePulled,
          isOnPowerPlay: linescore.teams.away.powerPlay,
        },
        home: {
          isGoaliePulled: linescore.teams.home.goaliePulled,
          isOnPowerPlay: linescore.teams.home.powerPlay,
        },
      },
    };
  }

  if (
    status.abstractGameState === "Preview" &&
    (status.detailedState === "Scheduled" ||
      status.detailedState === "Pre-Game")
  ) {
    return {
      ...baseGame,
      isCurrentlyInProgress: false,
      status: {
        abstract: "Preview",
        detailed: "Scheduled",
      },
    };
  }

  if (
    status.abstractGameState === "Preview" &&
    status.detailedState === "Postponed"
  ) {
    return {
      ...baseGame,
      isCurrentlyInProgress: false,
      status: {
        abstract: "Preview",
        detailed: "Postponed",
      },
    };
  }

  return {
    ...baseGame,
    status: {
      abstract: "Final",
      detailed: "Final",
    },
    linescore: {
      periods: linescore.periods,
      away: {
        isGoaliePulled: linescore.teams.away.goaliePulled,
        isOnPowerPlay: linescore.teams.away.powerPlay,
      },
      home: {
        isGoaliePulled: linescore.teams.home.goaliePulled,
        isOnPowerPlay: linescore.teams.home.powerPlay,
      },
    },
    isCurrentlyInProgress: false,
  };
};
