import type {
  GameSituation,
  GameState,
  GameType,
  GameVenue,
  PeriodDescriptor,
} from "../types";

type I18NString = {
  readonly default: string;
  readonly cs?: string;
  readonly sk?: string;
};

export type GamecenterBaseTeam = {
  readonly id: number;
  readonly abbrev: string;
  readonly name: I18NString;
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

export type GamecenterLandingFinishedTeam = GamecenterBaseTeam & {
  readonly score: number;
  readonly sog: number;
};

export type GamecenterBoxscoreFinishedGame = GamecenterBaseResponse & {
  readonly awayTeam: GamecenterBoxscoreFinishedTeam;
  readonly homeTeam: GamecenterBoxscoreFinishedTeam;
  readonly periodDescriptor: PeriodDescriptor;
  readonly gameState: "OFF" | "FINAL";
  readonly gameVideo?: {
    readonly threeMinRecap: number;
    readonly condensedGame: number;
  };
};

export type GamecenterBoxscoreFutureGame = GamecenterBaseResponse & {
  readonly awayTeam: GamecenterBaseTeam;
  readonly homeTeam: GamecenterBaseTeam;
  readonly gameState: "FUT" | "PRE";
};

export type GamecenterBoxscoreLiveGame = GamecenterBaseResponse & {
  readonly gameState: "LIVE" | "CRIT";
  readonly awayTeam: GamecenterBoxscoreLiveTeam;
  readonly homeTeam: GamecenterBoxscoreLiveTeam;
  readonly periodDescriptor: PeriodDescriptor;
  readonly clock: GamecenterBoxscoreClock;
  readonly situation?: GameSituation;
};

export type GamecenterLandingFinishedGame = GamecenterBaseResponse & {
  readonly gameState: "OFF" | "FINAL";
  readonly homeTeam: GamecenterLandingFinishedTeam;
  readonly awayTeam: GamecenterLandingFinishedTeam;
  readonly summary: GamecenterLandingSummary;
};

export type GamecenterLandingLiveGame = GamecenterBaseResponse & {
  readonly gameState: "LIVE" | "CRIT";
  readonly summary: GamecenterLandingSummary;
  readonly homeTeam: GamecenterLandingFinishedTeam;
  readonly awayTeam: GamecenterLandingFinishedTeam;
};

export type GamecenterLandingFutureGame = GamecenterBaseResponse & {
  readonly gameState: "FUT" | "PRE";
  readonly awayTeam: GamecenterBaseTeam;
  readonly homeTeam: GamecenterBaseTeam;
};

export type GamecenterCombinedFinishedResponse = {
  readonly gameState: "OFF" | "FINAL";
  readonly landing: GamecenterLandingFinishedGame;
  readonly boxscore: GamecenterBoxscoreFinishedGame;
};

export type GamecenterCombinedFutureResponse = {
  readonly gameState: "FUT" | "PRE";
  readonly landing: GamecenterLandingFutureGame;
  readonly boxscore: GamecenterBoxscoreFutureGame;
};

export type GamecenterCombinedResponse =
  | GamecenterCombinedFinishedResponse
  | GamecenterCombinedFutureResponse;

export type GamecenterBoxscoreResponse =
  | GamecenterBoxscoreFinishedGame
  | GamecenterBoxscoreFutureGame
  | GamecenterBoxscoreLiveGame;

export type GamecenterLandingResponse =
  | GamecenterLandingFinishedGame
  | GamecenterLandingFutureGame
  | GamecenterLandingLiveGame;

export type GamecenterRightFailFinishedGame = {
  readonly linescore: GamecenterRightRailLinescore;
};

export type GamecenterRightRailResponse = GamecenterRightFailFinishedGame;

type GamecenterRightRailLinescorePeriod = {
  readonly periodDescriptor: PeriodDescriptor;
  readonly away: number;
  readonly home: number;
};

type GamecenterRightRailLinescore = {
  readonly byPeriod: GamecenterRightRailLinescorePeriod[];
  readonly totals: {
    readonly away: number;
    readonly home: number;
  };
};

export type GamecenterLandingSummaryScoringGoalAssist = {
  readonly playerId: number;
  readonly firstName: I18NString;
  readonly lastName: I18NString;
  readonly assistsToDate: number;
};

export type GamecenterLandingSummaryScoringGoal = {
  readonly situationCode: string;
  readonly strength: "ev" | "pp" | "sh";
  readonly playerId: number;
  readonly firstName: I18NString;
  readonly lastName: I18NString;
  readonly name: I18NString;
  readonly teamAbbrev: I18NString;
  readonly headshot: string;
  readonly highlightClip?: number;
  readonly goalsToDate: number;
  readonly awayScore: number;
  readonly homeScore: number;
  readonly leadingTeamAbbrev?: I18NString;
  readonly timeInPeriod: string;
  readonly shotType: string;
  readonly goalModifier: string;
  readonly assists: GamecenterLandingSummaryScoringGoalAssist[];
};

export type GamecenterLandingSummaryScoring = {
  readonly periodDescriptor: PeriodDescriptor;
  readonly goals: GamecenterLandingSummaryScoringGoal[];
};

type GamecenterLandingSummary = {
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
  response.gameState === "FUT" || response.gameState === "PRE";

export const isFinishedGamecenterResponse = (
  response: GamecenterBaseResponse
): response is GamecenterBoxscoreFinishedGame | GamecenterLandingFinishedGame =>
  response.gameState === "OFF" || response.gameState === "FINAL";
