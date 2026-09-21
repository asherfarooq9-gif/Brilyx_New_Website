import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { ReactNode } from "react"
import { MediaSlot } from "@/components/ui/MediaSlot"
import { assets, type AssetDef } from "@/content/assets"
import { cn } from "@/lib/cn"

type Crumb = { label: string; href?: string }

type PageHeroProps = {
  eyebrow: string
  title: ReactNode
  lead?: string
  crumbs?: Crumb[]
  /** Optional atmospheric background image; falls back to the placeholder texture. */
  background?: AssetDef
  /** Preserve photo colors with a neutral scrim concentrated behind the copy. */
  naturalPhoto?: boolean
  mobileFullPhoto?: boolean
  children?: ReactNode
}

/** Dark, full-width intro band used by every inner page so the transparent header always sits on dark. */
export function PageHero({ eyebrow, title, lead, crumbs, background = assets.whyBand, naturalPhoto = false, mobileFullPhoto = false, children }: PageHeroProps) {
  return (
    <section
      data-tone="dark"
      className={cn("rail-bleed relative isolate flex min-h-[58svh] items-end overflow-hidden bg-primary-deep text-white", mobileFullPhoto && "photo-hero")}
    >
      <div data-hero-media className="hero-media absolute inset-0 -z-10">
        <MediaSlot asset={background} fit="fill" sizes="100vw" priority mobileFullPhoto={mobileFullPhoto} />
      </div>
      {naturalPhoto ? (
        <>
          <div className="hero-scrim absolute inset-0 -z-10 bg-gradient-to-r from-black/50 via-black/15 to-transparent" />
          <div className="hero-scrim absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black/40 to-transparent" />
        </>
      ) : (
        <div className="hero-scrim absolute inset-0 -z-10 bg-gradient-to-b from-ink/55 via-ink/30 to-ink/65" />
      )}

      <div className={cn("hero-copy container-x w-full pt-40 pb-16 lg:pb-24", naturalPhoto && "text-on-photo")}>
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" data-hero-in className="mb-8">
            <ol className="eyebrow flex flex-wrap items-center gap-2 text-white/65">
              {crumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {index > 0 ? <ChevronRight className="size-3" aria-hidden /> : null}
                  {crumb.href ? (
                    <Link href={crumb.href} className="-my-3.5 py-3.5 transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <p data-hero-in className="eyebrow mb-6 text-white/85">
          {eyebrow}
        </p>
        <h1 data-hero-lines className="display-xl max-w-4xl">
          {title}
        </h1>
        {lead ? (
          <p data-hero-in className="lead mt-8 max-w-2xl !text-white/80">
            {lead}
          </p>
        ) : null}
        {children ? (
          <div data-hero-in className="mt-10">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  )
}
