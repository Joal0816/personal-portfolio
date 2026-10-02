'use client'

import { useState } from 'react'
import {
  Mail,
  MapPin,
  Phone,
  Check,
  Send,
  ExternalLink,
  Loader2,
  Copy,
  Terminal,
  Radio,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { profile } from '@/lib/portfolio-data'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

type Errors = Partial<Record<'name' | 'email' | 'message', string>>

export function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  function copyText(key: string, text: string) {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => {
      setCopiedKey(null)
    }, 2000)
  }

  function validate(): Errors {
    const next: Errors = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!values.email.trim()) {
      next.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Please enter a valid email address.'
    }
    if (!values.message.trim()) next.message = 'Please provide a project description or message.'
    return next
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
        setValues({ name: '', email: '', message: '' })
      } else {
        fallbackMailto()
      }
    } catch {
      fallbackMailto()
    } finally {
      setSending(false)
    }
  }

  function fallbackMailto() {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${values.name}`)
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
    setValues({ name: '', email: '', message: '' })
  }

  function update(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
    if (submitted) setSubmitted(false)
  }

  const channels = [
    {
      key: 'email',
      icon: Mail,
      label: 'EMAIL ADDRESS',
      value: profile.email,
      copyable: true,
      href: `mailto:${profile.email}`,
    },
    {
      key: 'phone',
      icon: Phone,
      label: 'DIRECT MOBILE',
      value: profile.phone,
      copyable: true,
      href: `tel:${profile.phone.replace(/[^0-9+]/g, '')}`,
    },
    {
      key: 'location',
      icon: MapPin,
      label: 'BASE STATION',
      value: `${profile.location} (${profile.address})`,
      copyable: false,
    },
    {
      key: 'github',
      icon: GithubIcon,
      label: 'GITHUB REPOSITORIES',
      value: 'github.com/Joal0816',
      href: profile.socials.github,
      copyable: false,
    },
    {
      key: 'linkedin',
      icon: LinkedinIcon,
      label: 'LINKEDIN NETWORK',
      value: 'in/joseph-alan-vergara',
      href: profile.socials.linkedin,
      copyable: false,
    },
  ]

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-4 sm:px-6 py-24 md:py-32">
      <Reveal>
        <div className="flex items-center gap-2 font-mono text-xs text-primary mb-3">
          <Terminal className="size-3.5" />
          <span>[SYS_COMMS // 05] INITIATE CONTACT / DISPATCH</span>
        </div>
        <h2 className="max-w-2xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
          Let&apos;s Build Hardware & Intelligent Systems.
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-muted-foreground text-sm sm:text-base">
          Looking for low-level firmware architecture, RTOS task synchronization, TinyML deployment on edge devices, or full-stack telemetry dashboards? Send a transmission or connect directly.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Contact Form */}
        <Reveal delay={80}>
          <div className="rounded-2xl border border-border/80 bg-card/60 p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-6">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                MESSAGE_PAYLOAD // FORM
              </span>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                DISPATCH_ACTIVE
              </span>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <Field label="YOUR NAME / CALLSIGN" error={errors.name} htmlFor="name">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={(e) => update('name', e.target.value)}
                  className="w-full rounded-lg border border-input bg-secondary/30 px-4 py-3 font-mono text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary focus:ring-2 focus:ring-ring/25"
                  placeholder="e.g. Alex Mercer"
                  aria-invalid={!!errors.name}
                />
              </Field>

              <Field label="EMAIL COORDINATES" error={errors.email} htmlFor="email">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="w-full rounded-lg border border-input bg-secondary/30 px-4 py-3 font-mono text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary focus:ring-2 focus:ring-ring/25"
                  placeholder="alex@domain.tech"
                  aria-invalid={!!errors.email}
                />
              </Field>

              <Field label="TRANSMISSION / SCOPE DETAILS" error={errors.message} htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={(e) => update('message', e.target.value)}
                  className="w-full rounded-lg border border-input bg-secondary/30 px-4 py-3 font-mono text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary focus:ring-2 focus:ring-ring/25 resize-none"
                  placeholder="Details regarding your embedded hardware, RTOS scheduling, or full-stack telemetry project..."
                  aria-invalid={!!errors.message}
                />
              </Field>

              {submitted && (
                <div
                  role="status"
                  className="flex items-center gap-2.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3.5 font-mono text-xs text-emerald-400"
                >
                  <CheckCircle2 className="size-4 shrink-0" />
                  <span>TRANSMISSION_DELIVERED. Thank you — I will respond promptly!</span>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={sending}
                className="w-full gap-2 font-mono text-xs tracking-wider uppercase font-bold bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {sending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    TRANSMITTING...
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    TRANSMIT MESSAGE
                  </>
                )}
              </Button>
            </form>
          </div>
        </Reveal>

        {/* Telemetry Channel Cards */}
        <Reveal delay={120}>
          <div className="space-y-4">
            <div className="rounded-2xl border border-border/80 bg-card/60 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                  DIRECT_COMMS_CHANNELS
                </span>
                <span className="font-mono text-[10px] text-primary">RESPONSE: &lt; 24H</span>
              </div>

              <div className="space-y-3">
                {channels.map((ch) => {
                  const Icon = ch.icon
                  const isCopied = copiedKey === ch.key

                  return (
                    <div
                      key={ch.key}
                      className="group flex items-center justify-between rounded-xl border border-border/60 bg-secondary/30 p-3.5 transition-all hover:border-primary/40"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Icon className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-mono text-[10px] text-muted-foreground uppercase">
                            {ch.label}
                          </div>
                          {ch.href ? (
                            <a
                              href={ch.href}
                              target={ch.href.startsWith('http') ? '_blank' : undefined}
                              rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="font-mono text-xs font-semibold text-foreground hover:text-primary transition-colors truncate block"
                            >
                              {ch.value}
                            </a>
                          ) : (
                            <div className="font-mono text-xs text-foreground/90 truncate">
                              {ch.value}
                            </div>
                          )}
                        </div>
                      </div>

                      {ch.copyable && (
                        <button
                          type="button"
                          onClick={() => copyText(ch.key, ch.value)}
                          className={cn(
                            'shrink-0 ml-2 rounded p-1.5 font-mono text-[10px] transition-all flex items-center gap-1 border',
                            isCopied
                              ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                              : 'border-border/80 bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:text-primary'
                          )}
                          title="Copy to clipboard"
                        >
                          {isCopied ? (
                            <>
                              <Check className="size-3" />
                              <span>COPIED</span>
                            </>
                          ) : (
                            <>
                              <Copy className="size-3" />
                              <span className="hidden sm:inline">COPY</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Quick Status Pill */}
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 font-mono text-xs text-muted-foreground flex items-center gap-3">
              <Radio className="size-4 text-primary animate-pulse shrink-0" />
              <div>
                <span className="text-foreground font-semibold">COORDINATION READY:</span> Open for freelance engineering, firmware development, edge AI integration, and technical research roles.
              </div>
            </div>
          </div>
        </Reveal>
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
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={htmlFor} className="font-mono text-xs text-muted-foreground uppercase">
          {label}
        </label>
        {error && (
          <span className="font-mono text-[11px] text-destructive font-medium">
            {error}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}
