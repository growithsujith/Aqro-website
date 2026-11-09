"use client";

import Link from "next/link";
import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { Glyph } from "@/components/Glyph";
import BlurText from "@/components/reactbits/BlurText/BlurText";
import DecryptedText from "@/components/reactbits/DecryptedText/DecryptedText";
import { Mark } from "@/components/ui";
import { services, type Service } from "@/content/site";
import { ensureGSAP, gsap, useGSAP } from "@/lib/gsap";

export interface InteractiveDisciplinesProps {
  /** Custom discipline items; defaults to AQRO's 4 core `services` from `@/content/site`. */
  items?: Service[];
  /** Visual surface theme (`"light"` for paper/ivory surfaces, `"dark"` for graphite/blue surfaces). */
  variant?: "light" | "dark";
  /** Optional intro subtitle rendered above the discipline rows using ReactBits `BlurText`. */
  subtitle?: string;
  /** Whether to render the optional intro header block when `subtitle` is provided. Defaults to `true`. */
  showHeader?: boolean;
  /** Whether to display offer capability pills inside each row's reveal area. Defaults to `true`. */
  showTags?: boolean;
  /** Additional classes for the root section container. */
  className?: string;
}

/**
 * Interactive 4-disciplines showcase for `/about` and Home.
 * - Uses ReactBits `DecryptedText` for discipline numbers (`01`..`04`).
 * - Uses ReactBits `BlurText` for discipline subtitles (`s.short`) and optional section subtitle.
 * - Features a GSAP-powered liquid hover reveal showing each discipline's crystal `Glyph`
 *   and short description while linking directly to `s.href`.
 * - Respects `prefers-reduced-motion` via `gsap.matchMedia()`.
 */
