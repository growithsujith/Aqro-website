"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { services } from "@/content/site";
import { Glyph } from "./Glyph";
import { Logo } from "./ui";
import { Magnetic } from "./motion/Magnetic";
import { useScrollLock } from "./motion/SmoothScroll";

/** Routes whose hero is dark (blue/graphite), so the bar starts in white. */
const DARK_HEROES = ["/", "/about", "/services/ai-video-production", "/services/app-development"];

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const svcRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrolledRef = useRef(false);
  const hiddenRef = useRef(false);

  useScrollLock(menuOpen);

  useLenis(({ scroll, direction }) => {
    const nextScrolled = scroll > 40;
    if (nextScrolled !== scrolledRef.current) {
      scrolledRef.current = nextScrolled;
      setScrolled(nextScrolled);
    }

    if (scroll > 180 && direction === 1 && !menuOpen && !svcOpen) {
      if (!hiddenRef.current) {
        hiddenRef.current = true;
        setHidden(true);
      }
    } else if (direction === -1 || scroll <= 120) {
      if (hiddenRef.current) {
        hiddenRef.current = false;
        setHidden(false);
      }
    }
  });

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 40;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolled(next);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSvcOpen(false);
    hiddenRef.current = false;
    setHidden(false);
    scrolledRef.current = false;
    setScrolled(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSvcOpen(false);
        setMenuOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (svcRef.current && !svcRef.current.contains(e.target as Node)) setSvcOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, []);

  const dark = DARK_HEROES.includes(pathname) && !scrolled && !menuOpen;
  const isActive = (href: string) =>
    href === "/#services"
      ? pathname.startsWith("/services")
      : href === "/"
        ? pathname === "/"
        : pathname.startsWith(href);

  const openSvc = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setSvcOpen(true);
  };
  const closeSvc = () => {
    closeTimer.current = setTimeout(() => setSvcOpen(false), 140);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
      } ${
        menuOpen ? "bg-ivory" : scrolled ? "bg-ivory/90 shadow-[0_1px_0_#2929291f] backdrop-blur-md" : "bg-transparent"
      } ${dark ? "text-white" : "text-graphite"}`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-red focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" aria-label="AQRO — home" className="relative z-10 shrink-0">
          <Logo reverse={dark} className="h-7 sm:h-8" />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) =>
            l.label === "Services" ? (
              <li
                key={l.label}
                ref={svcRef}
                className="relative"
                onMouseEnter={openSvc}
                onMouseLeave={closeSvc}
              >
                <button
                  type="button"
                  aria-expanded={svcOpen}
                  aria-controls="services-menu"
                  onClick={() => setSvcOpen((v) => !v)}
                  className="relative flex items-center gap-1.5 px-4 py-2 text-[15px] tracking-tight"
                >
                  Services
                  <svg viewBox="0 0 12 12" className={`size-3 transition-transform duration-300 ${svcOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M2.5 4.5 6 8l3.5-3.5" />
                  </svg>
                  {isActive(l.href) && <ActiveDot />}
                </button>
                <AnimatePresence>
                  {svcOpen && (
                    <motion.div
                      id="services-menu"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3"
                    >
                      <div className="overflow-hidden rounded-2xl border border-graphite/15 bg-paper p-2 text-graphite shadow-[0_30px_60px_-30px_#29292966]">
                        <ul className="grid grid-cols-2 gap-1">
                          {services.map((s, i) => (
                            <motion.li
                              key={s.slug}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.04, duration: 0.28 }}
                            >
                              <Link
                                href={s.href}
                                className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-ivory"
                              >
                                <span className="grid size-14 shrink-0 place-items-center rounded-lg border border-graphite/10 bg-ivory transition-colors group-hover:bg-white">
                                  <Glyph slug={s.slug} className="w-12" />
                                </span>
                                <span>
                                  <span className="block text-[11px] font-medium text-graphite/60">{s.no}</span>
                                  <span className="block font-display text-[15px] font-semibold leading-tight">{s.name}</span>
                                  <span className="block text-xs text-graphite/70">{s.short}</span>
                                </span>
                              </Link>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={l.label}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className="group relative block px-4 py-2 text-[15px] tracking-tight"
                >
                  <span className="relative">
                    {l.label}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                  </span>
                  {isActive(l.href) && <ActiveDot />}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Magnetic>
              <Link
                href="/contact"
                className="group relative inline-flex overflow-hidden rounded-full bg-red px-5 py-2.5 text-sm font-medium text-white"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-graphite transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
                <span className="relative flex items-center gap-2">
                  <span className="relative inline-flex overflow-hidden">
                    <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
                      Start a Project
                    </span>
                    <span
                      aria-hidden
                      className="absolute inset-0 inline-block translate-y-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0"
                    >
                      Start a Project
                    </span>
                  </span>
                  <span aria-hidden className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </span>
              </Link>
            </Magnetic>
          </div>
          <button
            type="button"
            className="relative z-10 grid size-11 place-items-center rounded-full border border-current/25 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[6px] h-px w-5 bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-3 h-px w-5 bg-current transition-transform duration-300 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-ivory px-5 pb-10 pt-6 text-graphite sm:px-8 lg:hidden"
          >
            <ul className="border-t border-graphite/15">
              {links
                .filter((l) => l.label !== "Services")
                .map((l, i) => (
                  <motion.li
                    key={l.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.05 }}
                    className="border-b border-graphite/15"
                  >
                    <Link href={l.href} className="flex items-baseline justify-between py-4 font-display text-4xl font-semibold tracking-tight">
                      {l.label}
                      <span className="text-xs text-graphite/60">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
            </ul>
            <p className="mt-8 text-xs font-medium uppercase tracking-[0.14em] text-graphite/60">Services</p>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={s.href} className="flex h-full flex-col gap-2 rounded-xl border border-graphite/15 bg-paper p-3">
                    <Glyph slug={s.slug} className="w-14" />
                    <span className="font-display text-base font-semibold leading-tight">{s.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="mt-6 flex items-center justify-between rounded-full bg-red px-6 py-4 font-medium text-white">
              Start a Project <span aria-hidden>↗</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ActiveDot() {
  return (
    <motion.span
      layoutId="nav-dot"
      className="absolute -bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-red"
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      aria-hidden
    />
  );
}
