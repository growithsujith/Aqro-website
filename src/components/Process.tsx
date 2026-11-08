"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Etching } from "./Etching";
import type { IllustrationName } from "@/lib/illustrations";

export type Step = { title: string; body: string; icon: IllustrationName };

export const DEFAULT_STEPS: Step[] = [
  { title: "Discover", body: "Understand the idea, the audience and the objective before anything is drawn.", icon: "proc-discover" },
  { title: "Strategise", body: "Set the creative or technical direction, and agree what success looks like.", icon: "proc-strategise" },
  { title: "Create", body: "Execute the concept with the right tools, the right people and close attention.", icon: "proc-create" },
  { title: "Deliver", body: "Refine, test and launch — then hand over everything you need to keep going.", icon: "proc-deliver" },
];

/** A four-stage timeline. The rule draws itself; stages land one after another. */
export function Process({ steps = DEFAULT_STEPS, tone = "ink" }: { steps?: Step[]; tone?: "ink" | "light" }) {
  const reduce = useReducedMotion();
  const light = tone === "light";
  return (
    <ol className="relative grid gap-12 md:grid-cols-4 md:gap-6">
      {/* the connecting rule (desktop) */}
      <motion.span
        aria-hidden
        className={`absolute left-0 right-0 top-[27px] hidden h-px origin-left md:block ${light ? "bg-white/30" : "bg-graphite/25"}`}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          className="relative"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.18 }}
        >
          <div className="flex items-center gap-4">
            <span
              className={`relative z-10 grid size-14 place-items-center rounded-full border font-mono text-sm ${
                light ? "border-white/40 bg-blue text-white" : "border-graphite/25 bg-ivory text-graphite"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
              {i === 0 && <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-red" aria-hidden />}
            </span>
            <span className={`h-px flex-1 md:hidden ${light ? "bg-white/25" : "bg-graphite/20"}`} aria-hidden />
          </div>
          <div className="mt-6 flex items-end justify-between gap-4">
            <h3 className="font-display text-3xl font-semibold tracking-tight">{s.title}</h3>
            <Etching name={s.icon} tone={light ? "white" : "ink"} className="h-14 w-auto opacity-90" sizes="100px" />
          </div>
          <p className={`mt-3 max-w-xs text-[15px] leading-relaxed ${light ? "text-white/70" : "text-graphite/65"}`}>{s.body}</p>
        </motion.li>
      ))}
    </ol>
  );
}
