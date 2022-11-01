import { useLoaderData } from "@remix-run/react";
import { getStandings } from "~/api";
import { Layout } from "~/components/Layout";
import { StandingTable } from "~/components/StandingTable";
import { ConferenceStandings } from "~/data/types";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

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
