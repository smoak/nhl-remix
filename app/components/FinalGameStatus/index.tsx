import { GameType } from "~/types";

type FinalGameStatusProps = {
  readonly gameType: GameType;
  readonly endedInPeriod: number;
};

export const FinalGameStatus = ({
  gameType,
  endedInPeriod,
}: FinalGameStatusProps) => {
  const endedInShootout = gameType === "R" && endedInPeriod === 5;
  const endedInOvertime = endedInPeriod > 3 && !endedInShootout;

  if (endedInShootout) {
    return <>Final/SO</>;
  }

  if (endedInOvertime) {
    const otPeriods = endedInPeriod - 3;
    return otPeriods > 1 ? <>Final/{otPeriods}OT</> : <>Final/OT</>;
  }

  return (
    <>
      <span className="mx-auto block">Final</span>

      <span className="mx-auto block pt-6"></span>
    </>
  );
};
