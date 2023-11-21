export type ScoreResponse = {
  readonly prevDate: string;
  readonly currentDate: string;
  readonly nextDate: string;
  readonly gameWeek: object[];
  readonly oddsPartners: object[];
  readonly games: Game[];
};

export type ScheduleResponse = {
  readonly nextStartDate: string;
  readonly previousStartDate: string;
  readonly gameWeek: GameWeek[];
  readonly oddsPartners?: object[];
  readonly preSeasonStartDate: string;
  readonly regularSeasonStartDate: string;
  readonly regularSeasonEndDate: string;
  readonly playoffEndDate: string;
  readonly numberOfGames: number;
};

export type GameState = "FUT" | "OFF" | "FINAL" | "LIVE" | "PRE" | "CRIT";

type GameWeek = {
  readonly date: string;
  readonly dayAbbrev: string;
  readonly numberOfGames: number;
  readonly games: Game[];
};

export type GameVenue = {
  readonly default: string;
};

export type Team = {
  readonly id: number;
  readonly name: {
    readonly default: string;
  };
  readonly abbrev: string;
  readonly logo: string;
};

export type LiveTeam = Team & {
  readonly score: number;
};

export type FutureTeam = Team & {
  readonly record: string;
};

export type FinishedTeam = Team & {
  readonly score: number;
  readonly sog: number;
};

export type PeriodType = "REG" | "SO" | "OT";

export type PeriodDescriptor = {
  readonly number: number;
  readonly periodType: PeriodType;
};

type GameOutcome = {
  readonly lastPeriodType: PeriodType;
};

// 1 - pre season
// 2 - regular season
// 3 - playoff
export type GameType = 1 | 2 | 3;

export type GameSituation = {
  readonly homeTeam: {
    readonly abbrev: string;
    readonly situationDescriptions?: string[];
    readonly strength: number;
  };
  readonly awayTeam: {
    readonly abbrev: string;
    readonly situationDescriptions?: string[];
    readonly strength: number;
  };
  readonly situationCode: "1451" | "1541" | "0651" | "1560";
  readonly timeRemaining: string;
  readonly secondsRemaining: number;
};

type BaseGame = {
  readonly id: number;
  readonly season: number;
  readonly gameType: GameType;
  readonly venue: GameVenue;
  readonly startTimeUTC: string;
  readonly easternUTCOffset: string;
  readonly venueUTCOffset: string;
  readonly gameState: GameState;
  readonly gameScheduleState: "OK";
  readonly tvBroadcasts: object[];
  readonly awayTeam: Team;
  readonly homeTeam: Team;
  readonly gameCenterLink?: string;
};

export type LiveGame = BaseGame & {
  readonly gameState: "LIVE" | "CRIT";
  readonly periodDescriptor: PeriodDescriptor;
  readonly clock: GameClock;
  readonly situation?: GameSituation;
  readonly homeTeam: LiveTeam;
  readonly awayTeam: LiveTeam;
};

export type FutureGame = BaseGame & {
  readonly homeTeam: FutureTeam;
  readonly awayTeam: FutureTeam;
  readonly gameState: "FUT" | "PRE";
  readonly ticketsLink: string;
};

export type FinishedGame = BaseGame & {
  readonly gameState: "OFF" | "FINAL";
  readonly periodDescriptor: PeriodDescriptor;
  readonly gameOutcome: GameOutcome;
  readonly threeMinRecap: string;
  readonly homeTeam: FinishedTeam;
  readonly awayTeam: FinishedTeam;
};

export type Game = FutureGame | FinishedGame | LiveGame;

type ScoreboardGame = {
  readonly id: number;
  readonly season: number;
  readonly gameType: GameType;
  readonly gameDate: string;
  readonly gameCenterLink: string;
  readonly venue: {
    readonly default: string;
  };
  readonly gameState: GameState;
  readonly gameScheduleState: "OK";
  readonly clock: GameClock;
  readonly situation?: GameSituation;
};

type GameClock = {
  readonly timeRemaining: string;
  readonly secondsRemaining: number;
  readonly running: boolean;
  readonly inIntermission: boolean;
};

type GamesByDate = {
  readonly date: string;
  readonly games: ScoreboardGame[];
};

export type ScoreboardResponse = {
  readonly focusedDate: string;
  readonly focusedDateCount: number;
  readonly gamesByDate: GamesByDate[];
};

export const isLiveGame = (game: Game): game is LiveGame =>
  game.gameState === "LIVE" || game.gameState === "CRIT";

export const isFinishedGame = (game: Game): game is FinishedGame =>
  game.gameState === "FINAL" || game.gameState === "OFF";

export const isFutureGame = (game: Game): game is FutureGame =>
  game.gameState === "FUT" || game.gameState === "PRE";
