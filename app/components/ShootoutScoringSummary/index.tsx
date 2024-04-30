import { ScoringPlayList } from "../ScoringPlayList";
import type { ScoringPlay } from "../types";

type ShootoutScoringSummaryProps = {
  readonly scoringPlay?: ScoringPlay;
};
export const ShootoutScoringSummary = ({
  scoringPlay,
}: ShootoutScoringSummaryProps) => {
  if (!scoringPlay) {
    return null;
  }

  return (
    <>
      <div className="my-5 border-b-2 border-nhl-black bg-black px-6 py-3 font-bold text-white">
        S/O
      </div>
      <ScoringPlayList scoringPlays={[scoringPlay]} />
    </>
  );
};
