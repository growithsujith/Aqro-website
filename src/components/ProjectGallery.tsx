"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { projects, type Project } from "@/content/data";
import { services, type ProjectCategory } from "@/content/site";
import { Etching } from "./Etching";
import type { IllustrationName } from "@/lib/illustrations";

const FILTERS: ("All" | ProjectCategory)[] = ["All", "Creatives", "AI Videos", "Apps", "Websites"];

const SLOT_ART: Record<ProjectCategory, IllustrationName> = {
  Creatives: "page-creatives",
  "AI Videos": "page-aivideo",
  Apps: "page-app",
  Websites: "page-web",
};

/**
 * Filterable project gallery. Renders AQRO's projects from content/data.ts.
 * Categories with nothing published yet show an honest "in the edit" slate
 * that routes to the relevant service, rather than invented work.
 */
export function ProjectGallery({
  initial = "All",
  showFilters = true,
  limit,
  only,
}: {
  initial?: "All" | ProjectCategory;
  showFilters?: boolean;
  limit?: number;
  only?: ProjectCategory;
}) {
  const [filter, setFilter] = useState<"All" | ProjectCategory>(only ?? initial);
  const reduce = useReducedMotion();
  const list = projects.filter((p) => filter === "All" || p.category === filter).slice(0, limit);
  const cats = (filter === "All" ? FILTERS.slice(1) : [filter]) as ProjectCategory[];
  const emptyCats = cats.filter((c) => !projects.some((p) => p.category === c));

  return (
    <div>
      {showFilters && !only && (
        <div role="tablist" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`relative rounded-full border px-4 py-2 text-sm transition-colors ${
                filter === f ? "border-graphite text-ivory" : "border-graphite/20 text-graphite hover:border-graphite/50"
              }`}
            >
              {filter === f && (
                <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-graphite" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>
      )}

      <motion.ul layout={!reduce} className="grid gap-x-6 gap-y-12 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.li
              key={p.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
              className={i % 3 === 0 ? "md:col-span-2" : ""}
            >
              <ProjectCard p={p} wide={i % 3 === 0} />
            </motion.li>
          ))}
          {emptyCats.map((c) => (
            <motion.li
              key={`slot-${c}`}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={emptyCats.length === 1 && list.length === 0 ? "md:col-span-2" : ""}
            >
              <EditSlot category={c} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

function ProjectCard({ p, wide }: { p: Project; wide: boolean }) {
  return (
    <Link href={`/work/${p.slug}`} className="group block">
      <div className={`relative overflow-hidden bg-graphite ${wide ? "aspect-[16/8]" : "aspect-[4/3]"}`}>
        <Image
          src={p.thumbnail.src}
          alt={p.thumbnail.alt}
          fill
          sizes={wide ? "100vw" : "50vw"}
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
        />
        {p.previewVideo && (
          <video
            src={p.previewVideo}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
            onMouseLeave={(e) => e.currentTarget.pause()}
          />
        )}
        <span className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-ivory px-4 py-2 text-sm font-medium text-graphite opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:translate-y-2">
          View Project <span aria-hidden>→</span>
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-6">
        <div>
          <h3 className="font-display text-2xl font-semibold tracking-tight">{p.title}</h3>
          <p className="mt-1 max-w-lg text-[15px] text-graphite/65">{p.summary}</p>
        </div>
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-red-ink">{p.category}</span>
      </div>
    </Link>
  );
}

function EditSlot({ category }: { category: ProjectCategory }) {
  const svc = services.find((s) => s.category === category)!;
  return (
    <Link
      href={svc.href}
      className="grain group relative flex h-full flex-col justify-between overflow-hidden border border-graphite/15 bg-paper p-6 transition-colors hover:border-graphite/40 sm:p-8"
    >
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/65">
        <span>
          Reel {svc.no} · {category}
        </span>
        <span className="flex items-center gap-2">
          <span className="animate-rec size-1.5 rounded-full bg-red" aria-hidden /> In the edit
        </span>
      </div>
      <div className="my-6 flex justify-center">
        <Etching
          name={SLOT_ART[category]}
          className="h-40 w-auto transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 sm:h-48"
          sizes="400px"
        />
      </div>
      <div className="flex items-end justify-between gap-4 border-t border-graphite/15 pt-5">
        <div>
          <p className="font-display text-xl font-semibold tracking-tight">{svc.name} case studies are being prepared.</p>
          <p className="mt-1 text-sm text-graphite/70">See what this service covers in the meantime.</p>
        </div>
        <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full border border-graphite/25 transition-all duration-500 group-hover:border-red group-hover:bg-red group-hover:text-white">
          →
        </span>
      </div>
    </Link>
  );
}
