# AQRO — Design System & 5-Act Brand Story Architecture (`DESIGN.md`)

> **Design System Contract (UI Engine v2.0.0)**  
> **Brand:** AQRO — Creative & Technology Studio  
> **Core Principle:** Editorial Warmth × Kinetic Precision. Every surface, shader, and typographic interaction is strictly governed by AQRO's five core brand colors and two variable typefaces. Never invent fake client names, fake testimonials, or fake statistics.

---

## 1. Stack

- **Framework:** Next.js 15.5 App Router (`react@19.1.0`, TypeScript 5)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`, `@theme` tokens in `src/app/globals.css`)
- **Motion & Scroll System:**
  - **GSAP 3.15 + ScrollTrigger + `@gsap/react`** — Pinned storytelling, scrubbed typography, timeline choreography, clip-path reveals
  - **Lenis 1.3** — Smooth inertia scrolling synchronized with GSAP's ticker
  - **Framer Motion 14** — Spring physics and micro-state transitions *(Note: in ReactBits components `BlurText.tsx` and `DecryptedText.tsx`, ensure imports resolve cleanly via `"framer-motion"` if `"motion/react"` is not aliased)*
- **Interactive & Shader Primitives:** ReactBits (`src/components/reactbits/*`) — 13 curated WebGL, Canvas 2D, and DOM-physics components
- **Brand Iconography:** Custom SVG geometric primitives (`Mark`, `Logo`, `Glyph`, `Composition`) — no generic third-party icon packs *(Note: in `FlowingMenu.tsx`, replace `@hugeicons/*` with AQRO's native inline arrow SVG or set `showArrow={false}` if `@hugeicons` is not installed)*

---

## 2. Design Tokens

Defined in `src/app/globals.css` inside `@theme`:

### Color Palette (Strict 5-Token System + Deep Variants)

| Token | CSS Variable | Hex | Role & Usage |
|---|---|---|---|
| **AQRO Blue** | `--color-blue` | `#004aad` | Primary technological accent, interactive highlights, blueprint surfaces, shader primary energy |
| **AQRO Blue Deep** | `--color-blue-deep` | `#003a8a` | Deep atmospheric gradients, shader secondary depth, dark-blue surface shadow |
| **AQRO Red** | `--color-red` | `#ed1c24` | The Spark — primary CTA fill, signature corner `Mark`, focus-visible ring, kinetic flare accent |
| **AQRO Red Ink** | `--color-red-ink` | `#cc151c` | Pressed/active red states, subtle warm shader Undertones |
| **Graphite** | `--color-graphite` | `#292929` | Primary ink on light surfaces, dark cinema stage background (AI Video, Process Pipeline, Footer) |
| **Ivory** | `--color-ivory` | `#f5f1e8` | Secondary warm editorial surface (Selected Work, Why AQRO, Card surfaces on Paper) |
| **Paper** | `--color-paper` | `#fbf9f4` | Primary base canvas (`body` background), high-key editorial daylight |

### Typography

| Role | Token | Font Family | Tracking / Leading / Rules |
|---|---|---|---|
| **Display** | `--font-display` | `"Sora Variable", ui-sans-serif, system-ui, sans-serif` | Headings, numbers, eyebrows, marquee display. `H1`: `text-[clamp(2.6rem,6.4vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-balance`. `H2`: `text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-balance`. |
| **Body / UI** | `--font-sans` | `"Instrument Sans Variable", ui-sans-serif, system-ui, sans-serif` | Editorial copy, navigation, buttons, form controls, metadata. Body copy uses `leading-relaxed` (`1.6–1.65`) and `text-graphite/75` (light) or `text-white/75` (dark). |

### Surface, Border & Elevation Tokens

- **Light Hairline Border:** `border-graphite/10` (resting), `border-graphite/25` (interactive hover)
- **Dark Hairline Border:** `border-white/12` (resting), `border-white/30` (interactive hover)
- **Card Radius:** `rounded-2xl` (`16px`) for compact cells, `rounded-3xl` (`24px`) for feature stages & `SpotlightCard`
- **Focus Ring:** `:focus-visible { outline: 2px solid var(--color-red); outline-offset: 3px; }`

---

## 3. The 5-Act Brand Story UI/UX Architecture

The AQRO website unfolds as a **5-Act Brand Story**, guiding a founder, marketing director, or product lead from the initial creative spark to a shipped digital product.

### Act I — The Spark (Hero & First Impression)
- **Narrative Goal:** Establish AQRO as a singular creative + technology force where human imagination ignites technical execution.
- **Surfaces & Atmosphere:** High-key `paper` (`#fbf9f4`) or deep `graphite` (`#292929`) stage with tactile film `Noise`, interactive `DotField` / `Waves` canvas, and choreographed entry.
- **Key Components:** `HomeHero`, `IntroLoader`, `Nav`, Discipline `Marquee`.
- **UX Choreography:**
  - `BlurText` or `SplitReveal` delivers the hero headline with deliberate editorial pacing.
  - `DecryptedText` decodes technical tags/coordinates (`01 — CREATIVES`, `02 — AI VIDEO`, `03 — APPS`, `04 — WEB`).
  - Primary CTA wrapped in `Magnet` + `ClickSpark` or `StarBorder` invites immediate tactile engagement.

### Act II — The Alchemy (Manifesto & Showreel Stage)
- **Narrative Goal:** Demonstrate how brand storytelling, generative AI cinema, and software engineering fuse into one unbroken pipeline ("one team from the first idea to the final launch").
- **Surfaces & Atmosphere:** Warm `paper` (`#fbf9f4`) transitioning into the framed dark `graphite` (`#292929`) `ReelStage`.
- **Key Components:** Manifesto `ScrubText` / `ScrollFloat`, `ReelStage`, `Reel`.
- **UX Choreography:**
  - Scroll-linked typography (`ScrollFloat` / `ScrubText`) transitions from muted `graphite/25` to full `#292929` and `#004aad`.
  - The showreel frame uses `GlareHover` / `SpotlightCard` with an interactive magnetic play trigger and subtle `Noise` grain overlay.

### Act III — The Four Crafts (Disciplines & Interactive Service Architecture)
- **Narrative Goal:** Present AQRO's four core disciplines (`01 Creatives`, `02 AI Video Production`, `03 App Development`, `04 Web Development`) as distinct worlds that multiply in value when combined.
- **Surfaces & Atmosphere:**
  - `01 Creatives`: Warm `ivory` (`#f5f1e8`) with `#ed1c24` red accents
  - `02 AI Video Production`: Cinema `graphite` (`#292929`) with `#ed1c24` & `#ffffff` highlights
  - `03 App Development`: Deep `blue` (`#004aad`) with crisp white & `#ed1c24` accents
  - `04 Web Development`: Clean `paper` (`#fbf9f4`) with `#004aad` blueprint precision
- **Key Components:** `PinnedServices`, `FlowingMenu`, `OfferGrid`, `ServicePage`, `ServiceSwitcher`, `NextService`.
- **UX Choreography:**
  - Interactive index / service navigation powered by `FlowingMenu` and `PinnedServices`.
  - Deliverable cards (`OfferGrid`) wrapped in `SpotlightCard` and `GlareHover` so every capability responds to cursor proximity.

### Act IV — The Blueprint & Proof (Selected Work, Process Pipeline & Pillars)
- **Narrative Goal:** Prove execution rigor through curated portfolio work (`FeaturedProject`, `Portfolio`), transparent 6-step engineering/creative methodology (`ProcessTimeline`), and structural studio advantages (`PillarList`, `ProofSection`).
- **Surfaces & Atmosphere:** Alternates rhythmically between `ivory` (`#f5f1e8`) for work curation, `graphite` (`#292929`) with ambient `Waves` / `Noise` for the "How We Work" blueprint pipeline, and `paper` (`#fbf9f4`) for studio pillars.
- **Key Components:** `FeaturedProject`, `Portfolio`, `StatBand`, `ClientProof`, `ProcessTimeline`, `PillarList`.
- **UX Choreography:**
  - Project cards use `GlareHover` (`variant="sheen"`) and `Magnet` filter pills.
  - Process steps use `DecryptedText` for step numbers (`01`–`06`) and `SpotlightCard` (`theme="dark"`, `spotlightColor="#004aad"`) on the `graphite` stage.
  - Honest empty/placeholder states when real client logos or metrics are not yet populated — **never invent fake clients or fake stats**.

### Act V — The Invitation (FAQ, Contact & Conversion)
- **Narrative Goal:** Remove friction, answer practical buyer questions clearly, and turn intent into a conversation.
- **Surfaces & Atmosphere:** High-contrast closing `CTA` band (`bg-blue` `#004aad` or `bg-graphite` `#292929` accented by `#ed1c24`), clean `FAQ` accordion on `paper`, and tactile `ContactForm`.
- **Key Components:** `FAQ`, `CTA`, `ContactForm`, `Footer`.
- **UX Choreography:**
  - Closing CTA headline uses `ScrollFloat` or `BlurText`; eyebrow uses `ShinyText`.
  - Primary conversion buttons and form submit use `StarBorder` + `ClickSpark` + `Magnet` for an unmistakable, rewarding finish.

---

## 4. Directives for the 3 UI Specialists (ReactBits Brand Styling Rules)

All 13 ReactBits components in `src/components/reactbits/` **must** override their default purple/neon/generic colors with AQRO's strict token palette. Never leave default `#5227FF`, `#FF9FFC`, or `#120F17` values active.

### Specialist 1 — Interactive Cards, Surfaces & Micro-Physics
*Components: `SpotlightCard`, `GlareHover`, `StarBorder`, `ClickSpark`, `Magnet`*

1. **`SpotlightCard` (`src/components/reactbits/SpotlightCard/SpotlightCard.tsx`)**
   - **On Light Surfaces (`paper` / `ivory`):**
     - Pass `theme="light"`
     - `spotlightColor="#004aad"` (AQRO Blue) for technology/web/app cards, or `spotlightColor="#ed1c24"` (AQRO Red) for creative/campaign cards
     - `intensity={0.18}`, `borderGlow={0.75}`, `softness={0.75}`, `spotlightSize={280}`, `grain={0.08}`
     - Override surface CSS vars via `style` when placed on `paper`: `{'--spotlight-card-surface': '#f5f1e8', '--spotlight-card-border': 'rgba(41, 41, 41, 0.10)'}` (or `#fbf9f4` when placed on `ivory`)
   - **On Dark Surfaces (`graphite` / `blue`):**
     - Pass `theme="dark"`
     - `spotlightColor="#004aad"` or `spotlightColor="#ed1c24"`
     - `intensity={0.28}`, `borderGlow={0.85}`, `ambient={true}`
     - Override surface CSS vars via `style`: `{'--spotlight-card-surface': '#292929', '--spotlight-card-border': 'rgba(245, 241, 232, 0.12)'}`

2. **`GlareHover` (`src/components/reactbits/GlareHover/GlareHover.tsx`)**
   - **Portfolio & Media Frames (`ReelStage`, `FeaturedProject`, `Portfolio` cards):**
     - `variant="sheen"` or `"streak"`, `mode="hover"`, `glareAngle={-35}`, `glareSize={35}`, `softness={0.7}`, `transitionDuration={700}`
     - On light cards: `glareColor="#004aad"`, `glareOpacity={0.14}`, `blendMode="multiply"`, `borderColor="rgba(41, 41, 41, 0.10)"`, `borderRadius="24px"`
     - On dark/media cards: `glareColor="#f5f1e8"`, `glareOpacity={0.28}`, `blendMode="screen"`, `borderColor="rgba(255, 255, 255, 0.12)"`, `borderRadius="24px"`, `rimGlint={true}`

3. **`StarBorder` (`src/components/reactbits/StarBorder/StarBorder.tsx`)**
   - **High-Priority CTAs, Interactive Badges & Submit Triggers:**
     - **Dark Variant (`graphite` surface):** `theme="dark"`, `backgroundColor="#292929"`, `textColor="#fbf9f4"`, `borderColor="rgba(251, 249, 244, 0.14)"`, `color="#ed1c24"`, `trailColor="#004aad"`, `radius={9999}` (pill) or `radius={16}`, `thickness={1.5}`, `glow={0.65}`, `hover="lap"`, `clickPulse={true}`
     - **Light Variant (`paper` / `ivory` surface):** `theme="light"`, `backgroundColor="#fbf9f4"`, `textColor="#292929"`, `borderColor="rgba(41, 41, 41, 0.14)"`, `color="#004aad"`, `trailColor="#ed1c24"`, `radius={9999}`, `thickness={1.5}`, `glow={0.5}`, `hover="lap"`

4. **`ClickSpark` (`src/components/reactbits/ClickSpark/ClickSpark.tsx`)**
   - **Global CTA / Interactive Stage Wrapper:**
     - `sparkColor={["#ed1c24", "#004aad", "#292929"]}` on light sections
     - `sparkColor={["#ed1c24", "#fbf9f4", "#004aad"]}` on dark/blue sections
     - `sparkSize={12}`, `sparkRadius={28}`, `sparkCount={10}`, `sparkWidth={1.75}`, `duration={480}`, `easing="ease-out"`, `shape="streak"`, `ring={true}`

5. **`Magnet` (`src/components/reactbits/Magnet/Magnet.tsx`)**
   - **Buttons, Filter Pills, Nav CTA & Play Controls:**
     - `padding={72}`, `magnetStrength={2.8}`, `maxOffset={14}`, `scale={1.03}`, `tilt={4}`, `exclusive={true}`
     - Spring tuning: `spring={{ stiffness: 180, damping: 18, mass: 1 }}`

---

### Specialist 2 — Kinetic Typography & Editorial Wayfinding
*Components: `BlurText`, `ShinyText`, `DecryptedText`, `ScrollFloat`, `FlowingMenu`*

> **Technical Pre-Check for Specialist 2:**
> - In `BlurText.tsx` and `DecryptedText.tsx`, verify the import from `'motion/react'` vs `'framer-motion'`. Since `package.json` installs `"framer-motion": "^14.10.1"`, update `'motion/react'` to `'framer-motion'` if Next.js module resolution flags it.
> - In `FlowingMenu.tsx`, replace `@hugeicons/react` and `@hugeicons/core-free-icons` with an inline SVG `ArrowUpRight` icon using `currentColor` so there are zero missing external icon dependencies.

6. **`BlurText` (`src/components/reactbits/BlurText/BlurText.tsx`)**
   - **Hero & Section Lead Headlines:**
     - `animateBy="words"`, `effect="blur"` or `"focus"`, `direction="bottom"`, `delay={90}`, `stepDuration={0.38}`, `blur={10}`, `distance={28}`, `trigger="view"`
     - On light surfaces: `color="#292929"`, `fromColor="#004aad"` (words transition from AQRO Blue into Graphite as they sharpen)
     - On dark surfaces: `color="#fbf9f4"`, `fromColor="#ed1c24"` (words transition from AQRO Red into Paper White)

7. **`ShinyText` (`src/components/reactbits/ShinyText/ShinyText.tsx`)**
   - **Eyebrow Labels, Pill Callouts & Hero Accents:**
     - **On Light Surfaces:** `color="#292929"`, `shineColor="#004aad"`, `speed={2.8}`, `delay={1.5}`, `shineWidth={35}`, `softness={0.85}`, `angle={115}`, `trigger="loop"`
     - **On Dark / Blue Surfaces:** `color="rgba(245, 241, 232, 0.78)"`, `shineColor="#ffffff"`, `speed={2.8}`, `delay={1.5}`, `glow={0.25}`, `trigger="loop"`
     - **Red Accent Callouts:** `color="#ed1c24"`, `shineColor="#fbf9f4"`, `speed={2.4}`

8. **`DecryptedText` (`src/components/reactbits/DecryptedText/DecryptedText.tsx`)**
   - **Index Numbers (`01`–`06`), Technical Spec Labels, Discipline Tags & Coordinates:**
     - `effect="scramble"` or `"flip"`, `sequential={true}`, `revealDirection="start"`, `speed={38}`, `maxIterations={10}`, `animateOn="view"` (or `"inViewHover"` for interactive tags)
     - `characters="AQRO0123456789/—+*"` (brand-specific glyph pool instead of generic random symbols)
     - `scrambleColor="#ed1c24"` on light/dark surfaces (or `"#004aad"` on ivory technical labels)

9. **`ScrollFloat` (`src/components/reactbits/ScrollFloat/ScrollFloat.tsx`)**
   - **Act II Manifesto Statement & Act IV/V Monumental Section Headers:**
     - `splitBy="words"` (for long editorial statements) or `splitBy="chars"` (for short 2–4 word display titles)
     - `effect="float"`, `direction="up"`, `order="start"`, `stagger={0.025}`, `distance={90}`, `stretch={1.8}`, `ease="power3.out"`
     - `fromColor="#004aad"` on light sections (settles into `text-graphite`), or `fromColor="#ed1c24"` on dark sections (settles into `text-paper`)
     - Always pass `containerClassName` and `textClassName` with `font-display font-semibold tracking-[-0.035em] leading-[1.04]` to override the default `font-black` utility.

10. **`FlowingMenu` (`src/components/reactbits/FlowingMenu/FlowingMenu.tsx`)**
    - **Discipline Showcase / Interactive Service Directory:**
      - **Light Editorial Theme (on `paper` / `ivory`):**
        - `bgColor="#fbf9f4"` (or `"#f5f1e8"`), `textColor="#292929"`, `borderColor="rgba(41, 41, 41, 0.12)"`
        - `marqueeBgColor="#004aad"`, `marqueeTextColor="#fbf9f4"`
      - **Dark Cinema Theme (on `graphite`):**
        - `bgColor="#292929"`, `textColor="#fbf9f4"`, `borderColor="rgba(251, 249, 244, 0.14)"`
        - `marqueeBgColor="#ed1c24"`, `marqueeTextColor="#fbf9f4"`
      - **Shared Props:** `align="left"`, `showIndex={true}`, `showArrow={true}`, `dimInactive={true}`, `speed={55}`, `direction="alternate"`, `bandRadius={12}`, `bandInset={6}`

---

### Specialist 3 — Atmospheric Shaders, WebGL Fields & Tactile Grain
*Components: `Waves`, `DotField`, `Noise`*

11. **`Waves` (`src/components/reactbits/Waves/Waves.tsx`)**
    - **Hero / Blueprint / CTA Atmospheric Backdrops:**
      - **Light Editorial Blueprint (`paper` / `ivory` sections):**
        - `lightMode={false}` (pass explicit hex colors so colors stay true to brand tokens), `backgroundColor="transparent"`, `lineColor="#004aad"`, `accentColor="#ed1c24"`, `opacity={0.18}`, `fade={0.35}`, `spacing={14}`, `lineWidth={1}`, `amplitude={26}`, `twist={0.85}`, `speed={0.65}`, `mouseInteraction={true}`, `mouseRadius={180}`, `clickRipple={true}`
      - **Dark Cinema / Pipeline Stage (`graphite` sections):**
        - `backgroundColor="transparent"`, `lineColor="#004aad"`, `accentColor="#ed1c24"`, `opacity={0.32}`, `fade={0.25}`, `spacing={12}`, `lineWidth={1.1}`, `amplitude={32}`, `speed={0.75}`, `mouseInteraction={true}`, `clickRipple={true}`
      - **Deep Blue Stage (`blue` sections):**
        - `backgroundColor="transparent"`, `lineColor="#fbf9f4"`, `accentColor="#ed1c24"`, `opacity={0.22}`, `fade={0.3}`, `spacing={14}`, `lineWidth={1}`

12. **`DotField` (`src/components/reactbits/DotField/DotField.tsx`)**
    - **Interactive Technical Field (Hero, App/Web Service Stages, Why AQRO):**
      - **NEVER use default `#5227FF` / `#FF9FFC`!**
      - **On Light Surfaces (`paper` / `ivory`):**
        - `lightMode={true}`, `gradientFrom="#004aad"`, `gradientTo="#ed1c24"`, `glowColor="#004aad"`, `dotRadius={1.5}`, `dotSpacing={18}`, `pattern="grid"` or `"hex"`, `cursorRadius={220}`, `bulgeStrength={0.55}`, `twist={12}`, `baseOpacity={0.32}`, `glowIntensity={0.65}`, `waveAmplitude={4}`, `speed={0.7}`
      - **On Dark Surfaces (`graphite`):**
        - `lightMode={false}`, `gradientFrom="#004aad"`, `gradientTo="#ed1c24"`, `glowColor="#fbf9f4"`, `dotRadius={1.6}`, `dotSpacing={16}`, `pattern="hex"`, `cursorRadius={240}`, `bulgeStrength={0.65}`, `baseOpacity={0.45}`, `glowIntensity={0.85}`, `sparkle={true}`

13. **`Noise` (`src/components/reactbits/Noise/Noise.tsx`)**
    - **Editorial Paper & Cinema Film Texture:**
      - **Section-Scoped Editorial Grain (Light `paper` / `ivory`):**
        - `opacity={0.045}`, `size={1}`, `fps={12}`, `blendMode="multiply"`, `contrast={0.45}`, `colored={false}`, `dust={0}`, `scratches={0}`, `fixed={false}`
      - **Cinema Stage Grain (`ReelStage`, AI Video Hero, `graphite` Pipeline):**
        - `opacity={0.08}`, `size={1}`, `fps={18}`, `blendMode="overlay"`, `contrast={0.55}`, `colored={false}`, `dust={0.08}`, `scratches={0}`, `flicker={0.04}`, `fixed={false}`

---

## 5. Quality Floor & Accessibility Guardrails (9-Point Rubric)

1. **Token Purity:** Only `#004aad`, `#003a8a`, `#ed1c24`, `#cc151c`, `#292929`, `#f5f1e8`, `#fbf9f4`, and `#ffffff` (with alpha channels). Zero off-brand purples,slates, or arbitrary Tailwind colors.
2. **Data Integrity:** Never invent client names, project metrics, or fake contact details. Respect `src/content/site.ts`, `src/content/data.ts`, and `src/content/portfolio.ts`.
3. **Interactive Completeness:** Every interactive control supports `hover`, `active`, `focus-visible` (`2px solid #ed1c24`), and `disabled`.
4. **Reduced Motion Compliance:** All GSAP ScrollTriggers, Lenis hooks, and ReactBits components respect `prefers-reduced-motion: reduce`.
5. **WebGL Budget:** Never mount more than 2 active WebGL contexts (`Waves` / `DotField`) simultaneously in the same viewport; rely on built-in `IntersectionObserver` pausing when offscreen.
6. **Typographic Hierarchy:** Display headlines use `font-display` (`Sora Variable`) with tight negative tracking; body copy uses `font-sans` (`Instrument Sans Variable`) with comfortable line length (`60–72ch`).

---

## 6. Component Inventory & Decisions Log

### Existing Components
- **Core UI (`src/components/ui.tsx`):** `Logo`, `Mark`, `Eyebrow`, `Button`, `TextLink`, `Container`, `H1`, `H2`
- **Layout & Blocks (`src/components/`):** `Nav`, `Footer`, `blocks.tsx` (`SectionHead`, `CTA`), `FAQ`, `ContactForm`, `Portfolio`, `FeaturedProject`, `Reel`, `ServicePage`, `ServiceSwitcher`, `Glyph`, `Composition`
- **Sections (`src/components/sections/`):** `HomeHero`, `PinnedServices`, `ReelStage`, `OfferGrid`, `ProcessTimeline`, `ProofSection`, `PillarList`, `DisciplineList`, `TeamGrid`, `NextService`
- **Motion System (`src/components/motion/`):** `SmoothScroll`, `IntroLoader`, `PageTransition`, `Cursor`, `ScrollProgress`, `SplitReveal`, `ScrubText`, `ClipReveal`, `Reveal`, `Marquee`, `Counter`, `Magnetic`, `ScrollCue`
- **ReactBits Primitives (`src/components/reactbits/`):** `SpotlightCard`, `GlareHover`, `StarBorder`, `ClickSpark`, `Magnet`, `BlurText`, `ShinyText`, `DecryptedText`, `ScrollFloat`, `FlowingMenu`, `Waves`, `DotField`, `Noise`

### Decisions
- **2026-11-09 — init:** Next.js 15 App Router + Tailwind v4 + GSAP/Lenis + ReactBits stack established. Created `DESIGN.md` with the 5-Act Brand Story architecture and strict AQRO brand-token styling rules for all 13 ReactBits primitives.
