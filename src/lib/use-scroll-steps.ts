"use client"

import { useEffect, useRef, useState, type RefObject } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

// Scroll-driven stepping only where it is comfortable: desktop, and not for people who asked for less motion.
const PIN_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
// Viewport heights of scrolling spent on each step while the section is pinned.
const SCROLL_PER_STEP = 0.45

/**
 * Active step for a section that pins on desktop and advances as the page scrolls.
 * `anchorRef` sits inside the element to pin (found with `pinSelector`). `goTo` scrolls the page to a step
 * while pinned and simply sets the step when nothing is pinned (phones, reduced motion).
 */
export function useScrollSteps(
  count: number,
  anchorRef: RefObject<HTMLElement | null>,
  pinSelector: string,
  start = "top top",
) {
  const [active, setActive] = useState(0)
  const triggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    const target = anchorRef.current?.closest(pinSelector)
    if (!target) return

    const media = gsap.matchMedia()
    media.add(PIN_QUERY, () => {
      triggerRef.current = ScrollTrigger.create({
        trigger: target,
        start,
        end: () => `+=${window.innerHeight * count * SCROLL_PER_STEP}`,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => setActive(Math.min(count - 1, Math.floor(self.progress * count))),
      })
      // The pin spacer shifts everything below, so re-measure the triggers created before this one.
      ScrollTrigger.refresh()
      return () => {
        triggerRef.current = null
      }
    })
    return () => media.revert()
  }, [anchorRef, count, pinSelector, start])

  function goTo(index: number) {
    const trigger = triggerRef.current
    if (!trigger) {
      setActive(index)
      return
    }
    // Scrolling to the middle of the step's range lets onUpdate set the active step.
    trigger.scroll(trigger.start + ((index + 0.5) / count) * (trigger.end - trigger.start))
  }

  return { active, goTo }
}
