"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Glyph } from "@/components/Glyph";
import { Button, Container, Eyebrow, H2, Logo, Mark } from "@/components/ui";
import { services, type ServiceSlug } from "@/content/site";
import { ensureGSAP, gsap, useGSAP } from "@/lib/gsap";

type StoryBeat = {
  readonly no: string;
  readonly tag: string;
  readonly phase: string;
  readonly headline: string;
  readonly accent: string;
  readonly body: string;
  readonly telemetry: string;
  readonly specs: readonly string[];
};

const STORY_BEATS: readonly StoryBeat[] = [
  {
    no: "01",
    tag: "Beat 01 · The Raw Spark",
    phase: "Imagination",
    headline: "Every extraordinary build begins as",
    accent: "an untamed spark.",
    body: "Before a frame is rendered or a single line of code is written, the idea leads first. We strip away convention until only a sharp, unmistakable creative nucleus remains.",
    telemetry: "PHASE 01 // NUCLEUS IGNITION",
    specs: ["Point-of-view definition", "Creative direction & thesis", "Architecture before decoration"],
  },
  {
    no: "02",
    tag: "Beat 02 · The Fusion",
    phase: "Four Disciplines, One Brain",
    headline: "Four specialized crafts converge into",
    accent: "one unified blueprint.",
    body: "Brand creatives, AI video production, mobile apps and web platforms orbit the same core — choreographed in lockstep so your idea never fractures between handoffs.",
    telemetry: "PHASE 02 // MULTI-DISCIPLINE FUSION",
    specs: ["01 · Creatives", "02 · AI Video Production", "03 · App Development", "04 · Web Development"],
  },
  {
    no: "03",
    tag: "Beat 03 · Extraordinary Execution",
    phase: "Launch",
    headline: "Engineered, locked and launched to",
    accent: "move your market.",
    body: "Strategy, cinema and software lock into the completed AQRO emblem — shipping as one cohesive brand and product experience built to perform from day one.",
    telemetry: "PHASE 03 // EMBLEM LOCKED · READY TO SHIP",
    specs: ["Full-stack production delivery", "Cross-channel format mastery", "Measured launch & iteration"],
  },
] as const;

const ORBIT_NODES: readonly {
  slug: ServiceSlug;
  no: string;
  label: string;
  role: string;
  fromX: number;
  fromY: number;
  fromRotate: number;
}[] = [
  {
    slug: "creatives",
    no: "01",
    label: "Creatives",
    role: "Identity & Campaigns",
    fromX: -150,
    fromY: -120,
    fromRotate: -14,
  },
  {
    slug: "ai-video-production",
    no: "02",
    label: "AI Video",
    role: "Cinema & Motion",
    fromX: 150,
    fromY: -120,
    fromRotate: 14,
  },
  {
    slug: "app-development",
    no: "03",
    label: "App Dev",
    role: "iOS, Android & UX",
    fromX: -150,
    fromY: 120,
    fromRotate: 12,
  },
  {
    slug: "web-development",
    no: "04",
    label: "Web Dev",
    role: "Sites & Web Apps",
    fromX: 150,
    fromY: 120,
    fromRotate: -12,
  },
];

export type AlchemyStorySceneProps = {
  eyebrow?: string;
  className?: string;
};

/**
 * "The Anatomy of an Idea" — Signature GSAP ScrollTrigger Pinned Storytelling Scene.
 *
 * - Desktop (`min-width: 1024px` with motion enabled):
 *   Pins a full-viewport stage (`pin: true, scrub: 1, anticipatePin: 1`) and scrubs
 *   through 3 narrative beats:
 *     1. Beat 01 · The Raw Spark (Imagination) — AQRO red corner Mark & ring ignite.
 *     2. Beat 02 · The Fusion (Four Disciplines, One Brain) — 4 AQRO glyphs orbit and
 *        converge into a unified blueprint grid with a live scrubbed progress meter.
 *     3. Beat 03 · Extraordinary Execution (Launch) — locks into the completed AQRO
 *        emblem with magnetic CTAs to explore the work or book a call.
 * - Mobile (`<1024px`) & `prefers-reduced-motion: reduce`:
 *   Degrades cleanly into a 3-card vertical story sequence with zero scroll-hijacking.
 */
