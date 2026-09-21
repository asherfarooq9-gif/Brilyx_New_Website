import Image from "next/image"
import type { CSSProperties } from "react"
import { assetExists } from "@/lib/asset-exists"
import { cn } from "@/lib/cn"
import type { AssetDef } from "@/content/assets"

type MediaSlotProps = {
  asset: AssetDef
  /** next/image `sizes` hint for this slot. */
  sizes: string
  priority?: boolean
  /** "ratio" keeps the asset's aspect ratio; "fill" stretches to the positioned parent. */
  fit?: "ratio" | "fill"
  /** Adds a scroll-parallax target; the image is oversized so it can drift inside the frame. */
  parallax?: boolean
  /** Preserve the entire photograph below 768px; parent must allow natural height. */
  mobileFullPhoto?: boolean
  className?: string
}

const IS_DEV = process.env.NODE_ENV === "development"

/**
 * Renders the real image when it exists in /public, otherwise a designed placeholder that holds the
 * same aspect ratio. Never shows a broken image.
 */
export function MediaSlot({
  asset,
  sizes,
  priority = false,
  fit = "ratio",
  parallax = false,
  mobileFullPhoto = false,
  className,
}: MediaSlotProps) {
  const hasImage = assetExists(asset.src)
  const useParallax = parallax && !asset.contain

  return (
    <div
      className={cn(
        "overflow-hidden",
        asset.contain ? "bg-[#f5f2eb]" : "bg-primary-deep",
        // Exactly one positioning class: "relative" and "absolute" together resolve to "relative" and collapse the box.
        fit === "ratio" ? "relative w-full" : "absolute inset-0",
        mobileFullPhoto && "media-full-mobile",
        className,
      )}
      style={{ ...(fit === "ratio" ? { aspectRatio: asset.ratio } : {}), "--photo-ratio": asset.ratio } as CSSProperties}
    >
      <div
        {...(useParallax ? { "data-parallax": "" } : {})}
        className={cn("absolute inset-x-0", useParallax ? "inset-y-0 lg:-inset-y-[5%]" : "inset-y-0")}
      >
        {hasImage ? (
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={asset.contain ? "object-contain" : "object-cover"}
          />
        ) : (
          <Placeholder asset={asset} />
        )}
      </div>
    </div>
  )
}

function Placeholder({ asset }: { asset: AssetDef }) {
  return (
    <div
      role="img"
      aria-label={asset.alt || undefined}
      aria-hidden={asset.alt ? undefined : true}
      className="absolute inset-0 bg-gradient-to-br from-primary-deep to-primary"
    >
      <div className={cn("absolute inset-0", `pattern-${asset.variant}`)} />
      <Image
        src="/images/logos/brilyx-mark-light.png"
        alt=""
        width={469}
        height={533}
        className="absolute right-[8%] bottom-[10%] h-[38%] w-auto opacity-[0.07]"
      />
      {IS_DEV ? (
        <p className="absolute bottom-[11%] left-3 max-w-[85%] rounded-sm bg-black/35 px-2 py-1 font-mono text-[10px] leading-snug text-white/80">
          PLACEHOLDER · {asset.label}
          <br />
          {asset.src}
        </p>
      ) : null}
    </div>
  )
}
