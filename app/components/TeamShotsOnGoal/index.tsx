type TeamShotsOnGoalProps = {
  readonly sog?: number;
};
export const TeamShotsOnGoal = ({ sog }: TeamShotsOnGoalProps) => {
  if (sog == null) {
    return null;
  }

  return (
    <p className="text-xs">
      <span className="font-bold">SOG: </span>
      {sog}
    </p>
  );
};
