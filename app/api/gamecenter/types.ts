import type {
  GameSituation,
  GameState,
  GameType,
  GameVenue,
  PeriodDescriptor,
} from "../types";

export type GamecenterBaseTeam = {
  readonly id: number;
  readonly abbrev: string;
  readonly name: { readonly default: string };
  readonly logo: string;
};

type GamecenterBaseResponse = {
  readonly id: number;
  readonly season: number;
  readonly gameType: GameType;
  readonly gameDate: string;
  readonly venue: GameVenue;
  readonly startTimeUTC: string;
  readonly gameState: GameState;
  readonly gameScheduleState: "OK";
};

type GamecenterBoxscoreFinishedTeam = GamecenterBaseTeam & {
  readonly score: number;
  readonly sog: number;
  readonly faceoffWinningPctg: number;
  readonly powerPlayConversion: string;
  readonly pim: number;
};

type GamecenterBoxscoreClock = {
  readonly timeRemaining: string;
  readonly secondsRemaining: number;
  readonly running: boolean;
  readonly inIntermission: boolean;
};

type GamecenterBoxscoreLiveTeam = GamecenterBaseTeam & {
  readonly score: number;
  readonly sog: number;
};

type GamecenterLandingFinishedTeam = GamecenterBaseTeam & {
  readonly score: number;
  readonly sog: number;
};

export type GamecenterBoxscoreFinishedGame = GamecenterBaseResponse & {
  readonly awayTeam: GamecenterBoxscoreFinishedTeam;
  readonly homeTeam: GamecenterBoxscoreFinishedTeam;
  readonly period: number;
  readonly periodDescriptor: PeriodDescriptor;
  readonly gameState: "OFF" | "FINAL";
};

export type GamecenterBoxscoreFutureGame = GamecenterBaseResponse & {
  readonly awayTeam: GamecenterBaseTeam;
  readonly homeTeam: GamecenterBaseTeam;
  readonly gameState: "FUT";
};

export type GamecenterBoxscoreLiveGame = GamecenterBaseResponse & {
  readonly gameState: "LIVE" | "CRIT";
  readonly awayTeam: GamecenterBoxscoreLiveTeam;
  readonly homeTeam: GamecenterBoxscoreLiveTeam;
  readonly period: number;
  readonly periodDescriptor: PeriodDescriptor;
  readonly clock: GamecenterBoxscoreClock;
  readonly situation?: GameSituation;
};

export type GamecenterLandingFinishedGame = GamecenterBaseResponse & {
  readonly gameState: "OFF";
  readonly homeTeam: GamecenterLandingFinishedTeam;
  readonly awayTeam: GamecenterLandingFinishedTeam;
  readonly summary: GamecenterLandingSummary;
};

export type GamecenterLandingFutureGame = GamecenterBaseResponse & {
  readonly gameState: "FUT";
  readonly awayTeam: GamecenterBaseTeam;
  readonly homeTeam: GamecenterBaseTeam;
};

export type GamecenterBoxscoreResponse =
  | GamecenterBoxscoreFinishedGame
  | GamecenterBoxscoreFutureGame
  | GamecenterBoxscoreLiveGame;

export type GamecenterLandingResponse =
  | GamecenterLandingFinishedGame
  | GamecenterLandingFutureGame;

type GamecenterLandingSummaryLinescorePeriod = {
  readonly period: number;
  readonly periodDescriptor: PeriodDescriptor;
  readonly away: number;
  readonly home: number;
};

type GamecenterLandingSummaryLinescore = {
  readonly byPeriod: GamecenterLandingSummaryLinescorePeriod[];
  readonly totals: {
    readonly away: number;
    readonly home: number;
  };
};

export type GamecenterLandingSummaryScoringGoalAssist = {
  readonly playerId: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly assistsToDate: number;
};

export type GamecenterLandingSummaryScoringGoal = {
  readonly situationCode: string;
  readonly strength: "ev" | "pp" | "sh";
  readonly playerId: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly name: string;
  readonly teamAbbrev: string;
  readonly headshot: string;
  readonly highlightClip: number;
  readonly goalsToDate: number;
  readonly awayScore: number;
  readonly homeScore: number;
  readonly leadingTeamAbbrev?: string;
  readonly timeInPeriod: string;
  readonly shotType: string;
  readonly goalModifier: string;
  readonly assists: GamecenterLandingSummaryScoringGoalAssist[];
};

export type GamecenterLandingSummaryScoring = {
  readonly period: number;
  readonly periodDescriptor: PeriodDescriptor;
  readonly goals: GamecenterLandingSummaryScoringGoal[];
};

type GamecenterLandingSummary = {
  readonly linescore: GamecenterLandingSummaryLinescore;
  readonly scoring: GamecenterLandingSummaryScoring[];
  readonly shootout: object[];
  readonly threeStars: object[];
  readonly teamGameStats: object[];
  readonly shotsByPeriod: object[];
  readonly penalties: object[];
  readonly seasonSeries: object[];
  readonly gameVideo: {
    readonly threeMinRecap: number;
    readonly condensedGame: number;
  };
};

export const isFutureGamecenterResponse = (
  response: GamecenterBaseResponse
): response is GamecenterBoxscoreFutureGame | GamecenterLandingFutureGame =>
  response.gameState === "FUT";

export const isFinishedGamecenterResponse = (
  response: GamecenterBaseResponse
): response is GamecenterBoxscoreFinishedGame | GamecenterLandingFinishedGame =>
  response.gameState === "OFF" || response.gameState === "FINAL";
