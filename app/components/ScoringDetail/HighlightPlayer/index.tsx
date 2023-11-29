import ReactPlayerLoader from "@brightcove/react-player-loader";
import React from "react";

type HighlightPlayerProps = {
  readonly videoId: number;
};

const onEmbedCreated = (e: Element) => {
  e.className = e.className + " w-full max-h-full h-full";

  return e;
};

const Player = ({ videoId }: HighlightPlayerProps) => {
  return (
    <ReactPlayerLoader
      playerId="default"
      accountId="6415718365001"
      videoId={videoId.toString()}
      options={{
        responsive: true,
        autoplay: false,
        muted: true,
      }}
      attrs={{ className: "h-full" }}
      onEmbedCreated={onEmbedCreated}
    />
  );
};

export const HighlightPlayer = React.memo(Player);
