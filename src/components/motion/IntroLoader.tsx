"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGSAP, gsap } from "@/lib/gsap";
import { Logo } from "@/components/ui";

const STORAGE_KEY = "aqro-intro-seen";

/**
 * First-visit session intro loader (≤1.15s). Assembles AQRO's signature
 * geometric shapes (ring, stem, red mark), flashes the wordmark, then parts
 * top/bottom panels to reveal the hero. Skippable on click or Escape.
 */
export function IntroLoader() {
  const [active, setActive] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    ensureGSAP();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // sessionStorage unavailable
    }
    setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const root = rootRef.current;
    if (!root) return;

    const finish = () => {
      tlRef.current?.kill();
      setActive(false);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setActive(false),
      });
      tlRef.current = tl;

      tl.fromTo(
        "[data-loader-ring]",
        { scale: 0.4, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.42, ease: "power3.out" },
      )
        .fromTo(
          "[data-loader-stem]",
          { y: 36, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.36, ease: "power3.out" },
          "-=0.28",
        )
        .fromTo(
          "[data-loader-mark]",
          { x: 18, y: -18, rotate: 35, autoAlpha: 0 },
          { x: 0, y: 0, rotate: 0, autoAlpha: 1, duration: 0.36, ease: "power3.out" },
          "-=0.24",
        )
        .fromTo(
          "[data-loader-logo]",
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.3, ease: "power3.out" },
          "-=0.15",
        )
        .to(
          "[data-loader-stage]",
          { scale: 0.94, autoAlpha: 0, duration: 0.25, ease: "power2.in" },
          "+=0.12",
        )
        .to(
          "[data-loader-top]",
          { yPercent: -100, duration: 0.48, ease: "expo.inOut" },
          "-=0.1",
        )
        .to(
          "[data-loader-bottom]",
          { yPercent: 100, duration: 0.48, ease: "expo.inOut" },
          "<",
        );
    }, root);

    return () => {
      window.removeEventListener("keydown", onKey);
      ctx.revert();
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      role="status"
      aria-label="Loading AQRO"
      onClick={() => setActive(false)}
      className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overflow-hidden"
    >
      <div data-loader-top className="absolute inset-x-0 top-0 h-1/2 bg-graphite" />
      <div data-loader-bottom className="absolute inset-x-0 bottom-0 h-1/2 bg-graphite" />

      <div data-loader-stage className="relative z-10 flex flex-col items-center gap-6 text-white">
        <svg viewBox="0 0 180 140" className="h-24 w-auto overflow-visible" aria-hidden>
          <circle
            data-loader-ring
            cx="66"
            cy="78"
            r="38"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="20"
          />
          <rect
            data-loader-stem
            x="118"
            y="40"
            width="20"
            height="86"
            fill="#FFFFFF"
          />
          <path
            data-loader-mark
            d="M110 8H154V48H132V30H110Z"
            fill="#ED1C24"
          />
        </svg>
        <div data-loader-logo>
          <Logo reverse className="h-7" />
        </div>
      </div>
    </div>
  );
}
