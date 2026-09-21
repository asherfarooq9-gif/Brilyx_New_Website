"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Globe2, MessageSquareText, Smartphone, Workflow } from "lucide-react"
import { cn } from "@/lib/cn"

const links = [
  { label: "Websites", slug: "website-development", icon: Globe2 },
  { label: "Apps", slug: "app-development", icon: Smartphone },
  { label: "AI Automation", slug: "ai-automation", icon: Workflow },
  { label: "AI Chatbots", slug: "chatbot-integration", icon: MessageSquareText },
] as const

export function ServiceNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Service navigation" className="service-nav">
      <ul className="grid grid-cols-4 gap-1">
        {links.map(({ label, slug, icon: Icon }) => {
          const href = `/services/${slug}`
          const active = pathname === href
          return (
            <li key={slug}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-14 items-center justify-center gap-2 rounded-brand px-2 py-2 text-center text-[11px] leading-tight font-medium transition-colors duration-200 sm:px-5 sm:text-xs",
                  active ? "bg-primary text-white" : "text-ink-soft hover:bg-primary-soft hover:text-primary",
                )}
              >
                <Icon className="hidden size-4 shrink-0 sm:block" aria-hidden />
                <span>{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
