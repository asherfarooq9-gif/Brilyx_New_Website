import type { MetadataRoute } from "next"
import { projects } from "@/content/projects"
import { services } from "@/content/services"
import { site } from "@/content/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/services", "/work", "/about", "/contact"]
  const servicePaths = services.map((service) => `/services/${service.slug}`)
  // Placeholder projects are marked noindex, so they are left out of the sitemap.
  const projectPaths = projects.filter((project) => !project.isPlaceholder).map((project) => `/work/${project.slug}`)

  return [...staticPaths, ...servicePaths, ...projectPaths].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
  }))
}
