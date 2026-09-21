import { ButtonLink } from "@/components/ui/Button"
import { MediaSlot } from "@/components/ui/MediaSlot"
import { approach } from "@/content/approach"
import { assets } from "@/content/assets"

export function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-heading" className="section-y">
      <div className="container-x grid gap-14 lg:grid-cols-[5fr_6fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div data-reveal="up" className="rounded-brand border border-line bg-page p-4 lg:p-5">
            <div className="overflow-hidden rounded-frame">
              <MediaSlot asset={assets.approachCard} parallax sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
            <div className="p-3 pt-8 lg:p-6 lg:pt-10">
              <h2 id="approach-heading" className="display-md">
                From idea to launch.
              </h2>
              <p className="mt-4 text-ink-soft">
                Four clear steps. One dedicated team.
              </p>
              <div className="mt-6">
                <ButtonLink href="/contact">Start a Project</ButtonLink>
              </div>
            </div>
          </div>
        </div>

        <div>
          <ol data-timeline className="relative space-y-8 pl-12 lg:pl-20">
            <span data-timeline-line aria-hidden className="absolute top-3 bottom-3 left-4 w-px bg-line lg:left-7" />
            <span
              data-timeline-dot
              aria-hidden
              className="absolute top-3 left-4 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-primary bg-white shadow-card lg:left-7"
            />
            {approach.map((step) => (
              <li
                key={step.number}
                data-reveal="up"
                className="rounded-brand border border-line bg-white p-7 shadow-card lg:p-10"
              >
                <span className="grid size-14 place-items-center rounded-full bg-page text-sm font-semibold text-primary">
                  {step.number}
                </span>
                <h3 className="display-md mt-10">{step.title}</h3>
                <p className="mt-4 text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
