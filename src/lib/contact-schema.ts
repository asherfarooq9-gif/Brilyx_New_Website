import { z } from "zod"

export const SERVICE_OPTIONS = [
  { value: "website-development", label: "Website Development" },
  { value: "app-development", label: "App Development" },
  { value: "ai-automation", label: "AI Automation" },
  { value: "chatbot-integration", label: "Chatbot Integration" },
  { value: "not-sure", label: "Not sure yet" },
] as const

const serviceValues = SERVICE_OPTIONS.map((option) => option.value) as [
  (typeof SERVICE_OPTIONS)[number]["value"],
  ...(typeof SERVICE_OPTIONS)[number]["value"][],
]

export const contactSchema = z.object({
  // Single line only: the name is used in an email subject, so line breaks are rejected (header injection).
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "That name is too long.")
    .regex(/^[^\r\n]+$/, "Please enter your name on a single line."),
  email: z.email("Please enter a valid email address.").max(254, "That email address is too long."),
  service: z.enum(serviceValues, { error: "Please choose a service." }),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(4000, "Please keep your message under 4,000 characters."),
  // Honeypot: real users never see or fill this. Bots often do.
  company: z.string().max(200).optional(),
})

export type ContactInput = z.infer<typeof contactSchema>
export type ContactField = keyof ContactInput

/** First error message per field, for inline display. */
export function toFieldErrors(error: z.ZodError): Partial<Record<ContactField, string>> {
  const errors: Partial<Record<ContactField, string>> = {}
  for (const issue of error.issues) {
    const field = issue.path[0] as ContactField | undefined
    if (field && !errors[field]) errors[field] = issue.message
  }
  return errors
}

export function serviceLabel(value: ContactInput["service"]): string {
  return SERVICE_OPTIONS.find((option) => option.value === value)?.label ?? value
}
