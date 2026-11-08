import { Etching } from "./Etching";
import { Reveal, SplitLines, InkReveal } from "./motion";
import { Button, Container, Slate } from "./ui";
import type { IllustrationName } from "@/lib/illustrations";
import type { ReactNode } from "react";

/** The closing call-to-action: AQRO blue, white type and a white-etched object. */
export function ClosingCTA({
  lines = [
    "Have an idea?",
    <span key="b">
      Let&apos;s make it <span className="font-serif font-normal italic">happen</span>
      <span className="text-red-ink">.</span>
    </span>,
  ],
  body = "From a creative concept to a complete digital product, let's build something worth remembering.",
  cta = "Start a Project",
  href = "/contact",
  art = "page-contact",
  scene = "Fin",
}: {
  lines?: ReactNode[];
  body?: string;
  cta?: string;
  href?: string;
  art?: IllustrationName;
  scene?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-blue text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "22px 22px" }} />
      <Container className="relative grid items-center gap-12 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Slate scene={scene} tone="light">
            The next scene is yours
          </Slate>
          <SplitLines
            className="mt-8 font-display text-[clamp(2.6rem,6.4vw,6rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
            lines={lines}
          />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">{body}</p>
            <div className="mt-10">
              <Button href={href} variant="red">
                {cta}
              </Button>
            </div>
          </Reveal>
        </div>
        <div className="flex justify-center lg:col-span-5 lg:justify-end">
          <InkReveal>
            <Etching name={art} tone="white" className="h-auto w-[min(80vw,440px)] opacity-90" sizes="440px" />
          </InkReveal>
        </div>
      </Container>
    </section>
  );
}
