"use client"

import { useEffect, useRef, useState } from "react"
import { Play, X } from "lucide-react"

type HeroVideoProps = {
  src: string
  /** Poster image URL, or null when none exists. */
  poster: string | null
  /** False until the video file has been added to /public. */
  hasVideo: boolean
}

const IS_DEV = process.env.NODE_ENV === "development"

/**
 * Circular play button (COVILLA's hero "play" control) that opens the showreel in a modal.
 * Uses a native <dialog>: Esc to close, focus trap, inert background and focus restore come from the browser.
 * The <video> is only mounted while open, so nothing downloads until someone clicks play.
 */
export function HeroVideo({ src, poster, hasVideo }: HeroVideoProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const playRef = useRef<HTMLButtonElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    const video = videoRef.current
    root.style.overflow = "hidden"
    return () => {
      video?.pause()
      root.style.overflow = previousOverflow
    }
  }, [isOpen])

  function open() {
    setIsOpen(true)
    dialogRef.current?.showModal()
  }

  function handleClose() {
    setIsOpen(false)
    playRef.current?.focus({ preventScroll: true })
  }

  return (
    <>
      <button
        ref={playRef}
        type="button"
        onClick={open}
        data-hero-in
        aria-label="Play showreel video"
        className="hero-play group absolute right-8 bottom-[12rem] z-10 grid size-16 place-items-center rounded-full border border-white/50 bg-white/15 backdrop-blur-sm transition-colors hover:bg-white hover:text-ink lg:top-[46%] lg:right-[11%] lg:bottom-auto lg:size-[5.5rem]"
      >
        <span aria-hidden className="ring-spin absolute -inset-5 rounded-full border border-dashed border-white/50 lg:-inset-8" />
        <Play className="ml-1 size-6 fill-current transition-transform duration-300 group-hover:scale-110" aria-hidden />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Showreel video"
        data-lenis-prevent
        onClose={handleClose}
        // Clicking the dark backdrop (the dialog element itself, outside the content box) closes it.
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close()
        }}
        className="m-auto w-[min(72rem,92vw,calc((100svh-4rem)*16/9))] max-w-none overflow-visible border-0 bg-transparent p-0 text-white backdrop:bg-black/85 open:animate-fade-up"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-brand bg-black shadow-lift">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close video"
            className="absolute top-3 right-3 z-10 grid size-11 place-items-center rounded-full bg-white/90 text-ink shadow-card transition-colors hover:bg-white"
          >
            <X className="size-5" aria-hidden />
          </button>
          {isOpen && hasVideo ? (
            <video
              ref={videoRef}
              src={src}
              poster={poster ?? undefined}
              controls
              autoPlay
              playsInline
              onEnded={() => dialogRef.current?.close()}
              className="size-full object-contain"
            />
          ) : null}
          {isOpen && !hasVideo ? (
            <div className="grid size-full place-items-center p-8 text-center">
              <div>
                <p className="display-md">Showreel coming soon.</p>
                {IS_DEV ? (
                  <p className="mt-4 font-mono text-xs text-white/70">
                    Add the video at public{src} (H.264 MP4) and reload.
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </dialog>
    </>
  )
}
