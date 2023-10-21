export type TeamNameProps = {
  readonly name: string;
  readonly isOnPowerPlay: boolean;
  readonly isGoaliePulled: boolean;
};

export const TeamName = ({
  isGoaliePulled,
  isOnPowerPlay,
  name,
}: TeamNameProps) => {
  if (isOnPowerPlay) {
    return (
      <p className="mt-1 whitespace-nowrap text-sm font-semibold">
        {name} <span className="italic text-red-800">PP</span>
      </p>
    );
  }

  if (isGoaliePulled) {
    return (
      <p className="mt-1 whitespace-nowrap text-sm font-semibold">
        {name} <span className="italic text-red-500">EN</span>
      </p>
    );
  }

  return <p className="mt-1 whitespace-nowrap text-sm font-semibold">{name}</p>;
};
