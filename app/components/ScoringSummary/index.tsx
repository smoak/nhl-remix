import { OvertimePeriodScoringSummary } from "../OvertimePeriodScoringSummary";
import { PeriodScoringSummary } from "../PeriodScoringSummary";
import { type ScoringPlays } from "../types";

type ScoringSummaryProps = {
  readonly isScheduledGame: boolean;
  readonly scoringPlays: ScoringPlays;
};

export const ScoringSummary = ({
  isScheduledGame,
  scoringPlays,
}: ScoringSummaryProps): JSX.Element | null => {
  if (isScheduledGame) {
    return null;
  }

  const firstPeriod = scoringPlays[1] ?? [];
  const secondPeriod = scoringPlays[2] ?? [];
  const thirdPeriod = scoringPlays[3] ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold">Scoring</h1>
      <PeriodScoringSummary periodNumber={1} scoringPlays={firstPeriod} />
      <PeriodScoringSummary periodNumber={2} scoringPlays={secondPeriod} />
      <PeriodScoringSummary periodNumber={3} scoringPlays={thirdPeriod} />
      <OvertimePeriodScoringSummary scoringPlays={scoringPlays[4] ?? []} />
    </div>
  );
};
