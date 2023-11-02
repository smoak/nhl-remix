export type TeamLogoProps = {
  readonly teamAbbreviation: string;
  readonly teamName: string;
};

export const TeamLogo = ({ teamAbbreviation, teamName }: TeamLogoProps) => {
  return (
    <img
      alt={`${teamName} logo`}
      role="presentation"
      src={`https://assets.nhle.com/logos/nhl/svg/${teamAbbreviation}_light.svg`}
      className="h-12 w-12"
    />
  );
};
