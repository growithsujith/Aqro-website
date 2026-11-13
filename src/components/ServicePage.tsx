import { serviceBySlug, type ServiceSlug } from "@/content/site";
import { CTA, SectionHead, Steps } from "./blocks";
import { FAQ } from "./FAQ";
import { Glyph } from "./Glyph";
import { Reveal } from "./motion";
import { Portfolio } from "./Portfolio";
import { Button, Container, Eyebrow, H1, H2, Mark, TextLink } from "./ui";
import { AppMockup, CreativeCarousel, CreativeWall, GradientASCIIBackdrop, PremiereTicket, PrismBackdrop, SilkBackdrop, StarButton, WebFlexBackdrop } from "./fx";
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";

const AI_VIDEO_IMAGES = [
  {
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/stock-images/767d99bb371a54d0d36751e8cecae43c.jpg",
    alt: "Diver silhouetted inside a sunset seascape shaped like a profile",
  },
  {
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/gradients/hero_gradient/hero-gradients-01.png",
    alt: "Soft multi-tone gradient wash",
  },
  {
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/stock-images/821d815affa6496c39cbdeeec7a84603.jpg",
    alt: "Double-exposure portrait blended with a city skyline at dusk",
  },
  {
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/gradients/moon/moon-grade-03.png",
    alt: "Moon-toned gradient",
  },
  {
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/stock-images/937438c560ada1c83317f2c11b3454b0.jpg",
    alt: "Motion-blurred side-profile portrait against a deep orange backdrop",
  },
  {
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/gradients/shade_shiters/shade-shifters-05.png",
    alt: "Shifting shade gradient",
  },
  {
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/stock-images/98f89cb9994f5c382ab964062c4039db.jpg",
    alt: "Figure holding a racket that dissolves into a swirling colourful cloud",
  },
  {
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/gradients/shade_shiters/shade-shifters-09.png",
    alt: "Shifting shade gradient",
  },
  {
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/stock-images/ddcbee38be8b7274e19e132d7ab35b53.jpg",
    alt: "Hand gesture with a colourful cutout of a bird flying through the fingers",
  },
  {
    src: "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/gradients/moon/moon-grade-06.png",
    alt: "Moon-toned gradient",
  },
];

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
        {/* Silk backdrop behind EVERY service hero section */}
        <SilkBackdrop tone={t.light ? "blue" : "deep"} className="opacity-45" />

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
            {/* GradientASCII over the silk effect behind it */}
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
              <GradientASCIIBackdrop />
            </div>
            <div aria-hidden className="absolute inset-0">
              <PrismBackdrop />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#004aad_0%,rgba(0,74,173,0.75)_50%,rgba(0,74,173,0.35)_100%)] lg:bg-[linear-gradient(90deg,#004aad_0%,rgba(0,74,173,0.65)_32%,transparent_55%)]"
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

      {/* AI Video Production: React Bits Tilted Grid Hero directly below the hero */}
      {slug === "ai-video-production" && (
        <section className="relative overflow-hidden border-y border-white/10 bg-graphite py-16 text-white">
          <Container className="mb-6 text-center">
            <Eyebrow light>Curved Visual Reel</Eyebrow>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Cinematic AI visual reel
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-white/70">
              Interactive 3D cylinder loop of generative sequences, cinematic worlds, and high-impact style frames.
            </p>
          </Container>
          <div className="relative mx-auto h-[440px] w-full max-w-[1400px]">
            <TiltedGridHero
              images={AI_VIDEO_IMAGES}
              speed={3.5}
              tileHeight={28}
              aspectRatio={16 / 9}
              gap={6}
              curve={75}
              fade={14}
            />
          </div>
        </section>
      )}

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
              aside={<TextLink href="/recents" light>All recents</TextLink>}
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
              aside={<TextLink href="/recents">All recents</TextLink>}
            />
            <Portfolio service={slug} />
          </Container>
        </section>
      )}

      {/* App UI Showcase (iPhone Mockup) — for App Development */}
      {prism && (
        <section className="bg-paper py-20 md:py-28">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <AppMockup />
              </div>
              <div className="lg:col-span-7">
                <Eyebrow>Crafted for iOS &amp; Android</Eyebrow>
                <h2 className={`mt-5 ${H2}`}>
                  High-performance applications with <span className="text-blue">intuitive UI &amp; UX.</span>
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-graphite/75">
                  Swipe through or click the previews to explore real interface layouts built by AQRO — engineered with fluid animations, micro-interactions, and bulletproof native performance.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <StarButton href="/contact">Start your app build</StarButton>
                  <Button href="#portfolio" variant="outline">
                    Explore app features
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Process */}
      <section id="process" className="bg-paper py-20 md:py-28">
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
