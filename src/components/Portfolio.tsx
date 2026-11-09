"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { portfolio, type PortfolioItem } from "@/content/portfolio";
import { services, type ServiceSlug } from "@/content/site";
import { Glyph } from "./Glyph";
import { embedUrl } from "@/lib/media";

type Entry = PortfolioItem & { service: ServiceSlug };

const all = (): Entry[] =>
  services.flatMap((s) => portfolio[s.slug].map((p) => ({ ...p, service: s.slug })));

/**
 * Portfolio grid. Pass `service` for a single service's work (service pages),
 * or leave it out for everything with filter tabs (Home, Work). Projects open
 * in a lightbox that plays video (mp4, YouTube, Vimeo) or shows images.
 */
export function Portfolio({ service, filters = false, limit }: { service?: ServiceSlug; filters?: boolean; limit?: number }) {
  const [filter, setFilter] = useState<ServiceSlug | "all">(service ?? "all");
  const [open, setOpen] = useState<Entry | null>(null);
  const reduce = useReducedMotion();

  const items = all().filter((p) => filter === "all" || p.service === filter).slice(0, limit);
  // With nothing published yet, show three slots for the active service(s).
  const slotServices: ServiceSlug[] =
    items.length > 0 ? [] : filter === "all" ? services.slice(0, 3).map((s) => s.slug) : [filter, filter, filter];

  return (
    <div>
      {filters && !service && (
        <div role="tablist" aria-label="Filter work" className="mb-8 flex flex-wrap gap-2">
          {[{ slug: "all" as const, workLabel: "All" }, ...services].map((s) => (
            <button
              key={s.slug}
              role="tab"
              aria-selected={filter === s.slug}
              onClick={() => setFilter(s.slug)}
              className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                filter === s.slug ? "border-blue text-white" : "border-graphite/20 text-graphite hover:border-graphite/50"
              }`}
            >
              {filter === s.slug && (
                <motion.span layoutId="work-filter" className="absolute inset-0 rounded-full bg-blue" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
              )}
              <span className="relative">
                {s.workLabel}{" "}
                <span className="opacity-60">({s.slug === "all" ? all().length : portfolio[s.slug].length})</span>
              </span>
            </button>
          ))}
        </div>
      )}

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((p, i) => (
            <motion.li
              key={`${p.service}-${p.title}`}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            >
              <Card p={p} onOpen={() => setOpen(p)} />
            </motion.li>
          ))}
          {slotServices.map((slug, i) => (
            <motion.li
              key={`slot-${filter}-${i}`}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Slot slug={slug} index={i} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <Lightbox item={open} onClose={() => setOpen(null)} />
    </div>
  );
}

function Card({ p, onOpen }: { p: Entry; onOpen: () => void }) {
  const svc = services.find((s) => s.slug === p.service)!;
  return (
    <button type="button" onClick={onOpen} className="group block w-full text-left">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-graphite/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.cover}
          alt={p.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
        />
        {p.video && (
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-16 place-items-center rounded-full bg-white/90 text-blue shadow-lg transition-transform duration-500 group-hover:scale-110">
              <svg viewBox="0 0 20 20" className="ml-1 size-5" fill="currentColor" aria-hidden>
                <path d="M5 3l12 7-12 7z" />
              </svg>
            </span>
          </span>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-graphite">{svc.workLabel}</span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold tracking-tight">{p.title}</h3>
          <p className="text-sm text-graphite/70">{[svc.workLabel, p.client].filter(Boolean).join(" · ")}</p>
        </div>
        <span aria-hidden className="mt-1 text-graphite/50 transition-all duration-500 group-hover:translate-x-1 group-hover:text-red-ink">
          →
        </span>
      </div>
    </button>
  );
}

function Slot({ slug, index }: { slug: ServiceSlug; index: number }) {
  const svc = services.find((s) => s.slug === slug)!;
  return (
    <div className="group">
      <div className="relative flex aspect-video flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-graphite/15 bg-white/60 text-blue/25 transition-colors hover:border-blue/30 hover:text-blue/40">
        <Glyph slug={slug} className="w-28 opacity-40" />
        <span className="absolute left-4 top-4 text-xs font-medium uppercase tracking-[0.14em] text-graphite/60">{svc.workLabel}</span>
      </div>
      <div className="mt-4">
        <p className="font-display text-lg font-semibold tracking-tight text-graphite/70">Project {String(index + 1).padStart(2, "0")}</p>
        <p className="text-sm text-graphite/60">Coming soon</p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Featured */

/** The large featured project on Home (first item marked `featured`). Hidden when none. */
export function FeaturedProject() {
  const [open, setOpen] = useState<Entry | null>(null);
  const f = all().find((p) => p.featured);
  if (!f) return null;
  const svc = services.find((s) => s.slug === f.service)!;
  return (
    <>
      <button type="button" onClick={() => setOpen(f)} className="group mb-14 grid w-full items-center gap-8 text-left lg:grid-cols-12">
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-graphite/10 lg:col-span-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={f.cover} alt={f.title} className="size-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
        </div>
        <div className="lg:col-span-4">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-red-ink">Featured · {svc.workLabel}</p>
          <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight">{f.title}</h3>
          {f.client && <p className="mt-1 text-graphite/70">{f.client}</p>}
          {f.description && <p className="mt-4 text-[15px] leading-relaxed text-graphite/75">{f.description}</p>}
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue">
            {f.video ? "Watch" : "View project"} <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </button>
      <Lightbox item={open} onClose={() => setOpen(null)} />
    </>
  );
}

/* --------------------------------------------------------------- Lightbox */


function Lightbox({ item, onClose }: { item: Entry | null; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const images = item ? [item.cover, ...(item.images ?? [])] : [];

  useEffect(() => {
    setIdx(0);
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + images.length) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-graphite/90 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-5xl"
            initial={{ y: 24, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
              {item.video ? (
                embedUrl(item.video) ? (
                  <iframe src={embedUrl(item.video)!} title={item.title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="size-full" />
                ) : (
                  <video src={item.video} poster={item.cover} controls autoPlay playsInline className="size-full object-contain" />
                )
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={images[idx]} alt={`${item.title} — image ${idx + 1}`} className="size-full object-contain" />
                  {images.length > 1 && (
                    <>
                      <button aria-label="Previous image" onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-graphite">
                        ←
                      </button>
                      <button aria-label="Next image" onClick={() => setIdx((i) => (i + 1) % images.length)} className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-graphite">
                        →
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="mt-5 flex flex-wrap items-start justify-between gap-4 text-white">
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-1 text-sm text-white/70">{[item.client, item.year].filter(Boolean).join(" · ")}</p>
                {item.description && <p className="mt-3 max-w-2xl text-[15px] text-white/80">{item.description}</p>}
              </div>
              <div className="flex gap-3">
                {item.url && (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-red px-5 py-2.5 text-sm font-medium text-white">
                    Visit ↗
                  </a>
                )}
                <button onClick={onClose} className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-medium">
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
