'use client'

import { useState } from 'react'
import { Mail, MapPin, Phone, Check, Send, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { profile } from '@/lib/portfolio-data'
import { Reveal } from '@/components/reveal'

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
    if (Object.keys(next).length > 0) return

    // Build mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${values.name}`)
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`
    )
    const mailtoUrl = `mailto:${profile.email}?subject=${subject}&body=${body}`

    // Open mail client
    window.location.href = mailtoUrl

    setSubmitted(true)
    setValues({ name: '', email: '', message: '' })
  }

  function update(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
    if (submitted) setSubmitted(false)
  }

  const contactCards = [
    { icon: Mail, label: 'Email', value: profile.email, href: profile.socials.email },
    { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: 'Location', value: profile.address },
    { icon: GithubIcon, label: 'GitHub', value: 'View profile', href: profile.socials.github },
    { icon: LinkedinIcon, label: 'LinkedIn', value: 'View profile', href: profile.socials.linkedin },
  ]

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <p className="mb-3 font-mono text-sm text-primary">04 / Contact</p>
        <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Let&apos;s build something together.
        </h2>
        <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
          Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          Fill out the form below or reach out through any of the channels.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <Reveal delay={80}>
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <Field label="Name" error={errors.name} htmlFor="name">
              <input
                id="name"
                name="name"
                type="text"
                value={values.name}
                onChange={(e) => update('name', e.target.value)}
                className="w-full rounded-lg border border-input bg-secondary/30 px-4 py-3 text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-ring/30"
                placeholder="Your name"
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
                className="w-full rounded-lg border border-input bg-secondary/30 px-4 py-3 text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-ring/30"
                placeholder="you@example.com"
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
                className="w-full resize-none rounded-lg border border-input bg-secondary/30 px-4 py-3 text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-ring/30"
                placeholder="Tell me about your project..."
                aria-invalid={!!errors.message}
              />
            </Field>

            <Button type="submit" size="lg" className="gap-2">
              <Send className="size-4" />
              Send Message
            </Button>

            {submitted && (
              <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 font-mono text-sm text-emerald-500">
                <Check className="size-4" />
                Opening your email client... Thanks!
              </div>
            )}
          </form>
        </Reveal>

        <Reveal delay={120}>
          <div className="grid content-start gap-4 sm:grid-cols-2">
            {contactCards.map((card) => {
              const Icon = card.icon
              const inner = (
                <>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary/50 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {card.label}
                    </span>
                    <span className="block text-sm text-foreground">
                      {card.value}
                    </span>
                  </span>
                </>
              )
              const baseClass =
                'group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-200'
              return card.href ? (
                <a
                  key={card.label}
                  href={card.href}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`${baseClass} hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5`}
                >
                  {inner}
                  <ExternalLink className="ml-auto size-3.5 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-primary" />
                </a>
              ) : (
                <div key={card.label} className={baseClass}>
                  {inner}
                </div>
              )
            })}
          </div>
        </Reveal>
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
      {error && (
        <p className="mt-1.5 text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
