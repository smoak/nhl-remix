import type {
  FinalGame,
  Game,
  GameDetails,
  GameType,
  LiveGame,
  PeriodSummary,
  ScheduledGame,
  ScoringPlay,
  ScoringPlayAssister,
  Team,
} from "~/components/types";
import {
  type Game as ApiGame,
  type GameType as ApiGameType,
  type FinishedGame,
  type GamecenterResponse,
  type GamecenterScoring,
  type LiveGame as ApiLiveGame,
  isFutureGame,
  isFinishedGame,
  type Team as ApiTeam,
  type TeamWithScore,
  type GameSituation,
  type GamecenterScoringGoalAssist,
} from "~/api/types";

type NormalizeGames = (games: ApiGame[]) => Game[];
export const normalizeGames: NormalizeGames = (games) =>
  games.map(normalizeGame);

const ApiGameTypeToGameType: Record<ApiGameType, GameType> = {
  "1": "PR",
  "2": "R",
  "3": "P",
};

type NormalizeTeam = (team: ApiTeam, situation?: GameSituation) => Team;
const normalizeTeam: NormalizeTeam = (team, situation) => {
  const isOnPowerPlay =
    situation?.teamAbbrev === team.abbrev && situation.situationCode === "PP";

  return {
    abbreviation: team.abbrev,
    id: team.id,
    isGoaliePulled: false,
    isOnPowerPlay: isOnPowerPlay,
    name: team.placeName.default,
    score: 0,
  };
};

type NormalizeTeamWithScore = (
  team: TeamWithScore<ApiTeam>,
  situation?: GameSituation
) => Team;
const normalizeTeamWithScore: NormalizeTeamWithScore = (team, situation) => {
  return {
    ...normalizeTeam(team, situation),
    score: team.score,
  };
};

type NormalizeScheduledGame = (game: ApiGame) => ScheduledGame;
const normalizeScheduledGame: NormalizeScheduledGame = (game) => {
  return {
    awayTeam: normalizeTeam(game.awayTeam),
    homeTeam: normalizeTeam(game.homeTeam),
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
  return {
    awayTeam: normalizeTeamWithScore(game.awayTeam),
    homeTeam: normalizeTeamWithScore(game.homeTeam),
    id: game.id,
    isCurrentlyInProgress: false,
    startTime: game.startTimeUTC,
    status: {
      abstract: "Final",
      detailed: "Final",
    },
    type: ApiGameTypeToGameType[game.gameType],
    endedInPeriod: game.periodDescriptor?.number ?? 1,
  };
};

type NormalizeLiveGame = (game: ApiLiveGame) => LiveGame;
const normalizeLiveGame: NormalizeLiveGame = (game) => {
  return {
    awayTeam: normalizeTeamWithScore(game.awayTeam, game.situation),
    currentPeriod: game.periodDescriptor?.number ?? 1,
    currentPeriodTimeRemaining: game.clock.inIntermission
      ? "END"
      : game.clock.timeRemaining,
    homeTeam: normalizeTeamWithScore(game.homeTeam, game.situation),
    id: game.id,
    isCurrentlyInProgress: true,
    startTime: game.startTimeUTC,
    status: {
      abstract: "Live",
      detailed: "In Progress",
    },
    sog: {
      away: 0,
      home: 0,
    },
    type: ApiGameTypeToGameType[game.gameType],
  };
};

type NormalizeGame = (game: ApiGame) => Game;
export const normalizeGame: NormalizeGame = (game) => {
  if (game.gameState === "FINAL" || game.gameState === "OFF") {
    return normalizeFinalGame(game);
  }

  if (game.gameState === "LIVE" || game.gameState === "CRIT") {
    return normalizeLiveGame(game);
  }

  return normalizeScheduledGame(game);
};

const normalizeAssist = (
  assist?: GamecenterScoringGoalAssist
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
      primaryAssist: normalizeAssist(g.assists[0]),
      secondaryAssist: normalizeAssist(g.assists[1]),
    }));
    return accum;
  }, {});
};

type NormalizeGameDetails = (response: GamecenterResponse) => GameDetails;
export const normalizeGameDetails: NormalizeGameDetails = (response) => {
  if (isFutureGame(response)) {
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

  if (isFinishedGame(response)) {
    return {
      game: {
        ...normalizeFinalGame(response),
        endedInPeriod:
          response.summary.linescore.byPeriod[
            response.summary.linescore.byPeriod.length - 1
          ].period,
      },
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
