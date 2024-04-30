import { GameSummaryTable } from "~/components/GameSummaryTable";
import type { FinalGame, LiveGame, PeriodSummary } from "~/components/types";
import { GameRecapButtons } from "../GameRecapButtons";

type SummarySectionProps = {
  readonly game: LiveGame | FinalGame;
  readonly periodSummaries: PeriodSummary[];
};

export const SummarySection = ({
  game,
  periodSummaries,
}: SummarySectionProps) => {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Game Summary</h1>
      <div className="overflow-x-auto">
        <GameSummaryTable game={game} periodSummaries={periodSummaries} />
        <GameRecapButtons game={game} />
      </div>
    </section>
  );
};
