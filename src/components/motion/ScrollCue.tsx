"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

/** Subtle vertical scroll cue at the bottom of the hero; fades once user scrolls. */
export function ScrollCue({ light = true }: { light?: boolean }) {
  const [hidden, setHidden] = useState(false);

  useLenis(({ scroll }) => {
    setHidden(scroll > 40);
  });

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] transition-opacity duration-500 ${
        light ? "text-white/65" : "text-graphite/60"
      } ${hidden ? "opacity-0" : "opacity-100"}`}
    >
      <span className="relative h-8 w-px overflow-hidden bg-current/25">
        <span className="animate-scroll-line absolute inset-0 bg-red" />
      </span>
      Scroll
    </div>
  );
}
