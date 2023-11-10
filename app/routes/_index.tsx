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

export const loader: LoaderFunction = async () => {
  const today = getToday();
  const date = format(today, DATE_LINK_FORMAT);
  const [scheduledGames] = await Promise.all([
    getGamesByDate(date),
    getScoreboard(),
  ]);
  const games = normalizeGames(scheduledGames);

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
