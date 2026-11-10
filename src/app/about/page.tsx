import type { Metadata } from "next";
import { CTA } from "@/components/blocks";
import { Reveal } from "@/components/motion";
import { Container, Eyebrow, H2, Mark } from "@/components/ui";
import { ClientLoop, FounderCard } from "@/components/fx";
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

      {/* Clients */}
      <section className="bg-paper pb-4">
        <Container>
          <p className="mb-6 text-center text-[13px] font-medium uppercase tracking-[0.16em] text-graphite/60">Trusted by brands across industries</p>
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
              <Reveal as="li" key={f?.name ?? i} delay={i * 0.08} className="grid items-center gap-8 rounded-3xl bg-white p-6 sm:grid-cols-[auto_1fr] sm:p-8 md:grid-cols-1 xl:grid-cols-[auto_1fr]">
                <div className="mx-auto">
                  <FounderCard name={f?.name ?? "Founder name"} role={f?.role ?? "Co-founder"} index={i} />
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.14em] text-red-ink">{f?.role ?? "Co-founder"}</p>
                  <p className="mt-2 font-display text-2xl font-semibold tracking-tight">{f?.name ?? "Profile coming soon"}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-graphite/70">{f?.bio ?? "Founder profiles will be added here."}</p>
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

      <CTA title="Let's create something extraordinary." body="Tell us what you're building — we'll show you how we'd bring it to life." cta="Work With AQRO" />
    </>
  );
}
