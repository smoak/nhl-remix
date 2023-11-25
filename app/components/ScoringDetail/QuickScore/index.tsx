type QuickScoreProps = {
  readonly homeScore: number;
  readonly awayScore: number;
  readonly leadingTeamAbbrev: string | undefined;
};

export const QuickScore = ({
  awayScore,
  homeScore,
  leadingTeamAbbrev,
}: QuickScoreProps) => {
  const teamLeaderText = leadingTeamAbbrev == null ? "Tied" : leadingTeamAbbrev;
  const scoreText =
    homeScore > awayScore
      ? `${homeScore}-${awayScore}`
      : `${awayScore}-${homeScore}`;

  return (
    <div className="font-bold">{[scoreText, teamLeaderText].join(" ")}</div>
  );
};
