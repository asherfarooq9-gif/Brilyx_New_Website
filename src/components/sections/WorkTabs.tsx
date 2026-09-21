"use client"

import Link from "next/link"
import { useId, useRef, type KeyboardEvent, type ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { useScrollSteps } from "@/lib/use-scroll-steps"
import { cn } from "@/lib/cn"

export type WorkTab = {
  slug: string
  label: string
  projects: { slug: string; name: string; description: string; isPlaceholder: boolean; media: ReactNode }[]
}

// Keeps the pinned card just below the fixed header.
const PIN_START = "top 96px"

/**
 * Category tabs with a dot track. On desktop the card pins and scrolling steps through the categories;
 * clicking a tab scrolls to it. Everywhere else it is an ordinary tab list.
 */
export function WorkTabs({ tabs }: { tabs: WorkTab[] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const { active, goTo } = useScrollSteps(tabs.length, rootRef, "[data-work-card]", PIN_START)
  const baseId = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const last = tabs.length - 1

  function onKeyDown(event: KeyboardEvent) {
    const move = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0
    if (!move) return
    event.preventDefault()
    const next = (active + move + tabs.length) % tabs.length
    goTo(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <div ref={rootRef}>
      <div
        role="tablist"
        aria-label="Project categories"
        onKeyDown={onKeyDown}
        className="relative grid pb-10"
        style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.slug}
            ref={(el) => {
              tabRefs.current[index] = el
            }}
            role="tab"
            id={`${baseId}-tab-${index}`}
            aria-selected={index === active}
            aria-controls={`${baseId}-panel-${index}`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => goTo(index)}
            className={cn(
              "eyebrow px-1 pt-4 pb-9 text-center transition-colors duration-300 sm:px-3",
              index === active ? "text-ink" : "text-ink-soft hover:text-ink",
            )}
          >
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
          </button>
        ))}

        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[1.4rem] h-px bg-line"
          style={{ insetInline: `${50 / tabs.length}%` }}
        >
          <div
            className="h-full origin-left bg-ink transition-transform duration-700 ease-out-expo"
            style={{ transform: `scaleX(${last ? active / last : 0})` }}
          />
          {tabs.map((tab, index) => (
            <span
              key={tab.slug}
              className={cn(
                "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ease-out-expo",
                index === active
                  ? "size-[1.625rem] border-[7px] border-ink bg-white"
                  : "size-2.5 bg-ink/25",
              )}
              style={{ left: `${last ? (index / last) * 100 : 0}%` }}
            />
          ))}
        </div>
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.slug}
          role="tabpanel"
          id={`${baseId}-panel-${index}`}
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={index !== active}
        >
          {index === active ? (
            <ul className={cn(
              "animate-fade-up grid gap-x-8 gap-y-12 pt-6 md:grid-cols-2",
              tab.projects.length > 2 && "lg:grid-cols-3",
            )}>
              {tab.projects.map((project) => (
                <li key={project.slug}>
                  <Link href={`/work/${project.slug}`} className="group block">
                    {/* Height is capped on desktop so the whole pinned card fits in one screen. */}
                    <div className="relative aspect-[3/2] overflow-hidden rounded-frame lg:aspect-auto lg:h-[min(34svh,22rem)]">
                      <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
                        {project.media}
                      </div>
                    </div>
                    <h3 className="display-md mt-6">{project.name}</h3>
                    <p className="mt-3 line-clamp-2 text-ink-soft">{project.description}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                      <span className="eyebrow text-ink-soft">{project.isPlaceholder ? "Concept" : tab.label}</span>
                      <span className="eyebrow flex items-center gap-2 text-primary">
                        Details
                        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  )
}
