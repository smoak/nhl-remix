import type { Sizes } from "../sizes";

export type TeamLogoProps = {
  readonly logoUrl: string;
  readonly teamName: string;
  readonly size?: Sizes;
};

type SizeMap = {
  [key in Sizes]: string;
};

const widthVariants: SizeMap = {
  lg: "64px",
  md: "48px",
  sm: "32px",
};
const heightVariants: SizeMap = {
  lg: "64px",
  md: "48px",
  sm: "32px",
};

export const TeamLogo = ({ logoUrl, teamName, size = "sm" }: TeamLogoProps) => {
  const sizeVariants: SizeMap = {
    lg: "h-16 w-16",
    md: "h-12 w-12",
    sm: "h-8 w-8",
  };

  return (
    <img
      alt={`${teamName} logo`}
      src={logoUrl}
      className={`${sizeVariants[size]}`}
      width={widthVariants[size]}
      height={heightVariants[size]}
    />
  );
};
