"use client";

import { useRef, type ReactNode } from "react";
import { useLenis } from "lenis/react";
import { ensureGSAP, gsap, useGSAP } from "@/lib/gsap";

/**
 * Infinite horizontal marquee that speeds up with scroll velocity and pauses
 * on hover or focus. Static wrap for reduced-motion users.
 */
export function Marquee({
  children,
  duration = 28,
  reverse = false,
  className = "",
  ariaLabel,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      ensureGSAP();
      const track = trackRef.current;
      if (!track) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      tweenRef.current = gsap.fromTo(
        track,
        { xPercent: reverse ? -50 : 0 },
        {
          xPercent: reverse ? 0 : -50,
          duration,
          ease: "none",
          repeat: -1,
        },
      );
    },
    { scope: containerRef, dependencies: [duration, reverse] },
  );

  useLenis(({ velocity }) => {
    const t = tweenRef.current;
    if (!t) return;
    const boost = 1 + Math.min(Math.abs(velocity) * 0.12, 2.5);
    gsap.to(t, { timeScale: boost, duration: 0.35, overwrite: true });
  });

  const pause = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 0, duration: 0.4 });
  };
  const resume = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 1, duration: 0.4 });
  };

  return (
    <div
      ref={containerRef}
      aria-label={ariaLabel}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
      className={`overflow-hidden ${className}`}
    >
      <div ref={trackRef} className="flex w-max items-center">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
