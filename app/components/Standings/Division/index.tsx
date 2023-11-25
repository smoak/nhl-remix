import { useLoaderData } from "@remix-run/react";
import type { Standings } from "~/components/types";
import { StandingsSection } from "../StandingsSection";

export const Division = () => {
  const { division } = useLoaderData<Standings>();

  return (
    <div className="inline-flex w-full flex-col gap-8">
      <StandingsSection
        headingText="Eastern"
        subheadingText="Atlantic"
        standings={division.atlantic}
      />
      <StandingsSection
        subheadingText="Metropolitan"
        standings={division.metropolitan}
      />
      <StandingsSection
        headingText="Western"
        subheadingText="Central"
        standings={division.central}
      />
      <StandingsSection subheadingText="Pacific" standings={division.pacific} />
    </div>
  );
};
