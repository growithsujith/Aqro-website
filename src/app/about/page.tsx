import type { Metadata } from "next";
import { CTA, SectionHead } from "@/components/blocks";
import { Composition } from "@/components/Composition";
import { Reveal, ScrubText, SplitReveal } from "@/components/motion";
import DecryptedText from "@/components/reactbits/DecryptedText/DecryptedText";
import ShinyText from "@/components/reactbits/ShinyText/ShinyText";
import StarBorder from "@/components/reactbits/StarBorder/StarBorder";
import { GraphiteDotField, HeroWavesBackground } from "@/components/sections/AtmosphereLayer";
import { InteractiveDisciplines } from "@/components/sections/InteractiveDisciplines";
import { PillarList } from "@/components/sections/PillarList";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { StatBand } from "@/components/sections/ProofSection";
import { VelocityRibbon } from "@/components/sections/StoryProgressHUD";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { Button, Container, Eyebrow, H1, H2, Mark } from "@/components/ui";
import { PILLARS, PIPELINE, stats } from "@/content/data";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
};

export default function AboutPage() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="relative overflow-hidden bg-blue text-white">
        <HeroWavesBackground />
        <Container className="relative z-10 grid items-center gap-12 pb-20 pt-32 md:pt-40 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal fade={false}>
              <div className="flex flex-wrap items-center gap-3.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                  <Mark className="size-2.5 shrink-0" color="#ED1C24" />
                  <DecryptedText
                    text="STUDIO DOSSIER · 04 CRAFTS"
                    animateOn="inViewHover"
                    sequential
                    revealDirection="start"
                    speed={35}
                    maxIterations={10}
                    characters="AQRO0123456789/·—*"
                    scrambleColor="#ED1C24"
                  />
                </span>
                <Eyebrow light>
                  <ShinyText
                    text="About aqro"
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
            <SplitReveal as="h1" fade={false} className={`mt-6 ${H1}`}>
              Creative, <span className="text-white/55">but engineered.</span>
            </SplitReveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
                {site.description}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
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
                    Start a Project
                  </Button>
                </StarBorder>
                <Button href="/work" variant="outline-light" magnetic={false}>
                  See our work
                </Button>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Composition variant="light-on-blue" className="mx-auto w-[min(78vw,440px)]" />
          </div>
        </Container>
      </section>

      <VelocityRibbon
        items={[
          "01 · BRAND CREATIVES",
          "02 · AI VIDEO PRODUCTION",
          "03 · APP DEVELOPMENT",
          "04 · WEB DEVELOPMENT",
          "ONE INTEGRATED STUDIO",
        ]}
      />

      {/* 2 — Manifesto */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <Reveal>
            <Eyebrow>What we do</Eyebrow>
          </Reveal>
          <ScrubText
            as="p"
            className="mt-6 max-w-5xl font-display text-[clamp(1.9rem,3.8vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-balance"
          >
            AQRO is a creative and technology partner —{" "}
            <span className="text-blue">one team from the first idea to the final launch.</span>
          </ScrubText>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-graphite/75">
              Brand creatives, AI-powered video, apps and websites run through one integrated pipeline, so your idea keeps its
              shape from concept to finish.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 3 — Why AQRO / Pillars */}
      <section className="bg-ivory py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <Reveal>
              <Eyebrow>How we think</Eyebrow>
            </Reveal>
            <SplitReveal as="h2" className={`mt-5 ${H2}`}>
              Powered by technology, imagined by people.
            </SplitReveal>
          </div>
          <div className="lg:col-span-7">
            <PillarList items={PILLARS} />
          </div>
        </Container>
      </section>

      {/* 4 — Four Disciplines (Interactive Liquid Showcase) */}
      <section id="disciplines" className="scroll-mt-20 bg-paper py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Built on purpose, driven by creativity"
            title="Four disciplines, one studio."
            aside={
              <p className="max-w-sm text-[15px] leading-relaxed text-graphite/75">
                Four disciplines that work alone or together. The best work happens where they overlap.
              </p>
            }
          />
          <InteractiveDisciplines variant="light" showHeader={false} />
        </Container>
      </section>

      {/* 5 — Pipeline with GraphiteDotField Atmosphere */}
      <section className="relative overflow-hidden bg-graphite py-20 text-white md:py-28">
        <GraphiteDotField withSurface={false} />
        <Container className="relative z-10">
          <SectionHead
            light
            eyebrow="How we work"
            title={
              <>
                Full-stack, <span className="text-white/55">from idea to launch.</span>
              </>
            }
          />
          <ProcessTimeline light steps={PIPELINE} />
        </Container>
      </section>

      {/* 6 — Team & Stats (rendered only when data.ts is populated) */}
      <TeamGrid />
      {stats.length > 0 && (
        <section className="bg-paper pt-16">
          <Container>
            <StatBand />
          </Container>
        </section>
      )}

      {/* 7 — Closing CTA */}
      <CTA title="Partner with us to bring your idea to life." />
    </>
  );
}
