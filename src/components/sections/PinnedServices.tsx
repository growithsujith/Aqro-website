"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { services } from "@/content/site";
import { ensureGSAP, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Glyph } from "@/components/Glyph";
import DecryptedText from "@/components/reactbits/DecryptedText/DecryptedText";
import SpotlightCard from "@/components/reactbits/SpotlightCard/SpotlightCard";
import { Mark } from "@/components/ui";

/**
 * Services story moment:
 * - Desktop (≥1024px): pinned split layout where scrolling steps through 01→04
 *   with a live progress rail, while hover/focus still works immediately.
 * - Mobile (<1024px): tactile stacked service cards with glyphs and direct links.
 */
export function PinnedServices() {
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const s = services[active] ?? services[0];

  useGSAP(
    () => {
      ensureGSAP();
      const root = rootRef.current;
      if (!root) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const st = ScrollTrigger.create({
          trigger: root,
          start: "top 16%",
          end: () => `+=${services.length * 260}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              services.length - 1,
              Math.floor(self.progress * services.length),
            );
            setActive(idx);
            if (railRef.current) {
              railRef.current.style.transform = `scaleY(${self.progress})`;
            }
          },
        });
        return () => st.kill();
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <>
      {/* Desktop pinned story switcher */}
      <div ref={rootRef} className="hidden lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-8">
        <div className="relative min-h-[440px] overflow-hidden rounded-2xl bg-blue text-white lg:col-span-7">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.22), transparent 55%), repeating-linear-gradient(-12deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 16px)",
            }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.03, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-10 flex items-center justify-center px-10 pb-16 pt-10"
            >
              <Glyph slug={s.slug} tone="silver" className="max-h-[320px] w-auto max-w-full" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-x-6 bottom-5 z-10 flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-white/85">{s.short}</p>
            <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
              {s.no} / 0{services.length}
            </span>
          </div>
          <Mark className="absolute right-6 top-6 z-10 size-5" />
        </div>

        <div className="relative flex items-stretch gap-5 lg:col-span-5">
          {/* Vertical scroll progress rail */}
          <div aria-hidden className="relative my-2 w-[3px] shrink-0 overflow-hidden rounded-full bg-graphite/12">
            <div
              ref={railRef}
              className="h-full w-full origin-top scale-y-0 bg-red transition-transform duration-100"
            />
          </div>

          <ol className="flex-1">
            {services.map((sv, i) => {
              const isCurrent = i === active;
              return (
                <li key={sv.slug} className="border-t border-graphite/15 last:border-b">
                  <Link
                    href={sv.href}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex items-center gap-5 py-6"
                  >
                    <DecryptedText
                      text={sv.no}
                      animateOn="inViewHover"
                      sequential
                      revealDirection="start"
                      speed={38}
                      maxIterations={8}
                      characters="AQRO0123456789/·—*"
                      scrambleColor="#ED1C24"
                      className={`font-display text-sm font-semibold transition-colors ${
                        isCurrent ? "text-red-ink" : "text-graphite/45"
                      }`}
                    />
                    <div className="flex-1">
                      <span
                        className={`block font-display text-2xl font-semibold tracking-tight transition-colors sm:text-3xl ${
                          isCurrent ? "text-blue" : "text-graphite"
                        }`}
                      >
                        {sv.name}
                      </span>
                      <span
                        className={`mt-1 block text-sm transition-all duration-300 ${
                          isCurrent ? "max-h-12 opacity-100 text-graphite/70" : "max-h-0 overflow-hidden opacity-0"
                        }`}
                      >
                        {sv.short}
                      </span>
                    </div>
                    <span
                      aria-hidden
                      className={`transition-transform duration-500 ${
                        isCurrent ? "translate-x-1 text-blue" : "text-graphite/40"
                      }`}
                    >
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Mobile & tablet stacked cards */}
      <ol className="grid gap-4 sm:grid-cols-2 lg:hidden">
        {services.map((sv) => (
          <li key={sv.slug} className="h-full">
            <SpotlightCard
              spotlightColor="rgba(0, 74, 173, 0.14)"
              intensity={1}
              borderGlow={0.85}
              spotlightSize={280}
              className="h-full"
              style={
                {
                  borderRadius: "1rem",
                  padding: 0,
                  "--spotlight-card-surface": "#ffffff",
                  "--spotlight-card-border": "rgba(41, 41, 41, 0.12)",
                } as CSSProperties
              }
            >
              <Link
                href={sv.href}
                className="group flex h-full flex-col justify-between p-6 transition-transform duration-300 active:scale-[0.99]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-semibold text-red-ink">{sv.no}</span>
                    <Mark className="size-3" />
                  </div>
                  <div className="my-5 flex h-40 items-center justify-center rounded-xl bg-ivory p-4">
                    <Glyph slug={sv.slug} className="max-h-32 w-auto" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight">{sv.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-graphite/70">{sv.short}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-blue">
                  Explore service <span aria-hidden>→</span>
                </span>
              </Link>
            </SpotlightCard>
          </li>
        ))}
      </ol>
    </>
  );
}
