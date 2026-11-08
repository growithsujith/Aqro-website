import { Hero } from "@/components/home/Hero";
import { ServiceBlocks } from "@/components/home/ServiceBlocks";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ClientGrid } from "@/components/ClientGrid";
import { Process } from "@/components/Process";
import { ClosingCTA } from "@/components/ClosingCTA";
import { Etching } from "@/components/Etching";
import { InkReveal, Reveal, SplitLines } from "@/components/motion";
import { Container, Slate, TextLink } from "@/components/ui";
import type { IllustrationName } from "@/lib/illustrations";

const PILLARS = [
  {
    t: "Creativity first",
    s: "The idea leads. The tools follow.",
    b: "Every project begins with a concept worth making — a point of view, a story, a reason for someone to care. Only then do we choose how to build it.",
  },
  {
    t: "Technology enabled",
    s: "New tools, used where they earn their place.",
    b: "We work with AI, modern frameworks and production pipelines because they let us go further and faster — never as a gimmick on top of the work.",
  },
  {
    t: "Human-led execution",
    s: "Machines accelerate. People decide.",
    b: "AI can generate a frame; it cannot judge one. Every visual, cut and line of code is directed and reviewed by people who care how it lands.",
  },
  {
    t: "Integrated capabilities",
    s: "Design, film and code under one roof.",
    b: "Brand, video, apps and web are planned together, so an idea keeps its shape from the first sketch to the final release — no hand-offs lost between vendors.",
  },
  {
    t: "Built around real outcomes",
    s: "Judged by what it does, not how busy it looks.",
    b: "We agree what success means at the start and design towards it: clearer brands, stronger campaigns, products people actually use.",
  },
];

