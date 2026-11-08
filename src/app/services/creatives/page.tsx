import type { Metadata } from "next";
import { Etching } from "@/components/Etching";
import { InkReveal, Reveal, SplitLines } from "@/components/motion";
import { Button, Container, Slate } from "@/components/ui";
import { Capabilities, FAQBlock, PortfolioBlock, ProcessBlock, Related, SectionHead } from "@/components/service/sections";
import { ClosingCTA } from "@/components/ClosingCTA";
import type { IllustrationName } from "@/lib/illustrations";

export const metadata: Metadata = {
  title: "Creatives",
  description:
    "Brand identity, advertising creatives, social media design, campaign design and product visuals from AQRO's creative studio.",
};

const OFFER: { t: string; d: string; art: IllustrationName; glyph: string }[] = [
  { t: "Advertising creatives", d: "Print, digital and outdoor ads built around one sharp idea — designed to stop the scroll and survive the glance.", art: "megaphone", glyph: "Ad" },
  { t: "Brand identity & visual direction", d: "Logos, type, colour and the rules that hold them together, so every touchpoint looks unmistakably yours.", art: "type-t", glyph: "Aa" },
  { t: "Social media creatives", d: "Platform-native posts, carousels and stories designed as systems, not one-offs, so you can keep publishing.", art: "photos", glyph: "#" },
  { t: "Campaign design", d: "Key visuals and full campaign toolkits that stretch from launch hero to the smallest banner without losing their edge.", art: "storyboard", glyph: "Kv" },
  { t: "Product-focused visuals", d: "Product stills, compositions and packaging visuals that make the thing itself the hero.", art: "camera-photo", glyph: "Px" },
  { t: "Graphic design", d: "Brochures, decks, editorial layouts and everything in between, set with care down to the last baseline.", art: "pen-tool", glyph: "Gd" },
];

const FAQS = [
  { q: "What do you need from us to start?", a: "A short brief is enough: what you're launching, who it's for and where it will appear. If you have existing brand guidelines, assets or past campaigns, share them — we'll build on what works rather than start over." },
  { q: "Can you work within our existing brand guidelines?", a: "Yes. Much of our creative work extends an established identity. Where guidelines are thin, we document the decisions we make so your team can stay consistent after the project." },
  { q: "Do you deliver source files?", a: "Yes. Final deliverables include editable source files and export-ready formats for each channel, organised so your team can find what they need." },
  { q: "How many rounds of revisions are included?", a: "We agree revision rounds in the proposal, based on scope. In practice, sharing direction early — moodboards and rough concepts before polish — keeps revisions focused." },
  { q: "Can creatives be combined with video or web work?", a: "That's where we're strongest. A campaign's key visual, its AI film and its landing page can be planned together so they read as one idea." },
];

