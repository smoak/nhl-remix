export type TeamNameProps = {
  readonly name: string;
  readonly isOnPowerPlay: boolean;
  readonly isGoaliePulled: boolean;
  readonly isGameInProgress: boolean;
};

export const TeamName = ({
  isGameInProgress,
  isGoaliePulled,
  isOnPowerPlay,
  name,
}: TeamNameProps) => {
  if (isOnPowerPlay && isGameInProgress) {
    return (
      <p className="mt-1 whitespace-nowrap text-sm font-semibold">
        {name} <span className="italic text-red-800">PP</span>
      </p>
    );
  }

  if (isGoaliePulled && isGameInProgress) {
    return (
      <p className="mt-1 whitespace-nowrap text-sm font-semibold">
        {name} <span className="italic text-red-500">EN</span>
      </p>
    );
  }

  return <p className="mt-1 whitespace-nowrap text-sm font-semibold">{name}</p>;
};
