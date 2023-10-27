import { TeamLogo } from "../TeamLogo";
import type { Matchup, PlayoffBracket, PlayoffTeam } from "../types";
import { teamIdToColors } from "../styles";

type MatchupTeamProps = {
  readonly team?: PlayoffTeam;
};
const MatchupTeam = ({ team }: MatchupTeamProps): JSX.Element => {
  if (!team) {
    return (
      <div className="flex h-16 w-16 items-center justify-center self-center rounded-full bg-nhl-gray-100 px-2 py-2">
        TBD
      </div>
    );
  }

  if (team.isEliminated) {
    return (
      <div
        className="flex h-16 w-16 justify-center self-center rounded-full px-2 py-2 opacity-70"
        style={{ backgroundColor: teamIdToColors[team.id] }}
      >
        <TeamLogo teamAbbreviation={team.abbrev} teamId={team.id} size={50} />
      </div>
    );
  }

  return (
    <div
      className="flex h-16 w-16 justify-center self-center rounded-full px-2 py-2"
      style={{ backgroundColor: teamIdToColors[team.id] }}
    >
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
    <div className="mb-5 flex w-32 flex-col rounded bg-white px-2 py-2 shadow">
      <MatchupTeam team={topTeam} />
      <span className="flex self-center px-2 py-2 text-xs">
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
    <div className="my-0 ml-0 mr-5 flex w-32 flex-col items-center py-5 ">
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
    <div className="my-0 ml-0 mr-5 flex w-32 flex-col items-center py-5">
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
      <div className="mx-auto my-0 grid grid-flow-row grid-cols-4 gap-4 lg:grid-cols-7">
        <WesternConference western={bracket.western} />
        <FinalRound matchup={bracket.finalRound} />
        <EasternConference eastern={bracket.eastern} />
      </div>
    </section>
  );
};
