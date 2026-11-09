"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLenis } from "lenis/react";
import { ensureGSAP, gsap, ScrollTrigger } from "@/lib/gsap";

export interface StoryAct {
  id: string;
  selector: string;
  number: string;
  act: string;
  title: string;
  label: string;
}

export const STORY_ACTS: StoryAct[] = [
  {
    id: "act-spark",
    selector: "#act-spark",
    number: "01",
    act: "Act I",
    title: "The Spark",
    label: "Act I · The Spark",
  },
  {
    id: "act-alchemy",
    selector: "#act-alchemy",
    number: "02",
    act: "Act II",
    title: "The Alchemy",
    label: "Act II · The Alchemy",
  },
  {
    id: "act-crafts",
    selector: "#act-crafts",
    number: "03",
    act: "Act III",
    title: "Four Crafts",
    label: "Act III · Four Crafts",
  },
  {
    id: "act-blueprint",
    selector: "#act-blueprint",
    number: "04",
    act: "Act IV",
    title: "Blueprint",
    label: "Act IV · Blueprint",
  },
  {
    id: "act-invitation",
    selector: "#act-invitation",
    number: "05",
    act: "Act V",
    title: "Invitation",
    label: "Act V · Invitation",
  },
];

export interface StoryProgressHUDProps {
  acts?: StoryAct[];
  offset?: number;
  duration?: number;
  className?: string;
}

/**
 * Floating editorial Chapter Navigation HUD on the right edge of the desktop viewport.
 * Tracks which of the 5 Story Acts is currently in view and smoothly scrolls via `lenis.scrollTo`.
 */
