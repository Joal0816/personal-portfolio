'use client'

import { useState } from 'react'
import {
  Mail,
  MapPin,
  Phone,
  Check,
  Send,
  ExternalLink,
  Copy,
  CheckCircle2,
  ArrowUpRight,
  RefreshCw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { profile } from '@/lib/portfolio-data'
import { Reveal } from '@/components/reveal'
import { EmailText } from '@/components/text-fixes'
import { cn } from '@/lib/utils'

type TargetChannel = 'both' | 'institutional' | 'personal'
type Errors = Partial<Record<'name' | 'email' | 'subject' | 'message', string>>

export function Contact() {
  const [targetChannel, setTargetChannel] = useState<TargetChannel>('both')
  const [values, setValues] = useState({
    name: '',
    email: '',
    subject: 'Hardware / firmware / edge AI project',
    message: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [lastDispatchedUrl, setLastDispatchedUrl] = useState('')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  function copyText(key: string, text: string) {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  function validate(): Errors {
    const next: Errors = {}
    if (!values.name.trim()) next.name = 'Please add your name.'
    if (!values.email.trim()) {
      next.email = 'Please add an email I can reply to.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'That email address looks incomplete.'
    }
    if (!values.message.trim()) next.message = 'Please write a message.'
    return next
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const subjectStr = values.subject.trim() || `Message from ${values.name}`
    const bodyStr = [
      `From: ${values.name} <${values.email}>`,
      `To: ${targetChannel === 'both' ? 'both inboxes' : targetChannel}`,
      `Sent: ${new Date().toISOString()}`,
      '',
      values.message,
    ].join('\n')

    let mailtoUrl = ''
    if (targetChannel === 'both') {
      mailtoUrl = `mailto:${profile.email}?cc=${profile.personalEmail}&subject=${encodeURIComponent(
        subjectStr
      )}&body=${encodeURIComponent(bodyStr)}`
    } else if (targetChannel === 'personal') {
      mailtoUrl = `mailto:${profile.personalEmail}?subject=${encodeURIComponent(
        subjectStr
      )}&body=${encodeURIComponent(bodyStr)}`
    } else {
      mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
        subjectStr
      )}&body=${encodeURIComponent(bodyStr)}`
    }

    setLastDispatchedUrl(mailtoUrl)
    setSubmitted(true)
    window.location.href = mailtoUrl
  }

  function update(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
    if (submitted) setSubmitted(false)
  }

  return (
    <section id="contact" className="relative border-t border-border">
      <div className="quadrille pointer-events-none absolute inset-0 opacity-45 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]" />

      <div className="relative mx-auto max-w-6xl px-5 pt-14 pb-12 sm:px-8 md:pt-18 md:pb-14">
        <Reveal>
          <h2 className="max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Let&apos;s build something.
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            If you need firmware, an edge-AI model, or a web app that talks to
            hardware — or you just want to say hello — write below. Your mail app
            opens with the message ready to send, and I read everything that
            arrives.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* The reply slip */}
          <Reveal delay={60}>
            <div className="photo-print rounded-[4px] border border-border p-5 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
                <p className="marginalia text-2xl leading-none">drop me a line</p>
                <p className="text-xs text-muted-foreground">
                  usually replies within a day
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                {/* Where it should go */}
                <fieldset>
                  <legend className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Where should this go?
                  </legend>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {[
                      {
                        id: 'both' as const,
                        title: 'Both inboxes',
                        note: 'Recommended',
                        detail: 'School & personal',
                      },
                      {
                        id: 'institutional' as const,
                        title: 'School & research',
                        note: 'MSU-IIT',
                        detail: profile.email,
                      },
                      {
                        id: 'personal' as const,
                        title: 'Personal',
                        note: 'Freelance & direct',
                        detail: profile.personalEmail,
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setTargetChannel(opt.id)}
                        className={cn(
                          'rounded-md border p-3 text-left transition-colors',
                          targetChannel === opt.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-card hover:border-primary/40',
                        )}
                      >
                        <div className="text-[11px] font-medium text-primary">{opt.note}</div>
                        <div className="mt-0.5 text-sm font-semibold">{opt.title}</div>
                        <div className="mt-0.5 text-[10px] leading-snug text-muted-foreground">
                          {opt.detail.includes('@') ? (
                            <EmailText email={opt.detail} />
                          ) : (
                            opt.detail
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <Field label="Your name" error={errors.name} htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={(e) => update('name', e.target.value)}
                    className="min-h-[46px] w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-[15px] text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/25"
                    placeholder="Juan Dela Cruz"
                    aria-invalid={!!errors.name}
                  />
                </Field>

                <Field label="Your email" error={errors.email} htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={(e) => update('email', e.target.value)}
                    className="min-h-[46px] w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-[15px] text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/25"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                  />
                </Field>

                <Field label="Subject" error={errors.subject} htmlFor="subject">
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={values.subject}
                    onChange={(e) => update('subject', e.target.value)}
                    className="min-h-[46px] w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-[15px] text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/25"
                    placeholder="What is this about?"
                  />
                </Field>

                <Field label="Message" error={errors.message} htmlFor="message">
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={(e) => update('message', e.target.value)}
                    className="w-full rounded-md border border-input bg-card px-3.5 py-3 text-[15px] text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/25 resize-none"
                    placeholder="Tell me a little about the project, the hardware, or the idea…"
                    aria-invalid={!!errors.message}
                  />
                </Field>

                {submitted && (
                  <div
                    role="status"
                    className="space-y-3 rounded-md border border-primary/30 bg-primary/10 p-4"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <CheckCircle2 className="size-4 shrink-0" />
                      <span>Your mail app should now be open with this message.</span>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/85">
                      If nothing happened, you can open Gmail instead or copy the
                      message and send it yourself.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <a
                        href={profile.socials.gmailInstitutional}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[36px] items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        <span>Open Gmail</span>
                        <ArrowUpRight className="size-3" />
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          window.location.href = lastDispatchedUrl
                        }}
                        className="inline-flex min-h-[36px] items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs transition-colors hover:border-primary/50 hover:text-primary"
                      >
                        <RefreshCw className="size-3" />
                        <span>Try opening the mail app again</span>
                      </button>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="min-h-[48px] w-full gap-2 rounded-md bg-primary px-5 font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  <Send className="size-4" />
                  <span>Open my mail app and send</span>
                </Button>
              </form>
            </div>
          </Reveal>

          {/* Direct channels */}
          <Reveal delay={120}>
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-xl font-bold tracking-tight">Or reach me directly</h3>
                <p className="marginalia text-xl leading-none">no form needed</p>
              </div>

              {/* Email addresses */}
              <ul className="mt-6 border-t border-border">
                {[
                  {
                    key: 'inst_email',
                    label: 'School email',
                    badge: 'Best for research',
                    value: profile.email,
                    gmail: profile.socials.gmailInstitutional,
                    mail: `mailto:${profile.email}`,
                  },
                  {
                    key: 'pers_email',
                    label: 'Personal email',
                    badge: 'Freelance & everything else',
                    value: profile.personalEmail,
                    gmail: profile.socials.gmailPersonal,
                    mail: `mailto:${profile.personalEmail}`,
                  },
                ].map((row) => (
                  <li key={row.key} className="border-b border-border py-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <span className="text-sm font-semibold">{row.label}</span>
                      <span className="text-xs text-muted-foreground">{row.badge}</span>
                    </div>
                    <a
                      href={row.mail}
                      className="measure mt-1 flex min-h-[44px] items-center text-sm text-foreground transition-colors hover:text-primary"
                    >
                      <EmailText email={row.value} />
                    </a>
                    <div className="mt-2.5 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => copyText(row.key, row.value)}
                        className="inline-flex min-h-[36px] items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                      >
                        {copiedKey === row.key ? (
                          <>
                            <Check className="size-3 text-primary" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      <a
                        href={row.gmail}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[36px] items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                      >
                        <Mail className="size-3" />
                        <span>Open Gmail</span>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Other routes */}
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Phone</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}
                        className="measure inline-flex min-h-[44px] items-center text-sm text-foreground transition-colors hover:text-primary"
                      >
                        {profile.phone}
                      </a>
                      <button
                        type="button"
                        onClick={() => copyText('phone', profile.phone)}
                        aria-label="Copy phone number"
                        className="inline-flex min-h-[32px] items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                      >
                        {copiedKey === 'phone' ? (
                          <Check className="size-3 text-primary" />
                        ) : (
                          <Copy className="size-3" />
                        )}
                      </button>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Based in</p>
                    <p className="text-sm leading-relaxed">
                      {profile.location}
                      <span className="block text-muted-foreground">{profile.address}</span>
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <GithubIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">GitHub</p>
                    <a
                      href={profile.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-1 text-sm transition-colors hover:text-primary"
                    >
                      github.com/Joal0816
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <LinkedinIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">LinkedIn</p>
                    <a
                      href={profile.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-1 text-sm transition-colors hover:text-primary"
                    >
                      in/joseph-alan-vergara
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                </li>
              </ul>

              <p className="marginalia mt-8 text-xl leading-snug">
                open to firmware work, edge-AI projects, research
                collaborations, and full-time roles.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string
  error?: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 gap-3">
        <label htmlFor={htmlFor} className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </label>
        {error && (
          <span role="alert" className="text-xs text-destructive">
            {error}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}
