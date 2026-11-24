import { CTA, SectionHead } from "@/components/blocks";
import {
  ClientLoop,
  HeroHeadline,
  ParallaxImage,
  ServiceTiltedCards,
  SilkBackdrop,
  StarButton,
  ImpactHoloMosaicBackdrop,
  WavesBackdrop,
} from "@/components/fx";
import { FAQ } from "@/components/FAQ";
import { Reveal } from "@/components/motion";
import { Button, Container, Eyebrow, H1, H2, Mark, TextLink } from "@/components/ui";
import { Testimonial } from "@/components/ui/design-testimonial";
import { stats } from "@/content/data";
import { site } from "@/content/site";
import { embedUrl } from "@/lib/media";

const TAGS = [
  "Brand Creatives",
  "Ad Campaigns",
  "AI Commercials",
  "AI Films",
  "Mobile Apps",
  "Websites & Web Apps",
];

const PILLARS = [
  {
    t: "Creative-first, tech-enabled",
    d: "The idea leads. We pick the tools — AI included — that make it better.",
  },
  {
    t: "One team, end to end",
    d: "Design, film and code planned together, so nothing gets lost between vendors.",
  },
  {
    t: "Built around outcomes",
    d: "We agree what success looks like upfront and design towards it.",
  },
];

const FAQS = [
  {
    q: "What kinds of projects do you take on?",
    a: "Brand creatives and campaigns, AI-produced commercials and films, mobile and product apps, and websites or web apps — on their own or combined.",
  },
  {
    q: "Can you work with our existing brand guidelines?",
    a: "Yes. We extend existing identities all the time and keep everything consistent with your style.",
  },
  {
    q: "How long does a typical project take?",
    a: "It depends on scope. After a short discovery call we share a timeline with clear milestones before any work starts.",
  },
  {
    q: "How do you use AI in your work?",
    a: "As a production tool, not a replacement for judgement. People direct, review and approve everything we deliver.",
  },
  {
    q: "Do you work with agencies?",
    a: "Yes. We can work as your production or development partner, under your brand or ours.",
  },
  {
    q: "Can one project cover several formats?",
    a: "Yes — a campaign can include key visuals, video cut-downs for every platform and a landing page, planned together.",
  },
];

