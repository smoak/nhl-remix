import { useLoaderData } from "@remix-run/react";
import type { Standings, StandingsRecord } from "~/components/types";
import { StandingsSection } from "../StandingsSection";

type DivisionSection = {
  readonly division: StandingsRecord[];
  readonly wildCard: StandingsRecord[];
};

const asDivisionSection = (records: StandingsRecord[]): DivisionSection => {
  return {
    division: records.slice(0, 3),
    wildCard: records.slice(3),
  };
};

const conferenceWildCard = (a: DivisionSection, b: DivisionSection) =>
  [...a.wildCard, ...b.wildCard].sort(byPoints);

const regulationWinsTieBreaker = (
  a: StandingsRecord,
  b: StandingsRecord
): number => {
  return b.regulationWins - a.regulationWins;
};

const pointsPercentageTieBreaker = (a: StandingsRecord, b: StandingsRecord) => {
  const aPointsPercentage = a.pointsPercentage;
  const bPointsPercentage = b.pointsPercentage;
  const sortValue = bPointsPercentage - aPointsPercentage;

  if (sortValue === 0) {
    return regulationWinsTieBreaker(a, b);
  }

  return sortValue;
};

const byPoints = (a: StandingsRecord, b: StandingsRecord) => {
  const sortValue = b.points - a.points;

  if (sortValue === 0) {
    return pointsPercentageTieBreaker(a, b);
  }

  return sortValue;
};

export const WildCard = () => {
  const { division } = useLoaderData<Standings>();
  const { atlantic, central, metropolitan, pacific } = division;
  const atlanticSection = asDivisionSection(atlantic);
  const metroSection = asDivisionSection(metropolitan);
  const centralSection = asDivisionSection(central);
  const pacificSection = asDivisionSection(pacific);
  const easternWildCard = conferenceWildCard(atlanticSection, metroSection);
  const westernWildCard = conferenceWildCard(centralSection, pacificSection);

  return (
    <div className="inline-flex w-full flex-col gap-8">
      <StandingsSection
        headingText="Eastern"
        subheadingText="Atlantic"
        standings={atlanticSection.division}
      />
      <StandingsSection
        subheadingText="Metropolitan"
        standings={metroSection.division}
      />
      <StandingsSection
        subheadingText="Wild Card"
        standings={easternWildCard}
      />
      <StandingsSection
        headingText="Western"
        subheadingText="Central"
        standings={centralSection.division}
      />
      <StandingsSection
        subheadingText="Pacific"
        standings={pacificSection.division}
      />
      <StandingsSection
        subheadingText="Wild Card"
        standings={westernWildCard}
      />
    </div>
  );
};
