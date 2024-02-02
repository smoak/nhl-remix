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
import {
  ApiGameTypeToGameType,
  normalizeSituation,
} from "~/data/normalization";

const normalizeBaseTeam = (team: GamecenterBaseTeam): Team => {
  return {
    abbreviation: team.abbrev,
    id: team.id,
    name: team.name.default,
    record: "",
    logo: team.logo,
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
    condensedGame: game.gameVideo?.condensedGame,
    threeMinRecap: game.gameVideo?.threeMinRecap,
  };
};

const normalizeLiveGame = (game: GamecenterBoxscoreLiveGame): LiveGame => {
  return {
    awayTeam: normalizeBaseTeam(game.awayTeam),
    gameClock: {
      currentPeriod: game.period,
      isIntermission: game.clock.inIntermission,
      timeRemaining: game.clock.timeRemaining,
    },
    gameSituation: normalizeSituation(game.situation),
    gameState: "Live",
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
    firstName: assist.firstName.default,
    id: assist.playerId,
    lastName: assist.lastName.default,
    seasonAssists: assist.assistsToDate,
  };
};

type NormalizeGoalOptions = {
  readonly goal: GamecenterLandingSummaryScoringGoal;
  readonly period: number;
  readonly scoringTeam: GamecenterBaseTeam;
};
const normalizeGoal = ({
  goal: g,
  period,
  scoringTeam,
}: NormalizeGoalOptions): ScoringPlay => {
  const goalType = g.goalModifier === "empty-net" ? "en" : g.strength;
  return {
    awayScore: g.awayScore,
    goalScorer: {
      firstName: g.firstName.default,
      id: g.playerId,
      lastName: g.lastName.default,
      seasonGoals: g.goalsToDate,
      name: g.name.default,
      headshot: g.headshot,
    },
    highlightClip: g.highlightClip,
    homeScore: g.homeScore,
    leadingTeamAbbrev: g.leadingTeamAbbrev?.default,
    period,
    teamAbbrev: g.teamAbbrev.default,
    teamLogoUrl: scoringTeam.logo,
    goalType,
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
      normalizeGoal({
        goal: g,
        period: scoring.period,
        scoringTeam:
          g.teamAbbrev.default === response.awayTeam.abbrev
            ? response.awayTeam
            : response.homeTeam,
      })
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
