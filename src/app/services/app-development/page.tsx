import type { Metadata } from "next";
import { Etching } from "@/components/Etching";
import { InkReveal, Reveal, SplitLines } from "@/components/motion";
import { Button, Container, Slate } from "@/components/ui";
import { Capabilities, FAQBlock, PortfolioBlock, ProcessBlock, Related, SectionHead } from "@/components/service/sections";
import { ClosingCTA } from "@/components/ClosingCTA";
import type { IllustrationName } from "@/lib/illustrations";

export const metadata: Metadata = {
  title: "App Development",
  description:
    "UI/UX design, mobile and product app development, prototyping, API and backend integration, testing and deployment by AQRO.",
};

const SPECS: { t: string; d: string; out: string; art: IllustrationName }[] = [
  { t: "UI/UX design", d: "Research-led flows, wireframes and interface design that make complex things feel obvious.", out: "Flows · wireframes · UI kit", art: "comp-app" },
  { t: "Application development", d: "Mobile and web applications engineered to be fast, stable and easy to extend.", out: "iOS · Android · cross-platform", art: "gears" },
  { t: "Product prototyping", d: "Clickable prototypes that let you test an idea with real users before committing to a build.", out: "Interactive prototype · test plan", art: "layers" },
  { t: "API & backend integration", d: "Data, payments, authentication and third-party services, connected securely behind the scenes.", out: "APIs · databases · cloud", art: "database" },
  { t: "Testing & deployment", d: "Automated and manual testing, store submission and release pipelines for confident launches.", out: "QA · CI/CD · store release", art: "cloud-upload" },
];

const FAQS = [
  { q: "Native or cross-platform?", a: "It depends on the product. Cross-platform frameworks suit most apps and keep one codebase; native makes sense for heavy device features or performance-critical work. We'll recommend one with reasons during discovery." },
  { q: "Can you work with our existing backend or team?", a: "Yes. We regularly integrate with existing APIs and work alongside in-house developers, following your repositories, conventions and review process." },
  { q: "How do you estimate timelines and cost?", a: "After a short discovery we scope features into phases and estimate each. Starting with a focused first release and iterating is usually faster and more reliable than building everything at once." },
  { q: "Do you handle App Store and Play Store submission?", a: "Yes — store listings, builds, review requirements and release management are part of the deployment stage." },
  { q: "What happens after launch?", a: "We can stay on for maintenance, monitoring and new features, or hand over cleanly with documentation so your team can take it forward." },
];

