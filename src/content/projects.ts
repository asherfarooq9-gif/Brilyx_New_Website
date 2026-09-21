import type { ServiceSlug } from "./services"

export type Project = {
  slug: string
  name: string
  category: ServiceSlug
  /** null until a real year is supplied. */
  year: number | null
  description: string
  technologies: readonly string[]
  /** Every record below is a placeholder. Flip to false when replacing with a verified project. */
  isPlaceholder: boolean
}

// To add a real project: edit a record below, set isPlaceholder to false, and drop
// public/images/projects/<category>/<slug>.webp (see IMAGE_GUIDE.md). No layout code changes are needed.
export const projects = [
  {
    "slug": "website-project-one",
    "name": "Al Quran Academy",
    "category": "website-development",
    "year": null,
    "description": "An online Quran academy website presenting courses, teaching methods and trial enrollment.",
    "technologies": [],
    "isPlaceholder": true
  },
  {
    "slug": "website-project-two",
    "name": "Dynamic Enterprises",
    "category": "website-development",
    "year": null,
    "description": "A business website presenting interiors, supplies, corporate films and uniforms.",
    "technologies": [],
    "isPlaceholder": true
  },
  {
    "slug": "website-project-three",
    "name": "Faisal Hayat Traders",
    "category": "website-development",
    "year": null,
    "description": "An automotive retail website showcasing tyres, alloy wheels and contact options.",
    "technologies": [],
    "isPlaceholder": true
  },
  {
    "slug": "app-project-one",
    "name": "SmartRide ? Medical Transport",
    "category": "app-development",
    "year": null,
    "description": "An in-development mobile application for medical transportation in Islamabad and Rawalpindi.",
    "technologies": [],
    "isPlaceholder": true
  },
  {
    "slug": "automation-project-one",
    "name": "WhatsApp AI Automation",
    "category": "ai-automation",
    "year": null,
    "description": "A WhatsApp automation concept for handling incoming messages and business replies.",
    "technologies": [],
    "isPlaceholder": true
  },
  {
    "slug": "automation-project-two",
    "name": "Appointment Booking",
    "category": "ai-automation",
    "year": null,
    "description": "An appointment booking concept with a calendar interface for scheduling.",
    "technologies": [],
    "isPlaceholder": true
  },
  {
    "slug": "chatbot-project-one",
    "name": "Customer Support Chatbot",
    "category": "chatbot-integration",
    "year": null,
    "description": "A customer support concept bringing conversations and customer context into one workspace.",
    "technologies": [],
    "isPlaceholder": true
  },
  {
    "slug": "chatbot-project-two",
    "name": "Website AI Chat",
    "category": "chatbot-integration",
    "year": null,
    "description": "A website chatbot concept for answering visitor questions through a conversational interface.",
    "technologies": [],
    "isPlaceholder": true
  }
] as const satisfies readonly Project[]

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function projectsByCategory(category: string): Project[] {
  return projects.filter((project) => project.category === category)
}
