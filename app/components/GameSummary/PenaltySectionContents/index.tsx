import { PeriodSummary } from "~/components/types";
import { PeriodPenaltySummary } from "./PeriodPenaltySummary";

type PenaltySectionContentsProps = {
  readonly isPlayoffGame: boolean;
  readonly periodSummaries: PeriodSummary[];
};

export const PenaltySectionContents = ({
  isPlayoffGame,
  periodSummaries,
}: PenaltySectionContentsProps) => {
  console.log("isPlayoffGame", isPlayoffGame);
  return (
    <>
      <h1 className="text-2xl font-bold">Penalties</h1>
      {periodSummaries.map((ps) => (
        <PeriodPenaltySummary
          isPlayoffGame={isPlayoffGame}
          key={ps.periodNumber}
          period={ps.periodNumber}
          penalties={ps.penalties}
        />
      ))}
    </>
  );
};
