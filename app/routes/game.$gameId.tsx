import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { Layout } from "~/components/Layout";
import { type GameDetails } from "~/components/types";
import { BackButton } from "~/components/BackButton";
import { GameCard } from "~/components/GameCard";
import { GameSummary } from "~/components/GameSummary";
import { useGameDetails } from "~/hooks/useGameDetails";
import { getGamecenterBoxscore, getGamecenterLanding } from "~/api";
import { normalizeGameDetails } from "~/data/normalization/gameDetails";

export const loader: LoaderFunction = async ({ params }) => {
  const { gameId } = params;

  if (!gameId) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const [boxscore, landing] = await Promise.all([
    getGamecenterBoxscore(gameId),
    getGamecenterLanding(gameId),
  ]);

  if (!boxscore || !landing) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const gameDetails = normalizeGameDetails(boxscore, landing);
  return json<GameDetails>(gameDetails);
};

export const Index = () => {
  const preloadedGameDetails = useLoaderData<GameDetails>();
  const gameDetails = useGameDetails({
    route: `/game/${preloadedGameDetails.game.id}`,
    preloadedGameDetails,
  });

  return (
    <Layout>
      <BackButton />
      <div className="py-5 md:max-w-sm">
        <GameCard game={gameDetails.game} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <GameSummary gameDetails={gameDetails} />
      </div>
    </Layout>
  );
};

export default Index;
