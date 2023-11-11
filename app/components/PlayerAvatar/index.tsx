import type { TeamAbbreviation } from "../types";

type PlayerAvatarProps = {
  readonly teamAbbrev: TeamAbbreviation;
  readonly playerHeadshot: string;
  readonly playerName: string;
};

type TeamAbbreviationBackgroundMap = {
  [key in TeamAbbreviation]: string;
};

export const PlayerAvatar = ({
  playerHeadshot,
  playerName,
  teamAbbrev,
}: PlayerAvatarProps): JSX.Element => {
  const backgroundVariants: TeamAbbreviationBackgroundMap = {
    ANA: "bg-nhl-ana",
    ARI: "bg-nhl-ari",
    BOS: "bg-nhl-bos",
    BUF: "bg-nhl-buf",
    CAR: "bg-nhl-car",
    CBJ: "bg-nhl-cbj",
    CGY: "bg-nhl-cgy",
    CHI: "bg-nhl-chi",
    COL: "bg-nhl-col",
    DAL: "bg-nhl-dal",
    DET: "bg-nhl-det",
    EDM: "bg-nhl-edm",
    FLA: "bg-nhl-fla",
    LAK: "bg-nhl-lak",
    MIN: "bg-nhl-min",
    MTL: "bg-nhl-mtl",
    NJD: "bg-nhl-njd",
    NSH: "bg-nhl-nsh",
    NYI: "bg-nhl-nyi",
    NYR: "bg-nhl-nyr",
    OTT: "bg-nhl-ott",
    PHI: "bg-nhl-phi",
    PIT: "bg-nhl-pit",
    SEA: "bg-nhl-sea",
    SJS: "bg-nhl-sjs",
    STL: "bg-nhl-stl",
    TBL: "bg-nhl-tbl",
    TOR: "bg-nhl-tor",
    VAN: "bg-nhl-van",
    VGK: "bg-nhl-vgk",
    WPG: "bg-nhl-wpg",
    WSH: "bg-nhl-wsh",
  };

  return (
    <img
      className={`inline-block h-14 w-14 rounded-full border ${backgroundVariants[teamAbbrev]}`}
      alt={playerName}
      src={playerHeadshot}
    />
  );
};
