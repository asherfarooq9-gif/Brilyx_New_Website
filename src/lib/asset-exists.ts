import { existsSync } from "node:fs"
import path from "node:path"

/** True when `src` (a /public-relative URL like "/images/hero/x.webp") exists on disk. Server-only. */
export function assetExists(src: string, root: string = process.cwd()): boolean {
  if (!src.startsWith("/") || src.includes("..")) return false
  return existsSync(path.join(root, "public", src))
}
