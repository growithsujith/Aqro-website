import type { Metadata } from "next";
import { CTA } from "@/components/blocks";
import { Reveal, SplitReveal } from "@/components/motion";
import { FeaturedProject, Portfolio } from "@/components/Portfolio";
import BlurText from "@/components/reactbits/BlurText/BlurText";
import DecryptedText from "@/components/reactbits/DecryptedText/DecryptedText";
import ShinyText from "@/components/reactbits/ShinyText/ShinyText";
import { VelocityRibbon } from "@/components/sections/StoryProgressHUD";
import { Container, Eyebrow, H1, Mark } from "@/components/ui";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected brand creatives, AI-produced films, mobile apps and websites by AQRO.",
};

export default function WorkPage() {
  return (
    <>
      <section className="bg-ivory pb-20 pt-32 md:pb-28 md:pt-40">
        <Container>
          <Reveal fade={false}>
            <div className="flex flex-wrap items-center gap-3.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-graphite/15 bg-paper/90 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-graphite backdrop-blur-sm">
                <Mark className="size-2.5 shrink-0" color="#ED1C24" />
                <DecryptedText
                  text="ARCHIVE · 01–04 DISCIPLINES"
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
                  text="Our work"
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
            Ideas <span className="text-blue">brought to life.</span>
          </SplitReveal>
          <div className="mt-6 max-w-2xl">
            <BlurText
              as="p"
              text="Brand creatives, AI commercials and films, mobile apps and websites — conceived and built under one roof."
              animateBy="words"
              direction="bottom"
              delay={45}
              stepDuration={0.32}
              blur={8}
              distance={18}
              trigger="view"
              className="text-lg leading-relaxed text-graphite/75"
            />
          </div>

          <div className="mt-14">
            <FeaturedProject />
            <Portfolio filters stickyFilters />
          </div>
        </Container>
      </section>

      <VelocityRibbon
        items={[
          "SELECTED RELEASES",
          "01 · BRAND CREATIVES",
          "02 · AI COMMERCIALS & FILMS",
          "03 · MOBILE APPS",
          "04 · WEBSITES & WEB APPS",
        ]}
      />

      <CTA title="Have an idea? Let's make it happen." />
    </>
  );
}
