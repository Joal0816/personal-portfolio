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
  Terminal,
  Radio,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { profile } from '@/lib/portfolio-data'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'
import { cyberAudio } from '@/lib/cyber-sound'

type TargetChannel = 'both' | 'institutional' | 'personal'
type Errors = Partial<Record<'name' | 'email' | 'subject' | 'message', string>>

export function Contact() {
  const [targetChannel, setTargetChannel] = useState<TargetChannel>('both')
  const [values, setValues] = useState({
    name: '',
    email: '',
    subject: 'Hardware Firmware / Edge AI Project Inquiry',
    message: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [lastDispatchedUrl, setLastDispatchedUrl] = useState('')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  function copyText(key: string, text: string) {
    navigator.clipboard.writeText(text)
    cyberAudio.click(0.03)
    setCopiedKey(key)
    setTimeout(() => {
      setCopiedKey(null)
    }, 2000)
  }

  function validate(): Errors {
    const next: Errors = {}
    if (!values.name.trim()) next.name = 'Please enter your name or callsign.'
    if (!values.email.trim()) {
      next.email = 'Please enter your contact email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Please enter a valid email coordinates.'
    }
    if (!values.message.trim()) next.message = 'Please provide message or scope details.'
    return next
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    cyberAudio.click(0.04)

    const subjectStr = values.subject.trim() || `Portfolio Transmission from ${values.name}`
    const bodyStr = [
      `Sender Name / Callsign: ${values.name}`,
      `Sender Contact: ${values.email}`,
      `Routing Channel: ${targetChannel.toUpperCase()}`,
      `Timestamp: ${new Date().toISOString()}`,
      '',
      '--- TRANSMISSION PAYLOAD ---',
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

    // Trigger local client directly via window.location.href
    window.location.href = mailtoUrl
  }

  function update(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
    if (submitted) setSubmitted(false)
  }

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-4 sm:px-6 py-24 md:py-32">
      <Reveal>
        <div className="flex items-center gap-2 font-mono text-xs text-primary mb-3">
          <Terminal className="size-3.5" />
          <span>[SYS_COMMS // 05] DIRECT DISPATCH & TELEMETRY INQUIRY</span>
        </div>
        <h2 className="max-w-2xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
          Let&apos;s Build Hardware & Intelligent Systems.
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-muted-foreground text-sm sm:text-base">
          Looking for low-level firmware engineering (C/C++), FreeRTOS multitasking schedules, TinyML edge vision models, or full-stack IoT telemetry dashboards? Transmit a transmission or connect instantly via direct mail channels.
        </p>
      </Reveal>

      {/* 1-Click Quick Direct Email Access Hub */}
      <Reveal delay={60}>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Institutional Card */}
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 sm:p-5 backdrop-blur-md relative overflow-hidden group hover:border-primary/60 transition-all">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                  <Mail className="size-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-foreground">INSTITUTIONAL (MSU-IIT)</span>
                    <span className="rounded bg-primary/15 px-1.5 py-0.2 font-mono text-[9px] text-primary font-bold">PRIMARY</span>
                  </div>
                  <code className="text-xs sm:text-sm font-mono text-foreground/90 font-semibold block mt-0.5 break-all">
                    {profile.email}
                  </code>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-border/60">
              <button
                type="button"
                onClick={() => copyText('inst_email', profile.email)}
                className="flex items-center gap-1.5 rounded-lg border border-border/80 bg-secondary/50 px-3 py-1.5 font-mono text-xs text-muted-foreground hover:border-primary/50 hover:text-primary transition-all active:scale-95"
              >
                {copiedKey === 'inst_email' ? (
                  <>
                    <Check className="size-3 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>

              <a
                href={profile.socials.gmailInstitutional}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono text-xs text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <span>OPEN GMAIL</span>
                <ArrowUpRight className="size-3" />
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 rounded-lg border border-border/80 bg-secondary/30 px-3 py-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-all"
              >
                <span>MAIL CLIENT</span>
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>

          {/* Personal Card */}
          <div className="rounded-2xl border border-border/80 bg-card/60 p-4 sm:p-5 backdrop-blur-md relative overflow-hidden group hover:border-primary/40 transition-all">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-secondary/60 text-foreground">
                  <Mail className="size-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-foreground">PERSONAL // DIRECT GMAIL</span>
                    <span className="rounded bg-secondary px-1.5 py-0.2 font-mono text-[9px] text-muted-foreground">ALTERNATE</span>
                  </div>
                  <code className="text-xs sm:text-sm font-mono text-foreground/90 font-semibold block mt-0.5 break-all">
                    {profile.personalEmail}
                  </code>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-border/60">
              <button
                type="button"
                onClick={() => copyText('pers_email', profile.personalEmail)}
                className="flex items-center gap-1.5 rounded-lg border border-border/80 bg-secondary/50 px-3 py-1.5 font-mono text-xs text-muted-foreground hover:border-primary/50 hover:text-primary transition-all active:scale-95"
              >
                {copiedKey === 'pers_email' ? (
                  <>
                    <Check className="size-3 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>

              <a
                href={profile.socials.gmailPersonal}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono text-xs text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <span>OPEN GMAIL</span>
                <ArrowUpRight className="size-3" />
              </a>

              <a
                href={`mailto:${profile.personalEmail}`}
                className="flex items-center gap-1.5 rounded-lg border border-border/80 bg-secondary/30 px-3 py-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-all"
              >
                <span>MAIL CLIENT</span>
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-8 sm:gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Contact Form with Direct Mailto Dispatch */}
        <Reveal delay={80}>
          <div className="rounded-2xl border border-border/80 bg-card/60 p-4 sm:p-8 backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-6">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                DIRECT MAILTO DISPATCHER // ZERO-BACKEND
              </span>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                P2P_DIRECT
              </span>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Target Channel Selector */}
              <div>
                <label className="font-mono text-xs text-muted-foreground uppercase mb-2 block">
                  TRANSMISSION DESTINATION ROUTE
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTargetChannel('both')
                      cyberAudio.click(0.02)
                    }}
                    className={cn(
                      'rounded-lg border p-2.5 text-left font-mono text-xs transition-all',
                      targetChannel === 'both'
                        ? 'border-primary bg-primary/15 text-foreground font-bold shadow-sm'
                        : 'border-border/70 bg-secondary/30 text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <div className="text-[10px] text-primary font-bold">RECOMMENDED</div>
                    <div className="mt-0.5 font-semibold">Both (To + CC)</div>
                    <div className="text-[9px] text-muted-foreground truncate">MSU-IIT &amp; Gmail</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTargetChannel('institutional')
                      cyberAudio.click(0.02)
                    }}
                    className={cn(
                      'rounded-lg border p-2.5 text-left font-mono text-xs transition-all',
                      targetChannel === 'institutional'
                        ? 'border-primary bg-primary/15 text-foreground font-bold shadow-sm'
                        : 'border-border/70 bg-secondary/30 text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <div className="text-[10px] text-emerald-400 font-bold">ACADEMIC / R&amp;D</div>
                    <div className="mt-0.5 font-semibold">Institutional</div>
                    <div className="text-[9px] text-muted-foreground truncate">MSU-IIT Google</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTargetChannel('personal')
                      cyberAudio.click(0.02)
                    }}
                    className={cn(
                      'rounded-lg border p-2.5 text-left font-mono text-xs transition-all',
                      targetChannel === 'personal'
                        ? 'border-primary bg-primary/15 text-foreground font-bold shadow-sm'
                        : 'border-border/70 bg-secondary/30 text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <div className="text-[10px] text-cyan-400 font-bold">FREELANCE / DIRECT</div>
                    <div className="mt-0.5 font-semibold">Personal</div>
                    <div className="text-[9px] text-muted-foreground truncate">Personal Gmail</div>
                  </button>
                </div>
              </div>

              {/* Sender Name */}
              <Field label="YOUR NAME / CALLSIGN" error={errors.name} htmlFor="name">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={(e) => update('name', e.target.value)}
                  className="w-full min-h-[44px] rounded-lg border border-input bg-secondary/30 px-3.5 py-2.5 sm:py-3 font-mono text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary focus:ring-2 focus:ring-ring/25"
                  placeholder="e.g. Alex Mercer"
                  aria-invalid={!!errors.name}
                />
              </Field>

              {/* Sender Email */}
              <Field label="YOUR RETURN EMAIL COORDINATES" error={errors.email} htmlFor="email">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="w-full min-h-[44px] rounded-lg border border-input bg-secondary/30 px-3.5 py-2.5 sm:py-3 font-mono text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary focus:ring-2 focus:ring-ring/25"
                  placeholder="alex@domain.tech"
                  aria-invalid={!!errors.email}
                />
              </Field>

              {/* Subject */}
              <Field label="PROJECT OBJECTIVE / SUBJECT" error={errors.subject} htmlFor="subject">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={values.subject}
                  onChange={(e) => update('subject', e.target.value)}
                  className="w-full min-h-[44px] rounded-lg border border-input bg-secondary/30 px-3.5 py-2.5 sm:py-3 font-mono text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary focus:ring-2 focus:ring-ring/25"
                  placeholder="Subject or project scope"
                />
              </Field>

              {/* Message Payload */}
              <Field label="TRANSMISSION / SCOPE DETAILS" error={errors.message} htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={(e) => update('message', e.target.value)}
                  className="w-full rounded-lg border border-input bg-secondary/30 px-3.5 py-3 font-mono text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/40 focus:border-primary focus:ring-2 focus:ring-ring/25 resize-none"
                  placeholder="Details regarding your embedded hardware, FreeRTOS firmware, TinyML edge model, or full-stack telemetry project..."
                  aria-invalid={!!errors.message}
                />
              </Field>

              {/* Dispatched confirmation banner */}
              {submitted && (
                <div
                  role="status"
                  className="space-y-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 font-mono text-xs text-emerald-400"
                >
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
                    <span>MAILTO TRANSMISSION TRIGGERED VIA YOUR DEFAULT CLIENT!</span>
                  </div>
                  <p className="text-[11px] text-foreground/80 leading-relaxed">
                    If your email client didn&apos;t pop up automatically, you can open web Gmail directly or copy your compiled transmission payload below:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href={profile.socials.gmailInstitutional}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded bg-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                    >
                      <span>OPEN IN GMAIL WEB</span>
                      <ArrowUpRight className="size-3" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = lastDispatchedUrl
                      }}
                      className="inline-flex items-center gap-1 rounded border border-emerald-500/30 px-2.5 py-1 text-[11px] text-foreground hover:bg-emerald-500/20 transition-colors"
                    >
                      <RefreshCw className="size-3" />
                      <span>RETRY MAILTO TRIGGER</span>
                    </button>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full min-h-[48px] gap-2 font-mono text-xs sm:text-sm tracking-wider uppercase font-bold bg-primary text-primary-foreground hover:bg-primary/90 justify-center shadow-lg shadow-primary/25"
              >
                <Send className="size-4" />
                <span>OPEN MAIL CLIENT &amp; TRANSMIT</span>
              </Button>
            </form>
          </div>
        </Reveal>

        {/* Telemetry Channel Cards */}
        <Reveal delay={120}>
          <div className="space-y-4">
            <div className="rounded-2xl border border-border/80 bg-card/60 p-4 sm:p-6 backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                  DIRECT_COMMS_CHANNELS
                </span>
                <span className="font-mono text-[10px] text-primary">RESPONSE: &lt; 24H</span>
              </div>

              <div className="space-y-3">
                {/* Mobile Phone */}
                <div className="group flex items-center justify-between rounded-xl border border-border/60 bg-secondary/30 p-3 sm:p-3.5 transition-all hover:border-primary/40 gap-2">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Phone className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[9px] sm:text-[10px] text-muted-foreground uppercase truncate">
                        DIRECT MOBILE // TELECOM
                      </div>
                      <a
                        href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}
                        className="font-mono text-xs font-semibold text-foreground hover:text-primary transition-colors truncate block"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyText('phone', profile.phone)}
                    className={cn(
                      'shrink-0 ml-1.5 sm:ml-2 rounded min-h-[38px] min-w-[38px] sm:min-h-0 sm:min-w-0 px-2.5 py-1.5 font-mono text-[10px] transition-all flex items-center justify-center gap-1 border',
                      copiedKey === 'phone'
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                        : 'border-border/80 bg-secondary/50 text-muted-foreground hover:border-primary/50 hover:text-primary'
                    )}
                    title="Copy phone number"
                  >
                    {copiedKey === 'phone' ? <Check className="size-3" /> : <Copy className="size-3" />}
                  </button>
                </div>

                {/* Base Station */}
                <div className="group flex items-center justify-between rounded-xl border border-border/60 bg-secondary/30 p-3 sm:p-3.5 transition-all hover:border-primary/40 gap-2">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                      <MapPin className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[9px] sm:text-[10px] text-muted-foreground uppercase truncate">
                        BASE STATION LOCATION
                      </div>
                      <div className="font-mono text-xs text-foreground/90 truncate">
                        {profile.location} ({profile.address})
                      </div>
                    </div>
                  </div>
                </div>

                {/* GitHub */}
                <div className="group flex items-center justify-between rounded-xl border border-border/60 bg-secondary/30 p-3 sm:p-3.5 transition-all hover:border-primary/40 gap-2">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <GithubIcon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[9px] sm:text-[10px] text-muted-foreground uppercase truncate">
                        GITHUB REPOSITORIES
                      </div>
                      <a
                        href={profile.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs font-semibold text-foreground hover:text-primary transition-colors truncate block"
                      >
                        github.com/Joal0816
                      </a>
                    </div>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="group flex items-center justify-between rounded-xl border border-border/60 bg-secondary/30 p-3 sm:p-3.5 transition-all hover:border-primary/40 gap-2">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <LinkedinIcon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[9px] sm:text-[10px] text-muted-foreground uppercase truncate">
                        LINKEDIN NETWORK
                      </div>
                      <a
                        href={profile.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs font-semibold text-foreground hover:text-primary transition-colors truncate block"
                      >
                        in/joseph-alan-vergara
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Status Pill */}
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-3.5 sm:p-4 font-mono text-xs text-muted-foreground flex items-center gap-3">
              <Radio className="size-4 text-primary animate-pulse shrink-0" />
              <div>
                <span className="text-foreground font-semibold">COORDINATION READY:</span> Direct client transmission enabled. Open for firmware development, embedded FreeRTOS scheduling, edge AI inference pipelines, and engineering research collaborations.
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
