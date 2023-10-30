export type TeamScoreProps = {
  readonly score: number;
  readonly isScheduledGame: boolean;
};

export const TeamScore = ({ isScheduledGame, score }: TeamScoreProps) => {
  if (isScheduledGame) {
    return null;
  }

  return <p className="w-1/3 text-left text-2xl font-bold">{score}</p>;
};