export function AlchemyStoryScene({
  eyebrow = "The Anatomy of an Idea",
  className = "",
}: AlchemyStorySceneProps) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressPctRef = useRef<HTMLSpanElement>(null);
  const blueprintMeterRef = useRef<HTMLDivElement>(null);
  const [activeBeat, setActiveBeat] = useState(0);

  useGSAP(
    (_, contextSafe) => {
      ensureGSAP();
      const root = rootRef.current;
      const stage = stageRef.current;
      if (!root || !stage) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as {
            isDesktop: boolean;
            reduceMotion: boolean;
          };

          if (!isDesktop || reduceMotion) {
            return;
          }

          // Initial states for Beat 01 (active at start), Beat 02, Beat 03
          gsap.set("[data-beat-panel='0']", { autoAlpha: 1, y: 0 });
          gsap.set("[data-beat-panel='1']", { autoAlpha: 0, y: 44, pointerEvents: "none" });
          gsap.set("[data-beat-panel='2']", { autoAlpha: 0, y: 44, pointerEvents: "none" });

          // Stage Layer 1: Raw Spark (Mark + rings)
          gsap.set("[data-spark-layer]", { autoAlpha: 1, scale: 1 });
          gsap.set("[data-spark-ring]", { scale: 0.86, rotate: -25, autoAlpha: 0.9 });
          gsap.set("[data-spark-mark]", { scale: 0.92, rotate: -8, transformOrigin: "50% 50%" });
          gsap.set("[data-spark-pulse]", { scale: 0.75, autoAlpha: 0.45 });

          // Stage Layer 2: Fusion Blueprint + 4 Glyphs
          gsap.set("[data-fusion-layer]", { autoAlpha: 0, pointerEvents: "none" });
          gsap.set("[data-blueprint-frame]", { scale: 0.88, autoAlpha: 0 });
          gsap.set("[data-blueprint-line]", { scaleX: 0, transformOrigin: "50% 50%" });
          gsap.set("[data-blueprint-vline]", { scaleY: 0, transformOrigin: "50% 50%" });

          ORBIT_NODES.forEach((node, idx) => {
            gsap.set(`[data-glyph-node='${idx}']`, {
              x: node.fromX,
              y: node.fromY,
              rotation: node.fromRotate,
              scale: 0.72,
              autoAlpha: 0,
            });
          });

          // Stage Layer 3: Completed AQRO Emblem Lock
          gsap.set("[data-launch-layer]", { autoAlpha: 0, scale: 0.86, pointerEvents: "none" });
          gsap.set("[data-emblem-ring]", { scale: 0.7, autoAlpha: 0, transformOrigin: "50% 50%" });
          gsap.set("[data-emblem-stem]", { y: 60, autoAlpha: 0 });
          gsap.set("[data-emblem-shoulder]", { x: -40, rotation: -16, autoAlpha: 0, transformOrigin: "50% 50%" });
          gsap.set("[data-emblem-mark]", { x: 36, y: -36, rotation: 24, scale: 0.75, autoAlpha: 0, transformOrigin: "50% 50%" });
          gsap.set("[data-launch-cta-bar]", { y: 24, autoAlpha: 0 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: () => `+=${Math.round(window.innerHeight * 2.75)}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const p = self.progress;
                const pct = Math.round(p * 100);
                if (progressFillRef.current) {
                  progressFillRef.current.style.transform = `scaleX(${p})`;
                }
                if (blueprintMeterRef.current) {
                  blueprintMeterRef.current.style.transform = `scaleX(${p})`;
                }
                if (progressPctRef.current) {
                  progressPctRef.current.textContent = `${String(pct).padStart(3, "0")}%`;
                }
                const nextBeat = p < 0.34 ? 0 : p < 0.68 ? 1 : 2;
                setActiveBeat((prev) => (prev === nextBeat ? prev : nextBeat));
              },
            },
          });

          // =================================================================
          // BEAT 01 · THE RAW SPARK (0.00 -> 0.32)
          // =================================================================
          tl.addLabel("beat1", 0);

          tl.to(
            "[data-spark-ring]",
            {
              scale: 1.04,
              rotate: 45,
              autoAlpha: 1,
              duration: 0.3,
              ease: "none",
            },
            "beat1",
          )
            .to(
              "[data-spark-mark]",
              {
                scale: 1.08,
                rotate: 0,
                duration: 0.3,
                ease: "power2.out",
              },
              "beat1",
            )
            .to(
              "[data-spark-pulse]",
              {
                scale: 1.18,
                autoAlpha: 0.85,
                duration: 0.3,
                ease: "none",
              },
              "beat1",
            );

          // =================================================================
          // TRANSITION 01 -> 02 · THE FUSION (0.30 -> 0.66)
          // =================================================================
          tl.addLabel("beat2", 0.32);

          // Swap Narrative Copy 01 -> 02
          tl.to(
            "[data-beat-panel='0']",
            {
              autoAlpha: 0,
              y: -36,
              pointerEvents: "none",
              duration: 0.12,
              ease: "power2.in",
            },
            "beat2",
          ).to(
            "[data-beat-panel='1']",
            {
              autoAlpha: 1,
              y: 0,
              pointerEvents: "auto",
              duration: 0.16,
              ease: "power3.out",
            },
            "beat2+=0.08",
          );

          // Morph Spark into Blueprint Grid & Orbiting Glyphs
          tl.to(
            "[data-spark-layer]",
            {
              scale: 0.62,
              autoAlpha: 0.18,
              duration: 0.18,
              ease: "power2.inOut",
            },
            "beat2",
          )
            .to(
              "[data-fusion-layer]",
              {
                autoAlpha: 1,
                pointerEvents: "auto",
                duration: 0.12,
                ease: "power2.out",
              },
              "beat2+=0.04",
            )
            .to(
              "[data-blueprint-frame]",
              {
                scale: 1,
                autoAlpha: 1,
                duration: 0.2,
                ease: "power3.out",
              },
              "beat2+=0.04",
            )
            .to(
              "[data-blueprint-line]",
              {
                scaleX: 1,
                duration: 0.22,
                ease: "power2.out",
              },
              "beat2+=0.06",
            )
            .to(
              "[data-blueprint-vline]",
              {
                scaleY: 1,
                duration: 0.22,
                ease: "power2.out",
              },
              "beat2+=0.06",
            );

          // Converge the 4 AQRO service glyphs from orbital positions into the blueprint grid
          ORBIT_NODES.forEach((_, idx) => {
            tl.to(
              `[data-glyph-node='${idx}']`,
              {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 0.24,
                ease: "power3.out",
              },
              `beat2+=${0.06 + idx * 0.025}`,
            );
          });

          // Subtle hold/Lock pulse during Beat 2
          tl.to(
            "[data-blueprint-core]",
            {
              rotation: 90,
              scale: 1.08,
              duration: 0.14,
              ease: "none",
            },
            "beat2+=0.22",
          );

          // =================================================================
          // TRANSITION 02 -> 03 · EXTRAORDINARY EXECUTION (0.66 -> 1.00)
          // =================================================================
          tl.addLabel("beat3", 0.66);

          // Swap Narrative Copy 02 -> 03
          tl.to(
            "[data-beat-panel='1']",
            {
              autoAlpha: 0,
              y: -36,
              pointerEvents: "none",
              duration: 0.12,
              ease: "power2.in",
            },
            "beat3",
          ).to(
            "[data-beat-panel='2']",
            {
              autoAlpha: 1,
              y: 0,
              pointerEvents: "auto",
              duration: 0.16,
              ease: "power3.out",
            },
            "beat3+=0.08",
          );

          // Converge 4 glyphs inward into the center emblem & reveal completed AQRO Emblem
          ORBIT_NODES.forEach((node, idx) => {
            tl.to(
              `[data-glyph-node='${idx}']`,
              {
                x: node.fromX * -0.25,
                y: node.fromY * -0.25,
                scale: 0.55,
                autoAlpha: 0,
                duration: 0.16,
                ease: "power3.in",
              },
              "beat3",
            );
          });

          tl.to(
            "[data-fusion-layer]",
            {
              autoAlpha: 0,
              pointerEvents: "none",
              duration: 0.16,
              ease: "power2.in",
            },
            "beat3+=0.08",
          )
            .to(
              "[data-spark-layer]",
              {
                autoAlpha: 0,
                scale: 0.4,
                duration: 0.14,
                ease: "power2.in",
              },
              "beat3",
            )
            .to(
              "[data-launch-layer]",
              {
                autoAlpha: 1,
                scale: 1,
                pointerEvents: "auto",
                duration: 0.2,
                ease: "power3.out",
              },
              "beat3+=0.08",
            )
            .to(
              "[data-emblem-ring]",
              {
                scale: 1,
                autoAlpha: 1,
                duration: 0.2,
                ease: "power3.out",
              },
              "beat3+=0.1",
            )
            .to(
              "[data-emblem-stem]",
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.2,
                ease: "power3.out",
              },
              "beat3+=0.12",
            )
            .to(
              "[data-emblem-shoulder]",
              {
                x: 0,
                rotation: 0,
                autoAlpha: 1,
                duration: 0.2,
                ease: "power3.out",
              },
              "beat3+=0.14",
            )
            .to(
              "[data-emblem-mark]",
              {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 0.22,
                ease: "power4.out",
              },
              "beat3+=0.16",
            )
            .to(
              "[data-launch-cta-bar]",
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.18,
                ease: "power3.out",
              },
              "beat3+=0.18",
            );

          // Hold final state cleanly until 1.0
          tl.to({}, { duration: 0.08 }, 0.92);

          // Subtle mouse-reactive parallax on the visual stage canvas
          const visualCanvas = stage.querySelector<HTMLElement>("[data-alchemy-canvas]");
          if (visualCanvas && contextSafe) {
            const xTo = gsap.quickTo(visualCanvas, "x", { duration: 0.7, ease: "power3.out" });
            const yTo = gsap.quickTo(visualCanvas, "y", { duration: 0.7, ease: "power3.out" });

            const onPointerMove = contextSafe((e: PointerEvent) => {
              const rect = stage.getBoundingClientRect();
              const relX = (e.clientX - rect.left) / rect.width - 0.5;
              const relY = (e.clientY - rect.top) / rect.height - 0.5;
              xTo(relX * 18);
              yTo(relY * 18);
            });

            const onPointerLeave = contextSafe(() => {
              xTo(0);
              yTo(0);
            });

            stage.addEventListener("pointermove", onPointerMove);
            stage.addEventListener("pointerleave", onPointerLeave);

            return () => {
              stage.removeEventListener("pointermove", onPointerMove);
              stage.removeEventListener("pointerleave", onPointerLeave);
            };
          }
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      aria-label="The Anatomy of an Idea"
      className={`relative overflow-hidden bg-graphite text-white ${className}`}
    >
      {/* Ambient architectural background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgba(0,74,173,0.34),transparent_58%),radial-gradient(circle_at_22%_80%,rgba(237,28,36,0.14),transparent_50%)]"
      />

      {/* =====================================================================
          DESKTOP PINNED STORYTELLING STAGE (≥1024px & motion allowed)
         ===================================================================== */}
      <div
        ref={stageRef}
        data-alchemy-stage
        className="relative hidden min-h-screen w-full flex-col justify-between py-10 lg:flex motion-reduce:hidden"
      >
        {/* Top Story HUD & Live Scrubbed Progress Bar */}
        <Container className="relative z-20">
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/12 pb-5">
            <div className="flex items-center gap-4">
              <Eyebrow light>{eyebrow}</Eyebrow>
              <span className="hidden h-3.5 w-px bg-white/20 xl:inline-block" aria-hidden />
              <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-white/50 xl:inline-block">
                {STORY_BEATS[activeBeat]?.telemetry}
              </span>
            </div>

            {/* 3 Beat Step Pills + Live Scrubbed Progress Readout */}
            <div className="flex items-center gap-6">
              <ol className="flex items-center gap-2" aria-label="Story beats">
                {STORY_BEATS.map((beat, idx) => {
                  const isCurrent = idx === activeBeat;
                  const isPassed = idx < activeBeat;
                  return (
                    <li
                      key={beat.no}
                      className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors duration-300 ${
                        isCurrent
                          ? "border-red bg-red/15 text-white"
                          : isPassed
                            ? "border-white/25 bg-white/5 text-white/80"
                            : "border-white/10 text-white/40"
                      }`}
                    >
                      <span className={isCurrent ? "text-red" : "text-current"}>{beat.no}</span>
                      <span className="hidden xl:inline">{beat.phase}</span>
                    </li>
                  );
                })}
              </ol>

              <div className="flex items-center gap-3">
                <div
                  aria-hidden
                  className="relative h-1.5 w-28 overflow-hidden rounded-full bg-white/12"
                >
                  <div
                    ref={progressFillRef}
                    className="h-full w-full origin-left scale-x-0 bg-red"
                  />
                </div>
                <span
                  ref={progressPctRef}
                  className="w-11 text-right font-mono text-xs font-semibold tracking-widest text-white/75"
                >
                  000%
                </span>
              </div>
            </div>
          </div>
        </Container>

        {/* Main Center Split Stage: Left Narrative Beats / Right Interactive Blueprint */}
        <Container className="relative z-10 my-auto py-6">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Column: 3 Scroll-Synced Narrative Beats */}
            <div className="relative min-h-[420px] lg:col-span-5">
              {STORY_BEATS.map((beat, idx) => (
                <article
                  key={beat.no}
                  data-beat-panel={idx}
                  className={`${
                    idx === 0 ? "relative" : "absolute inset-0"
                  } flex flex-col justify-center`}
                >
                  <div className="inline-flex items-center gap-2.5 self-start rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5">
                    <Mark className="size-2.5" />
                    <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-white/85">
                      {beat.tag}
                    </span>
                  </div>

                  <h2 className={`mt-6 ${H2}`}>
                    {beat.headline}{" "}
                    <span className="text-red">{beat.accent}</span>
                  </h2>

                  <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">
                    {beat.body}
                  </p>

                  {/* Spec checklist / discipline pills */}
                  <ul className="mt-7 grid gap-2.5 border-t border-white/12 pt-6 sm:grid-cols-2">
                    {beat.specs.map((spec) => (
                      <li
                        key={spec}
                        className="flex items-center gap-2.5 text-sm text-white/80"
                      >
                        <span className="size-1.5 shrink-0 rounded-full bg-red" aria-hidden />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Beat 03 Magnetic CTAs */}
                  {idx === 2 && (
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <Button href="/work" variant="red" magnetic>
                        Explore the work
                      </Button>
                      <Button href="/contact" variant="outline-light" magnetic>
                        Book a call
                      </Button>
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* Right Column: Choreographed Blueprint & Emblem Stage */}
            <div className="lg:col-span-7">
              <div
                data-alchemy-canvas
                className="relative mx-auto aspect-[4/3] w-full max-w-[680px] overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-blue/25 p-6 shadow-2xl backdrop-blur-md"
              >
                {/* Blueprint Coordinate Grid Background */}
                <svg
                  viewBox="0 0 600 450"
                  aria-hidden
                  className="pointer-events-none absolute inset-0 size-full opacity-35"
                >
                  <defs>
                    <pattern
                      id="aqro-alchemy-grid"
                      width="50"
                      height="50"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 50 0 L 0 0 0 50"
                        fill="none"
                        stroke="rgba(255,255,255,0.12)"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="600" height="450" fill="url(#aqro-alchemy-grid)" />
                  <circle
                    cx="300"
                    cy="225"
                    r="175"
                    fill="none"
                    stroke="rgba(255,255,255,0.14)"
                    strokeDasharray="3 9"
                  />
                  <circle
                    cx="300"
                    cy="225"
                    r="115"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                  />
                </svg>

                {/* Corner Blueprint Registration Marks */}
                <div aria-hidden className="pointer-events-none absolute inset-4 flex flex-col justify-between">
                  <div className="flex justify-between font-mono text-[11px] tracking-[0.2em] text-white/40">
                    <span>SYS // AQRO-CORE</span>
                    <span>STAGE 0{activeBeat + 1} / 03</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-white/40">
                    <span>LAT 00.22.36.1</span>
                    <span>BLUEPRINT GRID · 1:1</span>
                  </div>
                </div>

                {/* =========================================================
                    STAGE LAYER 1: BEAT 01 · THE RAW SPARK (Mark + Ring)
                   ========================================================= */}
                <div
                  data-spark-layer
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Ambient radial spark pulse */}
                  <div
                    data-spark-pulse
                    aria-hidden
                    className="absolute size-72 rounded-full bg-red/20 blur-3xl"
                  />

                  <svg
                    viewBox="0 0 400 400"
                    className="relative size-[min(72%,320px)] overflow-visible"
                    aria-hidden
                  >
                    {/* Outer dashed orbital ring */}
                    <g data-spark-ring style={{ transformOrigin: "200px 200px" }}>
                      <circle
                        cx="200"
                        cy="200"
                        r="155"
                        fill="none"
                        stroke="rgba(255,255,255,0.32)"
                        strokeWidth="1.5"
                        strokeDasharray="4 10"
                      />
                      <circle cx="200" cy="45" r="6" fill="#ED1C24" />
                      <circle cx="355" cy="200" r="4" fill="#004AAD" />
                    </g>

                    {/* Inner sculpted "o" ring */}
                    <circle
                      cx="200"
                      cy="200"
                      r="96"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="36"
                      strokeOpacity="0.92"
                    />

                    {/* Signature AQRO Red Corner Mark */}
                    <g data-spark-mark>
                      <path
                        d="M210 76H310V170H261V128H210Z"
                        fill="#ED1C24"
                      />
                    </g>
                  </svg>

                  <div className="absolute bottom-7 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-graphite/80 px-4 py-1.5 backdrop-blur-sm">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/80">
                      01 · Raw Spark Ignited
                    </span>
                  </div>
                </div>

                {/* =========================================================
                    STAGE LAYER 2: BEAT 02 · THE FUSION (4 Glyphs + Blueprint)
                   ========================================================= */}
                <div
                  data-fusion-layer
                  className="absolute inset-0 flex flex-col justify-between p-7 sm:p-9"
                >
                  {/* Crosshair laser lines */}
                  <div
                    data-blueprint-line
                    aria-hidden
                    className="pointer-events-none absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-red/60 to-transparent"
                  />
                  <div
                    data-blueprint-vline
                    aria-hidden
                    className="pointer-events-none absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/35 to-transparent"
                  />

                  {/* Central Nucleus Hub */}
                  <div
                    data-blueprint-core
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-red/60 bg-graphite shadow-[0_0_30px_rgba(237,28,36,0.45)]"
                  >
                    <Mark className="size-5" />
                  </div>

                  {/* 2x2 Converged Blueprint Grid of the 4 AQRO Glyphs */}
                  <div
                    data-blueprint-frame
                    className="relative z-10 my-auto grid grid-cols-2 gap-4 sm:gap-5"
                  >
                    {ORBIT_NODES.map((node, idx) => (
                      <Link
                        key={node.slug}
                        href={`/services/${node.slug}`}
                        data-glyph-node={idx}
                        className="group relative flex items-center gap-3.5 rounded-2xl border border-white/15 bg-graphite/85 p-3.5 transition-colors hover:border-red/60 hover:bg-graphite sm:p-4"
                      >
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-blue/40 p-2 ring-1 ring-white/10">
                          <Glyph
                            slug={node.slug}
                            tone="silver"
                            className="max-h-11 w-auto"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[11px] font-semibold text-red">
                              {node.no}
                            </span>
                            <span
                              aria-hidden
                              className="size-1.5 rounded-full bg-white/30 transition-colors group-hover:bg-red"
                            />
                          </div>
                          <p className="truncate font-display text-base font-semibold tracking-tight text-white">
                            {node.label}
                          </p>
                          <p className="truncate text-xs text-white/60">
                            {node.role}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Live Scrubbed Blueprint Fusion Meter */}
                  <div className="relative z-10 mt-3 flex items-center justify-between gap-4 rounded-xl border border-white/12 bg-graphite/80 px-4 py-2.5 backdrop-blur-sm">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/75">
                      Blueprint Sync
                    </span>
                    <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/12">
                      <div
                        ref={blueprintMeterRef}
                        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-blue via-white to-red"
                      />
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-red">
                      4 / 4 Linked
                    </span>
                  </div>
                </div>

                {/* =========================================================
                    STAGE LAYER 3: BEAT 03 · COMPLETED AQRO EMBLEM LOCK
                   ========================================================= */}
                <div
                  data-launch-layer
                  className="absolute inset-0 flex flex-col items-center justify-between p-8"
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 backdrop-blur-sm">
                    <span className="size-2 rounded-full bg-red" aria-hidden />
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white">
                      Emblem Locked · Ready for Launch
                    </span>
                  </div>

                  {/* Assembled Architectural AQRO Emblem */}
                  <div className="relative flex items-center justify-center">
                    <div
                      aria-hidden
                      className="absolute size-64 rounded-full bg-blue/45 blur-3xl"
                    />
                    <svg
                      viewBox="0 0 500 500"
                      className="relative size-[min(58vw,250px)] overflow-visible"
                      aria-hidden
                    >
                      {/* Orbit ring */}
                      <circle
                        cx="215"
                        cy="265"
                        r="185"
                        fill="none"
                        stroke="rgba(255,255,255,0.28)"
                        strokeWidth="1.5"
                        strokeDasharray="3 9"
                      />
                      {/* The ring of the "o" */}
                      <g data-emblem-ring>
                        <circle
                          cx="215"
                          cy="265"
                          r="108"
                          fill="none"
                          stroke="#FFFFFF"
                          strokeWidth="54"
                        />
                      </g>
                      {/* The stem of the "q" */}
                      <g data-emblem-stem>
                        <rect
                          x="348"
                          y="155"
                          width="54"
                          height="285"
                          fill="#FFFFFF"
                        />
                      </g>
                      {/* The shoulder of the "r" */}
                      <g data-emblem-shoulder>
                        <path
                          d="M70 120 A120 120 0 0 1 190 0"
                          fill="none"
                          stroke="rgba(255,255,255,0.38)"
                          strokeWidth="24"
                          transform="translate(20 40)"
                        />
                      </g>
                      {/* The signature red corner mark */}
                      <g data-emblem-mark>
                        <path
                          d="M298 55H406V156H353V111H298Z"
                          fill="#ED1C24"
                        />
                      </g>
                    </svg>
                  </div>

                  {/* Bottom Emblem Wordmark & Direct Action Bar */}
                  <div
                    data-launch-cta-bar
                    className="flex w-full flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/15 bg-graphite/90 px-5 py-3.5 backdrop-blur-md"
                  >
                    <div className="flex items-center gap-3.5">
                      <Logo reverse className="h-6" />
                      <span className="h-4 w-px bg-white/20" aria-hidden />
                      <span className="text-xs font-medium text-white/75">
                        One team from first spark to final launch.
                      </span>
                    </div>
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-2 rounded-full bg-red px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-blue"
                    >
                      <span>Start a project</span>
                      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Bottom Scroll Cue Footer */}
        <Container className="relative z-20">
          <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/50">
            <span>Scroll to choreograph the pipeline</span>
            <span className="font-mono uppercase tracking-[0.18em]">
              {STORY_BEATS[activeBeat]?.no} / 03 — {STORY_BEATS[activeBeat]?.phase}
            </span>
          </div>
        </Container>
      </div>

      {/* =====================================================================
          MOBILE (<1024px) & REDUCED-MOTION 3-CARD VERTICAL STORY SEQUENCE
          (Zero scroll-hijacking, full narrative & visual parity)
         ===================================================================== */}
      <div
        data-alchemy-mobile
        className="py-20 md:py-24 lg:hidden motion-reduce:block"
      >
        <Container>
          <div className="max-w-2xl">
            <Eyebrow light>{eyebrow}</Eyebrow>
            <h2 className={`mt-5 ${H2}`}>
              How an idea becomes <span className="text-red">an AQRO release.</span>
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-white/75">
              Three deliberate stages — from the first creative spark to a unified four-discipline blueprint and a market-ready launch.
            </p>
          </div>

          <ol className="mt-12 grid gap-6">
            {/* Card 01: Beat 01 · The Raw Spark */}
            <li className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white/85">
                  <Mark className="size-2.5" />
                  {STORY_BEATS[0].tag}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/50">
                  01 / 03 · {STORY_BEATS[0].phase}
                </span>
              </div>

              <div className="mt-6 grid items-center gap-6 md:grid-cols-12">
                <div className="md:col-span-7">
                  <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    {STORY_BEATS[0].headline}{" "}
                    <span className="text-red">{STORY_BEATS[0].accent}</span>
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/75">
                    {STORY_BEATS[0].body}
                  </p>
                </div>
                <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-graphite/70 p-6 md:col-span-5">
                  <div className="relative flex size-32 items-center justify-center">
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-dashed border-white/30"
                    />
                    <div
                      aria-hidden
                      className="size-20 rounded-full border-[10px] border-white/90"
                    />
                    <Mark className="absolute right-2 top-2 size-8" />
                  </div>
                </div>
              </div>
            </li>

            {/* Card 02: Beat 02 · The Fusion (Four Disciplines, One Brain) */}
            <li className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white/85">
                  <Mark className="size-2.5" />
                  {STORY_BEATS[1].tag}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/50">
                  02 / 03 · {STORY_BEATS[1].phase}
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {STORY_BEATS[1].headline}{" "}
                <span className="text-red">{STORY_BEATS[1].accent}</span>
              </h3>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/75">
                {STORY_BEATS[1].body}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {services.map((sv) => (
                  <Link
                    key={sv.slug}
                    href={sv.href}
                    className="group flex items-center gap-3.5 rounded-2xl border border-white/12 bg-graphite/80 p-3.5 transition-colors hover:border-red/60"
                  >
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue/40 p-2">
                      <Glyph slug={sv.slug} tone="silver" className="max-h-9 w-auto" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-mono text-[11px] font-semibold text-red">
                        {sv.no}
                      </span>
                      <p className="truncate font-display text-base font-semibold text-white">
                        {sv.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </li>

            {/* Card 03: Beat 03 · Extraordinary Execution (Launch) */}
            <li className="rounded-3xl border border-white/15 bg-gradient-to-br from-blue/40 via-graphite to-graphite p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white">
                  <Mark className="size-2.5" />
                  {STORY_BEATS[2].tag}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-red">
                  03 / 03 · {STORY_BEATS[2].phase}
                </span>
              </div>

              <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div className="max-w-xl">
                  <Logo reverse className="mb-4 h-7" />
                  <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    {STORY_BEATS[2].headline}{" "}
                    <span className="text-red">{STORY_BEATS[2].accent}</span>
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/80">
                    {STORY_BEATS[2].body}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button href="/work" variant="red" magnetic>
                    Explore the work
                  </Button>
                  <Button href="/contact" variant="outline-light" magnetic>
                    Book a call
                  </Button>
                </div>
              </div>
            </li>
          </ol>
        </Container>
      </div>
    </section>
  );
}

export default AlchemyStoryScene;
