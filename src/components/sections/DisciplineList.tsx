"use client";

import Link from "next/link";
import { services } from "@/content/site";
import { Glyph } from "@/components/Glyph";
import { RevealGroup } from "@/components/motion/Reveal";

/** Interactive 4-discipline directory used on the About page. */
export function DisciplineList() {
  return (
    <RevealGroup as="ol" className="border-b border-graphite/15">
      {services.map((s) => (
        <li key={s.slug} data-reveal-item className="border-t border-graphite/15">
          <Link
            href={s.href}
            className="group grid items-center gap-6 py-7 transition-colors hover:bg-ivory/60 sm:px-4 lg:grid-cols-12"
          >
            <span className="font-display text-sm font-semibold text-red-ink lg:col-span-1">
              {s.no}
            </span>
            <h3 className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-blue sm:text-3xl lg:col-span-4">
              {s.name}
            </h3>
            <p className="text-[15px] text-graphite/70 lg:col-span-5">{s.short}</p>
            <div className="flex items-center justify-between gap-4 lg:col-span-2 lg:justify-end">
              <span className="grid size-14 place-items-center rounded-xl bg-ivory p-2 transition-transform duration-500 group-hover:scale-105">
                <Glyph slug={s.slug} className="w-11" />
              </span>
              <span
                aria-hidden
                className="font-display text-xl text-graphite/50 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-blue"
              >
                →
              </span>
            </div>
          </Link>
        </li>
      ))}
    </RevealGroup>
  );
}
