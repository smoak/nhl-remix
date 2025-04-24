import { compareAsc, getHours, startOfDay, subDays } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const EST_IANA_ZONE_ID = "America/New_York";
export const DATE_LINK_FORMAT = "yyyy-MM-dd";
export const DATE_DISPLAY_FORMAT = "dd MMMM yyyy";
export const REGULAR_SEASON_END_MONTH = 3; // April
export const REGULAR_SEASON_END_DAY = 14;
export const PLAYOFF_END_MONTH = 6; // July
export const PLAYOFF_END_DAY = 1; // small buffer because sometimes playoffs go long

const getTimeZonedDay = (date: Date): Date => {
  const hours = getHours(date);

  if (hours < 6) {
    return startOfDay(subDays(date, 1));
  }

  return startOfDay(date);
};

export const getToday = () => {
  const now = new Date().toISOString();
  const etNow = toZonedTime(now, EST_IANA_ZONE_ID);

  return getTimeZonedDay(etNow);
};

export const isEndOfRegularSeason = () => {
  const today = getToday();
  const seasonEnd = new Date(
    today.getFullYear(),
    REGULAR_SEASON_END_MONTH,
    REGULAR_SEASON_END_DAY,
  );
  const playoffEnd = new Date(
    today.getFullYear(),
    PLAYOFF_END_MONTH,
    PLAYOFF_END_DAY,
  );

  return (
    compareAsc(today, seasonEnd) === 1 && compareAsc(today, playoffEnd) === -1
  );
};
