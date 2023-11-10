import { isLiveGame, type Game, isFinalGame } from "../types";
import { FinalGameCardContents } from "./FinalGameCardContents";
import { LiveGameCardContents } from "./LiveGameCardContents";
import { ScheduledGameCardContents } from "./ScheduledGameCardContents";

type GameCardContentsProps = {
  readonly game: Game;
};

export const GameCardContents = ({ game }: GameCardContentsProps) => {
  if (isLiveGame(game)) {
    return <LiveGameCardContents game={game} />;
  }

  if (isFinalGame(game)) {
    return <FinalGameCardContents game={game} />;
  }

  return <ScheduledGameCardContents game={game} />;
};
