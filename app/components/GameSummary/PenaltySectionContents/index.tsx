import { PeriodSummary } from "~/components/types";
import { PeriodPenaltySummary } from "./PeriodPenaltySummary";

type PenaltySectionContentsProps = {
  readonly periodSummaries: PeriodSummary[];
};

export const PenaltySectionContents = ({
  periodSummaries,
}: PenaltySectionContentsProps) => {
  return (
    <>
      <h1 className="text-2xl font-bold">Penalties</h1>
      {periodSummaries.map((ps) => (
        <PeriodPenaltySummary
          key={ps.periodNumber}
          period={ps.periodNumber}
          penalties={ps.penalties}
        />
      ))}
    </>
  );
};
