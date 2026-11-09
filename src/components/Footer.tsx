"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { services, site } from "@/content/site";
import { ensureGSAP, gsap, useGSAP } from "@/lib/gsap";
import { Container, Logo, Mark } from "./ui";

export function Footer() {
  const { email, phone, location } = site.contact;
  const footerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      ensureGSAP();
      const root = footerRef.current;
      if (!root) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const letters = root.querySelectorAll("[data-footer-letter]");
      if (letters.length) {
        gsap.fromTo(
          letters,
          { yPercent: 75, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            stagger: 0.08,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: root,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      }
    },
    { scope: footerRef, dependencies: [pathname] },
  );

  return (
    <footer ref={footerRef} className="relative overflow-hidden bg-graphite text-white">
      <Container className="pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo reverse className="h-9" />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/70">
              Creatives, AI video, apps and websites — conceived together, executed under one roof.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            <FooterCol
              title="Company"
              links={[
                ["Work", "/work"],
                ["About", "/about"],
                ["Contact", "/contact"],
              ]}
            />
            <FooterCol title="Services" links={services.map((s) => [s.name, s.href] as [string, string])} />
            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-white/55">Get in touch</h2>
              <ul className="mt-5 space-y-3 text-[15px]">
                {email && (
                  <li>
                    <a className="hover:text-red" href={`mailto:${email}`}>
                      {email}
                    </a>
                  </li>
                )}
                {phone && (
                  <li>
                    <a className="hover:text-red" href={`tel:${phone.replace(/\s/g, "")}`}>
                      {phone}
                    </a>
                  </li>
                )}
                {location && <li className="text-white/70">{location}</li>}
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-red">
                      {s.label} ↗
                    </a>
                  </li>
                ))}
                <li>
                  <Link className="group inline-flex items-center gap-2" href="/contact">
                    Start a project <span aria-hidden className="text-red transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Giant scrubbed AQRO signature wordmark */}
        <div
          aria-hidden
          className="mt-12 flex items-end justify-between border-t border-white/15 pt-8 select-none overflow-hidden"
        >
          <div className="flex font-display text-[clamp(4.5rem,18vw,15rem)] font-bold leading-[0.82] tracking-[-0.06em] text-white/[0.08]">
            {["a", "q", "r", "o"].map((ch) => (
              <span key={ch} data-footer-letter className="inline-block">
                {ch}
              </span>
            ))}
          </div>
          <Mark className="mb-3 size-8 shrink-0 sm:size-12" />
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AQRO. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <Mark className="size-2.5" /> Ideas, extraordinarily executed
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-white/55">{title}</h2>
      <ul className="mt-5 space-y-3 text-[15px]">
        {links.map(([l, h]) => (
          <li key={h}>
            <Link className="transition-colors hover:text-red" href={h}>
              {l}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
