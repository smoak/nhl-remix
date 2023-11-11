import { PlayerAvatar } from "../PlayerAvatar";
import { TeamLogo } from "../TeamLogo";
import type { ScoringPlay, TeamAbbreviation } from "../types";

type ScoringDetailProps = {
  readonly scoringPlay: ScoringPlay;
};

type AssistInfoProps = {
  readonly primaryAssist?: ScoringPlay["primaryAssist"];
  readonly secondaryAssist?: ScoringPlay["secondaryAssist"];
};
const AssistInfo = ({
  primaryAssist,
  secondaryAssist,
}: AssistInfoProps): JSX.Element | null => {
  if (!primaryAssist) {
    return <span className="text-xs">Unassisted</span>;
  }

  if (!secondaryAssist) {
    return (
      <span className="text-xs">
        {primaryAssist.lastName} ({primaryAssist.seasonAssists})
      </span>
    );
  }

  return (
    <span className="text-xs">
      {primaryAssist.lastName} ({primaryAssist.seasonAssists}),{" "}
      {secondaryAssist.lastName} ({secondaryAssist.seasonAssists})
    </span>
  );
};

export const ScoringDetail = ({
  scoringPlay,
}: ScoringDetailProps): JSX.Element => {
  const {
    goalScorer,
    awayScore,
    homeScore,
    leadingTeamAbbrev,
    timeInPeriod,
    primaryAssist,
    secondaryAssist,
    teamAbbrev,
  } = scoringPlay;

  return (
    <div className="flex flex-col pb-4">
      <div className="border-nhl-200 flex flex-col rounded-lg border bg-white p-4">
        <div className="flex items-center gap-2">
          <PlayerAvatar
            playerName={goalScorer.name}
            playerHeadshot={goalScorer.headshot}
            teamAbbrev={teamAbbrev as TeamAbbreviation}
          />
          <div className="flex flex-col whitespace-nowrap pl-3">
            <span className="font-bold">
              {goalScorer.name} ({goalScorer.seasonGoals})
            </span>
            <span className="flex flex-row items-center">
              <TeamLogo
                size="sm"
                teamAbbreviation={teamAbbrev}
                teamName={teamAbbrev}
              />
              <AssistInfo
                primaryAssist={primaryAssist}
                secondaryAssist={secondaryAssist}
              />
            </span>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col">
            Score
            <div className="font-bold">
              {homeScore}-{awayScore}{" "}
              {leadingTeamAbbrev == null ? "Tied" : leadingTeamAbbrev}
            </div>
          </div>
          <div className="flex flex-col">
            Time
            <div className="font-bold">{timeInPeriod}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
