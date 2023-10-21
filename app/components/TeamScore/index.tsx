export type TeamScoreProps = {
  readonly score?: number;
};

export const TeamScore = ({ score }: TeamScoreProps) => {
  if (score == null) {
    return null;
  }

  return <p className="w-1/3 text-left text-2xl font-bold">{score}</p>;
};
