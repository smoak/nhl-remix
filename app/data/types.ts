import type { StandingsRecord } from "~/api/types";

export type Standings = {
  readonly conference: ConferenceStandings;
  readonly division: DivisionStandings;
};

export type DivisionStandings = {
  readonly metropolitan: StandingsRecord;
  readonly atlantic: StandingsRecord;
  readonly central: StandingsRecord;
  readonly pacific: StandingsRecord;
};

export type ConferenceStandings = {
  readonly east: StandingsRecord;
  readonly west: StandingsRecord;
};
