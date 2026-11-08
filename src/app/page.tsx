import { Composition } from "@/components/Composition";
import { ClientGrid, CTA, SectionHead } from "@/components/blocks";
import { FAQ } from "@/components/FAQ";
import { Reveal } from "@/components/motion";
import { FeaturedProject, Portfolio } from "@/components/Portfolio";
import { Reel } from "@/components/Reel";
import { ServiceSwitcher } from "@/components/ServiceSwitcher";
import { Button, Container, Eyebrow, H1, H2, Mark, TextLink } from "@/components/ui";

const TAGS = ["Brand Creatives", "Ad Campaigns", "AI Commercials", "AI Films", "Mobile Apps", "Websites & Web Apps"];

const PIPELINE = [
  { t: "Strategy", items: ["Discovery & research", "Creative concepts", "Product & technical planning"] },
  { t: "Creation", items: ["Brand & campaign design", "AI video production", "App & web development"] },
  { t: "Delivery", items: ["Testing & refinement", "Finishing & versioning", "Launch & support"] },
];

const PILLARS = [
  { t: "Creative-first, tech-enabled", d: "The idea leads. We pick the tools — AI included — that make it better." },
  { t: "One team, end to end", d: "Design, film and code planned together, so nothing gets lost between vendors." },
  { t: "Built around outcomes", d: "We agree what success looks like upfront and design towards it." },
];

const FAQS = [
  { q: "What kinds of projects do you take on?", a: "Brand creatives and campaigns, AI-produced commercials and films, mobile and product apps, and websites or web apps — on their own or combined." },
  { q: "Can you work with our existing brand guidelines?", a: "Yes. We extend existing identities all the time and keep everything consistent with your style." },
  { q: "How long does a typical project take?", a: "It depends on scope. After a short discovery call we share a timeline with clear milestones before any work starts." },
  { q: "How do you use AI in your work?", a: "As a production tool, not a replacement for judgement. People direct, review and approve everything we deliver." },
  { q: "Do you work with agencies?", a: "Yes. We can work as your production or development partner, under your brand or ours." },
  { q: "Can one project cover several formats?", a: "Yes — a campaign can include key visuals, video cut-downs for every platform and a landing page, planned together." },
];

export default function Home() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="relative overflow-hidden bg-blue text-white">
        <Container className="grid min-h-[100svh] items-center gap-12 pb-16 pt-28 lg:grid-cols-12 lg:pt-24">
          <div className="relative z-10 lg:col-span-7">
            <Reveal fade={false}>
              <Eyebrow light>Creative & technology studio</Eyebrow>
              <h1 className={`mt-6 ${H1}`}>
                Ideas deserve <span className="text-white/55">extraordinary execution.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/80">
                We bring creativity, AI and technology together to build visuals, films and digital products that move brands
                forward.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/contact" variant="white">
                  Book a call
                </Button>
                <Button href="/work" variant="outline-light">
                  Explore our work
                </Button>
              </div>
              <ul className="mt-10 flex flex-wrap gap-2">
                {TAGS.map((t) => (
                  <li key={t} className="rounded-full border border-white/25 px-3.5 py-1.5 text-sm text-white/85">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-square w-[min(80vw,480px)] rounded-3xl bg-white/[0.06] p-6">
              <Composition className="size-full" />
              <p className="absolute bottom-5 left-6 flex items-center gap-2 font-display text-lg font-semibold">
                <Mark className="size-3" /> Creative, but engineered.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 2 — What we do */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <Reveal>
            <Eyebrow>What we do</Eyebrow>
            <p className="mt-6 max-w-5xl font-display text-[clamp(1.9rem,3.8vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-balance">
              AQRO is a creative and technology partner — <span className="text-blue">one team from the first idea to the final launch.</span>
            </p>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-graphite/75">
              Brand creatives, AI-powered video, apps and websites run through one integrated pipeline, so your idea keeps its
              shape from concept to finish.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <Reel />
          </Reveal>
        </Container>
      </section>

      {/* 3 — Work */}
      <section className="bg-ivory py-20 md:py-28">
        <Container>
          <SectionHead eyebrow="Our work" title="Ideas brought to life." aside={<TextLink href="/work">View all work</TextLink>} />
          <FeaturedProject />
          <Portfolio filters limit={6} />
        </Container>
      </section>

      {/* 4 — Clients */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <SectionHead eyebrow="Clients" title="Good work brings great brands together." />
          <Reveal>
            <ClientGrid />
          </Reveal>
        </Container>
      </section>

      {/* 5 — Services */}
      <section className="bg-paper pb-20 md:pb-28">
        <Container>
          <SectionHead
            eyebrow="Built on purpose, driven by creativity"
            title="Our services."
            aside={<p className="max-w-sm text-[15px] leading-relaxed text-graphite/75">Four disciplines that work alone or together. The best work happens where they overlap.</p>}
          />
          <ServiceSwitcher />
        </Container>
      </section>

      {/* 6 — Pipeline */}
      <section className="bg-graphite py-20 text-white md:py-28">
        <Container>
          <SectionHead
            light
            eyebrow="How we work"
            title={<>Full-stack, <span className="text-white/55">from idea to launch.</span></>}
          />
          <ol className="grid gap-5 md:grid-cols-3">
            {PIPELINE.map((p, i) => (
              <Reveal as="li" key={p.t} delay={i * 0.1} className="rounded-2xl bg-white/[0.06] p-7">
                <span className="font-display text-sm font-semibold text-red">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">{p.t}</h3>
                <ul className="mt-5 space-y-2.5 text-[15px] text-white/75">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-center gap-3">
                      <span className="size-1.5 rounded-full bg-white/40" aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* 7 — Partner */}
      <section className="bg-ivory py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Why aqro</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>Partner with us to bring your idea to life.</h2>
            <p className="mt-5 text-lg text-graphite/75">Powered by technology, imagined by people.</p>
            <div className="mt-8">
              <Button href="/contact">Get in touch</Button>
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
