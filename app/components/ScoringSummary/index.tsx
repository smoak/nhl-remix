import type { Game, LiveGame, ScoringPlay, Team } from "../types";
import { isLiveGame } from "../types";
import { ScoringPlayList } from "../ScoringPlayList";

type ScoringSummaryProps = {
  readonly game: Game;
};

type PeriodScoringSummaryProps = {
  readonly awayTeam: Team;
  readonly homeTeam: Team;
  readonly ordinal: string;
  readonly scoringPlays: ScoringPlay[];
};
const PeriodScoringSummary = ({
  awayTeam,
  homeTeam,
  ordinal,
  scoringPlays,
}: PeriodScoringSummaryProps): JSX.Element => {
  return (
    <>
      <div className="my-5 border-b-2 border-nhl-black bg-black px-6 py-3 font-bold text-white">
        {ordinal} period
      </div>
      <ScoringPlayList
        scoringPlays={scoringPlays}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
      />
    </>
  );
};

type OvertimePeriodScoringSummaryProps = Omit<
  PeriodScoringSummaryProps,
  "ordinal" | "scoringPlays"
> & {
  readonly scoringPlay?: ScoringPlay;
};

const OvertimePeriodScoringSummary = ({
  awayTeam,
  homeTeam,
  scoringPlay,
}: OvertimePeriodScoringSummaryProps): JSX.Element | null => {
  if (!scoringPlay) {
    return null;
  }

  const { period, periodOrdinalNum } = scoringPlay;

  return (
    <>
      {[...Array(period - 4).keys()].map((i) => {
        if (i === 0) {
          return (
            <PeriodScoringSummary
              key={i}
              awayTeam={awayTeam}
              homeTeam={homeTeam}
              ordinal="OT"
              scoringPlays={[]}
            />
          );
        }
        return (
          <PeriodScoringSummary
            key={i}
            awayTeam={awayTeam}
            homeTeam={homeTeam}
            ordinal={`${i + 1}OT`}
            scoringPlays={[]}
          />
        );
      })}
      <PeriodScoringSummary
        awayTeam={awayTeam}
        homeTeam={homeTeam}
        ordinal={periodOrdinalNum}
        scoringPlays={[scoringPlay]}
      />
    </>
  );
};

type LiveGameScoringSummaryProps = {
  readonly game: LiveGame;
};
const LiveGameScoringSummary = ({
  game,
}: LiveGameScoringSummaryProps): JSX.Element => {
  const { awayTeam, homeTeam, linescore, scoringPlays } = game;
  const { periods } = linescore;

  return (
    <>
      <h1 className="text-2xl font-bold">Scoring</h1>
      {periods.map((p) => (
        <PeriodScoringSummary
          key={p.ordinalNum}
          ordinal={p.ordinalNum}
          awayTeam={awayTeam}
          homeTeam={homeTeam}
          scoringPlays={scoringPlays.filter((sp) => sp.period === p.num)}
        />
      ))}
    </>
  );
};

export const ScoringSummary = ({
  game,
}: ScoringSummaryProps): JSX.Element | null => {
  const { awayTeam, homeTeam, scoringPlays } = game;

  if (scoringPlays.length === 0) {
    return null;
  }

  if (isLiveGame(game)) {
    return <LiveGameScoringSummary game={game} />;
  }

  const firstPeriodScoringPlays = scoringPlays.filter((sp) => sp.period === 1);
  const secondPeriodScoringPlays = scoringPlays.filter((sp) => sp.period === 2);
  const thirdPeriodScoringPlays = scoringPlays.filter((sp) => sp.period === 3);
  const otPeriodScoringPlays = scoringPlays.filter(
    (sp) => ![1, 2, 3].includes(sp.period) && sp.periodOrdinalNum !== "SO"
  );

  return (
    <>
      <h1 className="text-2xl font-bold">Scoring</h1>
      <PeriodScoringSummary
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
      />
    </>
  );
};
