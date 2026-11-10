"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

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

