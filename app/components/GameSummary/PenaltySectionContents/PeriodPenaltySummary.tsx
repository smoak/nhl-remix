import { PeriodOrdinal } from "~/components/PeriodOrdinal";
import { Penalty } from "~/components/types";
import { PenaltyList } from "./PenaltyList";

type PeriodPenaltySummaryProps = {
  readonly period: number;
  readonly penalties: Penalty[];
};
export const PeriodPenaltySummary = ({
  period,
  penalties,
}: PeriodPenaltySummaryProps) => {
  return (
    <>
      <div className="my-5 border-b-2 border-nhl-black bg-black px-6 py-3 font-bold text-white">
        <PeriodOrdinal period={period} /> period
      </div>
      <PenaltyList penalties={penalties} />
    </>
  );
};
