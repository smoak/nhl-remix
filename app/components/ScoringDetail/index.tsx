import { PlayerAvatar } from "../PlayerAvatar";
import type { ScoringPlay } from "../types";

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
  } = scoringPlay;

  return (
    <div className="flex flex-col pb-4">
      <div className="border-nhl-200 flex flex-col rounded-lg border bg-white p-4">
        <div className="flex items-center gap-2">
          <PlayerAvatar
            playerName={goalScorer.name}
            playerHeadshot={goalScorer.headshot}
          />
          <div className="flex flex-col whitespace-nowrap pl-3">
            <span className="font-bold">
              {goalScorer.name} ({goalScorer.seasonGoals})
            </span>
            <AssistInfo
              primaryAssist={primaryAssist}
              secondaryAssist={secondaryAssist}
            />
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
