import type { GameDetails } from "../types";
import { ScoringSection } from "./ScoringSection";
import { SummarySection } from "./SummarySection";

type GameSummaryProps = {
  readonly gameDetails: GameDetails;
};

export const GameSummary = ({ gameDetails }: GameSummaryProps) => {
  const { game, periodSummaries, scoringPlays } = gameDetails;

  if (game.gameState === "Scheduled" || scoringPlays == null) {
    return <h1 className="text-2xl font-semibold">Game has not started.</h1>;
  }

  return (
    <>
      <SummarySection game={game} periodSummaries={periodSummaries} />
      <ScoringSection scoringPlays={scoringPlays} />
    </>
  );
};
