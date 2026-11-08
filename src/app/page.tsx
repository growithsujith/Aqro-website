import { Composition } from "@/components/Composition";
import { ClientGrid, CTA, SectionHead, ServiceCards, Steps } from "@/components/blocks";
import { Reveal } from "@/components/motion";
import { Portfolio } from "@/components/Portfolio";
import { Button, Container, Eyebrow, H1, TextLink } from "@/components/ui";

const PROCESS = [
  { t: "Discover", d: "Understand the idea, audience and objective." },
  { t: "Strategise", d: "Set the creative or technical direction." },
  { t: "Create", d: "Execute with the right tools and people." },
  { t: "Deliver", d: "Refine, test and launch." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-blue text-white">
        <Container className="grid min-h-[100svh] items-center gap-10 pb-16 pt-28 lg:grid-cols-12 lg:pt-24">
          <div className="relative z-10 lg:col-span-7">
            <Reveal fade={false}>
              <Eyebrow light>Creative & technology studio</Eyebrow>
              <h1 className={`mt-6 ${H1} lg:text-[clamp(3rem,6.6vw,6.25rem)]`}>
                Ideas deserve <span className="text-white/55">extraordinary execution.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/80">
                We bring creativity, AI and technology together to build visuals, experiences and digital products that move
                brands forward.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/work" variant="white">
                  Explore Our Work
                </Button>
                <Button href="/contact" variant="outline-light">
                  Let&apos;s Talk
                </Button>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Composition className="mx-auto w-[min(78vw,520px)]" />
          </div>
        </Container>
      </section>

      {/* Intro */}
      <section className="bg-paper py-20 md:py-28">
        <Container className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow>About aqro</Eyebrow>
            <p className="mt-5 font-display text-[clamp(1.8rem,3.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-balance">
              Where creativity meets technology — one team from the first idea to the final launch.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="text-[17px] leading-relaxed text-graphite/75">
              Brand creatives, AI-powered video, apps and websites, planned together so your idea keeps its shape.
            </p>
            <div className="mt-5">
              <TextLink href="/about">More about us</TextLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Services */}
      <section className="bg-ivory py-20 md:py-28">
        <Container>
          <SectionHead eyebrow="Services" title="What we bring to life." />
          <ServiceCards />
        </Container>
      </section>

      {/* Work */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <SectionHead eyebrow="Selected work" title="Ideas brought to life." aside={<TextLink href="/work">View all work</TextLink>} />
          <Portfolio filters limit={6} />
        </Container>
      </section>

      {/* Clients */}
      <section className="bg-paper pb-20 md:pb-28">
        <Container>
          <SectionHead eyebrow="Clients" title="Good work brings great brands together." />
          <Reveal>
            <ClientGrid />
          </Reveal>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-ivory py-20 md:py-28">
        <Container>
          <SectionHead eyebrow="How we work" title="Four steps. No surprises." />
          <Steps steps={PROCESS} />
        </Container>
      </section>

      <CTA />
    </>
  );
}
