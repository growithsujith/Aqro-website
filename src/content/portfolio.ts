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
    // brand identities, ad creatives, social posts, campaign key visuals…
  ],
  "ai-video-production": [
    // AI commercials, brand films, product videos, microdramas…
  ],
  "app-development": [
    // mobile apps, product apps — add screens in `images`, store link in `url`
  ],
  "web-development": [
    // websites, landing pages, web apps — add the live site in `url`
  ],
};
