import { getGamesByDate } from "~/api";
import type { Schedule } from "./types";
import { getStandings } from "~/api/standings";
import { normalizeTeamRecords } from "./normalization/teamRecords";
import { normalizeGames } from "./normalization";

type GetSchedule = (date: string) => Promise<Schedule>;
export const getSchedule: GetSchedule = async (date) => {
  const [scheduledGames, standingsResponse] = await Promise.all([
    getGamesByDate(date),
    getStandings(date),
  ]);
  const teamRecords = normalizeTeamRecords(standingsResponse);
  const games = normalizeGames(scheduledGames, teamRecords);

  return {
    games,
    teamRecords,
  };
};
