import { Penalty } from "~/components/types";
import { PenaltyList } from "./PenaltyList";
import { PeriodOrdinal } from "~/components/PeriodOrdinal";

type OvertimePenaltySummaryProps = {
  readonly otPeriod: number;
  readonly penalties: Penalty[];
};
export const OvertimePenaltySummary = ({
  otPeriod,
  penalties,
}: OvertimePenaltySummaryProps) => {
  if (otPeriod === 1) {
    return (
      <>
        <div className="my-5 border-b-2 border-nhl-black bg-black px-6 py-3 font-bold text-white">
          Overtime
        </div>
        <PenaltyList penalties={penalties} />
      </>
    );
  }

  return (
    <>
      <div className="my-5 border-b-2 border-nhl-black bg-black px-6 py-3 font-bold text-white">
        <PeriodOrdinal period={otPeriod} /> Overtime
      </div>
      <PenaltyList penalties={penalties} />
    </>
  );
};
