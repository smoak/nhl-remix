import { ScoringPlayList } from "../ScoringPlayList";
import type { ScoringPlay } from "../types";

type OvertimePeriodScoringSummaryProps = {
  readonly scoringPlays: ScoringPlay[];
};

export const OvertimePeriodScoringSummary = ({
  scoringPlays,
}: OvertimePeriodScoringSummaryProps) => {
  if (scoringPlays.length === 0) {
    return null;
  }

  return (
    <>
      <div className="my-5 border-b-2 border-nhl-black bg-black px-6 py-3 font-bold text-white">
        Overtime
      </div>
      <ScoringPlayList scoringPlays={scoringPlays} />
    </>
  );
};
