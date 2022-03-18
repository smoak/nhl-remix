import { useLoaderData } from "remix";
import { GamesList } from "~/components/GamesList";
import { Layout } from "~/components/Layout";
import { Schedule, ScheduleGame } from "~/types";

export const loader = async (): Promise<ScheduleGame[]> => {
  const res = await fetch("https://statsapi.web.nhl.com/api/v1/schedule");

  const { dates } = (await res.json()) as Schedule;
  const { games } = dates[0];
  return games;
};

export const Index = () => {
  const games = useLoaderData<ScheduleGame[]>();
  console.log(games);

  return (
    <Layout>
      <GamesList games={games} />
    </Layout>
  );
};

export default Index;
