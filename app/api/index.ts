import { fetch } from "cross-fetch";
import { Schedule, ScheduleGame } from "~/types";

export const BASE_URL = "https://statsapi.web.nhl.com/api/v1";
export const SCHEDULE_URL = `${BASE_URL}/schedule`;

type GetGamesByDate = (date?: string) => Promise<ScheduleGame[]>;
export const getGamesByDate: GetGamesByDate = async (date) => {
  const url = new URL(SCHEDULE_URL);
  url.searchParams.append("hydrate", "linescore,team");

  if (date) {
    url.searchParams.append("date", date);
  }

  const response = await fetch(url.toString());
  const { dates } = (await response.json()) as Schedule;

  if (date) {
    return dates.find((d) => d.date === date)?.games ?? dates[0].games;
  }

  return dates[0].games;
};
