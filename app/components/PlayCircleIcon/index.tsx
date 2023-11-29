import type { Sizes } from "../sizes";

type PlayCircleIconProps = {
  readonly size?: Sizes;
} & React.HTMLAttributes<SVGElement>;

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

export const PlayCircleIcon = ({
  size = "sm",
  ...rest
}: PlayCircleIconProps) => {
  const sizeVariants: SizeMap = {
    lg: "h-16 w-16",
    md: "h-12 w-12",
    sm: "h-8 w-8",
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`${sizeVariants[size]}`}
      width={widthVariants[size]}
      height={heightVariants[size]}
      {...rest}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
      />
    </svg>
  );
};
