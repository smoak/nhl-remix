export type Standings = {
  readonly teamAbbrev: {
    readonly default: string;
  };
  readonly wins: number;
  readonly ties: number;
  readonly points: number;
  readonly losses: number;
  readonly otLosses: number;
};

export type StandingsResponse = {
  readonly wildCardIndicator: boolean;
  readonly standings: Standings[];
};
