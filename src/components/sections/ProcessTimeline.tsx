"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import { ensureGSAP, gsap, useGSAP } from "@/lib/gsap";
import DecryptedText from "@/components/reactbits/DecryptedText/DecryptedText";
import SpotlightCard from "@/components/reactbits/SpotlightCard/SpotlightCard";

type PipelineStep = {
  readonly t: string;
  readonly items?: readonly string[];
  readonly d?: string;
};

/**
 * Scroll-driven process timeline:
 * - Draws a red progress line as the user scrolls through the section
 * - Highlights each step in sequence and reveals its items
 */
export function ProcessTimeline({
  steps,
  light = false,
}: {
  steps: readonly PipelineStep[];
  light?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGSAP();
      const root = rootRef.current;
      if (!root) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const fill = root.querySelector("[data-process-fill]");
      const cards = root.querySelectorAll("[data-process-card]");

      if (fill) {
        gsap.fromTo(
          fill,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 75%",
              end: "bottom 55%",
              scrub: 0.7,
            },
          },
        );
      }

      if (cards.length) {
        gsap.fromTo(
          cards,
          { y: 32, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: root,
              start: "top 88%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      }
    },
    { scope: rootRef },
  );

  const cols =
    steps.length === 3
      ? "md:grid-cols-3"
      : steps.length === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "md:grid-cols-3";

  return (
    <div ref={rootRef}>
      {/* Horizontal scrubbed progress track */}
      <div
        aria-hidden
        className={`relative mb-8 h-[2px] w-full overflow-hidden rounded-full ${
          light ? "bg-white/15" : "bg-graphite/15"
        }`}
      >
        <div
          data-process-fill
          className="h-full w-full origin-left scale-x-0 bg-red"
        />
      </div>

      <ol className={`grid gap-5 ${cols}`}>
        {steps.map((p, i) => (
          <li
            key={p.t}
            data-process-card
            className="h-full"
          >
            <SpotlightCard
              theme={light ? "dark" : "light"}
              spotlightColor={light ? "#004aad" : "rgba(0, 74, 173, 0.14)"}
              intensity={light ? 0.28 : 1}
              borderGlow={0.85}
              spotlightSize={300}
              className="h-full transition-transform duration-300 hover:-translate-y-0.5"
              style={
                {
                  borderRadius: "1rem",
                  padding: "1.75rem",
                  "--spotlight-card-surface": light ? "rgba(255, 255, 255, 0.05)" : "#ffffff",
                  "--spotlight-card-border": light ? "rgba(245, 241, 232, 0.12)" : "rgba(41, 41, 41, 0.12)",
                  "--spotlight-card-shadow": light
                    ? "0 18px 40px -24px rgba(0, 0, 0, 0.45)"
                    : "0 1px 2px rgba(41, 41, 41, 0.03), 0 14px 32px -18px rgba(41, 41, 41, 0.08)",
                } as CSSProperties
              }
            >
              <div className="flex items-center justify-between">
                <DecryptedText
                  text={String(i + 1).padStart(2, "0")}
                  animateOn="inViewHover"
                  sequential
                  revealDirection="start"
                  speed={40}
                  maxIterations={9}
                  characters="AQRO0123456789/·—*"
                  scrambleColor="#ED1C24"
                  className="font-display text-sm font-semibold tracking-[0.14em] text-red"
                  encryptedClassName="font-display text-sm font-semibold tracking-[0.14em] text-red"
                />
                <span
                  aria-hidden
                  className={`size-2 rounded-full ${light ? "bg-white/30" : "bg-blue/30"}`}
                />
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">{p.t}</h3>
              {p.d && (
                <p className={`mt-2 text-[15px] leading-relaxed ${light ? "text-white/75" : "text-graphite/70"}`}>
                  {p.d}
                </p>
              )}
              {p.items && (
                <ul className={`mt-5 space-y-2.5 text-[15px] ${light ? "text-white/75" : "text-graphite/75"}`}>
                  {p.items.map((it) => (
                    <li key={it} className="flex items-center gap-3">
                      <span
                        className={`size-1.5 rounded-full ${light ? "bg-red" : "bg-blue"}`}
                        aria-hidden
                      />
                      {it}
                    </li>
                  ))}
                </ul>
              )}
            </SpotlightCard>
          </li>
        ))}
      </ol>
    </div>
  );
}
