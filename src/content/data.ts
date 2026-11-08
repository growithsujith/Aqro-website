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
