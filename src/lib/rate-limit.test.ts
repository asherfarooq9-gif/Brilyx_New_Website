import { beforeEach, describe, expect, it } from "vitest"
import { isRateLimited, resetRateLimit } from "./rate-limit"

const MINUTE = 60_000

describe("isRateLimited", () => {
  beforeEach(resetRateLimit)

  it("allows the first five requests in a window and blocks the sixth", () => {
    const results = Array.from({ length: 6 }, (_, i) => isRateLimited("1.1.1.1", i * 1000))
    expect(results).toEqual([false, false, false, false, false, true])
  })

  it("tracks each client separately", () => {
    for (let i = 0; i < 5; i++) isRateLimited("1.1.1.1", i)
    expect(isRateLimited("2.2.2.2", 10)).toBe(false)
  })

  it("treats keys that differ only after 64 characters as the same client", () => {
    const base = "a".repeat(64)
    for (let i = 0; i < 5; i++) isRateLimited(`${base}x${i}`, i)
    expect(isRateLimited(`${base}other`, 10)).toBe(true)
  })

  it("allows requests again once the window has passed", () => {
    for (let i = 0; i < 5; i++) isRateLimited("1.1.1.1", i)
    expect(isRateLimited("1.1.1.1", 11 * MINUTE)).toBe(false)
  })
})
