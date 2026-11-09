import type { Metadata } from "next";
import { CTA } from "@/components/blocks";
import { Glyph } from "@/components/Glyph";
import { Reveal } from "@/components/motion";
import { Button, Container, Eyebrow, H1, H2, Mark } from "@/components/ui";
import { founders, stats, teamGroups } from "@/content/data";

export const metadata: Metadata = {
  title: "About",
  description: "AQRO combines brand creatives, AI video production and digital product development in one studio.",
};

/** Shown until real figures are added in content/data.ts → stats. */
const FALLBACK_STATS = [
  { value: "04", label: "disciplines under one roof" },
  { value: "01", label: "team from idea to launch" },
  { value: "360°", label: "creative, video, apps and web" },
];

function Portrait({ src, alt, bg = "bg-ivory" }: { src?: string; alt: string; bg?: string }) {
  return (
    <div className={`relative aspect-square overflow-hidden rounded-2xl ${bg}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="size-full object-cover" />
      ) : (
        <div className="grid size-full place-items-center">
          <svg viewBox="0 0 100 100" className="w-1/3 text-graphite/15" aria-hidden>
            <circle cx="50" cy="36" r="18" fill="currentColor" />
            <path d="M16 92c4-20 18-30 34-30s30 10 34 30z" fill="currentColor" />
          </svg>
        </div>
      )}
      <Mark className="absolute right-3 top-3 size-2.5" />
    </div>
  );
}

export default function AboutPage() {
  const shownStats = stats.length >= 2 ? stats : FALLBACK_STATS;
  const founderCards = founders.length ? founders : [null, null];
  return (
    <>
      {/* 1 — Hero: full-bleed panel with the headline over it */}
      <section className="bg-paper pt-24 md:pt-28">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-blue px-6 pb-12 pt-20 text-white sm:px-12 md:pb-16 md:pt-28">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/meenakshi.webp"
              alt=""
              aria-hidden
              className="pointer-events-none absolute bottom-0 -right-10 h-[88%] w-auto max-w-none opacity-25 drop-shadow-[0_30px_50px_rgba(0,20,60,0.45)] lg:right-8 lg:opacity-100"
            />
            <Reveal fade={false} className="relative max-w-2xl lg:max-w-[540px]">
              <Eyebrow light>About aqro</Eyebrow>
              <h1 className={`mt-6 ${H1}`}>Building what&apos;s next through creativity and technology.</h1>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Button href="/work" variant="white">
                  See our work
                </Button>
                <span className="text-white/80">Ideas, extraordinarily executed.</span>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 2 — Stats strip */}
      <section className="bg-paper py-12 md:py-16">
        <Container>
          <dl className="grid gap-px overflow-hidden rounded-2xl bg-graphite/10 sm:grid-cols-3">
            {shownStats.slice(0, 3).map((s) => (
              <Reveal key={s.label} className="flex flex-col-reverse bg-white p-8">
                <dt className="mt-2 text-[15px] text-graphite/70">{s.label}</dt>
                <dd className="font-display text-5xl font-semibold tracking-tight text-blue">{s.value}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* 3 — Philosophy */}
      <section className="bg-paper py-16 md:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Our philosophy</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>
              We don&apos;t automate creativity. <span className="text-blue">We amplify it.</span>
            </h2>
            <div className="mt-6 max-w-xl space-y-4 text-[17px] leading-relaxed text-graphite/75">
              <p>Technology changes how we create. Creativity defines why we create. We use AI and modern engineering to move faster and go further — never to replace taste or judgement.</p>
              <p>Every frame, screen and line of code is directed and reviewed by people who care how it lands.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {(["creatives", "ai-video-production", "app-development", "web-development"] as const).map((g, i) => (
                <div key={g} className={`grid aspect-square place-items-center rounded-2xl ${i === 1 || i === 2 ? "bg-blue text-white" : "bg-ivory text-blue"}`}>
                  <Glyph slug={g} tone={i === 1 || i === 2 ? "silver" : "blue"} className="w-[82%]" />
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 4 — Team */}
      <section className="bg-ivory py-20 md:py-28">
        <Container>
          <Reveal>
            <Eyebrow>Our team</Eyebrow>
            <h2 className={`mt-5 max-w-3xl ${H2}`}>The people behind every idea we bring to life.</h2>
          </Reveal>

          {/* Founders */}
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {founderCards.map((f, i) => (
              <Reveal as="li" key={f?.name ?? i} delay={i * 0.08} className="grid gap-6 rounded-2xl bg-white p-5 sm:grid-cols-[180px_1fr]">
                <Portrait src={f?.photo} alt={f?.name ?? "Founder"} />
                <div className="self-center">
                  <p className="text-sm font-medium uppercase tracking-[0.14em] text-red-ink">{f?.role ?? "Co-founder"}</p>
                  <p className="mt-2 font-display text-2xl font-semibold tracking-tight">{f?.name ?? "Profile coming soon"}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-graphite/70">{f?.bio ?? "Founder profiles will be added here."}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          {/* Grouped roster */}
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {teamGroups.map((g, gi) => (
              <div key={g.title}>
                <h3 className="flex items-baseline gap-3 border-b border-graphite/15 pb-4 font-display text-xl font-semibold tracking-tight">
                  <span className="text-sm text-blue">{String(gi + 1).padStart(2, "0")}</span>
                  {g.title}
                  {g.members.length > 0 && <span className="text-sm font-normal text-graphite/60">({g.members.length})</span>}
                </h3>
                {g.members.length ? (
                  <ul className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
                    {g.members.map((m, i) => (
                      <Reveal as="li" key={m.name} delay={i * 0.05}>
                        <Portrait src={m.photo} alt={m.name} bg="bg-white" />
                        <p className="mt-3 font-display font-semibold tracking-tight">{m.name}</p>
                        <p className="text-sm text-graphite/60">{m.role}</p>
                      </Reveal>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-[15px] text-graphite/60">Profiles coming soon.</p>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA title="Let's create something extraordinary." body="Tell us what you're building — we'll show you how we'd bring it to life." cta="Work With AQRO" />
    </>
  );
}
