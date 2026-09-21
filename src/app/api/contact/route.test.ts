import { beforeEach, describe, expect, it, vi } from "vitest"

const send = vi.fn()
vi.mock("resend", () => ({
  Resend: class {
    emails = { send }
  },
}))

import { POST } from "./route"
import { resetRateLimit } from "@/lib/rate-limit"

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  service: "ai-automation",
  message: "We would like to automate our intake workflow.",
}

function post(body: unknown, ip = "9.9.9.9"): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  })
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    resetRateLimit()
    send.mockReset()
    delete process.env.RESEND_API_KEY
    delete process.env.CONTACT_TO_EMAIL
  })

  it("returns 503 not_configured instead of pretending to deliver", async () => {
    const response = await POST(post(valid))
    expect(response.status).toBe(503)
    expect(await response.json()).toMatchObject({ ok: false, code: "not_configured" })
    expect(send).not.toHaveBeenCalled()
  })

  it("returns 422 with field errors for invalid input", async () => {
    const response = await POST(post({ ...valid, email: "nope" }))
    expect(response.status).toBe(422)
    const body = await response.json()
    expect(body.errors.email).toBeTruthy()
  })

  it("returns 400 for malformed JSON", async () => {
    expect((await POST(post("{not json"))).status).toBe(400)
  })

  it("returns 413 for oversized bodies", async () => {
    expect((await POST(post("x".repeat(13_000)))).status).toBe(413)
  })

  it("silently accepts but never sends when the honeypot is filled", async () => {
    process.env.RESEND_API_KEY = "test-key"
    process.env.CONTACT_TO_EMAIL = "team@example.com"
    const response = await POST(post({ ...valid, company: "Spam Inc" }))
    expect(response.status).toBe(200)
    expect(send).not.toHaveBeenCalled()
  })

  it("sends the enquiry with reply-to set when configured", async () => {
    process.env.RESEND_API_KEY = "test-key"
    process.env.CONTACT_TO_EMAIL = "team@example.com"
    send.mockResolvedValue({ data: { id: "1" }, error: null })
    const response = await POST(post(valid))
    expect(response.status).toBe(200)
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({ to: "team@example.com", replyTo: "ada@example.com" }),
    )
  })

  it("returns 502 when the provider reports an error", async () => {
    process.env.RESEND_API_KEY = "test-key"
    process.env.CONTACT_TO_EMAIL = "team@example.com"
    send.mockResolvedValue({ data: null, error: { message: "boom" } })
    const spy = vi.spyOn(console, "error").mockImplementation(() => {})
    const response = await POST(post(valid))
    expect(response.status).toBe(502)
    spy.mockRestore()
  })

  it("returns 415 when the body is not declared as JSON", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "text/plain" },
      body: JSON.stringify(valid),
    })
    expect((await POST(request)).status).toBe(415)
  })

  it("rejects an oversized content-length before reading the body", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "content-length": "999999" },
      body: JSON.stringify(valid),
    })
    expect((await POST(request)).status).toBe(413)
  })

  it("treats a filled honeypot as spam even when it is longer than the schema allows", async () => {
    process.env.RESEND_API_KEY = "test-key"
    process.env.CONTACT_TO_EMAIL = "team@example.com"
    const response = await POST(post({ ...valid, company: "x".repeat(500) }))
    expect(response.status).toBe(200)
    expect(send).not.toHaveBeenCalled()
  })

  it("rate-limits by the platform IP header, not a spoofable x-forwarded-for entry", async () => {
    const attempt = (spoofed: string) =>
      POST(
        new Request("http://localhost/api/contact", {
          method: "POST",
          headers: { "content-type": "application/json", "x-real-ip": "5.5.5.5", "x-forwarded-for": spoofed },
          body: JSON.stringify(valid),
        }),
      )
    let last = 0
    for (let i = 0; i < 6; i++) last = (await attempt(`10.0.0.${i}`)).status
    expect(last).toBe(429)
  })

  it("applies a global cap across all clients", async () => {
    let last = 0
    for (let i = 0; i < 101; i++) last = (await POST(post(valid, `20.0.${Math.floor(i / 250)}.${i}`))).status
    expect(last).toBe(429)
  })

  it("returns 429 after too many requests from one client", async () => {
    let last = 0
    for (let i = 0; i < 6; i++) last = (await POST(post(valid, "7.7.7.7"))).status
    expect(last).toBe(429)
  })
})
