import Link from "next/link"
import { forwardRef } from "react"
import { SocialIcon } from "@/components/ui/SocialIcon"
import { cn } from "@/lib/cn"
import { services } from "@/content/services"
import { site } from "@/content/site"

type MenuOverlayProps = {
  isOpen: boolean
  onNavigate: () => void
}

export const MenuOverlay = forwardRef<HTMLDivElement, MenuOverlayProps>(function MenuOverlay(
  { isOpen, onNavigate },
  ref,
) {
  return (
    <div
      ref={ref}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      data-lenis-prevent
      data-tone="dark"
      inert={!isOpen}
      className={cn(
        "pattern-grid fixed inset-0 z-0 overflow-y-auto bg-primary-deep text-white",
        "transition-[clip-path] duration-[800ms] ease-in-out-expo",
        isOpen ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]",
      )}
    >
      <div className="container-x flex min-h-full flex-col justify-between gap-16 pt-32 pb-10 lg:pl-[calc(var(--rail-width)+3rem)]">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <ul>
            {site.nav.map((link, index) => (
              <li key={link.href} className="overflow-hidden border-b border-white/10">
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  style={{ transitionDelay: isOpen ? `${250 + index * 70}ms` : "0ms" }}
                  className={cn(
                    "group flex items-baseline gap-6 py-4 transition-[transform,opacity] duration-700 ease-out-expo lg:py-5",
                    isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
                  )}
                >
                  <span className="eyebrow w-8 text-white/70">{String(index + 1).padStart(2, "0")}</span>
                  <span className="display-lg transition-transform duration-500 ease-out-expo group-hover:translate-x-3">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-12 lg:pt-4">
            <div>
              <p className="eyebrow mb-5 text-white/70">Services</p>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      onClick={onNavigate}
                      className="text-lg text-white/85 transition-colors hover:text-white"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-5 text-white/70">Contact</p>
              <a href={`mailto:${site.email}`} className="text-lg text-white/85 hover:text-white">
                {site.email}
              </a>
            </div>
          </div>
        </div>

        <ul className="flex gap-3">
          {site.social.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="grid size-11 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white hover:text-ink"
              >
                <SocialIcon icon={item.icon} className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})
