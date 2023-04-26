type PlayerAvatarProps = {
  readonly playerId: number;
  readonly playerName: string;
};

export const PlayerAvatar = ({
  playerId,
  playerName,
}: PlayerAvatarProps): JSX.Element => {
  const addFallback: React.ReactEventHandler<HTMLImageElement> = (e) => {
    e.currentTarget.src =
      "https://prod-gamecenter.nhlstatic.com/gamecenter-resources/skater-generic@2x.png";
  };

  return (
    <img
      className="inline-block h-14 w-14 rounded-full border"
      onError={addFallback}
      alt={playerName}
      src={`https://cms.nhl.bamgrid.com/images/headshots/current/60x60/${playerId}@2x.jpg`}
    />
  );
};
