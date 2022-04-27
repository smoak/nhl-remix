import { rest } from "msw";
import { SCHEDULE_URL } from "~/api";
import scheduleWithoutDate from "./schedule-without-date.json";
import scheduleWithDate from "./schedule-with-date.json";

export const handlers = [
  rest.get(SCHEDULE_URL, (req, res, ctx) => {
    const date = req.url.searchParams.get("date");

    if (date) {
      return res(ctx.status(200), ctx.json(scheduleWithDate));
    }

    return res(ctx.status(200), ctx.json(scheduleWithoutDate));
  }),
];
