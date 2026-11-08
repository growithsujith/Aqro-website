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
export type TeamMember = { name: string; role: string; photo: string };
export const team: TeamMember[] = [];
