# AQRO — website

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion. No GSAP — every effect here is handled by Framer Motion and CSS, so it wasn't needed.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Routes

`/` · `/services/creatives` · `/services/ai-video-production` · `/services/app-development` · `/services/web-development` · `/work` · `/contact`

## Adding portfolio projects

Open **`src/content/portfolio.ts`** — it has one list per service and a copy-paste example at the top.

1. Drop files into `public/portfolio/<service>/` (folders already exist).
2. Add an entry: `title`, `cover` (required) plus any of `client`, `year`, `description`,
   `video` (an .mp4 path or a YouTube/Vimeo link), `images` (extra images) and `url` (live site / store link).

Each project shows on its service page **and** on Work (with filters), and opens in a lightbox that plays the
video or flips through the images. Until a service has projects, its page shows three "coming soon" slots.

## Other content

| What | Where |
|---|---|
| Client logos | `src/content/data.ts` → `clients` (files in `public/clients/`) |
| Team | `src/content/data.ts` → `team` |
| Email / phone / location / socials | `src/content/site.ts` → `site.contact`, `site.social` |
| Service copy, offers, steps, FAQs | `src/content/site.ts` → `services` |
| Domain | `src/content/site.ts` → `site.url` |

## Contact form — integration point

`src/app/api/contact/route.ts` validates every enquiry. Set **one** of these (see `.env.example`):

- `CONTACT_WEBHOOK_URL` — JSON POST to Zapier / Make / Slack / a CRM, or
- `RESEND_API_KEY` + `CONTACT_TO_EMAIL` (+ `CONTACT_FROM_EMAIL`) — email via Resend.

Until then the form clearly tells visitors their message was not sent.

## Brand

- `public/brand/aqro-logo.svg` (blue + red, for light backgrounds) and `aqro-logo-reverse.svg` (white + red, for blue/dark), vectorised from the supplied logo. Favicon: `src/app/icon.svg`.
- Visual elements are built from the logo itself: the red corner mark (`Mark`), and the ring/stem/shoulder shapes in the hero (`Composition`). Service glyphs live in `src/components/Glyph.tsx`.
- Fonts (self-hosted): Sora for headings, Instrument Sans for body.
- All motion respects `prefers-reduced-motion`.
