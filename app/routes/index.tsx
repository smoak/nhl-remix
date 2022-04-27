import { json, LoaderFunction, useLoaderData } from "remix";
import { GamesList } from "~/components/GamesList";
import { Layout } from "~/components/Layout";
import { ScheduleGame } from "~/types";
import { getGamesByDate } from "~/api";
import { DATE_LINK_FORMAT, getToday } from "~/date-fns";
import { format } from "date-fns";

export const loader: LoaderFunction = async () => {
  const today = getToday();
  const date = format(today, DATE_LINK_FORMAT);
  const games = await getGamesByDate(date);

  return json<ScheduleGame[]>(games);
};

export const Index = () => {
  const games = useLoaderData<ScheduleGame[]>();

  return (
    <Layout>
      <GamesList games={games} />
    </Layout>
  );
};

export default Index;
