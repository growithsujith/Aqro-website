import Link from "next/link";
import { services, site } from "@/content/site";
import { Etching } from "./Etching";
import { Container, Logo } from "./ui";

export function Footer() {
  const { email, phone, location } = site.contact;
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-graphite text-ivory">
      {/* Engraved skyline across the top edge */}
      <div className="pointer-events-none relative h-24 sm:h-32" aria-hidden>
        <Etching name="skyline" tone="ivory" className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 opacity-30" sizes="100vw" />
      </div>
      <Container className="relative pb-10">
        <div className="grid gap-12 border-t border-ivory/15 pt-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo reverse className="h-10" />
            <p className="mt-6 max-w-sm font-serif text-2xl leading-snug text-ivory/85">
              A creative and technology studio for brands that would rather be remembered than merely seen.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/55">
              Creatives, AI video production, app development and web development — conceived together, executed under one roof.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ivory/65">Studio</h2>
              <ul className="mt-5 space-y-3 text-[15px]">
                {[
                  ["Home", "/"],
                  ["About", "/about"],
                  ["Work", "/work"],
                  ["Contact", "/contact"],
                ].map(([l, h]) => (
                  <li key={h}>
                    <Link className="transition-colors hover:text-red-ink" href={h}>
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ivory/65">Services</h2>
              <ul className="mt-5 space-y-3 text-[15px]">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link className="transition-colors hover:text-red-ink" href={s.href}>
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ivory/65">Get in touch</h2>
              <ul className="mt-5 space-y-3 text-[15px]">
                {email && (
                  <li>
                    <a className="transition-colors hover:text-red-ink" href={`mailto:${email}`}>
                      {email}
                    </a>
                  </li>
                )}
                {phone && (
                  <li>
                    <a className="transition-colors hover:text-red-ink" href={`tel:${phone.replace(/\s/g, "")}`}>
                      {phone}
                    </a>
                  </li>
                )}
                {location && <li className="text-ivory/70">{location}</li>}
                <li>
                  <Link className="group inline-flex items-center gap-2 text-ivory" href="/contact">
                    Start a project
                    <span aria-hidden className="text-red-ink transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              </ul>
              {site.social.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-ivory/70">
                  {site.social.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-red-ink">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/15 pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ivory/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} AQRO. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-red" aria-hidden /> Ideas, extraordinarily executed
          </p>
        </div>
      </Container>
    </footer>
  );
}
