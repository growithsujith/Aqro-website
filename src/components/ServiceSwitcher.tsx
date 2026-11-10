"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { services } from "@/content/site";
import { Glyph } from "./Glyph";
import { Mark } from "./ui";
import Folder from "./reactbits/Folder";

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

/* ------------------------------------------------------------------ Folders */

const FOLDER_STYLE: Record<string, { color: string; label: string }> = {
  creatives: { color: "#ED1C24", label: "Creatives" },
  "ai-video-production": { color: "#292929", label: "AI Video" },
  "app-development": { color: "#004AAD", label: "Apps" },
  "web-development": { color: "#5B9BFF", label: "Web" },
};

/**
 * Services as four React Bits folders. Click a folder to open it and see what
 * the service covers; click a page to bring it up close. The link underneath
 * goes to the service page.
 */
export function ServiceFolders() {
  return (
    <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((sv) => {
        const f = FOLDER_STYLE[sv.slug];
        return (
          <li key={sv.slug} className="flex flex-col items-center text-center">
            <div className="grid h-[260px] w-full place-items-center">
              <Folder
                label={f.label}
                color={f.color}
                paperColor="#FFFFFF"
                items={sv.offer.slice(0, 6).map((o) => ({ title: o.t, description: o.d }))}
                mode="flap"
                variant="solid"
                layout="spread"
                tabPosition="right"
                size={1}
                theme="light"
                tilt={0.6}
              />
            </div>
            <Link href={sv.href} className="group mt-4 block max-w-[260px]">
              <span className="font-display text-sm font-semibold text-red-ink">{sv.no}</span>
              <span className="mt-1 flex items-center justify-center gap-2 font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-blue">
                {sv.name}
                <span aria-hidden className="text-graphite/40 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-blue">→</span>
              </span>
              <span className="mt-1 block text-[15px] leading-relaxed text-graphite/70">{sv.short}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
