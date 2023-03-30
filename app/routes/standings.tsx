import { getStandings } from "~/api";
import { Layout } from "~/components/Layout";
import type { Standings as NHLStandings } from "~/data/types";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { StandingsTabs } from "~/components/StandingsTabs";
import { StandingsLegend } from "~/components/StandingsLegend";

export const loader: LoaderFunction = async () => {
  const standings = await getStandings();

  return json<NHLStandings>(standings);
};

export const Standings = () => {
  return (
    <Layout>
      <h1 className="mb-3 text-4xl font-bold">Standings</h1>
      <StandingsTabs />
      <StandingsLegend />
    </Layout>
  );
};

export default Standings;
