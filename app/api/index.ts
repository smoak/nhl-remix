import { fetch } from "cross-fetch";
import type { Schedule, ScheduleGame, Standings } from "~/api/types";
import type { ConferenceStandings } from "~/data/types";

export const BASE_URL = "https://statsapi.web.nhl.com/api/v1";
export const SCHEDULE_URL = `${BASE_URL}/schedule`;
export const STANDINGS_URL = `${BASE_URL}/standings/byConference`;

type GetGamesByDate = (date?: string) => Promise<ScheduleGame[]>;
export const getGamesByDate: GetGamesByDate = async (date) => {
  const url = new URL(SCHEDULE_URL);
  url.searchParams.append(
    "hydrate",
    "linescore,team,game(seriesSummary(series))"
  );

  if (date) {
    url.searchParams.append("date", date);
  }

  const response = await fetch(url.toString());
  const { dates } = (await response.json()) as Schedule;

  if (dates.length === 0) {
    return [];
  }

  if (date) {
    return dates.find((d) => d.date === date)?.games ?? dates[0].games;
  }

  return dates[0].games;
};

type GetStandings = () => Promise<ConferenceStandings>;
export const getStandings: GetStandings = async () => {
  const url = new URL(STANDINGS_URL);
  url.searchParams.append(
    "hydrate",
    "record(overall),division,conference,team(nextSchedule(team),previousSchedule(team))"
  );

  const response = await fetch(url.toString());
  const standings = (await response.json()) as Standings;
  const [east, west] = standings.records;

  return {
    east,
    west,
  };
};

type GetGameDetails = (gameId: string) => Promise<ScheduleGame | undefined>;
export const getGameDetails: GetGameDetails = async (gameId) => {
  const url = new URL(SCHEDULE_URL);
  url.searchParams.append(
    "hydrate",
    "linescore,team,game(seriesSummary(series))"
  );
  url.searchParams.append("gamePk", gameId);

  const response = await fetch(url.toString());
  const { dates } = (await response.json()) as Schedule;

  if (dates.length === 0) {
    return;
  }

  return dates[0].games[0];
};
