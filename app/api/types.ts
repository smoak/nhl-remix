export type I18NString = {
  readonly default: string;
  readonly cs?: string;
  readonly fr?: string;
  readonly sk?: string;
};

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
export type GameScheduleState = "OK" | "CNCL" | "PPD";

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
  readonly otPeriods?: number;
  readonly maxRegulationPeriods: number;
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
  readonly gameScheduleState: GameScheduleState;
  readonly tvBroadcasts: object[];
  readonly awayTeam: Team;
  readonly homeTeam: Team;
  readonly gameCenterLink?: string;
};

export type RegularSeasonLiveGame = BaseGame & {
  readonly gameState: "LIVE" | "CRIT";
  readonly periodDescriptor: PeriodDescriptor;
  readonly clock: GameClock;
  readonly situation?: GameSituation;
  readonly homeTeam: LiveTeam;
  readonly awayTeam: LiveTeam;
};

export type PlayoffLiveGame = RegularSeasonLiveGame & {
  readonly seriesStatus: SeriesStatus;
};

export type LiveGame = RegularSeasonLiveGame | PlayoffLiveGame;

export type SeriesStatus = {
  readonly round: number;
  readonly seriesAbbrev: string;
  readonly seriesLetter: string;
  readonly neededToWin: number;
  readonly topSeedTeamAbbrev: string;
  readonly topSeedWins: number;
  readonly bottomSeedTeamAbbrev: string;
  readonly bottomSeedWins: number;
  readonly gameNumberOfSeries: number;
};

export type RegularSeasonFutureGame = BaseGame & {
  readonly homeTeam: FutureTeam;
  readonly awayTeam: FutureTeam;
  readonly gameState: "FUT" | "PRE";
  readonly ticketsLink: string;
};

export type PlayoffFutureGame = RegularSeasonFutureGame & {
  readonly seriesStatus: SeriesStatus;
};

export type FutureGame = RegularSeasonFutureGame | PlayoffFutureGame;

export type RegularSeasonFinishedGame = BaseGame & {
  readonly gameState: "OFF" | "FINAL";
  readonly periodDescriptor: PeriodDescriptor;
  readonly gameOutcome: GameOutcome;
  readonly threeMinRecap: string;
  readonly homeTeam: FinishedTeam;
  readonly awayTeam: FinishedTeam;
};

export type PlayoffFinishedGame = RegularSeasonFinishedGame & {
  readonly seriesStatus: SeriesStatus;
};

export type FinishedGame = RegularSeasonFinishedGame | PlayoffFinishedGame;

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

export type PlayoffBracketTeam = {
  readonly id: number;
  readonly abbrev: string;
  readonly name: I18NString;
  readonly commonName: I18NString;
  readonly placeNameWithPreposition: I18NString;
  readonly logo: string;
  readonly darkLogo: string;
};

type FuturePlayoffSeries = {
  readonly seriesTitle: string;
  readonly seriesAbbrev: string;
  readonly seriesLetter: string;
  readonly playoffRound: number;
  readonly topSeedRank: number;
  readonly topSeedWins: number;
  readonly bottomSeedRank: number;
  readonly bottomSeedWins: number;
};

export type LivePlayoffSeries = {
  readonly seriesUrl: string;
  readonly seriesTitle: string;
  readonly seriesAbbrev: string;
  readonly seriesLetter: string;
  readonly playoffRound: number;
  readonly topSeedRank: number;
  readonly topSeedRankAbbrev: string;
  readonly topSeedWins: number;
  readonly bottomSeedRank: number;
  readonly bottomSeedRankAbbrev: string;
  readonly bottomSeedWins: number;
  readonly winningTeamId?: number;
  readonly losingTeamId?: number;
  readonly topSeedTeam: PlayoffBracketTeam;
  readonly bottomSeedTeam: PlayoffBracketTeam;
};

export type PlayoffBracketSeries = FuturePlayoffSeries | LivePlayoffSeries;

export const isLivePlayoffSeries = (
  series: PlayoffBracketSeries,
): series is LivePlayoffSeries =>
  (series as LivePlayoffSeries).topSeedTeam != null;

export type PlayoffBracketResponse = {
  readonly bracketLogo: string;
  readonly bracketLogoFr: string;
  readonly series: PlayoffBracketSeries[];
};

export const isLiveGame = (game: Game): game is LiveGame =>
  game.gameState === "LIVE" || game.gameState === "CRIT";

export const isFinishedGame = (game: Game): game is FinishedGame =>
  game.gameState === "FINAL" || game.gameState === "OFF";

export const isFutureGame = (game: Game): game is FutureGame =>
  game.gameState === "FUT" || game.gameState === "PRE";

export const isPlayoffGame = (
  game: FinishedGame | FutureGame | LiveGame,
): game is PlayoffFinishedGame | PlayoffFutureGame | PlayoffLiveGame =>
  game.gameType === 3;
