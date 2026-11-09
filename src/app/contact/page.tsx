import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal, RevealGroup, SplitReveal } from "@/components/motion";
import BlurText from "@/components/reactbits/BlurText/BlurText";
import DecryptedText from "@/components/reactbits/DecryptedText/DecryptedText";
import ShinyText from "@/components/reactbits/ShinyText/ShinyText";
import SpotlightCard from "@/components/reactbits/SpotlightCard/SpotlightCard";
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
          <div className="flex flex-wrap items-center gap-3.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-graphite/15 bg-paper/90 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-graphite backdrop-blur-sm">
              <Mark className="size-2.5 shrink-0" color="#ED1C24" />
              <DecryptedText
                text="ACT V · DIRECT ENQUIRY"
                animateOn="inViewHover"
                sequential
                revealDirection="start"
                speed={36}
                maxIterations={10}
                characters="AQRO0123456789/·—*"
                scrambleColor="#ED1C24"
              />
            </span>
            <Eyebrow>
              <ShinyText
                text="Contact"
                color="#292929"
                shineColor="#004aad"
                speed={2.8}
                delay={1.4}
                shineWidth={35}
                softness={0.85}
                trigger="loop"
              />
            </Eyebrow>
          </div>
        </Reveal>
        <SplitReveal as="h1" fade={false} className={`mt-6 max-w-4xl ${H1}`}>
          Let&apos;s talk about <span className="text-blue">what you&apos;re building.</span>
        </SplitReveal>
        <div className="mt-6 max-w-2xl">
          <BlurText
            as="p"
            text="Share a brief, a product idea or a campaign timeline — we read every enquiry personally and reply with a clear path forward."
            animateBy="words"
            direction="bottom"
            delay={42}
            stepDuration={0.3}
            blur={8}
            distance={16}
            trigger="view"
            className="text-lg leading-relaxed text-graphite/75"
          />
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <SpotlightCard
              spotlightColor="rgba(0, 74, 173, 0.12)"
              intensity={1}
              borderGlow={0.85}
              spotlightSize={380}
              className="p-6 sm:p-10"
              style={
                {
                  borderRadius: "1.25rem",
                  "--spotlight-card-surface": "#ffffff",
                  "--spotlight-card-border": "rgba(41, 41, 41, 0.10)",
                  "--spotlight-card-shadow":
                    "0 1px 2px rgba(41, 41, 41, 0.03), 0 18px 40px -24px rgba(41, 41, 41, 0.10)",
                } as CSSProperties
              }
            >
              <ContactForm />
            </SpotlightCard>
          </Reveal>

          <aside className="space-y-10 lg:col-span-4">
            {(email || phone || location || site.social.length > 0) && (
              <Reveal>
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
              </Reveal>
            )}
            <div>
              <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-graphite/60">What happens next</h2>
              <RevealGroup as="ol" className="mt-5 space-y-4">
                {NEXT.map((t, i) => (
                  <li key={t} data-reveal-item className="flex items-center gap-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blue font-display text-xs font-semibold text-white">
                      <DecryptedText
                        text={`0${i + 1}`}
                        animateOn="inViewHover"
                        sequential
                        revealDirection="start"
                        speed={40}
                        maxIterations={8}
                        characters="AQRO0123456789/·—*"
                        scrambleColor="#ED1C24"
                      />
                    </span>
                    <span className="text-[17px]">{t}</span>
                  </li>
                ))}
              </RevealGroup>
            </div>
            <Reveal>
              <SpotlightCard
                spotlightColor="rgba(237, 28, 36, 0.14)"
                intensity={1}
                borderGlow={0.85}
                spotlightSize={260}
                className="flex items-start gap-3 p-6"
                style={
                  {
                    borderRadius: "1rem",
                    "--spotlight-card-surface": "#ffffff",
                    "--spotlight-card-border": "rgba(41, 41, 41, 0.10)",
                  } as CSSProperties
                }
              >
                <Mark className="mt-1 size-3 shrink-0" />
                <p className="text-[15px] leading-relaxed text-graphite/75">
                  No idea is too early. Half-formed is a great place to start.
                </p>
              </SpotlightCard>
            </Reveal>
          </aside>
        </div>
      </Container>
    </section>
  );
}
