"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The hero composition: the logo taken apart — the ring of the "o", the stem
 * of the "q", the shoulder of the "r" and the red corner mark — arranged as a
 * poster. Pieces assemble on load and drift at different depths with the
 * cursor. `variant` changes the colours for light surfaces.
 */
export function Composition({ variant = "light-on-blue", className = "" }: { variant?: "light-on-blue" | "blue-on-light"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 16 });
  const sy = useSpring(my, { stiffness: 50, damping: 16 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  const ink = variant === "light-on-blue" ? "#FFFFFF" : "#004AAD";
  const faint = variant === "light-on-blue" ? "rgba(255,255,255,.28)" : "rgba(0,74,173,.25)";

  const layer = (depth: number, delay: number, from: { x?: number; y?: number; scale?: number; rotate?: number }, children: React.ReactNode) => (
    <Layer sx={sx} sy={sy} depth={depth} reduce={!!reduce}>
      <motion.svg
        viewBox="0 0 500 500"
        className="absolute inset-0 size-full overflow-visible"
        initial={reduce ? false : { opacity: 0, x: from.x ?? 0, y: from.y ?? 0, scale: from.scale ?? 1, rotate: from.rotate ?? 0 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
        transition={{ duration: 1.3, ease: EASE, delay }}
      >
        {children}
      </motion.svg>
    </Layer>
  );

  return (
    <div ref={ref} className={`relative aspect-square ${className}`} aria-hidden>
      {/* dotted grid */}
      {layer(4, 0.1, {}, (
        <g fill={faint}>
          {Array.from({ length: 6 }).flatMap((_, r) =>
            Array.from({ length: 6 }).map((__, c) => <circle key={`${r}-${c}`} cx={40 + c * 84} cy={40 + r * 84} r="2.2" />),
          )}
        </g>
      ))}
      {/* slow orbit with a red satellite */}
      <Layer sx={sx} sy={sy} depth={8} reduce={!!reduce}>
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.5 }}
        >
          <svg viewBox="0 0 500 500" className="animate-spin-slow absolute inset-0 size-full">
            <circle cx="215" cy="265" r="190" fill="none" stroke={faint} strokeWidth="1.5" strokeDasharray="2 10" strokeLinecap="round" />
            <circle cx="215" cy="75" r="7" fill="#ED1C24" />
          </svg>
        </motion.div>
      </Layer>
      {/* the ring of the "o" */}
      {layer(18, 0.2, { scale: 0.6 }, <circle cx="215" cy="265" r="112" fill="none" stroke={ink} strokeWidth="58" />)}
      {/* the stem of the "q" */}
      {layer(28, 0.4, { y: 120 }, <rect x="352" y="153" width="58" height="300" fill={ink} />)}
      {/* the shoulder of the "r" */}
      {layer(12, 0.55, { x: -60, rotate: -20 }, <path d="M70 120 A120 120 0 0 1 190 0" fill="none" stroke={faint} strokeWidth="26" strokeLinecap="butt" transform="translate(20 40)" />)}
      {/* the red corner mark */}
      {layer(40, 0.75, { x: 60, y: -60, rotate: 45 }, <path d="M300 55H410V158H356V112H300Z" fill="#ED1C24" />)}
    </div>
  );
}

function Layer({ sx, sy, depth, reduce, children }: { sx: MotionValue<number>; sy: MotionValue<number>; depth: number; reduce: boolean; children: React.ReactNode }) {
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * depth);
  return (
    <motion.div className="absolute inset-0" style={reduce ? undefined : { x, y }}>
      {children}
    </motion.div>
  );
}
