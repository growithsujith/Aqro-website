"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";

export type QA = { q: string; a: string };

export function FAQ({ items, tone = "ink" }: { items: QA[]; tone?: "ink" | "light" }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  const light = tone === "light";
  return (
    <ul className={`border-b ${light ? "border-white/15" : "border-graphite/15"}`}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={it.q} className={`border-t ${light ? "border-white/15" : "border-graphite/15"}`}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{it.q}</span>
                <span
                  aria-hidden
                  className={`relative grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                    isOpen ? "border-red bg-red text-white" : light ? "border-white/30" : "border-graphite/25"
                  }`}
                >
                  <span className="absolute h-px w-3 bg-current" />
                  <span className={`absolute h-3 w-px bg-current transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className={`max-w-2xl pb-7 text-[15px] leading-relaxed ${light ? "text-white/70" : "text-graphite/70"}`}>{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
