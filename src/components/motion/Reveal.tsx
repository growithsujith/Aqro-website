"use client";

import { useRef, type ReactNode } from "react";
import { ensureGSAP, gsap, useGSAP } from "@/lib/gsap";

/** Fades and lifts content into place once, when it scrolls into view (GSAP ScrollTrigger). */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
  fade = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  /** false keeps above-the-fold copy visible from first paint (better LCP) */
  fade?: boolean;
  as?: "div" | "section" | "li" | "article" | "figure" | "span";
}) {
  const ref = useRef<HTMLElement>(null);
  const Comp = as as React.ElementType;

  useGSAP(
    () => {
      ensureGSAP();
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(el, { clearProps: "all" });
        return;
      }

      gsap.fromTo(
        el,
        fade ? { autoAlpha: 0, y } : { y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          delay,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [delay, y, fade] },
  );

  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}

/** Staggers direct children or `[data-reveal-item]` elements when the group scrolls into view. */
export function RevealGroup({
  children,
  stagger = 0.075,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  stagger?: number;
  y?: number;
  className?: string;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const ref = useRef<HTMLElement>(null);
  const Comp = as as React.ElementType;

  useGSAP(
    () => {
      ensureGSAP();
      const group = ref.current;
      if (!group) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tagged = group.querySelectorAll("[data-reveal-item]");
      const targets = tagged.length > 0 ? tagged : group.children;
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: group,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [stagger, y] },
  );

  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}
