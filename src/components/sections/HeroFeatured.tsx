"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react"

export type FeaturedItem = {
  slug: string
  name: string
  category: string
  isPlaceholder: boolean
}

/** Bottom-right "featured work" card, mirroring COVILLA's "Popular location" slider. */
export function HeroFeatured({ items }: { items: FeaturedItem[] }) {
  const [index, setIndex] = useState(0)
  const item = items[index]
  const step = (delta: number) => setIndex((current) => (current + delta + items.length) % items.length)

  return (
    <div data-hero-in className="hero-featured absolute inset-x-0 bottom-0 z-10 lg:left-auto lg:w-[34rem]">
      <p className="eyebrow mb-3 flex items-center gap-4 px-6 text-white lg:px-8">
        Featured work
        <span aria-hidden className="h-px flex-1 bg-white/35" />
      </p>
      <div className="flex bg-page text-ink">
        <div className="flex w-14 shrink-0 flex-col border-r border-line lg:w-[4.375rem]">
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next featured project"
            className="grid flex-1 place-items-center border-b border-line transition-colors hover:bg-primary hover:text-white"
          >
            <ArrowRight className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous featured project"
            className="grid flex-1 place-items-center transition-colors hover:bg-primary hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden />
          </button>
        </div>

        <div key={item.slug} className="animate-fade-up min-w-0 flex-1 px-6 py-6 lg:px-9 lg:py-8">
          <p className="font-display text-xl font-medium tracking-tight lg:text-2xl">{item.name}</p>
          <p className="eyebrow mt-3 text-ink-soft">
            {item.category}
            {item.isPlaceholder ? " · Concept" : ""}
          </p>
        </div>

        <Link
          href={`/work/${item.slug}`}
          aria-label={`View ${item.name}`}
          className="grid w-14 shrink-0 place-items-center bg-white transition-colors hover:bg-primary hover:text-white lg:w-[4.375rem]"
        >
          <ChevronRight className="size-5" aria-hidden />
        </Link>
      </div>
      <p className="sr-only" aria-live="polite">
        Featured project {index + 1} of {items.length}: {item.name}
      </p>
    </div>
  )
}
