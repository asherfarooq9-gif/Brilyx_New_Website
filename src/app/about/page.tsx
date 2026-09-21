import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { FinalCta } from "@/components/sections/FinalCta"
import { PageHero } from "@/components/sections/PageHero"
import { MediaSlot } from "@/components/ui/MediaSlot"
import { principles } from "@/content/approach"
import { assets } from "@/content/assets"
import { services } from "@/content/services"

export const metadata: Metadata = {
  title: "About",
  description:
    "BRILYX is a digital engineering studio building custom-coded websites, applications, AI automation and chatbot integrations.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        background={assets.aboutHero}
        naturalPhoto
        mobileFullPhoto
        eyebrow="About BRILYX"
        title="A studio that builds things properly."
        lead="We engineer exceptional digital experiences through custom software development, intelligent automation and modern technology."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="section-y bg-page">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 data-reveal="lines" className="display-lg">
              Creative development, software engineering and intelligent automation, in one place.
            </h2>
            <p data-reveal="up" className="lead mt-8">
              BRILYX is a digital engineering studio. We build premium custom websites, applications, AI automation
              and chatbot integrations for businesses that want software made for them, not adapted from a template.
            </p>
            <p data-reveal="up" className="mt-5 text-ink-soft">
              Everything we deliver is coded by hand and handed over with clear documentation, so you own what we
              build and are never locked in.
            </p>
          </div>
          <div data-reveal="image" className="overflow-hidden rounded-frame">
            <MediaSlot asset={assets.aboutStudio} parallax sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <ol className="divide-y divide-line">
            {principles.map((principle) => (
              <li key={principle.number} data-reveal="up" className="grid gap-4 py-10 md:grid-cols-[5rem_1fr_1.2fr] md:gap-10">
                <span className="eyebrow text-primary">{principle.number.padStart(2, "0")}</span>
                <h3 className="display-md">{principle.title}</h3>
                <p className="text-ink-soft">{principle.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-label="Services" className="border-t border-line bg-page">
        <ul className="container-x grid divide-y divide-line md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.slug} className="md:px-8 md:first:pl-0">
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full items-start justify-between gap-4 py-10"
              >
                <span className="display-md transition-colors group-hover:text-primary">{service.title}</span>
                <ArrowUpRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <FinalCta />
    </>
  )
}
