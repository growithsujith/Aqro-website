import type { Metadata } from "next";
import { Etching } from "@/components/Etching";
import { ContactForm } from "@/components/ContactForm";
import { InkReveal, Reveal, SplitLines } from "@/components/motion";
import { Container, Slate } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell AQRO about your project — creatives, AI video, app or web development.",
};

const NEXT = [
  ["We read it", "A real person reads your brief and works out the right people to involve."],
  ["We talk", "We reply to set up a conversation about goals, scope and timing."],
  ["We propose", "You receive a clear plan with approach, timeline and cost."],
];

export default function ContactPage() {
  const { email, phone, location } = site.contact;
  const hasDetails = Boolean(email || phone || location || site.social.length);
  return (
    <section className="grain relative overflow-hidden bg-ivory pb-24 pt-32 md:pb-32 md:pt-40">
      <Container>
        <Slate scene="T1">Contact</Slate>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <SplitLines
            as="h1"
            animateOnMount
            className="font-display text-[clamp(2.9rem,7vw,7rem)] font-semibold leading-[0.92] tracking-[-0.045em] lg:col-span-8"
            lines={[
              "Let's talk about",
              <span key="b">
                what you&apos;re <span className="font-serif font-normal italic text-blue">building</span>
                <span className="text-red-ink">.</span>
              </span>,
            ]}
          />
          <InkReveal className="hidden lg:col-span-4 lg:block" delay={0.3}>
            <Etching name="page-contact" alt="Engraved vintage telephone and envelope" priority className="ml-auto w-full max-w-[340px]" sizes="340px" />
          </InkReveal>
        </div>

        <div className="mt-16 grid gap-16 border-t border-graphite/15 pt-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ContactForm />
          </Reveal>

          <aside className="space-y-12 lg:col-span-4 lg:col-start-9">
            {hasDetails && (
              <div>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-graphite/65">Direct</h2>
                <ul className="mt-5 space-y-3 text-lg">
                  {email && (
                    <li>
                      <a href={`mailto:${email}`} className="underline decoration-graphite/25 underline-offset-4 hover:decoration-red">
                        {email}
                      </a>
                    </li>
                  )}
                  {phone && (
                    <li>
                      <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
                    </li>
                  )}
                  {location && <li className="text-graphite/70">{location}</li>}
                </ul>
                {site.social.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-4 text-sm">
                    {site.social.map((s) => (
                      <li key={s.href}>
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-red-ink">
                          {s.label} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-graphite/65">What happens next</h2>
              <ol className="mt-6 space-y-6">
                {NEXT.map(([t, d], i) => (
                  <li key={t} className="grid grid-cols-[2.5rem_1fr] gap-2">
                    <span className="font-mono text-sm text-red-ink">0{i + 1}</span>
                    <div>
                      <p className="font-display text-xl font-semibold tracking-tight">{t}</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-graphite/65">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border border-graphite/15 bg-paper p-6">
              <Etching name="lamp" className="h-20 w-auto" sizes="80px" />
              <p className="mt-4 font-serif text-xl italic leading-snug">
                No idea is too early. Half-formed is often the most interesting place to start.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
