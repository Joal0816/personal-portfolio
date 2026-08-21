'use client'

import { useState } from 'react'
import { Mail, MapPin, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { profile } from '@/lib/portfolio-data'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

export function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  function validate(): Errors {
    const next: Errors = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!values.email.trim()) {
      next.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Please enter a valid email.'
    }
    if (!values.message.trim()) next.message = 'Please enter a message.'
    return next
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length === 0) {
      setSubmitted(true)
      setValues({ name: '', email: '', message: '' })
    }
  }

  function update(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
    if (submitted) setSubmitted(false)
  }

  const contactCards = [
    { icon: Mail, label: 'Email', value: profile.email, href: profile.socials.email },
    { icon: MapPin, label: 'Location', value: profile.location },
    { icon: GithubIcon, label: 'GitHub', value: 'View profile', href: profile.socials.github },
    { icon: LinkedinIcon, label: 'LinkedIn', value: 'View profile', href: profile.socials.linkedin },
  ]

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <p className="mb-3 font-mono text-sm text-primary">03 / Contact</p>
      <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
        Let&apos;s build something together.
      </h2>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <Field label="Name" error={errors.name} htmlFor="name">
            <input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={(e) => update('name', e.target.value)}
              className="w-full rounded-md border border-input bg-secondary/30 px-3 py-2.5 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-ring/40"
              placeholder="Jane Doe"
              aria-invalid={!!errors.name}
            />
          </Field>

          <Field label="Email" error={errors.email} htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={(e) => update('email', e.target.value)}
              className="w-full rounded-md border border-input bg-secondary/30 px-3 py-2.5 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-ring/40"
              placeholder="jane@example.com"
              aria-invalid={!!errors.email}
            />
          </Field>

          <Field label="Message" error={errors.message} htmlFor="message">
            <textarea
              id="message"
              name="message"
              rows={5}
              value={values.message}
              onChange={(e) => update('message', e.target.value)}
              className="w-full resize-none rounded-md border border-input bg-secondary/30 px-3 py-2.5 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-ring/40"
              placeholder="Tell me about your project..."
              aria-invalid={!!errors.message}
            />
          </Field>

          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Send Message
          </Button>

          {submitted && (
            <p className="flex items-center gap-2 font-mono text-sm text-primary">
              <Check className="size-4" />
              Thanks! Your message has been sent.
            </p>
          )}
        </form>

        <div className="grid content-start gap-4 sm:grid-cols-2">
          {contactCards.map((card) => {
            const Icon = card.icon
            const inner = (
              <>
                <span className="flex size-10 items-center justify-center rounded-md border border-border bg-secondary/50 text-primary">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {card.label}
                  </span>
                  <span className="block truncate text-foreground">
                    {card.value}
                  </span>
                </span>
              </>
            )
            const className =
              'flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors'
            return card.href ? (
              <a
                key={card.label}
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : undefined}
                rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`${className} hover:border-primary/40`}
              >
                {inner}
              </a>
            ) : (
              <div key={card.label} className={className}>
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
    </div>
  )
}
