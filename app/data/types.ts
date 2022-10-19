import { StandingsRecord } from "~/api/types";

export type ConferenceStandings = {
  readonly east: StandingsRecord;
  readonly west: StandingsRecord;
};
