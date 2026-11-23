/**
 * AQRO-supplied content. Lists start empty — add real, approved material and
 * it appears on the site automatically.
 */

/* ---------------------------------------------------------------- Clients */
export type Client = {
  name: string;
  /** Path under /public, e.g. "/clients/acme.svg". Monochrome SVG works best. */
  logo: string;
  /** Optional optical-size correction (0.6 – 1.4) so wide and tall logos balance. */
  scale?: number;
};
export const clients: Client[] = [
  { name: "RENEE",           logo: "/clients/renee.png",           scale: 0.82 },
  { name: "TATA",            logo: "/clients/tata.jpg",            scale: 0.88 },
  { name: "Naturals Salon",  logo: "/clients/naturals.jpg",        scale: 0.82 },
  { name: "BoldEdge",        logo: "/clients/boldedge.png",        scale: 0.84 },
  { name: "Good Day",        logo: "/clients/good-day.jpg",        scale: 0.85 },
  { name: "Adani",           logo: "/clients/adani.png",           scale: 0.88 },
  { name: "Junior Kuppanna", logo: "/clients/junior-kuppanna.png", scale: 0.80 },
];

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
export type Stat = { value: string; label: string; title?: string };
export const stats: Stat[] = [
  { value: "50+", title: "Projects Completed", label: "Brand identities, AI commercials, mobile & web applications delivered" },
  { value: "10M+", title: "Views Generated", label: "Organic impressions and video views across client campaigns" },
  { value: "25+", title: "Brands Partnered", label: "Direct brand partnerships and agency collaborations" },
  { value: "04", title: "Core Disciplines", label: "Creatives, AI video production, app development, and web engineering" },
];
