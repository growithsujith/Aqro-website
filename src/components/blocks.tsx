import Link from "next/link";
import type { ReactNode } from "react";
import { clients } from "@/content/data";
import { services } from "@/content/site";
import { Glyph } from "./Glyph";
import { Reveal } from "./motion";
import { Button, Container, Eyebrow, H2, Mark } from "./ui";

/** Section heading: eyebrow, title, optional right-hand slot. */
export function SectionHead({ eyebrow, title, aside, light = false }: { eyebrow: string; title: ReactNode; aside?: ReactNode; light?: boolean }) {
  return (
    <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <Reveal>
        <Eyebrow light={light}>{eyebrow}</Eyebrow>
        <h2 className={`mt-5 max-w-3xl ${H2}`}>{title}</h2>
      </Reveal>
      {aside && <Reveal delay={0.1}>{aside}</Reveal>}
    </div>
  );
}

/** Four service cards, each with its own glyph. */
export function ServiceCards() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s, i) => (
        <Reveal as="li" key={s.slug} delay={i * 0.08}>
          <Link
            href={s.href}
            className="group relative flex h-full flex-col rounded-2xl border border-graphite/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-blue hover:shadow-[0_24px_50px_-30px_#004aad80]"
          >
            <span className="text-sm font-medium text-graphite/60">{s.no}</span>
            <div className="my-8 text-blue">
              <Glyph slug={s.slug} className="mx-auto w-40" />
            </div>
            <h3 className="font-display text-xl font-semibold tracking-tight">{s.name}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-graphite/70">{s.short}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue">
              Explore
              <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </span>
            <Mark className="absolute right-5 top-5 size-3 scale-0 transition-transform duration-500 group-hover:scale-100" />
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

/** Four numbered steps in a row. */
export function Steps({ steps, light = false }: { steps: { t: string; d: string }[]; light?: boolean }) {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <Reveal as="li" key={s.t} delay={i * 0.1} className={`border-t pt-6 ${light ? "border-white/25" : "border-graphite/15"}`}>
          <span className={`font-display text-sm font-semibold ${light ? "text-white/70" : "text-blue"}`}>{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">{s.t}</h3>
          <p className={`mt-2 text-[15px] leading-relaxed ${light ? "text-white/75" : "text-graphite/70"}`}>{s.d}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/** Client logo grid with hairline dividers. Shows empty cells until logos are added. */
export function ClientGrid() {
  const cells = clients.length ? clients : Array.from({ length: 7 }, () => null);
  return (
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-graphite/10 bg-graphite/10 sm:grid-cols-4 lg:grid-cols-7">
      {cells.map((c, i) => (
        <li key={c?.name ?? i} className={`group flex h-28 items-center justify-center bg-white px-6 ${!c && i > 5 ? "hidden lg:flex" : ""}`}>
          {c ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={c.logo}
              alt={c.name}
              className="max-h-10 max-w-[75%] object-contain opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
              style={{ transform: `scale(${c.scale ?? 1})` }}
            />
          ) : (
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-graphite/40">Logo</span>
          )}
        </li>
      ))}
    </ul>
  );
}

/** Closing call-to-action on AQRO blue. */
export function CTA({ title = "Have an idea? Let's make it happen.", body = "From a creative concept to a complete digital product — let's build something worth remembering.", cta = "Start a Project" }: { title?: string; body?: string; cta?: string }) {
  return (
    <section className="relative overflow-hidden bg-blue text-white">
      <svg viewBox="0 0 400 400" className="pointer-events-none absolute -right-24 -top-24 w-[420px] opacity-[0.12] sm:w-[560px]" aria-hidden>
        <circle cx="200" cy="200" r="150" fill="none" stroke="#fff" strokeWidth="60" />
      </svg>
      <Mark className="pointer-events-none absolute bottom-10 right-10 hidden size-16 sm:block" />
      <Container className="relative py-24 md:py-32">
        <Reveal>
          <h2 className="max-w-3xl font-display text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[1] tracking-[-0.04em] text-balance">{title}</h2>
          <p className="mt-6 max-w-xl text-lg text-white/80">{body}</p>
          <div className="mt-10">
            <Button href="/contact" variant="white">
              {cta}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
