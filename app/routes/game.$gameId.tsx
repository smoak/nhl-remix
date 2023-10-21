import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { Layout } from "~/components/Layout";
import { getGameDetails } from "~/api/v2";
import type { Game } from "~/components/types";
import { BackButton } from "~/components/BackButton";
import { GameCard } from "~/components/GameCard";
import { GameSummary } from "~/components/GameSummary";
import { useGameDetails } from "~/hooks/useGameDetails";
import { ScoringSummary } from "~/components/ScoringSummary";
import { normalizeGameDetails } from "~/data/normalization/api-web";

export const loader: LoaderFunction = async ({ params }) => {
  const { gameId } = params;

  if (!gameId) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const gameDetails = await getGameDetails(gameId);

  if (!gameDetails) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const game = normalizeGameDetails(gameDetails);
  return json<Game>(game);
};

export const Index = () => {
  const preloadedGame = useLoaderData<Game>();
  const game = useGameDetails({
    route: `/game/${preloadedGame.id}`,
    preloadedGame,
  });

  return (
    <Layout>
      <BackButton />
      <div className="py-5 md:max-w-sm">
        <GameCard game={game} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <GameSummary game={game} />
        </div>
        <div>
          <ScoringSummary game={game} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
