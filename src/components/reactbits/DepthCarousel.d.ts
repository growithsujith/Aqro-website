import type { FC } from "react";
export type DepthItem = string | { image: string; alt?: string };
declare const DepthCarousel: FC<{
  items?: DepthItem[]; cardWidth?: number; cardHeight?: number; radius?: number; tint?: string; depth?: number;
  spread?: number; tilt?: number; tiltDirection?: "left" | "right"; perspective?: number; visibleCards?: number;
  falloff?: number; blur?: number; duration?: number; ease?: string; autoplay?: boolean; autoplayDelay?: number;
  loop?: boolean; showControls?: boolean; showIndicators?: boolean;
  onChange?: (index: number, item: { image: string; alt?: string }) => void;
  /** AQRO addition: called when the already-focused (front) card is clicked. */
  onActiveClick?: (index: number) => void;
  className?: string;
}>;
export default DepthCarousel;
