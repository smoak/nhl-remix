import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { GamesList } from "~/components/GamesList";
import { Layout } from "~/components/Layout";
import { DATE_LINK_FORMAT, getToday } from "~/date-fns";
import { format } from "date-fns";
import { useDays } from "~/hooks/useDays";
import { DateSelector } from "~/components/DateSelector";
import { useGames } from "~/hooks/useGames";
import { getSchedule } from "~/data";
import type { Schedule } from "~/data/types";

export const loader: LoaderFunction = async () => {
  const today = getToday();
  const date = format(today, DATE_LINK_FORMAT);

  const schedule = await getSchedule(date);

  return schedule;
};

export const Index = () => {
  const { prevDay, day, nextDay } = useDays();
  const loadedSchedule = useLoaderData<Schedule>();
  const games = useGames({
    route: "?index",
    preloadedGames: loadedSchedule.games,
  });

  return (
    <Layout>
      <h1 className="mb-3 text-4xl font-bold">Games</h1>
      <DateSelector day={day} prevDay={prevDay} nextDay={nextDay} />
      <GamesList games={games} />
    </Layout>
  );
};

export default Index;
