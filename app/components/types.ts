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

type Linescore = {
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

type BaseGame = {
  readonly id: number;
  readonly startTime: string;
  readonly homeTeam: Team;
  readonly awayTeam: Team;
  readonly isCurrentlyInProgress: boolean;
  readonly status: Status;
  readonly type: "R" | "P" | "PR";
  readonly seriesStatusShort?: string;
};

export type LiveGame =
  | BaseGame & {
      readonly isCurrentlyInProgress: true;
      readonly currentPeriod: number;
      readonly currentPeriodTimeRemaining: string;
      readonly currentPeriodOrdinal: string;
      readonly linescore: Linescore;
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
      readonly currentPeriod: number;
      readonly linescore: Linescore;
      readonly status: {
        readonly abstract: "Final";
        readonly detailed: "Final";
      };
    };

export type Game = LiveGame | ScheduledGame | PostponedGame | FinalGame;

export type Record = {
  readonly wins: number;
  readonly losses: number;
  readonly ot?: number;
};

export type Team = {
  readonly abbreviation: string;
  readonly id: number;
  readonly name: string;
  readonly record: Record;
  readonly score: number;
};

export type GameList = {
  readonly games: Game[];
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
