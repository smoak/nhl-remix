import { rest } from "msw";
import { SCHEDULE_URL } from "~/api";
import scheduleWithoutGames from "./schedule-without-games.json";
import scheduleWithFutureGames from "./schedule-with-future-games.json";
import scheduleWithFinishedGames from "./schedule-with-finished-games.json";

export const handlers = [
  rest.get(`${SCHEDULE_URL}/:date`, (req, res, ctx) => {
    const date = req.params.date as string;

    if (date === "2022-04-27") {
      return res(ctx.status(200), ctx.json(scheduleWithFinishedGames));
    }

    if (date === "2023-09-07") {
      return res(ctx.status(200), ctx.json(scheduleWithoutGames));
    }

    return res(ctx.status(200), ctx.json(scheduleWithFutureGames));
  }),
];
