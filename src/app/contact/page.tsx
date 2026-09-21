import type { Metadata } from "next"
import { Mail, MessageCircle } from "lucide-react"
import { ContactForm } from "@/components/sections/ContactForm"
import { PageHero } from "@/components/sections/PageHero"
import { SocialIcon } from "@/components/ui/SocialIcon"
import { site } from "@/content/site"

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with BRILYX. Tell us what you have in mind and we'll get back to you.",
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build something remarkable."
        lead="Tell us what you have in mind. We'll help turn it into an exceptional digital product."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="section-y bg-page">
        <div className="container-x grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div data-reveal="up">
            <ContactForm />
          </div>

          <aside data-reveal="up" className="space-y-10 lg:pt-4">
            <div>
              <p className="eyebrow text-primary">Prefer to write directly?</p>
              <ul className="mt-6 space-y-5">
                <li>
                  <a href={`mailto:${site.email}`} className="group flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-full border border-line bg-white transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                      <Mail className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="eyebrow block text-ink-soft">Email</span>
                      <span className="mt-1 block text-lg">{site.email}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-full border border-line bg-white transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                      <MessageCircle className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="eyebrow block text-ink-soft">WhatsApp</span>
                      <span className="mt-1 block text-lg">{site.whatsapp.display}</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="eyebrow text-primary">Elsewhere</p>
              <ul className="mt-6 flex gap-3">
                {site.social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="grid size-12 place-items-center rounded-full border border-line bg-white transition-colors hover:border-primary hover:bg-primary hover:text-white"
                    >
                      <SocialIcon icon={item.icon} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
