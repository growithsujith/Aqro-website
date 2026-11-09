import { Reveal, SplitReveal } from "@/components/motion";
import { Button, Container, Eyebrow, H1 } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-ivory pb-20 pt-32">
      <Container>
        <Reveal fade={false}>
          <Eyebrow>404</Eyebrow>
        </Reveal>
        <SplitReveal as="h1" fade={false} className={`mt-6 max-w-3xl ${H1}`}>
          This page <span className="text-blue">doesn&apos;t exist.</span>
        </SplitReveal>
        <Reveal delay={0.1} className="mt-10">
          <Button href="/">Back to home</Button>
        </Reveal>
      </Container>
    </section>
  );
}
