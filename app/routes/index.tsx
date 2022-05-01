import { json, LoaderFunction, useLoaderData } from "remix";
import { GamesList } from "~/components/GamesList";
import { Layout } from "~/components/Layout";
import { ScheduleGame } from "~/types";
import { getGamesByDate } from "~/api";
import { DATE_LINK_FORMAT, getToday } from "~/date-fns";
import { format } from "date-fns";
import { useDays } from "~/hooks/useDays";
import { DateSelector } from "~/components/DateSelector";

export const loader: LoaderFunction = async () => {
  const today = getToday();
  const date = format(today, DATE_LINK_FORMAT);
  const games = await getGamesByDate(date);

  return json<ScheduleGame[]>(games);
};

export const Index = () => {
  const { prevDay, day, nextDay } = useDays();
  const games = useLoaderData<ScheduleGame[]>();

  return (
    <Layout>
      <h1 className="mb-3 text-4xl font-bold">Games</h1>
      <DateSelector day={day} prevDay={prevDay} nextDay={nextDay} />
      <GamesList games={games} />
    </Layout>
  );
};

export default Index;
