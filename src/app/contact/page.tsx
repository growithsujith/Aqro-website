import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion";
import { Container, Eyebrow, H1, Mark } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell AQRO about your project — creatives, AI video, app or web development.",
};

const NEXT = ["We read your brief", "We set up a call", "You get a clear proposal"];

export default function ContactPage() {
  const { email, phone, location } = site.contact;
  return (
    <section className="bg-ivory pb-24 pt-32 md:pb-32 md:pt-40">
      <Container>
        <Reveal fade={false}>
          <Eyebrow>Contact</Eyebrow>
          <h1 className={`mt-6 max-w-4xl ${H1}`}>
            Let&apos;s talk about <span className="text-blue">what you&apos;re building.</span>
          </h1>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-12">
          <Reveal className="rounded-2xl bg-white p-6 sm:p-10 lg:col-span-8">
            <ContactForm />
          </Reveal>

          <aside className="space-y-10 lg:col-span-4">
            {(email || phone || location || site.social.length > 0) && (
              <div>
                <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-graphite/60">Direct</h2>
                <ul className="mt-4 space-y-2 text-lg">
                  {email && (
                    <li>
                      <a href={`mailto:${email}`} className="hover:text-blue">
                        {email}
                      </a>
                    </li>
                  )}
                  {phone && (
                    <li>
                      <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-blue">
                        {phone}
                      </a>
                    </li>
                  )}
                  {location && <li className="text-graphite/70">{location}</li>}
                  {site.social.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-blue">
                        {s.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-graphite/60">What happens next</h2>
              <ol className="mt-5 space-y-4">
                {NEXT.map((t, i) => (
                  <li key={t} className="flex items-center gap-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blue font-display text-sm font-semibold text-white">{i + 1}</span>
                    <span className="text-[17px]">{t}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-white p-6">
              <Mark className="mt-1 size-3 shrink-0" />
              <p className="text-[15px] leading-relaxed text-graphite/75">No idea is too early. Half-formed is a great place to start.</p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
