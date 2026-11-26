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
      title: "Tourism Creative",
      client: "Tourism & Travel",
      year: "2026",
      description: "Destination branding, promotional campaign visuals, and travel storytelling.",
      cover: "/portfolio/creatives/01_c8d592715074af208f374fecb0ff8107.webp",
      images: ["/portfolio/creatives/01_c8d592715074af208f374fecb0ff8107.webp"],
      featured: true,
    },
    {
      title: "Credit Card Creative",
      client: "Fintech & Banking",
      year: "2026",
      description: "Premium credit card visual concepts, promotional ads, and rewards campaigns.",
      cover: "/portfolio/creatives/02_bea454b0c5aa136074e2b2a5dc8876f0.webp",
      images: ["/portfolio/creatives/02_bea454b0c5aa136074e2b2a5dc8876f0.webp"],
      featured: true,
    },
    {
      title: "Finance App Creative",
      client: "Wealth & Digital Banking",
      year: "2026",
      description: "Finance app feature showcase, digital marketing banners, and user onboarding creatives.",
      cover: "/portfolio/creatives/03_0300ef93cbc9cae14c57d6cb05c790cb.webp",
      images: ["/portfolio/creatives/03_0300ef93cbc9cae14c57d6cb05c790cb.webp"],
      featured: true,
    },
    {
      title: "Marketing Creative",
      client: "Campaign & Growth",
      year: "2026",
      description: "High-performance digital ad creatives, multi-channel marketing assets, and brand storytelling.",
      cover: "/portfolio/creatives/04_28b8091a2097f8c4652f6dfc3f2ae7ba.webp",
      images: ["/portfolio/creatives/04_28b8091a2097f8c4652f6dfc3f2ae7ba.webp"],
      featured: true,
    },
    {
      title: "Edutech Creative",
      client: "Edutech Platform",
      year: "2026",
      description: "Interactive learning platform launch creatives, engaging student visuals, and feature promos.",
      cover: "/portfolio/creatives/05_App_Creative.webp",
      images: ["/portfolio/creatives/05_App_Creative.webp"],
      featured: true,
    },
    {
      title: "Airtel Creative",
      client: "Airtel",
      year: "2026",
      description: "Enjoy gifts and offers on Airtel — promotional 3D SIM card gift box campaign creative.",
      cover: "/portfolio/creatives/06_airtel_creative.webp",
      images: ["/portfolio/creatives/06_airtel_creative.webp"],
      featured: true,
    },
    {
      title: "Lembas Product Creative",
      client: "Lembas",
      year: "2026",
      description: "Signature visual assets, premium packaging style, and high-fidelity promotional product art.",
      cover: "/portfolio/creatives/07_lembas_creative_3.webp",
      images: ["/portfolio/creatives/07_lembas_creative_3.webp"],
      featured: true,
    },
    {
      title: "Happy Onam Creative",
      client: "Nirmithi Builders",
      year: "2026",
      description: "Festive key visual campaign capturing the spirit of Onam with architectural craft.",
      cover: "/portfolio/creatives/hero-wall/hero_01_onam.webp",
      images: ["/portfolio/creatives/hero-wall/hero_01_onam.webp"],
      featured: true,
    },
    {
      title: "Chatkah Aam Masala Creative",
      client: "Chatkah",
      year: "2026",
      description: "Zesty product marketing poster with bold typography and whimsical green flag motif.",
      cover: "/portfolio/creatives/hero-wall/hero_02_chatkah.webp",
      images: ["/portfolio/creatives/hero-wall/hero_02_chatkah.webp"],
      featured: true,
    },
    {
      title: "Flash Sparkle Soda Creative",
      client: "Flash Beverages",
      year: "2026",
      description: "The Power of Sparkle — vibrant carbonated drink launch creative against clear summer skies.",
      cover: "/portfolio/creatives/hero-wall/hero_03_flash.webp",
      images: ["/portfolio/creatives/hero-wall/hero_03_flash.webp"],
      featured: true,
    },
    {
      title: "Belly Dance Kefir Soda Creative",
      client: "Gut Groovin'",
      year: "2026",
      description: "Playful probiotic drink can lineup with retro-inspired typographic flow and disco energy.",
      cover: "/portfolio/creatives/hero-wall/hero_04_bellydance.webp",
      images: ["/portfolio/creatives/hero-wall/hero_04_bellydance.webp"],
      featured: true,
    },
    {
      title: "Muse Enhanced Water Creative",
      client: "Muse Hydration",
      year: "2026",
      description: "Dynamic floating splash composition featuring organic peach mango and super berry fruit infusions.",
      cover: "/portfolio/creatives/hero-wall/hero_05_muse.webp",
      images: ["/portfolio/creatives/hero-wall/hero_05_muse.webp"],
      featured: true,
    },
    {
      title: "Seven Days Fruit Soda Creative",
      client: "Seven Days",
      year: "2026",
      description: "Color-blocked soda can campaign with refreshing citrus, strawberry, and blueberry notes.",
      cover: "/portfolio/creatives/hero-wall/hero_06_sevendays.webp",
      images: ["/portfolio/creatives/hero-wall/hero_06_sevendays.webp"],
      featured: true,
    },
    {
      title: "Doughlicious Cookie Dough Creative",
      client: "Doughlicious",
      year: "2026",
      description: "Chocolate chip cookie dough & gelato bites held high in crisp denim against summer clouds.",
      cover: "/portfolio/creatives/hero-wall/hero_07_doughlicious.webp",
      images: ["/portfolio/creatives/hero-wall/hero_07_doughlicious.webp"],
      featured: true,
    },
    {
      title: "Brand Strategy Poster Creative",
      client: "AQRO Studio",
      year: "2026",
      description: "Clean slate, strategy starts now — pastoral easel display celebrating purposeful brand identity.",
      cover: "/portfolio/creatives/15_brand_strategy.jpg",
      images: ["/portfolio/creatives/15_brand_strategy.jpg"],
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
