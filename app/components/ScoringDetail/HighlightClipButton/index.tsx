import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { PlayCircleIcon } from "../../PlayCircleIcon";
import { HighlightPlayer } from "../HighlightPlayer";

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
      <div className="flex flex-col pl-3">
        <div className="flex flex-row items-center">
          <button onClick={() => setVideoPlayerOpen(true)}>
            <PlayCircleIcon size="md" />
            Play highlight clip
          </button>
        </div>
      </div>
      <Dialog
        open={isVideoPlayerOpen}
        onClose={() => setVideoPlayerOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="h-[calc(100%-1rem)] max-h-full w-full max-w-2xl rounded bg-white">
            <HighlightPlayer videoId={clipId} />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};
