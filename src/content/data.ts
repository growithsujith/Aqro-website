/**
 * AQRO-supplied data. Each list is intentionally empty until AQRO provides
 * and approves the real material. The UI is fully wired: add an entry and it
 * appears in the relevant grids, filters and routes automatically.
 */
import type { ProjectCategory } from "./site";

/* ---------------------------------------------------------------- Clients */
export type Client = {
  name: string;
  /** Path under /public, e.g. "/clients/acme.svg". Monochrome SVG preferred. */
  logo: string;
  /** Optional optical-size correction (0.6 – 1.4) so wide/tall marks balance. */
  scale?: number;
  href?: string;
};
export const clients: Client[] = [];

/* --------------------------------------------------------------- Projects */
export type ProjectMedia =
  | { type: "image"; src: string; alt: string; width: number; height: number }
  | { type: "video"; src: string; poster?: string; caption?: string };

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  year?: string;
  summary: string;
  thumbnail: { src: string; width: number; height: number; alt: string };
  /** Optional short muted loop shown on hover in the gallery. */
  previewVideo?: string;
  overview: string;
  objective: string;
  creativeDirection: string;
  execution: string;
  deliverables: string[];
  media: ProjectMedia[];
};
export const projects: Project[] = [];

/* ------------------------------------------------------------------- Team */
export type TeamMember = {
  name: string;
  role: string;
  group: string; // e.g. "Leadership", "Creative", "Production", "Technology"
  photo: string; // portrait path under /public
};
export const team: TeamMember[] = [];

/* ------------------------------------------------------------- Statistics */
/** Only real, verified figures. Leave empty to show the disciplines strip. */
export type Stat = { value: string; label: string };
export const stats: Stat[] = [];
