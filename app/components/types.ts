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

export type GameType = "R" | "P" | "PR";
export type GameState = "Live" | "Scheduled" | "Final";

type BaseGame = {
  readonly id: number;
  readonly startTime: string;
  readonly homeTeam: Team;
  readonly awayTeam: Team;
  readonly type: GameType;
  readonly gameState: GameState;
  readonly seriesStatusShort?: string;
};

export type LiveGame =
  | BaseGame & {
      readonly gameState: "Live";
      readonly currentPeriod: number;
      readonly currentPeriodTimeRemaining: string;
      readonly sog: {
        readonly home: number;
        readonly away: number;
      };
    };

export type ScheduledGame =
  | BaseGame & {
      readonly gameState: "Scheduled";
    };

export type FinalGame =
  | BaseGame & {
      readonly gameState: "Final";
      readonly endedInPeriod: number;
    };

export type Game = LiveGame | ScheduledGame | FinalGame;

export type Team = {
  readonly abbreviation: string;
  readonly id: number;
  readonly name: string;
  readonly record?: string;
  readonly score: number;
  readonly isGoaliePulled: boolean;
  readonly isOnPowerPlay: boolean;
};

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
