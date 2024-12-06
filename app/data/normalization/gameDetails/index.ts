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
  type GamecenterLandingFinishedGame,
  type GamecenterLandingSummaryScoring,
  type GamecenterLandingFinishedTeam,
  type GamecenterLandingLiveGame,
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
  normalizeFutureGameState,
  normalizeSituation,
} from "~/data/normalization";

const normalizeBaseTeam = (team: GamecenterBaseTeam): Team => {
  return {
    abbreviation: team.abbrev,
    id: team.id,
    name: team.commonName.default,
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
    gameState: normalizeFutureGameState(game.gameScheduleState),
  };
};

const normalizeFinishedGame = (
  game: GamecenterBoxscoreFinishedGame
): FinalGame => {
  return {
    awayTeam: normalizeBaseTeam(game.awayTeam),
    homeTeam: normalizeBaseTeam(game.homeTeam),
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
      currentPeriod: game.periodDescriptor.number,
      isIntermission: game.clock.inIntermission,
      timeRemaining: game.clock.timeRemaining,
      isRunning: game.clock.running,
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
  response: GamecenterLandingFinishedGame | GamecenterLandingLiveGame
): PeriodSummary[] => {
  const awayTeamAbbrev = response.awayTeam.abbrev;
  return response.summary.scoring.map((s) => {
    const { awayScore, homeScore } = s.goals.reduce(
      (accum, g) => {
        const isAwayTeamGoal = g.teamAbbrev.default === awayTeamAbbrev;

        return {
          homeScore: accum.homeScore + (isAwayTeamGoal ? 0 : 1),
          awayScore: accum.awayScore + (isAwayTeamGoal ? 1 : 0),
        };
      },
      {
        awayScore: 0,
        homeScore: 0,
      }
    );
    return {
      periodNumber: s.periodDescriptor.number,
      awayScore,
      homeScore,
      periodType: s.periodDescriptor.periodType,
    };
  });
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

type NormalizeScoringPlayOptions = {
  readonly scoring: GamecenterLandingSummaryScoring;
  readonly awayTeam: GamecenterLandingFinishedTeam;
  readonly homeTeam: GamecenterLandingFinishedTeam;
};
const normalizeScoringPlay = ({
  awayTeam,
  homeTeam,
  scoring,
}: NormalizeScoringPlayOptions) => {
  const { number: period } = scoring.periodDescriptor;

  return scoring.goals.map((g) =>
    normalizeGoal({
      goal: g,
      period,
      scoringTeam:
        g.teamAbbrev.default === awayTeam.abbrev ? awayTeam : homeTeam,
    })
  );
};

const normalizeOvertimeScoringPlay = (
  otScoring: GamecenterLandingSummaryScoring | undefined,
  response: GamecenterLandingFinishedGame | GamecenterLandingLiveGame
): ScoringPlays["overtime"] => {
  if (!otScoring) {
    return;
  }

  const overtime = normalizeScoringPlay({
    scoring: otScoring,
    awayTeam: response.awayTeam,
    homeTeam: response.homeTeam,
  });

  return {
    otPeriod: otScoring.periodDescriptor.number - 3,
    scoringPlay: overtime[0],
  };
};

const normalzieShootoutScoringPlay = (
  scoring: GamecenterLandingSummaryScoring | undefined,
  {
    awayTeam,
    homeTeam,
  }: GamecenterLandingFinishedGame | GamecenterLandingLiveGame
): ScoringPlays["shootout"] => {
  if (!scoring) {
    return;
  }

  return normalizeScoringPlay({ scoring, awayTeam, homeTeam })[0];
};

const normalizeScoringPlays = (
  response: GamecenterLandingFinishedGame | GamecenterLandingLiveGame
): ScoringPlays => {
  const firstPeriod = response.summary.scoring
    .filter((scoring) => scoring.periodDescriptor.number === 1)
    .flatMap((scoring) => {
      return normalizeScoringPlay({
        scoring,
        awayTeam: response.awayTeam,
        homeTeam: response.homeTeam,
      });
    });
  const secondPeriod = response.summary.scoring
    .filter((scoring) => scoring.periodDescriptor.number === 2)
    .flatMap((scoring) => {
      return normalizeScoringPlay({
        scoring,
        awayTeam: response.awayTeam,
        homeTeam: response.homeTeam,
      });
    });
  const thirdPeriod = response.summary.scoring
    .filter((scoring) => scoring.periodDescriptor.number === 3)
    .flatMap((scoring) => {
      return normalizeScoringPlay({
        scoring,
        awayTeam: response.awayTeam,
        homeTeam: response.homeTeam,
      });
    });
  const otScoring = response.summary.scoring.find(
    (scoring) =>
      scoring.periodDescriptor.periodType === "OT" && scoring.goals.length > 0
  );
  const soScoring = response.summary.scoring.find(
    (s) => s.periodDescriptor.periodType === "SO"
  );

  return {
    firstPeriod,
    secondPeriod,
    thirdPeriod,
    overtime: normalizeOvertimeScoringPlay(otScoring, response),
    shootout: normalzieShootoutScoringPlay(soScoring, response),
  };
};

const normalizeGameFromBoxscore = (boxscore: GamecenterBoxscoreResponse) => {
  if (isFutureGamecenterResponse(boxscore)) {
    return normalizeFutureGame(boxscore);
  }

  if (isFinishedGamecenterResponse(boxscore)) {
    return normalizeFinishedGame(boxscore);
  }

  return normalizeLiveGame(boxscore);
};

type NormalizeDetailsFromLanding = (
  landing: GamecenterLandingResponse
) => Omit<GameDetails, "game">;
const normalizeDetailsFromLanding: NormalizeDetailsFromLanding = (landing) => {
  if (isFutureGamecenterResponse(landing)) {
    return {
      periodSummaries: [],
    };
  }
  const periodSummaries = normalizePeriodSummaries(landing);
  const scoringPlays = normalizeScoringPlays(landing);

  return {
    periodSummaries,
    scoringPlays,
  };
};

type NormalizeGameDetails = (
  boxscore: GamecenterBoxscoreResponse,
  landing: GamecenterLandingResponse
) => GameDetails;
export const normalizeGameDetails: NormalizeGameDetails = (
  boxscore,
  landing
) => {
  if (isFutureGamecenterResponse(boxscore)) {
    return {
      game: normalizeFutureGame(boxscore),
      periodSummaries: [],
    };
  }

  const game = normalizeGameFromBoxscore(boxscore);
  const { periodSummaries, scoringPlays } =
    normalizeDetailsFromLanding(landing);

  return {
    game,
    periodSummaries,
    scoringPlays,
  };
};
