import { GameStatus } from "~/types";

export type TeamScoreProps = {
  readonly score: number;
  readonly gameStatus: GameStatus;
};

export const TeamScore = ({ gameStatus, score }: TeamScoreProps) => {
  if (gameStatus.abstractGameState === "Preview") {
    return null;
  }

  return <p className="w-1/3 text-left text-2xl font-bold">{score}</p>;
};
