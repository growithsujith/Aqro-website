import type { CSSProperties, FC } from "react";
export type DriftItem = { image: string; title?: string; href?: string };
declare const DriftWall: FC<{
  items?: DriftItem[]; columns?: number; tileWidth?: number; tileHeight?: number; gap?: number; radius?: number;
  tilt?: number; turn?: number; roll?: number; perspective?: number; depth?: number; speed?: number;
  direction?: "up" | "down"; variance?: number; parallax?: number; pauseOnHover?: boolean; lift?: number;
  fade?: number; dim?: number; grayscale?: boolean; overlayColor?: string; className?: string; style?: CSSProperties;
}>;
export default DriftWall;
