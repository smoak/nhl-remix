import { PeriodOrdinal } from "~/components/PeriodOrdinal";
import { Penalty } from "~/components/types";
import { PenaltyList } from "./PenaltyList";
import { OvertimePenaltySummary } from "./OvertimePenaltySummary";

type PeriodPenaltySummaryProps = {
  readonly isPlayoffGame: boolean;
  readonly period: number;
  readonly penalties: Penalty[];
};
export const PeriodPenaltySummary = ({
  isPlayoffGame,
  period,
  penalties,
}: PeriodPenaltySummaryProps) => {
  if (period > 3 && isPlayoffGame) {
    return (
      <OvertimePenaltySummary otPeriod={period - 3} penalties={penalties} />
    );
  }

  if (period === 4) {
    return (
      <OvertimePenaltySummary otPeriod={period - 3} penalties={penalties} />
    );
  }

  if (period > 4) {
    return null;
  }

  return (
    <>
      <div className="my-5 border-b-2 border-nhl-black bg-black px-6 py-3 font-bold text-white">
        <PeriodOrdinal period={period} /> period
      </div>
      <PenaltyList penalties={penalties} />
    </>
  );
};
