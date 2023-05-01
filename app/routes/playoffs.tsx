import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPlayoffs } from "~/api";

import { Layout } from "~/components/Layout";
import { PlayffBracket } from "~/components/PlayoffBracket";
import type { PlayoffBracket } from "~/components/types";
import { normalizePlayoffs } from "~/data/normalization/playoffs";

export const loader: LoaderFunction = async () => {
  const playoffs = await getPlayoffs();
  const bracket = normalizePlayoffs(playoffs);

  return json<PlayoffBracket>(bracket);
};

export const Playoffs = () => {
  const bracket = useLoaderData<PlayoffBracket>();

  return (
    <Layout>
      <h1 className="mb-3 text-4xl font-bold">Playoffs</h1>
      <PlayffBracket bracket={bracket} />
    </Layout>
  );
};

export default Playoffs;
