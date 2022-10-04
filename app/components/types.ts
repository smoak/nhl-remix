export type Game = {
  readonly id: number;
  readonly startTime: string;
  readonly homeTeam: Team;
  readonly awayTeam: Team;
  readonly isCurrentlyInProgress: boolean;
};

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
