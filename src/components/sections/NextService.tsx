"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { services, type ServiceSlug } from "@/content/site";
import { Glyph } from "@/components/Glyph";
import { Reveal } from "@/components/motion/Reveal";
import DecryptedText from "@/components/reactbits/DecryptedText/DecryptedText";
import SpotlightCard from "@/components/reactbits/SpotlightCard/SpotlightCard";
import { Container, Eyebrow } from "@/components/ui";

/**
 * Large editorial "Next Service" handoff banner shown above the closing CTA
 * on every service page so visitors keep exploring.
 */
export function NextService({ currentSlug }: { currentSlug: ServiceSlug }) {
  const idx = services.findIndex((s) => s.slug === currentSlug);
  const next = services[(idx + 1) % services.length];

  return (
    <section className="border-t border-graphite/12 bg-ivory py-16 md:py-20">
      <Container>
        <Reveal>
          <SpotlightCard
            spotlightColor="rgba(0, 74, 173, 0.16)"
            intensity={1}
            borderGlow={0.85}
            spotlightSize={360}
            className="transition-transform duration-300 hover:-translate-y-0.5"
            style={
              {
                borderRadius: "1.25rem",
                padding: 0,
                "--spotlight-card-surface": "#ffffff",
                "--spotlight-card-border": "rgba(41, 41, 41, 0.12)",
                "--spotlight-card-shadow":
                  "0 1px 2px rgba(41, 41, 41, 0.03), 0 18px 40px -22px rgba(0, 74, 173, 0.14)",
              } as CSSProperties
            }
          >
            <Link
              href={next.href}
              className="group grid items-center gap-8 p-8 sm:p-10 lg:grid-cols-12"
            >
              <div className="lg:col-span-8">
                <Eyebrow>
                  <DecryptedText
                    text={`Next discipline · ${next.no} / 04`}
                    animateOn="inViewHover"
                    sequential
                    revealDirection="start"
                    speed={36}
                    maxIterations={9}
                    characters="AQRO0123456789/·—*"
                    scrambleColor="#ED1C24"
                  />
                </Eyebrow>
                <p className="mt-4 flex flex-wrap items-baseline gap-4 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-none tracking-[-0.035em] transition-colors group-hover:text-blue">
                  <span>{next.name}</span>
                  <span
                    aria-hidden
                    className="text-red transition-transform duration-500 group-hover:translate-x-2"
                  >
                    →
                  </span>
                </p>
                <p className="mt-3 max-w-xl text-[15px] text-graphite/70">{next.short}</p>
              </div>
              <div className="flex justify-center lg:col-span-4 lg:justify-end">
                <div className="grid size-36 place-items-center rounded-2xl bg-ivory p-4 transition-transform duration-500 group-hover:scale-105">
                  <Glyph slug={next.slug} className="w-28" />
                </div>
              </div>
            </Link>
          </SpotlightCard>
        </Reveal>
      </Container>
    </section>
  );
}
