import type { CSSProperties, FC, Key, ReactNode } from "react";
type Common = { title?: string; href?: string; hoverColor?: string; ariaLabel?: string };
export type LogoItem =
  | (Common & { node: ReactNode })
  | (Common & { src: string; alt?: string; srcSet?: string; sizes?: string; width?: number; height?: number });
export declare const LogoLoop: FC<{
  logos: LogoItem[]; speed?: number; direction?: "left" | "right" | "up" | "down"; width?: number | string;
  logoHeight?: number; gap?: number; hoverSpeed?: number; pauseOnHover?: boolean; fadeOut?: boolean;
  fadeOutWidth?: number; scaleOnHover?: boolean; layout?: "line" | "wave" | "arc" | "orbit"; bend?: number;
  focus?: number; magnify?: number; tiltX?: number; tiltY?: number; step?: boolean; muted?: number;
  labels?: "none" | "inline" | "below" | "hover"; draggable?: boolean; scrollBoost?: number; intro?: boolean;
  renderItem?: (item: LogoItem, key: Key) => ReactNode; ariaLabel?: string; className?: string; style?: CSSProperties;
}>;
export default LogoLoop;
