import { useState } from "react";
import { PlayCircleIcon } from "../../PlayCircleIcon";
import { VideoPlayerDialog } from "~/components/VideoPlayerDialog";

type HighlightClipButtonProps = {
  readonly clipId?: number;
};

export const HighlightClipButton = ({ clipId }: HighlightClipButtonProps) => {
  const [isVideoPlayerOpen, setVideoPlayerOpen] = useState(false);

  if (clipId == null) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <button onClick={() => setVideoPlayerOpen(true)}>
            <PlayCircleIcon size="md" />
            <span className="md:hidden lg:block">Play highlight clip</span>
          </button>
        </div>
      </div>
      <VideoPlayerDialog
        clipId={clipId}
        isOpen={isVideoPlayerOpen}
        onClose={() => setVideoPlayerOpen(false)}
      />
    </>
  );
};
