# BRILYX website

Marketing site for BRILYX, a digital engineering studio (custom websites, apps, AI automation, chatbot integration). Design and interaction are adapted from the COVILLA Webflow template; the code is a from-scratch Next.js app.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger + SplitText · Lenis (desktop smooth scroll) · Zod · Resend · Vitest.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (also type-checks)
npm run start        # serve the production build
npm run lint
npm run typecheck
npm test             # Vitest
```

Requires Node 20.19+ (developed on Node 24).

## Structure

```
src/app/                  routes: /, /services, /services/[slug], /work, /work/[slug], /about, /contact,
                          /api/contact, not-found, sitemap, robots, template (page transition)
src/components/layout/    Header, MenuOverlay, Rail (left rail), Footer
src/components/sections/  Hero, Intro, Services(+Carousel), WhyBrilyx, SelectedWork(+Tabs), Approach, Featured, FinalCta, PageHero, ContactForm
src/components/ui/        Button, MagneticButton, MediaSlot, Logo, ProjectCard, SocialIcon
src/components/motion/    MotionController (all scroll animation), SmoothScroll (Lenis)
src/content/              site.ts, services.ts, projects.ts, approach.ts, assets.ts  <- edit copy and data here
src/lib/                  contact-schema, rate-limit, asset-exists, gsap registration
public/images/            hero/ services/ projects/ about/ backgrounds/ logos/
scripts/prep-logo.mjs     derives logo variants, favicons and the share image from the source logo
```

Design tokens (colors, radii, shadows, easing, type scale) live in `src/app/globals.css` under `@theme`. Colors were sampled from the supplied "Indigo Harbor" screenshot.

## Motion

`MotionController` animates anything that opts in with data attributes, so sections stay server-rendered:
`data-hero-in`, `data-hero-lines`, `data-hero-media`, `data-reveal="up|image|lines"`, `data-reveal-stagger` / `data-reveal-item`, `data-parallax` (via `MediaSlot parallax`), `data-timeline*`.
All GSAP work runs inside `gsap.matchMedia()` and is reverted on unmount. With `prefers-reduced-motion: reduce`, no animation runs and all content shows in its final state. Content is also fully visible without JavaScript (the hero has a 3.5 s failsafe). Lenis smooth scroll is enabled only on fine-pointer desktops.

## Images

See [IMAGE_GUIDE.md](IMAGE_GUIDE.md). Drop a file at the listed path and the placeholder is replaced automatically.

## Hero video

The round play button in the hero opens a modal player (native `<dialog>`: Esc, focus trap, backdrop click). Add your file at `public/videos/brilyx-showreel.mp4` (H.264 MP4; 1080p, a few MB to ~20 MB works best) and optionally `public/videos/brilyx-showreel-poster.webp`. The video is not downloaded until someone clicks play. Until the file exists the modal says "Showreel coming soon". Paths live in `src/content/video.ts`. To use YouTube/Vimeo instead, swap the `<video>` for an `<iframe>` and add that host to `frame-src` in `next.config.ts`.

## Content you need to supply

- Final images (every slot in IMAGE_GUIDE.md), an SVG logo, and the hero showreel video.
- Real projects: edit `src/content/projects.ts` (all 8 records are placeholders, marked `isPlaceholder`, and set to `noindex`).
- Contact form delivery (below).
- Social profiles: LinkedIn, X and GitHub URLs were taken from brilyx.com; edit `src/content/site.ts` to change them.

## Contact form

`POST /api/contact` validates with Zod (client and server), rejects header-injection in the name, has a honeypot field, a 12 KB body cap, and a per-IP in-memory rate limit (5 per 10 minutes, best-effort on serverless).

Delivery uses [Resend](https://resend.com). Set these (see `.env.example`):

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_TO_EMAIL` | Where enquiries are sent |
| `CONTACT_FROM_EMAIL` | Verified sender (default `onboarding@resend.dev` only delivers to your own Resend account email) |
| `NEXT_PUBLIC_SITE_URL` | Canonical/OG base URL |

If the first two are missing, the API returns `503 not_configured` and the form tells the visitor their message was **not** sent and shows the email/WhatsApp fallback. It never fakes success.

## Deploy (Vercel)

1. Push the repo and import it at vercel.com/new (framework auto-detected as Next.js, no config needed).
2. Add the environment variables above under Project Settings → Environment Variables.
3. Deploy, then add the `brilyx.com` domain under Settings → Domains.

Or with the CLI: `npm i -g vercel && vercel` (preview) / `vercel --prod`.

## Known limits

- The logo is derived from a raster image; provide an SVG for crisp rendering on large screens.
- No analytics, cookie banner or privacy policy page is included.
- The in-memory rate limiter does not share state across serverless instances. Add Vercel Firewall/BotID or a shared store if the form is abused.
- Performance targets (LCP ≤ 2.5 s, CLS ≤ 0.1, INP ≤ 200 ms) are goals; no Lighthouse score has been measured yet. Run `npx lighthouse http://localhost:3000 --view` against `npm run start` once real images are in.
