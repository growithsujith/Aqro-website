import type { CSSProperties, ReactNode, MouseEvent } from 'react';

export interface TiltedCardLayerProps {
  depth?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export declare const TiltedCardLayer: React.FC<TiltedCardLayerProps>;

export interface TiltedCardProps {
  imageSrc?: string;
  altText?: string;
  captionText?: string;
  containerHeight?: number | string;
  containerWidth?: number | string;
  imageHeight?: number | string;
  imageWidth?: number | string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showTooltip?: boolean;
  overlayContent?: ReactNode;
  displayOverlayContent?: boolean;
  overlayDepth?: number;
  children?: ReactNode;
  backContent?: ReactNode;
  flipOnClick?: boolean;
  flipped?: boolean;
  onFlip?: (flipped: boolean) => void;
  onClick?: (event: MouseEvent) => void;
  radius?: number | string;
  perspective?: number | string;
  smoothness?: number;
  glare?: number;
  glareColor?: string;
  shadow?: number;
  parallax?: number;
  axis?: 'both' | 'horizontal' | 'vertical';
  reverse?: boolean;
  trackWindow?: boolean;
  floating?: boolean;
  gyroscope?: boolean;
  intro?: boolean;
  introDelay?: number;
  className?: string;
  style?: CSSProperties;
}

declare const TiltedCard: React.FC<TiltedCardProps>;
export default TiltedCard;
