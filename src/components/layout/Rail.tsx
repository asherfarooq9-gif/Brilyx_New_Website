"use client"

import { useEffect, useRef } from "react"
import { SocialIcon } from "@/components/ui/SocialIcon"
import { site } from "@/content/site"

/** Desktop-only left rail: scroll-progress line and social links (mirrors the reference chrome). */
export function Rail() {
  const railRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0
      railRef.current?.style.setProperty("--progress", progress.toFixed(4))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <aside
      ref={railRef}
      data-tone="dark"
      className="fixed inset-y-0 left-0 z-40 hidden w-20 border-r border-white/15 text-white transition-[background-color,border-color,color] duration-500 scrolled:border-line scrolled:bg-white scrolled:text-ink lg:block"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-32 h-[46vh] w-px -translate-x-1/2 bg-white/25 transition-colors duration-500 scrolled:bg-line"
      >
        <div
          className="h-full w-full origin-top bg-white transition-colors duration-500 scrolled:bg-primary"
          style={{ transform: "scaleY(var(--progress, 0))" }}
        />
      </div>

      <ul className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col gap-3">
        {site.social.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="grid size-9 place-items-center rounded-full border border-current/25 opacity-70 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white hover:opacity-100"
            >
              <SocialIcon icon={item.icon} className="size-3.5" />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
