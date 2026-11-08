import { Etching } from "@/components/Etching";
import { Button, Container, Slate } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="grain flex min-h-[80vh] items-center bg-ivory pb-20 pt-32">
      <Container className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <Slate scene="404">Missing reel</Slate>
          <h1 className="mt-8 font-display text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">
            This scene <span className="font-serif font-normal italic">didn&apos;t make the cut</span>
            <span className="text-red-ink">.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-graphite/70">The page you were looking for has moved or never existed.</p>
          <div className="mt-8">
            <Button href="/">Back to the opening</Button>
          </div>
        </div>
        <Etching name="reel" className="mx-auto w-[min(70vw,380px)] opacity-80" sizes="380px" />
      </Container>
    </section>
  );
}
