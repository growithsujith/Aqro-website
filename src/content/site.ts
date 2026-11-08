/**
 * AQRO site content.
 *
 * Everything that must come from AQRO itself (contact details, social links,
 * client logos, projects, team, statistics) lives in this folder and starts
 * empty. Sections render gracefully until real, approved data is added —
 * nothing here is invented.
 */
import type { IllustrationName } from "@/lib/illustrations";

export const site = {
  name: "AQRO",
  url: "https://aqro.example", // TODO: replace with the production domain
  description:
    "AQRO is a creative and technology agency bringing together brand creatives, AI video production, app development and web development.",
  /** Add AQRO's real contact details here. Empty values are hidden everywhere. */
  contact: {
    email: "", // e.g. "hello@aqro.in"
    phone: "",
    location: "",
  },
  /** Add real profiles only, e.g. { label: "Instagram", href: "https://instagram.com/…" } */
  social: [] as { label: string; href: string }[],
  /** AQRO showreel for the AI Video page, e.g. "/media/showreel.mp4" (+ poster). */
  showreel: { src: "", poster: "" },
};

export type ServiceSlug =
  | "creatives"
  | "ai-video-production"
  | "app-development"
  | "web-development";

export type Service = {
  slug: ServiceSlug;
  no: string;
  name: string;
  short: string;
  blurb: string;
  tags: string[];
  href: string;
  art: IllustrationName;
  icon: IllustrationName;
  category: ProjectCategory;
};

export type ProjectCategory = "Creatives" | "AI Videos" | "Apps" | "Websites";

export const services: Service[] = [
  {
    slug: "creatives",
    no: "01",
    name: "Creatives",
    short: "Brand creatives & campaign design",
    blurb:
      "Brand creatives, advertising visuals, campaign design, graphic design and visual storytelling that give a brand a face people remember.",
    tags: ["Brand", "Campaigns", "Social", "Design"],
    href: "/services/creatives",
    art: "comp-creatives",
    icon: "swatches",
    category: "Creatives",
  },
  {
    slug: "ai-video-production",
    no: "02",
    name: "AI Video Production",
    short: "AI films, commercials & product video",
    blurb:
      "AI-powered commercials, cinematic brand films, product videos and creative video campaigns, directed by people and rendered with the newest tools.",
    tags: ["Commercials", "Brand films", "VFX", "Microdramas"],
    href: "/services/ai-video-production",
    art: "page-aivideo",
    icon: "reel",
    category: "AI Videos",
  },
  {
    slug: "app-development",
    no: "03",
    name: "App Development",
    short: "Product apps, UI/UX & integration",
    blurb:
      "Beautifully designed, functional and scalable applications — from the first wireframe to the build that ships to the store.",
    tags: ["UI/UX", "Mobile", "Prototyping", "APIs"],
    href: "/services/app-development",
    art: "comp-app",
    icon: "gears",
    category: "Apps",
  },
  {
    slug: "web-development",
    no: "04",
    name: "Web Development",
    short: "Websites, web apps & performance",
    blurb:
      "Modern, responsive and high-performance websites and web applications, built to load fast, read well and grow with the business.",
    tags: ["Websites", "Web apps", "Landing pages", "Performance"],
    href: "/services/web-development",
    art: "comp-web",
    icon: "laptop",
    category: "Websites",
  },
];

export const serviceBySlug = (slug: ServiceSlug) =>
  services.find((s) => s.slug === slug)!;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", children: services },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];
