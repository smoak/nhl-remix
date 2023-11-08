import { PeriodOrdinal } from "../PeriodOrdinal";
import { ScoringPlayList } from "../ScoringPlayList";
import type { ScoringPlay, Team } from "../types";

type PeriodScoringSummaryProps = {
  readonly awayTeam: Team;
  readonly homeTeam: Team;
  readonly periodNumber: number;
  readonly scoringPlays: ScoringPlay[];
};
export const PeriodScoringSummary = ({
  awayTeam,
  homeTeam,
  periodNumber,
  scoringPlays,
}: PeriodScoringSummaryProps): JSX.Element => {
  return (
    <>
      <div className="my-5 border-b-2 border-nhl-black bg-black px-6 py-3 font-bold text-white">
        <PeriodOrdinal period={periodNumber} /> period
      </div>
      <ScoringPlayList
        scoringPlays={scoringPlays}
        // homeTeam={homeTeam}
        // awayTeam={awayTeam}
      />
    </>
  );
};
