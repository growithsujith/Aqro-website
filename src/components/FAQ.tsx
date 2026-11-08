"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <ul className="border-b border-graphite/15">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={it.q} className="border-t border-graphite/15">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="font-display text-lg font-semibold tracking-tight sm:text-xl">{it.q}</span>
                <span
                  aria-hidden
                  className={`relative grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                    isOpen ? "border-red bg-red text-white" : "border-graphite/25"
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
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-graphite/75">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
