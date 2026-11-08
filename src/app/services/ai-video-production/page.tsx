import type { Metadata } from "next";
import { Etching } from "@/components/Etching";
import { FilmStrip } from "@/components/FilmStrip";
import { Projector } from "@/components/Projector";
import { InkReveal, Reveal, SplitLines } from "@/components/motion";
import { Button, Container, Slate } from "@/components/ui";
import { Capabilities, FAQBlock, PortfolioBlock, ProcessBlock, Related, SectionHead } from "@/components/service/sections";
import { ClosingCTA } from "@/components/ClosingCTA";
import { site } from "@/content/site";
import type { IllustrationName } from "@/lib/illustrations";

export const metadata: Metadata = {
  title: "AI Video Production",
  description:
    "AI commercials, brand films, product videos, AI-assisted VFX and microdramas — directed by people, produced with generative tools, by AQRO.",
};

const THEATRE = "#1c1c1c";

const SHOWING: { t: string; d: string; art: IllustrationName }[] = [
  { t: "AI commercials", d: "Broadcast-ready spots and social ads, concepted and cut for the platform they'll run on.", art: "clapper" },
  { t: "AI brand films", d: "Longer-form pieces that tell the story of who you are, with a look no stock library can give you.", art: "cine-camera" },
  { t: "Product videos", d: "Launch films and explainers that show the product in worlds that would be costly to build for real.", art: "camera-photo" },
  { t: "AI filmmaking", d: "Original short films and series, from script and storyboard to final grade.", art: "storyboard" },
  { t: "Cinematic storytelling", d: "Narrative-led campaigns where a character, a world or a moment carries the message.", art: "reel-film" },
  { t: "AI-assisted VFX", d: "Set extensions, environments and effects that blend generated imagery with live footage.", art: "drone" },
  { t: "AI microdramas", d: "Short, episodic vertical stories made for feeds — built to be binged in a coffee break.", art: "microphone" },
];

const FAQS = [
  { q: "How much of the work is AI, and how much is human?", a: "Generative tools produce imagery and motion; people do everything else. Our directors write, storyboard, select, edit, grade and sound-design every piece, and nothing ships without human review." },
  { q: "Can you include our real product or logo accurately?", a: "Yes. We combine generated scenes with your real product photography, 3D or footage where accuracy matters, and composite them so the product stays faithful to the real thing." },
  { q: "Who owns the final video?", a: "You receive full usage rights to the final deliverables as agreed in the contract. We also review the licence terms of the tools used on each project so you know where you stand." },
  { q: "What formats do you deliver?", a: "Whatever the campaign needs — typically 16:9 for web and broadcast, 9:16 for reels and shorts, and 1:1 or 4:5 for feeds — with captions and cut-downs as required." },
  { q: "Is AI video cheaper than a traditional shoot?", a: "Often, especially for imaginative settings, multiple variations or fast turnarounds. For some briefs a hybrid of live action and AI is best — we'll recommend the approach that suits the idea, not the trend." },
];

