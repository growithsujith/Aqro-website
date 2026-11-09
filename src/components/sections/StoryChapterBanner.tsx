"use client";

import { useRef, type ReactNode } from "react";
import { ensureGSAP, gsap, useGSAP } from "@/lib/gsap";
import { Container, Mark } from "@/components/ui";

export type StoryChapterTheme = "light" | "dark" | "blue" | "ivory";

export type StoryActId =
  | "act-spark"
  | "act-alchemy"
  | "act-crafts"
  | "act-blueprint"
  | "act-invitation";

export interface StoryActDefinition {
  id: StoryActId;
  act: string;
  numeral: string;
  index: number;
  title: string;
  subtitle: string;
  bridge: string;
  theme: StoryChapterTheme;
}

/**
 * Canonical 5-Act narrative arc for the AQRO brand story.
 * Uses only authentic studio capabilities and workflow — zero invented stats or client data.
 */
export const STORY_ACTS: readonly StoryActDefinition[] = [
  {
    id: "act-spark",
    act: "Act I",
    numeral: "01 / 05",
    index: 1,
    title: "The Spark",
    subtitle: "Every extraordinary brand begins as an untamed idea.",
    bridge:
      "Before a single frame is rendered or a line of code is written, there is a signal worth amplifying.",
    theme: "light",
  },
  {
    id: "act-alchemy",
    act: "Act II",
    numeral: "02 / 05",
    index: 2,
    title: "The Alchemy",
    subtitle: "Where human imagination, AI, and engineering fuse into one studio.",
    bridge:
      "One integrated pipeline from the first sketch to the final release — so your vision keeps its edge at every stage.",
    theme: "light",
  },
  {
    id: "act-crafts",
    act: "Act III",
    numeral: "03 / 05",
    index: 3,
    title: "The Four Crafts",
    subtitle:
      "Creatives, AI Video Production, App Development, Web Development—working as one instrument.",
    bridge:
      "Four specialist disciplines under one roof. Each sharp on its own; unmistakable when combined.",
    theme: "light",
  },
  {
    id: "act-blueprint",
    act: "Act IV",
    numeral: "04 / 05",
    index: 4,
    title: "The Blueprint & Proof",
    subtitle:
      "Strategy → Creation → Delivery, and the work that comes out the other side.",
    bridge:
      "A transparent three-stage method built around outcomes, clear milestones, and craft that speaks for itself.",
    theme: "dark",
  },
  {
    id: "act-invitation",
    act: "Act V",
    numeral: "05 / 05",
    index: 5,
    title: "The Invitation",
    subtitle: "Turning your idea into something worth remembering.",
    bridge:
      "Bring us a brief, a rough napkin sketch, or an ambitious product roadmap — let's build the next chapter together.",
    theme: "blue",
  },
] as const;

export interface StoryChapterBannerProps {
  /** Act label, e.g. "Act I", "Act II", "Act III", "Act IV", "Act V" */
  act: string;
  /** Chapter title, e.g. "The Spark" or "The Four Crafts" */
  title: ReactNode;
  /** Primary narrative bridge / prologue line */
  subtitle?: ReactNode;
  /** Optional secondary editorial note or transition cue */
  bridge?: ReactNode;
  /** Optional explicit numeral override (defaults to "01 / 05" .. "05 / 05" inferred from `act`) */
  numeral?: string;
  /** Visual surface theme */
  theme?: StoryChapterTheme;
  /** Anchor ID for chapter navigation, e.g. "act-spark" */
  id?: string;
  /** Additional classes on the outer wrapper */
  className?: string;
}

const ROMAN_TO_INDEX: Record<string, number> = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
};

function resolveActIndex(act: string, numeral?: string): { index: number; formattedNumeral: string } {
  if (numeral) {
    const parsed = parseInt(numeral.slice(0, 2), 10);
    return {
      index: Number.isFinite(parsed) && parsed >= 1 && parsed <= 5 ? parsed : 1,
      formattedNumeral: numeral,
    };
  }
  const cleaned = act.replace(/^act\s+/i, "").trim().toUpperCase();
  const idx = ROMAN_TO_INDEX[cleaned] ?? 1;
  return {
    index: idx,
    formattedNumeral: `${String(idx).padStart(2, "0")} / 05`,
  };
}

