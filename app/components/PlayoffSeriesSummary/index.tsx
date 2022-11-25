export type PlayoffSeriesSummaryProps = {
  readonly seriesStatusShort?: string;
};

export const PlayoffSeriesSummary = ({
  seriesStatusShort,
}: PlayoffSeriesSummaryProps) => {
  if (!seriesStatusShort) {
    return null;
  }

  return (
    <span className="mt-3 block text-center text-xs font-semibold capitalize">
      {seriesStatusShort}
    </span>
  );
};
