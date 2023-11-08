import type { Team } from "../types";

type LiveGameScoringSummaryProps = {
  readonly awayTeam: Team;
  readonly homeTeam: Team;
};
export const LiveGameScoringSummary = (
  props: LiveGameScoringSummaryProps
): JSX.Element => {
  // const { periods } = linescore;

  return (
    <>
      <h1 className="text-2xl font-bold">Scoring</h1>
      {/* {periods.map((p) => (
        <PeriodScoringSummary
          key={p.ordinalNum}
          ordinal={p.ordinalNum}
          awayTeam={awayTeam}
          homeTeam={homeTeam}
          scoringPlays={scoringPlays.filter((sp) => sp.period === p.num)}
        />
      ))} */}
    </>
  );
};
