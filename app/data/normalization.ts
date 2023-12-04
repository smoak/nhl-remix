import type {
  FinalGame,
  Game,
  GameSituation,
  GameType,
  LiveGame,
  ScheduledGame,
  Team,
  TeamRecords,
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
  type GameSituation as ApiGameSituation,
} from "~/api/types";

type NormalizeGames = (games: ApiGame[], teamRecords: TeamRecords) => Game[];
export const normalizeGames: NormalizeGames = (games, teamRecords) =>
  games.map((g) => normalizeGame(g, teamRecords));

export const ApiGameTypeToGameType: Record<ApiGameType, GameType> = {
  "1": "PreSeason",
  "2": "RegularSeason",
  "3": "Playoff",
};

type NormalizeTeam = (team: ApiTeam, record: string) => Team;
const normalizeTeam: NormalizeTeam = (team, record) => {
  return {
    abbreviation: team.abbrev,
    id: team.id,
    name: team.name.default,
    record,
  };
};

type NormalizeScheduledGame = (game: FutureGame) => ScheduledGame;
const normalizeScheduledGame: NormalizeScheduledGame = (game) => {
  return {
    awayTeam: normalizeTeam(game.awayTeam, game.awayTeam.record),
    homeTeam: normalizeTeam(game.homeTeam, game.homeTeam.record),
    id: game.id,
    isCurrentlyInProgress: false,
    startTime: game.startTimeUTC,
    gameState: "Scheduled",
    type: ApiGameTypeToGameType[game.gameType],
  };
};

type NormalizeFinalGame = (
  game: FinishedGame,
  teamRecords: TeamRecords
) => FinalGame;
const normalizeFinalGame: NormalizeFinalGame = (game, teamRecords) => {
  return {
    awayTeam: normalizeTeam(game.awayTeam, teamRecords[game.awayTeam.abbrev]),
    homeTeam: normalizeTeam(game.homeTeam, teamRecords[game.homeTeam.abbrev]),
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
    condensedGame: 0,
    threeMinRecap: 0,
  };
};

export const normalizeSituation = (
  situation?: ApiGameSituation
): GameSituation => {
  if (situation == null) {
    return {
      homeTeam: "even",
      awayTeam: "even",
    };
  }

  if (situation.situationCode === "0651") {
    // away empty net
    return {
      awayTeam: "en",
      homeTeam: "even",
    };
  }

  if (situation.situationCode === "1560") {
    // home empty net
    return {
      awayTeam: "even",
      homeTeam: "en",
    };
  }

  return {
    homeTeam: situation.homeTeam.situationDescriptions?.includes("PP")
      ? "pp"
      : "even",
    awayTeam: situation.awayTeam.situationDescriptions?.includes("PP")
      ? "pp"
      : "even",
  };
};

type NormalizeLiveGame = (
  game: ApiLiveGame,
  teamRecords: TeamRecords
) => LiveGame;
const normalizeLiveGame: NormalizeLiveGame = (game, teamRecords) => {
  return {
    awayTeam: normalizeTeam(game.awayTeam, teamRecords[game.awayTeam.abbrev]),
    homeTeam: normalizeTeam(game.homeTeam, teamRecords[game.homeTeam.abbrev]),
    id: game.id,
    gameState: "Live",
    type: ApiGameTypeToGameType[game.gameType],
    gameClock: {
      currentPeriod: game.periodDescriptor.number,
      isIntermission: game.clock.inIntermission,
      timeRemaining: game.clock.timeRemaining,
    },
    gameSituation: normalizeSituation(game.situation),
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

type NormalizeGame = (game: ApiGame, teamRecords: TeamRecords) => Game;
export const normalizeGame: NormalizeGame = (game, teamRecords) => {
  if (isFinishedGame(game)) {
    return normalizeFinalGame(game, teamRecords);
  }

  if (isLiveGame(game)) {
    return normalizeLiveGame(game, teamRecords);
  }

  return normalizeScheduledGame(game);
};
