import {
  isFutureGamecenterResponse,
  type GamecenterBoxscoreResponse,
  type GamecenterLandingResponse,
  type GamecenterBoxscoreFutureGame,
  type GamecenterLandingFutureGame,
  isFinishedGamecenterResponse,
  type GamecenterBaseTeam,
  type GamecenterBoxscoreFinishedGame,
  type GamecenterBoxscoreLiveGame,
  type GamecenterLandingSummaryScoringGoal,
  type GamecenterLandingSummaryScoringGoalAssist,
} from "~/api/gamecenter/types";
import type {
  FinalGame,
  GameDetails,
  LiveGame,
  PeriodSummary,
  ScheduledGame,
  ScoringPlay,
  ScoringPlayAssister,
  ScoringPlays,
  Team,
} from "~/components/types";
import { ApiGameTypeToGameType } from "~/data/normalization";

const normalizeBaseTeam = (team: GamecenterBaseTeam): Team => {
  return {
    abbreviation: team.abbrev,
    id: team.id,
    name: team.name.default,
    record: "",
  };
};

const normalizeFutureGame = (
  game: GamecenterBoxscoreFutureGame | GamecenterLandingFutureGame
): ScheduledGame => {
  return {
    awayTeam: normalizeBaseTeam(game.awayTeam),
    homeTeam: normalizeBaseTeam(game.homeTeam),
    id: game.id,
    startTime: game.startTimeUTC,
    type: ApiGameTypeToGameType[game.gameType],
    gameState: "Scheduled",
  };
};

const normalizeFinishedGame = (
  game: GamecenterBoxscoreFinishedGame
): FinalGame => {
  return {
    awayTeam: normalizeBaseTeam(game.awayTeam),
    homeTeam: normalizeBaseTeam(game.homeTeam),
    endedInPeriod: game.period,
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
    id: game.id,
    type: ApiGameTypeToGameType[game.gameType],
  };
};

const normalizeLiveGame = (game: GamecenterBoxscoreLiveGame): LiveGame => {
  return {
    awayTeam: normalizeBaseTeam(game.awayTeam),
    gameClock: {
      currentPeriod: 0,
      isIntermission: false,
      timeRemaining: "",
    },
    gameSituation: {
      awayTeam: "even",
      homeTeam: "even",
    },
    gameState: "Live",
    gameStats: {
      awayTeam: {
        score: 0,
        sog: 0,
      },
      homeTeam: {
        score: 0,
        sog: 0,
      },
    },
    homeTeam: normalizeBaseTeam(game.homeTeam),
    id: game.id,
    type: ApiGameTypeToGameType[game.gameType],
  };
};

const normalizePeriodSummaries = (
  response: GamecenterLandingResponse
): PeriodSummary[] => {
  if (isFutureGamecenterResponse(response)) {
    return [];
  }

  return response.summary.linescore.byPeriod.map((p) => ({
    awayScore: p.away,
    homeScore: p.home,
    periodNumber: p.period,
  }));
};

const normalizeAssist = (
  assist?: GamecenterLandingSummaryScoringGoalAssist
): ScoringPlayAssister | undefined => {
  if (assist == null) {
    return;
  }

  return {
    firstName: assist.firstName,
    id: assist.playerId,
    lastName: assist.lastName,
    seasonAssists: assist.assistsToDate,
  };
};

const normalizeGoal = (
  g: GamecenterLandingSummaryScoringGoal,
  period: number
): ScoringPlay => {
  return {
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
    period,
    timeInPeriod: g.timeInPeriod,
    primaryAssist: normalizeAssist(g.assists[0]),
    secondaryAssist: normalizeAssist(g.assists[1]),
  };
};

const normalizeScoringPlays = (
  response: GamecenterLandingResponse
): ScoringPlays => {
  if (isFutureGamecenterResponse(response)) {
    return {};
  }

  return response.summary.scoring.reduce<ScoringPlays>((accum, scoring) => {
    accum[scoring.period] = scoring.goals.map((g) =>
      normalizeGoal(g, scoring.period)
    );
    return accum;
  }, {});
};

type NormalizeGameDetailsOptions = {
  readonly boxscore: GamecenterBoxscoreResponse;
  readonly landing: GamecenterLandingResponse;
};
type NormalizeGameDetails = (
  options: NormalizeGameDetailsOptions
) => GameDetails;
export const normalizeGameDetails: NormalizeGameDetails = ({
  boxscore,
  landing,
}) => {
  if (isFutureGamecenterResponse(boxscore)) {
    return {
      game: normalizeFutureGame(boxscore),
      periodSummaries: [],
      scoringPlays: {},
    };
  }

  const periodSummaries = normalizePeriodSummaries(landing);
  const scoringPlays = normalizeScoringPlays(landing);

  if (isFinishedGamecenterResponse(boxscore)) {
    return {
      game: normalizeFinishedGame(boxscore),
      periodSummaries,
      scoringPlays,
    };
  }

  return {
    game: normalizeLiveGame(boxscore),
    periodSummaries,
    scoringPlays,
  };
};
