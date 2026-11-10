"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { services } from "@/content/site";
import { Glyph } from "./Glyph";
import { Mark } from "./ui";

/**
 * Services: a large panel on the left shows the glyph of whichever service
 * is hovered or focused in the numbered list on the right.
 */
export function ServiceSwitcher() {
  const [active, setActive] = useState(0);
  const s = services[active];
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-blue via-blue-deep to-navy text-white lg:col-span-7 lg:aspect-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center px-8 pb-14 pt-10"
          >
            <Glyph slug={s.slug} tone="silver" className="max-h-full w-auto max-w-full" />
          </motion.div>
        </AnimatePresence>
        <p className="absolute bottom-5 left-6 text-sm font-medium text-white/80">{s.short}</p>
        <Mark className="absolute right-6 top-6 size-5" />
      </div>
      <ol className="lg:col-span-5">
        {services.map((sv, i) => (
          <li key={sv.slug} className="border-t border-graphite/15 last:border-b">
            <Link
              href={sv.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group flex items-center gap-5 py-6"
            >
              <span className={`font-display text-sm font-semibold ${i === active ? "text-red-ink" : "text-graphite/50"}`}>{sv.no}</span>
              <span className={`flex-1 font-display text-2xl font-semibold tracking-tight transition-colors sm:text-3xl ${i === active ? "text-blue" : ""}`}>{sv.name}</span>
              <span aria-hidden className={`transition-transform duration-500 ${i === active ? "translate-x-1 text-blue" : "text-graphite/40"}`}>
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