export default function AIVideoPage() {
  return (
    <>
      {/* Hero — the screening room */}
      <section className="relative overflow-hidden text-ivory" style={{ background: THEATRE }}>
        <div className="absolute inset-x-0 top-0 h-[72px] bg-black/50" aria-hidden />
        <Container className="relative pb-10 pt-28 md:pt-32">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-ivory/65">
            <Slate scene="V1" tone="light">
              Service 02 — AI Video Production
            </Slate>
            <span className="hidden items-center gap-2 sm:flex">
              <span className="animate-rec size-2 rounded-full bg-red" aria-hidden /> Now showing
            </span>
          </div>

          <div className="relative mt-10 grid items-center gap-8 lg:grid-cols-12">
            {/* the screen */}
            <div className="relative min-w-0 lg:col-span-8">
              <div
                className="relative flex aspect-[4/3] w-full items-center sm:aspect-[2.39/1] overflow-hidden border border-ivory/15 px-6 sm:px-12"
                style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(255,255,255,.14), rgba(255,255,255,.03) 60%, transparent)" }}
              >
                <SplitLines
                  as="h1"
                  animateOnMount
                  className="font-display text-[clamp(2.4rem,6vw,6.2rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
                  lines={[
                    "Stories without",
                    <span key="b">
                      <span className="font-serif font-normal italic">creative limits</span>
                      <span className="text-red-ink">.</span>
                    </span>,
                  ]}
                />
                {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "left-3 bottom-3 border-l border-b", "right-3 bottom-3 border-r border-b"].map((c) => (
                  <span key={c} className={`absolute size-4 border-ivory/50 ${c}`} aria-hidden />
                ))}
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-ivory/40" aria-hidden>
                  2.39 : 1
                </span>
              </div>
            </div>
            {/* the projector, throwing light at the screen */}
            <div className="relative mx-auto w-[min(56vw,260px)] lg:col-span-4 lg:w-full lg:max-w-[320px] lg:justify-self-end">
              <div
                aria-hidden
                className="pointer-events-none absolute right-[59%] top-[45.5%] hidden h-[130%] w-[200%] origin-right -translate-y-1/2 lg:block"
                style={{
                  background: "linear-gradient(to left, rgba(255,255,255,0.2), rgba(255,255,255,0.03) 75%, transparent)",
                  clipPath: "polygon(0 0, 100% 49%, 100% 51%, 0 100%)",
                }}
              />
              <Projector tone="white" surface={THEATRE} flip className="w-full" />
            </div>
          </div>

          <Reveal delay={0.4} className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
            <p className="max-w-xl text-lg leading-relaxed text-ivory/75 md:col-span-7">
              Commercials, brand films and episodic stories made with generative AI and directed by people — so you get the
              ambition of a big production at the speed of an idea.
            </p>
            <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
              <Button href="/contact">Pitch us a film</Button>
              <Button href="#showreel" variant="outline-light">
                Watch the reel
              </Button>
            </div>
          </Reveal>
        </Container>
        <FilmStrip
          tone="light"
          speed={45}
          frames={[
            { name: "clapper", label: "Scene" },
            { name: "cine-camera", label: "Camera" },
            { name: "drone", label: "Aerial" },
            { name: "storyboard", label: "Boards" },
            { name: "reel", label: "Reel" },
            { name: "spotlight", label: "Light" },
            { name: "ai-chip", label: "Generate" },
            { name: "microphone", label: "Sound" },
            { name: "director-chair", label: "Direct" },
          ]}
        />
        <div className="h-8 bg-black/50" aria-hidden />
      </section>

      {/* Intro */}
      <section className="bg-ivory py-24 md:py-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Slate scene="V2">The premise</Slate>
            <InkReveal className="mt-10 hidden lg:block">
              <Etching name="reel" className="h-36 w-auto" sizes="200px" />
            </InkReveal>
          </div>
          <Reveal className="lg:col-span-7">
            <p className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.15]">
              The camera used to decide what was possible. Now the only real limit is the idea — and how well it&apos;s
              directed.
            </p>
            <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-graphite/70">
              We write and storyboard like a production house, generate scenes with the latest image and video models, then
              edit, grade, score and finish every frame by hand. The result is film that feels crafted, not generated.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* What we offer — now showing (horizontal reel) */}
      <section className="overflow-hidden py-24 text-ivory md:py-32" style={{ background: THEATRE }}>
        <Container>
          <SectionHead
            scene="V3"
            label="What we offer"
            tone="light"
            title={[
              <span key="a">
                Now <span className="font-serif font-normal italic">showing</span>
                <span className="text-red-ink">.</span>
              </span>,
            ]}
            aside={<p>Seven formats we produce. Scroll the reel sideways →</p>}
          />
        </Container>
        <ul className="flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 sm:scroll-px-8 lg:scroll-px-12 pb-6 sm:px-8 lg:px-12 [scrollbar-width:thin]" tabIndex={0} aria-label="AI video formats">
          {SHOWING.map((s, i) => (
            <li key={s.t} className="group w-[78vw] shrink-0 snap-start sm:w-[380px]">
              <div className="relative flex aspect-video items-center justify-center overflow-hidden border border-ivory/15 bg-black/30">
                <Etching name={s.art} tone="white" className="h-[58%] w-auto opacity-80 transition-transform duration-[1.2s] group-hover:scale-110" sizes="300px" />
                <span className="absolute left-3 top-3 font-mono text-[10px] tracking-[0.24em] text-ivory/65">
                  {String(i + 1).padStart(2, "0")} / {String(SHOWING.length).padStart(2, "0")}
                </span>
                <span className="absolute bottom-3 right-3 size-1.5 rounded-full bg-red opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">{s.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ivory/65">{s.d}</p>
            </li>
          ))}
        </ul>

        {/* Showreel */}
        <Container className="mt-20">
          <div id="showreel" className="scroll-mt-28">
            <Slate scene="V4" tone="light">
              Showreel
            </Slate>
            <div className="relative mt-8 aspect-video w-full overflow-hidden border border-ivory/15 bg-black">
              {site.showreel.src ? (
                <video src={site.showreel.src} poster={site.showreel.poster || undefined} controls playsInline preload="metadata" className="size-full object-cover" />
              ) : (
                <div className="flex size-full flex-col items-center justify-center gap-6 p-6 text-center">
                  <Etching name="projector-white" className="h-[38%] w-auto opacity-70" sizes="240px" />
                  <p className="font-serif text-[clamp(1.4rem,2.6vw,2.4rem)] italic">The AQRO showreel premieres here soon.</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ivory/65">Reel in final grade</p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <SectionHead
            scene="V5"
            label="Capabilities"
            title={[
              <span key="a">
                Behind the <span className="font-serif font-normal italic">camera</span>
                <span className="text-red-ink">.</span>
              </span>,
            ]}
            aside={<p>Everything a production needs, from the first line of script to the final mix.</p>}
          />
          <Capabilities
            groups={[
              { title: "Pre-production", items: ["Concept & scriptwriting", "Storyboards & animatics", "Look development", "Casting AI characters"] },
              { title: "Production", items: ["Image & video generation", "Character consistency", "Product compositing", "AI-assisted VFX"] },
              { title: "Post-production", items: ["Editing & pacing", "Colour grading", "Voice, music & sound design", "Format cut-downs & captions"] },
            ]}
          />
        </Container>
      </section>

      {/* Process */}
      <section className="bg-blue py-24 text-white md:py-32">
        <Container>
          <ProcessBlock
            scene="V6"
            tone="light"
            intro="A production pipeline borrowed from film, sped up by AI — with clear approval points so nothing surprises you."
            steps={[
              { title: "Script", body: "The story, the message and the length, agreed before a single frame is generated.", icon: "storyboard" },
              { title: "Look", body: "Style frames and an animatic that show exactly how the film will feel.", icon: "camera-photo" },
              { title: "Generate", body: "Scenes produced, selected and refined shot by shot under a director's eye.", icon: "clapper" },
              { title: "Finish", body: "Edit, grade, sound and every format you need, delivered ready to publish.", icon: "reel-film" },
            ]}
          />
        </Container>
      </section>

      <PortfolioBlock category="AI Videos" scene="V7" label="AI films" />
      <FAQBlock items={FAQS} scene="V8" />
      <Related current="ai-video-production" scene="V9" />
      <ClosingCTA
        scene="V10"
        lines={[
          "Got a story",
          <span key="b">
            worth <span className="font-serif font-normal italic">screening</span>
            <span className="text-red-ink">?</span>
          </span>,
        ]}
        body="Tell us the idea, the audience and where it will play. We'll show you how it could look on screen."
        art="page-aivideo"
      />
    </>
  );
}
