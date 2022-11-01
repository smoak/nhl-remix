import type { ComponentType, SVGAttributes } from "react";

interface NHLLogoProps extends SVGAttributes<SVGElement> {
  size?: string | number;
}
export type NHLLogo = ComponentType<NHLLogoProps>;
