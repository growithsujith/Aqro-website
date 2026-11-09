"use client";

import { useRef, type ReactNode } from "react";
import { ensureGSAP, gsap, useGSAP } from "@/lib/gsap";

/** Clip-path curtain reveal with subtle inner scale for media and cards. */
export function ClipReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left";
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGSAP();
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const fromClip =
        direction === "up"
          ? "inset(100% 0% 0% 0%)"
          : direction === "down"
            ? "inset(0% 0% 100% 0%)"
            : "inset(0% 100% 0% 0%)";

      const inner = el.querySelector("img, video, svg") as HTMLElement | null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 84%",
          once: true,
        },
      });

      tl.fromTo(
        el,
        { clipPath: fromClip },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.05,
          delay,
          ease: "power4.out",
          clearProps: "clipPath",
        },
      );

      if (inner) {
        tl.fromTo(
          inner,
          { scale: 1.08 },
          { scale: 1, duration: 1.2, ease: "power3.out" },
          delay,
        );
      }
    },
    { scope: ref, dependencies: [direction, delay] },
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

/** Scroll parallax layer based on viewport speed multiplier. */
export function Parallax({
  children,
  speed = -0.12,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGSAP();
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        el,
        { y: () => -window.innerHeight * speed * 0.5 },
        {
          y: () => window.innerHeight * speed * 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [speed] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
