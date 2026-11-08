import type { Metadata } from "next";
import { Etching } from "@/components/Etching";
import { InkReveal, Reveal, SplitLines } from "@/components/motion";
import { Button, Container, Slate } from "@/components/ui";
import { Capabilities, FAQBlock, PortfolioBlock, ProcessBlock, Related, SectionHead } from "@/components/service/sections";
import { ClosingCTA } from "@/components/ClosingCTA";
import type { IllustrationName } from "@/lib/illustrations";

export const metadata: Metadata = {
  title: "Web Development",
  description:
    "Business websites, landing pages, web applications, responsive development, UI/UX implementation and performance optimisation by AQRO.",
};

const OFFER: { fn: string; t: string; d: string; art: IllustrationName }[] = [
  { fn: "businessWebsite()", t: "Business websites", d: "Clear, credible sites that explain what you do and make it easy to get in touch.", art: "monitor" },
  { fn: "landingPage()", t: "Landing pages", d: "Focused pages for launches and campaigns, designed around a single action.", art: "cursor" },
  { fn: "webApp()", t: "Web applications", d: "Dashboards, portals and tools that run in the browser and behave like products.", art: "laptop" },
  { fn: "responsive()", t: "Responsive development", d: "Layouts that are composed for every screen, not just squeezed onto it.", art: "comp-app" },
  { fn: "implementUI()", t: "UI/UX implementation", d: "Designs translated faithfully into accessible, maintainable front-end code.", art: "braces" },
  { fn: "optimise()", t: "Performance & optimisation", d: "Faster loads, better search visibility and smoother interactions on existing sites.", art: "gears" },
];

const VITALS = [
  { k: "LCP", n: "Largest Contentful Paint", v: "≤ 2.5s", note: "Main content appears quickly" },
  { k: "INP", n: "Interaction to Next Paint", v: "≤ 200ms", note: "Taps and clicks respond instantly" },
  { k: "CLS", n: "Cumulative Layout Shift", v: "≤ 0.1", note: "Nothing jumps while you read" },
];

const FAQS = [
  { q: "Which platform or CMS do you build on?", a: "We choose per project. Content-led sites often suit a headless CMS or a well-configured WordPress; products and web apps usually call for a modern framework like Next.js. We'll explain the trade-offs in plain terms." },
  { q: "Can you redesign our existing website?", a: "Yes. We start with an audit of content, structure, performance and analytics, keep what is working and rebuild what isn't — with redirects planned so you don't lose search traffic." },
  { q: "Will we be able to update content ourselves?", a: "Yes. We set up editing so your team can change text, images and pages without touching code, and walk you through it at handover." },
  { q: "Do you take care of hosting and SEO basics?", a: "We set up hosting, domains, analytics, metadata, sitemaps and structured data as part of launch, and can manage hosting afterwards if you prefer." },
  { q: "How do you make sites fast?", a: "By designing for it: optimised images and fonts, minimal JavaScript, server rendering where it helps, and testing against Core Web Vitals before launch." },
];

