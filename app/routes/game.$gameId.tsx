import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { Layout } from "~/components/Layout";
import { getGameDetails } from "~/api";
import type { GameDetails } from "~/components/types";
import { normalizeGameDetails } from "~/data/normalization";
import { BackButton } from "~/components/BackButton";
import { GameCard } from "~/components/GameCard";
import { GameSummary } from "~/components/GameSummary";
import { useGameDetails } from "~/hooks/useGameDetails";
import { ScoringSummary } from "~/components/ScoringSummary";

export const loader: LoaderFunction = async ({ params }) => {
  const { gameId } = params;

  if (!gameId) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const gameDetailsResponse = await getGameDetails(gameId);

  if (!gameDetailsResponse) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const gameDetails = normalizeGameDetails(gameDetailsResponse);
  return json<GameDetails>(gameDetails);
};

export const Index = () => {
  const preloadedGameDetails = useLoaderData<GameDetails>();
  const {
    game: preloadedGame,
    periodSummaries,
    scoringPlays,
  } = preloadedGameDetails;
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
          <GameSummary game={game} periodSummaries={periodSummaries} />
        </div>
        <div>
          <ScoringSummary game={game} scoringPlays={scoringPlays} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
