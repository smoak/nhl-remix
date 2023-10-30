export type TeamRecordProps = {
  readonly record?: string;
};

export const TeamRecord = ({ record }: TeamRecordProps) => {
  if (record == null) {
    return null;
  }

  return <p className="text-xs">{record}</p>;
};
