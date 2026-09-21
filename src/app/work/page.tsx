import type { Metadata } from "next"
import Link from "next/link"
import { FinalCta } from "@/components/sections/FinalCta"
import { PageHero } from "@/components/sections/PageHero"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { projectsByCategory } from "@/content/projects"
import { services } from "@/content/services"
import { assets } from "@/content/assets"

export const metadata: Metadata = {
  title: "Work",
  description: "Selected BRILYX projects across websites, applications, AI automation and chatbot integration.",
  alternates: { canonical: "/work" },
}

export default function WorkPage() {
  const categories = services.filter((service) => projectsByCategory(service.slug).length > 0)

  return (
    <>
      <PageHero
        background={assets.workHero}
        naturalPhoto
        mobileFullPhoto
        eyebrow="Selected work"
        title="Work built with intention."
        lead="A selection of BRILYX projects, grouped by discipline."
        crumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
      >
        <ul className="flex flex-wrap gap-3">
          {categories.map((service) => (
            <li key={service.slug}>
              <a
                href={`#${service.slug}`}
                className="eyebrow inline-block rounded-full border border-white/30 px-5 py-3.5 transition-colors hover:bg-white hover:text-ink"
              >
                {service.title}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <div className="section-y space-y-24 lg:space-y-32">
        {categories.map((service) => (
          <section key={service.slug} id={service.slug} aria-labelledby={`${service.slug}-heading`} className="container-x scroll-mt-28">
            <p data-reveal="up" className="eyebrow flex items-center gap-5">
              <span id={`${service.slug}-heading`}>{service.title}</span>
              <span aria-hidden className="h-px flex-1 bg-line" />
            </p>
            <ul data-reveal-stagger className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
              {projectsByCategory(service.slug).map((project) => (
                <li key={project.slug} data-reveal-item>
                  <ProjectCard project={project} />
                </li>
              ))}
              <li data-reveal-item className="md:col-span-2">
                <Link
                  href="/contact"
                  className="group flex h-full min-h-44 flex-col justify-end rounded-frame border border-dashed border-primary/40 bg-primary-soft/50 p-8 transition-colors hover:border-primary hover:bg-primary-soft md:min-h-56"
                >
                  <div>
                    <h3 className="display-md">Next up could be yours.</h3>
                    <p className="eyebrow mt-6 text-primary">Start a Project →</p>
                  </div>
                </Link>
              </li>
            </ul>
          </section>
        ))}
      </div>

      <FinalCta />
    </>
  )
}
