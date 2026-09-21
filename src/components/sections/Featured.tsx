import { ButtonLink } from "@/components/ui/Button"
import { MediaSlot } from "@/components/ui/MediaSlot"
import { assets } from "@/content/assets"

export function Featured() {
  return (
    <section aria-labelledby="featured-heading" className="section-y overflow-hidden bg-page">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="featured-heading" data-reveal="lines" className="display-xl">
            A considered direction for your next digital experience.
          </h2>
          <p data-reveal="up" className="lead mt-6">
            A visual direction grounded in natural light, balanced forms and considered detail.
          </p>
        </div>

        <div data-reveal="up" className="mx-auto mt-14 max-w-5xl rounded-brand bg-ink p-2 shadow-lift sm:p-3 lg:mt-20">
          <div aria-hidden className="flex items-center gap-2 px-3 pb-3 pt-1">
            <span className="size-2.5 rounded-full bg-white/25" />
            <span className="size-2.5 rounded-full bg-white/25" />
            <span className="size-2.5 rounded-full bg-white/25" />
            <span className="eyebrow ml-4 truncate text-white/45">Design inspiration</span>
          </div>
          <div className="overflow-hidden rounded-frame">
            <MediaSlot asset={assets.featuredConcept} parallax sizes="(min-width: 1024px) 60vw, 100vw" />
          </div>
        </div>

        <div data-reveal="up" className="mt-12 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/contact">Start a Project</ButtonLink>
          <ButtonLink href="/services" variant="outline">
            See Our Services
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
