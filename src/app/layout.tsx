import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { Rail } from "@/components/layout/Rail"
import { ServiceNav } from "@/components/layout/ServiceNav"
import { SmoothScroll } from "@/components/motion/SmoothScroll"
import { WhatsAppButton } from "@/components/ui/WhatsAppButton"
import { site } from "@/content/site"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-poppins", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "BRILYX — Digital engineering studio", template: "%s | BRILYX" },
  description: site.description,
  applicationName: "BRILYX",
  openGraph: {
    type: "website",
    siteName: "BRILYX",
    title: "BRILYX — Digital engineering studio",
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: "BRILYX — Digital engineering studio", description: site.description },
}

export const viewport: Viewport = { themeColor: "#3560be" }

const organizationJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  logo: `${site.url}/images/logos/brilyx-logo.png`,
  sameAs: site.social.map((item) => item.href),
})

// Marks <html> as JS-enabled (enables hero start states) and un-hides the hero if animation never starts.
const BOOT_SCRIPT = `document.documentElement.classList.add("js");setTimeout(function(){document.documentElement.classList.add("hero-ready")},3500)`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <script>{BOOT_SCRIPT}</script>
        <script type="application/ld+json">{organizationJsonLd}</script>
      </head>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-brand bg-primary px-4 py-3 text-sm text-white focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Rail />
        <Header />
        <div className="site-content lg:pl-20">
          {children}
          <Footer />
        </div>
        <WhatsAppButton />
        <ServiceNav />
      </body>
    </html>
  )
}
