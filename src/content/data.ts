/**
 * AQRO-supplied content. Lists start empty — add real, approved material and
 * it appears on the site automatically.
 */

/* ------------------------------------------------------------------- Shared */
export const TAGS = [
  "Brand Creatives",
  "Ad Campaigns",
  "AI Commercials",
  "AI Films",
  "Mobile Apps",
  "Websites & Web Apps",
] as const;

export const PIPELINE = [
  { t: "Strategy", items: ["Discovery & research", "Creative concepts", "Product & technical planning"] },
  { t: "Creation", items: ["Brand & campaign design", "AI video production", "App & web development"] },
  { t: "Delivery", items: ["Testing & refinement", "Finishing & versioning", "Launch & support"] },
] as const;

export const PILLARS = [
  { t: "Creative-first, tech-enabled", d: "The idea leads. We pick the tools — AI included — that make it better." },
  { t: "One team, end to end", d: "Design, film and code planned together, so nothing gets lost between vendors." },
  { t: "Built around outcomes", d: "We agree what success looks like upfront and design towards it." },
] as const;

export const FAQS = [
  { q: "What kinds of projects do you take on?", a: "Brand creatives and campaigns, AI-produced commercials and films, mobile and product apps, and websites or web apps — on their own or combined." },
  { q: "Can you work with our existing brand guidelines?", a: "Yes. We extend existing identities all the time and keep everything consistent with your style." },
  { q: "How long does a typical project take?", a: "It depends on scope. After a short discovery call we share a timeline with clear milestones before any work starts." },
  { q: "How do you use AI in your work?", a: "As a production tool, not a replacement for judgement. People direct, review and approve everything we deliver." },
  { q: "Do you work with agencies?", a: "Yes. We can work as your production or development partner, under your brand or ours." },
  { q: "Can one project cover several formats?", a: "Yes — a campaign can include key visuals, video cut-downs for every platform and a landing page, planned together." },
];

/* ---------------------------------------------------------------- Clients */
export type Client = {
  name: string;
  /** Path under /public, e.g. "/clients/acme.svg". Monochrome SVG works best. */
  logo: string;
  /** Optional optical-size correction (0.6 – 1.4) so wide and tall logos balance. */
  scale?: number;
};
export const clients: Client[] = [];

/* ------------------------------------------------------------------- Team */
export type Founder = { name: string; role: string; photo: string; bio: string };
export type TeamMember = { name: string; role: string; photo: string };

/** Founders appear first on About, with a short bio. */
export const founders: Founder[] = [];

/** The rest of the team, grouped. Rename or add groups freely. */
export const teamGroups: { title: string; members: TeamMember[] }[] = [
  { title: "Creative leadership", members: [] },
  { title: "AI production", members: [] },
  { title: "Engineering", members: [] },
  { title: "Operations", members: [] },
];

/* ------------------------------------------------------------- Statistics */
/** Real, verified figures only (e.g. { value: "120+", label: "projects delivered" }). */
export type Stat = { value: string; label: string };
export const stats: Stat[] = [];
