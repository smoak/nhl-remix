export type TeamScoreProps = {
  readonly score: number;
};

export const TeamScore = ({ score }: TeamScoreProps) => {
  return <p className="w-1/3 text-left text-2xl font-bold">{score}</p>;
};
