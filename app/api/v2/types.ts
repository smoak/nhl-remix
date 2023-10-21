type DayAbbrev = "SAT" | "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI";
type PeriodType = "REG" | "OT";

type BaseScoreTeam = {
  readonly id: number;
  readonly name: {
    readonly default: string;
  };
  readonly abbrev: string;
  readonly logo: string;
};

export type LiveScoreTeam = BaseScoreTeam & {
  readonly score: number;
  readonly sog: number;
};

type FutureScoreTeam = BaseScoreTeam & {
  readonly record: string;
  readonly odds: object[];
};

type BaseGame = {
  readonly id: number;
  readonly season: number;
  readonly gameType: number;
  readonly gameDate: string;
  readonly venue: {
    readonly default: string;
  };
  readonly startTimeUTC: string;
  readonly easternUTCOffset: string;
  readonly venueUTCOffset: string;
  readonly gameState: "PRE" | "OFF" | "FINAL" | "LIVE" | "FUT" | "CRIT";
  readonly gameScheduleState: "OK";
  readonly gameCenterLink?: string;
  readonly neutralSite?: boolean;
  readonly venueTimezone?: string;
};

type GameClock = {
  readonly timeRemaining: string;
  readonly secondsRemaining: number;
  readonly running: boolean;
  readonly inIntermission: boolean;
};

type LiveGameTeamSituation = {
  readonly abbrev: string;
  readonly situationDescriptions?: string[];
  readonly strength: number;
};

type LiveGameSituation = {
  readonly homeTeam: LiveGameTeamSituation;
  readonly awayTeam: LiveGameTeamSituation;
  readonly situationCode: string;
  readonly timeRemaining: string;
  readonly secondsRemaining: number;
};

type PeriodDescriptor = {
  readonly number: number;
  readonly periodType: PeriodType;
};

type LiveGameGoals = {
  readonly period: number;
  readonly periodDescriptor: PeriodDescriptor;
  readonly timeInPeriod: string;
  readonly playerId: number;
  readonly name: {
    readonly default: string;
  };
  readonly mugshot: string;
  readonly teamAbbrev: string;
  readonly goalsToDate: number;
  readonly awayScore: number;
  readonly homeScore: number;
  readonly strength: "PP" | "EV" | "SHG";
};

export type LiveGame = BaseGame & {
  readonly gameState: "LIVE" | "CRIT";
  readonly awayTeam: LiveScoreTeam;
  readonly homeTeam: LiveScoreTeam;
  readonly clock: GameClock;
  readonly period: number;
  readonly periodDescriptor: PeriodDescriptor;
  readonly situation?: LiveGameSituation;
  readonly goals: LiveGameGoals[];
};

export type FutureGame = BaseGame & {
  readonly ticketsLink?: string;
  readonly gameState: "FUT" | "PRE";
  readonly awayTeam: FutureScoreTeam;
  readonly homeTeam: FutureScoreTeam;
};

export type FinalGame = Omit<LiveGame, "gameState"> & {
  readonly gameState: "FINAL";
  readonly gameOutcome: {
    readonly lastPeriodType: PeriodType;
  };
};

export type Game = LiveGame | FutureGame | FinalGame;

type GameWeek = {
  readonly date: string;
  readonly dayAbbrev: DayAbbrev;
  readonly numberOfGames: number;
  readonly games: Game[];
};

type OddsPartner = {
  readonly partnerId: number;
  readonly country: string;
  readonly name: string;
  readonly imageUrl: string;
  readonly siteUrl: string;
  readonly bgColor: string;
  readonly textColor: string;
  readonly accentColor: string;
};

export type ScheduleResponse = {
  readonly nextStartDate: string;
  readonly previousStartDate: string;
  readonly gameWeek: GameWeek[];
  readonly oddsPartners: OddsPartner[];
  readonly preSeasonStartDate: string;
  readonly regularSeasonStartDate: string;
  readonly regularSeasonEndDate: string;
  readonly playoffEndDate: string;
  readonly numberOfGames: number;
};

export type ScoreResponse = {
  readonly prevDate: string;
  readonly gameWeek: object[];
  readonly games: Game[];
};

type BaseBoxscoreGame = Omit<
  BaseGame,
  "neutralSite" | "gameCenterLink" | "venuTimezone"
> & {
  readonly clock: GameClock;
};

export type BoxscoreFutureGame = BaseBoxscoreGame & {
  readonly gameState: "FUT" | "PRE";
  readonly awayTeam: BaseScoreTeam;
  readonly homeTeam: BaseScoreTeam;
};

type LinescoreByPeriod = {
  readonly period: number;
  readonly periodDescriptor: PeriodDescriptor;
  readonly away: number;
  readonly home: number;
};

export type Linescore = {
  readonly byPeriod: LinescoreByPeriod[];
  readonly totals: {
    readonly away: number;
    readonly home: number;
  };
};

type ShotsByPeriod = {
  readonly period: number;
  readonly periodDescriptor: PeriodDescriptor;
  readonly away: number;
  readonly home: number;
};

// type Boxscore = {
//   readonly linescore: Linescore;
//   readonly shotsByPeriod: ShotsByPeriod[];
//   readonly gameReports: {
//     readonly gameSummary: string;
//     readonly eventSummary: string;
//     readonly playByPlay: string;
//     readonly faeoffSummary: string;
//     readonly faceoffComparison: string;
//     readonly rosters: string;
//     readonly shotSummary: string;
//     readonly shiftChart: string;
//     readonly toiAway: string;
//     readonly toiHome: string;
//   };
//   readonly playerByGameStats: {
//     awayTeam: object;
//     homeTeam: object;
//   };
//   readonly gameInfo: {
//     readonly referees: object[];
//     readonly linesme: object[];
//     readonly awayTeam: object;
//     readonly homeTeam: object;
//   };
// };

type BoxscoreSummary = {
  readonly linescore: Linescore;
  readonly scoring: object[];
  readonly shootout: object[];
  readonly threeStarts: object[];
  readonly shotsByPeriod: ShotsByPeriod[];
};

export type BoxscoreFinalGame = BaseBoxscoreGame & {
  readonly gameState: "FINAL";
  readonly awayTeam: LiveScoreTeam;
  readonly homeTeam: LiveScoreTeam;
  readonly summary: BoxscoreSummary;
};

export type BoxscoreLiveGame = BaseBoxscoreGame & {
  readonly gameState: "LIVE";
  readonly awayTeam: LiveScoreTeam;
  readonly homeTeam: LiveScoreTeam;
  readonly summary: BoxscoreSummary;
  readonly seasonSeries: object[];
  readonly situation?: LiveGameSituation;
};

export type BoxscoreResponse =
  | BoxscoreFutureGame
  | BoxscoreLiveGame
  | BoxscoreFinalGame;

export const isLiveBoxscoreGame = (
  game: BoxscoreResponse
): game is BoxscoreLiveGame => game.gameState === "LIVE";

export const isFutureBoxscoreGame = (
  game: BoxscoreResponse
): game is BoxscoreFutureGame => game.gameState === "FUT";

export const isLiveGame = (game: Game): game is LiveGame =>
  game.gameState === "LIVE" || game.gameState === "CRIT";

export const isFutureGame = (game: Game): game is FutureGame =>
  game.gameState === "FUT" || game.gameState == "PRE";
