import { json, LoaderFunction, useLoaderData } from "remix";
import { getStandings } from "~/api";
import { Layout } from "~/components/Layout";
import { StandingTable } from "~/components/StandingTable";
import { ConferenceStandings } from "~/data/types";

export const loader: LoaderFunction = async () => {
  const standings = await getStandings();

  return json<ConferenceStandings>(standings);
};

export const Standings = () => {
  const { east, west } = useLoaderData<ConferenceStandings>();

  return (
    <Layout>
      <h1 className="mb-3 text-4xl font-bold">Standings</h1>
      <StandingTable label="Eastern Conference" conference={east} />
      <StandingTable label="Western Conference" conference={west} />
    </Layout>
  );
};

export default Standings;
