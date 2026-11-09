"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import { ensureGSAP, gsap, useGSAP } from "@/lib/gsap";
import SpotlightCard from "@/components/reactbits/SpotlightCard/SpotlightCard";
import { Mark } from "@/components/ui";

/** Staggered pillar cards with rotating red corner marks and interactive ReactBits SpotlightCard surface. */
export function PillarList({
  items,
}: {
  items: readonly { readonly t: string; readonly d: string }[];
}) {
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      ensureGSAP();
      const list = listRef.current;
      if (!list) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const cards = list.querySelectorAll("[data-pillar-card]");
      const marks = list.querySelectorAll("[data-pillar-mark]");

      gsap.fromTo(
        cards,
        { x: 36, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: list,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );

      gsap.fromTo(
        marks,
        { rotate: -90, scale: 0.5 },
        {
          rotate: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: list,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
    },
    { scope: listRef },
  );

  return (
    <ul ref={listRef} className="grid gap-4">
      {items.map((p) => (
        <li key={p.t} data-pillar-card>
          <SpotlightCard
            spotlightColor="rgba(0, 74, 173, 0.14)"
            intensity={1}
            borderGlow={0.85}
            spotlightSize={320}
            className="flex gap-5 transition-transform duration-300 hover:-translate-y-0.5"
            style={
              {
                borderRadius: "1rem",
                padding: "1.5rem",
                "--spotlight-card-surface": "#ffffff",
                "--spotlight-card-border": "rgba(41, 41, 41, 0.1)",
                "--spotlight-card-shadow":
                  "0 1px 2px rgba(41, 41, 41, 0.03), 0 14px 32px -18px rgba(41, 41, 41, 0.1)",
              } as CSSProperties
            }
          >
            <span data-pillar-mark className="mt-1.5 inline-flex shrink-0">
              <Mark className="size-3" />
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold tracking-tight">{p.t}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-graphite/70">{p.d}</p>
            </div>
          </SpotlightCard>
        </li>
      ))}
    </ul>
  );
}
