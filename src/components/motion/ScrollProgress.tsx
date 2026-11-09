"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";

/** 2px red scroll progress bar pinned to the top edge of the viewport. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useLenis(({ progress }) => {
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    }
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[65] h-[2px] bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-red transition-transform duration-75"
      />
    </div>
  );
}
