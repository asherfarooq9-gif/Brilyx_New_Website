import type { Metadata } from "next"
import { PageHero } from "@/components/sections/PageHero"
import { ButtonLink } from "@/components/ui/Button"

export const metadata: Metadata = { title: "Page not found" }

export default function NotFound() {
  return (
    <PageHero eyebrow="Error 404" title="This page doesn't exist." lead="The link may be broken, or the page may have moved.">
      <div className="flex flex-wrap gap-4">
        <ButtonLink href="/" variant="light">
          Back to Home
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline-light">
          Contact Us
        </ButtonLink>
      </div>
    </PageHero>
  )
}
