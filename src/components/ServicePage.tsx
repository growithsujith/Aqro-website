"use client";

import { useRef } from "react";
import { serviceBySlug, type ServiceSlug } from "@/content/site";
import { ensureGSAP, gsap, useGSAP } from "@/lib/gsap";
import BlurText from "@/components/reactbits/BlurText/BlurText";
import DecryptedText from "@/components/reactbits/DecryptedText/DecryptedText";
import GlareHover from "@/components/reactbits/GlareHover/GlareHover";
import ShinyText from "@/components/reactbits/ShinyText/ShinyText";
import StarBorder from "@/components/reactbits/StarBorder/StarBorder";
import { GraphiteDotField, HeroWavesBackground } from "@/components/sections/AtmosphereLayer";
import { CTA, SectionHead } from "./blocks";
import { FAQ } from "./FAQ";
import { Glyph } from "./Glyph";
import { Reveal, SplitReveal } from "./motion";
import { Portfolio } from "./Portfolio";
import { NextService } from "./sections/NextService";
import { OfferGrid } from "./sections/OfferGrid";
import { ProcessTimeline } from "./sections/ProcessTimeline";
import { Button, Container, Eyebrow, H1, H2, Mark } from "./ui";

const THEME = {
  ivory: {
    bg: "bg-ivory",
    text: "text-graphite",
    sub: "text-graphite/75",
    accent: "text-blue",
    glyph: "text-blue",
    disc: "bg-white border border-graphite/10 shadow-[0_24px_60px_-28px_rgba(41,41,41,0.12)]",
    light: false,
    btn2: "outline" as const,
  },
  white: {
    bg: "bg-white",
    text: "text-graphite",
    sub: "text-graphite/75",
    accent: "text-blue",
    glyph: "text-blue",
    disc: "bg-ivory border border-graphite/10 shadow-[0_24px_60px_-28px_rgba(0,74,173,0.14)]",
    light: false,
    btn2: "outline" as const,
  },
  graphite: {
    bg: "bg-graphite",
    text: "text-white",
    sub: "text-white/75",
    accent: "text-red",
    glyph: "text-white",
    disc: "bg-white/[0.06] border border-white/15 backdrop-blur-md shadow-[0_28px_70px_-24px_rgba(0,0,0,0.5)]",
    light: true,
    btn2: "outline-light" as const,
  },
  blue: {
    bg: "bg-blue",
    text: "text-white",
    sub: "text-white/80",
    accent: "text-ivory/85 underline decoration-red decoration-2 underline-offset-8",
    glyph: "text-white",
    disc: "bg-white/[0.08] border border-white/20 backdrop-blur-md shadow-[0_28px_70px_-24px_rgba(0,20,60,0.5)]",
    light: true,
    btn2: "outline-light" as const,
  },
};

