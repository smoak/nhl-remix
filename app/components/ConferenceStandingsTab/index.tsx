import { useLoaderData } from "@remix-run/react";
import type { Standings } from "~/data/types";
import { StandingsTable } from "../StandingsTable";

export const ConferenceStandingsTab = () => {
  const { conference } = useLoaderData<Standings>();
  const { east, west } = conference;

  return (
    <>
      <StandingsTable label="Eastern Conference" standingsRecord={east} />
      <StandingsTable label="Western Conference" standingsRecord={west} />
    </>
  );
};
