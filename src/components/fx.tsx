"use client";

/**
 * AQRO wrappers around the React Bits components (src/components/reactbits).
 * Brand colours and content wiring live here so pages stay simple.
 */
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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
import TiltedCard from "./reactbits/TiltedCard";
import BounceCards from "./reactbits/BounceCards";
import Beams from "./reactbits/Beams";
import GradientASCII from "./reactbits/GradientASCII";
import { Glyph } from "./Glyph";
import { services } from "@/content/site";

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

/* --------------------------------------------------------- ParallaxImage */

/** Image that subtly moves in the direction of the cursor — adds life to the hero goddess figure. */
export function ParallaxImage({
  src,
  alt,
  width,
  height,
  className = "",
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  caption?: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const MAX_SHIFT = 14;

    const onMove = (e: PointerEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetRef.current.x = ((e.clientX - cx) / cx) * MAX_SHIFT;
      targetRef.current.y = ((e.clientY - cy) / cy) * MAX_SHIFT;
    };

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const img = imgRef.current;
      if (!img) return;
      const LERP = 0.06;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * LERP;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * LERP;
      img.style.transform = `translate(${currentRef.current.x.toFixed(2)}px, ${currentRef.current.y.toFixed(2)}px)`;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        fetchPriority={"high" as "high"}
        className={className}
        draggable={false}
      />
      {caption}
    </div>
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

/* --------------------------------------------------------- ServiceTiltedCards */

const SERVICE_THEMES: Record<
  string,
  {
    bg: string;
    border: string;
    glareColor: string;
    tagBg: string;
    tagText: string;
    badge: string;
  }
> = {
  creatives: {
    bg: "linear-gradient(145deg, #1A0507 0%, #B8141B 50%, #ED1C24 100%)",
    border: "rgba(237, 28, 36, 0.4)",
    glareColor: "#FFA4A7",
    tagBg: "rgba(255, 255, 255, 0.18)",
    tagText: "#FFFFFF",
    badge: "#ED1C24",
  },
  "ai-video-production": {
    bg: "linear-gradient(145deg, #0A0A0C 0%, #1F1F24 55%, #33333D 100%)",
    border: "rgba(255, 255, 255, 0.2)",
    glareColor: "#FFFFFF",
    tagBg: "rgba(237, 28, 36, 0.25)",
    tagText: "#FFA4A7",
    badge: "#ED1C24",
  },
  "app-development": {
    bg: "linear-gradient(145deg, #02122B 0%, #003680 50%, #004AAD 100%)",
    border: "rgba(91, 155, 255, 0.35)",
    glareColor: "#BBD3FF",
    tagBg: "rgba(255, 255, 255, 0.16)",
    tagText: "#FFFFFF",
    badge: "#5B9BFF",
  },
  "web-development": {
    bg: "linear-gradient(145deg, #072552 0%, #0E4EAB 50%, #3B86F7 100%)",
    border: "rgba(91, 155, 255, 0.45)",
    glareColor: "#E0ECFF",
    tagBg: "rgba(255, 255, 255, 0.2)",
    tagText: "#FFFFFF",
    badge: "#5B9BFF",
  },
};

/** Four interactive tilted cards matching each service's distinct colors with animated Silk effect background. */
export function ServiceTiltedCards() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((sv, i) => {
        const theme = SERVICE_THEMES[sv.slug] ?? SERVICE_THEMES["app-development"];
        return (
          <li key={sv.slug} className="flex flex-col items-center">
            <Link href={sv.href} className="group block w-full focus:outline-none">
              <TiltedCard
                containerHeight="420px"
                containerWidth="100%"
                imageHeight="400px"
                imageWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.04}
                glare={0.45}
                glareColor={theme.glareColor}
                shadow={0.55}
                radius={24}
                intro
                introDelay={i * 80}
                showTooltip={false}
              >
                <div
                  className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[24px] p-6 text-white transition-all duration-300"
                  style={{
                    background: theme.bg,
                    boxShadow: `inset 0 0 0 1px ${theme.border}`,
                  }}
                >
                  {/* React Bits Silk effect background */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px] opacity-35 mix-blend-screen"
                  >
                    <Silk
                      color={
                        sv.slug === "creatives"
                          ? "#ED1C24"
                          : sv.slug === "ai-video-production"
                          ? "#6B6B78"
                          : sv.slug === "app-development"
                          ? "#004AAD"
                          : "#0E4EAB"
                      }
                      sheenColor={
                        sv.slug === "creatives"
                          ? "#FFA4A7"
                          : sv.slug === "ai-video-production"
                          ? "#FFFFFF"
                          : sv.slug === "app-development"
                          ? "#BBD3FF"
                          : "#E0ECFF"
                      }
                      speed={2.4}
                      scale={1.2}
                      rotation={0.4}
                      sheen={0.65}
                      depth={0.65}
                      glow={0.4}
                      noiseIntensity={0.8}
                      mouseInteraction={false}
                    />
                  </div>

                  {/* Top Bar */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-display text-sm font-bold tracking-widest text-white/70">
                      {sv.no}
                    </span>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-semibold backdrop-blur-md"
                      style={{ background: theme.tagBg, color: theme.tagText }}
                    >
                      {sv.workLabel}
                    </span>
                  </div>

                  {/* Centered Service Glyph */}
                  <div className="relative z-10 my-auto flex items-center justify-center py-4">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute size-36 rounded-full blur-2xl"
                      style={{ background: theme.badge, opacity: 0.28 }}
                    />
                    <Glyph
                      slug={sv.slug}
                      tone="silver"
                      className="relative max-h-32 w-auto max-w-[70%] drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Bottom Info */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-xl font-bold tracking-tight text-white group-hover:text-white sm:text-2xl">
                        {sv.name}
                      </h3>
                      <span
                        aria-hidden
                        className="translate-x-0 font-display text-lg text-white/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
                      >
                        →
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/75 sm:text-[13px]">
                      {sv.short}
                    </p>
                  </div>
                </div>
              </TiltedCard>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/* -------------------------------------------------------- ScrollBounceCards */

/** Sequential scroll-revealed BounceCards showcasing Aqro deliverables in the How We Work section. */
export function ScrollBounceCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const images = [
    { src: "/placeholders/creative-01.svg", alt: "Brand strategy & identity design" },
    { src: "/portfolio/app-development/app-screen-1.svg", alt: "Fintech & wealth mobile application" },
    { src: "/placeholders/creative-03.svg", alt: "AI cinema & cinematic narrative frame" },
    { src: "/portfolio/app-development/app-screen-3.svg", alt: "AI studio director application interface" },
    { src: "/placeholders/creative-05.svg", alt: "Multi-platform rollout & visual delivery" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[340px] w-full max-w-[560px] items-center justify-center overflow-visible"
    >
      {inView ? (
        <BounceCards
          images={images}
          containerWidth={520}
          containerHeight={320}
          cardSize={180}
          spread={72}
          rotation={12}
          arc={14}
          pushDistance={140}
          hoverScale={1.08}
          bounciness={0.65}
          animationDelay={0.25}
          animationStagger={0.14}
          borderWidth={3}
          borderColor="rgba(255, 255, 255, 0.25)"
          cardRadius={20}
          enableHover
        />
      ) : (
        <div className="h-[320px] w-[520px]" />
      )}
    </div>
  );
}

/* --------------------------------------------------- GradientASCIIBackdrop */

/** Gradient ASCII art canvas for the app development hero background. */
export function GradientASCIIBackdrop({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <GradientASCII
        colors={["#001A40", "#004AAD", "#5B9BFF", "#D6E4FF"]}
        shape="horizon"
        characters=" =+xX0S8#@"
        cellSize={16}
        density={0.8}
        glyphOpacity={0.7}
        glow={0.35}
        softness={0.65}
        scale={1.15}
        flow={0.5}
        speed={0.7}
        gradientOpacity={0.85}
        grain={0.06}
        mouseInteraction={true}
        intro={true}
      />
    </div>
  );
}

/* ------------------------------------------------------------ AppMockup */

const DEFAULT_APP_SCREENS = [
  "/portfolio/app-development/app-screen-1.svg",
  "/portfolio/app-development/app-screen-2.svg",
  "/portfolio/app-development/app-screen-3.svg",
  "/portfolio/app-development/app-screen-4.svg",
];

/**
 * Interactive iPhone screen mockup displaying application UI in a smooth carousel.
 * Pulls uploaded UI screens from portfolio['app-development'] or defaults to AQRO app designs.
 */
export function AppMockup() {
  const [current, setCurrent] = useState(0);

  const screens = useMemo(() => {
    const realScreens = portfolio["app-development"].flatMap((p) => [
      p.cover,
      ...(p.images ?? []),
    ]);
    return realScreens.length > 0 ? realScreens : DEFAULT_APP_SCREENS;
  }, []);

  useEffect(() => {
    if (screens.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % screens.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [screens.length]);

  return (
    <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[340px]">
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-[3.5rem] bg-gradient-to-b from-blue/30 to-sky/20 blur-2xl"
      />

      {/* iPhone Body */}
      <div className="relative overflow-hidden rounded-[3rem] border-[9px] border-[#1C1F26] bg-[#0E1116] p-1 shadow-[0_30px_70px_-15px_rgba(0,10,40,0.6)] ring-1 ring-white/10">
        {/* Dynamic Island / Speaker notch */}
        <div className="absolute left-1/2 top-4 z-30 h-6 w-28 -translate-x-1/2 rounded-full bg-black">
          <div className="absolute right-4 top-2 size-2 rounded-full bg-black/60 ring-1 ring-white/10" />
        </div>

        {/* Screen Display */}
        <div
          className="relative aspect-[9/19] w-full overflow-hidden rounded-[2.3rem] bg-black"
          style={{ minHeight: "560px" }}
        >
          {screens.map((src, i) => (
            <div
              key={src + i}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{
                opacity: i === current ? 1 : 0,
                pointerEvents: i === current ? "auto" : "none",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`AQRO App UI Screen ${i + 1}`}
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          ))}

          {/* Swipe / Click overlay buttons */}
          <button
            type="button"
            onClick={() =>
              setCurrent((prev) => (prev - 1 + screens.length) % screens.length)
            }
            className="absolute inset-y-0 left-0 z-20 w-1/4 cursor-w-resize bg-transparent"
            aria-label="Previous screen"
          />
          <button
            type="button"
            onClick={() => setCurrent((prev) => (prev + 1) % screens.length)}
            className="absolute inset-y-0 right-0 z-20 w-1/4 cursor-e-resize bg-transparent"
            aria-label="Next screen"
          />

          {/* Home indicator bar */}
          <div className="pointer-events-none absolute bottom-2 left-1/2 z-20 h-1 w-32 -translate-x-1/2 rounded-full bg-white/40" />
        </div>
      </div>

      {/* Carousel Dots Navigation */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {screens.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-7 bg-blue" : "w-2 bg-graphite/30 hover:bg-graphite/50"
            }`}
            aria-label={`Show screen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------- AboutBeamsBackdrop */

/** Full-width glowing Beams backdrop for the About page hero with Aqro brand colors. */
export function AboutBeamsBackdrop({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <Beams
        color="#5B9BFF"
        backgroundColor="#001A40"
        beamWidth={140}
        rotation={35}
        speed={1.2}
        waveLength={260}
        depth={1.1}
        sharpness={0.7}
        brightness={1.7}
        glow={0.7}
        opacity={0.85}
        mouseInteraction
      />
    </div>
  );
}