const TRIAD: { name: IllustrationName; label: string; sub: string }[] = [
  { name: "pen-nib", label: "Creativity", sub: "Concept · craft · story" },
  { name: "ai-chip", label: "Artificial intelligence", sub: "Speed · scale · new forms" },
  { name: "braces", label: "Technology", sub: "Products · platforms · performance" },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* 02 — Introduction */}
      <section className="grain relative overflow-hidden bg-ivory py-24 md:py-36">
        <Container>
          <Slate scene="02">Introduction</Slate>
          <div className="mt-10 grid gap-12 lg:grid-cols-12">
            <SplitLines
              className="font-display text-[clamp(2.6rem,6.2vw,6.2rem)] font-semibold leading-[0.95] tracking-[-0.04em] lg:col-span-8"
              lines={[
                "Where creativity",
                <span key="m">
                  <span className="font-serif font-normal italic text-blue">meets</span> technology.
                </span>,
              ]}
            />
            <Reveal className="self-end lg:col-span-4" delay={0.15}>
              <p className="text-lg leading-relaxed text-graphite/80">
                AQRO is a creative and technology agency. We make the visuals that introduce a brand, the films that move
                it, and the apps and websites that let people use it — with one team holding the idea together from the
                first sketch to launch.
              </p>
              <div className="mt-6">
                <TextLink href="/about">The AQRO story</TextLink>
              </div>
            </Reveal>
          </div>

          {/* The three ingredients, drawn as an engraved equation */}
          <ol className="mt-20 grid items-center gap-10 border-t border-graphite/15 pt-14 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-6">
            {TRIAD.map((t, i) => (
              <Fragmentish key={t.label} plus={i < TRIAD.length - 1}>
                <InkReveal delay={i * 0.18} className="flex items-center gap-6 md:flex-col md:text-center">
                  <Etching name={t.name} className="h-24 w-auto md:h-32" sizes="160px" />
                  <div>
                    <p className="font-display text-xl font-semibold tracking-tight">{t.label}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/65">{t.sub}</p>
                  </div>
                </InkReveal>
              </Fragmentish>
            ))}
          </ol>
        </Container>
      </section>

      {/* 03 — Services */}
      <section id="services" className="bg-ivory pb-24 md:pb-36">
        <Container>
          <div className="flex flex-col justify-between gap-8 border-t border-graphite/15 pt-16 md:flex-row md:items-end">
            <div>
              <Slate scene="03">Services</Slate>
              <SplitLines
                className="mt-8 font-display text-[clamp(2.4rem,5.4vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
                lines={[
                  <span key="a">
                    What we bring <span className="font-serif font-normal italic">to life</span>
                    <span className="text-red-ink">.</span>
                  </span>,
                ]}
              />
            </div>
            <Reveal>
              <p className="max-w-sm text-[15px] leading-relaxed text-graphite/70">
                Four disciplines that work alone or together. Most of our best work happens where they overlap.
              </p>
            </Reveal>
          </div>
          <div className="mt-14">
            <ServiceBlocks />
          </div>
        </Container>
      </section>

      {/* 04 — Selected work */}
      <section className="border-t border-graphite/15 bg-paper py-24 md:py-36">
        <Container>
          <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <Slate scene="04">Selected work</Slate>
              <SplitLines
                className="mt-8 font-display text-[clamp(2.4rem,5.4vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
                lines={[
                  <span key="a">
                    Ideas brought <span className="font-serif font-normal italic">to life</span>
                    <span className="text-red-ink">.</span>
                  </span>,
                ]}
              />
            </div>
            <TextLink href="/work">View all work</TextLink>
          </div>
          <ProjectGallery limit={6} />
        </Container>
      </section>

      {/* 05 — Clients */}
      <section className="bg-ivory py-24 md:py-36">
        <Container>
          <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Slate scene="05">Clients</Slate>
              <SplitLines
                className="mt-8 font-display text-[clamp(2.2rem,4.8vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.04em]"
                lines={[
                  "Good work brings",
                  <span key="b">
                    <span className="font-serif font-normal italic">great brands</span> together.
                  </span>,
                ]}
              />
            </div>
            <Reveal className="lg:col-span-4">
              <p className="text-[15px] leading-relaxed text-graphite/70">
                A record of the companies and founders who have trusted us with their ideas.
              </p>
            </Reveal>
          </div>
        </Container>
        <div className="mx-auto max-w-[1440px] sm:px-8 lg:px-12">
          <ClientGrid />
        </div>
      </section>

      {/* 06 — How we work */}
      <section className="bg-blue py-24 text-white md:py-36">
        <Container>
          <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Slate scene="06" tone="light">
                How we work
              </Slate>
              <SplitLines
                className="mt-8 font-display text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
                lines={[
                  <span key="a">
                    Four scenes, <span className="font-serif font-normal italic">one story</span>
                    <span className="text-red-ink">.</span>
                  </span>,
                ]}
              />
            </div>
            <Reveal className="lg:col-span-5">
              <p className="text-[15px] leading-relaxed text-white/75">
                Whether it is a campaign, a film or a product, every project moves through the same four stages — so you
                always know where things stand and what comes next.
              </p>
            </Reveal>
          </div>
          <Process tone="light" />
        </Container>
      </section>

      {/* 07 — Why AQRO */}
      <section className="grain bg-ivory py-24 md:py-36">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Slate scene="07">Why AQRO</Slate>
              <h2 className="mt-8 font-display text-[clamp(2.4rem,4.4vw,4rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
                The way we <span className="font-serif font-normal italic">work</span> is the work
                <span className="text-red-ink">.</span>
              </h2>
              <InkReveal className="mt-12 hidden lg:block">
                <Etching name="lamp" className="h-64 w-auto" sizes="200px" />
                <p className="mt-4 max-w-[16rem] font-serif text-lg italic leading-snug text-graphite/70">
                  Before the projector, there was the lamp. Light has always been how stories were told.
                </p>
              </InkReveal>
            </div>
          </div>
          <ol className="lg:col-span-8">
            {PILLARS.map((p, i) => (
              <Reveal as="li" key={p.t} className="group grid gap-4 border-t border-graphite/15 py-10 sm:grid-cols-[5rem_1fr]">
                <span className="font-mono text-sm text-red-ink">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-3xl font-semibold tracking-tight transition-colors duration-500 group-hover:text-blue sm:text-4xl">
                    {p.t}
                  </h3>
                  <p className="mt-2 font-serif text-2xl italic text-graphite/70">{p.s}</p>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-graphite/70">{p.b}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <ClosingCTA />
    </>
  );
}

function Fragmentish({ children, plus }: { children: React.ReactNode; plus: boolean }) {
  return (
    <>
      <li className="list-none">{children}</li>
      {plus && (
        <li aria-hidden className="hidden list-none font-serif text-5xl text-red-ink md:block">
          +
        </li>
      )}
    </>
  );
}
