import {
  isScheduledGame,
  type GameDetails,
  type ScheduledGame,
} from "../types";
import { ScoringSection } from "./ScoringSection";
import { SummarySection } from "./SummarySection";

type GameSummaryProps = {
  readonly gameDetails: GameDetails;
};

type ScheduledGameSummary = {
  readonly game: ScheduledGame;
};

const ScheduledGameSummary = ({ game }: ScheduledGameSummary) => {
  if (game.gameState === "Cancelled") {
    return <h1 className="text-2xl font-semibold">Game has been cancelled.</h1>;
  }

  if (game.gameState === "Postponed") {
    return <h1 className="text-2xl font-semibold">Game has been postponed.</h1>;
  }

  return <h1 className="text-2xl font-semibold">Game has not started.</h1>;
};

export const GameSummary = ({ gameDetails }: GameSummaryProps) => {
  const { game, periodSummaries, scoringPlays } = gameDetails;

  if (isScheduledGame(game)) {
    return <ScheduledGameSummary game={game} />;
  }

  if (scoringPlays == null) {
    return <h1 className="text-2xl font-semibold">Game has not started.</h1>;
  }

  return (
    <>
      <SummarySection game={game} periodSummaries={periodSummaries} />
      <ScoringSection scoringPlays={scoringPlays} />
    </>
  );
};
