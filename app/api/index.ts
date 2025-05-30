import { fetch } from "cross-fetch";
import type {
  Game,
  PlayoffBracketResponse,
  ScoreResponse,
  ScoreboardResponse,
} from "~/api/types";
import type {
  GamecenterBoxscoreResponse,
  GamecenterLandingResponse,
  GamecenterRightRailResponse,
} from "./gamecenter/types";

export const BASE_URL = "https://api-web.nhle.com/v1";
export const SCHEDULE_URL = `${BASE_URL}/schedule`;
export const GAME_CENTER_URL = `${BASE_URL}/gamecenter`;
export const SCOREBOARD_URL = `${BASE_URL}/scoreboard/now`;
export const SCORE_URL = `${BASE_URL}/score`;
const PLAYOFF_BRACKET_URL = `${BASE_URL}/playoff-bracket`;

type GetGamesByDate = (date: string) => Promise<Game[]>;
export const getGamesByDate: GetGamesByDate = async (date) => {
  const url = new URL(`${SCORE_URL}/${date}`);
  console.log("fetching", url.toString());

  const response = await fetch(url.toString());
  const { games } = (await response.json()) as ScoreResponse;

  return games;
};

type GetGamecenterLanding = (
  gameId: string,
) => Promise<GamecenterLandingResponse | undefined>;
export const getGamecenterLanding: GetGamecenterLanding = async (gameId) => {
  const url = new URL(`${GAME_CENTER_URL}/${gameId}/landing`);
  console.log("fetching from", url.toString());

  const response = await fetch(url.toString());
  const gamecenterResponse =
    (await response.json()) as GamecenterLandingResponse;

  return gamecenterResponse;
};

type GetGamecenterBoxscore = (
  gameId: string,
) => Promise<GamecenterBoxscoreResponse | undefined>;
export const getGamecenterBoxscore: GetGamecenterBoxscore = async (gameId) => {
  const url = new URL(`${GAME_CENTER_URL}/${gameId}/boxscore`);
  console.log("fetching from", url.toString());
  const response = await fetch(url.toString());

  const gamecenterResponse =
    (await response.json()) as GamecenterBoxscoreResponse;

  return gamecenterResponse;
};

type GetGamecenterRightRail = (
  gameId: string,
) => Promise<GamecenterRightRailResponse | undefined>;
export const getGamecenterRightRail: GetGamecenterRightRail = async (
  gameId,
) => {
  const url = new URL(`${GAME_CENTER_URL}/${gameId}/right-rail`);
  console.log("fetching from", url.toString());
  const response = await fetch(url.toString());

  const gamecenterResponse =
    (await response.json()) as GamecenterRightRailResponse;

  return gamecenterResponse;
};

type GetScoreboard = () => Promise<ScoreboardResponse>;
export const getScoreboard: GetScoreboard = async () => {
  const url = new URL(SCOREBOARD_URL);

  const response = await fetch(url.toString());
  const scoreboardResponse = (await response.json()) as ScoreboardResponse;

  return scoreboardResponse;
};

type GetPlayoffBracket = (year: number) => Promise<PlayoffBracketResponse>;
export const getPlayoffBracket: GetPlayoffBracket = async (year) => {
  const url = new URL(`${PLAYOFF_BRACKET_URL}/${year}`);
  console.log("fetching from", url.toString());

  const response = await fetch(url.toString());

  return (await response.json()) as PlayoffBracketResponse;
};
