import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { format } from "date-fns";
import { getStandings } from "~/api/standings";
import { Layout } from "~/components/Layout";
import { StandingsTabs } from "~/components/Standings/StandingsTabs";
import { StandingsLegend } from "~/components/StandingsLegend";
import { normalizeStandings } from "~/data/normalization/standings";
import { DATE_LINK_FORMAT, getToday } from "~/date-fns";

export const loader: LoaderFunction = async () => {
  const today = getToday();
  const date = format(today, DATE_LINK_FORMAT);
  const standings = await getStandings(date);

  return json(normalizeStandings(standings));
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
