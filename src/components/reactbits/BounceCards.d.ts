import type { CSSProperties, ReactNode } from "react";

export interface BounceCardItem {
  src: string;
  alt?: string;
  [key: string]: any;
}

export interface BounceCardsProps {
  images?: (string | BounceCardItem)[];
  className?: string;
  style?: CSSProperties;
  containerWidth?: number;
  containerHeight?: number;
  cardSize?: number;
  spread?: number;
  rotation?: number;
  arc?: number;
  animationDelay?: number;
  animationStagger?: number;
  bounciness?: number;
  enableHover?: boolean;
  pushDistance?: number;
  onCardClick?: (index: number) => void;
  cardRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  shadow?: string;
  activeShadow?: string;
}

declare function BounceCards(props: BounceCardsProps): ReactNode;
export default BounceCards;
