"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts content into place once, when it scrolls into view. */
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
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : fade ? { opacity: 0, y } : { y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/** Etching reveal — a soft wipe from the bottom, like ink settling on paper. */
export function InkReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: "inset(100% 0 0 0)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.4, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const line: Variants = {
  hidden: { y: "105%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1, ease: EASE, delay: 0.08 * i },
  }),
};

/**
 * Staggered headline. Pass lines as an array; each line can contain JSX
 * (e.g. an italic serif word). Lines slide up out of a mask.
 */
export function SplitLines({
  lines,
  className,
  as: Tag = "h2",
  delay = 0,
  animateOnMount = false,
}: {
  lines: ReactNode[];
  className?: string;
  as?: ElementType;
  delay?: number;
  animateOnMount?: boolean;
}) {
  const reduce = useReducedMotion();
  const trigger = animateOnMount
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "-10% 0px" } };
  return (
    <Tag className={className}>
      <motion.span
        className="block"
        initial={reduce ? false : "hidden"}
        {...trigger}
      >
        {lines.map((l, i) => (
          <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <motion.span className="block" variants={line} custom={i + delay * 10}>
              {l}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
