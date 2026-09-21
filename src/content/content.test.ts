import { describe, expect, it } from "vitest"
import { assets, projectAsset } from "./assets"
import { projects } from "./projects"
import { services } from "./services"

describe("content integrity", () => {
  it("defines exactly the four BRILYX services with unique slugs", () => {
    expect(services.map((service) => service.slug)).toEqual([
      "website-development",
      "app-development",
      "ai-automation",
      "chatbot-integration",
    ])
  })

  it("points every service at a declared asset", () => {
    for (const service of services) expect(assets[service.asset]).toBeDefined()
  })

  it("gives every project a unique slug and a valid service category", () => {
    const slugs = projects.map((project) => project.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    const serviceSlugs = new Set<string>(services.map((service) => service.slug))
    for (const project of projects) expect(serviceSlugs.has(project.category)).toBe(true)
  })

  it("has at least one project in every category (the hero and tabs rely on it)", () => {
    for (const service of services) {
      expect(projects.some((project) => project.category === service.slug)).toBe(true)
    }
  })

  it("derives project image paths from the slug", () => {
    expect(projectAsset("demo", "Demo").src).toBe("/images/projects/demo.webp")
    expect(projectAsset("app-project-one", "Demo").src).toBe("/images/projects/app-development/app-project-one.webp")
  })
})
