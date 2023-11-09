import { useLoaderData, useParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { getGamesByDate, getScoreboard } from "~/api";
import { DateSelector } from "~/components/DateSelector";
import { GamesList } from "~/components/GamesList";
import { Layout } from "~/components/Layout";
import { useDays } from "~/hooks/useDays";
import { useGames } from "~/hooks/useGames";
import type { Game } from "~/components/types";
import { normalizeGames } from "~/data/normalization";
import type { ScoreboardGame } from "~/api/types";

export const loader: LoaderFunction = async ({ params }) => {
  const { date } = params;

  if (date == null) {
    throw new Response(null, { status: 404, statusText: "Not Found" });
  }

  const scheduledGames = await getGamesByDate(date);
  const scoreboard = await getScoreboard();
  const scoreboardDate = scoreboard.gamesByDate.find((g) => g.date === date);
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
  const { date } = useParams();
  const { prevDay, day, nextDay } = useDays(date);
  const loadedGames = useLoaderData<Game[]>();
  const games = useGames({ route: `/${date}`, preloadedGames: loadedGames });

  return (
    <Layout>
      <h1 className="mb-3 text-4xl font-bold">Games</h1>
      <DateSelector day={day} prevDay={prevDay} nextDay={nextDay} />
      <GamesList games={games} />
    </Layout>
  );
};

export default Index;
