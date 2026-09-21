"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { gsap, ScrollTrigger } from "@/lib/gsap"

// Smooth scrolling only where it helps: fine-pointer desktops that have not asked for reduced motion.
const SMOOTH_QUERY =
  "(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)"

export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia(SMOOTH_QUERY)
    let lenis: Lenis | null = null
    let tick: ((time: number) => void) | null = null

    function start() {
      const instance = new Lenis({ lerp: 0.1, anchors: true })
      lenis = instance
      instance.on("scroll", ScrollTrigger.update)
      tick = (time) => instance.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
    }

    function stop() {
      if (tick) gsap.ticker.remove(tick)
      lenis?.destroy()
      lenis = null
      tick = null
      gsap.ticker.lagSmoothing(500, 33)
    }

    function sync() {
      stop()
      if (query.matches) start()
    }

    sync()
    query.addEventListener("change", sync)
    return () => {
      query.removeEventListener("change", sync)
      stop()
    }
  }, [])

  return null
}
