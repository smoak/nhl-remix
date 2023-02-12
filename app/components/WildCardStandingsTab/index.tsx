import { useLoaderData } from "@remix-run/react";
import type { Standings } from "~/data/types";
import { StandingsTable } from "../StandingsTable";

export const WildCardStandingsTab = () => {
  const { wildCard } = useLoaderData<Standings>();

  return (
    <>
      <h1 className="text-4xl font-bold">Eastern</h1>
      <StandingsTable
        label="Metropolitan"
        standingsRecord={wildCard.east.metropolitan}
        standingsMode="Division"
      />
      <StandingsTable
        label="Atlantic"
        standingsRecord={wildCard.east.atlantic}
        standingsMode="Division"
      />
      <StandingsTable
        label="Wild Card"
        standingsRecord={wildCard.east.wildcard}
        standingsMode="WildCard"
      />
      <h1 className="text-4xl font-bold">Western</h1>
      <StandingsTable
        label="Central"
        standingsRecord={wildCard.west.central}
        standingsMode="Division"
      />
      <StandingsTable
        label="Pacific"
        standingsRecord={wildCard.west.pacific}
        standingsMode="Division"
      />
      <StandingsTable
        label="Wild Card"
        standingsRecord={wildCard.west.wildcard}
        standingsMode="WildCard"
      />
    </>
  );
};
