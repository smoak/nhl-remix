import { fetch } from "cross-fetch";
import type {
  Game,
  GamecenterResponse,
  ScheduleResponse,
  ScoreboardResponse,
} from "~/api/types";

export const BASE_URL = "https://api-web.nhle.com/v1";
export const SCHEDULE_URL = `${BASE_URL}/schedule`;
export const GAME_CENTER_URL = `${BASE_URL}/gamecenter`;
export const SCOREBOARD_URL = `${BASE_URL}/scoreboard/now`;

type GetGamesByDate = (date: string) => Promise<Game[]>;
export const getGamesByDate: GetGamesByDate = async (date) => {
  const url = new URL(`${SCHEDULE_URL}/${date}`);

  const response = await fetch(url.toString());
  const scheduleResponse = (await response.json()) as ScheduleResponse;

  // the first "gameWeek" item is the date we care about
  const { games } = scheduleResponse.gameWeek[0];

  if (games.some((g) => g.gameState === "LIVE" || g.gameState === "CRIT")) {
    const scoreboard = await getScoreboard();
    const scoreboardGames =
      scoreboard.gamesByDate.find((gd) => gd.date === date)?.games ?? [];

    return games.reduce<Game[]>((accum, g) => {
      if (g.gameState === "LIVE" || g.gameState === "CRIT") {
        const sg = scoreboardGames.find((sg) => sg.id === g.id);

        if (sg == null) {
          throw new Error("Missing game from the scoreboard!");
        }

        const { clock, situation } = sg;

        accum.push({
          ...g,
          clock,
          situation,
        });
      } else {
        accum.push(g);
      }

      return accum;
    }, []);
  }

  return games;
};

type GetGameDetails = (
  gameId: string
) => Promise<GamecenterResponse | undefined>;
export const getGameDetails: GetGameDetails = async (gameId) => {
  const url = new URL(`${GAME_CENTER_URL}/${gameId}/landing`);
  console.log("getGameDetails", { url: url.toString() });

  const response = await fetch(url.toString());
  const gamecenterResponse = (await response.json()) as GamecenterResponse;

  return gamecenterResponse;
};

type GetScoreboard = () => Promise<ScoreboardResponse>;
const getScoreboard: GetScoreboard = async () => {
  const url = new URL(SCOREBOARD_URL);

  const response = await fetch(url.toString());
  const scoreboardResponse = (await response.json()) as ScoreboardResponse;

  return scoreboardResponse;
};
