import { WhySlider } from "@/components/sections/WhySlider"
import { MediaSlot } from "@/components/ui/MediaSlot"
import { assets } from "@/content/assets"
import { principles } from "@/content/approach"

/** Bottom padding leaves room for the Selected Work card that overlaps this band. */
export function WhyBrilyx() {
  return (
    <section
      data-tone="dark"
      aria-label="Why BRILYX"
      className="rail-bleed relative isolate overflow-hidden bg-primary-deep pt-[var(--space-section)] pb-72 text-white lg:pb-80"
    >
      <div className="absolute inset-0 -z-10">
        <MediaSlot asset={assets.whyBand} fit="fill" parallax sizes="100vw" />
      </div>
      <div className="absolute inset-0 -z-10 bg-primary-deep/70" />
      <div data-reveal="up">
        <WhySlider principles={principles} />
      </div>
    </section>
  )
}
