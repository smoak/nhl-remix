import { Dialog } from "@headlessui/react";
import { VideoPlayer } from "../VideoPlayer";

type VideoPlayerDialogProps = {
  readonly isOpen: boolean;
  readonly clipId: number;
  readonly onClose: (value: boolean) => void;
};

export const VideoPlayerDialog = ({
  clipId,
  isOpen,
  onClose,
}: VideoPlayerDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="h-[calc(100%-1rem)] max-h-full w-full max-w-2xl rounded bg-white">
          <VideoPlayer videoId={clipId} />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
