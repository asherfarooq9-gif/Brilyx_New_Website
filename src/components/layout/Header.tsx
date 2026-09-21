"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight } from "lucide-react"
import { Logo } from "@/components/ui/Logo"
import { MenuOverlay } from "@/components/layout/MenuOverlay"
import { cn } from "@/lib/cn"

const SCROLLED_AFTER_PX = 40
const BAR_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Capabilities", href: "/#service-capabilities" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const

const FOCUSABLE = "a[href], button:not([disabled])"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Flags <html data-scrolled> so the rail and bar switch from "over hero" to "solid".
  useEffect(() => {
    const root = document.documentElement
    const update = () => {
      root.dataset.scrolled = String(window.scrollY > SCROLLED_AFTER_PX)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => {
      window.removeEventListener("scroll", update)
      delete root.dataset.scrolled
    }
  }, [])

  // Menu: lock page scroll, Escape closes, Tab stays inside the toggle + overlay links.
  useEffect(() => {
    if (!isMenuOpen) return
    const root = document.documentElement
    root.dataset.menuOpen = "true"
    const previousOverflow = root.style.overflow
    root.style.overflow = "hidden"
    menuRef.current?.querySelector<HTMLElement>("a")?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (event.key !== "Tab") return
      const focusables = [toggleRef.current, ...(menuRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])].filter(
        (el): el is HTMLElement => Boolean(el),
      )
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      root.style.overflow = previousOverflow
      delete root.dataset.menuOpen
    }
  }, [isMenuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-[60]" data-tone="dark">
      <MenuOverlay ref={menuRef} isOpen={isMenuOpen} onNavigate={() => setIsMenuOpen(false)} />

      <div
        data-hero-in
        className={cn(
          "site-header-bar relative z-10 flex h-16 items-center border-b border-transparent transition-[background-color,border-color,color] duration-500 lg:h-20",
          "text-white scrolled:border-line scrolled:bg-white scrolled:text-ink",
          isMenuOpen && "!border-transparent !bg-transparent !text-white",
        )}
      >
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="site-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="group relative grid size-16 shrink-0 place-items-center bg-white text-primary lg:size-20"
        >
          <span className="relative block h-3 w-7" aria-hidden>
            <span
              className={cn(
                "absolute left-0 h-px w-full bg-current transition-all duration-500 ease-out-expo",
                isMenuOpen ? "top-1/2 rotate-45" : "top-0 group-hover:w-5",
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-px w-full bg-current transition-all duration-500 ease-out-expo",
                isMenuOpen ? "top-1/2 -rotate-45" : "bottom-0 group-hover:w-full",
              )}
            />
          </span>
        </button>

        <Link href="/" aria-label="BRILYX home" className="-my-1 ml-5 py-1 lg:ml-9">
          <span className={cn("header-logo-light block scrolled:hidden", isMenuOpen && "!block")}>
            <Logo tone="light" priority />
          </span>
          <span className={cn("header-logo-dark hidden scrolled:block", isMenuOpen && "!hidden")}>
            <Logo tone="dark" priority />
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className={cn(
            "absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 transition-opacity duration-300 xl:flex",
            isMenuOpen && "pointer-events-none opacity-0",
          )}
        >
          {BAR_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "eyebrow group relative py-2 !tracking-[0.3em] transition-colors scrolled:hover:text-primary",
                  isActive && "scrolled:text-primary",
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-500 ease-out-expo group-hover:scale-x-100",
                    isActive ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            )
          })}
        </nav>

        <Link
          href="/contact"
          aria-label="Start a project"
          className={cn(
            "eyebrow group ml-auto mr-4 flex h-11 items-center gap-3 border px-4 !tracking-[0.3em] transition-colors duration-300 lg:mr-8 lg:h-[3.25rem] lg:px-6",
            "border-primary bg-primary text-white hover:border-primary-deep hover:bg-primary-deep",
            isMenuOpen && "pointer-events-none opacity-0",
          )}
        >
          <span className="hidden lg:inline">Start a Project</span>
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </Link>
      </div>
    </header>
  )
}
