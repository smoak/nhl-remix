import { fetch } from "cross-fetch";
import type { Playoffs, Schedule, ScheduleGame } from "~/api/types";
import type {
  ConferenceStandings,
  DivisionStandings,
  Standings,
  WildCardStandings,
} from "~/data/types";
import type { Standings as StandingsResponse } from "~/api/types";

export const BASE_URL = "https://statsapi.web.nhl.com/api/v1";
export const SCHEDULE_URL = `${BASE_URL}/schedule`;
export const STANDINGS_BASE_URL = `${BASE_URL}/standings`;
export const CONFERENCE_STANDINGS_URL = `${STANDINGS_BASE_URL}/byConference`;
export const DIVISION_STANDINGS_URL = `${STANDINGS_BASE_URL}/byDivision`;
export const WILD_CARD_STANDINGS_URL = `${STANDINGS_BASE_URL}/wildCardWithLeaders`;
export const PLAYOFFS_URL = `${BASE_URL}/tournaments/playoffs`;

type GetConferenceStandings = () => Promise<ConferenceStandings>;
export const getConferenceStandings: GetConferenceStandings = async () => {
  const url = new URL(CONFERENCE_STANDINGS_URL);
  url.searchParams.append(
    "hydrate",
    "record(overall),division,conference,team(nextSchedule(team),previousSchedule(team))"
  );

  const response = await fetch(url.toString());
  const standings = (await response.json()) as StandingsResponse;
  const [east, west] = standings.records;

  return {
    east,
    west,
  };
};

type GetDivisionStandings = () => Promise<DivisionStandings>;
export const getDivisionStandings: GetDivisionStandings = async () => {
  const url = new URL(DIVISION_STANDINGS_URL);
  url.searchParams.append(
    "hydrate",
    "record(overall),division,conference,team(nextSchedule(team),previousSchedule(team))"
  );

  const response = await fetch(url.toString());
  const standings = (await response.json()) as StandingsResponse;
  const [metropolitan, atlantic, central, pacific] = standings.records;

  return {
    atlantic,
    central,
    metropolitan,
    pacific,
  };
};

type GetWildCardStandings = () => Promise<WildCardStandings>;
export const getWildCardStandings: GetWildCardStandings = async () => {
  const url = new URL(WILD_CARD_STANDINGS_URL);
  url.searchParams.append(
    "hydrate",
    "record(overall),division,conference,team(nextSchedule(team),previousSchedule(team))"
  );

  const response = await fetch(url.toString());
  const standings = (await response.json()) as StandingsResponse;
  const [eastWildCard, westWildCard, metropolitan, atlantic, central, pacific] =
    standings.records;

  return {
    east: {
      atlantic,
      metropolitan,
      wildcard: eastWildCard,
    },
    west: {
      central,
      pacific,
      wildcard: westWildCard,
    },
  };
};

type GetStandings = () => Promise<Standings>;
export const getStandings: GetStandings = async () => {
  const [conference, division, wildCard] = await Promise.all([
    getConferenceStandings(),
    getDivisionStandings(),
    getWildCardStandings(),
  ]);

  return {
    conference,
    division,
    wildCard,
  };
};

type GetGameDetails = (gameId: string) => Promise<ScheduleGame | undefined>;
export const getGameDetails: GetGameDetails = async (gameId) => {
  const url = new URL(SCHEDULE_URL);
  url.searchParams.append(
    "hydrate",
    "scoringplays,linescore,team,game(seriesSummary(series))"
  );
  url.searchParams.append("gamePk", gameId);

  const response = await fetch(url.toString());
  const { dates } = (await response.json()) as Schedule;

  if (dates.length === 0) {
    return;
  }

  return dates[0].games[0];
};

type GetPlayoffs = () => Promise<Playoffs>;
export const getPlayoffs: GetPlayoffs = async () => {
  const url = new URL(PLAYOFFS_URL);
  url.searchParams.append("expand", "round.series,schedule.game.seriesSummary");

  const response = await fetch(url.toString());

  return (await response.json()) as Playoffs;
};
