"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { services } from "@/content/site";
import { Etching } from "../Etching";

const DETAIL: Record<string, string[]> = {
  creatives: ["Advertising creatives", "Brand identity", "Social media", "Campaign design", "Product visuals"],
  "ai-video-production": ["AI commercials", "Brand films", "Product video", "AI-assisted VFX", "Microdramas"],
  "app-development": ["UI/UX design", "Mobile & product apps", "Prototyping", "API & backend", "Testing & release"],
  "web-development": ["Business websites", "Landing pages", "Web applications", "UI implementation", "Performance"],
};

/**
 * An index of capabilities. On pointer devices, the engraving for the row
 * you are reading follows the cursor like a loupe over a catalogue page.
 */
export function CapabilityIndex() {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLUListElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26 });
  const sy = useSpring(y, { stiffness: 220, damping: 26 });

  return (
    <ul
      ref={ref}
      className="relative border-b border-graphite/15"
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => setActive(null)}
    >
      {services.map((s, i) => (
        <li key={s.slug} onPointerEnter={() => setActive(i)} className="border-t border-graphite/15">
          <Link
            href={s.href}
            className="group grid items-center gap-4 py-8 transition-colors md:grid-cols-[6rem_1fr_1.2fr_3rem] md:py-10"
          >
            <span className="font-mono text-sm text-red-ink">{s.no}</span>
            <span className="flex items-center gap-4">
              <Etching name={s.icon} className="h-12 w-auto md:hidden" sizes="64px" />
              <span className="font-display text-4xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                {s.name}
              </span>
            </span>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[15px] text-graphite/65">
              {DETAIL[s.slug].map((d, j) => (
                <li key={d} className="flex items-center gap-4">
                  {d}
                  {j < DETAIL[s.slug].length - 1 && <span className="size-1 rounded-full bg-graphite/25" aria-hidden />}
                </li>
              ))}
            </ul>
            <span aria-hidden className="hidden text-2xl transition-transform duration-500 group-hover:-rotate-45 group-hover:text-red-ink md:block">
              →
            </span>
          </Link>
        </li>
      ))}

      {!reduce && (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
          style={{ x: sx, y: sy }}
          aria-hidden
        >
          <AnimatePresence mode="wait">
            {active !== null && (
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grain -translate-x-1/2 -translate-y-[115%] rounded-sm border border-graphite/15 bg-paper p-4 shadow-[0_30px_60px_-30px_#29292988]"
              >
                <Etching name={services[active].art} className="h-44 w-auto" sizes="260px" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </ul>
  );
}
