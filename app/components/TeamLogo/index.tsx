import type { Sizes } from "../sizes";

export type TeamLogoProps = {
  readonly teamAbbreviation: string;
  readonly teamName: string;
  readonly size?: Sizes;
};

type SizeMap = {
  [key in Sizes]: string;
};

export const TeamLogo = ({
  teamAbbreviation,
  teamName,
  size = "sm",
}: TeamLogoProps) => {
  const sizeVariants: SizeMap = {
    lg: "h-16 w-16",
    md: "h-12 w-12",
    sm: "h-8 w-8",
  };

  return (
    <img
      alt={`${teamName} logo`}
      role="presentation"
      src={`https://assets.nhle.com/logos/nhl/svg/${teamAbbreviation}_light.svg`}
      className={`${sizeVariants[size]}`}
    />
  );
};
