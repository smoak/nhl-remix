import { useLoaderData } from "@remix-run/react";
import type { Standings } from "~/components/types";
import { ConferenceSection } from "../ConferenceSection";

export const Conference = () => {
  const { conference } = useLoaderData<Standings>();
  return (
    <div className="inline-flex w-full flex-col gap-8">
      <ConferenceSection label="Eastern" standings={conference.east} />
      <ConferenceSection label="Western" standings={conference.west} />
    </div>
  );
};