export function StoryProgressHUD({
  acts = STORY_ACTS,
  offset = -64,
  duration = 1.2,
  className = "",
}: StoryProgressHUDProps) {
  const lenis = useLenis();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [railExpanded, setRailExpanded] = useState(false);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const velocityDotRef = useRef<HTMLSpanElement>(null);

  const updateActiveChapter = useCallback(() => {
    if (typeof window === "undefined") return;
    const viewportTrigger = window.innerHeight * 0.42;

    let currentIdx = 0;
    for (let i = 0; i < acts.length; i++) {
      const el = document.querySelector<HTMLElement>(acts[i].selector);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= viewportTrigger) {
        currentIdx = i;
      }
    }
    setActiveIndex((prev) => (prev !== currentIdx ? currentIdx : prev));
  }, [acts]);

  // Subscribe to Lenis scroll frames for O(1) progress & velocity glow (zero DOM layout reads per frame)
  useLenis(({ progress, velocity }) => {
    if (progressFillRef.current) {
      const clamped = gsap.utils.clamp(0, 1, progress);
      progressFillRef.current.style.transform = `scaleY(${clamped.toFixed(4)})`;
    }
    if (velocityDotRef.current) {
      const speed = Math.min(Math.abs(velocity), 18);
      const scale = 1 + (speed / 18) * 0.55;
      velocityDotRef.current.style.transform = `scale(${scale.toFixed(3)})`;
    }
  });

  // Register GSAP ScrollTriggers per chapter so active chapter index updates without per-frame layout reflows
  useEffect(() => {
    ensureGSAP();
    updateActiveChapter();

    const triggers: ScrollTrigger[] = [];
    acts.forEach((act, index) => {
      const el = document.querySelector<HTMLElement>(act.selector);
      if (!el) return;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 48%",
        end: "bottom 48%",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
      triggers.push(st);
    });

    window.addEventListener("resize", updateActiveChapter, { passive: true });
    return () => {
      triggers.forEach((t) => t.kill());
      window.removeEventListener("resize", updateActiveChapter);
    };
  }, [acts, updateActiveChapter]);

  const handleScrollToAct = (act: StoryAct, index: number) => {
    setActiveIndex(index);
    if (lenis) {
      lenis.scrollTo(act.selector, {
        offset,
        duration,
      });
      return;
    }
    const target = document.querySelector<HTMLElement>(act.selector);
    if (target) {
      const top =
        target.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const activeAct = acts[activeIndex] ?? acts[0];

  return (
    <aside
      aria-label="Story chapter navigation"
      onMouseEnter={() => setRailExpanded(true)}
      onMouseLeave={() => {
        setRailExpanded(false);
        setHoveredIndex(null);
      }}
      className={`fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end select-none ${className}`}
    >
      <div
        className={`group relative flex flex-col items-end rounded-2xl border border-graphite/12 bg-paper/85 backdrop-blur-md shadow-[0_14px_40px_-14px_rgba(0,0,0,0.16)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          railExpanded ? "px-3.5 py-3.5" : "px-2.5 py-3"
        }`}
      >
        {/* Top film-strip header */}
        <div className="mb-2.5 flex w-full items-center justify-between gap-3 border-b border-graphite/10 pb-2">
          <div className="flex items-center gap-1.5">
            <span
              ref={velocityDotRef}
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-red transition-transform duration-150"
            />
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-graphite/55">
              {railExpanded ? "AQRO · REEL" : activeAct.number}
            </span>
          </div>
          {railExpanded && (
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-blue font-semibold">
              {activeAct.number} / 0{acts.length}
            </span>
          )}
        </div>

        {/* Vertical film-strip track & chapter buttons */}
        <div className="relative flex flex-col gap-1.5">
          {/* Continuous vertical film-strip spine */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-[13px] top-3 bottom-3 w-[1.5px] bg-graphite/12 overflow-hidden rounded-full"
          >
            <div
              ref={progressFillRef}
              className="h-full w-full origin-top scale-y-0 bg-gradient-to-b from-blue via-blue to-red transition-transform duration-150"
            />
          </div>

          {acts.map((act, index) => {
            const isActive = index === activeIndex;
            const isHovered = index === hoveredIndex;
            const showLabel = railExpanded || isHovered;

            return (
              <button
                key={act.id}
                type="button"
                onClick={() => handleScrollToAct(act, index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onFocus={() => {
                  setRailExpanded(true);
                  setHoveredIndex(index);
                }}
                aria-label={`Jump to ${act.label}`}
                aria-current={isActive ? "step" : undefined}
                className={`relative z-10 flex items-center justify-end gap-2.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer ${
                  showLabel ? "pl-3 pr-1.5 py-1" : "p-1"
                } ${
                  isActive
                    ? "bg-blue/8 text-blue"
                    : "text-graphite/60 hover:text-graphite hover:bg-graphite/5"
                }`}
              >
                {/* Expandable pill text */}
                <span
                  className={`overflow-hidden whitespace-nowrap text-right transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    showLabel
                      ? "max-w-[190px] opacity-100 translate-x-0"
                      : "max-w-0 opacity-0 translate-x-2"
                  }`}
                >
                  <span className="block font-display text-[11px] font-medium tracking-tight leading-none">
                    <span
                      className={
                        isActive
                          ? "text-red font-semibold"
                          : "text-graphite/50"
                      }
                    >
                      {act.act}
                    </span>
                    <span className="mx-1 text-graphite/35">·</span>
                    <span
                      className={
                        isActive
                          ? "text-graphite font-semibold"
                          : "text-graphite/80"
                      }
                    >
                      {act.title}
                    </span>
                  </span>
                </span>

                {/* Minimal film-strip node with 01..05 indicator */}
                <span
                  className={`relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-mono text-[9px] font-semibold tracking-tighter transition-all duration-300 ${
                    isActive
                      ? "border-blue bg-blue text-white shadow-[0_0_0_3px_rgba(0,74,173,0.16)] scale-105"
                      : isHovered
                        ? "border-red bg-red text-white scale-105"
                        : "border-graphite/20 bg-paper text-graphite/65"
                  }`}
                >
                  {act.number}
                </span>
              </button>
            );
          })}
        </div>

        {/* Film sprocket footer perforations */}
        <div
          aria-hidden
          className="mt-2.5 flex w-full items-center justify-between gap-1 border-t border-graphite/10 pt-2"
        >
          <span className="h-1 w-1 rounded-[1px] bg-graphite/25" />
          <span className="h-1 w-1 rounded-[1px] bg-graphite/25" />
          <span className="h-1 w-1 rounded-[1px] bg-red/60" />
          <span className="h-1 w-1 rounded-[1px] bg-graphite/25" />
          <span className="h-1 w-1 rounded-[1px] bg-graphite/25" />
        </div>
      </div>
    </aside>
  );
}

export interface VelocityRibbonProps {
  items?: string[];
  variant?: "paper" | "dark" | "blue";
  baseSpeed?: number;
  className?: string;
}

const DEFAULT_RIBBON_ITEMS = [
  "ACT I · THE SPARK",
  "CURIOSITY MEETS EXECUTION",
  "ACT II · THE ALCHEMY",
  "DESIGN × CODE × MOTION",
  "ACT III · FOUR CRAFTS",
  "ACT IV · BLUEPRINT",
  "ACT V · INVITATION",
];

/**
 * Scroll-velocity-reactive kinetic typography strip using `useLenis(({ velocity }) => ...)`
 * and GSAP `quickTo` to dynamically skew (`skewX`) and accelerate marquee velocity between chapters.
 */
export function VelocityRibbon({
  items = DEFAULT_RIBBON_ITEMS,
  variant = "paper",
  baseSpeed = 0.032,
  className = "",
}: VelocityRibbonProps) {
  const rootRibbonRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const skewLayerRef = useRef<HTMLDivElement>(null);
  const velocityReadoutRef = useRef<HTMLSpanElement>(null);

  const xPercentRef = useRef(0);
  const directionRef = useRef(-1);
  const boostProxyRef = useRef({ value: 0 });
  const skewToRef = useRef<gsap.QuickToFunc | null>(null);
  const boostToRef = useRef<gsap.QuickToFunc | null>(null);
  const inViewRef = useRef(true);

  useEffect(() => {
    ensureGSAP();
    if (!skewLayerRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const io =
      typeof IntersectionObserver !== "undefined" && rootRibbonRef.current
        ? new IntersectionObserver(
            ([entry]) => {
              inViewRef.current = entry ? entry.isIntersecting : true;
            },
            { rootMargin: "120px" }
          )
        : null;
    if (io && rootRibbonRef.current) {
      io.observe(rootRibbonRef.current);
    }

    skewToRef.current = gsap.quickTo(skewLayerRef.current, "skewX", {
      duration: 0.38,
      ease: "power3.out",
    });

    boostToRef.current = gsap.quickTo(boostProxyRef.current, "value", {
      duration: 0.45,
      ease: "power2.out",
    });

    const tick = (_time: number, deltaTime: number) => {
      if (!inViewRef.current || !trackRef.current) return;
      const dt = Math.min(deltaTime, 64) / 16.667;
      const step =
        (baseSpeed + boostProxyRef.current.value) * directionRef.current * dt;

      xPercentRef.current += step;
      if (xPercentRef.current <= -50) {
        xPercentRef.current += 50;
      } else if (xPercentRef.current > 0) {
        xPercentRef.current -= 50;
      }

      gsap.set(trackRef.current, { xPercent: xPercentRef.current });

      // Decay velocity boost smoothly back to 0 when user stops scrolling
      boostProxyRef.current.value *= 0.92;
      if (Math.abs(boostProxyRef.current.value) < 0.0005) {
        boostProxyRef.current.value = 0;
        skewToRef.current?.(0);
      }
    };

    gsap.ticker.add(tick);
    return () => {
      io?.disconnect();
      gsap.ticker.remove(tick);
    };
  }, [baseSpeed]);

  useLenis(({ velocity, direction }) => {
    if (!inViewRef.current) return;
    if (direction !== 0) {
      directionRef.current = direction > 0 ? -1 : 1;
    }

    const clampedSkew = gsap.utils.clamp(-14, 14, velocity * -0.32);
    const speedBoost = gsap.utils.clamp(0, 0.28, Math.abs(velocity) * 0.0085);

    skewToRef.current?.(clampedSkew);
    boostToRef.current?.(speedBoost);

    if (velocityReadoutRef.current) {
      const formatted = Math.abs(velocity).toFixed(1).padStart(4, "0");
      velocityReadoutRef.current.textContent = `${formatted} PX/F`;
    }
  });

  const palette =
    variant === "dark"
      ? "border-white/10 bg-graphite text-ivory"
      : variant === "blue"
        ? "border-white/15 bg-blue text-white"
        : "border-graphite/10 bg-ivory/75 text-graphite";

  const badgePalette =
    variant === "dark"
      ? "border-white/15 bg-white/5 text-ivory/70"
      : variant === "blue"
        ? "border-white/20 bg-white/10 text-white/85"
        : "border-graphite/15 bg-paper text-graphite/65";

  const repeated = [...items, ...items];

  return (
    <div
      ref={rootRibbonRef}
      aria-label="Story kinetic velocity ribbon"
      className={`relative overflow-hidden border-y py-3.5 select-none ${palette} ${className}`}
    >
      {/* Subtle live velocity telemetry badge on desktop */}
      <div
        className={`pointer-events-none absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] backdrop-blur-sm md:flex ${badgePalette}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-red animate-pulse" />
        <span ref={velocityReadoutRef}>00.0 PX/F</span>
      </div>

      <div
        ref={skewLayerRef}
        className="will-change-transform"
        style={{ transformOrigin: "center center" }}
      >
        <div
          ref={trackRef}
          className="flex w-max items-center whitespace-nowrap will-change-transform"
        >
          {[0, 1].map((copyIndex) => (
            <div
              key={copyIndex}
              aria-hidden={copyIndex === 1}
              className="flex shrink-0 items-center"
            >
              {repeated.map((item, idx) => (
                <span
                  key={`${copyIndex}-${idx}`}
                  className="inline-flex items-center gap-5 px-5 font-display text-xs uppercase tracking-[0.26em] font-semibold md:text-sm"
                >
                  <span>{item}</span>
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rotate-45 bg-red"
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StoryProgressHUD;
