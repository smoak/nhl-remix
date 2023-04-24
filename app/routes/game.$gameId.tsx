import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { Layout } from "~/components/Layout";
import { getGameDetails } from "~/api";
import type { Game } from "~/components/types";
import { normalizeScheduleGame } from "~/data/normalization";
import { BackButton } from "~/components/BackButton";
import { GameCard } from "~/components/GameCard";
import { GameSummary } from "~/components/GameSummary";
import { useGameDetails } from "~/hooks/useGameDetails";

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

  const game = normalizeScheduleGame(gameDetails);
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
      <GameSummary game={game} />
    </Layout>
  );
};

export default Index;
