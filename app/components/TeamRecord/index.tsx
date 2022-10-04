import { GameType } from "~/api/types";

export type TeamRecordProps = {
  readonly wins: number;
  readonly losses: number;
  readonly otWins?: number;
  readonly gameType: GameType;
};

export const TeamRecord = ({
  gameType,
  wins,
  losses,
  otWins,
}: TeamRecordProps) => {
  if (gameType === "P") {
    return null;
  }

  if (!otWins) {
    return (
      <p className="text-xs">
        {wins}-{losses}
      </p>
    );
  }

  return (
    <p className="text-xs">
      {wins}-{losses}-{otWins}
    </p>
  );
};
