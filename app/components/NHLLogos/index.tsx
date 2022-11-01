import type { NHLLogo } from "./types";
import { NJD } from "./NJD";
import { VAN } from "./VAN";
import { DET } from "./DET";
import { NYI } from "./NYI";
import { EDM } from "./EDM";
import { ANA } from "./ANA";
import { LAK } from "./LAK";
import { CHI } from "./CHI";
import { COL } from "./COL";
import { CGY } from "./CGY";
import { FLA } from "./FLA";
import { MIN } from "./MIN";
import { CBJ } from "./CBJ";
import { DAL } from "./DAL";
import { ARI } from "./ARI";
import { NSH } from "./NSH";
import { MTL } from "./MTL";
import { BOS } from "./BOS";
import { BUF } from "./BUF";
import { NYR } from "./NYR";
import { PHI } from "./PHI";
import { PIT } from "./PIT";
import { OTT } from "./OTT";
import { TOR } from "./TOR";
import { CAR } from "./CAR";
import { WSH } from "./WSH";
import { TBL } from "./TBL";
import { STL } from "./STL";
import { SJS } from "./SJS";
import { WPG } from "./WPG";
import { VGK } from "./VGK";
import { SEA } from "./SEA";

export const TeamIdToLogo: Record<number, NHLLogo> = {
  1: NJD,
  2: NYI,
  3: NYR,
  4: PHI,
  5: PIT,
  6: BOS,
  7: BUF,
  8: MTL,
  9: OTT,
  10: TOR,
  12: CAR,
  13: FLA,
  14: TBL,
  15: WSH,
  16: CHI,
  17: DET,
  18: NSH,
  19: STL,
  20: CGY,
  21: COL,
  22: EDM,
  23: VAN,
  24: ANA,
  25: DAL,
  26: LAK,
  28: SJS,
  29: CBJ,
  30: MIN,
  52: WPG,
  53: ARI,
  54: VGK,
  55: SEA,
};
