import { PeriodOrdinal } from "../PeriodOrdinal";
import { ScoringPlayList } from "../ScoringPlayList";
import type { ScoringPlay } from "../types";

type PeriodScoringSummaryProps = {
  readonly periodNumber: number;
  readonly scoringPlays: ScoringPlay[];
};
export const PeriodScoringSummary = ({
  periodNumber,
  scoringPlays,
}: PeriodScoringSummaryProps): JSX.Element => {
  return (
    <>
      <div className="my-5 border-b-2 border-nhl-black bg-black px-6 py-3 font-bold text-white">
        <PeriodOrdinal period={periodNumber} /> period
      </div>
      <ScoringPlayList scoringPlays={scoringPlays} />
    </>
  );
};
