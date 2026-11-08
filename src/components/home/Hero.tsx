"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Projector } from "../Projector";
import { FilmStrip } from "../FilmStrip";
import { Etching } from "../Etching";
import { SplitLines } from "../motion";
import { Button } from "../ui";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  // Cursor parallax — the projector drifts slightly, background props drift more.
  const projX = useTransform(sx, (v) => v * -10);
  const projY = useTransform(sy, (v) => v * -8);
  const farX = useTransform(sx, (v) => v * 22);
  const farY = useTransform(sy, (v) => v * 16);

  // Scroll — the scene recedes as you leave it.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-blue text-white"
    >
      {/* Faint engraved props in the far plane */}
      <motion.div style={reduce ? undefined : { x: farX, y: farY }} className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 0.1 }} transition={{ delay: 1.2, duration: 1.6 }} className="absolute right-[3%] top-[14%] hidden md:block">
          <Etching name="spotlight" tone="white" className="h-44 w-auto -scale-x-100" sizes="120px" />
        </motion.div>
        <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 0.08 }} transition={{ delay: 1.4, duration: 1.6 }} className="absolute bottom-[26%] left-[46%] hidden lg:block">
          <Etching name="reel-stack" tone="white" className="h-20 w-auto" sizes="120px" />
        </motion.div>
        <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 0.07 }} transition={{ delay: 1.6, duration: 1.6 }} className="absolute left-[4%] top-[18%] hidden xl:block">
          <Etching name="director-chair" tone="white" className="h-24 w-auto" sizes="120px" />
        </motion.div>
      </motion.div>

      {/* Fine registration frame — the edges of a projected frame */}
      <div className="pointer-events-none absolute inset-x-5 bottom-[176px] top-[84px] -z-10 sm:inset-x-8 lg:inset-x-12" aria-hidden>
        {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-l border-b", "right-0 bottom-0 border-r border-b"].map((c) => (
          <span key={c} className={`absolute size-5 border-white/40 ${c}`} />
        ))}
      </div>

      <div className="relative mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 items-center gap-6 px-5 pb-4 pt-24 sm:px-8 lg:grid-cols-12 lg:px-12 lg:pt-20">
        <motion.div style={reduce ? undefined : { y: copyY }} className="relative z-10 order-2 lg:order-1 lg:col-span-7">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-white/70"
          >
            <span className="animate-rec inline-block size-2 rounded-full bg-red" aria-hidden />
            <span>Rec</span>
            <span className="h-px w-8 bg-white/40" aria-hidden />
            <span>Creative · AI · Technology</span>
          </motion.div>

          <SplitLines
            as="h1"
            animateOnMount
            className="font-display text-[clamp(2.9rem,7.4vw,7.4rem)] font-semibold leading-[0.9] tracking-[-0.045em]"
            lines={[
              <span key="1" id="hero-title">Ideas deserve</span>,
              <span key="2" className="font-serif text-[1.08em] font-normal italic tracking-[-0.02em]">
                extraordinary
              </span>,
              <span key="3">
                execution<span className="text-red-ink">.</span>
              </span>,
            ]}
          />

          <motion.p
            initial={reduce ? false : { y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
            className="mt-7 max-w-[34rem] text-lg leading-relaxed text-white/80 sm:text-xl"
          >
            We bring creativity, artificial intelligence and technology together to build visuals, experiences and digital
            products that move brands forward.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button href="/work" variant="white">
              Explore Our Work
            </Button>
            <Button href="/contact" variant="outline-light">
              Let&apos;s Talk
            </Button>
          </motion.div>
        </motion.div>

        {/* The projector, throwing light back across the headline */}
        <motion.div
          style={reduce ? undefined : { x: projX, y: projY }}
          className="relative order-1 mx-auto w-[min(62vw,300px)] sm:w-[min(52vw,360px)] lg:order-2 lg:col-span-5 lg:w-full lg:max-w-[400px] lg:justify-self-end"
        >
          <motion.div style={reduce ? undefined : { y: sceneY, opacity: fade }}>
            {/* light beam from the lens */}
            <motion.div
              aria-hidden
              initial={reduce ? false : { opacity: 0, scaleX: 0.2 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1.8, ease: EASE, delay: 0.9 }}
              className="pointer-events-none absolute right-[59%] top-[45.5%] hidden h-[150%] w-[190%] origin-right -translate-y-1/2 lg:block"
              style={{
                background: "linear-gradient(to left, rgba(255,255,255,0.22), rgba(255,255,255,0.04) 70%, transparent)",
                clipPath: "polygon(0 0, 100% 49%, 100% 51%, 0 100%)",
                filter: "blur(2px)",
              }}
            />
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
            >
              <Projector tone="white" surface="#004AAD" flip className="w-full" />
            </motion.div>
            <span className="absolute right-[58%] top-[44%] hidden size-1.5 rounded-full bg-red shadow-[0_0_14px_4px_rgba(237,28,36,.55)] lg:block" aria-hidden />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 pb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-white/70 sm:px-8 lg:px-12">
          <span>Reel 01 — What we make</span>
          <span className="hidden sm:inline">Scroll to roll ↓</span>
        </div>
        <FilmStrip tone="light" />
      </div>
    </section>
  );
}
