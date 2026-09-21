import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FinalCta } from "@/components/sections/FinalCta"
import { PageHero } from "@/components/sections/PageHero"
import { ArrowLink } from "@/components/ui/Button"
import { MediaSlot } from "@/components/ui/MediaSlot"
import { projectAsset } from "@/content/assets"
import { getProject, projects } from "@/content/projects"
import { getService } from "@/content/services"

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/work/${project.slug}` },
    // Placeholder records must not be indexed as if they were real case studies.
    robots: project.isPlaceholder ? { index: false, follow: true } : undefined,
  }
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const service = getService(project.category)
  const index = projects.findIndex((item) => item.slug === project.slug)
  const next = projects[(index + 1) % projects.length]
  const details = [
    { label: "Category", value: service?.title ?? project.category },
    { label: "Year", value: project.year ? String(project.year) : "To be confirmed" },
    { label: "Stack", value: project.technologies.length ? project.technologies.join(", ") : "To be confirmed" },
  ]

  return (
    <>
      <PageHero
        eyebrow={service?.title ?? "Project"}
        title={project.name}
        crumbs={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: project.name }]}
      />

      <section className="section-y">
        <div className="container-x">
          {project.isPlaceholder ? (
            <p
              role="note"
              className="mb-12 rounded-brand border border-dashed border-primary/40 bg-primary-soft/60 px-6 py-4 text-sm text-primary"
            >
              An exploratory interface concept, not a commissioned client project or a live product.
            </p>
          ) : null}

          <div data-reveal="image" className="overflow-hidden rounded-frame">
            <MediaSlot asset={projectAsset(project.slug, project.name)} parallax priority sizes="(min-width: 1280px) 1200px, 100vw" />
          </div>

          <dl data-reveal="up" className="mt-14 grid gap-8 border-y border-line py-10 sm:grid-cols-3">
            {details.map((detail) => (
              <div key={detail.label}>
                <dt className="eyebrow text-ink-soft">{detail.label}</dt>
                <dd className="display-md mt-3">{detail.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_2fr]">
            <h2 data-reveal="lines" className="display-md">
              About this project
            </h2>
            <p data-reveal="up" className="lead">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Next project" className="border-t border-line">
        <div className="container-x flex flex-wrap items-center justify-between gap-6 py-12">
          <ArrowLink href="/work">All work</ArrowLink>
          <Link href={`/work/${next.slug}`} className="group text-right">
            <span className="eyebrow block text-ink-soft">Next project</span>
            <span className="display-md mt-2 block transition-colors group-hover:text-primary">{next.name}</span>
          </Link>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
