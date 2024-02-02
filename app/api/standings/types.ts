export type Standings = {
  readonly conferenceAbbrev: "E" | "W";
  readonly conferenceHomeSequence: number;
  readonly conferenceL10Sequence: number;
  readonly conferenceName: "Eastern" | "Western";
  readonly conferenceRoadSequence: number;
  readonly conferenceSequence: number;
  readonly date: string;
  readonly divisionAbbrev: "A" | "P" | "M" | "C";
  readonly divisionHomeSequence: number;
  readonly divisionName: "Central" | "Pacific" | "Metropolitan" | "Atlantic";
  readonly gamesPlayed: number;
  readonly goalsAgainst: number;
  readonly teamAbbrev: {
    readonly default: string;
  };
  readonly teamName: {
    readonly default: string;
  };
  readonly teamCommonName: {
    readonly default: string;
  };
  readonly teamLogo: string;
  readonly wins: number;
  readonly ties: number;
  readonly points: number;
  readonly pointPctg: number;
  readonly regulationPlusOtWinPctg: number;
  readonly regulationPlusOtWins: number;
  readonly regulationWinPctg: number;
  readonly regulationWins: number;
  readonly losses: number;
  readonly otLosses: number;
};

export type StandingsResponse = {
  readonly wildCardIndicator: boolean;
  readonly standings: Standings[];
};
