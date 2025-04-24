import type {
  FinalGame,
  Game,
  GameSituation,
  GameState,
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
  isPlayoffGame,
  type SeriesStatus,
  type GameScheduleState,
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
    logo: team.logo,
  };
};

type NormalizeScheduledGame = (game: FutureGame) => ScheduledGame;
const normalizeScheduledGame: NormalizeScheduledGame = (game) => {
  const homeRecord = isPlayoffGame(game)
    ? playoffTeamRecord(game.homeTeam, game.seriesStatus)
    : game.homeTeam.record;
  const awayRecord = isPlayoffGame(game)
    ? playoffTeamRecord(game.awayTeam, game.seriesStatus)
    : game.awayTeam.record;

  return {
    awayTeam: normalizeTeam(game.awayTeam, awayRecord),
    homeTeam: normalizeTeam(game.homeTeam, homeRecord),
    id: game.id,
    isCurrentlyInProgress: false,
    startTime: game.startTimeUTC,
    gameState: normalizeFutureGameState(game.gameScheduleState),
    type: ApiGameTypeToGameType[game.gameType],
  };
};

const playoffTeamRecord = (
  team: ApiTeam,
  seriesStatus: SeriesStatus,
): string => {
  if (team.abbrev === seriesStatus.bottomSeedTeamAbbrev) {
    return [seriesStatus.bottomSeedWins, seriesStatus.topSeedWins].join("-");
  }

  return [seriesStatus.topSeedWins, seriesStatus.bottomSeedWins].join("-");
};

type NormalizeFinalGame = (
  game: FinishedGame,
  teamRecords: TeamRecords,
) => FinalGame;
const normalizeFinalGame: NormalizeFinalGame = (game, teamRecords) => {
  const homeRecord = isPlayoffGame(game)
    ? playoffTeamRecord(game.homeTeam, game.seriesStatus)
    : teamRecords[game.homeTeam.abbrev];
  const awayRecord = isPlayoffGame(game)
    ? playoffTeamRecord(game.awayTeam, game.seriesStatus)
    : teamRecords[game.awayTeam.abbrev];

  return {
    awayTeam: normalizeTeam(game.awayTeam, awayRecord),
    homeTeam: normalizeTeam(game.homeTeam, homeRecord),
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

export const normalizeFutureGameState = (
  gameScheduleState: GameScheduleState,
): Exclude<GameState, "Live" | "Final"> => {
  if (gameScheduleState === "CNCL") {
    return "Cancelled";
  }

  if (gameScheduleState === "PPD") {
    return "Postponed";
  }

  return "Scheduled";
};

export const normalizeSituation = (
  situation?: ApiGameSituation,
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
  teamRecords: TeamRecords,
) => LiveGame;
const normalizeLiveGame: NormalizeLiveGame = (game, teamRecords) => {
  const homeRecord = isPlayoffGame(game)
    ? playoffTeamRecord(game.homeTeam, game.seriesStatus)
    : teamRecords[game.homeTeam.abbrev];
  const awayRecord = isPlayoffGame(game)
    ? playoffTeamRecord(game.awayTeam, game.seriesStatus)
    : teamRecords[game.awayTeam.abbrev];

  return {
    awayTeam: normalizeTeam(game.awayTeam, awayRecord),
    homeTeam: normalizeTeam(game.homeTeam, homeRecord),
    id: game.id,
    gameState: "Live",
    type: ApiGameTypeToGameType[game.gameType],
    gameClock: {
      currentPeriod: game.periodDescriptor.number,
      isIntermission: game.clock.inIntermission,
      timeRemaining: game.clock.timeRemaining,
      isRunning: game.clock.running,
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
