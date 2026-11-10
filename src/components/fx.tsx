"use client";

/**
 * AQRO wrappers around the React Bits components (src/components/reactbits).
 * Brand colours and content wiring live here so pages stay simple.
 */
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import Silk from "./reactbits/Silk";
import StarBorder from "./reactbits/StarBorder";
import LogoLoop, { type LogoItem } from "./reactbits/LogoLoop";
import DriftWall from "./reactbits/DriftWall";
import DepthCarousel from "./reactbits/DepthCarousel";
import { clients } from "@/content/data";
import { portfolio, type PortfolioItem } from "@/content/portfolio";
import { Lightbox } from "./Portfolio";
import { Mark } from "./ui";

export const BRAND = {
  blue: "#004AAD",
  red: "#ED1C24",
  navy: "#001A40",
  sky: "#5B9BFF",
};

/* ------------------------------------------------------------------ Silk */

/** Flowing silk fabric behind a dark section. Parent must be `relative`. */
export function SilkBackdrop({ tone = "blue", className = "" }: { tone?: "blue" | "deep"; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <Silk
        color={tone === "blue" ? "#1E63D6" : "#164FB0"}
        sheenColor="#BBD3FF"
        speed={3.2}
        scale={1.1}
        rotation={0.35}
        sheen={0.55}
        depth={0.6}
        glow={0.35}
        noiseIntensity={1.1}
        mouseInteraction
        clickRipple={false}
      />
    </div>
  );
}

/* ------------------------------------------------------------ StarButton */

/** Red pill CTA with a white star travelling around its border. */
export function StarButton({
  href,
  children,
  size = "md",
  className = "",
}: {
  href: string;
  children: ReactNode;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <StarBorder
      as={Link}
      href={href}
      color="#FFFFFF"
      trailColor="#FFB3B6"
      backgroundColor={BRAND.red}
      textColor="#FFFFFF"
      borderColor="rgba(255,255,255,0.28)"
      radius={999}
      thickness={1.5}
      duration={3.6}
      glow={0.75}
      sparkle
      hover="lap"
      className={`group aqro-star ${size === "sm" ? "!px-5 !py-2.5 !text-sm" : "!px-6 !py-3.5 !text-[15px]"} ${className}`}
    >
      <span>{children}</span>
      <svg aria-hidden viewBox="0 0 20 20" className="size-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 10h11M11 5l5 5-5 5" />
      </svg>
    </StarBorder>
  );
}

/* -------------------------------------------------------------- LogoLoop */

/** Past clients marquee. Shows tidy placeholder slots until logos are added in content/data.ts. */
export function ClientLoop({ light = false }: { light?: boolean }) {
  const logos: LogoItem[] = useMemo(() => {
    if (clients.length) return clients.map((c) => ({ src: c.logo, alt: c.name, title: c.name }));
    return Array.from({ length: 8 }, (_, i) => ({
      title: `Client ${i + 1}`,
      node: (
        <span
          className={`inline-flex h-14 w-40 items-center justify-center gap-2 rounded-xl border border-dashed text-xs font-medium uppercase tracking-[0.18em] ${
            light ? "border-white/25 text-white/45" : "border-graphite/20 text-graphite/40"
          }`}
        >
          <Mark className="size-2" /> Logo
        </span>
      ),
    }));
  }, [light]);

  return (
    <LogoLoop
      logos={logos}
      speed={60}
      direction="left"
      logoHeight={clients.length ? 44 : 56}
      gap={clients.length ? 72 : 28}
      hoverSpeed={12}
      scaleOnHover={clients.length > 0}
      muted={clients.length ? 0.7 : 0}
      fadeOut
      fadeOutWidth={0.14}
      ariaLabel="Past clients"
    />
  );
}

/* ------------------------------------------------------------- Creatives */

const PLACEHOLDERS = Array.from({ length: 12 }, (_, i) => `/placeholders/creative-${String(i + 1).padStart(2, "0")}.svg`);

/** Real creatives when they exist, else the brand sample posters. */
function creativeImages() {
  const real = portfolio.creatives.flatMap((p) => [p.cover, ...(p.images ?? [])]);
  return real.length >= 6 ? real : [...real, ...PLACEHOLDERS];
}

/** Tilted, drifting wall of creatives — used as the Creatives hero backdrop. */
export function CreativeWall() {
  const items = useMemo(() => creativeImages().map((image) => ({ image })), []);
  return (
    <DriftWall
      items={items}
      columns={6}
      tileWidth={190}
      tileHeight={238}
      gap={18}
      radius={16}
      tilt={18}
      turn={-18}
      roll={-6}
      perspective={1100}
      depth={80}
      speed={26}
      variance={0.5}
      parallax={0.5}
      lift={56}
      fade={0.55}
      dim={0.7}
      overlayColor={BRAND.navy}
    />
  );
}

type Entry = PortfolioItem & { service: "creatives" };

/** Creative portfolio as a 3D depth stack. Clicking the front card opens the project. */
export function CreativeCarousel() {
  const projects: Entry[] = portfolio.creatives.map((p) => ({ ...p, service: "creatives" }));
  const usingSamples = projects.length === 0;
  const items = usingSamples
    ? PLACEHOLDERS.slice(0, 7).map((image, i) => ({ image, alt: `Sample creative ${i + 1}` }))
    : projects.map((p) => ({ image: p.cover, alt: p.title }));
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<Entry | null>(null);
  const current = projects[active];

  return (
    <div>
      <div className="relative h-[520px] sm:h-[600px]">
        <DepthCarousel
          items={items}
          cardWidth={340}
          cardHeight={425}
          radius={22}
          tint={BRAND.navy}
          depth={200}
          spread={95}
          tilt={22}
          tiltDirection="right"
          perspective={1400}
          visibleCards={4}
          falloff={0.2}
          blur={5}
          autoplay
          autoplayDelay={3400}
          loop
          onChange={(i) => setActive(i)}
          onActiveClick={usingSamples ? undefined : (i) => setOpen(projects[i])}
        />
      </div>
      <div className="mt-6 flex min-h-14 flex-wrap items-end justify-between gap-4 text-white">
        {usingSamples ? (
          <p className="text-sm text-white/60">Sample artwork — your creative projects appear here once added.</p>
        ) : (
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight">{current?.title}</p>
            <p className="text-sm text-white/65">{[current?.client, current?.year].filter(Boolean).join(" · ")}</p>
          </div>
        )}
        <p className="font-display text-sm tabular-nums text-white/60">
          {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
      </div>
      <Lightbox item={open} onClose={() => setOpen(null)} />
    </div>
  );
}
