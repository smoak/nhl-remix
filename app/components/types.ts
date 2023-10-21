type Status = {
  readonly abstract: "Live" | "Final" | "Preview";
  readonly detailed:
    | "Scheduled"
    | "Postponed"
    | "In Progress - Critical"
    | "In Progress"
    | "Final";
};

type PeriodTeam = {
  readonly goals: number;
  readonly shotsOnGoal: number;
};

type Period = {
  readonly ordinalNum: string;
  readonly periodType: string;
  readonly num: number;
  readonly away: PeriodTeam;
  readonly home: PeriodTeam;
};

export type Linescore = {
  readonly home: {
    readonly shotsOnGoal: number;
    readonly goals: number;
    readonly isGoaliePulled: boolean;
    readonly isOnPowerPlay: boolean;
  };
  readonly away: {
    readonly shotsOnGoal: number;
    readonly goals: number;
    readonly isGoaliePulled: boolean;
    readonly isOnPowerPlay: boolean;
  };
  readonly periods: Period[];
};

export type ScoringPlayAssister = {
  readonly id: number;
  readonly name: string;
  readonly seasonAssists: number;
};

export type ScoringPlay = {
  readonly id: string;
  readonly description: string;
  readonly period: number;
  readonly periodOrdinalNum: string;
  readonly periodTime: string;
  readonly goals: {
    readonly away: number;
    readonly home: number;
  };
  readonly goalScorer: {
    readonly id: number;
    readonly name: string;
    readonly seasonGoals: number;
    readonly mugshot?: string;
  };
  readonly primaryAssist?: ScoringPlayAssister;
  readonly secondaryAssist?: ScoringPlayAssister;
  readonly scoringTeamId: number;
  readonly strength: "PPG" | "EVEN" | "SHG";
};

type BaseGame = {
  readonly id: number;
  readonly startTime: string;
  readonly homeTeam: Team;
  readonly awayTeam: Team;
  readonly isCurrentlyInProgress: boolean;
  readonly status: Status;
  readonly type: "R" | "P" | "PR";
  readonly seriesStatusShort?: string;
  readonly scoringPlays: ScoringPlay[];
};

export type LiveGame =
  | BaseGame & {
      readonly isCurrentlyInProgress: true;
      readonly currentPeriod: number;
      readonly currentPeriodTimeRemaining: string;
      // readonly linescore: Linescore;
      // readonly status: {
      //   readonly abstract: "Live";
      //   readonly detailed: "In Progress" | "In Progress - Critical";
      // };
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
      readonly currentPeriod: number;
      readonly linescore: Linescore;
      readonly status: {
        readonly abstract: "Final";
        readonly detailed: "Final";
      };
    };

export type Game = LiveGame | ScheduledGame | PostponedGame | FinalGame;

export type Team = {
  readonly abbreviation: string;
  readonly id: number;
  readonly name: string;
  readonly record?: string;
  readonly score?: number;
  readonly logo?: string;
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
