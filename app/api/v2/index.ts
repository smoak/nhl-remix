import { fetch } from "cross-fetch";
import type { BoxscoreResponse, Game, ScoreResponse } from "./types";

const BASE_URL = "https://api-web.nhle.com/v1";

type GetGamesByDate = (date: string) => Promise<Game[]>;
export const getGamesByDate: GetGamesByDate = async (date) => {
  const url = new URL(`${BASE_URL}/score/${date}`);

  const response = await fetch(url.toString());
  const { games } = (await response.json()) as ScoreResponse;

  return games;
};

type GetGameDetails = (gameId: string) => Promise<BoxscoreResponse | undefined>;
export const getGameDetails: GetGameDetails = async (gameId) => {
  const url = new URL(`${BASE_URL}/gamecenter/${gameId}/landing`);
  const response = await fetch(url.toString());

  const game = (await response.json()) as BoxscoreResponse;
  // const game = games.find((g) => g.id === parseInt(gameId));

  return game;
};
