import Image from "next/image"
import Link from "next/link"
import { Logo } from "@/components/ui/Logo"
import { SocialIcon } from "@/components/ui/SocialIcon"
import { services } from "@/content/services"
import { site } from "@/content/site"

// Padded to a 44px tap target on phones; the desktop columns keep their original tight spacing.
const FOOTER_LINK = "block py-2.5 text-ink-soft transition-colors hover:text-primary lg:py-0"

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line bg-white">
      <div className="container-x pt-20 pb-8 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <Link href="/" aria-label="BRILYX home" className="-my-3 block w-fit py-3">
              <Logo />
            </Link>
            <p className="mt-6 text-ink-soft">
              A digital engineering studio building custom-coded websites, applications, AI automation and chatbot
              integrations.
            </p>
          </div>

          <FooterColumn title="Navigate">
            {site.nav.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Services">
            {services.map((service) => (
              <FooterLink key={service.slug} href={`/services/${service.slug}`}>
                {service.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact">
            <li>
              <a href={`mailto:${site.email}`} className={FOOTER_LINK}>
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className={FOOTER_LINK}
              >
                WhatsApp {site.whatsapp.display}
              </a>
            </li>
            <li className="pt-2">
              {site.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-ink-soft transition-colors hover:text-primary"
                >
                  <span className="grid size-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-primary hover:bg-primary hover:text-white lg:size-10">
                    <SocialIcon icon={item.icon} className="size-4" />
                  </span>
                  <span className="text-sm">@{item.label}</span>
                </a>
              ))}
            </li>
          </FooterColumn>
        </div>

        <div aria-hidden className="mt-20 select-none lg:mt-28">
          <Image
            src="/images/logos/brilyx-wordmark.png"
            alt=""
            width={833}
            height={165}
            className="h-auto w-full opacity-[0.07]"
          />
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-soft sm:flex-row sm:justify-between sm:pr-14">
          <p>© {new Date().getFullYear()} BRILYX. All rights reserved.</p>
          <p>Custom-coded. Built to be owned.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <nav aria-label={title}>
      <p className="eyebrow mb-6 text-ink">{title}</p>
      <ul className="lg:space-y-3">{children}</ul>
    </nav>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className={FOOTER_LINK}>
        {children}
      </Link>
    </li>
  )
}
