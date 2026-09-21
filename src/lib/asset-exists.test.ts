import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { assetExists } from "./asset-exists"

let root: string

beforeAll(() => {
  root = mkdtempSync(path.join(tmpdir(), "brilyx-assets-"))
  mkdirSync(path.join(root, "public", "images"), { recursive: true })
  writeFileSync(path.join(root, "public", "images", "present.webp"), "x")
})

afterAll(() => rmSync(root, { recursive: true, force: true }))

describe("assetExists", () => {
  it("is true for a file under /public", () => {
    expect(assetExists("/images/present.webp", root)).toBe(true)
  })

  it("is false for a missing file, so the slot shows a placeholder", () => {
    expect(assetExists("/images/missing.webp", root)).toBe(false)
  })

  it("refuses path traversal and non-absolute paths", () => {
    expect(assetExists("/../secret.txt", root)).toBe(false)
    expect(assetExists("images/present.webp", root)).toBe(false)
  })
})
