import type {
  GameScheduleState,
  GameSituation,
  GameState,
  GameType,
  GameVenue,
  I18NString,
  PeriodDescriptor,
} from "../types";

export type GamecenterBaseTeam = {
  readonly id: number;
  readonly abbrev: string;
  readonly commonName: I18NString;
  readonly placeName: I18NString;
  readonly placeNameWithPreposition: I18NString;
  readonly logo: string;
  readonly darkLogo: string;
};

type GamecenterBaseResponse = {
  readonly id: number;
  readonly season: number;
  readonly gameType: GameType;
  readonly gameDate: string;
  readonly venue: GameVenue;
  readonly startTimeUTC: string;
  readonly gameState: GameState;
  readonly gameScheduleState: GameScheduleState;
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

export type GamecenterRightRailResponseGameVideo = {
  readonly threeMinRecap: number;
  readonly threeMinRecapFr: number;
  readonly condensedGame: number;
  readonly condensedGameFr: number;
};

export type GamecenterRightRailBaseResponse = {
  readonly seasionSeries: object[];
  readonly seasonSeriesWins: {
    readonly awayTeamWins: number;
    readonly homeTeamWins: number;
  };
};

export type GamecenterRightRailFinishedGame =
  GamecenterRightRailBaseResponse & {
    readonly gameVideo: GamecenterRightRailResponseGameVideo;
    readonly linescore: GamecenterRightRailLinescore;
  };

export type GamecenterRightRailFutureGame = GamecenterRightRailBaseResponse & {
  readonly last10Record: object;
};

export type GamecenterRightRailLiveGame = GamecenterRightRailBaseResponse & {
  readonly linescore: GamecenterRightRailLinescore;
};

export type GamecenterRightRailResponse =
  | GamecenterRightRailFutureGame
  | GamecenterRightRailLiveGame
  | GamecenterRightRailFinishedGame;

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
  readonly goalsToDate?: number;
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

type BasePenalty = {
  readonly timeInPeriod: string;
  readonly duration: number;
  readonly descKey: string;
  readonly teamAbbrev: I18NString;
};

type MinorPenalty = BasePenalty & {
  readonly type: "MIN";
  readonly committedByPlayer: I18NString;
  readonly drawnBy?: I18NString;
};

type MajorPenalty = BasePenalty & {
  readonly type: "MAJ";
  readonly committedByPlayer: I18NString;
  readonly drawnBy?: I18NString;
};

type BenchMinorPenalty = BasePenalty & {
  readonly type: "BEN";
  readonly servedBy: I18NString;
};

type GameMisconductPenalty = BasePenalty & {
  readonly type: "GAM";
};

export type Penalty = MinorPenalty | MajorPenalty | BenchMinorPenalty;

export type GamecenterLandingSummaryPenalty = {
  readonly periodDescriptor: PeriodDescriptor;
  readonly penalties: Penalty[];
};

type GamecenterLandingSummary = {
  readonly scoring: GamecenterLandingSummaryScoring[];
  readonly shootout: object[];
  readonly threeStars: object[];
  readonly teamGameStats?: object[];
  readonly shotsByPeriod?: object[];
  readonly penalties: GamecenterLandingSummaryPenalty[];
  readonly seasonSeries: object[];
  readonly gameVideo: {
    readonly threeMinRecap: number;
    readonly condensedGame: number;
  };
};

export const isFutureGamecenterResponse = (
  response: GamecenterBaseResponse,
): response is GamecenterBoxscoreFutureGame | GamecenterLandingFutureGame =>
  response.gameState === "FUT" || response.gameState === "PRE";

export const isFinishedGamecenterResponse = (
  response: GamecenterBaseResponse,
): response is GamecenterBoxscoreFinishedGame | GamecenterLandingFinishedGame =>
  response.gameState === "OFF" || response.gameState === "FINAL";

export const isFinishedGamecenterRightRailResponse = (
  response: GamecenterRightRailResponse,
): response is GamecenterRightRailFinishedGame => {
  return (response as GamecenterRightRailFinishedGame).gameVideo != null;
};
