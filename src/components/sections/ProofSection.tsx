"use client";

import { clients, stats } from "@/content/data";
import { ClientGrid } from "@/components/blocks";
import { Counter } from "@/components/motion/Counter";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Renders verified stats counters only when `stats` in `src/content/data.ts`
 * has entries. Never invents figures.
 */
export function StatBand() {
  if (!stats.length) return null;
  return (
    <div className="mb-16 grid gap-8 border-b border-graphite/15 pb-14 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((st, i) => (
        <Reveal key={st.label} delay={i * 0.08}>
          <p className="font-display text-5xl font-semibold tracking-tight text-blue sm:text-6xl">
            <Counter value={st.value} />
          </p>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-graphite/65">
            {st.label}
          </p>
        </Reveal>
      ))}
    </div>
  );
}

/**
 * Dual-row client logo marquee when ≥ 6 logos exist; otherwise falls back to
 * the clean `ClientGrid` placeholder cells.
 */
export function ClientProof() {
  if (clients.length < 6) {
    return (
      <Reveal>
        <ClientGrid />
      </Reveal>
    );
  }

  return (
    <div className="space-y-4">
      <Marquee duration={32} ariaLabel="Clients">
        <div className="flex items-center gap-4 pr-4">
          {clients.map((c) => (
            <div
              key={c.name}
              className="flex h-24 w-48 items-center justify-center rounded-2xl border border-graphite/10 bg-white px-6"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.logo}
                alt={c.name}
                className="max-h-10 max-w-[75%] object-contain opacity-75 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                style={{ transform: `scale(${c.scale ?? 1})` }}
              />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
}
