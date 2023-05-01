import { TeamLogo } from "../TeamLogo";
import type { PlayoffBracket, PlayoffTeam } from "../types";
import type { Matchup } from "../types";

type MatchupTeamProps = {
  readonly team?: PlayoffTeam;
};
const MatchupTeam = ({ team }: MatchupTeamProps): JSX.Element => {
  if (!team) {
    return <div className="flex self-center px-2 py-2">TBD</div>;
  }

  return (
    <div className="flex self-center px-2 py-2">
      <TeamLogo teamAbbreviation={team.abbrev} teamId={team.id} size={50} />
    </div>
  );
};

type PlayoffMatchupProps = {
  readonly matchup: Matchup;
};
const PlayoffMatchup = ({ matchup }: PlayoffMatchupProps) => {
  const { bottomTeam, seriesSummary, topTeam } = matchup;

  return (
    <div className="mb-5 flex w-32 flex-col rounded bg-white shadow">
      <MatchupTeam team={topTeam} />
      <span className="flex self-center px-2 py-2 text-sm">
        {seriesSummary}
      </span>
      <MatchupTeam team={bottomTeam} />
    </div>
  );
};

type FinalRoundProps = {
  readonly matchup: Matchup;
};
const FinalRound = ({ matchup }: FinalRoundProps) => {
  return (
    <div className="my-0 ml-0 mr-5 flex w-32 flex-col">
      <div className="pb-5 uppercase">SCF</div>
      <div
        className="flex h-full min-h-full justify-center"
        style={{ flexFlow: "row wrap" }}
      >
        <div className="flex flex-col justify-center ">
          <PlayoffMatchup matchup={matchup} />
        </div>
      </div>
    </div>
  );
};

type RoundProps = {
  readonly number: string;
  readonly matchups: Matchup[];
};
const Round = ({ matchups, number }: RoundProps): JSX.Element => {
  return (
    <div className="my-0 ml-0 mr-5 flex w-32 flex-col">
      <div className="pb-5 uppercase">Round {number}</div>
      <div
        className="flex h-full min-h-full justify-center"
        style={{ flexFlow: "row wrap" }}
      >
        {matchups.map((m) => (
          <div className="flex flex-col justify-center" key={m.id}>
            <PlayoffMatchup matchup={m} />
          </div>
        ))}
      </div>
    </div>
  );
};

type WesternConferenceProps = {
  readonly western: PlayoffBracket["western"];
};
const WesternConference = ({ western }: WesternConferenceProps) => {
  return (
    <>
      <Round number="1" matchups={western[1].matchups} />
      <Round number="2" matchups={western[2].matchups} />
      <Round number="3" matchups={western[3].matchups} />
    </>
  );
};

type EasternConferenceProps = {
  readonly eastern: PlayoffBracket["eastern"];
};
const EasternConference = ({ eastern }: EasternConferenceProps) => {
  return (
    <>
      <Round number="3" matchups={eastern[3].matchups} />
      <Round number="2" matchups={eastern[2].matchups} />
      <Round number="1" matchups={eastern[1].matchups} />
    </>
  );
};

type PlayoffBracketProps = {
  readonly bracket: PlayoffBracket;
};

export const PlayffBracket = ({ bracket }: PlayoffBracketProps) => {
  return (
    <section>
      <div className="mx-auto my-0 flex">
        <div className="my-2 flex">
          <WesternConference western={bracket.western} />
          <FinalRound matchup={bracket.finalRound} />
          <EasternConference eastern={bracket.eastern} />
        </div>
      </div>
    </section>
  );
};
