import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import type { ReactNode } from "react"
import { cn } from "@/lib/cn"

type Variant = "primary" | "light" | "outline" | "outline-light"

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-primary text-white border border-primary hover:bg-primary-deep hover:border-primary-deep",
  light: "bg-white text-primary border border-white hover:bg-primary-soft hover:border-primary-soft",
  outline: "bg-transparent text-primary border border-primary/40 hover:border-primary hover:bg-primary hover:text-white",
  "outline-light":
    "bg-transparent text-white border border-white/35 hover:border-white hover:bg-white hover:text-primary",
}

type ButtonLinkProps = {
  href: string
  variant?: Variant
  children: ReactNode
  className?: string
  /** Render a trailing arrow that nudges on hover. */
  arrow?: boolean
}

const BASE =
  "group inline-flex h-[3.25rem] items-center justify-center gap-3 rounded-brand px-7 text-xs font-medium uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-300 md:text-[0.6875rem] md:tracking-[0.24em]"

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href)
}

export function ButtonLink({ href, variant = "primary", children, className, arrow = true }: ButtonLinkProps) {
  const classes = cn(BASE, VARIANTS[variant], className)
  const icon = arrow ? (
    isExternal(href) ? (
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
    ) : (
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    )
  ) : null

  if (isExternal(href)) {
    return (
      <a href={href} className={classes} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
        {icon}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  )
}

/** Inline text link with an underline that draws in and an arrow that nudges. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        // py-3 -my-3 grows the tap target to 44px without moving the layout.
        "group -my-3 inline-flex items-center gap-3 py-3 text-xs font-medium uppercase tracking-[0.2em] md:text-[0.6875rem] md:tracking-[0.24em]",
        className,
      )}
    >
      <span className="relative pb-1 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 group-hover:after:scale-x-100">
        {children}
      </span>
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden />
    </Link>
  )
}
