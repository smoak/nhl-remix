import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { GamesList } from "~/components/GamesList";
import { Layout } from "~/components/Layout";
import { getGamesByDate, getScoreboard } from "~/api";
import { DATE_LINK_FORMAT, getToday } from "~/date-fns";
import { format } from "date-fns";
import { useDays } from "~/hooks/useDays";
import { DateSelector } from "~/components/DateSelector";
import { useGames } from "~/hooks/useGames";
import type { Game } from "~/components/types";
import { normalizeGames } from "~/data/normalization";
import type { ScoreboardGame } from "~/api/types";

/*
games: [],
teams: {
  10: {
    name: {
      default: "Toronto Maple Leafs",
      fr: "Maple Leafs de Toronto"
    }
  }
}

*/

export const loader: LoaderFunction = async () => {
  const today = getToday();
  const date = format(today, DATE_LINK_FORMAT);
  const scheduledGames = await getGamesByDate(date);
  const scoreboard = await getScoreboard();
  const scoreboardDate = scoreboard.gamesByDate.find((g) => g.date === date);
  console.log("scoreboard date", { scoreboardDate });
  const scoreboardGames =
    scoreboardDate?.games.reduce<Record<number, ScoreboardGame>>(
      (accum, sg) => {
        accum[sg.id] = sg;
        return accum;
      },
      {}
    ) ?? {};
  const games = normalizeGames({ scheduledGames, scoreboardGames });

  return json<Game[]>(games);
};

export const Index = () => {
  const { prevDay, day, nextDay } = useDays();
  const loadedGames = useLoaderData<Game[]>();
  const games = useGames({ route: "?index", preloadedGames: loadedGames });

  return (
    <Layout>
      <h1 className="mb-3 text-4xl font-bold">Games</h1>
      <DateSelector day={day} prevDay={prevDay} nextDay={nextDay} />
      <GamesList games={games} />
    </Layout>
  );
};

export default Index;
