/**
 * ─────────────────────────────────────────────────────────────────────────
 *  AQRO PORTFOLIO — add your projects here
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  1. Put the files in /public/portfolio/<service>/   e.g.
 *       public/portfolio/ai-video-production/diwali-film.mp4
 *       public/portfolio/ai-video-production/diwali-film.jpg   (cover)
 *
 *  2. Add an entry to the matching list below. Each project appears on its
 *     service page AND on the Work page. Until a list has entries, the
 *     service page shows three "coming soon" slots.
 *
 *  Media options per project:
 *    cover    – required. The thumbnail image (16:10 or 4:3 looks best).
 *    video    – an .mp4 in /public, or a YouTube / Vimeo link. Plays in a lightbox.
 *    images   – extra images shown in the lightbox (creatives, app screens…).
 *    url      – a live link (website, App Store, Play Store). Shows "Visit".
 *    featured – true to show it as the large featured project on the homepage.
 *
 *  Example (copy, uncomment, edit):
 *
 *    {
 *      title: "Festive brand film",
 *      client: "Client name",
 *      year: "2026",
 *      description: "A 45-second AI film for the festive campaign.",
 *      cover: "/portfolio/ai-video-production/festive-film.jpg",
 *      video: "https://www.youtube.com/watch?v=XXXXXXXXXXX",
 *    },
 */
import type { ServiceSlug } from "./site";

export type PortfolioItem = {
  title: string;
  client?: string;
  year?: string;
  description?: string;
  cover: string;
  video?: string;
  images?: string[];
  url?: string;
  featured?: boolean;
};

export const portfolio: Record<ServiceSlug, PortfolioItem[]> = {
  creatives: [
    {
      title: "Visual Identity & Brand Architecture",
      client: "AQRO Studio",
      year: "2026",
      description: "Comprehensive visual branding, typographic hierarchy, and modern brand design system.",
      cover: "/portfolio/creatives/01_c8d592715074af208f374fecb0ff8107.webp",
      images: ["/portfolio/creatives/01_c8d592715074af208f374fecb0ff8107.webp"],
      featured: true,
    },
    {
      title: "Campaign Creative & Art Direction",
      client: "Digital Motion",
      year: "2026",
      description: "Key campaign visuals, dynamic digital assets, and high-impact editorial direction.",
      cover: "/portfolio/creatives/02_bea454b0c5aa136074e2b2a5dc8876f0.webp",
      images: ["/portfolio/creatives/02_bea454b0c5aa136074e2b2a5dc8876f0.webp"],
      featured: true,
    },
    {
      title: "Editorial Design & Key Visuals",
      client: "Modern Atelier",
      year: "2026",
      description: "Sculpted compositions, high-contrast imagery, and visual storytelling across multi-channel media.",
      cover: "/portfolio/creatives/03_0300ef93cbc9cae14c57d6cb05c790cb.webp",
      images: ["/portfolio/creatives/03_0300ef93cbc9cae14c57d6cb05c790cb.webp"],
      featured: true,
    },
    {
      title: "Performance & Social Campaign Assets",
      client: "Growth Labs",
      year: "2026",
      description: "Platform-optimized creative suites designed for maximum conversion and engagement.",
      cover: "/portfolio/creatives/04_28b8091a2097f8c4652f6dfc3f2ae7ba.webp",
      images: ["/portfolio/creatives/04_28b8091a2097f8c4652f6dfc3f2ae7ba.webp"],
      featured: true,
    },
    {
      title: "Product Launch & App Creative Suite",
      client: "App Universe",
      year: "2026",
      description: "Bold promotional layouts, app store key visuals, and marketing hero illustrations.",
      cover: "/portfolio/creatives/05_App_Creative.webp",
      images: ["/portfolio/creatives/05_App_Creative.webp"],
      featured: true,
    },
    {
      title: "Udupi Culinary Heritage Experience",
      client: "Udupi",
      year: "2026",
      description: "Rich cultural aesthetic, evocative culinary styling, and cohesive brand experience.",
      cover: "/portfolio/creatives/06_Udupi.webp",
      images: ["/portfolio/creatives/06_Udupi.webp"],
      featured: true,
    },
    {
      title: "Lembas Brand & Product Identity",
      client: "Lembas",
      year: "2026",
      description: "Signature visual assets, premium packaging style, and high-fidelity promotional art.",
      cover: "/portfolio/creatives/07_lembas_creative_3.webp",
      images: ["/portfolio/creatives/07_lembas_creative_3.webp"],
      featured: true,
    },
  ],
  "ai-video-production": [
    // AI commercials, brand films, product videos, microdramas…
  ],
  "app-development": [
    {
      title: "Fintech & Wealth Mobile App",
      client: "AQRO Pay",
      year: "2026",
      description: "Realtime multi-currency wallet with instant peer-to-peer settlement, biometrics, and physical card control.",
      cover: "/portfolio/app-development/app-screen-1.svg",
      images: [
        "/portfolio/app-development/app-screen-1.svg",
        "/portfolio/app-development/app-screen-2.svg",
      ],
      featured: true,
    },
    {
      title: "Studio AI Video Director Suite",
      client: "AQRO AI Studio",
      year: "2026",
      description: "Interactive timeline editor, video cut sequence generator, and cloud render manager designed for high-resolution mobile workflows.",
      cover: "/portfolio/app-development/app-screen-3.svg",
      images: [
        "/portfolio/app-development/app-screen-3.svg",
        "/portfolio/app-development/app-screen-4.svg",
      ],
    },
  ],
  "web-development": [
    // websites, landing pages, web apps — add the live site in `url`
  ],
};
