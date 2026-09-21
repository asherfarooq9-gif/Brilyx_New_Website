# BRILYX image guide

## Current digital concept direction

The homepage hero remains `images/hero/hero-warm-minimal.webp`. Other active image slots now use nine flat digital interface concepts under `public/images/concepts/`, mapped in `src/content/assets.ts`. These show websites, applications, automation and support tools in ivory, charcoal and muted olive. They are generated visual concepts, not live products or client work. Original PNG files and the exact built-in imagegen prompts are saved in `output/digital-concepts/manifest.json` and its directory.

Concepts use contain sizing and skip image parallax so interface edges remain visible. Background bands use the lightweight `digital-grid.svg` and `digital-lines.svg` assets. Blue remains a small brand accent; page surfaces and dark bands are warm neutrals. The older paths below are retained for reference and are no longer the active non-hero image set. Do not rerun the older prompt pack to replace the current concepts.

Every image slot on the site is driven by `src/content/assets.ts` (and `projectAsset()` for projects). **To replace a placeholder, save your file at the path below. No code changes are needed.** Until a file exists, the slot shows a designed placeholder that holds the correct aspect ratio, so layouts never break and no broken-image icon appears. In `npm run dev`, placeholders are labelled with the slot name and expected path.

- **Generating images with AI?** Use the ready-made prompt pack in [IMAGE_PROMPTS.md](IMAGE_PROMPTS.md), then `node scripts/import-images.mjs` places them for you.
- **Format:** WebP (quality ~80). JPG or PNG also work if you keep the same file name *and* extension used in `assets.ts`; to use another extension, edit the `src` in `assets.ts`.
- **Weight:** aim for under 300 KB per image (hero and full-width backgrounds under 500 KB). Next.js resizes and serves responsive sizes automatically, so upload one high-quality master per slot.
- **Direction:** premium, editorial, restrained. Indigo/navy/white palette. No generic AI robots, glowing brains, circuit boards, holograms or fake dashboards. Don't imply a team, client or project that isn't real.
- **Cropping:** images are `object-fit: cover`. Keep the subject inside the centre 70%, because slots crop differently on mobile and some drift slightly with scroll (parallax).

## Slots

| File (under `public/`) | Where it appears | Size (px) | Ratio | Style / notes |
|---|---|---|---|---|
| `images/hero/hero-primary.webp` | Home hero, full-bleed background (behind an indigo overlay) | 2400 × 1350 | 16:9 | Editorial studio photography or a beautiful custom-website showcase. Needs calm areas on the left (headline) and bottom-right (featured card). Mid-to-dark tones work best under the overlay. |
| `images/about/intro.webp` | Home "Who we are" section | 1600 × 1200 | 4:3 | Authentic workspace or build in progress. |
| `images/services/website-development.webp` | Service 01 slide, `/services`, service page | 1600 × 1000 | 16:10 | A sophisticated website in a composed browser presentation. |
| `images/services/app-development.webp` | Service 02 | 1600 × 1000 | 16:10 | Realistic mobile app interface, refined lighting, minimal surroundings. |
| `images/services/ai-automation.webp` | Service 03 | 1600 × 1000 | 16:10 | A clear, understandable workflow visualisation, or authentic operational imagery. |
| `images/services/chatbot.webp` | Service 04 | 1600 × 1000 | 16:10 | A designed conversational interface inside a realistic website. |
| `images/backgrounds/why-band.webp` | "Why BRILYX" band; also the background of every inner-page hero | 2400 × 1350 | 16:9 | Atmospheric and dark-friendly (a dark indigo overlay sits on top). Text is centred over it. |
| `images/about/approach.webp` | Home "Our approach" sticky card | 1600 × 1200 | 4:3 | Process or collaboration image. |
| `images/projects/featured-concept.webp` | Home "Featured digital experience" browser frame | 1920 × 1200 | 16:10 | Full interface mockup of a concept. The section is labelled "Concept", so keep it honest. |
| `images/about/studio.webp` | `/about` | 1600 × 1200 | 4:3 | Authentic team or workspace imagery. |
| `images/backgrounds/cta.webp` | Final call-to-action band (optional) | 2400 × 1350 | 16:9 | Subtle texture or atmosphere; a dark overlay sits on top. |
| `images/projects/<category>/<slug>.webp` | Project cards, hero card, `/work`, `/work/<slug>` | 1500 × 1000 | 3:2 | One large, coherent case-study image per project. |
| `src/app/opengraph-image.png`, `src/app/twitter-image.png` | Link previews (social, chat) | 1200 × 630 | 1.91:1 | Generated placeholder (logo + tagline). Replace with a designed share image. |
| `public/images/logos/*.png` | Header, footer, menu, favicon source | see below | | Generated from the supplied raster logo. Replace with the official **SVG** when available. |

### Project image file names

Current placeholder records (edit in `src/content/projects.ts`):

```
images/projects/website-development/website-project-one.webp    .../website-project-two.webp
images/projects/app-development/app-project-one.webp            .../app-project-two.webp
images/projects/ai-automation/automation-project-one.webp       .../automation-project-two.webp
images/projects/chatbot-integration/chatbot-project-one.webp    .../chatbot-project-two.webp
```

When you add or rename a project, the image path is always `images/projects/<category>/<slug>.webp`, where `<category>` is the record's `category` and `<slug>` is its `slug`.

## Logo files

`scripts/prep-logo.mjs` derives these from `public/images/logos/brilyx-logo-source.png` (the supplied logo on white) and also writes the favicon and the share image:

- `brilyx-logo.png`, `brilyx-logo-light.png` (full lockup, dark and white artwork)
- `brilyx-mark.png`, `brilyx-mark-light.png` (the "B" mark only)
- `brilyx-wordmark.png`, `brilyx-wordmark-light.png` (wordmark only, also used as the giant footer watermark)
- `src/app/icon.png`, `src/app/apple-icon.png` (favicons)

Re-run after replacing the source: `node scripts/prep-logo.mjs`. Because the source is a raster, the logo will soften on very large screens. An SVG would fix that; swap the `<Image>` sources in `src/components/ui/Logo.tsx`.

## Currently missing (all use placeholders)

Every file in the table above except the generated logos, favicons and share image.
