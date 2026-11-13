import Link from "next/link";
import { services, site } from "@/content/site";
import { Container, Logo, Mark } from "./ui";

export function Footer() {
  const { email, phone, location } = site.contact;
  return (
    <footer className="bg-graphite text-white">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo reverse className="h-9" />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/70">
              Creatives, AI video, apps and websites — conceived together, executed under one roof.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            <FooterCol title="Company" links={[["About", "/about"], ["Recents", "/recents"], ["Contact", "/contact"]]} />
            <FooterCol title="Services" links={services.map((s) => [s.name, s.href] as [string, string])} />
            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-white/55">Get in touch</h2>
              <ul className="mt-5 space-y-3 text-[15px]">
                {email && <li><a className="hover:text-red" href={`mailto:${email}`}>{email}</a></li>}
                {phone && <li><a className="hover:text-red" href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a></li>}
                {location && <li className="text-white/70">{location}</li>}
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-red">{s.label} ↗</a>
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
        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
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
