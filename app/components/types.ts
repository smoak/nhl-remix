type Status = {
  readonly abstract: "Live" | "Final" | "Preview";
  readonly detailed:
    | "Scheduled"
    | "Postponed"
    | "In Progress - Critical"
    | "In Progress"
    | "Final";
};

// export type ScoringPlayAssister = {
//   readonly id: number;
//   readonly name: string;
//   readonly seasonAssists: number;
// };

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
  // readonly primaryAssist?: ScoringPlayAssister;
  // readonly secondaryAssist?: ScoringPlayAssister;
  // readonly scoringTeamId: number;
  // readonly strength: "PPG" | "EVEN" | "SHG";
};

export type GameType = "R" | "P" | "PR";

type BaseGame = {
  readonly id: number;
  readonly startTime: string;
  readonly homeTeam: Team;
  readonly awayTeam: Team;
  readonly isCurrentlyInProgress: boolean;
  readonly status: Status;
  readonly type: GameType;
  readonly seriesStatusShort?: string;
};

export type LiveGame =
  | BaseGame & {
      readonly isCurrentlyInProgress: true;
      readonly currentPeriod: number;
      readonly currentPeriodTimeRemaining: string;
      readonly status: {
        readonly abstract: "Live";
        readonly detailed: "In Progress" | "In Progress - Critical";
      };
    };

export type ScheduledGame =
  | BaseGame & {
      readonly isCurrentlyInProgress: false;
      readonly status: {
        readonly abstract: "Preview";
        readonly detailed: "Scheduled";
      };
    };

export type PostponedGame =
  | BaseGame & {
      readonly isCurrentlyInProgress: false;
      readonly status: {
        readonly abstract: "Preview";
        readonly detailed: "Postponed";
      };
    };

export type FinalGame =
  | BaseGame & {
      readonly isCurrentlyInProgress: false;
      readonly status: {
        readonly abstract: "Final";
        readonly detailed: "Final";
      };
    };

export type Game = LiveGame | ScheduledGame | PostponedGame | FinalGame;

export type TeamRecord = {
  readonly wins: number;
  readonly losses: number;
  readonly ot?: number;
};

export type Team = {
  readonly abbreviation: string;
  readonly id: number;
  readonly name: string;
  readonly record?: string;
  readonly score: number;
};

export type GameList = {
  readonly games: Game[];
};

export type PlayoffTeam = {
  readonly abbrev: string;
  readonly id: number;
  readonly seriesWins: number;
  readonly seriesLosses: number;
  readonly isEliminated: boolean;
};

export type Matchup = {
  readonly id: string;
  readonly topTeam?: PlayoffTeam;
  readonly bottomTeam?: PlayoffTeam;
  readonly seriesSummary?: string;
};

type PlayoffRound = {
  readonly matchups: Matchup[];
};

export type PlayoffBracket = {
  readonly eastern: Record<1 | 2 | 3, PlayoffRound>;
  readonly western: Record<1 | 2 | 3, PlayoffRound>;
  readonly finalRound: Matchup;
};

export const isLiveGame = (g: Game): g is LiveGame => {
  return g.status.abstract === "Live";
};

export const isFinalGame = (g: Game): g is FinalGame => {
  return g.status.abstract === "Final";
};

export const isPostponedGame = (g: Game): g is PostponedGame => {
  return g.status.detailed === "Postponed";
};

export const isScheduledGame = (g: Game): g is ScheduledGame => {
  return g.status.detailed === "Scheduled";
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
