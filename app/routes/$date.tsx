import { json, LoaderFunction, useLoaderData, useParams } from "remix";
import { getGamesByDate } from "~/api";
import { DateSelector } from "~/components/DateSelector";
import { GamesList } from "~/components/GamesList";
import { Layout } from "~/components/Layout";
import { useDays } from "~/hooks/useDays";
import { useGames } from "~/hooks/useGames";
import { ScheduleGame } from "~/types";

export const loader: LoaderFunction = async ({ params }) => {
  const { date } = params;

  const games = await getGamesByDate(date);

  return json<ScheduleGame[]>(games);
};

export const Index = () => {
  const { date } = useParams();
  const { prevDay, day, nextDay } = useDays(date);
  const loadedGames = useLoaderData<ScheduleGame[]>();
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
