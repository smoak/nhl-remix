export type TeamRecordProps = {
  readonly wins: number;
  readonly losses: number;
  readonly otWins: number;
};

export const TeamRecord = ({ wins, losses, otWins }: TeamRecordProps) => (
  <p className="text-xs">
    {wins}-{losses}-{otWins}
  </p>
);
