import { LoaderFunction } from "@remix-run/node";
import { getPlayoffBracket } from "~/api";
import { getYear } from "date-fns";
import { useLoaderData } from "@remix-run/react";
import { BackButton } from "~/components/BackButton";
import { Layout } from "~/components/Layout";
import { normalizePlayoffRounds } from "~/data/normalization/playoffs";
import { PlayoffBracket, PlayoffRound } from "~/components/types";
import { Matchup } from "~/components/PlayoffBracket/Matchup";
import { PeriodOrdinal } from "~/components/PeriodOrdinal";

export const loader: LoaderFunction = async () => {
  const response = await getPlayoffBracket(getYear(new Date()));

  return normalizePlayoffRounds(response);
};

type RoundProps = {
  readonly round: PlayoffRound;
};
const Round = ({ round }: RoundProps) => {
  if (!round.hasStarted) {
    return (
      <div className="my-3 flex flex-col gap-2">
        <div className="border-b-2 border-nhl-black bg-nhl-black px-6 py-3 font-bold text-white">
          <PeriodOrdinal period={round.round} /> Round
        </div>
        <div className="flex justify-center font-bold">Series not started</div>
      </div>
    );
  }

  return (
    <div className="my-3 flex flex-col gap-2">
      <div className="border-b-2 border-nhl-black bg-nhl-black px-6 py-3 font-bold text-white">
        <PeriodOrdinal period={round.round} /> Round
      </div>
      {round.matchups.map((matchup) => (
        <Matchup matchup={matchup} key={matchup.id} />
      ))}
    </div>
  );
};

const Index = () => {
  const { rounds } = useLoaderData<PlayoffBracket>();

  return (
    <Layout>
      <BackButton />
      <h1 className="mb-3 text-4xl font-bold">Playoffs</h1>
      {rounds.map((round) => (
        <div className="flex flex-col" key={round.round}>
          <Round round={round} />
        </div>
      ))}
    </Layout>
  );
};

export default Index;
