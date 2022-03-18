import { useLoaderData } from "remix";
import { GamesList } from "~/components/GamesList";
import { Layout } from "~/components/Layout";
import { Schedule } from "~/types";

export const loader = async (): Promise<Schedule> => {
  const res = await fetch("https://statsapi.web.nhl.com/api/v1/schedule");

  return (await res.json()) as Schedule;
};

export const Index = () => {
  const { dates } = useLoaderData<Schedule>();
  const { games } = dates[0];
  console.log(games);

  return (
    <Layout>
      <GamesList games={games} />
    </Layout>
  );
};

export default Index;
