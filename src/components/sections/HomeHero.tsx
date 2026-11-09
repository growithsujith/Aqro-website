"use client";

import { useRef } from "react";
import { TAGS } from "@/content/data";
import { ensureGSAP, gsap, useGSAP } from "@/lib/gsap";
import { ScrollCue } from "@/components/motion/ScrollCue";
import DecryptedText from "@/components/reactbits/DecryptedText/DecryptedText";
import ShinyText from "@/components/reactbits/ShinyText/ShinyText";
import StarBorder from "@/components/reactbits/StarBorder/StarBorder";
import { HeroWavesBackground } from "@/components/sections/AtmosphereLayer";
import { Button, Container, Eyebrow, H1, Mark } from "@/components/ui";

/**
 * Choreographed Home Hero:
 * - Above-the-fold LCP safe (elements visible by default, subtle transform entrance)
 * - Interactive WebGL HeroWavesBackground contour lines
 * - Mouse-reactive layered depth on Crystal Meenakshi & glow (desktop only)
 * - Scroll-scrubbed exit drift
 */
export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGSAP();
      const section = sectionRef.current;
      if (!section) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero-eyebrow]",
        { y: 16, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.65, clearProps: "transform,opacity,visibility" },
      )
        .fromTo(
          "[data-hero-title]",
          { y: 24 },
          { y: 0, duration: 0.85, clearProps: "transform" },
          "-=0.45",
        )
        .fromTo(
          "[data-hero-body]",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, clearProps: "transform,opacity,visibility" },
          "-=0.55",
        )
        .fromTo(
          "[data-hero-ctas]",
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.65, clearProps: "transform,opacity,visibility" },
          "-=0.5",
        )
        .fromTo(
          "[data-hero-tag]",
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.045, clearProps: "transform,opacity,visibility" },
          "-=0.45",
        )
        .fromTo(
          "[data-hero-figure]",
          { clipPath: "inset(12% 0% 0% 0%)", y: 24 },
          { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 1, ease: "power4.out", clearProps: "clipPath,transform" },
          0.1,
        );

      // Subtle scroll-out parallax on the figure
      gsap.to("[data-hero-figure]", {
        y: -42,
        scale: 0.95,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Mouse depth on fine pointers
      if (window.matchMedia("(pointer: fine)").matches) {
        const imgLayer = section.querySelector("[data-hero-img]") as HTMLElement | null;
        const glowLayer = section.querySelector("[data-hero-glow]") as HTMLElement | null;
        if (imgLayer && glowLayer) {
          const xImg = gsap.quickTo(imgLayer, "x", { duration: 0.8, ease: "power3.out" });
          const yImg = gsap.quickTo(imgLayer, "y", { duration: 0.8, ease: "power3.out" });
          const xGlow = gsap.quickTo(glowLayer, "x", { duration: 1.1, ease: "power3.out" });
          const yGlow = gsap.quickTo(glowLayer, "y", { duration: 1.1, ease: "power3.out" });

          const onMove = (e: PointerEvent) => {
            const rect = section.getBoundingClientRect();
            const nx = (e.clientX - rect.left) / rect.width - 0.5;
            const ny = (e.clientY - rect.top) / rect.height - 0.5;
            xImg(nx * 22);
            yImg(ny * 18);
            xGlow(nx * -28);
            yGlow(ny * -22);
          };
          const onLeave = () => {
            xImg(0);
            yImg(0);
            xGlow(0);
            yGlow(0);
          };
          section.addEventListener("pointermove", onMove);
          section.addEventListener("pointerleave", onLeave);
          return () => {
            section.removeEventListener("pointermove", onMove);
            section.removeEventListener("pointerleave", onLeave);
          };
        }
      }
    },
    { scope: sectionRef },
  );

  return (
    <section id="act-spark" ref={sectionRef} className="relative overflow-hidden bg-blue text-white">
      <HeroWavesBackground />
      <Container className="relative z-10 grid min-h-[100svh] items-center gap-12 pb-16 pt-28 lg:grid-cols-12 lg:pt-24">
        <div className="relative z-10 lg:col-span-7">
          <div data-hero-eyebrow className="flex flex-wrap items-center gap-3.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
              <Mark className="size-2.5 shrink-0" color="#ED1C24" />
              <DecryptedText
                text="01 / 05 · ACT I — THE SPARK"
                animateOn="inViewHover"
                sequential
                revealDirection="start"
                speed={35}
                maxIterations={10}
                characters="AQRO0123456789/·—*"
                scrambleColor="#ED1C24"
              />
            </span>
            <Eyebrow light>
              <ShinyText
                text="Creative & technology studio"
                color="rgba(255, 255, 255, 0.85)"
                shineColor="#ffffff"
                speed={2.8}
                delay={1.4}
                shineWidth={35}
                softness={0.85}
                glow={0.25}
                trigger="loop"
              />
            </Eyebrow>
          </div>
          <h1 data-hero-title className={`mt-6 ${H1}`}>
            Ideas deserve <span className="text-white/55">extraordinary execution.</span>
          </h1>
          <p data-hero-body className="mt-7 max-w-xl text-lg leading-relaxed text-white/80">
            We bring creativity, AI and technology together to build visuals, films and digital products that move brands
            forward.
          </p>
          <div data-hero-ctas className="mt-9 flex flex-wrap items-center gap-3">
            <StarBorder
              as="div"
              radius={9999}
              thickness={1.5}
              color="#ED1C24"
              trailColor="#FFFFFF"
              backgroundColor="transparent"
              borderColor="rgba(255, 255, 255, 0.25)"
              glow={0.65}
              hover="lap"
              clickPulse
              style={{ padding: "2px" }}
            >
              <Button href="/contact" variant="white">
                Book a call
              </Button>
            </StarBorder>
            <Button href="#work" variant="outline-light" magnetic={false}>
              Explore our work
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2">
            {TAGS.map((t, i) => (
              <li
                key={t}
                data-hero-tag
                className="rounded-full border border-white/25 bg-white/[0.04] px-3.5 py-1.5 text-sm text-white/85 backdrop-blur-xs transition-colors hover:border-white/60 hover:bg-white/10"
              >
                <span className="mr-1.5 font-mono text-xs text-white/50">0{i + 1}</span>
                <DecryptedText
                  text={t}
                  animateOn="inViewHover"
                  sequential
                  revealDirection="start"
                  speed={34}
                  maxIterations={8}
                  characters="AQRO0123456789/·—*"
                  scrambleColor="#ED1C24"
                />
              </li>
            ))}
          </ul>
          <div className="mt-10 hidden lg:block">
            <ScrollCue light />
          </div>
        </div>

        <div data-hero-figure className="relative z-10 lg:col-span-5">
          <div className="relative mx-auto w-[min(78vw,460px)]">
            <div
              data-hero-glow
              aria-hidden
              className="absolute inset-x-[8%] top-[6%] aspect-square rounded-full bg-white/[0.08] blur-2xl"
            />
            <div data-hero-img>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero/meenakshi.webp"
                alt="Crystal Meenakshi holding a clapperboard, laptop, phone and pen — the four AQRO disciplines"
                width={1059}
                height={1200}
                fetchPriority="high"
                className="relative h-auto w-full drop-shadow-[0_30px_50px_rgba(0,20,60,0.45)]"
              />
            </div>
            <p className="relative mt-4 flex items-center justify-center gap-2 font-display text-lg font-semibold">
              <Mark className="size-3" /> Creative, but engineered.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
