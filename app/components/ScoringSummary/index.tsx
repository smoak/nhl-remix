import { PeriodScoringSummary } from "../PeriodScoringSummary";
import { type Game, type ScoringPlays } from "../types";

type ScoringSummaryProps = {
  readonly game: Game;
  readonly scoringPlays: ScoringPlays;
};

// type OvertimePeriodScoringSummaryProps = Omit<
//   PeriodScoringSummaryProps,
//   "ordinal" | "scoringPlays"
// > & {
//   readonly scoringPlay?: ScoringPlay;
// };

// const OvertimePeriodScoringSummary = ({
//   awayTeam,
//   homeTeam,
//   scoringPlay,
// }: OvertimePeriodScoringSummaryProps): JSX.Element | null => {
//   if (!scoringPlay) {
//     return null;
//   }

//   const { period } = scoringPlay;

//   return (
//     <>
//       {[...Array(period - 4).keys()].map((i) => {
//         if (i === 0) {
//           return (
//             <PeriodScoringSummary
//               key={i}
//               awayTeam={awayTeam}
//               homeTeam={homeTeam}
//               periodNumber={period}
//               scoringPlays={[]}
//             />
//           );
//         }
//         return (
//           <PeriodScoringSummary
//             key={i}
//             awayTeam={awayTeam}
//             homeTeam={homeTeam}
//             periodNumber={period}
//             scoringPlays={[]}
//           />
//         );
//       })}
//       <PeriodScoringSummary
//         awayTeam={awayTeam}
//         homeTeam={homeTeam}
//         periodNumber={period}
//         scoringPlays={[scoringPlay]}
//       />
//     </>
//   );
// };

export const ScoringSummary = ({
  game,
  scoringPlays,
}: ScoringSummaryProps): JSX.Element | null => {
  const { awayTeam, homeTeam } = game;

  // if (scoringPlays.length === 0) {
  //   return null;
  // }

  // if (isLiveGame(game)) {
  //   return <LiveGameScoringSummary awayTeam={awayTeam} homeTeam={homeTeam} />;
  // }

  // return null;

  // const firstPeriodScoringPlays = scoringPlays.filter((sp) => sp.period === 1);
  // const secondPeriodScoringPlays = scoringPlays.filter((sp) => sp.period === 2);
  // const thirdPeriodScoringPlays = scoringPlays.filter((sp) => sp.period === 3);
  // const otPeriodScoringPlays = scoringPlays.filter(
  //   (sp) => ![1, 2, 3].includes(sp.period) && sp.periodOrdinalNum !== "SO"
  // );

  return (
    <>
      <h1 className="text-2xl font-bold">Scoring</h1>
      <PeriodScoringSummary
        awayTeam={awayTeam}
        homeTeam={homeTeam}
        periodNumber={1}
        scoringPlays={scoringPlays[1]}
      />
      <PeriodScoringSummary
        awayTeam={awayTeam}
        homeTeam={homeTeam}
        periodNumber={2}
        scoringPlays={scoringPlays[2]}
      />
      {/* <PeriodScoringSummary
        ordinal="1st"
        scoringPlays={firstPeriodScoringPlays}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
      <PeriodScoringSummary
        ordinal="2nd"
        scoringPlays={secondPeriodScoringPlays}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
      <PeriodScoringSummary
        ordinal="3rd"
        scoringPlays={thirdPeriodScoringPlays}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
      <OvertimePeriodScoringSummary
        scoringPlay={otPeriodScoringPlays[0]}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      /> */}
    </>
  );
};
