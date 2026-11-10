import type { CSSProperties, ElementType, ReactNode } from "react";
declare function StarBorder(props: {
  as?: ElementType; children?: ReactNode; className?: string; style?: CSSProperties;
  color?: string; trailColor?: string; duration?: number; thickness?: number; radius?: number;
  trailLength?: number; stars?: number; glow?: number; sparkle?: boolean;
  direction?: "clockwise" | "counterclockwise"; hover?: "lap" | "brighten" | "reveal" | "none";
  clickPulse?: boolean; theme?: "dark" | "light"; backgroundColor?: string; textColor?: string; borderColor?: string;
  [key: string]: unknown;
}): ReactNode;
export default StarBorder;
