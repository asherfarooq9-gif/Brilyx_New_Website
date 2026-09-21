"use client"

import { useState, type FormEvent, type ReactNode } from "react"
import { CheckCircle2, ChevronDown, Loader2 } from "lucide-react"
import { SERVICE_OPTIONS, contactSchema, toFieldErrors, type ContactField } from "@/lib/contact-schema"
import { cn } from "@/lib/cn"
import { site } from "@/content/site"

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string; showFallback: boolean }

type FieldErrors = Partial<Record<ContactField, string>>

const SERVER_MESSAGES: Record<string, { message: string; showFallback: boolean }> = {
  not_configured: {
    message: "Our contact form isn't connected yet, so your message was not sent.",
    showFallback: true,
  },
  rate_limited: { message: "Too many attempts. Please wait a few minutes and try again.", showFallback: true },
  delivery_failed: { message: "We couldn't deliver your message. Please try again or contact us directly.", showFallback: true },
  too_large: { message: "Your message is too long.", showFallback: false },
}

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
  const [status, setStatus] = useState<Status>({ kind: "idle" })
  const [errors, setErrors] = useState<FieldErrors>({})

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form).entries())

    const parsed = contactSchema.safeParse(values)
    if (!parsed.success) {
      const fieldErrors = toFieldErrors(parsed.error)
      setErrors(fieldErrors)
      setStatus({ kind: "idle" })
      focusFirstError(form, fieldErrors)
      return
    }

    setErrors({})
    setStatus({ kind: "submitting" })
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      })
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; code?: string; errors?: FieldErrors }

      if (response.ok && result.ok) {
        form.reset()
        setStatus({ kind: "success" })
        return
      }
      if (response.status === 422 && result.errors) {
        setErrors(result.errors)
        setStatus({ kind: "idle" })
        focusFirstError(form, result.errors)
        return
      }
      const known = SERVER_MESSAGES[result.code ?? ""]
      setStatus({
        kind: "error",
        message: known?.message ?? "Something went wrong. Please try again or contact us directly.",
        showFallback: known?.showFallback ?? true,
      })
    } catch {
      setStatus({ kind: "error", message: "We couldn't reach the server. Check your connection and try again.", showFallback: true })
    }
  }

  if (status.kind === "success") {
    return (
      // The form unmounts on success, so move focus to the confirmation instead of dropping it to <body>.
      <div
        role="status"
        tabIndex={-1}
        ref={(element) => element?.focus()}
        className="rounded-brand border border-line bg-white p-10 text-center shadow-card outline-none"
      >
        <CheckCircle2 className="mx-auto size-10 text-primary" aria-hidden />
        <h2 className="display-md mt-6">Message sent.</h2>
        <p className="mt-3 text-ink-soft">Thank you. We&rsquo;ll reply to the email address you provided.</p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="eyebrow mt-8 text-primary underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    )
  }

  const isSubmitting = status.kind === "submitting"

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

      <div aria-live="polite">
        {status.kind === "error" ? (
          <div role="alert" className="rounded-brand border border-error/30 bg-error/5 px-5 py-4 text-sm text-error">
            <p>{status.message}</p>
            {status.showFallback ? (
              <p className="mt-2 text-ink">
                You can email{" "}
                <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                  {site.email}
                </a>{" "}
                or message us on{" "}
                <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                  WhatsApp
                </a>
                .
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="eyebrow inline-flex h-[3.25rem] items-center justify-center gap-3 rounded-brand bg-primary px-8 text-white transition-colors hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          "Send Message"
        )}
      </button>
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
