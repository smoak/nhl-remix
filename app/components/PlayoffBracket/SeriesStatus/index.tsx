import type { PlayoffTeam } from "~/components/types";

type SeriesStatusProps = {
  readonly highSeed: PlayoffTeam;
  readonly lowSeed: PlayoffTeam;
  readonly winsRequired: number;
};
export const SeriesStatus = ({
  highSeed,
  lowSeed,
  winsRequired,
}: SeriesStatusProps) => {
  if (highSeed.seriesWins === 0 && lowSeed.seriesWins === 0) {
    return (
      <span className="flex justify-center text-center">
        Series has not started
      </span>
    );
  }

  if (highSeed.seriesWins === lowSeed.seriesWins) {
    return <span className="flex justify-center text-center">Series Tied</span>;
  }

  if (highSeed.seriesWins === winsRequired) {
    return (
      <span className="flex justify-center text-center">
        {highSeed.abbrev} wins series
      </span>
    );
  }

  if (lowSeed.seriesWins === winsRequired) {
    return (
      <span className="flex justify-center text-center">
        {lowSeed.abbrev} wins series
      </span>
    );
  }

  if (highSeed.seriesWins > lowSeed.seriesWins) {
    return (
      <span className="flex justify-center text-center">
        {highSeed.abbrev} leads series
      </span>
    );
  }

  return (
    <span className="flex justify-center">{lowSeed.abbrev} leads series</span>
  );
};
