import type { StandingsRecord } from "~/api/types";

export type Standings = {
  readonly conference: ConferenceStandings;
  readonly division: DivisionStandings;
  readonly wildCard: WildCardStandings;
};

export type EastWildCardStandings = {
  readonly metropolitan: StandingsRecord;
  readonly atlantic: StandingsRecord;
  readonly wildcard: StandingsRecord;
};

export type WestWildCardStandings = {
  readonly central: StandingsRecord;
  readonly pacific: StandingsRecord;
  readonly wildcard: StandingsRecord;
};

export type WildCardStandings = {
  readonly east: EastWildCardStandings;
  readonly west: WestWildCardStandings;
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
