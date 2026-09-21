// Central image map. Drop a file at `src` (under /public) and the slot renders it; until then a
// designed placeholder holds the exact aspect ratio. See IMAGE_GUIDE.md for art direction.

import { getProject } from "./projects"

export type PlaceholderVariant = "grid" | "dots" | "diagonal" | "rings"

export type AssetDef = {
  src: string
  /** CSS aspect-ratio value, e.g. "16 / 9". */
  ratio: string
  alt: string
  /** Shown on placeholders in development. */
  label: string
  variant: PlaceholderVariant
  /** Keep complete UI concepts visible, including navigation and edge labels. */
  contain?: boolean
}

export const assets = {
  workHero: {
    src: "/images/hero/work-coastal.webp",
    ratio: "1981 / 793",
    alt: "Sunlit limestone coastal home with broad steps, glass walls, and an infinity pool overlooking the sea",
    label: "Work hero — coastal architecture",
    variant: "grid",
  },
  aboutHero: {
    src: "/images/hero/about-sunlit-studio.webp",
    ratio: "1981 / 794",
    alt: "Warm sunlit studio with a wooden desk, open books, and an olive tree beside a window overlooking the coast",
    label: "About hero — sunlit studio",
    variant: "grid",
  },
  servicesHero: {
    src: "/images/hero/services-staircase.webp",
    ratio: "1024 / 572",
    alt: "Sculptural concrete staircase curving through a sunlit architectural interior",
    label: "Services hero — sculptural staircase",
    variant: "grid",
  },
  heroPrimary: {
    src: "/images/hero/hero-warm-minimal.webp",
    ratio: "1672 / 941",
    alt: "A minimal walnut desk and desktop display in a warm, sunlit plaster studio",
    label: "Hero — editorial studio shot or custom website showcase",
    variant: "grid",
  },
  intro: {
    src: "/images/about/brilyx-vision.webp",
    ratio: "1024 / 765",
    alt: "BRILYX desktop and mobile interfaces: Your vision. Our engineering. Websites, apps and AI automation.",
    contain: true,
    label: "Intro — authentic workspace or build-in-progress",
    variant: "dots",
  },
  serviceWebsite: {
    src: "/images/services/homepage/website-development.webp",
    ratio: "1024 / 765",
    alt: "Brilyx architecture website displayed on a desktop monitor with layered browser windows",
    contain: true,
    label: "Service 01 — sophisticated website in a composed browser frame",
    variant: "grid",
  },
  serviceApp: {
    src: "/images/services/homepage/app-development.webp",
    ratio: "1024 / 765",
    alt: "Mobile app interface displayed on a floating smartphone with layered screens on an ivory background",
    contain: true,
    label: "Service 02 — realistic mobile app interface, minimal surroundings",
    variant: "rings",
  },
  serviceAutomation: {
    src: "/images/services/homepage/ai-automation.webp",
    ratio: "1024 / 765",
    alt: "Connected automation dashboards arranged around a central hub on an ivory background",
    contain: true,
    label: "Service 03 — clear workflow visualisation or operational imagery",
    variant: "diagonal",
  },
  serviceChatbot: {
    src: "/images/services/homepage/chatbot.webp",
    ratio: "1024 / 765",
    alt: "Brilyx business website with integrated AI chatbot conversations on desktop and mobile",
    contain: true,
    label: "Service 04 — designed chat interface inside a real website",
    variant: "dots",
  },
  whyBand: {
    src: "/images/backgrounds/digital-grid.svg",
    ratio: "16 / 9",
    alt: "",
    label: "Why BRILYX band — atmospheric background, dark-friendly",
    variant: "diagonal",
  },
  approachCard: {
    src: "/images/about/approach-workspace.webp",
    ratio: "1792 / 2400",
    alt: "Sunlit design workspace with an open wireframe sketchbook, architectural drawings and material samples",
    contain: true,
    label: "Approach — process or collaboration image",
    variant: "grid",
  },
  featuredConcept: {
    src: "/images/hero/homepage-design-inspiration.webp",
    ratio: "1498 / 1050",
    alt: "Sunlit stone sculpture and stacked books beside an arched window overlooking the sea",
    contain: true,
    label: "Featured concept — full interface mockup",
    variant: "rings",
  },
  aboutStudio: {
    src: "/images/about/brilyx-vision.webp",
    ratio: "1024 / 765",
    alt: "BRILYX desktop and mobile interfaces: Your vision. Our engineering. Websites, apps and AI automation.",
    contain: true,
    label: "About — authentic team or workspace imagery",
    variant: "dots",
  },
  ctaBackground: {
    src: "/images/backgrounds/digital-lines.svg",
    ratio: "16 / 9",
    alt: "",
    label: "Final CTA — optional atmospheric background",
    variant: "diagonal",
  },
} as const satisfies Record<string, AssetDef>

export type AssetKey = keyof typeof assets

const PROJECT_VARIANTS: PlaceholderVariant[] = ["grid", "dots", "diagonal", "rings"]

/**
 * Project images live in one folder per service: public/images/projects/<service>/<slug>.webp
 * (a placeholder shows until the file exists). A slug with no project record falls back to the flat folder.
 */
export function projectAsset(slug: string, name: string): AssetDef {
  const variant = PROJECT_VARIANTS[slug.length % PROJECT_VARIANTS.length]
  const folder = getProject(slug)?.category
  return {
    src: folder ? `/images/projects/${folder}/${slug}.webp` : `/images/projects/${slug}.webp`,
    contain: true,
    ratio: "3 / 2",
    alt: `${name} — project preview`,
    label: `Project — ${name}`,
    variant,
  }
}
