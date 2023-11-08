import type {
  FinalGame,
  Game,
  GameDetails,
  GameType,
  LiveGame,
  PeriodSummary,
  ScheduledGame,
  ScoringPlay,
} from "~/components/types";
import type {
  Game as ApiGame,
  GameType as ApiGameType,
  FinishedGame,
  GamecenterResponse,
  GamecenterScoring,
  LiveGame as ApiLiveGame,
} from "~/api/types";

type NormalizeGames = (games: ApiGame[]) => Game[];
export const normalizeGames: NormalizeGames = (games) =>
  games.map(normalizeGame);

const ApiGameTypeToGameType: Record<ApiGameType, GameType> = {
  "1": "PR",
  "2": "R",
  "3": "P",
};

type NormalizeScheduledGame = (game: ApiGame) => ScheduledGame;
const normalizeScheduledGame: NormalizeScheduledGame = (game) => {
  const homeTeam: ScheduledGame["homeTeam"] = {
    abbreviation: game.homeTeam.abbrev,
    id: game.homeTeam.id,
    name: game.homeTeam.placeName.default,
    score: 0,
  };
  const awayTeam: ScheduledGame["awayTeam"] = {
    abbreviation: game.awayTeam.abbrev,
    id: game.awayTeam.id,
    name: game.awayTeam.placeName.default,
    score: 0,
  };

  return {
    awayTeam,
    homeTeam,
    id: game.id,
    isCurrentlyInProgress: false,
    startTime: game.startTimeUTC,
    status: {
      abstract: "Preview",
      detailed: "Scheduled",
    },
    type: ApiGameTypeToGameType[game.gameType],
  };
};

type NormalizeFinalGame = (game: FinishedGame) => FinalGame;
const normalizeFinalGame: NormalizeFinalGame = (game) => {
  const homeTeam: FinalGame["homeTeam"] = {
    abbreviation: game.homeTeam.abbrev,
    id: game.homeTeam.id,
    name: game.homeTeam.placeName.default,
    score: game.homeTeam.score,
  };

  const awayTeam: FinalGame["awayTeam"] = {
    abbreviation: game.awayTeam.abbrev,
    id: game.awayTeam.id,
    name: game.awayTeam.placeName.default,
    score: game.awayTeam.score,
  };

  return {
    awayTeam,
    homeTeam,
    id: game.id,
    isCurrentlyInProgress: false,
    startTime: game.startTimeUTC,
    status: {
      abstract: "Final",
      detailed: "Final",
    },
    type: ApiGameTypeToGameType[game.gameType],
  };
};

type NormalizeLiveGame = (game: ApiLiveGame) => LiveGame;
const normalizeLiveGame: NormalizeLiveGame = (game) => {
  const homeTeam: LiveGame["homeTeam"] = {
    abbreviation: game.homeTeam.abbrev,
    id: game.homeTeam.id,
    name: game.homeTeam.placeName.default,
    score: game.homeTeam.score,
  };

  const awayTeam: LiveGame["awayTeam"] = {
    abbreviation: game.awayTeam.abbrev,
    id: game.awayTeam.id,
    name: game.awayTeam.placeName.default,
    score: game.awayTeam.score,
  };

  return {
    awayTeam,
    currentPeriod: game.periodDescriptor.number,
    currentPeriodTimeRemaining: game.clock.timeRemaining,
    homeTeam,
    id: game.id,
    isCurrentlyInProgress: true,
    startTime: game.startTimeUTC,
    status: {
      abstract: "Live",
      detailed: "In Progress",
    },
    type: ApiGameTypeToGameType[game.gameType],
  };
};

type NormalizeGame = (game: ApiGame) => Game;
export const normalizeGame: NormalizeGame = (game) => {
  if (game.gameState === "FINAL" || game.gameState === "OFF") {
    return normalizeFinalGame(game);
  }

  if (game.gameState === "LIVE") {
    return normalizeLiveGame(game);
  }

  return normalizeScheduledGame(game);
};

type NormalizeScoringPlays = (
  scoring: GamecenterScoring[]
) => Record<number, ScoringPlay[]>;
const normalizeScoringPlays: NormalizeScoringPlays = (scoring) => {
  return scoring.reduce<Record<number, ScoringPlay[]>>((accum, scoring) => {
    accum[scoring.period] = scoring.goals.map((g) => ({
      awayScore: g.awayScore,
      goalScorer: {
        firstName: g.firstName,
        id: g.playerId,
        lastName: g.lastName,
        seasonGoals: g.goalsToDate,
        name: g.name,
        headshot: g.headshot,
      },
      highlightClip: g.highlightClip,
      homeScore: g.homeScore,
      leadingTeamAbbrev: g.leadingTeamAbbrev,
      teamAbbrev: g.teamAbbrev,
      period: scoring.period,
      timeInPeriod: g.timeInPeriod,
    }));
    return accum;
  }, {});
};

type NormalizeGameDetails = (response: GamecenterResponse) => GameDetails;
export const normalizeGameDetails: NormalizeGameDetails = (response) => {
  if (response.gameState === "FUT" || response.gameState === "PRE") {
    return {
      game: normalizeScheduledGame(response),
      scoringPlays: [],
      periodSummaries: [],
    };
  }

  const scoringPlays = normalizeScoringPlays(response.summary.scoring);
  const periodSummaries: PeriodSummary[] =
    response.summary.linescore.byPeriod.map((p) => ({
      awayScore: p.away,
      homeScore: p.home,
      periodNumber: p.period,
    }));

  if (response.gameState === "FINAL" || response.gameState === "OFF") {
    return {
      game: normalizeFinalGame(response),
      scoringPlays,
      periodSummaries,
    };
  }

  return {
    game: normalizeLiveGame(response),
    scoringPlays,
    periodSummaries,
  };
};
