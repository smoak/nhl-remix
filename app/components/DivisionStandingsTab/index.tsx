import { useLoaderData } from "@remix-run/react";
import type { Standings } from "~/data/types";
import { StandingsTable } from "../StandingsTable";

export const DivisionStandingsTab = () => {
  const { division } = useLoaderData<Standings>();

  return (
    <>
      <StandingsTable
        label="Metropolitan"
        standingsRecord={division.metropolitan}
        standingsMode="Division"
      />
      <StandingsTable
        label="Atlantic"
        standingsRecord={division.atlantic}
        standingsMode="Division"
      />
      <StandingsTable
        label="Central"
        standingsRecord={division.central}
        standingsMode="Division"
      />
      <StandingsTable
        label="Pacific"
        standingsRecord={division.pacific}
        standingsMode="Division"
      />
    </>
  );
};
