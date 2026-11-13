import type { CSSProperties, ReactNode } from "react";

export interface BeamsProps {
  color?: string;
  beamWidth?: number;
  rotation?: number;
  speed?: number;
  waveLength?: number;
  depth?: number;
  sharpness?: number;
  twist?: number;
  fillLight?: number;
  brightness?: number;
  glow?: number;
  grain?: number;
  variation?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  intro?: boolean;
  fade?: number;
  opacity?: number;
  lightMode?: boolean;
  backgroundColor?: string;
  quality?: number;
  paused?: boolean;
  dpr?: number;
  className?: string;
  style?: CSSProperties;
}

declare function Beams(props: BeamsProps): ReactNode;
export default Beams;
