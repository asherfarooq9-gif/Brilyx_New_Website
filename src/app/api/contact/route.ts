import { Resend } from "resend"
import { contactSchema, serviceLabel, toFieldErrors, type ContactInput } from "@/lib/contact-schema"
import { GLOBAL_LIMIT, isRateLimited } from "@/lib/rate-limit"

const MAX_BODY_CHARS = 12_000
const MAX_BODY_BYTES = MAX_BODY_CHARS * 3 // worst case for multi-byte characters
const DEFAULT_FROM = "BRILYX Website <onboarding@resend.dev>"

type ContactConfig = { apiKey: string; to: string; from: string }

/** Delivery needs RESEND_API_KEY and CONTACT_TO_EMAIL. Without them the route reports "not configured". */
function getContactConfig(): ContactConfig | null {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !to) return null
  return { apiKey, to, from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM }
}

function reply(status: number, body: Record<string, unknown>): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } })
}

/**
 * Best client identifier available. Platform-set headers are preferred (they cannot be spoofed by the caller);
 * otherwise use the LAST x-forwarded-for entry, which is the one our own proxy appended.
 */
function clientKey(request: Request): string {
  const platform = request.headers.get("x-real-ip") ?? request.headers.get("x-vercel-forwarded-for")
  if (platform) return platform.trim()
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")
  return forwarded?.at(-1)?.trim() || "unknown"
}

function buildEmailText(input: ContactInput): string {
  return [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Service: ${serviceLabel(input.service)}`,
    "",
    input.message,
  ].join("\n")
}

function isHoneypotFilled(body: unknown): boolean {
  if (typeof body !== "object" || body === null) return false
  const value = (body as Record<string, unknown>).company
  return typeof value === "string" && value.length > 0
}

export async function POST(request: Request): Promise<Response> {
  // Require JSON so browsers must send a CORS preflight for cross-site posts.
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return reply(415, { ok: false, code: "unsupported_media_type" })
  }
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return reply(413, { ok: false, code: "too_large" })
  }
  if (isRateLimited(clientKey(request)) || isRateLimited("global", Date.now(), GLOBAL_LIMIT)) {
    return reply(429, { ok: false, code: "rate_limited" })
  }

  const raw = await request.text()
  if (raw.length > MAX_BODY_CHARS) return reply(413, { ok: false, code: "too_large" })

  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    return reply(400, { ok: false, code: "invalid_json" })
  }

  // Honeypot filled: pretend success so bots learn nothing, and send nothing. Checked before validation so
  // a bot cannot tell the difference by tripping a field error.
  if (isHoneypotFilled(body)) return reply(200, { ok: true })

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return reply(422, { ok: false, code: "invalid", errors: toFieldErrors(parsed.error) })
  }
  const input = parsed.data

  const config = getContactConfig()
  if (!config) return reply(503, { ok: false, code: "not_configured" })

  try {
    const { error } = await new Resend(config.apiKey).emails.send({
      from: config.from,
      to: config.to,
      replyTo: input.email,
      subject: `New enquiry from ${input.name}: ${serviceLabel(input.service)}`,
      text: buildEmailText(input),
    })
    if (error) throw new Error(error.message)
  } catch (error) {
    console.error("[contact] email delivery failed:", error instanceof Error ? error.message : String(error))
    return reply(502, { ok: false, code: "delivery_failed" })
  }

  return reply(200, { ok: true })
}
