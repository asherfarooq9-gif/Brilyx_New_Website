import type { Metadata } from "next"
import { FinalCta } from "@/components/sections/FinalCta"
import { PageHero } from "@/components/sections/PageHero"
import { ArrowLink } from "@/components/ui/Button"
import { MediaSlot } from "@/components/ui/MediaSlot"
import { assets } from "@/content/assets"
import { services } from "@/content/services"
import { cn } from "@/lib/cn"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom website development, app development, AI automation and chatbot integration from the BRILYX digital engineering studio.",
  alternates: { canonical: "/services" },
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        background={assets.servicesHero}
        naturalPhoto
        mobileFullPhoto
        eyebrow="Services"
        title="Four disciplines. One engineering studio."
        lead="Custom-coded websites, applications, AI automation and chatbot integration, all built by the same team and handed over cleanly."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="section-y">
        <div className="container-x space-y-24 lg:space-y-36">
          {services.map((service, index) => (
            <article
              key={service.slug}
              id={service.slug}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-24"
            >
              <div data-reveal="image" className={cn("overflow-hidden rounded-frame", index % 2 === 1 && "lg:order-2")}>
                <MediaSlot asset={assets[service.asset]} parallax sizes="(min-width: 1024px) 45vw, 100vw" />
              </div>
              <div>
                <h2 data-reveal="lines" className="display-lg">
                  {service.title}
                </h2>
                <p data-reveal="up" className="lead mt-6">
                  {service.summary}
                </p>
                <ul data-reveal="up" className="mt-8 grid gap-x-8 gap-y-3 border-t border-line pt-8 sm:grid-cols-2">
                  {service.capabilities.map((item) => (
                    <li key={item.title} className="flex gap-3 text-ink-soft">
                      <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-primary" />
                      {item.title}
                    </li>
                  ))}
                </ul>
                <div data-reveal="up" className="mt-10">
                  <ArrowLink href={`/services/${service.slug}`}>Explore {service.title}</ArrowLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  )
}
