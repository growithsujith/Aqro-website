"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { ensureGSAP, gsap, ScrollTrigger } from "@/lib/gsap";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();
  const [reduceMotion, setReduceMotion] = useState(false);

  const syncScrollTriggers = useCallback(() => {
    if (typeof window === "undefined") return;
    ensureGSAP();
    lenisRef.current?.lenis?.resize();
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  }, []);

  // Keep ScrollTrigger updated on every Lenis scroll emission once Lenis is mounted
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    ensureGSAP();
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    ScrollTrigger.clearScrollMemory("manual");

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches);
      requestAnimationFrame(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    ensureGSAP();

    let subscribedLenis: NonNullable<LenisRef["lenis"]> | null = null;
    let unsubscribeScroll: (() => void) | undefined;

    function bindLenisScroll() {
      const currentLenis = lenisRef.current?.lenis ?? null;
      if (currentLenis && currentLenis !== subscribedLenis) {
        unsubscribeScroll?.();
        subscribedLenis = currentLenis;
        unsubscribeScroll = currentLenis.on("scroll", ScrollTrigger.update);
        currentLenis.resize();
      }
    }

    function update(time: number) {
      bindLenisScroll();
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    bindLenisScroll();

    const onLoad = () => syncScrollTriggers();
    if (document.readyState === "complete") {
      requestAnimationFrame(onLoad);
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }
    document.fonts?.ready?.then(() => syncScrollTriggers()).catch(() => {});

    // Observe main content layout shifts (e.g. lazy images or breakpoint changes)
    // while ignoring height changes caused during active scrolling
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    let lastMainHeight = 0;
    const mainEl = document.getElementById("main");
    const ro =
      typeof ResizeObserver !== "undefined" && mainEl
        ? new ResizeObserver((entries) => {
            const nextHeight = Math.round(entries[0]?.contentRect.height ?? 0);
            if (Math.abs(nextHeight - lastMainHeight) < 4) return;
            lastMainHeight = nextHeight;
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
              syncScrollTriggers();
            }, 180);
          })
        : null;
    if (ro && mainEl) {
      ro.observe(mainEl);
    }

    return () => {
      clearTimeout(resizeTimer);
      ro?.disconnect();
      gsap.ticker.remove(update);
      unsubscribeScroll?.();
      subscribedLenis = null;
      window.removeEventListener("load", onLoad);
    };
  }, [reduceMotion, syncScrollTriggers]);

  // Synchronously reset scroll position BEFORE/WITH child useGSAP layout effects on route change
  useIsomorphicLayoutEffect(() => {
    ensureGSAP();
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (!hash) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      lenisRef.current?.lenis?.scrollTo(0, { immediate: true, force: true });
    }
    ScrollTrigger.clearScrollMemory("manual");

    const rafId = requestAnimationFrame(() => {
      if (!hash) {
        window.scrollTo(0, 0);
        lenisRef.current?.lenis?.scrollTo(0, { immediate: true, force: true });
      }
      syncScrollTriggers();
    });
    const timer1 = setTimeout(() => {
      syncScrollTriggers();
    }, 120);
    const timer2 = setTimeout(() => {
      syncScrollTriggers();
    }, 420);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname, syncScrollTriggers]);

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: false,
        lerp: 0.09,
        wheelMultiplier: 0.9,
        smoothWheel: true,
        anchors: { offset: -80 },
      }}
    >
      {children}
    </ReactLenis>
  );
}

/** Hook helper to pause/resume Lenis when modals or menus open */
export function useScrollLock(locked: boolean) {
  const lenis = useLenis();
  useEffect(() => {
    if (locked) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [locked, lenis]);
}
