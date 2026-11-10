"use client";

/**
 * AQRO wrappers around the React Bits components (src/components/reactbits).
 * Brand colours and content wiring live here so pages stay simple.
 */
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import Silk from "./reactbits/Silk";
import SpecularButton from "./reactbits/SpecularButton";
import BlurText from "./reactbits/BlurText";
import SpotlightCard from "./reactbits/SpotlightCard";
import FlexCarousel from "./reactbits/FlexCarousel";
import TearTicket from "./reactbits/TearTicket";
import Prism from "./reactbits/Prism";
import ReflectiveCard from "./reactbits/ReflectiveCard";
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

/**
 * Primary CTA: a solid AQRO-red pill with a specular light that runs along its
 * edge and follows the cursor (React Bits SpecularButton). The name is kept so
 * every existing call site picks up the new effect.
 */
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
    <SpecularButton
      as={Link}
      href={href}
      size={size}
      radius={999}
      tint={BRAND.red}
      tintOpacity={1}
      textColor="#FFFFFF"
      lineColor="#FFFFFF"
      baseColor="#FF8A8F"
      intensity={1.1}
      idleIntensity={0.45}
      shineSize={12}
      shineFade={38}
      thickness={1.4}
      glow={1}
      proximity={220}
      followMouse
      className={`group aqro-cta ${size === "sm" ? "!px-5 !py-2.5 !text-sm" : "!px-6 !py-3.5 !text-[15px]"} ${className}`}
    >
      <span>{children}</span>
      <svg aria-hidden viewBox="0 0 20 20" className="size-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 10h11M11 5l5 5-5 5" />
      </svg>
    </SpecularButton>
  );
}

/* ------------------------------------------------------------- BlurText */

/** Home hero headline: words blur into focus on load, second line a beat later. */
export function HeroHeadline({ lead, accent, className = "" }: { lead: string; accent: string; className?: string }) {
  return (
    <h1 className={className}>
      <BlurText as="span" text={lead} trigger="load" animateBy="words" direction="top" delay={110} stepDuration={0.4} blur={12} distance={40} />
      <BlurText
        as="span"
        text={accent}
        trigger="load"
        animateBy="words"
        direction="top"
        delay={110}
        stepDuration={0.4}
        blur={12}
        distance={40}
        startDelay={0.35}
        className="text-white/55"
      />
    </h1>
  );
}

/* --------------------------------------------------------- SpotlightCard */

/** A soft blue spotlight that follows the cursor behind a transparent PNG. */
export function SpotlightFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <SpotlightCard
      theme="dark"
      spotlightColor="#BBD3FF"
      intensity={0.42}
      spotlightSize={300}
      softness={0.85}
      borderGlow={0.9}
      proximity={140}
      smoothing={0.35}
      grain={0.15}
      ambient
      flare
      className={`!rounded-[2rem] !p-5 sm:!p-6 ${className}`}
      style={
        {
          "--spotlight-card-surface": "rgba(255,255,255,0.03)",
          "--spotlight-card-border": "rgba(255,255,255,0.12)",
          "--spotlight-card-shadow": "0 40px 80px -40px rgba(0,10,40,0.6)",
        } as React.CSSProperties
      }
    >
      {children}
    </SpotlightCard>
  );
}

/* --------------------------------------------------------- FlexCarousel */

/** Web development hero backdrop: a row of website work bending through invisible glass. */
export function WebFlexBackdrop() {
  const items = useMemo(() => {
    const real = portfolio["web-development"].map((p) => ({ src: p.cover, alt: p.title, title: p.title }));
    const samples = PLACEHOLDERS.map((src, i) => ({ src, alt: `Sample project ${i + 1}`, title: `Sample ${i + 1}` }));
    return real.length >= 6 ? real : [...real, ...samples];
  }, []);
  return (
    <FlexCarousel
      items={items}
      preset="liquid"
      intro="rise"
      fit="portrait"
      cardHeight={0.48}
      gap={14}
      radius={14}
      squeeze={0.2}
      autoplay
      interval={3.2}
      captions={false}
      focusOnClick={false}
      captureWheel={false}
    />
  );
}

/* ----------------------------------------------------------- TearTicket */

/** AI video hero: a cinema ticket whose stub tears off. It comes back after a moment so it can be torn again. */
export function PremiereTicket() {
  const [torn, setTorn] = useState(false);
  useEffect(() => {
    if (!torn) return;
    const id = window.setTimeout(() => setTorn(false), 3800);
    return () => window.clearTimeout(id);
  }, [torn]);
  return (
    <div className="flex flex-col items-center">
      <TearTicket
        torn={torn}
        onTear={() => setTorn(true)}
        image="/placeholders/creative-03.svg"
        imageAlt=""
        scrim
        imageRadius={10}
        orientation="horizontal"
        width={470}
        height={260}
        stubSize={150}
        radius={18}
        holes={12}
        holeSize={6}
        notch={4}
        rotate={-4}
        tilt
        tiltMax={10}
        tiltReach={320}
        parallax={8}
        background="#F5F1E8"
        stubBackground="#ED1C24"
        color="#292929"
        borderColor="rgba(41,41,41,0.18)"
        recenter
        ariaLabel="Tear off the ticket stub"
        stub={
          <div className="flex h-full flex-col justify-between p-5 text-white">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/80">Admit one</span>
            <div>
              <p className="font-display text-xl font-semibold leading-tight tracking-tight">Premiere</p>
              <p className="mt-1 text-xs text-white/80">Row A · Seat 01</p>
            </div>
            <span className="font-mono text-[11px] tracking-wider text-white/80">No. 000284</span>
          </div>
        }
      >
        <div className="flex h-full flex-col justify-end p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-graphite/70">AQRO Pictures presents</p>
          <p className="mt-1 font-display text-2xl font-semibold leading-none tracking-tight">Stories without limits</p>
        </div>
      </TearTicket>
      <p className="mt-6 text-sm text-white/55" aria-hidden>
        {torn ? "Enjoy the show." : "Drag the red stub to tear your ticket."}
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- Prism */

/** App development hero backdrop: a slowly turning prism of light. */
export function PrismBackdrop() {
  // Sit the prism in the right half on wide screens so the copy stays clear.
  const [shift, setShift] = useState(0);
  useEffect(() => {
    const update = () => setShift(window.innerWidth >= 1024 ? Math.round(window.innerWidth * 0.17) : 0);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return (
    <Prism
      offset={{ x: shift, y: 0 }}
      animationType="rotate"
      timeScale={0.4}
      height={3.5}
      baseWidth={5.5}
      scale={2.6}
      hueShift={0}
      colorFrequency={1}
      glow={1.5}
      saturation={1.5}
      noise={0}
      interactive
      hoverStrength={2}
      inertia={0.05}
      resolution={0.5}
    />
  );
}

/* ------------------------------------------------------- ReflectiveCard */

/** Metal ID card for a founder. Placeholder copy until founders are added in content/data.ts. */
export function FounderCard({ name, role, index }: { name: string; role: string; index: number }) {
  return (
    <ReflectiveCard
      name={name}
      role={role}
      badge="AQRO"
      status="Founder"
      statusColor={BRAND.red}
      idLabel="Member no."
      idValue={`AQ-${String(index + 1).padStart(2, "0")} · 2026`}
      theme="dark"
      tint="#D6E4FF"
      metalness={1}
      roughness={0.3}
      blurStrength={6}
      shine={1}
      glare={0.5}
      enableTilt
      tiltStrength={12}
      width={300}
      height={440}
      radius={24}
    />
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
