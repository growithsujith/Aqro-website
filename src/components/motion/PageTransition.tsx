"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { ensureGSAP, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/** Page transition: a red film-gate wipe passes across the top while the page settles in. */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      ensureGSAP();
      const root = ref.current;
      if (!root) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const bar = root.querySelector("[data-wipe-bar]");
      const body = root.querySelector("[data-wipe-body]");

      const tl = gsap.timeline({
        onComplete: () => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        },
      });
      if (bar) {
        tl.fromTo(
          bar,
          { scaleX: 0, autoAlpha: 1, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.55, ease: "expo.out" },
        ).to(bar, { autoAlpha: 0, duration: 0.25 }, "-=0.15");
      }
      if (body) {
        tl.fromTo(
          body,
          { y: 14, autoAlpha: 0.96 },
          { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out", clearProps: "transform,opacity,visibility" },
          0,
        );
      }
    },
    { scope: ref, dependencies: [pathname] },
  );

  return (
    <div ref={ref} key={pathname}>
      <div
        data-wipe-bar
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left scale-x-0 bg-red"
      />
      <div data-wipe-body>{children}</div>
    </div>
  );
}
