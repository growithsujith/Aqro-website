import Link from "next/link";
import type { ReactNode } from "react";
import { services, type ProjectCategory, type ServiceSlug } from "@/content/site";
import { Etching } from "../Etching";
import { Reveal, SplitLines } from "../motion";
import { Container, Slate } from "../ui";
import { FAQ, type QA } from "./FAQ";
import { Process, type Step } from "../Process";
import { ProjectGallery } from "../ProjectGallery";

type Tone = "ink" | "light";

export function SectionHead({
  scene,
  label,
  title,
  aside,
  tone = "ink",
}: {
  scene: string;
  label: string;
  title: ReactNode[];
  aside?: ReactNode;
  tone?: Tone;
}) {
  return (
    <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <Slate scene={scene} tone={tone}>
          {label}
        </Slate>
        <SplitLines
          className="mt-8 font-display text-[clamp(2.2rem,4.6vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.04em]"
          lines={title}
        />
      </div>
      {aside && (
        <Reveal className="lg:col-span-5">
          <div className={`text-[15px] leading-relaxed ${tone === "light" ? "text-white/70" : "text-graphite/70"}`}>{aside}</div>
        </Reveal>
      )}
    </div>
  );
}

/** Capabilities as a ruled, three-column list of disciplines and skills. */
export function Capabilities({ groups, tone = "ink" }: { groups: { title: string; items: string[] }[]; tone?: Tone }) {
  const light = tone === "light";
  return (
    <div className={`grid gap-px md:grid-cols-3 ${light ? "bg-white/15" : "bg-graphite/15"} border-y ${light ? "border-white/15" : "border-graphite/15"}`}>
      {groups.map((g, i) => (
        <Reveal key={g.title} delay={i * 0.1} className={`${light ? "bg-graphite" : "bg-ivory"} p-8`}>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-red-ink">{g.title}</h3>
          <ul className="mt-5 space-y-2.5">
            {g.items.map((it) => (
              <li key={it} className={`flex items-baseline gap-3 text-[16px] ${light ? "text-white/85" : "text-graphite/85"}`}>
                <span className={`h-px w-3 shrink-0 translate-y-[-4px] ${light ? "bg-white/40" : "bg-graphite/40"}`} aria-hidden />
                {it}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}

export function ProcessBlock({ steps, scene, tone = "ink", intro }: { steps: Step[]; scene: string; tone?: Tone; intro: string }) {
  return (
    <>
      <SectionHead
        scene={scene}
        label="Process"
        tone={tone}
        title={[
          <span key="a">
            How it <span className="font-serif font-normal italic">comes together</span>
            <span className="text-red-ink">.</span>
          </span>,
        ]}
        aside={<p>{intro}</p>}
      />
      <Process steps={steps} tone={tone} />
    </>
  );
}

export function PortfolioBlock({ category, scene, label }: { category: ProjectCategory; scene: string; label: string }) {
  return (
    <section className="border-t border-graphite/15 bg-paper py-24 md:py-32">
      <Container>
        <SectionHead
          scene={scene}
          label="Selected work"
          title={[
            <span key="a">
              Recent <span className="font-serif font-normal italic">{label}</span>
              <span className="text-red-ink">.</span>
            </span>,
          ]}
          aside={
            <Link href="/work" className="underline decoration-graphite/30 underline-offset-4 hover:decoration-red">
              Browse the full portfolio →
            </Link>
          }
        />
        <ProjectGallery only={category} showFilters={false} limit={4} />
      </Container>
    </section>
  );
}

export function FAQBlock({ items, scene }: { items: QA[]; scene: string }) {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Slate scene={scene}>Questions</Slate>
          <h2 className="mt-8 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            Asked, <span className="font-serif font-normal italic">answered</span>
            <span className="text-red-ink">.</span>
          </h2>
          <p className="mt-6 max-w-xs text-[15px] text-graphite/65">
            Something else on your mind?{" "}
            <Link href="/contact" className="underline decoration-red underline-offset-4">
              Ask us directly
            </Link>
            .
          </p>
        </div>
        <div className="lg:col-span-8">
          <FAQ items={items} />
        </div>
      </Container>
    </section>
  );
}

export function Related({ current, scene }: { current: ServiceSlug; scene: string }) {
  const others = services.filter((s) => s.slug !== current);
  return (
    <section className="border-t border-graphite/15 bg-ivory py-24 md:py-28">
      <Container>
        <Slate scene={scene}>Related services</Slate>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {others.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 0.08}>
              <Link href={s.href} className="group flex items-center gap-5 border border-graphite/15 bg-paper p-5 transition-colors hover:border-graphite/40">
                <span className="grid size-20 shrink-0 place-items-center bg-ivory">
                  <Etching name={s.icon} className="h-14 w-auto transition-transform duration-700 group-hover:scale-110" sizes="80px" />
                </span>
                <span className="flex-1">
                  <span className="block font-mono text-[10px] tracking-[0.2em] text-red-ink">{s.no}</span>
                  <span className="mt-1 block font-display text-xl font-semibold tracking-tight">{s.name}</span>
                  <span className="block text-sm text-graphite/70">{s.short}</span>
                </span>
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
