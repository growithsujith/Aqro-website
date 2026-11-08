"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Page transition: a red film-gate wipe passes, then the page settles in. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-red"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ scaleX: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }, opacity: { delay: 0.6, duration: 0.3 } }}
      />
      <motion.div
        initial={{ y: 14 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
