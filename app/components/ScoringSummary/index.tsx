import { OvertimePeriodScoringSummary } from "../OvertimePeriodScoringSummary";
import { PeriodScoringSummary } from "../PeriodScoringSummary";
import { type ScoringPlay, type ScoringPlays } from "../types";

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
  const ot = Object.entries(scoringPlays).reduce<ScoringPlay | null>(
    (accum, [period, scoringPlays]) => {
      if (parseInt(period) > 3) {
        return scoringPlays[0];
      }

      return accum;
    },
    null
  );

  return (
    <div>
      <h1 className="text-2xl font-bold">Scoring</h1>
      <PeriodScoringSummary periodNumber={1} scoringPlays={firstPeriod} />
      <PeriodScoringSummary periodNumber={2} scoringPlays={secondPeriod} />
      <PeriodScoringSummary periodNumber={3} scoringPlays={thirdPeriod} />
      <OvertimePeriodScoringSummary scoringPlay={ot} />
    </div>
  );
};
