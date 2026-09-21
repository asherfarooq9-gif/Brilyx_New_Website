import Image from "next/image"
import { cn } from "@/lib/cn"

type LogoProps = {
  /** "light" = white artwork for dark backgrounds. */
  tone?: "dark" | "light"
  className?: string
  priority?: boolean
}

/** Horizontal lockup built from the supplied BRILYX mark and wordmark. */
export function Logo({ tone = "dark", className, priority = false }: LogoProps) {
  const suffix = tone === "light" ? "-light" : ""
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src={`/images/logos/brilyx-mark${suffix}.png`}
        alt=""
        width={469}
        height={533}
        priority={priority}
        className="h-8 w-auto"
      />
      <Image
        src={`/images/logos/brilyx-wordmark${suffix}.png`}
        alt="BRILYX"
        width={833}
        height={165}
        priority={priority}
        className="h-[15px] w-auto"
      />
    </span>
  )
}
