import { TeamLogo } from "~/components/TeamLogo";
import type { PlayoffMatchup } from "~/components/types";
import { SeriesStatus } from "../SeriesStatus";

type MatchupProps = {
  readonly matchup: PlayoffMatchup;
};

export const Matchup = ({ matchup }: MatchupProps) => {
  return (
    <div className="flex gap-2 rounded-lg border border-nhl-gray-900 p-6 bg-white">
      <div className="flex w-1/3 flex-col items-center text-center">
        <TeamLogo
          logoUrl={matchup.highSeed.logo}
          teamName={matchup.highSeed.name}
          size="sm"
        />
        {matchup.highSeed.name}
      </div>
      <div className="flex w-1/3 flex-col justify-center">
        <div className="flex justify-center text-3xl font-bold">
          {matchup.highSeed.seriesWins} - {matchup.lowSeed.seriesWins}
        </div>
        <SeriesStatus
          highSeed={matchup.highSeed}
          lowSeed={matchup.lowSeed}
          winsRequired={matchup.winsRequired}
        />
      </div>
      <div className="flex flex-grow flex-col items-center text-center">
        <TeamLogo
          logoUrl={matchup.lowSeed.logo}
          teamName={matchup.lowSeed.name}
          size="sm"
        />
        {matchup.lowSeed.name}
      </div>
    </div>
  );
};
