"use client"

import Link from "next/link"
import { useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/cn"

export type ServiceSlide = {
  slug: string
  title: string
  summary: string
  media: ReactNode
}

const DRAG_THRESHOLD_PX = 50

/** Position of slide `index` relative to the active one, wrapped into [-2, 1] so a loop of 4 always has a visible neighbour on each side. */
function offsetOf(index: number, active: number, count: number) {
  return ((((index - active + 2) % count) + count) % count) - 2
}

export function ServicesCarousel({ slides }: { slides: ServiceSlide[] }) {
  const count = slides.length
  const [{ active, previous }, setPosition] = useState({ active: 0, previous: 0 })
  const dragStartX = useRef<number | null>(null)
  const didDrag = useRef(false)

  const go = (delta: number) =>
    setPosition((current) => ({ previous: current.active, active: (current.active + delta + count) % count }))
  const goTo = (index: number) => setPosition((current) => ({ previous: current.active, active: index }))

  function onPointerDown(event: PointerEvent) {
    dragStartX.current = event.clientX
    didDrag.current = false
  }

  function onPointerUp(event: PointerEvent) {
    if (dragStartX.current === null) return
    const delta = event.clientX - dragStartX.current
    dragStartX.current = null
    if (Math.abs(delta) < DRAG_THRESHOLD_PX) return
    didDrag.current = true
    go(delta < 0 ? 1 : -1)
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Services"
      className="relative"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(1)
        if (event.key === "ArrowLeft") go(-1)
      }}
    >
      <div
        className="relative mx-auto touch-pan-y overflow-hidden pb-12 select-none"
        style={{ "--w": "min(76vw, 44.5rem)", "--media-height": "calc(var(--w) * 765 / 1024)" } as CSSProperties}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (dragStartX.current = null)}
        onClickCapture={(event) => {
          if (didDrag.current) {
            event.preventDefault()
            event.stopPropagation()
            didDrag.current = false
          }
        }}
      >
        {/* Full interface above a separate caption, so product text stays unobscured. */}
        <div className="relative h-[calc(var(--media-height)+16rem)] sm:h-[calc(var(--media-height)+14rem)]">
          {slides.map((slide, index) => {
            const offset = offsetOf(index, active, count)
            const wrapped = Math.abs(offset - offsetOf(index, previous, count)) > 1
            const isActive = offset === 0
            return (
              <article
                key={slide.slug}
                role="group"
                // The slide parked off-screen (offset -2) must not be reachable by keyboard or screen readers.
                inert={offset === -2}
                aria-hidden={offset === -2 ? true : undefined}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                className="absolute top-0 left-1/2 h-full w-[var(--w)] overflow-hidden rounded-frame bg-primary-deep text-white"
                style={{
                  translate: `calc(-50% + ${offset} * (var(--w) + 1.5rem)) 0`,
                  scale: isActive ? 1 : 0.88,
                  opacity: offset === -2 ? 0 : 1,
                  zIndex: isActive ? 2 : 1,
                  transition: wrapped
                    ? "opacity 600ms ease"
                    : "translate 800ms var(--ease-out-expo), scale 800ms var(--ease-out-expo), opacity 500ms ease",
                }}
              >
                <div className="absolute inset-x-0 top-0 h-[var(--media-height)]">{slide.media}</div>

                <div className="absolute inset-x-0 bottom-0 flex h-64 flex-col items-center justify-center px-6 py-6 text-center sm:h-56 lg:px-12">
                  <span className="eyebrow mb-3 text-white/60">Interface concept</span>
                  <h3 className="display-lg">{slide.title}</h3>
                  <p
                    aria-hidden={isActive ? undefined : true}
                    className={cn(
                      "mt-4 max-w-md text-sm text-white/80 transition-opacity duration-500 sm:text-base",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {slide.summary}
                  </p>
                </div>

                {isActive ? (
                  <Link
                    href={`/services/${slide.slug}`}
                    aria-label={`Explore ${slide.title}`}
                    className="absolute inset-0 z-10"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Show ${slide.title}`}
                    className="absolute inset-0 z-10 cursor-pointer"
                  />
                )}
              </article>
            )
          })}
        </div>

        <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          <ArrowButton label="Previous service" onClick={() => go(-1)}>
            <ArrowLeft className="size-5" aria-hidden />
          </ArrowButton>
          <ArrowButton label="Next service" onClick={() => go(1)}>
            <ArrowRight className="size-5" aria-hidden />
          </ArrowButton>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        Service {active + 1} of {count}: {slides[active].title}
      </p>
    </div>
  )
}

function ArrowButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-[3.75rem] place-items-center rounded-full border border-line bg-white text-ink shadow-card transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-white"
    >
      {children}
    </button>
  )
}
