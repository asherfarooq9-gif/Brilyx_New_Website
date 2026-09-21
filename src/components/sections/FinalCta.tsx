import { ButtonLink } from "@/components/ui/Button"
import { MediaSlot } from "@/components/ui/MediaSlot"
import { assets } from "@/content/assets"
import { site } from "@/content/site"

export function FinalCta() {
  return (
    <section
      data-tone="dark"
      aria-labelledby="cta-heading"
      className="section-y rail-bleed relative isolate overflow-hidden bg-primary-deep text-white"
    >
      <div className="absolute inset-0 -z-10">
        <MediaSlot asset={assets.ctaBackground} fit="fill" parallax sizes="100vw" />
      </div>
      <div className="absolute inset-0 -z-10 bg-primary-deep/75" />

      <div className="container-x text-center">
        <h2 id="cta-heading" data-reveal="lines" className="display-xl mx-auto max-w-4xl">
          Let&rsquo;s build something remarkable.
        </h2>
        <p data-reveal="up" className="lead mx-auto mt-8 max-w-xl !text-white/75">
          Tell us what you have in mind. We&rsquo;ll help turn it into an exceptional digital product.
        </p>
        <div data-reveal="up" className="mt-12 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/contact" variant="light">
            Start Your Project
          </ButtonLink>
          <ButtonLink href={`mailto:${site.email}`} variant="outline-light">
            {site.email}
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
