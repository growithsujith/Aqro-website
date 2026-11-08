import Link from "next/link";
import { services, type Service } from "@/content/site";
import { Etching } from "../Etching";
import { Reveal } from "../motion";

/** Each discipline gets its own surface so the four blocks read differently. */
const SURFACE: Record<Service["slug"], { box: string; text: string; muted: string; tone: "ink" | "white"; deco: React.ReactNode }> = {
  creatives: {
    box: "bg-paper",
    text: "text-graphite",
    muted: "text-graphite/70",
    tone: "ink",
    // typographic baseline grid
    deco: (
      <div
        className="absolute inset-0 opacity-60"
        style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 27px, #ED1C2422 27px 28px)" }}
      />
    ),
  },
  "ai-video-production": {
    box: "bg-graphite",
    text: "text-ivory",
    muted: "text-ivory/60",
    tone: "white",
    // letterbox bars
    deco: (
      <>
        <div className="absolute inset-x-0 top-0 h-6 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 h-6 bg-black/40" />
      </>
    ),
  },
  "app-development": {
    box: "bg-ivory blueprint",
    text: "text-graphite",
    muted: "text-graphite/70",
    tone: "ink",
    deco: null,
  },
  "web-development": {
    box: "bg-paper",
    text: "text-graphite",
    muted: "text-graphite/70",
    tone: "ink",
    // browser chrome
    deco: (
      <div className="absolute inset-x-0 top-0 flex h-9 items-center gap-1.5 border-b border-graphite/15 px-4">
        <span className="size-2 rounded-full bg-red" />
        <span className="size-2 rounded-full bg-graphite/20" />
        <span className="size-2 rounded-full bg-graphite/20" />
        <span className="ml-3 h-4 w-40 rounded-full border border-graphite/15" />
      </div>
    ),
  },
};

export function ServiceBlocks() {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {services.map((s, i) => {
        const sf = SURFACE[s.slug];
        return (
          <Reveal as="li" key={s.slug} delay={(i % 2) * 0.12}>
            <Link
              href={s.href}
              className={`group relative flex h-full flex-col overflow-hidden border border-graphite/15 ${sf.box} ${sf.text}`}
            >
              {sf.deco && <div className="pointer-events-none absolute inset-0" aria-hidden>{sf.deco}</div>}

              <div className="relative flex items-start justify-between px-6 pt-12 sm:px-8">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em]">
                  <span className="text-red-ink">{s.no}</span>
                  <span className={sf.muted}> / 04</span>
                </span>
                <ul className={`flex flex-wrap justify-end gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] ${sf.muted}`}>
                  {s.tags.slice(0, 3).map((t) => (
                    <li key={t} className="rounded-full border border-current/30 px-2.5 py-1">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative flex h-64 items-center justify-center px-8 sm:h-80">
                <Etching
                  name={s.art}
                  tone={sf.tone}
                  className="h-full w-auto max-w-full object-contain transition-transform duration-[1.1s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:rotate-[-1.5deg] group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 80vw, 40vw"
                />
              </div>

              <div className="relative mt-auto px-6 pb-12 sm:px-8">
                <div className="relative mb-6 h-px bg-current/15">
                  <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-red transition-transform duration-700 group-hover:scale-x-100" />
                </div>
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{s.name}</h3>
                    <p className={`mt-3 max-w-md text-[15px] leading-relaxed ${sf.muted}`}>{s.blurb}</p>
                  </div>
                  <span
                    aria-hidden
                    className="grid size-12 shrink-0 place-items-center rounded-full border border-current/30 transition-all duration-500 group-hover:-rotate-45 group-hover:border-red group-hover:bg-red group-hover:text-white"
                  >
                    →
                  </span>
                </div>
                <span className="mt-5 inline-block font-mono text-[11px] uppercase tracking-[0.22em]">Explore Service</span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}
