import { ScoringDetail } from "../ScoringDetail";
import type { ScoringPlay /* , Team */ } from "../types";

type ScoringPlayListProps = {
  readonly scoringPlays: ScoringPlay[];
};

export const ScoringPlayList = ({
  scoringPlays,
}: ScoringPlayListProps): JSX.Element => {
  if (scoringPlays.length === 0) {
    return <span>No Goals</span>;
  }

  return (
    <>
      {scoringPlays.map((sp) => (
        <ScoringDetail key={sp.timeInPeriod} scoringPlay={sp} />
      ))}
    </>
  );
};
