import { CTA, SectionHead } from "@/components/blocks";
import { FAQ } from "@/components/FAQ";
import { Reveal, ScrubText, SplitReveal } from "@/components/motion";
import { FeaturedProject, Portfolio } from "@/components/Portfolio";
import { AlchemyStoryScene } from "@/components/sections/AlchemyStoryScene";
import { GraphiteDotField } from "@/components/sections/AtmosphereLayer";
import { HomeHero } from "@/components/sections/HomeHero";
import { PillarList } from "@/components/sections/PillarList";
import { PinnedServices } from "@/components/sections/PinnedServices";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ClientProof, StatBand } from "@/components/sections/ProofSection";
import { ReelStage } from "@/components/sections/ReelStage";
import { StoryChapterBanner } from "@/components/sections/StoryChapterBanner";
import { StoryProgressHUD, VelocityRibbon } from "@/components/sections/StoryProgressHUD";
import { Button, Container, Eyebrow, H2, TextLink } from "@/components/ui";
import { FAQS, PILLARS, PIPELINE } from "@/content/data";

export default function Home() {
  return (
    <>
      <StoryProgressHUD />

      {/* =====================================================================
          ACT I — THE SPARK (#act-spark)
         ===================================================================== */}
      <HomeHero />
      <VelocityRibbon />

      {/* =====================================================================
          ACT II — THE ALCHEMY (#act-alchemy)
         ===================================================================== */}
      <StoryChapterBanner
        act="Act II"
        title="The Alchemy"
        subtitle="Where human imagination, AI, and engineering fuse into one studio."
        bridge="One integrated pipeline from the first sketch to the final release — so your vision keeps its edge at every stage."
        id="act-alchemy"
      />

      <section className="bg-paper pb-20 pt-10 md:pb-28 md:pt-14">
        <Container>
          <Reveal>
            <Eyebrow>What we do</Eyebrow>
          </Reveal>
          <ScrubText
            as="p"
            className="mt-6 max-w-5xl font-display text-[clamp(1.9rem,3.8vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-balance"
          >
            AQRO is a creative and technology partner —{" "}
            <span className="text-blue">one team from the first idea to the final launch.</span>
          </ScrubText>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-graphite/75">
              Brand creatives, AI-powered video, apps and websites run through one integrated pipeline, so your idea keeps its
              shape from concept to finish.
            </p>
          </Reveal>
          <ReelStage className="mt-14" />
        </Container>
      </section>

      <AlchemyStoryScene />

      {/* =====================================================================
          ACT III — THE FOUR CRAFTS (#act-crafts)
         ===================================================================== */}
      <StoryChapterBanner
        act="Act III"
        title="The Four Crafts"
        subtitle="Creatives, AI Video Production, App Development, Web Development—working as one instrument."
        bridge="Four specialist disciplines under one roof. Each sharp on its own; unmistakable when combined."
        id="act-crafts"
      />

      <section id="services" className="scroll-mt-20 bg-paper pb-20 pt-6 md:pb-28 md:pt-10">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-4 border-b border-graphite/10 pb-6 sm:flex-row sm:items-end">
            <Eyebrow>Built on purpose, driven by creativity</Eyebrow>
            <TextLink href="/about#disciplines">Explore interactive discipline index</TextLink>
          </div>
          <PinnedServices />
        </Container>
      </section>

      {/* =====================================================================
          ACT IV — THE BLUEPRINT & PROOF (#act-blueprint)
         ===================================================================== */}
      <StoryChapterBanner
        act="Act IV"
        title="The Blueprint & Proof"
        subtitle="Strategy → Creation → Delivery, and the work that comes out the other side."
        bridge="A transparent three-stage method built around outcomes, clear milestones, and craft that speaks for itself."
        theme="dark"
        id="act-blueprint"
      />

      <section className="relative overflow-hidden bg-graphite pb-20 pt-6 text-white md:pb-28 md:pt-10">
        <GraphiteDotField withSurface={false} />
        <Container className="relative z-10">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <Eyebrow light>How we work · Full-stack from idea to launch</Eyebrow>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/50">
              03 STAGES // 09 CORE CAPABILITIES
            </p>
          </div>
          <ProcessTimeline light steps={PIPELINE} />
        </Container>
      </section>

      <section id="work" className="scroll-mt-20 bg-ivory py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Our work"
            title="Ideas brought to life."
            aside={<TextLink href="/work">View full archive</TextLink>}
          />
          <FeaturedProject />
          <Portfolio filters limit={6} />
        </Container>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <StatBand />
          <SectionHead eyebrow="Clients" title="Good work brings great brands together." />
          <ClientProof />
        </Container>
      </section>

      <section className="bg-ivory py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <Reveal>
              <Eyebrow>Why aqro</Eyebrow>
            </Reveal>
            <SplitReveal as="h2" className={`mt-5 ${H2}`}>
              Partner with us to bring your idea to life.
            </SplitReveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-lg text-graphite/75">Powered by technology, imagined by people.</p>
              <div className="mt-8">
                <Button href="/contact">Get in touch</Button>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <PillarList items={PILLARS} />
          </div>
        </Container>
      </section>

      {/* =====================================================================
          ACT V — THE INVITATION (#act-invitation)
         ===================================================================== */}
      <StoryChapterBanner
        act="Act V"
        title="The Invitation"
        subtitle="Turning your idea into something worth remembering."
        bridge="Bring us a brief, a rough napkin sketch, or an ambitious product roadmap — let's build the next chapter together."
        theme="light"
        id="act-invitation"
      />

      <section className="bg-paper pb-20 pt-8 md:pb-28 md:pt-12">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>FAQ</Eyebrow>
            </Reveal>
            <SplitReveal as="h2" className={`mt-5 ${H2}`}>
              Questions, answered.
            </SplitReveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[15px] text-graphite/70">
                Something else? <TextLink href="/contact">Ask us</TextLink>
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <FAQ items={FAQS} />
          </div>
        </Container>
      </section>

      <CTA title="Have an idea? Let's make it happen." />
    </>
  );
}
