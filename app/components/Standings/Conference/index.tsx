import { useLoaderData } from "@remix-run/react";
import type { Standings } from "~/components/types";
import { StandingsSection } from "../StandingsSection";

export const Conference = () => {
  const { conference } = useLoaderData<Standings>();
  return (
    <div className="inline-flex w-full flex-col gap-8">
      <StandingsSection headingText="Eastern" standings={conference.east} />
      <StandingsSection headingText="Western" standings={conference.west} />
    </div>
  );
};
