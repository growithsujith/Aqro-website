import type { Metadata } from "next";
import Link from "next/link";
import { Composition } from "@/components/Composition";
import { CTA, SectionHead } from "@/components/blocks";
import { Glyph } from "@/components/Glyph";
import { Reveal } from "@/components/motion";
import { Container, Eyebrow, H1, Mark } from "@/components/ui";
import { team } from "@/content/data";
import { services } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "AQRO combines brand creatives, AI video production and digital product development in one studio.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-ivory">
        <Container className="grid items-center gap-10 pb-20 pt-32 md:pt-40 lg:grid-cols-12">
          <Reveal fade={false} className="lg:col-span-7">
            <Eyebrow>About aqro</Eyebrow>
            <h1 className={`mt-6 ${H1}`}>
              Building what&apos;s next through <span className="text-blue">creativity and technology.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-graphite/75">
              Designers, filmmakers and engineers at one table — taking ideas from a sketch to something people can watch,
              hold and use.
            </p>
          </Reveal>
          <div className="lg:col-span-5">
            <Composition variant="blue-on-light" className="mx-auto w-[min(72vw,440px)]" />
          </div>
        </Container>
      </section>

      {/* Philosophy */}
      <section className="bg-paper py-20 md:py-32">
        <Container>
          <Reveal>
            <Eyebrow>Our philosophy</Eyebrow>
            <p className="mt-8 max-w-5xl font-display text-[clamp(2rem,4.8vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-balance">
              Technology changes <span className="text-blue">how</span> we create. Creativity defines{" "}
              <span className="text-red-ink">why</span> we create.
            </p>
            <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-graphite/75">
              New tools let ideas move faster than ever. We use them gladly — but we start with why, choose the how
              deliberately, and keep people in charge of every decision that matters.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="bg-ivory py-20 md:py-28">
        <Container>
          <SectionHead eyebrow="What we do" title="Four disciplines, one studio." />
          <ul className="border-b border-graphite/15">
            {services.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 0.06} className="border-t border-graphite/15">
                <Link href={s.href} className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 sm:grid-cols-[4rem_1fr_1fr_5rem]">
                  <span className="text-sm font-medium text-graphite/60">{s.no}</span>
                  <span className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-blue sm:text-3xl">{s.name}</span>
                  <span className="hidden text-[15px] text-graphite/70 sm:block">{s.short}</span>
                  <span className="w-14 justify-self-end text-blue">
                    <Glyph slug={s.slug} className="w-full" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Team */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <SectionHead eyebrow="Our team" title="The people behind the work." />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(team.length ? team : Array.from({ length: 4 }, () => null)).map((m, i) => (
              <Reveal as="li" key={m?.name ?? i} delay={i * 0.06}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ivory">
                  {m ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.photo} alt={m.name} className="size-full object-cover" />
                  ) : (
                    <div className="grid size-full place-items-center">
                      <svg viewBox="0 0 100 100" className="w-1/3 text-graphite/15" aria-hidden>
                        <circle cx="50" cy="36" r="18" fill="currentColor" />
                        <path d="M16 92c4-20 18-30 34-30s30 10 34 30z" fill="currentColor" />
                      </svg>
                    </div>
                  )}
                  <Mark className="absolute right-4 top-4 size-3" />
                </div>
                <p className="mt-4 font-display text-lg font-semibold tracking-tight">{m?.name ?? "Team member"}</p>
                <p className="text-sm text-graphite/60">{m?.role ?? "Profile coming soon"}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CTA title="Let's create something extraordinary." body="Tell us what you're building — we'll show you how we'd bring it to life." cta="Work With AQRO" />
    </>
  );
}
