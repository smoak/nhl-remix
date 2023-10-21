import { useLoaderData, useParams } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { DateSelector } from "~/components/DateSelector";
import { GamesList } from "~/components/GamesList";
import { Layout } from "~/components/Layout";
import { useDays } from "~/hooks/useDays";
import { useGames } from "~/hooks/useGames";
import type { Game } from "~/components/types";
import { getGamesByDate } from "~/api/v2";
import { normalizeGames } from "~/data/normalization/api-web";

export const loader: LoaderFunction = async ({ params }) => {
  const { date } = params;

  if (!date) {
    throw new Error("date is required");
  }

  const apiGames = await getGamesByDate(date);
  const games = normalizeGames(apiGames);

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
