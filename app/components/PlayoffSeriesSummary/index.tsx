import type { GameType } from "~/api/types";

export type PlayoffSeriesSummaryProps = {
  readonly gameType: GameType;
  readonly seriesStatusShort: string;
};

export const PlayoffSeriesSummary = ({
  gameType,
  seriesStatusShort,
}: PlayoffSeriesSummaryProps) => {
  if (gameType !== "P") {
    return null;
  }

  return (
    <span className="mt-3 block text-center text-xs font-semibold capitalize">
      {seriesStatusShort}
    </span>
  );
};
