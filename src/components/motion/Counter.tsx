"use client";

import { useRef } from "react";
import { ensureGSAP, gsap, useGSAP } from "@/lib/gsap";

/** Parses a stat string like "120+" or "99%" and counts up when scrolled into view. */
export function Counter({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);

  useGSAP(
    () => {
      ensureGSAP();
      const el = ref.current;
      if (!el || !match) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const prefix = match[1] ?? "";
      const target = parseFloat(match[2]);
      const suffix = match[3] ?? "";
      const decimals = (match[2].split(".")[1] ?? "").length;
      const obj = { n: 0 };

      gsap.to(obj, {
        n: target,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 86%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${prefix}${obj.n.toFixed(decimals)}${suffix}`;
        },
      });
    },
    { scope: ref, dependencies: [value] },
  );

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
