import { red, slate } from "tailwindcss/colors";
import { PlayerAvatar } from "../PlayerAvatar";
import type { Game, ScoringPlay } from "../types";

type ScoringDetailProps = {
  readonly scoringPlay: ScoringPlay;
  readonly homeTeam: Game["homeTeam"];
  readonly awayTeam: Game["awayTeam"];
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
    return null;
  }

  if (!secondaryAssist) {
    return (
      <span className="block text-center text-xs">
        {primaryAssist.name} ({primaryAssist.seasonAssists})
      </span>
    );
  }

  return (
    <span className="block text-center text-xs">
      {primaryAssist.name} ({primaryAssist.seasonAssists}),{" "}
      {secondaryAssist.name} ({secondaryAssist.seasonAssists})
    </span>
  );
};

type ScoringStrengthProps = {
  readonly strength: ScoringPlay["strength"];
};
const ScoringStrength = ({
  strength,
}: ScoringStrengthProps): JSX.Element | null => {
  if (strength === "EVEN") {
    return null;
  }

  return (
    <div className="px-2 py-1 text-center font-bold">
      <span>{strength}</span>
    </div>
  );
};

export const ScoringDetail = ({
  awayTeam,
  homeTeam,
  scoringPlay,
}: ScoringDetailProps): JSX.Element => {
  const {
    goals,
    goalScorer,
    periodOrdinalNum,
    periodTime,
    primaryAssist,
    secondaryAssist,
    scoringTeamId,
    strength,
  } = scoringPlay;
  const isScoringTeamAwayTeam = scoringTeamId === awayTeam.id;
  const color = isScoringTeamAwayTeam ? red["700"] : slate["700"];

  return (
    <div className="flex pb-4">
      <PlayerAvatar
        playerName={goalScorer.name}
        playerId={goalScorer.id}
        mugshot={goalScorer.mugshot}
      />
      <div className="inline-block whitespace-nowrap pl-3 text-center">
        <span className="font-bold">
          {goalScorer.name} ({goalScorer.seasonGoals})
        </span>
        <AssistInfo
          primaryAssist={primaryAssist}
          secondaryAssist={secondaryAssist}
        />
        <div
          style={{ borderColor: color, color }}
          className="mt-1 flex max-w-min rounded-sm border text-xs"
        >
          <div className="inline-block border-r-2 px-2 py-1 text-center">
            <span>
              {periodTime} / {periodOrdinalNum}
            </span>
          </div>
          <div
            style={{ backgroundColor: color }}
            className="px-2 py-1 text-center text-white"
          >
            <span className={isScoringTeamAwayTeam ? "font-bold" : ""}>
              {awayTeam.abbreviation} {goals.away},{" "}
            </span>
            <span className={!isScoringTeamAwayTeam ? "font-bold" : ""}>
              {homeTeam.abbreviation} {goals.home}
            </span>
          </div>
          <ScoringStrength strength={strength} />
        </div>
      </div>
    </div>
  );
};
