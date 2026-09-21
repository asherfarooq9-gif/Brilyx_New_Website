const MAX_TRACKED_KEYS = 5000
const MAX_KEY_LENGTH = 64

type Limit = { max: number; windowMs: number }

/** Per-client default: 5 requests per 10 minutes. */
export const CLIENT_LIMIT: Limit = { max: 5, windowMs: 10 * 60 * 1000 }
/** Across all clients: caps total sends so header rotation or a botnet cannot drain the email quota. */
export const GLOBAL_LIMIT: Limit = { max: 100, windowMs: 60 * 60 * 1000 }

const hits = new Map<string, number[]>()

/**
 * Sliding-window limiter, in memory. On serverless hosts each instance keeps its own counts, so this is a
 * best-effort brake against casual abuse, not a guarantee. Use a shared store (or the host's firewall / BotID)
 * if the form becomes a target.
 */
export function isRateLimited(rawKey: string, now: number = Date.now(), limit: Limit = CLIENT_LIMIT): boolean {
  const key = rawKey.slice(0, MAX_KEY_LENGTH)
  const recent = (hits.get(key) ?? []).filter((time) => now - time < limit.windowMs)
  if (recent.length >= limit.max) {
    hits.set(key, recent)
    return true
  }
  // Re-insert so the Map's insertion order approximates least-recently-used for eviction.
  hits.delete(key)
  hits.set(key, [...recent, now])
  if (hits.size > MAX_TRACKED_KEYS) hits.delete(hits.keys().next().value as string)
  return false
}

export function resetRateLimit(): void {
  hits.clear()
}
