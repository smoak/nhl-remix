export type ScoringPlayAssister = {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly seasonAssists: number;
};

export type ScoringPlay = {
  readonly period: number;
  readonly timeInPeriod: string;
  readonly goalScorer: {
    readonly id: number;
    readonly name: string;
    readonly seasonGoals: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly headshot: string;
  };
  readonly teamAbbrev: string;
  readonly highlightClip: number;
  readonly awayScore: number;
  readonly homeScore: number;
  readonly leadingTeamAbbrev?: string;
  readonly primaryAssist?: ScoringPlayAssister;
  readonly secondaryAssist?: ScoringPlayAssister;
};

export type GameType = "RegularSeason" | "PreSeason" | "Playoff";
export type GameState = "Live" | "Scheduled" | "Final";

type BaseGame = {
  readonly id: number;
  readonly type: GameType;
  readonly gameState: GameState;
  readonly homeTeam: Team;
  readonly awayTeam: Team;
};

export type GameClock = {
  readonly currentPeriod: number;
  readonly timeRemaining: string;
  readonly isIntermission: boolean;
};

export type TeamStats = {
  readonly score: number;
  readonly sog: number;
};

export type GameStats = {
  readonly homeTeam: TeamStats;
  readonly awayTeam: TeamStats;
};

type TeamSituation = "even" | "sh" | "pp" | "en";

export type GameSituation = {
  readonly homeTeam: TeamSituation;
  readonly awayTeam: TeamSituation;
};

export type LiveGame =
  | BaseGame & {
      readonly gameState: "Live";
      readonly gameClock: GameClock;
      readonly gameStats: GameStats;
      readonly gameSituation: GameSituation;
    };

export type ScheduledGame =
  | BaseGame & {
      readonly gameState: "Scheduled";
      readonly startTime: string;
    };

export type FinalGame =
  | BaseGame & {
      readonly gameState: "Final";
      readonly gameStats: GameStats;
      readonly endedInPeriod: number;
    };

export type Game = LiveGame | ScheduledGame | FinalGame;

export type Team = {
  readonly abbreviation: string;
  readonly id: number;
  readonly name: string;
  readonly record: string;
};

export type TeamRecords = Record<string, string>;

export type GameList = {
  readonly games: Game[];
};

export const isLiveGame = (g: Game): g is LiveGame => {
  return g.gameState === "Live";
};

export const isFinalGame = (g: Game): g is FinalGame => {
  return g.gameState === "Final";
};

export const isScheduledGame = (g: Game): g is ScheduledGame => {
  return g.gameState === "Scheduled";
};

export type ScoringPlays = Record<number, ScoringPlay[]>;

export type PeriodSummary = {
  readonly homeScore: number;
  readonly awayScore: number;
  readonly periodNumber: number;
};

export type GameDetails = {
  readonly game: Game;
  readonly scoringPlays: ScoringPlays;
  readonly periodSummaries: PeriodSummary[];
};

export type TeamAbbreviation =
  | "ANA"
  | "ARI"
  | "BOS"
  | "BUF"
  | "CAR"
  | "CBJ"
  | "CGY"
  | "CHI"
  | "COL"
  | "DAL"
  | "DET"
  | "EDM"
  | "FLA"
  | "LAK"
  | "MIN"
  | "MTL"
  | "NJD"
  | "NSH"
  | "NYI"
  | "NYR"
  | "OTT"
  | "PHI"
  | "PIT"
  | "SEA"
  | "SJS"
  | "STL"
  | "TBL"
  | "TOR"
  | "VAN"
  | "VGK"
  | "WPG"
  | "WSH";
