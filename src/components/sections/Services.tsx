import { ServicesCarousel } from "@/components/sections/ServicesCarousel"
import { MediaSlot } from "@/components/ui/MediaSlot"
import { assets } from "@/content/assets"
import { services } from "@/content/services"

export function Services() {
  const slides = services.map((service) => ({
    slug: service.slug,
    title: service.title,
    summary: service.summary,
    media: (
      <MediaSlot
        asset={assets[service.asset]}
        fit="fill"
        sizes="(min-width: 937px) 712px, 76vw"
      />
    ),
  }))

  return (
    <section id="services" aria-labelledby="services-heading" className="section-y overflow-hidden">
      <div className="container-x text-center">
        <h2 id="services-heading" data-reveal="lines" className="display-xl">
          What we build
        </h2>
      </div>
      <div data-reveal="up" className="mt-14 lg:mt-20">
        <ServicesCarousel slides={slides} />
      </div>
    </section>
  )
}