export default function Home() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="grain relative overflow-hidden bg-navy text-white">
        <SilkBackdrop />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/30 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/70 to-transparent"
        />
        <Container className="pointer-events-none relative grid min-h-[100svh] items-center gap-12 pb-16 pt-28 lg:grid-cols-12 lg:pt-24 [&_a]:pointer-events-auto">
          <div className="relative z-10 lg:col-span-7">
            <Reveal fade={false}>
              <Eyebrow light>Creative & technology studio</Eyebrow>
              <HeroHeadline
                lead="Ideas deserve"
                accent="extraordinary execution."
                className={`mt-6 ${H1}`}
              />
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/80">
                We bring creativity, AI and technology together to build visuals, films and digital
                products that move brands forward.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <StarButton href="/contact">Book a call</StarButton>
                <Button href="/recents" variant="outline-light">
                  Explore our recents
                </Button>
              </div>
              <ul className="mt-10 flex flex-wrap gap-2">
                {TAGS.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/20 bg-white/[0.06] px-3.5 py-1.5 text-sm text-white/85 backdrop-blur-sm"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.15} fade={false} className="lg:col-span-5">
            <div className="pointer-events-auto relative mx-auto w-[min(82vw,480px)]">
              <ParallaxImage
                src="/hero/meenakshi.webp"
                alt="Crystal Meenakshi holding a clapperboard, laptop, phone and pen — the four AQRO disciplines"
                width={1059}
                height={1200}
                className="relative h-auto w-full drop-shadow-[0_30px_60px_rgba(0,30,80,0.55)]"
                caption={
                  <p className="relative mt-4 flex items-center justify-center gap-2 font-display text-lg font-semibold">
                    <Mark className="size-3" /> Creative, but engineered.
                  </p>
                }
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 2 — Client marquee directly below the Hero */}
      <section className="border-y border-graphite/10 bg-white py-10">
        <Container className="mb-4">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-graphite/50">
            Trusted by brands & creators across disciplines
          </p>
        </Container>
        <ClientLoop />
      </section>

      {/* 3 — Showreel Section (with embedded YouTube / Video player) */}
      <section id="showreel" className="bg-paper py-20 md:py-28 border-b border-graphite/10">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Eyebrow>Showreel</Eyebrow>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-graphite sm:text-4xl lg:text-5xl">
                  Work in motion. <span className="text-blue">Crafted to captivate.</span>
                </h2>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-graphite/75 sm:text-lg">
                Brand creatives, AI-powered commercial films, apps and digital experiences engineered to move audiences and scale modern brands.
              </p>
            </div>

            {/* Embedded Responsive YouTube / Video Player with liquid glass frame */}
            <div className="relative mt-12 overflow-hidden rounded-[2.5rem] p-[3px] bg-gradient-to-br from-white/80 via-blue/20 to-sky/30 shadow-[0_30px_80px_-20px_rgba(0,26,64,0.18)]">
              {/* Glass background shimmer */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-white/40 via-white/10 to-transparent backdrop-blur-xl"
              />

              <div className="relative aspect-video w-full overflow-hidden rounded-[2.3rem] bg-black shadow-inner">
                {(() => {
                  const videoSrc = site.showreel.src || "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                  const embed = embedUrl(videoSrc);
                  if (embed) {
                    return (
                      <iframe
                        src={embed.replace("autoplay=1", "autoplay=0")}
                        title="AQRO Showreel"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="size-full border-0"
                      />
                    );
                  }
                  return (
                    <video
                      src={videoSrc}
                      poster={site.showreel.poster || undefined}
                      controls
                      playsInline
                      className="size-full object-cover"
                    />
                  );
                })()}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 4 — Metrics Snapshot (Liquid Glass Cards with HoloMosaic Backdrop) */}
      <section className="relative overflow-hidden bg-navy py-20 md:py-28 text-white">
        {/* HoloMosaic interactive tile backdrop in AQRO brand colors */}
        <ImpactHoloMosaicBackdrop className="opacity-90" />

        {/* Ambient liquid glow orbs in background */}
        <div aria-hidden className="pointer-events-none absolute -left-20 top-1/4 size-[420px] rounded-full bg-blue/20 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute -right-20 bottom-1/4 size-[420px] rounded-full bg-sky/25 blur-[130px]" />

        {/* Soft vignette overlay so cards and headings remain crisp */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy/70 via-transparent to-navy/80"
        />

        <Container className="relative">
          <SectionHead
            light
            eyebrow="Impact & Performance"
            title="Measured by impact, proven by execution."
            aside={<TextLink href="/recents" light>Explore our recents</TextLink>}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.title || s.label}
                delay={i * 0.08}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-8 shadow-[0_20px_50px_-15px_rgba(0,10,40,0.4),inset_0_1px_2px_rgba(255,255,255,0.4)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-sky/50 hover:bg-white/20 hover:shadow-[0_28px_60px_-12px_rgba(0,74,173,0.35),inset_0_1px_3px_rgba(255,255,255,0.8)]"
              >
                {/* Specular Liquid Glass Top Highlight */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/30 via-white/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* Inner refractive sheen */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-gradient-to-br from-blue/30 via-sky/20 to-transparent blur-2xl transition-transform duration-700 ease-out group-hover:scale-150"
                />

                <div className="relative z-10">
                  <span className="font-display text-4xl font-extrabold tracking-tight bg-gradient-to-r from-sky via-white to-sky/90 bg-clip-text text-transparent drop-shadow-sm sm:text-5xl lg:text-6xl">
                    {s.value}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-white sm:text-xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{s.label}</p>
                </div>

                {/* Liquid bottom accent indicator */}
                <div className="relative z-10 mt-6 flex items-center gap-1.5">
                  <div className="h-1 w-6 rounded-full bg-sky/60 transition-all duration-300 group-hover:w-10 group-hover:bg-sky" />
                  <div className="h-1 w-1.5 rounded-full bg-blue/60 transition-colors group-hover:bg-blue" />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 5 — Services (Each service card enhanced with React Bits Silk effect) */}
      <section className="bg-paper pb-20 md:pb-28">
        <Container>
          <SectionHead
            eyebrow="Built on purpose, driven by creativity"
            title="Our services."
            aside={
              <p className="max-w-sm text-[15px] leading-relaxed text-graphite/75">
                Four disciplines that work alone or together. Hover or tilt each card to explore.
              </p>
            }
          />
          <ServiceTiltedCards />
        </Container>
      </section>

      {/* 6 — Testimonials (Interactive design testimonial with magnetic parallax & word reveal) */}
      <section className="relative overflow-hidden bg-navy text-white">
        {/* Subtle flowing waves in Aqro brand blue behind the magnetic testimonial */}
        <WavesBackdrop className="opacity-35" />

        {/* Ambient atmospheric depth glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-36 -top-36 size-[550px] rounded-full bg-blue/30 blur-[140px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-36 -bottom-36 size-[550px] rounded-full bg-sky/15 blur-[140px]"
        />

        <div className="relative z-10">
          <Testimonial className="!bg-transparent" />
        </div>
      </section>

      {/* 7 — Partner */}
      <section className="bg-ivory py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Why aqro</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>Partner with us to bring your idea to life.</h2>
            <p className="mt-5 text-lg text-graphite/75">Powered by technology, imagined by people.</p>
            <div className="mt-8">
              <StarButton href="/contact">Get in touch</StarButton>
            </div>
          </Reveal>
          <ul className="grid gap-4 lg:col-span-7">
            {PILLARS.map((p, i) => (
              <Reveal as="li" key={p.t} delay={i * 0.08} className="flex gap-5 rounded-2xl bg-white p-6">
                <Mark className="mt-1.5 size-3 shrink-0" />
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">{p.t}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-graphite/70">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* 8 — FAQ */}
      <section className="bg-paper py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>Questions, answered.</h2>
            <p className="mt-5 text-[15px] text-graphite/70">
              Something else? <TextLink href="/contact">Ask us</TextLink>
            </p>
          </div>
          <div className="lg:col-span-8">
            <FAQ items={FAQS} />
          </div>
        </Container>
      </section>

      <CTA title="Have an idea? Let's make it happen." />
    </>
  );
}