/** One template, themed per service, for all four service pages. */
export function ServicePage({ slug }: { slug: ServiceSlug }) {
  const s = serviceBySlug(slug);
  const t = THEME[s.hero.theme];
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGSAP();
      const hero = heroRef.current;
      if (!hero) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const disc = hero.querySelector("[data-svc-disc]");
      const glyph = hero.querySelector("[data-svc-glyph]");

      if (disc) {
        gsap.fromTo(
          disc,
          { scale: 0.9, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.95, ease: "power3.out" },
        );
      }

      if (glyph) {
        gsap.to(glyph, {
          y: -8,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: heroRef, dependencies: [slug] },
  );

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className={`relative ${t.bg} ${t.text} overflow-hidden`}>
        {s.hero.theme === "blue" && <HeroWavesBackground />}
        {s.hero.theme === "graphite" && <GraphiteDotField withSurface={false} />}

        <Container className="relative z-10 grid items-center gap-12 pb-20 pt-32 md:pt-40 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal fade={false}>
              <div className="flex flex-wrap items-center gap-3.5">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-sm ${
                    t.light
                      ? "border-white/20 bg-white/10 text-white"
                      : "border-graphite/15 bg-paper/90 text-graphite"
                  }`}
                >
                  <Mark className="size-2.5 shrink-0" color="#ED1C24" />
                  <DecryptedText
                    text={`CRAFT ${s.no} / 04 · ${s.workLabel.toUpperCase()}`}
                    animateOn="inViewHover"
                    sequential
                    revealDirection="start"
                    speed={36}
                    maxIterations={10}
                    characters="AQRO0123456789/·—*"
                    scrambleColor="#ED1C24"
                  />
                </span>
                <Eyebrow light={t.light}>
                  <ShinyText
                    text={`Service ${s.no} · ${s.name}`}
                    color={t.light ? "rgba(255, 255, 255, 0.85)" : "#292929"}
                    shineColor={t.light ? "#ffffff" : "#004aad"}
                    speed={2.8}
                    delay={1.4}
                    shineWidth={35}
                    softness={0.85}
                    trigger="loop"
                  />
                </Eyebrow>
              </div>
            </Reveal>
            <SplitReveal as="h1" fade={false} className={`mt-6 ${H1}`}>
              {s.hero.title} <span className={t.accent}>{s.hero.accent}</span>
            </SplitReveal>
            <div className="mt-6 max-w-xl">
              <BlurText
                as="p"
                text={s.hero.body}
                animateBy="words"
                direction="bottom"
                delay={45}
                stepDuration={0.32}
                blur={8}
                distance={18}
                trigger="view"
                className={`text-lg leading-relaxed ${t.sub}`}
              />
            </div>
            <Reveal delay={0.12}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <StarBorder
                  as="div"
                  radius={9999}
                  thickness={1.5}
                  color="#ED1C24"
                  trailColor={t.light ? "#FFFFFF" : "#004AAD"}
                  backgroundColor="transparent"
                  borderColor={t.light ? "rgba(255, 255, 255, 0.25)" : "rgba(41, 41, 41, 0.16)"}
                  glow={0.6}
                  hover="lap"
                  clickPulse
                  style={{ padding: "2px" }}
                >
                  <Button href="/contact" variant={s.hero.theme === "blue" ? "white" : "red"}>
                    {s.hero.cta}
                  </Button>
                </StarBorder>
                <Button href="#portfolio" variant={t.btn2} magnetic={false}>
                  See the work
                </Button>
              </div>
            </Reveal>
          </div>
          <div className="group lg:col-span-5">
            <div
              data-svc-disc
              className={`relative mx-auto aspect-square w-[min(80vw,420px)] overflow-hidden rounded-[2.5rem] ${t.disc}`}
            >
              <GlareHover
                width="100%"
                height="100%"
                borderRadius="2.5rem"
                borderColor="transparent"
                variant="sheen"
                glareColor={t.light ? "#f5f1e8" : "#004aad"}
                glareOpacity={t.light ? 0.26 : 0.14}
                blendMode={t.light ? "screen" : "multiply"}
                glareAngle={-35}
                glareSize={38}
                softness={0.7}
                transitionDuration={700}
                style={{ display: "grid", placeItems: "center", borderWidth: 0 }}
              >
                <div data-svc-glyph className="flex w-[88%] items-center justify-center">
                  <Glyph slug={slug} tone={t.light ? "silver" : "blue"} className="w-full" />
                </div>
              </GlareHover>
            </div>
          </div>
        </Container>
      </section>

      {/* What we offer */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="What we offer"
            title={
              <>
                Everything you need, <span className="text-blue">under one roof.</span>
              </>
            }
          />
          <OfferGrid items={s.offer} />
        </Container>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="scroll-mt-20 bg-ivory py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Portfolio"
            title={<>Selected {s.workLabel.toLowerCase() === "ai videos" ? "AI videos" : s.workLabel.toLowerCase()}.</>}
          />
          <Portfolio service={slug} />
        </Container>
      </section>

      {/* Process */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <SectionHead eyebrow="Process" title="How it comes together." />
          <ProcessTimeline steps={s.steps} />
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-paper pb-20 md:pb-28">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>FAQ</Eyebrow>
            <SplitReveal as="h2" className={`mt-5 ${H2}`}>
              Good questions.
            </SplitReveal>
          </div>
          <div className="lg:col-span-8">
            <FAQ items={s.faqs} />
          </div>
        </Container>
      </section>

      {/* Next service handoff */}
      <NextService currentSlug={slug} />

      <CTA cta={s.hero.cta} />
    </>
  );
}
