import type { Metadata } from "next";
import { CTA } from "@/components/blocks";
import { Reveal } from "@/components/motion";
import { Portfolio } from "@/components/Portfolio";
import { Container, Eyebrow, H1 } from "@/components/ui";

export const metadata: Metadata = {
  title: "Recents",
  description: "Recent creatives, AI videos, apps and websites by AQRO.",
};

export default function RecentsPage() {
  return (
    <>
      <section className="bg-ivory pb-14 pt-32 md:pt-40">
        <Container>
          <Reveal fade={false}>
            <Eyebrow>Our recents</Eyebrow>
            <h1 className={`mt-6 max-w-4xl ${H1}`}>
              Recent work brought <span className="text-blue">to life.</span>
            </h1>
          </Reveal>
        </Container>
      </section>
      <section className="bg-paper py-14 md:py-20">
        <Container>
          <Portfolio filters />
        </Container>
      </section>
      <CTA />
    </>
  );
}
