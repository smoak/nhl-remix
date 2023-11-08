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

type GameState = "FUT" | "OFF" | "FINAL" | "LIVE" | "PRE" | "CRIT";

type GameWeek = {
  readonly date: string;
  readonly dayAbbrev: string;
  readonly numberOfGames: number;
  readonly games: Game[];
};

type GameVenue = {
  readonly default: string;
};

type AwayTeam = Team & {
  readonly awaySplitSquad?: boolean;
};

type HomeTeam = Team & {
  readonly homeSplitSquad?: boolean;
};

export type Team = {
  readonly id: number;
  readonly placeName: {
    readonly default: string;
    readonly fr?: string;
  };
  readonly abbrev: string;
  readonly logo: string;
  readonly darkLogo?: string;
  readonly radioLink?: string;
};

type TeamWithOdds<T extends Team> = T & {
  readonly odds?: object[];
};

export type TeamWithScore<T extends Team> = T & {
  readonly score: number;
};

// type TeamWithSog<T extends Team> = T & {
//   readonly sog: number;
// };

type PeriodType = "REG" | "SO" | "OT";

type PeriodDescriptor = {
  readonly number: number;
  readonly periodType: PeriodType;
};

type GameOutcome = {
  readonly lastPeriodType: PeriodType;
};

type WinningPlayer = {
  readonly playerId: number;
  readonly firstInitial: {
    readonly default: string;
  };
  readonly lastName: {
    readonly default: string;
  };
};

// 1 - pre season
// 2 - regular season
// 3 - playoff
export type GameType = 1 | 2 | 3;

type SeriesStatus = {
  readonly round: number;
  readonly gameNumberOfSeries: number;
  readonly roundAbbrev: string;
  readonly roundCode: string;
  readonly seriesLetter: string;
  readonly neededToWin: number;
  readonly length: number;
  readonly topSeedTeamId: number;
  readonly topSeedWins: number;
  readonly bottomSeedTeamId: number;
  readonly bottomSeedWins: number;
  readonly awayTeamWins: number;
  readonly homeTeamWins: number;
};

type PowerPlayGameSituation = {
  readonly teamAbbrev: string;
  readonly timeRemaining: string;
  readonly situationCode: "PP";
};

// type EmptyNetSituation = {
//   readonly awayTeam: {
//     readonly abbrev: string;
//     readonly situationDescriptions: string[];
//     readonly strength: number;
//   };
//   readonly homeTeam: {
//     readonly abbrev: string;
//     readonly strength: number;
//   };
//   readonly situationCode: "0651";
// };

export type GameSituation = PowerPlayGameSituation;

type BaseGame = {
  readonly id: number;
  readonly season: number;
  readonly gameType: GameType;
  readonly venue: GameVenue;
  readonly neutralSite?: boolean;
  readonly startTimeUTC: string;
  readonly easternUTCOffset: string;
  readonly venueUTCOffset: string;
  readonly venueTimezone: string;
  readonly gameState: GameState;
  readonly gameScheduleState: "OK";
  readonly tvBroadcasts: object[];
  readonly awayTeam: AwayTeam;
  readonly homeTeam: HomeTeam;
  readonly periodDescriptor?: object | PeriodDescriptor;
  readonly gameCenterLink?: string;
};

export type LiveGame = BaseGame & {
  readonly gameState: "LIVE" | "CRIT";
  readonly awayTeam: TeamWithScore<AwayTeam>;
  readonly homeTeam: TeamWithScore<HomeTeam>;
  readonly periodDescriptor?: PeriodDescriptor;
  readonly clock: GameClock;
  readonly situation?: GameSituation;
};

export type FutureGame = BaseGame & {
  readonly neutralSite: boolean;
  readonly gameState: "FUT" | "PRE";
  readonly periodDescriptor?: object;
  readonly awayTeam: TeamWithOdds<AwayTeam>;
  readonly homeTeam: TeamWithOdds<HomeTeam>;
  readonly ticketsLink: string;
};

export type FinishedGame = BaseGame & {
  readonly neutralSite: boolean;
  readonly gameState: "OFF" | "FINAL";
  readonly awayTeam: TeamWithScore<AwayTeam>;
  readonly homeTeam: TeamWithScore<HomeTeam>;
  readonly periodDescriptor?: PeriodDescriptor;
  readonly gameOutcome: GameOutcome;
  readonly winningGoalie: WinningPlayer;
  readonly winningGoalScorer: WinningPlayer;
  readonly seriesStatus?: SeriesStatus;
  readonly specialEvent?: {
    readonly default: string;
  };
  readonly threeMinRecap?: string;
};

export type Game = FutureGame | FinishedGame | LiveGame;

export type GamecenterTeam = {
  readonly id: number;
  readonly name: {
    readonly default: string;
  };
  readonly abbrev: string;
  readonly placeName: {
    readonly default: string;
  };
  readonly score: number;
  readonly sog: number;
  readonly logo: string;
};

type GamecenterClock = {
  readonly timeRemaining: string;
  readonly secondsRemaining: number;
  readonly running: boolean;
  readonly inIntermission: boolean;
};

type GamecenterLinescorePeriod = {
  readonly period: number;
  readonly periodDescriptor: PeriodDescriptor;
  readonly away: number;
  readonly home: number;
};

type GamecenterLinescore = {
  readonly byPeriod: GamecenterLinescorePeriod[];
  readonly totals: {
    readonly away: number;
    readonly home: number;
  };
};

export type GamecenterScoringGoalAssist = {
  readonly playerId: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly assistsToDate: number;
};

type GamecenterScoringGoal = {
  readonly situationCode: string;
  readonly strength: "ev" | "pp";
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
  readonly assists: GamecenterScoringGoalAssist[];
};

export type GamecenterScoring = {
  readonly period: number;
  readonly periodDescriptor: PeriodDescriptor;
  readonly goals: GamecenterScoringGoal[];
};

type GamecenterSummary = {
  readonly linescore: GamecenterLinescore;
  readonly scoring: GamecenterScoring[];
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

export type GamecenterResponse = Game & {
  readonly gameDate: string;
  readonly awayTeam: GamecenterTeam;
  readonly homeTeam: GamecenterTeam;
  readonly shootoutInUse: boolean;
  readonly maxPeriods: number;
  readonly regPeriods: number;
  readonly otInUse: boolean;
  readonly tiesInUse: boolean;
  readonly clock: GamecenterClock;
  readonly summary: GamecenterSummary;
};

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
