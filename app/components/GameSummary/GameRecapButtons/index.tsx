import { useState } from "react";
import { PlayCircleIcon } from "~/components/PlayCircleIcon";
import { VideoPlayerDialog } from "~/components/VideoPlayerDialog";
import { type Game, GameRecapInfo, isFinalGame } from "~/components/types";

type GameRecapButtonsProps = {
  readonly gameRecap?: GameRecapInfo;
};

type VideoPlayerState = {
  readonly isOpen: boolean;
  readonly clipId: number;
};

export const GameRecapButtons = ({ gameRecap }: GameRecapButtonsProps) => {
  const [videoPlayerState, setVideoPlayerState] = useState<VideoPlayerState>({
    isOpen: false,
    clipId: 0,
  });

  if (!gameRecap) {
    return null;
  }

  const { threeMinRecap, condensedGame } = gameRecap;

  const onCondensedGameClicked = () => {
    setVideoPlayerState({
      clipId: condensedGame,
      isOpen: true,
    });
  };
  const onThreeMinRecapClicked = () => {
    setVideoPlayerState({
      clipId: threeMinRecap,
      isOpen: true,
    });
  };

  return (
    <>
      <div className="flex gap-2 font-bold md:w-80 lg:w-96">
        <button
          onClick={onThreeMinRecapClicked}
          className="flex h-11 flex-1 flex-row items-center justify-center rounded-lg border border-nhl-gray-200 bg-white text-sm"
        >
          <PlayCircleIcon size="sm" />3 Min Recap
        </button>
        <button
          onClick={onCondensedGameClicked}
          className="flex h-11 flex-1 flex-row items-center justify-center rounded-lg border border-nhl-gray-200 bg-white text-sm"
        >
          <PlayCircleIcon size="sm" />
          <span className="whitespace-nowrap pr-2">Condensed Game</span>
        </button>
      </div>
      <VideoPlayerDialog
        clipId={videoPlayerState.clipId}
        isOpen={videoPlayerState.isOpen}
        onClose={() =>
          setVideoPlayerState((prev) => {
            return {
              clipId: prev.clipId,
              isOpen: false,
            };
          })
        }
      />
    </>
  );
};
