# AQRO — website

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion. No GSAP — every effect here is handled by Framer Motion and CSS, so it wasn't needed.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Routes

| Route | Page |
|---|---|
| `/` | Home — animated projector hero, intro, services, work, clients, process, why AQRO, CTA |
| `/about` | About — engraved heritage plate, disciplines strip, philosophy, story, capability index, team |
| `/services/creatives` | Specimen-sheet hero, offer cards, toolkit, process, work, FAQs |
| `/services/ai-video-production` | Screening-room hero, "Now showing" reel, showreel slot, process, FAQs |
| `/services/app-development` | Blueprint/technical-drawing hero, spec sheet, process, FAQs |
| `/services/web-development` | Browser-window hero, source-file offer grid, Core Web Vitals, FAQs |
| `/work` | Filterable portfolio |
| `/work/[slug]` | Project detail (overview, client, objective, direction, execution, deliverables, media) |
| `/contact` | Enquiry form → `POST /api/contact` |

## Adding AQRO's real content

Everything that has to come from AQRO starts empty and is **never invented**. Sections render an honest, designed state until data is added.

| What | Where | Effect when filled |
|---|---|---|
| Client logos | `src/content/data.ts` → `clients` (files in `public/clients/`) | Logo archive grid replaces the "archive" note. Monochrome, colour on hover. Use `scale` to balance optical size. |
| Projects | `src/content/data.ts` → `projects` (media in `public/work/…`) | Cards appear on Home, Work, each service page; `/work/<slug>` pages are generated. |
| Team | `src/content/data.ts` → `team` | Portrait grid grouped by `group` replaces the director-chair placeholders. |
| Statistics | `src/content/data.ts` → `stats` (2+ real figures) | Replaces the "04 disciplines" strip on About. |
| Email / phone / location / socials | `src/content/site.ts` → `site.contact`, `site.social` | Shown in footer and contact page; hidden while empty. |
| Showreel | `src/content/site.ts` → `site.showreel` | Plays on the AI Video page. |
| Domain | `src/content/site.ts` → `site.url` | Used for metadata, sitemap and robots. |

## Contact form — integration point

`src/app/api/contact/route.ts` validates every enquiry. Delivery needs **one** of these environment variables (see `.env.example`):

- `CONTACT_WEBHOOK_URL` — JSON POST to Zapier / Make / Slack / a CRM, or
- `RESEND_API_KEY` + `CONTACT_TO_EMAIL` (+ `CONTACT_FROM_EMAIL`) — email via Resend.

Until one is set the API returns `503 not_configured` and the form tells the visitor the message was **not** sent.

## Brand assets

- `public/brand/aqro-logo.png`, `aqro-logo-reverse.png` — the wordmark, lifted from the element sheets. **Replace with the official logo files** (SVG preferred) and update `Logo` in `src/components/ui.tsx` if dimensions change.
- `public/illustrations/*.webp` — 64 engraved elements cut out of the supplied sheets onto transparent backgrounds (graphite ink kept as alpha, so they sit on any surface). `etch-white` / `etch-ivory` classes re-ink them for blue and graphite sections. Sizes are registered in `src/lib/illustrations.ts`.
- The projector reels spin by rotating circular windows of the original engraving about each hub (`src/components/Projector.tsx`).

## Notes

- All motion respects `prefers-reduced-motion` (reels, film strips and reveals stop).
- Fonts are self-hosted via Fontsource: Bricolage Grotesque (display), Instrument Serif (statements), Instrument Sans (body), JetBrains Mono (slate labels).
- Budget ranges on the form are in INR — adjust in `ContactForm.tsx` and the API route together.
