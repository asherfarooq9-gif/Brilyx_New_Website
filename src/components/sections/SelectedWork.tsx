import { ArrowLink } from "@/components/ui/Button"
import { MediaSlot } from "@/components/ui/MediaSlot"
import { WorkTabs, type WorkTab } from "@/components/sections/WorkTabs"
import { projectAsset } from "@/content/assets"
import { projectsByCategory } from "@/content/projects"
import { services } from "@/content/services"

const CARD_SIZES = "(min-width: 768px) 40vw, 90vw"

/** Overlaps the bottom of WhyBrilyx (negative top margin), as the reference's tabs card does. */
export function SelectedWork() {
  // A service without projects gets no tab, so a category never shows up as just a "Next up" tile.
  const tabs: WorkTab[] = services
    .map((service) => ({ service, projects: projectsByCategory(service.slug) }))
    .filter(({ projects }) => projects.length > 0)
    .map(({ service, projects }) => ({
      slug: service.slug,
      label: service.title,
      projects: projects.map((project) => ({
        slug: project.slug,
        name: project.name,
        description: project.description,
        isPlaceholder: project.isPlaceholder,
        media: <MediaSlot asset={projectAsset(project.slug, project.name)} fit="fill" sizes={CARD_SIZES} />,
      })),
    }))

  return (
    <section
      id="work"
      aria-label="Selected work"
      className="relative z-10 -mt-52 pb-[var(--space-section)] lg:-mt-60"
    >
      <div className="container-x">
        <div data-work-card data-reveal="up" className="rounded-brand bg-white p-6 shadow-lift sm:p-10 lg:p-14">
          <WorkTabs tabs={tabs} />
        </div>
        <div className="mt-10 flex justify-center">
          <ArrowLink href="/work">View all work</ArrowLink>
        </div>
      </div>
    </section>
  )
}
