import { MotionController } from "@/components/motion/MotionController"

// A template (unlike a layout) remounts on every navigation, which re-runs MotionController for the new page.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main id="main">{children}</main>
      <div
        data-page-wipe
        aria-hidden
        className="pointer-events-none invisible fixed inset-0 z-[80] bg-primary-deep"
      />
      <MotionController />
    </>
  )
}
