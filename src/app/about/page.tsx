import type { Metadata } from "next";
import { Etching } from "@/components/Etching";
import { InkReveal, Reveal, SplitLines } from "@/components/motion";
import { Container, Ornament, Slate } from "@/components/ui";
import { CapabilityIndex } from "@/components/about/CapabilityIndex";
import { Team } from "@/components/about/Team";
import { ClosingCTA } from "@/components/ClosingCTA";
import { stats } from "@/content/data";
import { services } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "AQRO is a creative and technology studio combining brand creatives, AI video production and digital product development under one roof.",
};

export default function AboutPage() {
  return (
    <>
      {/* 01 — Hero: a wide engraved plate */}
      <section className="grain relative overflow-hidden bg-ivory pt-32 md:pt-40">
        <Container>
          <div className="flex items-center justify-between">
            <Slate scene="A1">About AQRO</Slate>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-graphite/65 sm:block">Plate I</span>
          </div>
          <SplitLines
            as="h1"
            animateOnMount
            className="mt-10 max-w-[14ch] font-display text-[clamp(2.9rem,7.6vw,7.6rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
            lines={[
              "Building what's next",
              <span key="b">
                through <span className="font-serif font-normal italic text-blue">creativity</span>
              </span>,
              <span key="c">
                and technology<span className="text-red-ink">.</span>
              </span>,
            ]}
          />
          <div className="mt-10 grid gap-8 md:grid-cols-12">
            <Reveal className="md:col-span-5 md:col-start-8" delay={0.4} fade={false}>
              <p className="text-lg leading-relaxed text-graphite/80">
                AQRO is a studio where brand design, AI-driven filmmaking and software engineering sit at the same table.
                We take ideas from a sentence on a whiteboard to something people can watch, hold and use.
              </p>
            </Reveal>
          </div>
        </Container>

        {/* the plate */}
        <div className="relative mx-auto mt-16 max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="relative border-t border-graphite/20">
            <div className="flex items-end justify-center gap-[2vw] pt-10">
              <InkReveal delay={0.2} className="hidden w-[12%] md:block">
                <Etching name="pillar" className="w-full" sizes="15vw" />
              </InkReveal>
              <InkReveal delay={0.35} className="hidden w-[20%] sm:block">
                <Etching name="mandapam" className="w-full" sizes="22vw" />
              </InkReveal>
              <InkReveal delay={0.05} className="w-[70%] sm:w-[34%]">
                <Etching name="gopuram" alt="Engraving of a temple gopuram" className="w-full" sizes="(max-width:640px) 70vw, 34vw" priority />
              </InkReveal>
              <InkReveal delay={0.35} className="hidden w-[17%] sm:block">
                <Etching name="yali" className="w-full" sizes="18vw" />
              </InkReveal>
              <InkReveal delay={0.2} className="hidden w-[12%] md:block">
                <Etching name="pillar" className="w-full -scale-x-100" sizes="15vw" />
              </InkReveal>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-graphite/20 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/65">
              <span>Fig. 1 — Craft, carved in stone</span>
              <span className="hidden sm:inline">Engraved after the Madurai heritage plates</span>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Statistics strip */}
      <section aria-label="AQRO at a glance" className="border-y border-graphite/15 bg-paper">
        <Container>
          {stats.length >= 2 ? (
            <dl className="grid grid-cols-2 divide-graphite/15 md:grid-cols-4 md:divide-x">
              {stats.map((s) => (
                <div key={s.label} className="py-10 md:px-8 first:md:pl-0">
                  <dt className="order-2 mt-2 text-sm text-graphite/70">{s.label}</dt>
                  <dd className="font-display text-6xl font-semibold tracking-tight">{s.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <dl className="grid grid-cols-2 md:grid-cols-5 md:divide-x md:divide-graphite/15">
              <div className="col-span-2 flex items-end gap-4 py-10 md:col-span-1 md:pr-8">
                <dd className="font-display text-7xl font-semibold leading-none tracking-tight text-blue">04</dd>
                <dt className="pb-1 text-sm leading-snug text-graphite/70">
                  disciplines,
                  <br />
                  one studio
                </dt>
              </div>
              {services.map((s) => (
                <div key={s.slug} className="border-t border-graphite/15 py-6 md:border-t-0 md:px-6 md:py-10">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-ink">{s.no}</dt>
                  <dd className="mt-2 font-display text-xl font-semibold tracking-tight">{s.name}</dd>
                </div>
              ))}
            </dl>
          )}
        </Container>
      </section>

      {/* 03 — Philosophy */}
      <section className="relative overflow-hidden bg-ivory py-28 md:py-44">
        <Container className="relative">
          <Slate scene="A3">Our philosophy</Slate>
          <SplitLines
            className="mt-12 font-display text-[clamp(2.4rem,6.6vw,6.8rem)] font-semibold leading-[0.98] tracking-[-0.045em]"
            lines={[
              <span key="a">
                Technology changes <span className="font-serif font-normal italic text-blue">how</span>
              </span>,
              "we create.",
              <span key="c" className="text-graphite/50">
                Creativity defines <span className="font-serif font-normal italic text-red-ink">why</span>
              </span>,
              <span key="d" className="text-graphite/50">
                we create.
              </span>,
            ]}
          />
          <div className="mt-16 grid gap-12 md:grid-cols-12">
            <InkReveal className="md:col-span-4">
              <Etching name="medallion" className="h-48 w-auto md:h-56" sizes="240px" />
            </InkReveal>
            <Reveal className="space-y-5 text-lg leading-relaxed text-graphite/75 md:col-span-6 md:col-start-7">
              <p>
                Every few years the tools change. Cameras become software, software learns to draw, and what took a crew a
                month can be sketched in an afternoon. We welcome that — it gives ideas more room to move.
              </p>
              <p>
                But tools have never been the point. The point is a brand that people recognise, a story they remember, a
                product they return to. So we begin with why, choose the how deliberately, and keep people in charge of
                every decision that matters.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 04 — Our story */}
      <section className="grain bg-paper py-24 md:py-36">
        <Container className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Slate scene="A4">Our story</Slate>
            <h2 className="mt-8 font-display text-[clamp(2.2rem,4.4vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              One studio, <span className="font-serif font-normal italic">three crafts</span>, a single line of thought
              <span className="text-red-ink">.</span>
            </h2>
            <Reveal className="mt-8 space-y-5 text-[17px] leading-relaxed text-graphite/75">
              <p>
                Most brands meet their design agency, their production house and their developers separately — and spend
                months translating between them. AQRO was built to remove that distance.
              </p>
              <p>
                Our <strong className="font-semibold text-graphite">creative</strong> team shapes how a brand looks and
                speaks. Our <strong className="font-semibold text-graphite">AI video</strong> team turns those ideas into
                commercials and films, using generative tools under a director&apos;s eye. Our{" "}
                <strong className="font-semibold text-graphite">engineering</strong> team builds the apps and websites
                where the audience finally arrives.
              </p>
              <p>
                Because the same people plan all three, the idea that starts in a campaign carries through to the product
                — and nothing is lost in translation.
              </p>
            </Reveal>
            <Ornament className="mt-12 max-w-sm" />
          </div>
          <figure>
            <InkReveal>
              <Etching name="page-home" className="mx-auto w-full max-w-[560px]" sizes="(max-width:1024px) 90vw, 45vw" />
            </InkReveal>
            <figcaption className="mt-6 flex items-center justify-between border-t border-graphite/15 pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/65">
              <span>Fig. 2 — Heritage, projected forward</span>
              <span className="text-red-ink">●</span>
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* 05 — Capabilities */}
      <section className="bg-ivory py-24 md:py-36">
        <Container>
          <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Slate scene="A5">Our capabilities</Slate>
              <h2 className="mt-8 font-display text-[clamp(2.2rem,4.4vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
                The full <span className="font-serif font-normal italic">catalogue</span>
                <span className="text-red-ink">.</span>
              </h2>
            </div>
            <Reveal className="lg:col-span-5">
              <p className="text-[15px] leading-relaxed text-graphite/70">
                Four disciplines, each deep enough to stand on its own, designed to be combined.
              </p>
            </Reveal>
          </div>
          <CapabilityIndex />
        </Container>
      </section>

      {/* 06 — Team */}
      <section className="border-t border-graphite/15 bg-ivory py-24 md:py-36">
        <Container>
          <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Slate scene="A6">Our team</Slate>
              <h2 className="mt-8 font-display text-[clamp(2.2rem,4.4vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
                The people <span className="font-serif font-normal italic">behind the lens</span>
                <span className="text-red-ink">.</span>
              </h2>
            </div>
            <Reveal className="lg:col-span-5">
              <p className="text-[15px] leading-relaxed text-graphite/70">
                Designers, filmmakers and engineers who would rather show you than tell you.
              </p>
            </Reveal>
          </div>
          <Team />
        </Container>
      </section>

      <ClosingCTA
        scene="A7"
        lines={[
          "Let's create",
          <span key="b">
            something <span className="font-serif font-normal italic">extraordinary</span>
            <span className="text-red-ink">.</span>
          </span>,
        ]}
        body="Tell us what you're building. We'll tell you, honestly, how we'd bring it to life."
        cta="Work With AQRO"
        art="page-about"
      />
    </>
  );
}
