import type { AssetKey } from "./assets"

export type Service = {
  slug: string
  number: string
  title: string
  tagline: string
  summary: string
  detail: string
  capabilities: readonly { title: string; description: string }[]
  asset: AssetKey
}

export const services = [
  {
    slug: "website-development",
    number: "01",
    title: "Website Development",
    tagline: "Custom-coded websites, built to be owned.",
    summary:
      "Premium, hand-coded websites with considered interaction design and performance built in. No drag-and-drop builders.",
    detail:
      "We deliver actual coded websites, not builder exports. That means custom frontend engineering, deliberate motion and layout, fast load times, and a codebase you own outright.",
    capabilities: [
      { title: "Custom website development", description: "Bespoke business, portfolio, and landing pages designed around your brand and goals." },
      { title: "Interactive & animated websites", description: "Purposeful motion, scroll interactions, and immersive experiences that bring your brand to life." },
      { title: "E-commerce development", description: "Online stores with product catalogs, secure checkout integrations, and a smooth shopping experience." },
      { title: "Web applications & SaaS", description: "Custom dashboards, customer portals, and subscription platforms built around your business." },
      { title: "Website redesign & optimization", description: "Refresh your design and improve speed, accessibility, and technical search visibility." },
      { title: "CMS & website maintenance", description: "Flexible content management, regular updates, and ongoing technical support." },
    ],
    asset: "serviceWebsite",
  },
  {
    slug: "app-development",
    number: "02",
    title: "App Development",
    tagline: "Applications that work as well as they look.",
    summary:
      "Mobile, web and cross-platform applications with custom interfaces, solid backends and clean API integrations.",
    detail:
      "From the interface to the backend, we build the whole application: the screens people use, the services behind them, and the integrations that connect them to the rest of your business.",
    capabilities: [
      { title: "Custom mobile app development", description: "Tailor-made mobile products designed around your customers and business workflows." },
      { title: "iOS & Android development", description: "Native or cross-platform applications with consistent experiences across Apple and Android devices." },
      { title: "App UI/UX design", description: "User flows, wireframes, interactive prototypes, and polished mobile interfaces." },
      { title: "MVP & startup development", description: "A focused first release that turns your idea into a usable product you can validate." },
      { title: "AI-powered applications", description: "Intelligent assistants, document analysis, and personalized experiences integrated into your app." },
      { title: "App maintenance & optimization", description: "Bug fixes, performance improvements, and compatibility updates as your product grows." },
    ],
    asset: "serviceApp",
  },
  {
    slug: "ai-automation",
    number: "03",
    title: "AI Automation",
    tagline: "Intelligent workflows for the work nobody wants to do twice.",
    summary:
      "Business workflow automation and AI-powered processes, connected to the systems you already use.",
    detail:
      "We design automation around how your business actually runs: intelligent workflows, system integrations and custom automation that remove repetitive manual steps.",
    capabilities: [
      { title: "Business workflow automation", description: "Connect repeatable tasks across your team so routine work moves forward automatically." },
      { title: "AI-powered process automation", description: "Use AI to classify incoming information, summarize documents, and assist everyday processes." },
      { title: "CRM & business tool integrations", description: "Keep customer records and business applications connected through reliable integrations." },
      { title: "Automated data entry & reporting", description: "Reduce manual copying and bring operational information together in useful reports." },
      { title: "Booking & notification workflows", description: "Connect calendars, booking confirmations, reminders, and customer notifications." },
      { title: "Custom automation solutions", description: "Purpose-built workflows shaped around your operations, with monitoring and human review where needed." },
    ],
    asset: "serviceAutomation",
  },
  {
    slug: "chatbot-integration",
    number: "04",
    title: "AI Chatbot Development",
    tagline: "Assistants that know your business.",
    summary:
      "Custom AI chatbots for websites and applications, from support assistants to knowledge-base search.",
    detail:
      "We build and integrate chatbots that are specific to your business: connected to your content and APIs, and designed to fit naturally into your site or product.",
    capabilities: [
      { title: "Custom website chatbots", description: "Brand-matched website assistants that answer questions and capture inquiries around the clock." },
      { title: "WhatsApp AI chatbots", description: "Automated customer conversations, lead qualification, and booking through official WhatsApp integrations." },
      { title: "AI sales & lead generation", description: "Qualify prospects, recommend relevant services, and turn conversations into sales inquiries." },
      { title: "AI customer support", description: "Answer routine questions, create support tickets, and hand complex inquiries to your team." },
      { title: "Knowledge base & RAG chatbots", description: "Turn your documents, policies, and knowledge base into searchable answers with source citations." },
      { title: "Custom chatbot integrations", description: "Connect assistants to CRMs, databases, calendars, and business tools to perform authorized actions." },
    ],
    asset: "serviceChatbot",
  },
] as const satisfies readonly Service[]

export type ServiceSlug = (typeof services)[number]["slug"]

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}
