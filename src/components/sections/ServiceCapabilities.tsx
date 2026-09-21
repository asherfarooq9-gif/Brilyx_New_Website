import { Globe2, MessageSquareText, Smartphone, Workflow } from "lucide-react"
import { ArrowLink } from "@/components/ui/Button"
import { services, type ServiceSlug } from "@/content/services"

const serviceIcons = {
  "website-development": Globe2,
  "app-development": Smartphone,
  "ai-automation": Workflow,
  "chatbot-integration": MessageSquareText,
} satisfies Record<ServiceSlug, typeof Globe2>

export function ServiceCapabilities() {
  return (
    <section id="service-capabilities" aria-labelledby="capabilities-heading" className="section-y bg-page">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <p data-reveal="up" className="eyebrow mb-5 text-primary">BRILYX / Our capabilities</p>
            <h2 id="capabilities-heading" data-reveal="lines" className="display-xl">
              Services we offer.
            </h2>
          </div>
          <p data-reveal="up" className="lead max-w-xl">
            From your first website to a custom app or AI assistant, explore what we can build for your business.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:gap-6">
          {services.map((service) => {
            const Icon = serviceIcons[service.slug]

            return (
              <article
                key={service.slug}
                data-reveal="up"
                aria-labelledby={`capability-${service.slug}`}
                className="flex flex-col rounded-brand border border-line bg-white p-6 sm:p-8 lg:p-10"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-brand bg-primary-soft text-primary">
                    <Icon className="size-6" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span className="eyebrow text-ink-soft" aria-hidden>{service.number} / 04</span>
                </div>
                <h3 id={`capability-${service.slug}`} className="display-md">{service.title}</h3>
                <p className="mt-3 text-ink-soft">{service.tagline}</p>
                <ul className="mt-7 mb-8 grid gap-3 border-t border-line pt-6">
                  {service.capabilities.map((capability) => (
                    <li key={capability.title} className="flex items-start gap-3 text-sm sm:text-base">
                      <span className="mt-3 h-px w-4 shrink-0 bg-primary" aria-hidden />
                      {capability.title}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto border-t border-line pt-6">
                  <ArrowLink href={`/services/${service.slug}`} className="text-primary">
                    Explore {service.title}
                  </ArrowLink>
                </div>
              </article>
            )
          })}
        </div>

        <div data-reveal="up" className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink-soft">Have a project that brings a few of these together?</p>
          <ArrowLink href="/contact" className="self-start text-primary sm:self-auto">Let&apos;s talk about it</ArrowLink>
        </div>
      </div>
    </section>
  )
}