export default function CreativesPage() {
  return (
    <>
      {/* Hero — a typographic specimen sheet */}
      <section className="grain relative overflow-hidden bg-ivory pt-32 md:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 47px, #ED1C2418 47px 48px)" }}
        />
        <Container className="relative">
          <div className="flex items-center justify-between">
            <Slate scene="C1">Service 01 — Creatives</Slate>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-graphite/65 md:block">Specimen sheet</span>
          </div>
          <div className="grid items-end gap-10 pb-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SplitLines
                as="h1"
                animateOnMount
                className="mt-10 font-display text-[clamp(3rem,7.4vw,7.4rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
                lines={[
                  "Make your brand",
                  <span key="b" className="font-serif font-normal italic">
                    impossible
                  </span>,
                  <span key="c">
                    to ignore<span className="text-red-ink">.</span>
                  </span>,
                ]}
              />
              <Reveal delay={0.5} fade={false}>
                <p className="mt-8 max-w-lg text-lg leading-relaxed text-graphite/75">
                  Identity, campaigns and everyday creatives with a single point of view — designed to be noticed first and
                  remembered after.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button href="/contact">Start a creative project</Button>
                  <Button href="/work" variant="outline">
                    See the work
                  </Button>
                </div>
              </Reveal>
            </div>
            <div className="relative lg:col-span-5">
              <InkReveal delay={0.2}>
                <Etching name="comp-creatives" alt="Engraved clapperboard, cinema camera and studio light" priority className="mx-auto w-full max-w-[460px]" sizes="(max-width:1024px) 80vw, 36vw" />
              </InkReveal>
              <InkReveal delay={0.6} className="absolute -left-6 bottom-4 hidden w-28 sm:block">
                <Etching name="swatches" className="w-full -rotate-12" sizes="120px" />
              </InkReveal>
              <InkReveal delay={0.75} className="absolute -right-2 top-0 hidden w-20 sm:block">
                <Etching name="pen-nib" className="w-full rotate-12" sizes="100px" />
              </InkReveal>
            </div>
          </div>
        </Container>
        {/* colour/type specimen rail */}
        <div className="relative border-y border-graphite/15 bg-paper">
          <Container className="grid grid-cols-2 divide-x divide-graphite/15 md:grid-cols-5">
            {[
              ["#004AAD", "AQRO Blue"],
              ["#ED1C24", "AQRO Red"],
              ["#292929", "Graphite"],
              ["#F5F1E8", "Ivory"],
            ].map(([c, n]) => (
              <div key={c} className="flex items-center gap-3 py-5 pl-4 first:pl-0">
                <span className="size-7 rounded-full border border-graphite/15" style={{ background: c }} />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-graphite/70">
                  {n}
                  <br />
                  {c}
                </span>
              </div>
            ))}
            <div className="hidden items-center pl-6 font-serif text-3xl italic md:flex">Aa Bb Cc</div>
          </Container>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-ivory py-24 md:py-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Slate scene="C2">The craft</Slate>
          </div>
          <Reveal className="lg:col-span-7">
            <p className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.15]">
              Good creative work isn&apos;t decoration. It&apos;s the fastest way a brand has of saying who it is — before anyone
              reads a word.
            </p>
            <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-graphite/70">
              We design brand systems and campaign creatives that are clear in intent and consistent in execution, from the
              hero visual on a billboard to the tenth social post of the month. Every piece is built on a concept you can
              explain in a sentence.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* What we offer — specimen cards */}
      <section className="bg-ivory pb-24 md:pb-32">
        <Container>
          <SectionHead
            scene="C3"
            label="What we offer"
            title={[
              <span key="a">
                Six ways to be <span className="font-serif font-normal italic">seen</span>
                <span className="text-red-ink">.</span>
              </span>,
            ]}
          />
          <ul className="grid gap-px border border-graphite/15 bg-graphite/15 sm:grid-cols-2 lg:grid-cols-3">
            {OFFER.map((o, i) => (
              <Reveal as="li" key={o.t} delay={(i % 3) * 0.08} className="group relative overflow-hidden bg-paper p-7">
                <div className="flex items-start justify-between">
                  <span className="font-serif text-6xl italic leading-none text-graphite/15 transition-colors duration-500 group-hover:text-red-ink">
                    {o.glyph}
                  </span>
                  <Etching name={o.art} className="h-20 w-auto transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110" sizes="120px" />
                </div>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight">{o.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-graphite/65">{o.d}</p>
                <span className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-red transition-transform duration-700 group-hover:scale-x-100" />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="border-t border-graphite/15 bg-ivory py-24 md:py-32">
        <Container>
          <SectionHead
            scene="C4"
            label="Capabilities"
            title={[
              <span key="a">
                The <span className="font-serif font-normal italic">toolkit</span>
                <span className="text-red-ink">.</span>
              </span>,
            ]}
            aside={<p>From strategy through to the final export, the skills we bring to every creative brief.</p>}
          />
          <Capabilities
            groups={[
              { title: "Strategy", items: ["Brand positioning", "Creative concepts", "Campaign ideas", "Messaging & tone"] },
              { title: "Design", items: ["Logo & identity systems", "Typography & layout", "Illustration & art direction", "Packaging visuals"] },
              { title: "Production", items: ["Social content systems", "Ad formats & resizing", "Product compositing", "Brand guidelines"] },
            ]}
          />
        </Container>
      </section>

      {/* Process */}
      <section className="bg-paper py-24 md:py-32">
        <Container>
          <ProcessBlock
            scene="C5"
            intro="Every creative project moves from understanding to idea to craft — with your feedback built in at each turn."
            steps={[
              { title: "Brief", body: "Your goals, audience, channels and constraints, distilled into one clear brief.", icon: "proc-discover" },
              { title: "Concept", body: "Moodboards and two or three distinct routes, each with a reason to exist.", icon: "storyboard" },
              { title: "Design", body: "The chosen route, crafted in detail and tested across real formats.", icon: "pen-nib" },
              { title: "Deliver", body: "Production-ready files for every channel, plus the rules to keep it consistent.", icon: "proc-deliver" },
            ]}
          />
        </Container>
      </section>

      <PortfolioBlock category="Creatives" scene="C6" label="creatives" />
      <FAQBlock items={FAQS} scene="C7" />
      <Related current="creatives" scene="C8" />
      <ClosingCTA
        scene="C9"
        lines={[
          "Ready to be",
          <span key="b">
            <span className="font-serif font-normal italic">unmissable</span>
            <span className="text-red-ink">?</span>
          </span>,
        ]}
        body="Share the brief, the launch or the problem. We'll come back with how we'd make it impossible to ignore."
        art="page-creatives"
      />
    </>
  );
}
