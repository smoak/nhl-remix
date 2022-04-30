import { rest } from "msw";
import { SCHEDULE_URL } from "~/api";
import scheduleWithoutDate from "./schedule-without-date.json";
import scheduleWithDate from "./schedule-with-date.json";
import scheduleWithoutGames from "./schedule-without-games.json";

export const handlers = [
  rest.get(SCHEDULE_URL, (req, res, ctx) => {
    const date = req.url.searchParams.get("date");

    if (date && date === "2022-04-27") {
      return res(ctx.status(200), ctx.json(scheduleWithDate));
    }

    if (date && date === "2022-04-30") {
      return res(ctx.status(200), ctx.json(scheduleWithoutGames));
    }

    return res(ctx.status(200), ctx.json(scheduleWithoutDate));
  }),
];
