import type { Metadata } from "next";
import { CTA } from "@/components/blocks";
import { Reveal } from "@/components/motion";
import { Button, Container, Eyebrow, H1, H2, Mark } from "@/components/ui";
import { AboutBeamsBackdrop, ClientLoop, FounderCard, StarButton } from "@/components/fx";
import { founders, teamGroups } from "@/content/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "AQRO is a creative and technology studio combining brand creatives, AI video production, app and web development in one unified team.",
};

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
  const founderCards = founders.length ? founders : [null, null];

  return (
    <>
      {/* 1 — Full-width Hero with React Bits Beams background using Aqro brand colours */}
      <section className="relative flex min-h-[75vh] items-center overflow-hidden bg-navy pb-20 pt-32 text-white md:pb-28 md:pt-40">
        <AboutBeamsBackdrop className="opacity-90" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent"
        />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <Reveal fade={false}>
              <Eyebrow light>Creative & Technology Studio</Eyebrow>
              <h1 className={`mt-6 ${H1}`}>
                Built on purpose, <span className="text-sky">driven by craft.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
                AQRO brings together visionary brand design, generative AI cinema, and production software
                engineering under one roof.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <StarButton href="/contact">Start a Project</StarButton>
                <Button href="/recents" variant="outline-light">
                  Explore our recents
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 2 — Short About Aqro section explaining who we are and what we do */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <Reveal>
            <Eyebrow>About AQRO</Eyebrow>
            <h2 className={`mt-5 max-w-4xl ${H2}`}>
              One integrated team bridging <span className="text-blue">creative ambition</span> and{" "}
              <span className="text-red">modern engineering</span>.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-graphite/85">
                AQRO was founded to eliminate the friction between creative agencies, video production
                houses, and software developers. Rather than passing your vision down a disjointed chain
                of third-party vendors, our multidisciplinary studio owns the entire creative and
                technical pipeline from first concept to global rollout.
              </p>
              <p className="mt-6 text-base leading-relaxed text-graphite/75">
                We partner with ambitious founders, established brands, and creative leaders across
                four key disciplines: brand identity and campaigns, AI video and commercial production,
                native mobile applications, and web development. We direct AI as a precision
                instrument—guided by human taste, strategic rigor, and technical excellence.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="rounded-3xl border border-graphite/10 bg-white p-8 shadow-sm">
                <h3 className="font-display text-lg font-semibold tracking-tight text-graphite">
                  Our Studio Pillars
                </h3>
                <ul className="mt-5 space-y-4 text-sm leading-relaxed text-graphite/75">
                  <li className="flex items-start gap-3">
                    <Mark className="mt-1 size-3 shrink-0" />
                    <span>
                      <strong className="text-graphite">End-to-End Ownership:</strong> Strategy,
                      design, generative video, and code developed simultaneously.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mark className="mt-1 size-3 shrink-0" />
                    <span>
                      <strong className="text-graphite">Human Direction, AI Speed:</strong> Generative
                      models calibrated and elevated by senior artists.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mark className="mt-1 size-3 shrink-0" />
                    <span>
                      <strong className="text-graphite">Engineering Rigor:</strong> Responsive
                      layouts, smooth 60fps interactions, and scalable architectures.
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 3 — Clients */}
      <section className="border-y border-graphite/10 bg-white py-12">
        <Container>
          <p className="mb-6 text-center text-[13px] font-medium uppercase tracking-[0.16em] text-graphite/60">
            Trusted by brands across industries
          </p>
        </Container>
        <ClientLoop />
      </section>

      {/* 4 — Team */}
      <section className="bg-ivory py-20 md:py-28">
        <Container>
          <Reveal>
            <Eyebrow>Our team</Eyebrow>
            <h2 className={`mt-5 max-w-3xl ${H2}`}>The people behind every idea we bring to life.</h2>
          </Reveal>

          {/* Founders */}
          <ul className="mt-12 grid gap-10 md:grid-cols-2">
            {founderCards.map((f, i) => (
              <Reveal
                as="li"
                key={f?.name ?? i}
                delay={i * 0.08}
                className="grid items-center gap-8 rounded-3xl bg-white p-6 sm:grid-cols-[auto_1fr] sm:p-8 md:grid-cols-1 xl:grid-cols-[auto_1fr]"
              >
                <div className="mx-auto">
                  <FounderCard
                    name={f?.name ?? "Founder name"}
                    role={f?.role ?? "Co-founder"}
                    index={i}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.14em] text-red-ink">
                    {f?.role ?? "Co-founder"}
                  </p>
                  <p className="mt-2 font-display text-2xl font-semibold tracking-tight">
                    {f?.name ?? "Profile coming soon"}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-graphite/70">
                    {f?.bio ?? "Founder profiles will be added here."}
                  </p>
                  <p className="mt-4 text-xs text-graphite/50">Move your cursor over the card to tilt it.</p>
                </div>
              </Reveal>
            ))}
          </ul>

          {/* Grouped roster */}
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {teamGroups.map((g) => (
              <div key={g.title}>
                {g.members.length > 0 && (
                  <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
                    {g.members.map((m, i) => (
                      <Reveal as="li" key={m.name} delay={i * 0.05}>
                        <Portrait src={m.photo} alt={m.name} bg="bg-white" />
                        <p className="mt-3 font-display font-semibold tracking-tight">{m.name}</p>
                        <p className="text-sm text-graphite/60">{m.role}</p>
                      </Reveal>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        title="Let's create something extraordinary."
        body="Tell us what you're building — we'll show you how we'd bring it to life."
        cta="Work With AQRO"
      />
    </>
  );
}
