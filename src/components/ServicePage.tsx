import { serviceBySlug, type ServiceSlug } from "@/content/site";
import { CTA, SectionHead, Steps } from "./blocks";
import { FAQ } from "./FAQ";
import { Glyph } from "./Glyph";
import { Reveal } from "./motion";
import { Portfolio } from "./Portfolio";
import { Button, Container, Eyebrow, H1, H2, Mark, TextLink } from "./ui";
import { CreativeCarousel, CreativeWall, PremiereTicket, PrismBackdrop, StarButton, WebFlexBackdrop } from "./fx";

const THEME = {
  ivory: { bg: "bg-ivory", text: "text-graphite", sub: "text-graphite/75", accent: "text-blue", glyph: "text-blue", disc: "bg-white", light: false, btn2: "outline" as const },
  white: { bg: "bg-white", text: "text-graphite", sub: "text-graphite/75", accent: "text-blue", glyph: "text-blue", disc: "bg-ivory", light: false, btn2: "outline" as const },
  graphite: { bg: "bg-graphite", text: "text-white", sub: "text-white/75", accent: "text-red", glyph: "text-white", disc: "bg-white/[0.06]", light: true, btn2: "outline-light" as const },
  navy: { bg: "bg-navy", text: "text-white", sub: "text-white/80", accent: "text-sky", glyph: "text-white", disc: "bg-white/[0.06]", light: true, btn2: "outline-light" as const },
  blue: { bg: "bg-blue", text: "text-white", sub: "text-white/80", accent: "text-white/60", glyph: "text-white", disc: "bg-white/[0.08]", light: true, btn2: "outline-light" as const },
};

/** One template, themed per service, for all four service pages. */
export function ServicePage({ slug }: { slug: ServiceSlug }) {
  const s = serviceBySlug(slug);
  const t = THEME[s.hero.theme];
  const wall = slug === "creatives";
  const flex = slug === "web-development";
  const prism = slug === "app-development";
  const ticket = slug === "ai-video-production";
  /** Heroes with an interactive full-bleed backdrop: let the pointer reach it through the copy. */
  const backdrop = wall || flex || prism;
  return (
    <>
      {/* Hero */}
      <section className={`${t.bg} ${t.text} relative overflow-hidden ${wall ? "grain" : ""}`}>
        {wall && (
          <>
            <div className="absolute inset-0 lg:left-[28%]">
              <CreativeWall />
            </div>
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent lg:via-navy/55" />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy to-transparent" />
          </>
        )}
        {flex && (
          <>
            <div className="absolute inset-0 top-16 lg:left-[34%]">
              <WebFlexBackdrop />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,0.92)_55%,rgba(255,255,255,0.35)_100%)] lg:bg-[linear-gradient(90deg,#fff_0%,#fff_36%,rgba(255,255,255,0.7)_46%,transparent_62%)]"
            />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
          </>
        )}
        {prism && (
          <>
            <div aria-hidden className="absolute inset-0">
              <PrismBackdrop />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#004aad_0%,rgba(0,74,173,0.85)_50%,rgba(0,74,173,0.4)_100%)] lg:bg-[linear-gradient(90deg,#004aad_0%,rgba(0,74,173,0.7)_32%,transparent_55%)]"
            />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-blue to-transparent" />
          </>
        )}
        {ticket && (
          <div aria-hidden className="pointer-events-none absolute -right-40 top-1/3 size-[620px] rounded-full bg-red/25 blur-[140px]" />
        )}
        <Container
          className={`grid items-center gap-12 pb-20 pt-32 md:pt-40 lg:grid-cols-12 ${
            backdrop ? "pointer-events-none relative min-h-[92svh] [&_a]:pointer-events-auto" : "relative"
          }`}
        >
          <div className="lg:col-span-7">
            <Reveal fade={false}>
              <Eyebrow light={t.light}>
                Service {s.no} · {s.name}
              </Eyebrow>
              <h1 className={`mt-6 ${H1}`}>
                {s.hero.title} <span className={t.accent}>{s.hero.accent}</span>
              </h1>
              <p className={`mt-6 max-w-xl text-lg leading-relaxed ${t.sub}`}>{s.hero.body}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <StarButton href="/contact">{s.hero.cta}</StarButton>
                <Button href="#portfolio" variant={t.btn2}>
                  See the work
                </Button>
              </div>
            </Reveal>
          </div>
          {ticket && (
            <Reveal delay={0.2} className="lg:col-span-5">
              <PremiereTicket />
            </Reveal>
          )}
          {!backdrop && !ticket && (
            <Reveal delay={0.2} className="group lg:col-span-5">
              <div className={`relative mx-auto grid aspect-square w-[min(80vw,420px)] place-items-center rounded-[2.5rem] ${t.disc}`}>
                <Glyph slug={slug} tone={t.light ? "silver" : "blue"} className="w-[88%]" />
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      {/* What we offer */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <SectionHead eyebrow="What we offer" title={<>Everything you need, <span className="text-blue">under one roof.</span></>} />
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {s.offer.map((o, i) => (
              <Reveal as="li" key={o.t} delay={(i % 3) * 0.06} className="flex gap-4 border-t border-graphite/15 pt-6">
                <Mark className="mt-1.5 size-3 shrink-0" />
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">{o.t}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-graphite/70">{o.d}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Portfolio */}
      {wall ? (
        <section id="portfolio" className="grain relative scroll-mt-20 overflow-hidden bg-navy py-20 text-white md:py-28">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/40 blur-[140px]" />
          <Container className="relative">
            <SectionHead
              light
              eyebrow="Portfolio"
              title={<>Selected creatives, <span className="text-white/55">in depth.</span></>}
              aside={<TextLink href="/work" light>All work</TextLink>}
            />
            <CreativeCarousel />
          </Container>
        </section>
      ) : (
        <section id="portfolio" className="scroll-mt-20 bg-ivory py-20 md:py-28">
          <Container>
            <SectionHead
              eyebrow="Portfolio"
              title={<>Selected {s.workLabel.toLowerCase() === "ai videos" ? "AI videos" : s.workLabel.toLowerCase()}.</>}
              aside={<TextLink href="/work">All work</TextLink>}
            />
            <Portfolio service={slug} />
          </Container>
        </section>
      )}

      {/* Process */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <SectionHead eyebrow="Process" title="How it comes together." />
          <Steps steps={s.steps} />
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-paper pb-20 md:pb-28">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>Good questions.</h2>
          </div>
          <div className="lg:col-span-8">
            <FAQ items={s.faqs} />
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
