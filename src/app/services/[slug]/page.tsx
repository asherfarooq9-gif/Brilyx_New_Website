import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRight } from "lucide-react"
import { FinalCta } from "@/components/sections/FinalCta"
import { PageHero } from "@/components/sections/PageHero"
import { ButtonLink } from "@/components/ui/Button"
import { MediaSlot } from "@/components/ui/MediaSlot"
import { approach } from "@/content/approach"
import { assets } from "@/content/assets"
import { getService, services } from "@/content/services"
import { site } from "@/content/site"
import { cn } from "@/lib/cn"

type Params = { slug: string }

/** Stretches the last tile across the empty cells left when the count doesn't fill the 2- and 3-column rows. */
function lastItemSpan(count: number, index: number) {
  if (index !== count - 1) return ""
  return cn(
    count % 2 === 1 && "sm:col-span-2",
    count % 3 === 1 && "lg:col-span-3",
    count % 3 === 2 && "lg:col-span-2",
  )
}

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return {
    title: service.title,
    description: `${service.tagline} ${service.summary}`,
    alternates: { canonical: `/services/${service.slug}` },
  }
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const others = services.filter((item) => item.slug !== service.slug)
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    url: `${site.url}/services/${service.slug}`,
  })

  return (
    <>
      <script type="application/ld+json">{jsonLd}</script>
      <PageHero
        eyebrow={`${service.number} — Service`}
        title={service.title}
        lead={service.summary}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]}
      >
        <ButtonLink href="/contact" variant="light">
          Start a Project
        </ButtonLink>
      </PageHero>

      <section className="section-y bg-page">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 data-reveal="lines" className="display-lg">
              {service.tagline}
            </h2>
            <p data-reveal="up" className="lead mt-8">
              {service.detail}
            </p>
          </div>
          <div data-reveal="image" className="overflow-hidden rounded-frame">
            <MediaSlot asset={assets[service.asset]} parallax sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <h2 data-reveal="lines" className="display-lg mb-10">What we can build for you.</h2>
          <ul data-reveal-stagger className="grid gap-px overflow-hidden rounded-brand border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((capability, index) => (
              <li
                key={capability.title}
                data-reveal-item
                className={cn("bg-white p-8 lg:p-10", lastItemSpan(service.capabilities.length, index))}
              >
                <span className="eyebrow text-primary">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="display-md mt-8">{capability.title}</h3>
                <p className="mt-4 text-ink-soft">{capability.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-page">
        <div className="container-x">
          <div className="max-w-2xl">
            <h2 data-reveal="lines" className="display-lg">
              Four stages, one clear path.
            </h2>
          </div>
          <ol data-reveal-stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {approach.map((step) => (
              <li key={step.number} data-reveal-item className="rounded-brand border border-line bg-white p-7">
                <span className="eyebrow text-primary">{step.number}</span>
                <h3 className="display-md mt-8">{step.title}</h3>
                <p className="mt-3 text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-label="Other services" className="border-t border-line">
        <ul className="container-x grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {others.map((item) => (
            <li key={item.slug} className="md:px-8 md:first:pl-0 md:last:pr-0">
              <Link
                href={`/services/${item.slug}`}
                className="group flex items-center justify-between gap-4 py-10 transition-colors"
              >
                <span className="display-md transition-colors group-hover:text-primary">{item.title}</span>
                <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <FinalCta />
    </>
  )
}
