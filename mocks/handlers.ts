import { rest } from "msw";
import { SCORE_URL } from "~/api";
import scoreWithoutGames from "./score-without-games.json";
import scoreWithFutureGames from "./score-with-future-games.json";
import scoreWithFinishedGames from "./score-with-finished-games.json";

export const handlers = [
  rest.get(`${SCORE_URL}/:date`, (req, res, ctx) => {
    const date = req.params.date as string;

    if (date === "2022-04-27") {
      return res(ctx.status(200), ctx.json(scoreWithFinishedGames));
    }

    if (date === "2023-09-07") {
      return res(ctx.status(200), ctx.json(scoreWithoutGames));
    }

    return res(ctx.status(200), ctx.json(scoreWithFutureGames));
  }),
];
