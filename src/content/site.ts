export type SocialLink = {
  label: string
  href: string
  icon: "instagram" | "x"
}

export const site = {
  name: "BRILYX",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.brilyx.com",
  tagline: "Digital experiences. Engineered to impress.",
  description:
    "BRILYX is a digital engineering studio building custom-coded websites, applications, AI automation and chatbot integrations for ambitious businesses.",
  email: "brilyx.0@gmail.com",
  whatsapp: { display: "+92 339 5224149", href: "https://wa.me/923395224149" },
  social: [
    { label: "Instagram", href: "https://www.instagram.com/brilyxofficial/", icon: "instagram" },
  ] satisfies SocialLink[],
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Capabilities", href: "/#service-capabilities" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const
