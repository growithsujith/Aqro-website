"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import { ensureGSAP, gsap, useGSAP } from "@/lib/gsap";
import SpotlightCard from "@/components/reactbits/SpotlightCard/SpotlightCard";
import { Mark } from "@/components/ui";

/** 3-column offer grid where hairline top borders draw left-to-right inside interactive SpotlightCards. */
export function OfferGrid({ items }: { items: { t: string; d: string }[] }) {
  const ref = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      ensureGSAP();
      const root = ref.current;
      if (!root) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const lines = root.querySelectorAll("[data-offer-line]");
      const cards = root.querySelectorAll("[data-offer-body]");

      gsap.fromTo(
        lines,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: root,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );

      gsap.fromTo(
        cards,
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.06,
          delay: 0.1,
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
    },
    { scope: ref },
  );

  return (
    <ul ref={ref} className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((o) => (
        <li key={o.t} className="relative h-full">
          <SpotlightCard
            spotlightColor="rgba(0, 74, 173, 0.14)"
            intensity={1}
            borderGlow={0.85}
            spotlightSize={280}
            className="h-full transition-transform duration-300 hover:-translate-y-0.5"
            style={
              {
                borderRadius: "1rem",
                padding: "1.5rem",
                "--spotlight-card-surface": "#ffffff",
                "--spotlight-card-border": "rgba(41, 41, 41, 0.08)",
                "--spotlight-card-shadow":
                  "0 1px 2px rgba(41, 41, 41, 0.03), 0 12px 28px -16px rgba(41, 41, 41, 0.08)",
              } as CSSProperties
            }
          >
            <span
              data-offer-line
              aria-hidden
              className="absolute inset-x-0 top-0 z-10 h-px origin-left bg-graphite/20"
            />
            <div data-offer-body className="flex gap-4">
              <Mark className="mt-1.5 size-3 shrink-0" />
              <div>
                <h3 className="font-display text-lg font-semibold tracking-tight">{o.t}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-graphite/70">{o.d}</p>
              </div>
            </div>
          </SpotlightCard>
        </li>
      ))}
    </ul>
  );
}
