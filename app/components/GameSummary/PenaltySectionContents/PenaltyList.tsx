import { TeamLogo } from "~/components/TeamLogo";
import { Penalty } from "~/components/types";
import penaltyMessages from "./penaltyDescriptions.json";
import { useId } from "react";

type PenaltyMessages = Record<string, string>;

const penaltyDescriptionFromKey = (key: string) => {
  const map = penaltyMessages as PenaltyMessages;
  return map[key];
};

type PenaltyDescriptionProps = {
  readonly penalty: Penalty;
};
const PenaltyDescription = ({ penalty }: PenaltyDescriptionProps) => {
  const { descKey, type } = penalty;
  const penaltyDescription = penaltyDescriptionFromKey(descKey);

  if (type === "BEN") {
    return <span>{penaltyDescription}</span>;
  }

  return (
    <span>
      {[
        penalty.committedByPlayer.default,
        penaltyDescription,
        penalty.drawnBy?.default,
      ].join(" ")}
    </span>
  );
};

type PenaltyRowProps = {
  readonly penalty: Penalty;
};

const PenaltyRow = ({ penalty }: PenaltyRowProps) => {
  return (
    <div className="border-nhl-200 flex gap-2 rounded-lg border bg-white p-4 pb-4">
      <div className="flex items-center">{penalty.timeInPeriod}</div>
      <div>
        <TeamLogo
          teamName={penalty.teamName}
          logoUrl={penalty.teamLogoUrl}
          size="sm"
        />
      </div>
      <div className="flex items-center">
        <PenaltyDescription penalty={penalty} />
      </div>
    </div>
  );
};

type PenaltyListProps = {
  readonly penalties: Penalty[];
};
export const PenaltyList = ({ penalties }: PenaltyListProps) => {
  if (penalties.length === 0) {
    return <span>No penalties</span>;
  }

  return (
    <div className="flex flex-col gap-2">
      {penalties.map((p) => (
        <PenaltyRow
          key={[
            p.teamAbbrev.default,
            p.timeInPeriod,
            p.type,
            p.descKey,
            p.type === "BEN" ? p.servedBy.default : p.committedByPlayer.default,
          ].join("-")}
          penalty={p}
        />
      ))}
    </div>
  );
};
