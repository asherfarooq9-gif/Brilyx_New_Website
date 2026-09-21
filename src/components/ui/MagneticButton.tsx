"use client"

import { useRef, type PointerEvent, type ReactNode } from "react"

const MAX_PULL_PX = 8
const CAN_HOVER = "(hover: hover) and (pointer: fine)"
const PREFERS_REDUCED = "(prefers-reduced-motion: reduce)"

/** Restrained magnetic pull toward the cursor. No-op on touch devices and with reduced motion. */
export function MagneticButton({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  function isEnabled() {
    return window.matchMedia(CAN_HOVER).matches && !window.matchMedia(PREFERS_REDUCED).matches
  }

  function handleMove(event: PointerEvent<HTMLSpanElement>) {
    const el = ref.current
    if (!el || !isEnabled()) return
    const rect = el.getBoundingClientRect()
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    el.style.transform = `translate(${dx * MAX_PULL_PX}px, ${dy * MAX_PULL_PX}px)`
  }

  function reset() {
    if (ref.current) ref.current.style.transform = ""
  }

  return (
    <span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={`inline-block transition-transform duration-300 ease-out ${className ?? ""}`}
    >
      {children}
    </span>
  )
}
