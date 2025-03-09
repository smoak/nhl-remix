import { GameSummaryTable } from "~/components/GameSummaryTable";
import type {
  FinalGame,
  GameRecapInfo,
  LiveGame,
  PeriodSummary,
} from "~/components/types";
import { GameRecapButtons } from "../GameRecapButtons";
import { PenaltySectionContents } from "../PenaltySectionContents";

type SummarySectionProps = {
  readonly game: LiveGame | FinalGame;
  readonly gameRecap?: GameRecapInfo;
  readonly periodSummaries: PeriodSummary[];
};

export const SummarySection = ({
  game,
  gameRecap,
  periodSummaries,
}: SummarySectionProps) => {
  return (
    <div className="flex flex-col gap-4">
      <section>
        <h1 className="text-2xl font-semibold">Game Summary</h1>
        <div className="overflow-x-auto">
          <GameSummaryTable game={game} periodSummaries={periodSummaries} />
          <GameRecapButtons gameRecap={gameRecap} />
        </div>
      </section>
      <section className="hidden md:block">
        <PenaltySectionContents
          periodSummaries={periodSummaries}
          isPlayoffGame={game.type === "Playoff"}
        />
      </section>
    </div>
  );
};
