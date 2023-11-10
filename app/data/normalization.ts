import type {
  FinalGame,
  Game,
  GameType,
  LiveGame,
  ScheduledGame,
  Team,
} from "~/components/types";
import {
  type Game as ApiGame,
  type GameType as ApiGameType,
  type FinishedGame,
  type LiveGame as ApiLiveGame,
  isFinishedGame,
  type Team as ApiTeam,
  type FutureGame,
  isLiveGame,
} from "~/api/types";

type NormalizeGames = (games: ApiGame[]) => Game[];
export const normalizeGames: NormalizeGames = (games) =>
  games.map(normalizeGame);

export const ApiGameTypeToGameType: Record<ApiGameType, GameType> = {
  "1": "PreSeason",
  "2": "RegularSeason",
  "3": "Playoff",
};

type NormalizeTeam = (team: ApiTeam) => Team;
const normalizeTeam: NormalizeTeam = (team) => {
  return {
    abbreviation: team.abbrev,
    id: team.id,
    name: team.name.default,
    record: "",
  };
};

type NormalizeScheduledGame = (game: FutureGame) => ScheduledGame;
const normalizeScheduledGame: NormalizeScheduledGame = (game) => {
  return {
    awayTeam: {
      ...normalizeTeam(game.awayTeam),
      record: game.awayTeam.record,
    },
    homeTeam: {
      ...normalizeTeam(game.homeTeam),
      record: game.homeTeam.record,
    },
    id: game.id,
    isCurrentlyInProgress: false,
    startTime: game.startTimeUTC,
    gameState: "Scheduled",
    type: ApiGameTypeToGameType[game.gameType],
  };
};

type NormalizeFinalGame = (game: FinishedGame) => FinalGame;
const normalizeFinalGame: NormalizeFinalGame = (game) => {
  return {
    awayTeam: normalizeTeam(game.awayTeam),
    homeTeam: normalizeTeam(game.homeTeam),
    id: game.id,
    endedInPeriod: game.periodDescriptor.number,
    gameState: "Final",
    gameStats: {
      awayTeam: {
        score: game.awayTeam.score,
        sog: game.awayTeam.sog,
      },
      homeTeam: {
        score: game.homeTeam.score,
        sog: game.homeTeam.sog,
      },
    },
    type: ApiGameTypeToGameType[game.gameType],
  };
};

type NormalizeLiveGame = (game: ApiLiveGame) => LiveGame;
const normalizeLiveGame: NormalizeLiveGame = (game) => {
  return {
    awayTeam: normalizeTeam(game.awayTeam),
    homeTeam: normalizeTeam(game.homeTeam),
    id: game.id,
    gameState: "Live",
    type: ApiGameTypeToGameType[game.gameType],
    gameClock: {
      currentPeriod: game.periodDescriptor.number,
      isIntermission: game.clock.inIntermission,
      timeRemaining: game.clock.timeRemaining,
    },
    gameSituation: {
      awayTeam: "even",
      homeTeam: "even",
    },
    gameStats: {
      awayTeam: {
        score: game.awayTeam.score,
        sog: 0,
      },
      homeTeam: {
        score: game.homeTeam.score,
        sog: 0,
      },
    },
  };
};

type NormalizeGame = (game: ApiGame) => Game;
export const normalizeGame: NormalizeGame = (game) => {
  if (isFinishedGame(game)) {
    return normalizeFinalGame(game);
  }

  if (isLiveGame(game)) {
    return normalizeLiveGame(game);
  }

  return normalizeScheduledGame(game);
};
