"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useRef } from "react";
import { clients } from "@/content/data";
import { services } from "@/content/site";
import { ensureGSAP, gsap, useGSAP } from "@/lib/gsap";
import DecryptedText from "@/components/reactbits/DecryptedText/DecryptedText";
import ShinyText from "@/components/reactbits/ShinyText/ShinyText";
import StarBorder from "@/components/reactbits/StarBorder/StarBorder";
import { Glyph } from "./Glyph";
import { Reveal, SplitReveal } from "./motion";
import { Button, Container, Eyebrow, H2, Mark } from "./ui";

/** Section heading: eyebrow, split-reveal title, optional right-hand slot. */
export function SectionHead({
  eyebrow,
  title,
  aside,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  aside?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div>
        <Reveal>
          <Eyebrow light={light}>{eyebrow}</Eyebrow>
        </Reveal>
        <SplitReveal as="h2" className={`mt-5 max-w-3xl ${H2}`}>
          {title}
        </SplitReveal>
      </div>
      {aside && <Reveal delay={0.1}>{aside}</Reveal>}
    </div>
  );
}

/** Four service cards, each with its own glyph. */
export function ServiceCards() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s, i) => (
        <Reveal as="li" key={s.slug} delay={i * 0.08}>
          <Link
            href={s.href}
            className="group relative flex h-full flex-col rounded-2xl border border-graphite/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-blue hover:shadow-[0_24px_50px_-30px_#004aad80]"
          >
            <span className="text-sm font-medium text-graphite/60">{s.no}</span>
            <div className="my-6">
              <Glyph slug={s.slug} className="mx-auto w-44" />
            </div>
            <h3 className="font-display text-xl font-semibold tracking-tight">{s.name}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-graphite/70">{s.short}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue">
              Explore
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </span>
            <Mark className="absolute right-5 top-5 size-3 scale-0 transition-transform duration-500 group-hover:scale-100" />
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

/** Four numbered steps in a row. */
export function Steps({ steps, light = false }: { steps: { t: string; d: string }[]; light?: boolean }) {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <Reveal as="li" key={s.t} delay={i * 0.1} className={`border-t pt-6 ${light ? "border-white/25" : "border-graphite/15"}`}>
          <span className={`font-display text-sm font-semibold ${light ? "text-white/70" : "text-blue"}`}>{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{s.t}</h3>
          <p className={`mt-2 text-[15px] leading-relaxed ${light ? "text-white/75" : "text-graphite/70"}`}>{s.d}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/** Client logo grid with hairline dividers. Shows intentional architectural partner slots until logos are added. */
export function ClientGrid() {
  const cells = clients.length ? clients : Array.from({ length: 7 }, () => null);
  return (
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-graphite/10 bg-graphite/10 sm:grid-cols-4 lg:grid-cols-7">
      {cells.map((c, i) => (
        <li
          key={c?.name ?? i}
          className={`group flex h-28 flex-col items-center justify-center gap-1.5 bg-white px-6 transition-colors hover:bg-ivory/60 ${
            !c && i > 5 ? "hidden lg:flex" : ""
          }`}
        >
          {c ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={c.logo}
              alt={c.name}
              className="max-h-10 max-w-[75%] object-contain opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
              style={{ transform: `scale(${c.scale ?? 1})` }}
            />
          ) : (
            <>
              <Mark className="size-2.5 opacity-35 transition-opacity group-hover:opacity-90" />
              <DecryptedText
                text={`PARTNER 0${i + 1}`}
                animateOn="inViewHover"
                sequential
                revealDirection="start"
                speed={38}
                maxIterations={8}
                characters="AQRO0123456789/·—*"
                scrambleColor="#ED1C24"
                className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-graphite/45 transition-colors group-hover:text-graphite/80"
              />
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

/** Closing call-to-action on AQRO blue with scroll-scrubbed ring and split headline. */
export function CTA({
  title = "Have an idea? Let's make it happen.",
  body = "From a creative concept to a complete digital product — let's build something worth remembering.",
  cta = "Start a Project",
}: {
  title?: string;
  body?: string;
  cta?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGSAP();
      const root = ref.current;
      if (!root) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const ring = root.querySelector("[data-cta-ring]");
      const mark = root.querySelector("[data-cta-mark]");

      if (ring) {
        gsap.to(ring, {
          y: -48,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
      if (mark) {
        gsap.fromTo(
          mark,
          { y: 28, rotate: -12 },
          {
            y: -16,
            rotate: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      }
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative overflow-hidden bg-blue text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 30%, rgba(237,28,36,0.22), transparent 52%), repeating-linear-gradient(-8deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 16px)",
        }}
      />
      <svg
        data-cta-ring
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -right-24 -top-24 w-[420px] opacity-[0.12] sm:w-[560px]"
        aria-hidden
      >
        <circle cx="200" cy="200" r="150" fill="none" stroke="#fff" strokeWidth="60" />
      </svg>
      <div data-cta-mark className="pointer-events-none absolute bottom-10 right-10 hidden sm:block">
        <Mark className="size-16" />
      </div>
      <Container className="relative z-10 py-24 md:py-32">
        <Reveal>
          <div className="mb-5 flex flex-wrap items-center gap-3.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
              <Mark className="size-2.5 shrink-0" color="#ED1C24" />
              <DecryptedText
                text="ACT V · READY WHEN YOU ARE"
                animateOn="inViewHover"
                sequential
                revealDirection="start"
                speed={36}
                maxIterations={9}
                characters="AQRO0123456789/·—*"
                scrambleColor="#ED1C24"
              />
            </span>
            <Eyebrow light>
              <ShinyText
                text="Start the conversation"
                color="rgba(255, 255, 255, 0.85)"
                shineColor="#ffffff"
                speed={2.8}
                delay={1.4}
                shineWidth={35}
                softness={0.85}
                glow={0.25}
                trigger="loop"
              />
            </Eyebrow>
          </div>
        </Reveal>
        <SplitReveal
          as="h2"
          className="max-w-3xl font-display text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[1] tracking-[-0.04em] text-balance"
        >
          {title}
        </SplitReveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-lg text-white/80">{body}</p>
          <div className="mt-10">
            <StarBorder
              as="div"
              radius={9999}
              thickness={1.5}
              color="#ED1C24"
              trailColor="#FFFFFF"
              backgroundColor="transparent"
              borderColor="rgba(255, 255, 255, 0.25)"
              glow={0.65}
              hover="lap"
              clickPulse
              style={{ padding: "2px" }}
            >
              <Button href="/contact" variant="white">
                {cta}
              </Button>
            </StarBorder>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
