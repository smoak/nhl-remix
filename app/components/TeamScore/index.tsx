import { AbstractGameState } from "~/types";

export type TeamScoreProps = {
  readonly score: number;
  readonly gameState: AbstractGameState;
};

export const TeamScore = ({ gameState, score }: TeamScoreProps) => {
  if (gameState === "Preview") {
    return null;
  }

  return <p className="w-1/3 text-left text-2xl font-bold">{score}</p>;
};
