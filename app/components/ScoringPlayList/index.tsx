import { ScoringDetail } from "../ScoringDetail";
import type { ScoringPlay /* , Team */ } from "../types";

type ScoringPlayListProps = {
  // readonly awayTeam: Team;
  // readonly homeTeam: Team;
  readonly scoringPlays: ScoringPlay[];
};

export const ScoringPlayList = ({
  // awayTeam,
  // homeTeam,
  scoringPlays,
}: ScoringPlayListProps): JSX.Element => {
  if (scoringPlays.length === 0) {
    return <span>No Goals</span>;
  }

  return (
    <>
      {scoringPlays.map((sp) => (
        <ScoringDetail
          key={sp.timeInPeriod}
          // homeTeam={homeTeam}
          // awayTeam={awayTeam}
          scoringPlay={sp}
        />
      ))}
    </>
  );
};