export function InteractiveDisciplines({
  items = services,
  variant = "light",
  subtitle,
  showHeader = true,
  showTags = true,
  className = "",
}: InteractiveDisciplinesProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHoveringList, setIsHoveringList] = useState<boolean>(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const vesselRef = useRef<HTMLDivElement>(null);
  const vesselInnerRef = useRef<HTMLDivElement>(null);
  const bandRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

  const quickXRef = useRef<gsap.QuickToFunc | null>(null);
  const quickYRef = useRef<gsap.QuickToFunc | null>(null);
  const quickRotateRef = useRef<gsap.QuickToFunc | null>(null);
  const quickScaleXRef = useRef<gsap.QuickToFunc | null>(null);
  const quickScaleYRef = useRef<gsap.QuickToFunc | null>(null);
  const lastPointerRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const reducedMotionRef = useRef<boolean>(false);

  const activeService = items[activeIndex] ?? items[0];
  const isDark = variant === "dark";

  useGSAP(
    () => {
      ensureGSAP();
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          canAnimate: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const reduced = Boolean(context.conditions?.reduced);
          reducedMotionRef.current = reduced;

          const itemsEls = rowRefs.current.filter(Boolean) as HTMLLIElement[];
          if (itemsEls.length > 0) {
            if (reduced) {
              gsap.set(itemsEls, { clearProps: "all" });
            } else {
              gsap.fromTo(
                itemsEls,
                { y: 24, autoAlpha: 0 },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.75,
                  stagger: 0.09,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: root,
                    start: "top 85%",
                    once: true,
                  },
                },
              );
            }
          }

          if (!reduced && vesselRef.current && vesselInnerRef.current) {
            quickXRef.current = gsap.quickTo(vesselRef.current, "x", {
              duration: 0.55,
              ease: "power3.out",
            });
            quickYRef.current = gsap.quickTo(vesselRef.current, "y", {
              duration: 0.55,
              ease: "power3.out",
            });
            quickRotateRef.current = gsap.quickTo(vesselInnerRef.current, "rotation", {
              duration: 0.45,
              ease: "power2.out",
            });
            quickScaleXRef.current = gsap.quickTo(vesselInnerRef.current, "scaleX", {
              duration: 0.35,
              ease: "sine.out",
            });
            quickScaleYRef.current = gsap.quickTo(vesselInnerRef.current, "scaleY", {
              duration: 0.35,
              ease: "sine.out",
            });
          }

          return () => {
            quickXRef.current = null;
            quickYRef.current = null;
            quickRotateRef.current = null;
            quickScaleXRef.current = null;
            quickScaleYRef.current = null;
          };
        },
      );

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [items.length] },
  );

  const animateLiquidBand = (index: number, entering: boolean, clientY?: number) => {
    const band = bandRefs.current[index];
    const row = rowRefs.current[index];
    if (!band || !row) return;

    const rect = row.getBoundingClientRect();
    const fromTop = clientY !== undefined ? clientY - rect.top < rect.height / 2 : true;

    if (reducedMotionRef.current) {
      gsap.set(band, {
        scaleY: entering ? 1 : 0,
        transformOrigin: "center center",
        borderRadius: "0px",
      });
      return;
    }

    gsap.killTweensOf(band);
    if (entering) {
      gsap.fromTo(
        band,
        {
          scaleY: 0,
          transformOrigin: fromTop ? "50% 0%" : "50% 100%",
          borderRadius: fromTop ? "0px 0px 48% 48%" : "48% 48% 0px 0px",
        },
        {
          scaleY: 1,
          borderRadius: "0px 0px 0px 0px",
          duration: 0.52,
          ease: "expo.out",
        },
      );
    } else {
      gsap.to(band, {
        scaleY: 0,
        transformOrigin: fromTop ? "50% 0%" : "50% 100%",
        borderRadius: fromTop ? "0px 0px 42% 42%" : "42% 42% 0px 0px",
        duration: 0.42,
        ease: "power3.inOut",
      });
    }
  };

  const handleListMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (reducedMotionRef.current || !rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const relX = event.clientX - rect.left;
    const relY = event.clientY - rect.top;

    const now = performance.now();
    const dt = Math.max(16, now - lastPointerRef.current.time);
    const vx = ((relX - lastPointerRef.current.x) / dt) * 16;
    const vy = ((relY - lastPointerRef.current.y) / dt) * 16;
    lastPointerRef.current = { x: relX, y: relY, time: now };

    const targetX = Math.min(Math.max(relX - 150, rect.width * 0.48), rect.width - 320);
    const targetY = Math.min(Math.max(relY - 140, 12), Math.max(12, rect.height - 290));

    quickXRef.current?.(targetX);
    quickYRef.current?.(targetY);

    const speed = Math.min(Math.hypot(vx, vy), 28);
    const stretch = 1 + (speed / 28) * 0.06;
    const squash = 1 - (speed / 28) * 0.04;
    const tilt = Math.max(-7, Math.min(7, vx * 0.32));

    quickRotateRef.current?.(tilt);
    quickScaleXRef.current?.(stretch);
    quickScaleYRef.current?.(squash);
  };

  const handleListMouseLeave = () => {
    setIsHoveringList(false);
    if (!reducedMotionRef.current) {
      quickRotateRef.current?.(0);
      quickScaleXRef.current?.(1);
      quickScaleYRef.current?.(1);
    }
  };

  return (
    <div
      ref={rootRef}
      onMouseMove={handleListMouseMove}
      onMouseEnter={() => setIsHoveringList(true)}
      onMouseLeave={handleListMouseLeave}
      className={`relative ${className}`}
    >
      {showHeader && subtitle ? (
        <div className="mb-8 max-w-2xl">
          <BlurText
            as="p"
            text={subtitle}
            animateBy="words"
            direction="bottom"
            delay={45}
            stepDuration={0.3}
            blur={8}
            distance={18}
            trigger="view"
            className={`text-[16px] leading-relaxed ${
              isDark ? "text-white/75" : "text-graphite/75"
            }`}
          />
        </div>
      ) : null}

      <ol
        className={`relative border-b ${
          isDark ? "border-white/15" : "border-graphite/15"
        }`}
      >
        {items.map((s, index) => {
          const isCurrent = index === activeIndex;

          return (
            <li
              key={s.slug}
              ref={(node) => {
                rowRefs.current[index] = node;
              }}
              className={`relative overflow-hidden border-t ${
                isDark ? "border-white/15" : "border-graphite/15"
              }`}
            >
              {/* Liquid Hover Fill Layer */}
              <span
                ref={(node) => {
                  bandRefs.current[index] = node;
                }}
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 origin-top scale-y-0 ${
                  isDark ? "bg-blue" : "bg-blue"
                }`}
              />

              <Link
                href={s.href}
                onMouseEnter={(e) => {
                  setActiveIndex(index);
                  setIsHoveringList(true);
                  animateLiquidBand(index, true, e.clientY);
                }}
                onMouseLeave={(e) => {
                  animateLiquidBand(index, false, e.clientY);
                }}
                onFocus={() => {
                  setActiveIndex(index);
                  animateLiquidBand(index, true);
                }}
                onBlur={() => {
                  animateLiquidBand(index, false);
                }}
                className="group relative z-10 grid items-center gap-6 px-3 py-7 transition-colors duration-300 sm:px-6 md:py-9 lg:grid-cols-12"
              >
                {/* 1 — Decrypted Discipline Number (01..04) */}
                <div className="flex items-center gap-3 lg:col-span-2">
                  <Mark
                    className="size-2.5 shrink-0 transition-transform duration-500 group-hover:rotate-90"
                    color="#ED1C24"
                  />
                  <DecryptedText
                    text={s.no}
                    animateOn="inViewHover"
                    sequential
                    revealDirection="start"
                    speed={45}
                    maxIterations={10}
                    characters="0123456789/+#*"
                    scrambleColor="#ED1C24"
                    className={`font-display text-base font-semibold tracking-[0.14em] transition-colors duration-300 sm:text-lg ${
                      isDark
                        ? "text-white group-hover:text-white"
                        : "text-red-ink group-hover:text-white"
                    }`}
                    encryptedClassName="font-display text-base font-semibold tracking-[0.14em] text-red sm:text-lg"
                  />
                  <span
                    aria-hidden="true"
                    className={`font-display text-xs tracking-[0.18em] transition-colors duration-300 ${
                      isDark
                        ? "text-white/35 group-hover:text-white/65"
                        : "text-graphite/35 group-hover:text-white/65"
                    }`}
                  >
                    / 0{items.length}
                  </span>
                </div>

                {/* 2 — Discipline Title & Category Tag */}
                <div className="lg:col-span-4">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3
                      className={`font-display text-2xl font-semibold tracking-tight transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 sm:text-3xl lg:text-[2.1rem] ${
                        isDark
                          ? "text-white group-hover:text-white"
                          : "text-graphite group-hover:text-white"
                      }`}
                    >
                      {s.name}
                    </h3>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                        isDark
                          ? "border-white/20 text-white/60 group-hover:border-white/35 group-hover:text-white/90"
                          : "border-graphite/15 text-graphite/60 group-hover:border-white/35 group-hover:text-white/90"
                      }`}
                    >
                      {s.workLabel}
                    </span>
                  </div>
                </div>

                {/* 3 — BlurText Subtitle (s.short) + Expandable Offer Pills */}
                <div className="lg:col-span-4">
                  <BlurText
                    as="span"
                    text={s.short}
                    animateBy="words"
                    direction="bottom"
                    delay={38}
                    stepDuration={0.28}
                    blur={6}
                    distance={14}
                    trigger="view"
                    className={`text-[15px] leading-relaxed transition-colors duration-300 ${
                      isDark
                        ? "text-white/70 group-hover:text-white/90"
                        : "text-graphite/75 group-hover:text-white/90"
                    }`}
                  />

                  {showTags && s.offer.length > 0 ? (
                    <div
                      className={`mt-2.5 flex flex-wrap gap-1.5 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isCurrent
                          ? "max-h-20 opacity-100"
                          : "max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100"
                      }`}
                    >
                      {s.offer.slice(0, 3).map((item) => (
                        <span
                          key={item.t}
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors duration-300 ${
                            isDark
                              ? "bg-white/10 text-white/75 group-hover:bg-white/15 group-hover:text-white"
                              : "bg-ivory text-graphite/70 group-hover:bg-white/15 group-hover:text-white"
                          }`}
                        >
                          {item.t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                {/* 4 — Inline Liquid Glyph Capsule & Arrow CTA */}
                <div className="flex items-center justify-between gap-4 lg:col-span-2 lg:justify-end">
                  <span
                    className={`relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl p-2.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:rounded-[22px] ${
                      isDark
                        ? "bg-white/10 group-hover:bg-white/15"
                        : "bg-ivory group-hover:bg-white/15"
                    }`}
                  >
                    <Glyph
                      slug={s.slug}
                      tone={isDark ? "silver" : "blue"}
                      className="w-12 transition-opacity duration-300 group-hover:opacity-0"
                    />
                    <Glyph
                      slug={s.slug}
                      tone="silver"
                      className="absolute inset-0 m-auto w-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </span>

                  <span
                    aria-hidden="true"
                    className={`grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 ${
                      isDark
                        ? "border-white/20 text-white/70 group-hover:border-white group-hover:bg-white group-hover:text-blue"
                        : "border-graphite/15 text-graphite/60 group-hover:border-white group-hover:bg-white group-hover:text-blue"
                    }`}
                  >
                    →
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>

      {/* Floating Liquid Hover Reveal Vessel (Desktop Pointer Preview) */}
      {activeService ? (
        <div
          ref={vesselRef}
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 top-0 z-20 hidden w-[300px] transition-opacity duration-500 lg:block ${
            isHoveringList ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            ref={vesselInnerRef}
            className="relative overflow-hidden rounded-[28px] border border-white/20 bg-graphite/95 p-6 text-white shadow-[0_28px_70px_-15px_rgba(0,42,98,0.45)] backdrop-blur-md"
          >
            {/* Ambient liquid radial glow */}
            <div
              className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full opacity-55 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,74,173,0.95) 0%, rgba(237,28,36,0.45) 65%, transparent 100%)",
              }}
            />

            <div className="relative flex items-center justify-between">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                {activeService.no} — {activeService.workLabel}
              </span>
              <Mark className="size-3.5" color="#ED1C24" />
            </div>

            <div className="relative my-5 flex h-36 items-center justify-center rounded-2xl bg-gradient-to-br from-blue/90 via-blue-deep to-graphite p-4">
              <Glyph
                slug={activeService.slug}
                tone="silver"
                className="max-h-28 w-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
              />
            </div>

            <p className="relative font-display text-lg font-semibold leading-snug tracking-tight text-white">
              {activeService.name}
            </p>
            <p className="relative mt-1.5 text-xs leading-relaxed text-white/75">
              {activeService.short}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default InteractiveDisciplines;
