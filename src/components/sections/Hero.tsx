import { HeroFeatured, type FeaturedItem } from "@/components/sections/HeroFeatured"
import { HeroVideo } from "@/components/sections/HeroVideo"
import { ButtonLink } from "@/components/ui/Button"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { MediaSlot } from "@/components/ui/MediaSlot"
import { assets } from "@/content/assets"
import { projects } from "@/content/projects"
import { services } from "@/content/services"
import { showreel } from "@/content/video"
import { assetExists } from "@/lib/asset-exists"

// One featured project per service, in service order.
const featured: FeaturedItem[] = services.flatMap((service) => {
  const project = projects.find((item) => item.category === service.slug)
  return project
    ? [{ slug: project.slug, name: project.name, category: service.title, isPlaceholder: project.isPlaceholder }]
    : []
})

export function Hero() {
  const hasVideo = assetExists(showreel.src)
  const hasPoster = assetExists(showreel.poster)
  return (
    <section
      data-tone="dark"
      aria-labelledby="hero-heading"
      className="photo-hero home-hero rail-bleed relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#30251c] text-white"
    >
      <div data-hero-media className="hero-media absolute inset-0 -z-10">
        <MediaSlot asset={assets.heroPrimary} fit="fill" sizes="100vw" priority mobileFullPhoto />
      </div>
      {/* Warm shadows preserve the photograph's natural color and keep white copy readable. */}
      <div className="hero-scrim absolute inset-0 -z-10 bg-gradient-to-r from-[#211810]/65 via-[#211810]/30 to-transparent" />
      <div className="hero-scrim absolute inset-0 -z-10 bg-gradient-to-t from-[#211810]/45 via-transparent to-[#211810]/35" />

      <div className="hero-copy container-x flex flex-1 items-center pt-32 pb-52 lg:pb-44">
        <div>
          <p data-hero-in className="eyebrow text-on-photo mb-7 text-white">
            BRILYX — Digital Engineering Studio
          </p>
          <h1 id="hero-heading" data-hero-lines className="display-hero text-on-photo">
            Digital experiences.
            <br />
            Engineered to impress.
          </h1>
          <p data-hero-in className="lead text-on-photo mt-8 max-w-xl !text-white/90">
            Custom-coded websites, powerful applications, and intelligent AI systems built for ambitious businesses.
          </p>
          <div data-hero-in className="mt-10 flex flex-wrap gap-4">
            <MagneticButton>
              <ButtonLink href="/work" variant="primary">
                Explore Our Work
              </ButtonLink>
            </MagneticButton>
            <MagneticButton>
              <ButtonLink href="/contact" variant="outline-light">
                Start a Project
              </ButtonLink>
            </MagneticButton>
          </div>
        </div>
      </div>

      <HeroVideo src={showreel.src} poster={hasPoster ? showreel.poster : null} hasVideo={hasVideo} />

      <HeroFeatured items={featured} />
    </section>
  )
}
