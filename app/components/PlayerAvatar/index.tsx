type PlayerAvatarProps = {
  readonly playerHeadshot: string;
  readonly playerName: string;
};

export const PlayerAvatar = ({
  playerHeadshot,
  playerName,
}: PlayerAvatarProps): JSX.Element => {
  return (
    <img
      className="inline-block h-14 w-14 rounded-full border"
      alt={playerName}
      src={playerHeadshot}
      role="presentation"
    />
  );
};
