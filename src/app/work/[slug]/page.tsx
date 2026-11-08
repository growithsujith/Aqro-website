import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/data";
import { Reveal, SplitLines } from "@/components/motion";
import { Container, Slate } from "@/components/ui";
import { ClosingCTA } from "@/components/ClosingCTA";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const idx = projects.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];

  const chapters = [
    ["Objective", p.objective],
    ["Creative direction", p.creativeDirection],
    ["Execution", p.execution],
  ] as const;

  return (
    <>
      <section className="bg-ivory pt-32 md:pt-40">
        <Container>
          <Link href="/work" className="font-mono text-[11px] uppercase tracking-[0.22em] text-graphite/65 hover:text-red-ink">
            ← All work
          </Link>
          <div className="mt-8">
            <Slate scene={p.category}>{p.client}</Slate>
          </div>
          <SplitLines
            as="h1"
            animateOnMount
            className="mt-8 max-w-5xl font-display text-[clamp(2.8rem,7vw,7rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
            lines={[p.title]}
          />
          <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-graphite/15 py-6 md:grid-cols-4">
            {[
              ["Client", p.client],
              ["Discipline", p.category],
              ["Year", p.year ?? "—"],
              ["Deliverables", `${p.deliverables.length} items`],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/65">{k}</dt>
                <dd className="mt-1 font-display text-lg font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
        <div className="relative mx-auto mt-12 aspect-[16/8] max-w-[1440px] overflow-hidden bg-graphite">
          <Image src={p.thumbnail.src} alt={p.thumbnail.alt} fill priority sizes="100vw" className="object-cover" />
        </div>
      </section>

      <section className="bg-ivory py-24">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Slate scene="01">Overview</Slate>
          </div>
          <Reveal className="lg:col-span-8">
            <p className="font-serif text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.2]">{p.overview}</p>
          </Reveal>
          {chapters.map(([h, body], i) => (
            <div key={h} className="contents">
              <div className="border-t border-graphite/15 pt-6 lg:col-span-4">
                <Slate scene={String(i + 2).padStart(2, "0")}>{h}</Slate>
              </div>
              <Reveal className="border-t border-graphite/15 pt-6 lg:col-span-8">
                <p className="max-w-2xl text-[17px] leading-relaxed text-graphite/75">{body}</p>
              </Reveal>
            </div>
          ))}
          <div className="border-t border-graphite/15 pt-6 lg:col-span-4">
            <Slate scene="05">Final deliverables</Slate>
          </div>
          <ul className="grid gap-2 border-t border-graphite/15 pt-6 sm:grid-cols-2 lg:col-span-8">
            {p.deliverables.map((d) => (
              <li key={d} className="flex items-center gap-3 text-[16px]">
                <span className="size-1.5 rounded-full bg-red" aria-hidden /> {d}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-paper py-16">
        <Container className="grid gap-6 md:grid-cols-2">
          {p.media.map((m, i) =>
            m.type === "image" ? (
              <Reveal key={i} className={i % 3 === 0 ? "md:col-span-2" : ""}>
                <Image src={m.src} alt={m.alt} width={m.width} height={m.height} sizes="(max-width:768px) 100vw, 50vw" className="h-auto w-full" />
              </Reveal>
            ) : (
              <Reveal key={i} className="md:col-span-2">
                <video src={m.src} poster={m.poster} controls playsInline preload="metadata" className="aspect-video w-full bg-black" />
                {m.caption && <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-graphite/65">{m.caption}</p>}
              </Reveal>
            ),
          )}
        </Container>
      </section>

      {projects.length > 1 && (
        <section className="border-t border-graphite/15 bg-ivory py-16">
          <Container>
            <Link href={`/work/${next.slug}`} className="group flex items-end justify-between gap-6">
              <span>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-graphite/65">Next project</span>
                <span className="mt-2 block font-display text-[clamp(2rem,5vw,4.5rem)] font-semibold tracking-tight transition-colors group-hover:text-blue">
                  {next.title}
                </span>
              </span>
              <span aria-hidden className="text-4xl transition-transform group-hover:translate-x-2">→</span>
            </Link>
          </Container>
        </section>
      )}
      <ClosingCTA />
    </>
  );
}
