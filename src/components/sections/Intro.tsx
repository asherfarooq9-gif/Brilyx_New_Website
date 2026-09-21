import { ButtonLink } from "@/components/ui/Button"
import { MediaSlot } from "@/components/ui/MediaSlot"
import { assets } from "@/content/assets"

export function Intro() {
  return (
    <section id="intro" className="section-y bg-page">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <div>
          <h2 data-reveal="lines" className="display-lg">
            We build digital products that look exceptional and work even better.
          </h2>
          <p data-reveal="up" className="lead mt-8 max-w-xl">
            BRILYX brings creative development, software engineering and intelligent automation together in one
            studio. The result is work that is considered in its design, sound in its engineering, and built around
            how your business actually operates.
          </p>
          <p data-reveal="up" className="mt-5 max-w-xl text-ink-soft">
            Every project is custom-coded. There are no templates and no builders, only software written for the job
            in front of us, and handed over cleanly when it is done.
          </p>
          <div data-reveal="up" className="mt-10">
            <ButtonLink href="/services">Our Services</ButtonLink>
          </div>
        </div>

        <div data-reveal="image" className="overflow-hidden rounded-frame">
          <MediaSlot asset={assets.intro} parallax sizes="(min-width: 1024px) 45vw, 100vw" />
        </div>
      </div>
    </section>
  )
}
