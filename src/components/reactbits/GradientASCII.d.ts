import type { CSSProperties, ReactNode } from "react";

declare function GradientASCII(props: {
  colors?: string[];
  shape?: 'horizon' | 'pinch' | 'rise' | 'eclipse';
  characters?: string;
  cellSize?: number;
  density?: number;
  glyphOpacity?: number;
  glow?: number;
  depthOfField?: number;
  flicker?: number;
  softness?: number;
  scale?: number;
  flow?: number;
  speed?: number;
  gradientOpacity?: number;
  grain?: number;
  variation?: number;
  mouseInteraction?: boolean;
  scrambleRadius?: number;
  clickEffect?: 'wave' | 'burst' | 'none';
  intro?: boolean;
  lightMode?: boolean;
  fontFamily?: string;
  dpr?: number;
  className?: string;
  style?: CSSProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}): ReactNode;

export default GradientASCII;
