import fetch from "cross-fetch";
import { BASE_URL } from "..";
import type { StandingsResponse } from "./types";

type GetStandings = (date: string) => Promise<StandingsResponse>;
export const getStandings: GetStandings = async (date) => {
  const url = new URL(`${BASE_URL}/standings/${date}`);

  const response = await fetch(url.toString());

  return (await response.json()) as StandingsResponse;
};
