export type TeamLogoProps = {
  readonly teamAbbreviation: string;
  readonly teamName: string;
};

export const TeamLogo = ({ teamAbbreviation, teamName }: TeamLogoProps) => {
  return (
    <div className="h-12 w-12">
      <img
        alt={`${teamName} logo`}
        role="presentation"
        src={`https://assets.nhle.com/logos/nhl/svg/${teamAbbreviation}_light.svg`}
      />
    </div>
  );
};
