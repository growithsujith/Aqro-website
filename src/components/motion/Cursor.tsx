"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGSAP, gsap } from "@/lib/gsap";

/**
 * Custom desktop cursor follower. Expands into a contextual pill when hovering
 * any element with `data-cursor="View | Play | Drag"`.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    ensureGSAP();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;

    const xTo = gsap.quickTo(dot, "x", { duration: 0.28, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.28, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      const nextLabel = target?.getAttribute("data-cursor") ?? "";
      setLabel((prev) => (prev === nextLabel ? prev : nextLabel));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[95] hidden -translate-x-1/2 -translate-y-1/2 lg:block"
    >
      <div
        className={`flex items-center justify-center rounded-full transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] ${
          label
            ? "h-9 px-4 bg-red text-white shadow-lg scale-100"
            : "size-2.5 bg-red/85 scale-100 mix-blend-difference"
        }`}
      >
        {label && (
          <span className="font-display text-xs font-semibold uppercase tracking-[0.12em]">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
