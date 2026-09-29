"use client"

import { useState, type FormEvent, type ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import { SERVICE_OPTIONS, contactSchema, serviceLabel, toFieldErrors, type ContactField } from "@/lib/contact-schema"
import { cn } from "@/lib/cn"
import { site } from "@/content/site"

type FieldErrors = Partial<Record<ContactField, string>>

const FIELD_ORDER: ContactField[] = ["name", "email", "service", "message"]

/** Moves keyboard and screen-reader focus to the first field that failed validation. */
function focusFirstError(form: HTMLFormElement, errors: FieldErrors) {
  const firstInvalid = FIELD_ORDER.find((field) => errors[field])
  const element = firstInvalid ? form.elements.namedItem(firstInvalid) : null
  if (element instanceof HTMLElement) element.focus()
}

const INPUT =
  "w-full rounded-brand border border-line bg-white px-4 py-3.5 text-ink placeholder:text-ink-soft/80transition-colors focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 aria-[invalid=true]:border-error"

export function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form).entries())

    const parsed = contactSchema.safeParse(values)
    if (!parsed.success) {
      const fieldErrors = toFieldErrors(parsed.error)
      setErrors(fieldErrors)
      focusFirstError(form, fieldErrors)
      return
    }

    setErrors({})
    const message = [
      "New BRILYX website enquiry",
      "",
      `Name: ${parsed.data.name}`,
      `Email: ${parsed.data.email}`,
      `Service: ${serviceLabel(parsed.data.service)}`,
      "",
      "Project details:",
      parsed.data.message,
    ].join("\n")

    // This is a user-initiated click, so WhatsApp can open directly on phones
    // and desktops without requiring visitors to create an account on the site.
    window.location.assign(`${site.whatsapp.href}?text=${encodeURIComponent(message)}`)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6 rounded-brand border border-line bg-white p-6 shadow-card sm:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name}>
          <input id="name" name="name" type="text" autoComplete="name" required aria-required="true" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} className={INPUT} />
        </Field>
        <Field label="Email" name="email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" required aria-required="true" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} placeholder="you@company.com" className={INPUT} />
        </Field>
      </div>

      <Field label="What do you need?" name="service" error={errors.service}>
        <div className="relative">
          <select id="service" name="service" defaultValue="" required aria-required="true" aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "service-error" : undefined} className={cn(INPUT, "appearance-none")}>
            <option value="" disabled>
              Select a service
            </option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-soft" aria-hidden />
        </div>
      </Field>

      <Field label="Tell us about your project" name="message" error={errors.message}>
        <textarea id="message" name="message" rows={6} required aria-required="true" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} className={cn(INPUT, "resize-y")} />
      </Field>

      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        className="eyebrow inline-flex h-[3.25rem] items-center justify-center gap-3 rounded-brand bg-primary px-8 text-white transition-colors hover:bg-primary-deep"
      >
        Continue to WhatsApp
      </button>
      <p className="text-sm text-ink-soft">We&rsquo;ll open WhatsApp with your completed enquiry. Tap Send there to deliver it to BRILYX.</p>
    </form>
  )
}

function Field({ label, name, error, children }: { label: string; name: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow mb-3 block text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} role="alert" className="mt-2 text-sm text-error">
          {error}
        </p>
      ) : null}
    </div>
  )
}
