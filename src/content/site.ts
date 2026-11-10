/**
 * AQRO site content. Contact details and social links start empty and are
 * hidden until filled in — nothing here is invented.
 */

export const site = {
  name: "AQRO",
  url: "https://aqro.example", // TODO: replace with the production domain
  description:
    "AQRO is a creative and technology studio for brand creatives, AI video production, app development and web development.",
  contact: {
    email: "", // e.g. "hello@aqro.in"
    phone: "",
    location: "",
  },
  /** e.g. { label: "Instagram", href: "https://instagram.com/…" } */
  social: [] as { label: string; href: string }[],
  /** Showreel shown on Home: an .mp4 in /public (e.g. "/media/showreel.mp4") or a YouTube/Vimeo link. */
  showreel: { src: "", poster: "" },
};

export type ServiceSlug = "creatives" | "ai-video-production" | "app-development" | "web-development";

export type Service = {
  slug: ServiceSlug;
  no: string;
  name: string;
  short: string;
  href: string;
  /** label used for the portfolio filter */
  workLabel: string;
  hero: { title: string; accent: string; body: string; theme: "ivory" | "graphite" | "blue" | "white" | "navy"; cta: string };
  offer: { t: string; d: string }[];
  steps: { t: string; d: string }[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "creatives",
    no: "01",
    name: "Creatives",
    short: "Brand identity, ads, social and campaign design.",
    href: "/services/creatives",
    workLabel: "Creatives",
    hero: {
      title: "Make your brand",
      accent: "impossible to ignore.",
      body: "Identity, campaigns and everyday creatives with one clear point of view.",
      theme: "navy",
      cta: "Start a creative project",
    },
    offer: [
      { t: "Advertising creatives", d: "Print, digital and outdoor ads built on one sharp idea." },
      { t: "Brand identity", d: "Logo, type and colour systems that look unmistakably yours." },
      { t: "Social media creatives", d: "Platform-native posts designed as a repeatable system." },
      { t: "Campaign design", d: "Key visuals that scale from billboard to banner." },
      { t: "Product visuals", d: "Compositions that make the product the hero." },
      { t: "Graphic design", d: "Brochures, decks and layouts, set with care." },
    ],
    steps: [
      { t: "Brief", d: "Goals, audience and channels in one page." },
      { t: "Concept", d: "Two or three distinct creative routes." },
      { t: "Design", d: "The chosen route, crafted and tested." },
      { t: "Deliver", d: "Ready-to-publish files for every format." },
    ],
    faqs: [
      { q: "Can you work within our brand guidelines?", a: "Yes. We extend existing identities all the time, and document any new decisions so your team stays consistent." },
      { q: "Do we get source files?", a: "Yes — editable source files plus export-ready formats for every channel." },
      { q: "How many revisions are included?", a: "Agreed upfront in the proposal. Sharing early concepts keeps revisions short and focused." },
    ],
  },
  {
    slug: "ai-video-production",
    no: "02",
    name: "AI Video Production",
    short: "AI commercials, brand films and product videos.",
    href: "/services/ai-video-production",
    workLabel: "AI Videos",
    hero: {
      title: "Stories without",
      accent: "creative limits.",
      body: "Commercials, brand films and microdramas made with generative AI — directed by people.",
      theme: "graphite",
      cta: "Pitch us a film",
    },
    offer: [
      { t: "AI commercials", d: "Spots and social ads cut for the platform they run on." },
      { t: "AI brand films", d: "Your story, with a look no stock library can give you." },
      { t: "Product videos", d: "Launch films in worlds too costly to build for real." },
      { t: "Cinematic storytelling", d: "Character-led campaigns that carry the message." },
      { t: "AI-assisted VFX", d: "Environments and effects blended with live footage." },
      { t: "AI microdramas", d: "Short episodic stories made for the feed." },
    ],
    steps: [
      { t: "Script", d: "Story, message and length agreed first." },
      { t: "Look", d: "Style frames and an animatic." },
      { t: "Generate", d: "Scenes produced and refined shot by shot." },
      { t: "Finish", d: "Edit, grade, sound and every format." },
    ],
    faqs: [
      { q: "How much is AI and how much is human?", a: "AI generates imagery and motion. People write, direct, edit, grade and approve every frame." },
      { q: "Can our real product appear accurately?", a: "Yes — we composite your real product photography or 3D into generated scenes where accuracy matters." },
      { q: "Which formats do you deliver?", a: "16:9, 9:16, 1:1 and 4:5 as needed, with captions and cut-downs." },
    ],
  },
  {
    slug: "app-development",
    no: "03",
    name: "App Development",
    short: "Product apps, UI/UX and integrations.",
    href: "/services/app-development",
    workLabel: "Apps",
    hero: {
      title: "From an idea to an",
      accent: "app people love.",
      body: "We design and build mobile and product apps that are a pleasure to use and solid underneath.",
      theme: "blue",
      cta: "Plan your app",
    },
    offer: [
      { t: "UI/UX design", d: "Flows and interfaces that make complex things feel simple." },
      { t: "App development", d: "iOS, Android and cross-platform builds that scale." },
      { t: "Prototyping", d: "Clickable prototypes to test ideas before building." },
      { t: "API & backend", d: "Payments, auth and data, connected securely." },
      { t: "Testing", d: "Automated and manual QA for confident releases." },
      { t: "Deployment", d: "Store submission, release pipelines and support." },
    ],
    steps: [
      { t: "Discover", d: "Users, goals and a prioritised scope." },
      { t: "Design", d: "Flows prototyped and tested early." },
      { t: "Build", d: "Sprints with demos you can tap through." },
      { t: "Launch", d: "Release, then keep improving." },
    ],
    faqs: [
      { q: "Native or cross-platform?", a: "Cross-platform suits most apps; native for heavy device or performance needs. We'll recommend one with reasons." },
      { q: "Can you work with our existing team?", a: "Yes — we integrate with existing APIs and in-house developers and follow your conventions." },
      { q: "Do you handle store submission?", a: "Yes, App Store and Play Store listings, builds and release management are included." },
    ],
  },
  {
    slug: "web-development",
    no: "04",
    name: "Web Development",
    short: "Websites, landing pages and web apps.",
    href: "/services/web-development",
    workLabel: "Websites",
    hero: {
      title: "Digital experiences",
      accent: "built to perform.",
      body: "Websites and web apps that load fast, read well on every screen and turn visitors into customers.",
      theme: "white",
      cta: "Build my website",
    },
    offer: [
      { t: "Business websites", d: "Clear, credible sites that make it easy to get in touch." },
      { t: "Landing pages", d: "Focused pages built around a single action." },
      { t: "Web applications", d: "Dashboards, portals and tools in the browser." },
      { t: "Responsive development", d: "Layouts composed for every screen size." },
      { t: "UI/UX implementation", d: "Designs translated into accessible code." },
      { t: "Performance & SEO", d: "Faster loads and better search visibility." },
    ],
    steps: [
      { t: "Plan", d: "Goals, content and sitemap." },
      { t: "Design", d: "Mobile and desktop designs, reviewed together." },
      { t: "Develop", d: "Built, connected to a CMS and tested." },
      { t: "Launch", d: "Speed checks, analytics and go-live." },
    ],
    faqs: [
      { q: "Which platform do you build on?", a: "It depends on the project — often Next.js or a headless CMS. We'll explain the trade-offs plainly." },
      { q: "Can we edit content ourselves?", a: "Yes. We set up editing so your team can update pages without touching code." },
      { q: "Can you redesign our existing site?", a: "Yes, with an audit first and redirects planned so you keep your search traffic." },
    ],
  },
];

export const serviceBySlug = (slug: ServiceSlug) => services.find((s) => s.slug === slug)!;
