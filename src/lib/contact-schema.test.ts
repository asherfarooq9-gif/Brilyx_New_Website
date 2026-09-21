import { describe, expect, it } from "vitest"
import { contactSchema, toFieldErrors } from "./contact-schema"

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  service: "website-development",
  message: "We need a custom marketing website.",
}

describe("contactSchema", () => {
  it("accepts a complete, valid enquiry", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it("trims whitespace around name and message", () => {
    const result = contactSchema.parse({ ...valid, name: "  Ada  ", message: "  A long enough message.  " })
    expect(result.name).toBe("Ada")
    expect(result.message).toBe("A long enough message.")
  })

  it.each([
    ["name", { name: "A" }],
    ["email", { email: "not-an-email" }],
    ["service", { service: "seo" }],
    ["message", { message: "short" }],
  ])("rejects an invalid %s", (field, override) => {
    const result = contactSchema.safeParse({ ...valid, ...override })
    expect(result.success).toBe(false)
    if (!result.success) expect(toFieldErrors(result.error)[field as keyof typeof valid]).toBeTruthy()
  })

  it("rejects line breaks in the name (email header injection)", () => {
    const result = contactSchema.safeParse({ ...valid, name: "Ada\r\nBcc: attacker@example.com" })
    expect(result.success).toBe(false)
  })

  it("rejects an over-long message", () => {
    expect(contactSchema.safeParse({ ...valid, message: "x".repeat(4001) }).success).toBe(false)
  })
})

describe("toFieldErrors", () => {
  it("keeps only the first message per field", () => {
    const result = contactSchema.safeParse({ ...valid, name: "" })
    if (result.success) throw new Error("expected failure")
    expect(Object.keys(toFieldErrors(result.error))).toEqual(["name"])
  })
})
