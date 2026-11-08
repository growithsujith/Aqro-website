import type { Metadata } from "next";
import { Etching } from "@/components/Etching";
import { InkReveal, Reveal, SplitLines } from "@/components/motion";
import { Container, Slate } from "@/components/ui";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ClosingCTA } from "@/components/ClosingCTA";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected creative, AI video, app and web projects by AQRO.",
};

export default function WorkPage() {
  return (
    <>
      <section className="grain relative overflow-hidden bg-ivory pt-32 md:pt-40">
        <Container className="grid items-end gap-10 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Slate scene="R1">The portfolio</Slate>
            <SplitLines
              as="h1"
              animateOnMount
              className="mt-10 font-display text-[clamp(3rem,8vw,8rem)] font-semibold leading-[0.9] tracking-[-0.045em]"
              lines={[
                <span key="a">
                  The <span className="font-serif font-normal italic">archive</span>
                  <span className="text-red-ink">.</span>
                </span>,
              ]}
            />
            <Reveal delay={0.4} fade={false}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-graphite/75">
                Campaigns, films, apps and websites — each one an idea we were trusted to bring to life. Filter by discipline,
                or open a project to see how it was made.
              </p>
            </Reveal>
          </div>
          <InkReveal className="lg:col-span-4" delay={0.2}>
            <Etching name="page-work" className="ml-auto w-[min(70vw,380px)]" sizes="380px" priority />
          </InkReveal>
        </Container>
      </section>
      <section className="border-t border-graphite/15 bg-paper py-16 md:py-24">
        <Container>
          <ProjectGallery />
        </Container>
      </section>
      <ClosingCTA />
    </>
  );
}