export default function AppDevPage() {
  return (
    <>
      {/* Hero — a technical drawing on blueprint paper */}
      <section className="blueprint relative overflow-hidden bg-ivory pt-32 md:pt-40">
        <Container className="relative">
          <div className="flex items-center justify-between">
            <Slate scene="P1">Service 03 — App Development</Slate>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-blue/70 md:block">Drawing no. 03 · Rev. A</span>
          </div>
          <div className="grid items-center gap-10 pb-20 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SplitLines
                as="h1"
                animateOnMount
                className="mt-10 font-display text-[clamp(2.9rem,6.4vw,6.6rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
                lines={[
                  "From an idea",
                  <span key="b">
                    to an <span className="font-serif font-normal italic text-blue">application</span>
                  </span>,
                  <span key="c">
                    people love<span className="text-red-ink">.</span>
                  </span>,
                ]}
              />
              <Reveal delay={0.5} fade={false}>
                <p className="mt-8 max-w-lg text-lg leading-relaxed text-graphite/75">
                  We design and build mobile and product applications that are a pleasure to use and solid underneath — from
                  the first wireframe to every update after launch.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button href="/contact" variant="blue">
                    Plan your app
                  </Button>
                  <Button href="/work" variant="outline">
                    See the work
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* annotated drawing */}
            <div className="relative lg:col-span-6">
              <InkReveal delay={0.2}>
                <Etching name="comp-app" alt="Engraved smartphone with interface components and gears" priority className="mx-auto w-[min(78vw,440px)]" sizes="(max-width:1024px) 78vw, 40vw" />
              </InkReveal>
              {[
                { l: "A", t: "Interface", cls: "left-0 top-[12%]", line: "w-16 sm:w-28" },
                { l: "B", t: "Components", cls: "right-0 top-[40%] flex-row-reverse", line: "w-12 sm:w-20" },
                { l: "C", t: "Logic & APIs", cls: "left-0 bottom-[14%]", line: "w-16 sm:w-24" },
              ].map((a, i) => (
                <Reveal key={a.l} delay={0.9 + i * 0.15} className={`absolute hidden items-center gap-2 sm:flex ${a.cls}`}>
                  <span className="grid size-6 place-items-center rounded-full border border-blue font-mono text-[10px] text-blue">{a.l}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue">{a.t}</span>
                  <span className={`h-px bg-blue/50 ${a.line}`} />
                  <span className="size-1.5 rounded-full bg-red" />
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
        {/* title block, like the corner of an engineering drawing */}
        <div className="border-y border-blue/25 bg-paper/80">
          <Container className="grid grid-cols-2 font-mono text-[10px] uppercase tracking-[0.2em] text-graphite/70 md:grid-cols-4">
            {[
              ["Project", "Your app"],
              ["Platforms", "iOS · Android · Web"],
              ["Scale", "1 : 1 with your ambition"],
              ["Drawn by", "AQRO"],
            ].map(([k, v]) => (
              <div key={k} className="border-blue/25 py-4 pr-4 [&:not(:first-child)]:md:border-l [&:not(:first-child)]:md:pl-4">
                <span className="block text-blue/70">{k}</span>
                <span className="mt-1 block text-graphite">{v}</span>
              </div>
            ))}
          </Container>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-ivory py-24 md:py-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Slate scene="P2">The approach</Slate>
          </div>
          <Reveal className="lg:col-span-7">
            <p className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.15]">
              People don&apos;t love apps for their features. They love them because they work exactly the way they hoped.
            </p>
            <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-graphite/70">
              So we start with the people who&apos;ll use it, design the flows before the screens, and engineer the build so it
              can keep growing. Design and development sit in the same team — what&apos;s designed is what ships.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* What we offer — spec sheet */}
      <section className="bg-ivory pb-24 md:pb-32">
        <Container>
          <SectionHead
            scene="P3"
            label="What we offer"
            title={[
              <span key="a">
                The <span className="font-serif font-normal italic">specification</span>
                <span className="text-red-ink">.</span>
              </span>,
            ]}
          />
          <div className="border-t-2 border-graphite">
            <div className="hidden grid-cols-[5rem_1.1fr_1.6fr_1fr_6rem] gap-6 border-b border-graphite/15 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/65 md:grid">
              <span>Spec.</span>
              <span>Service</span>
              <span>Description</span>
              <span>Deliverables</span>
              <span />
            </div>
            <ul>
              {SPECS.map((s, i) => (
                <Reveal as="li" key={s.t} delay={i * 0.05} className="group grid items-center gap-3 border-b border-graphite/15 py-7 transition-colors hover:bg-paper md:grid-cols-[5rem_1.1fr_1.6fr_1fr_6rem] md:gap-6">
                  <span className="font-mono text-sm text-blue">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-2xl font-semibold tracking-tight">{s.t}</h3>
                  <p className="text-[15px] leading-relaxed text-graphite/70">{s.d}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-graphite/65">{s.out}</p>
                  <Etching name={s.art} className="h-14 w-auto justify-self-start opacity-80 transition-transform duration-700 group-hover:rotate-6 group-hover:opacity-100 md:justify-self-end" sizes="90px" />
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="blueprint border-t border-graphite/15 bg-paper py-24 md:py-32">
        <Container>
          <SectionHead
            scene="P4"
            label="Capabilities"
            title={[
              <span key="a">
                Built to <span className="font-serif font-normal italic">scale</span>
                <span className="text-red-ink">.</span>
              </span>,
            ]}
            aside={<p>A complete product team — design, engineering and delivery — working from one plan.</p>}
          />
          <Capabilities
            groups={[
              { title: "Product design", items: ["User research & journeys", "Information architecture", "Interface & interaction design", "Design systems"] },
              { title: "Engineering", items: ["Mobile & cross-platform apps", "Web applications", "APIs & backend services", "Third-party integrations"] },
              { title: "Delivery", items: ["Automated testing", "CI/CD pipelines", "Store submission", "Monitoring & iteration"] },
            ]}
          />
        </Container>
      </section>

      {/* Process */}
      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <ProcessBlock
            scene="P5"
            intro="Short, visible cycles: you see working software early and often, and decide what comes next with real evidence."
            steps={[
              { title: "Discover", body: "Users, goals and constraints mapped into a clear, prioritised scope.", icon: "proc-discover" },
              { title: "Design", body: "Flows and interfaces prototyped and tested before code is written.", icon: "comp-app" },
              { title: "Build", body: "Development in sprints, with demos you can tap through as features land.", icon: "gears" },
              { title: "Launch", body: "Testing, release and the support to keep improving after day one.", icon: "cloud-upload" },
            ]}
          />
        </Container>
      </section>

      <PortfolioBlock category="Apps" scene="P6" label="apps" />
      <FAQBlock items={FAQS} scene="P7" />
      <Related current="app-development" scene="P8" />
      <ClosingCTA
        scene="P9"
        lines={[
          "Have an app",
          <span key="b">
            <span className="font-serif font-normal italic">in mind</span>
            <span className="text-red-ink">?</span>
          </span>,
        ]}
        body="Bring the idea at any stage — a sketch, a spec or a product that needs rescuing. We'll map the path to launch."
        art="page-app"
      />
    </>
  );
}