export default function WebDevPage() {
  return (
    <>
      {/* Hero — the browser window */}
      <section className="grain relative overflow-hidden bg-ivory pt-28 md:pt-32">
        <Container>
          <Slate scene="W1">Service 04 — Web Development</Slate>
          <div className="relative mt-8 overflow-hidden rounded-xl border border-graphite/20 bg-paper shadow-[0_40px_80px_-50px_#29292977]">
            <div className="flex items-center gap-2 border-b border-graphite/15 px-4 py-3">
              <span className="size-2.5 rounded-full bg-red" />
              <span className="size-2.5 rounded-full bg-graphite/20" />
              <span className="size-2.5 rounded-full bg-graphite/20" />
              <span className="ml-4 flex flex-1 items-center gap-2 rounded-full border border-graphite/15 px-4 py-1.5 font-mono text-[11px] text-graphite/65 sm:max-w-md">
                <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" aria-hidden>
                  <rect x="2.5" y="5.5" width="7" height="5" rx="1" />
                  <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" />
                </svg>
                your-next-website.com
              </span>
            </div>
            <div className="grid items-center gap-8 px-6 py-12 sm:px-10 lg:grid-cols-12 lg:py-16">
              <div className="flex gap-6 lg:col-span-7">
                <ol aria-hidden className="hidden select-none pt-3 text-right font-mono text-[11px] leading-[2.15] text-graphite/25 sm:block">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <li key={i}>{i + 1}</li>
                  ))}
                </ol>
                <div>
                  <p className="font-mono text-[12px] text-blue">&lt;h1&gt;</p>
                  <SplitLines
                    as="h1"
                    animateOnMount
                    className="my-2 font-display text-[clamp(2.8rem,6.2vw,6.4rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
                    lines={[
                      "Digital experiences",
                      <span key="b">
                        built to <span className="font-serif font-normal italic text-blue">perform</span>
                        <span className="text-red-ink">.</span>
                      </span>,
                    ]}
                  />
                  <p className="font-mono text-[12px] text-blue">&lt;/h1&gt;</p>
                  <Reveal delay={0.5} fade={false}>
                    <p className="mt-6 max-w-lg text-lg leading-relaxed text-graphite/75">
                      Websites and web applications that load fast, read beautifully on every screen and turn visitors into
                      customers.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button href="/contact">Build my website</Button>
                      <Button href="/work" variant="outline">
                        See the work
                      </Button>
                    </div>
                  </Reveal>
                </div>
              </div>
              <div className="lg:col-span-5">
                <InkReveal delay={0.25}>
                  <Etching name="comp-web" alt="Engraved computer with code, a globe and books" priority className="mx-auto w-[min(76vw,420px)]" sizes="(max-width:1024px) 76vw, 36vw" />
                </InkReveal>
              </div>
            </div>
          </div>
        </Container>
        <div className="h-20" />
      </section>

      {/* Intro */}
      <section className="bg-ivory pb-24 md:pb-32">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Slate scene="W2">The standard</Slate>
          </div>
          <Reveal className="lg:col-span-7">
            <p className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.15]">
              Your website is often the first thing people judge you by. It should be as considered as the brand behind it — and
              considerably faster.
            </p>
            <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-graphite/70">
              We design and develop sites where content, interface and engineering are planned together: structured for
              search, accessible to everyone and built on code your team can live with.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* What we offer — as a source file */}
      <section className="bg-graphite py-24 text-ivory md:py-32">
        <Container>
          <SectionHead
            scene="W3"
            label="What we offer"
            tone="light"
            title={[
              <span key="a">
                What we <span className="font-serif font-normal italic">ship</span>
                <span className="text-red-ink">.</span>
              </span>,
            ]}
            aside={<p className="font-mono text-[13px]">{"// six things we build, each written with the same care"}</p>}
          />
          <ul className="grid gap-px border border-ivory/10 bg-ivory/10 md:grid-cols-2 lg:grid-cols-3">
            {OFFER.map((o, i) => (
              <Reveal as="li" key={o.t} delay={(i % 3) * 0.08} className="group relative bg-graphite p-7">
                <div className="flex items-start justify-between gap-4">
                  <code className="font-mono text-[12px] text-ivory/65">
                    <span className="text-red-ink">fn</span> {o.fn}
                  </code>
                  <Etching name={o.art} tone="white" className="h-14 w-auto opacity-70 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" sizes="90px" />
                </div>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight">{o.t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ivory/65">{o.d}</p>
                <span className="mt-6 inline-block font-mono text-[11px] text-ivory/55 transition-colors group-hover:text-ivory/60">
                  {"}"} <span className="text-ivory/25">{`// ${String(i + 1).padStart(2, "0")}`}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Capabilities + performance standard */}
      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <SectionHead
            scene="W4"
            label="Capabilities"
            title={[
              <span key="a">
                Engineered for <span className="font-serif font-normal italic">speed</span>
                <span className="text-red-ink">.</span>
              </span>,
            ]}
            aside={<p>We build and test against Google&apos;s Core Web Vitals — the thresholds that define a good experience.</p>}
          />
          <dl className="mb-12 grid gap-5 md:grid-cols-3">
            {VITALS.map((v, i) => (
              <Reveal key={v.k} delay={i * 0.1} className="border border-graphite/15 bg-paper p-6">
                <dt className="flex items-baseline justify-between">
                  <span className="font-display text-4xl font-semibold tracking-tight">{v.k}</span>
                  <span className="font-mono text-sm text-blue">{v.v}</span>
                </dt>
                <dd className="mt-3 text-sm text-graphite/70">
                  {v.n} — {v.note}.
                </dd>
              </Reveal>
            ))}
          </dl>
          <Capabilities
            groups={[
              { title: "Front end", items: ["Next.js & React", "Responsive layouts", "Motion & interaction", "Accessibility (WCAG)"] },
              { title: "Back end & content", items: ["Headless CMS setup", "APIs & integrations", "Forms, auth & payments", "Databases & hosting"] },
              { title: "Growth", items: ["Technical SEO", "Analytics & tracking", "Performance audits", "Ongoing maintenance"] },
            ]}
          />
        </Container>
      </section>

      {/* Process */}
      <section className="bg-paper py-24 md:py-32">
        <Container>
          <ProcessBlock
            scene="W5"
            intro="From sitemap to launch, a clear sequence with review points — and no surprises on go-live day."
            steps={[
              { title: "Plan", body: "Goals, audience, content and sitemap agreed, with SEO in mind from the start.", icon: "proc-discover" },
              { title: "Design", body: "Wireframes, then full designs for mobile and desktop, reviewed together.", icon: "monitor" },
              { title: "Develop", body: "Built, connected to your CMS and tested across browsers and devices.", icon: "braces" },
              { title: "Launch", body: "Performance checks, redirects, analytics and a calm go-live.", icon: "cloud-upload" },
            ]}
          />
        </Container>
      </section>

      <PortfolioBlock category="Websites" scene="W6" label="websites" />
      <FAQBlock items={FAQS} scene="W7" />
      <Related current="web-development" scene="W8" />
      <ClosingCTA
        scene="W9"
        lines={[
          "Let's build a site",
          <span key="b">
            worth <span className="font-serif font-normal italic">visiting</span>
            <span className="text-red-ink">.</span>
          </span>,
        ]}
        body="New build or overdue redesign — tell us where you are and where you want to be."
        art="page-web"
      />
    </>
  );
}
