import { ComponentType, SVGAttributes } from "react";
import { Team } from "~/types";
import * as NHLLogos from "react-nhl-logos";

const TeamIdToLogo: Record<Team['id'], Logo> = {
  1: NHLLogos.NJD,
  2: NHLLogos.NYI,
  3: NHLLogos.NYR,
  4: NHLLogos.PHI,
  5: NHLLogos.PIT,
  6: NHLLogos.BOS,
  7: NHLLogos.BUF,
  8: NHLLogos.MTL,
  9: NHLLogos.OTT,
  10: NHLLogos.TOR,
  12:NHLLogos.CAR,
  13:NHLLogos.FLA,
  14:NHLLogos.TBL,
  15:NHLLogos.WSH,
  16:NHLLogos.CHI,
  17:NHLLogos.DET,
  18:NHLLogos.NSH,
  19:NHLLogos.STL,
  20:NHLLogos.CGY,
  21:NHLLogos.COL,
  22:NHLLogos.EDM,
  23:NHLLogos.VAN,
  24:NHLLogos.ANA,
  25:NHLLogos.DAL,
  26:NHLLogos.LAK,
  28:NHLLogos.SJS,
  29:NHLLogos.CBJ,
  30:NHLLogos.MIN,
  52:NHLLogos.WPG,
  53:NHLLogos.ARI,
  54:NHLLogos.VGK,
  // 55:NHLLogos.SEA,
}

interface LogoProps extends SVGAttributes<SVGElement> {
  size?: string | number;
}
type Logo = ComponentType<LogoProps>;

export type TeamLogoProps = {
  readonly teamId: Team['id'];
  readonly size?: number;
}

export const TeamLogo = ({ size, teamId }: TeamLogoProps) => {
  const Icon = TeamIdToLogo[teamId];

  if (!Icon) {
    return (<div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-400 text-xl font-bold text-gray-900">
      {teamId}
    </div>);
  }

  return <Icon size={size} />;
};