const CIPHER_POOL = "0123456789/X#—+:*";

function scrambleString(target: string, progress: number): string {
  const chars = Array.from(target);
  const total = chars.length;
  return chars
    .map((ch, i) => {
      if (ch === " ") return " ";
      const threshold = (i + 1) / (total + 1);
      if (progress >= threshold || progress >= 0.99) return ch;
      const stepSeed = Math.floor(progress * 24) + i * 7;
      return CIPHER_POOL[stepSeed % CIPHER_POOL.length];
    })
    .join("");
}

/**
 * `<StoryChapterBanner />`
 * Cinematic chapter divider and prologue header that frames the AQRO website
 * as a 5-Act brand story. Uses GSAP `ScrollTrigger` to:
 * 1. Draw a horizontal film-frame rule with registration ticks and a scrubbed accent bar
 * 2. Decrypt/reveal the Act numeral (`01 / 05`) and Act code
 * 3. Choreograph the chapter title and narrative bridge copy as the user enters each Act
 */
export function StoryChapterBanner({
  act,
  title,
  subtitle,
  bridge,
  numeral,
  theme = "light",
  id,
  className = "",
}: StoryChapterBannerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const numeralRef = useRef<HTMLSpanElement>(null);
  const actCodeRef = useRef<HTMLSpanElement>(null);

  const { index: actIndex, formattedNumeral } = resolveActIndex(act, numeral);
  const normalizedActUpper = act.toUpperCase();

  useGSAP(
    () => {
      ensureGSAP();
      const root = rootRef.current;
      if (!root) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const topRule = root.querySelector<HTMLElement>("[data-chapter-rule-top]");
      const accentRule = root.querySelector<HTMLElement>("[data-chapter-rule-accent]");
      const bottomRule = root.querySelector<HTMLElement>("[data-chapter-rule-bottom]");
      const markEl = root.querySelector<HTMLElement>("[data-chapter-mark]");
      const badgeEl = root.querySelector<HTMLElement>("[data-chapter-badge]");
      const titleEl = root.querySelector<HTMLElement>("[data-chapter-title]");
      const subtitleEl = root.querySelector<HTMLElement>("[data-chapter-subtitle]");
      const bridgeEl = root.querySelector<HTMLElement>("[data-chapter-bridge]");
      const pips = root.querySelectorAll<HTMLElement>("[data-chapter-pip]");
      const verticalDrop = root.querySelector<HTMLElement>("[data-chapter-drop]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 90%",
          end: "bottom 35%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // 1. Horizontal film-frame rule draws across
      if (topRule) {
        tl.fromTo(
          topRule,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: "aqro", clearProps: "transform" },
          0,
        );
      }

      // 2. Corner mark & Act badge entrance
      if (markEl) {
        tl.fromTo(
          markEl,
          { scale: 0.4, rotate: -45, autoAlpha: 0 },
          { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.55, ease: "back.out(1.8)", clearProps: "transform,opacity,visibility" },
          0.08,
        );
      }

      if (badgeEl) {
        tl.fromTo(
          badgeEl,
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, ease: "aqro", clearProps: "transform,opacity,visibility" },
          0.1,
        );
      }

      // 3. Decrypt / scramble numeral ("01 / 05") and act label ("ACT I")
      const decryptState = { p: 0 };
      tl.to(
        decryptState,
        {
          p: 1,
          duration: 0.78,
          ease: "power2.out",
          onUpdate: () => {
            if (numeralRef.current) {
              numeralRef.current.textContent = scrambleString(formattedNumeral, decryptState.p);
            }
            if (actCodeRef.current) {
              actCodeRef.current.textContent = scrambleString(normalizedActUpper, decryptState.p);
            }
          },
          onComplete: () => {
            if (numeralRef.current) numeralRef.current.textContent = formattedNumeral;
            if (actCodeRef.current) actCodeRef.current.textContent = normalizedActUpper;
          },
        },
        0.12,
      );

      // 4. Chapter progress pips light up sequentially
      if (pips.length) {
        tl.fromTo(
          pips,
          { scaleY: 0, autoAlpha: 0 },
          {
            scaleY: 1,
            autoAlpha: 1,
            duration: 0.45,
            stagger: 0.05,
            ease: "aqro",
            clearProps: "transform,opacity,visibility",
          },
          0.18,
        );
      }

      // 5. Chapter title cinematic masked reveal
      if (titleEl) {
        tl.fromTo(
          titleEl,
          { yPercent: 105, skewY: 2.5, autoAlpha: 0 },
          { yPercent: 0, skewY: 0, autoAlpha: 1, duration: 0.9, ease: "aqro", clearProps: "transform,opacity,visibility" },
          0.22,
        );
      }

      // 6. Narrative bridge copy & secondary note
      if (subtitleEl) {
        tl.fromTo(
          subtitleEl,
          { y: 22, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.75, ease: "aqro", clearProps: "transform,opacity,visibility" },
          0.36,
        );
      }

      if (bridgeEl) {
        tl.fromTo(
          bridgeEl,
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, ease: "aqro", clearProps: "transform,opacity,visibility" },
          0.46,
        );
      }

      if (bottomRule) {
        tl.fromTo(
          bottomRule,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.85, ease: "aqro", clearProps: "transform" },
          0.3,
        );
      }

      if (verticalDrop) {
        tl.fromTo(
          verticalDrop,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.65, ease: "aqro", clearProps: "transform" },
          0.5,
        );
      }

      // 7. Continuous scroll-scrubbed film-frame progress accent
      if (accentRule) {
        gsap.fromTo(
          accentRule,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 90%",
              end: "bottom 20%",
              scrub: 0.5,
            },
          },
        );
      }
    },
    { scope: rootRef, dependencies: [act, formattedNumeral, normalizedActUpper] },
  );

  const surfaceStyles: Record<
    StoryChapterTheme,
    {
      wrapper: string;
      rule: string;
      accent: string;
      meta: string;
      badgeBorder: string;
      badgeBg: string;
      title: string;
      subtitle: string;
      bridge: string;
      pipActive: string;
      pipIdle: string;
      markColor: string;
    }
  > = {
    light: {
      wrapper: "bg-paper text-graphite",
      rule: "bg-graphite/15",
      accent: "bg-red",
      meta: "text-graphite/60",
      badgeBorder: "border-graphite/15",
      badgeBg: "bg-ivory/80 text-graphite",
      title: "text-graphite",
      subtitle: "text-graphite/85",
      bridge: "text-graphite/65",
      pipActive: "bg-red",
      pipIdle: "bg-graphite/20",
      markColor: "#ED1C24",
    },
    ivory: {
      wrapper: "bg-ivory text-graphite",
      rule: "bg-graphite/15",
      accent: "bg-red",
      meta: "text-graphite/60",
      badgeBorder: "border-graphite/15",
      badgeBg: "bg-paper/90 text-graphite",
      title: "text-graphite",
      subtitle: "text-graphite/85",
      bridge: "text-graphite/65",
      pipActive: "bg-red",
      pipIdle: "bg-graphite/20",
      markColor: "#ED1C24",
    },
    dark: {
      wrapper: "bg-graphite text-white",
      rule: "bg-white/15",
      accent: "bg-red",
      meta: "text-white/55",
      badgeBorder: "border-white/15",
      badgeBg: "bg-white/[0.06] text-white",
      title: "text-white",
      subtitle: "text-white/85",
      bridge: "text-white/60",
      pipActive: "bg-red",
      pipIdle: "bg-white/20",
      markColor: "#ED1C24",
    },
    blue: {
      wrapper: "bg-blue text-white",
      rule: "bg-white/20",
      accent: "bg-red",
      meta: "text-white/65",
      badgeBorder: "border-white/20",
      badgeBg: "bg-white/10 text-white",
      title: "text-white",
      subtitle: "text-white/90",
      bridge: "text-white/70",
      pipActive: "bg-white",
      pipIdle: "bg-white/25",
      markColor: "#ED1C24",
    },
  };

  const s = surfaceStyles[theme] ?? surfaceStyles.light;

  return (
    <div
      ref={rootRef}
      id={id}
      role="region"
      aria-label={`${act} — ${typeof title === "string" ? title : "Story Chapter"}`}
      className={`relative scroll-mt-24 overflow-hidden pt-14 pb-8 md:pt-20 md:pb-12 ${s.wrapper} ${className}`}
    >
      <Container>
        {/* Top horizontal film-frame rule with scrubbed accent bar */}
        <div className="relative">
          <div
            aria-hidden
            data-chapter-rule-top
            className={`h-px w-full origin-left ${s.rule}`}
          />
          <div
            aria-hidden
            data-chapter-rule-accent
            className={`absolute top-0 left-0 h-[2px] w-full origin-left scale-x-0 ${s.accent}`}
          />
        </div>

        {/* Film-frame metadata bar: Act Badge, Decrypted Numeral, and 5-Act Reel Indicator */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div
            data-chapter-badge
            className="flex items-center gap-3"
          >
            <span data-chapter-mark className="inline-flex items-center justify-center">
              <Mark className="size-3.5" color={s.markColor} />
            </span>

            <span
              className={`inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1 text-[12px] font-semibold uppercase tracking-[0.18em] ${s.badgeBorder} ${s.badgeBg}`}
            >
              <span ref={actCodeRef} className="font-mono">
                {normalizedActUpper}
              </span>
              <span aria-hidden className="opacity-35">
                •
              </span>
              <span
                ref={numeralRef}
                aria-label={`Chapter ${formattedNumeral}`}
                className="font-mono tabular-nums text-red"
              >
                {formattedNumeral}
              </span>
            </span>
          </div>

          {/* Right side: 5-Act film-reel chapter pips */}
          <div className="flex items-center gap-4">
            <span
              className={`hidden font-mono text-[11px] uppercase tracking-[0.2em] sm:inline-block ${s.meta}`}
            >
              AQRO // NARRATIVE REEL
            </span>
            <div
              aria-hidden
              className="flex items-end gap-1.5"
              title={`Act ${actIndex} of 5`}
            >
              {[1, 2, 3, 4, 5].map((n) => {
                const isCurrent = n === actIndex;
                const isPast = n < actIndex;
                return (
                  <span
                    key={n}
                    data-chapter-pip
                    className={`inline-block origin-bottom rounded-full transition-all duration-300 ${
                      isCurrent
                        ? `h-4 w-1.5 ${s.pipActive}`
                        : isPast
                          ? `h-2.5 w-1 ${s.pipActive} opacity-60`
                          : `h-2 w-1 ${s.pipIdle}`
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Chapter Title & Narrative Bridge Copy */}
        <div className="mt-7 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <div className="overflow-hidden py-1">
              <h2
                data-chapter-title
                className={`font-display text-[clamp(2rem,4.4vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-balance will-change-transform ${s.title}`}
              >
                <span className="mr-3 font-mono text-[0.45em] font-medium uppercase tracking-[0.18em] opacity-55 align-middle">
                  [{act}]
                </span>
                {title}
              </h2>
            </div>
          </div>

          {(subtitle || bridge) && (
            <div className="lg:col-span-6 lg:pl-6">
              {subtitle && (
                <p
                  data-chapter-subtitle
                  className={`font-display text-[clamp(1.15rem,1.8vw,1.5rem)] font-medium leading-[1.35] tracking-[-0.015em] text-balance ${s.subtitle}`}
                >
                  {subtitle}
                </p>
              )}
              {bridge && (
                <p
                  data-chapter-bridge
                  className={`mt-2.5 max-w-xl text-[15px] leading-relaxed ${s.bridge}`}
                >
                  {bridge}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Bottom film-frame hairline & vertical story connector */}
        <div className="mt-7 flex items-center gap-4">
          <div
            aria-hidden
            data-chapter-rule-bottom
            className={`h-px flex-1 origin-left ${s.rule}`}
          />
          <div
            aria-hidden
            data-chapter-drop
            className={`h-5 w-px origin-top ${s.accent}`}
          />
        </div>
      </Container>
    </div>
  );
}

export default StoryChapterBanner;
