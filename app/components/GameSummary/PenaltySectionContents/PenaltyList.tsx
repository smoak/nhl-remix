import { TeamLogo } from "~/components/TeamLogo";
import { Penalty } from "~/components/types";
import penaltyMessages from "./penaltyDescriptions.json";
import { PenaltyPlayer } from "~/api/gamecenter/types";

type PenaltyMessages = Record<string, string>;

const penaltyDescriptionFromKey = (key: string) => {
  const map = penaltyMessages as PenaltyMessages;
  return map[key];
};

const penaltyPlayerName = ({ firstName, lastName }: PenaltyPlayer) =>
  [firstName.default, lastName.default].join(" ");

type DrawnPenaltyProps = {
  readonly commitedBy: PenaltyPlayer;
  readonly description: string;
  readonly drawnBy: PenaltyPlayer;
  readonly duration: number;
};
const DrawnPenalty = ({
  commitedBy,
  description,
  drawnBy,
  duration,
}: DrawnPenaltyProps) => {
  const committedByPlayer = penaltyPlayerName(commitedBy);
  const drawnByPlayer = penaltyPlayerName(drawnBy);

  return (
    <span>
      {committedByPlayer} #{commitedBy.sweaterNumber} {duration} minutes for{" "}
      {description} {drawnByPlayer} #{drawnBy.sweaterNumber}
    </span>
  );
};

type PenaltyDescriptionProps = {
  readonly penalty: Penalty;
};

const PenaltyDescription = ({ penalty }: PenaltyDescriptionProps) => {
  const { descKey, type, duration } = penalty;
  const penaltyDescription = penaltyDescriptionFromKey(descKey);

  if (type === "BEN") {
    return (
      <span>
        {duration} minutes for {penaltyDescription}
      </span>
    );
  }

  if (penalty.drawnBy != null) {
    return (
      <DrawnPenalty
        commitedBy={penalty.committedByPlayer}
        duration={duration}
        description={penaltyDescription}
        drawnBy={penalty.drawnBy}
      />
    );
  }

  return (
    <span>
      {penaltyPlayerName(penalty.committedByPlayer)} #
      {penalty.committedByPlayer.sweaterNumber} {duration} minutes for{" "}
      {penaltyDescription}
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
      <div className="flex items-center">
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
            p.type === "BEN"
              ? p.servedBy.sweaterNumber
              : p.committedByPlayer.sweaterNumber,
          ].join("-")}
          penalty={p}
        />
      ))}
    </div>
  );
};
