"use client"

import { useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useScrollSteps } from "@/lib/use-scroll-steps"
import { cn } from "@/lib/cn"

type Principle = { number: string; title: string; body: string }

/**
 * Numbered rail + statement slider. On desktop the band pins to the top of the screen and scrolling steps
 * through the principles; buttons, the rail and arrow keys drive the same scroll position. On phones it
 * stays a plain slider.
 */
export function WhySlider({ principles }: { principles: readonly Principle[] }) {
  const regionRef = useRef<HTMLDivElement>(null)
  const count = principles.length
  const { active, goTo } = useScrollSteps(count, regionRef, "section")
  const current = principles[active]
  const step = (delta: number) => goTo((active + delta + count) % count)

  return (
    <div
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Why BRILYX"
      className="container-x relative grid gap-10 lg:grid-cols-[6rem_1fr_6rem]"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") step(1)
        if (event.key === "ArrowLeft") step(-1)
      }}
    >
      <ol className="order-2 flex justify-center gap-2 lg:order-none lg:flex-col lg:justify-start lg:gap-1">
        {principles.map((principle, index) => (
          <li key={principle.number}>
            <button
              type="button"
              onClick={() => goTo(index)}
              aria-label={`${principle.number}. ${principle.title}`}
              aria-current={index === active}
              className={cn(
                "relative grid size-11 place-items-center text-sm font-medium transition-colors duration-300 lg:h-[4.125rem] lg:w-full lg:justify-start lg:pl-8",
                index === active ? "text-white" : "text-white/70 hover:text-white",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute bg-white transition-transform duration-500 ease-out-expo max-lg:inset-x-2 max-lg:bottom-0 max-lg:h-0.5 max-lg:origin-left lg:inset-y-2 lg:left-0 lg:w-0.5 lg:origin-top",
                  index === active ? "scale-100" : "scale-0",
                )}
              />
              {principle.number}
            </button>
          </li>
        ))}
      </ol>

      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div key={current.number} className="animate-fade-up">
          <h2 className="display-lg">{current.title}</h2>
          <p className="lead mx-auto mt-6 max-w-xl !text-white/80">{current.body}</p>
        </div>
        <div className="mt-12 flex gap-3">
          <RoundButton label="Previous reason" onClick={() => step(-1)}>
            <ArrowLeft className="size-5" aria-hidden />
          </RoundButton>
          <RoundButton label="Next reason" onClick={() => step(1)}>
            <ArrowRight className="size-5" aria-hidden />
          </RoundButton>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Reason {active + 1} of {count}: {current.title}
      </p>
    </div>
  )
}

function RoundButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-[3.75rem] place-items-center rounded-full bg-white text-ink transition-colors duration-300 hover:bg-primary-soft"
    >
      {children}
    </button>
  )
}
