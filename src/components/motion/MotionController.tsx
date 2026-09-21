"use client"

import { useLayoutEffect } from "react"
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap"

/**
 * One controller animates every element that opts in via data attributes, so section components stay
 * server-rendered. Content is fully visible without JS or with reduced motion; hidden start states
 * are only ever applied here (plus the hero, guarded by CSS + a failsafe in layout.tsx).
 *
 *   data-hero-in / data-hero-lines / data-hero-media   entrance sequence
 *   data-reveal="up|image|lines"                       scroll reveals
 *   data-reveal-stagger > data-reveal-item             staggered group
 *   data-parallax                                      scrubbed drift (see MediaSlot `parallax`)
 *   data-timeline > data-timeline-line / -dot          dot follows scroll along a vertical line
 */

const EASE = "expo.out"
let isFirstPage = true

function each<T extends HTMLElement = HTMLElement>(selector: string, run: (el: T) => void) {
  gsap.utils.toArray<T>(selector).forEach(run)
}

function once(el: Element, start = "top 88%"): ScrollTrigger.Vars {
  return { trigger: el, start, once: true }
}

function splitLines(el: HTMLElement, build: (lines: Element[]) => gsap.core.Animation) {
  SplitText.create(el, {
    type: "lines",
    mask: "lines",
    linesClass: "split-line",
    maskClass: "split-line-mask",
    autoSplit: true,
    onSplit: (self) => build(self.lines),
  })
}

function initHero(delay: number) {
  const root = document.documentElement
  root.classList.remove("hero-ready")

  const items = gsap.utils.toArray<HTMLElement>("[data-hero-in]")
  const headline = document.querySelector<HTMLElement>("[data-hero-lines]")

  gsap.fromTo(
    items,
    { autoAlpha: 0, y: 20 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.65,
      ease: EASE,
      stagger: 0.06,
      delay: delay + 0.05,
      clearProps: "opacity,visibility,transform",
    },
  )

  if (!headline) {
    root.classList.add("hero-ready")
    return
  }
  splitLines(headline, (lines) => {
    const tween = gsap.from(lines, { yPercent: 105, duration: 0.8, ease: EASE, stagger: 0.07, delay: delay + 0.1 })
    root.classList.add("hero-ready")
    return tween
  })
}

function initReveals() {
  each("[data-reveal='up']", (el) =>
    gsap.from(el, { autoAlpha: 0, y: 20, duration: 0.65, ease: EASE, clearProps: "transform", scrollTrigger: once(el) }),
  )

  each("[data-reveal-stagger]", (group) => {
    const items = group.querySelectorAll("[data-reveal-item]")
    gsap.from(items, {
      autoAlpha: 0,
      y: 20,
      duration: 0.65,
      ease: EASE,
      stagger: 0.06,
      clearProps: "transform",
      scrollTrigger: once(group),
    })
  })

  each("[data-reveal='image']", (el) =>
    gsap.fromTo(
      el,
      { clipPath: "inset(0 0 16% 0)", autoAlpha: 0 },
      { clipPath: "inset(0 0 0% 0)", autoAlpha: 1, duration: 0.8, ease: "power2.out", clearProps: "clipPath", scrollTrigger: once(el, "top 90%") },
    ),
  )

  each("[data-reveal='lines']", (el) =>
    splitLines(el, (lines) =>
      gsap.from(lines, { yPercent: 105, duration: 0.75, ease: EASE, stagger: 0.06, scrollTrigger: once(el) }),
    ),
  )
}

function initParallax() {
  each("[data-parallax]", (el) => {
    const frame = el.parentElement
    if (!frame) return
    gsap.fromTo(
      el,
      { yPercent: -3 },
      { yPercent: 3, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } },
    )
  })
}

function initTimelines() {
  each("[data-timeline]", (root) => {
    const line = root.querySelector<HTMLElement>("[data-timeline-line]")
    const dot = root.querySelector<HTMLElement>("[data-timeline-dot]")
    if (!line || !dot) return
    gsap.fromTo(
      dot,
      { y: 0 },
      {
        y: () => line.clientHeight,
        ease: "none",
        scrollTrigger: { trigger: line, start: "top 60%", end: "bottom 60%", scrub: 0.4, invalidateOnRefresh: true },
      },
    )
  })
}

function playPageWipe() {
  const wipe = document.querySelector<HTMLElement>("[data-page-wipe]")
  if (!wipe) return
  // Covers the viewport instantly, then slides away downward. Hidden by CSS (`invisible`) otherwise.
  gsap.fromTo(
    wipe,
    { yPercent: 0, visibility: "visible" },
    {
      yPercent: 100,
      duration: 0.45,
      ease: "expo.inOut",
      onComplete: () => {
        wipe.style.visibility = "hidden"
      },
    },
  )
}

export function MotionController() {
  useLayoutEffect(() => {
    // Deferred so React strict-mode's immediate re-run of this effect still counts as the first page.
    const isNavigation = !isFirstPage
    const firstPageTimer = setTimeout(() => {
      isFirstPage = false
    }, 0)

    const media = gsap.matchMedia()
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (isNavigation) playPageWipe()
      initHero(isNavigation ? 0.15 : 0)
      initReveals()
      initTimelines()
    })
    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const heroMedia = document.querySelector<HTMLElement>("[data-hero-media]")
      if (heroMedia) gsap.fromTo(heroMedia, { scale: 1.04 }, { scale: 1, duration: 0.8, ease: "power2.out", clearProps: "transform" })
    })
    media.add("(min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference)", initParallax)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener("load", refresh)
    void document.fonts?.ready.then(refresh)

    return () => {
      clearTimeout(firstPageTimer)
      window.removeEventListener("load", refresh)
      media.revert()
    }
  }, [])

  return null
}
