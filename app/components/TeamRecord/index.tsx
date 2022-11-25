import type { GameType } from "~/api/types";
import type { Record } from "../types";

export type TeamRecordProps = {
  readonly gameType: GameType;
  readonly record: Record;
};

export const TeamRecord = ({ gameType, record }: TeamRecordProps) => {
  if (gameType === "P") {
    return null;
  }

  if (!record.ot) {
    return (
      <p className="text-xs">
        {record.wins}-{record.losses}
      </p>
    );
  }

  return (
    <p className="text-xs">
      {record.wins}-{record.losses}-{record.ot}
    </p>
  );
};
