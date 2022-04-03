import { AbstractGameState, LinescoreTeam } from "~/types";

export type TeamNameProps = {
  readonly name: string;
  readonly linescoreTeam: LinescoreTeam;
  readonly abstractGameState: AbstractGameState;
};

export const TeamName = ({
  abstractGameState,
  linescoreTeam,
  name,
}: TeamNameProps) => {
  if (linescoreTeam.powerPlay && abstractGameState === "Live") {
    return (
      <p className="mt-1 whitespace-nowrap text-sm font-semibold">
        {name} <span className="italic text-red-500">PP</span>
      </p>
    );
  }

  if (linescoreTeam.goaliePulled && abstractGameState === "Live") {
    return (
      <p className="mt-1 whitespace-nowrap text-sm font-semibold">
        {name} <span className="italic text-red-500">EN</span>
      </p>
    );
  }

  return <p className="mt-1 whitespace-nowrap text-sm font-semibold">{name}</p>;
};
