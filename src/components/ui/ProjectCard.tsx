import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { MediaSlot } from "@/components/ui/MediaSlot"
import { projectAsset } from "@/content/assets"
import type { Project } from "@/content/projects"
import { getService } from "@/content/services"

export function ProjectCard({ project }: { project: Project }) {
  const category = getService(project.category)?.title ?? project.category
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="overflow-hidden rounded-frame">
        <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
          <MediaSlot asset={projectAsset(project.slug, project.name)} sizes="(min-width: 768px) 30vw, 90vw" />
        </div>
      </div>
      <h3 className="display-md mt-6">{project.name}</h3>
      <p className="mt-3 line-clamp-2 text-ink-soft">{project.description}</p>
      <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
        <span className="eyebrow text-ink-soft">
          {category}
          {project.isPlaceholder ? " · Concept" : ""}
        </span>
        <span className="eyebrow flex items-center gap-2 text-primary">
          Details
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </Link>
  )
}
