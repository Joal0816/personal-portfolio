'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowDown, Download, Mail, Gauge, Cpu, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { profile, navLinks } from '@/lib/portfolio-data'
import { HardwarePlayground } from '@/components/hardware-playground'
import { HyphenSafe, EmailText } from '@/components/text-fixes'
import { cn } from '@/lib/utils'

export function Hero() {
  const [activeTab, setActiveTab] = useState<'bench' | 'chips' | 'pipelines'>('bench')

  return (
    <section id="top" className="relative overflow-hidden">
      {/* The open notebook: quadrille paper and the page gutter */}
      <div className="quadrille pointer-events-none absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,color-mix(in_oklch,var(--graphite)_22%,transparent)_0_8px,transparent_8px_16px)] lg:block" />
      {/* Desk lamp light in the dark theme */}
      <div className="lamp-glow pointer-events-none absolute -top-24 right-[8%] size-[36rem] rounded-full opacity-60 blur-3xl [background:radial-gradient(circle,color-mix(in_oklch,var(--foil)_22%,transparent),transparent_68%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pt-24 pb-12 sm:px-8 md:pt-28 lg:pb-16">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* ── Left page: the person ─────────────────────────────────── */}
          <div className="min-w-0">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
              {/* The taped-in photo print */}
              <div className="relative mx-auto w-48 shrink-0 sm:mx-0 sm:w-52 lg:w-44 xl:w-52">
                <div
                  className="animate-settle photo-print relative rounded-[3px] p-2 pb-8"
                  style={{ ['--settle-rotate' as string]: '-1.4deg' }}
                >
                  {/* tape strips */}
                  <span
                    aria-hidden
                    className="animate-tape-flex tape absolute -top-3 left-6 h-6 w-20 rounded-[2px] [transform:rotate(-2deg)]"
                    style={{ ['--tape-rotate' as string]: '-2deg', animationDelay: '260ms' }}
                  />
                  <span
                    aria-hidden
                    className="animate-tape-flex tape absolute -bottom-2 right-4 h-5 w-16 rounded-[2px] [transform:rotate(3deg)]"
                    style={{ ['--tape-rotate' as string]: '3deg', animationDelay: '380ms' }}
                  />
                  <div className="relative overflow-hidden rounded-[2px]">
                    <Image
                      src="/profile.jpg"
                      alt="Joseph Alan B. Vergara in his graduation toga"
                      width={320}
                      height={427}
                      className="aspect-[3/4] w-full object-cover object-[50%_16%]"
                      priority
                    />
                  </div>
                  <p className="marginalia absolute bottom-1.5 left-3 text-lg leading-none">
                    graduation day, MSU-IIT
                  </p>
                </div>
              </div>

              {/* Name, plain sentence, actions */}
              <div className="min-w-0 flex-1">
                <h1 className="text-[clamp(2.5rem,7vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
                  <span className="block">{profile.name}</span>
                  <span className="mt-2 block text-[0.36em] font-semibold uppercase tracking-[0.16em] text-primary dark:text-[oklch(0.72_0.11_28)]">
                    {profile.role}
                  </span>
                </h1>

                <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-foreground/85 sm:text-xl">
                  {profile.tagline}
                </p>
                <p className="marginalia mt-3 max-w-[40ch] text-xl leading-snug">
                  right now: finishing my degree at MSU-IIT and building sensors
                  that watch, measure, and act on their own.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-2.5">
                  <Button
                    render={<a href="#projects" />}
                    nativeButton={false}
                    size="lg"
                    className="min-h-[46px] gap-2 rounded-md bg-primary px-5 text-primary-foreground font-semibold hover:bg-primary/90"
                  >
                    <span>See the work</span>
                    <ArrowDown className="size-4" />
                  </Button>
                  <Button
                    render={<a href="#contact" />}
                    nativeButton={false}
                    size="lg"
                    variant="outline"
                    className="min-h-[46px] rounded-md px-5 font-semibold"
                  >
                    Get in touch
                  </Button>
                  <Button
                    render={<a href="/resume.pdf" download />}
                    nativeButton={false}
                    size="lg"
                    variant="ghost"
                    className="min-h-[46px] gap-2 rounded-md px-4 text-muted-foreground hover:text-primary"
                  >
                    <Download className="size-4" />
                    Résumé (PDF)
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                  <SocialLink href={profile.socials.github} label="GitHub">
                    <GithubIcon className="size-4" />
                    <span>GitHub</span>
                  </SocialLink>
                  <SocialLink href={profile.socials.linkedin} label="LinkedIn">
                    <LinkedinIcon className="size-4" />
                    <span>LinkedIn</span>
                  </SocialLink>
                  <SocialLink href={profile.socials.email} label="Email">
                    <Mail className="size-4" />
                    <EmailText email={profile.email} />
                  </SocialLink>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right page: the desk ──────────────────────────────────── */}
          <div className="min-w-0 lg:pt-2">
            {/* Taped index card: what I'm working on now */}
            <div className="animate-settle-soft relative">
              <span
                aria-hidden
                className="tape absolute -top-2.5 right-10 h-5 w-20 rounded-[2px] [transform:rotate(2deg)]"
              />
              <div className="rounded-[4px] border border-border bg-card p-5 shadow-page sm:p-6">
                <p className="marginalia text-2xl leading-none">what I&apos;m working on now</p>
                <ul className="mt-4 space-y-3.5">
                  {[
                    {
                      title: 'Thermal fever watch for livestock',
                      note: 'O.I.N.K. — an infrared array on an ESP32, streaming to a live dashboard.',
                    },
                    {
                      title: 'Turning panic calls into dispatch data',
                      note: 'Agap AI — built at the IEEE Sumpai Hackathon 2026.',
                    },
                    {
                      title: 'Automated lab scoring on a microcontroller',
                      note: 'Research collaboration — the ESP32-P4 grades the bench itself.',
                    },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <span aria-hidden className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-primary" />
                      <div className="min-w-0">
                        <p className="text-[15px] font-semibold leading-snug">{item.title}</p>
                        <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">
                          {item.note}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Divider tabs */}
            <nav aria-label="Page sections" className="mt-8">
              <p className="marginalia mb-2 text-xl leading-none">tabs</p>
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group flex items-center justify-between rounded-md border-b border-border py-2.5 pr-1 text-[15px] text-foreground/85 transition-colors hover:text-primary"
                    >
                      <span className="pencil-underline">{link.label}</span>
                      <span className="measure text-[11px] text-muted-foreground">{link.href}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* The cats, taped in */}
            <div className="animate-settle-soft mt-8 flex items-start gap-4">
              <div className="photo-print relative shrink-0 rounded-[3px] p-2 pb-8 [transform:rotate(1.5deg)]">
                <span
                  aria-hidden
                  className="tape absolute -top-2 left-4 h-4 w-12 rounded-[2px] [transform:rotate(-3deg)]"
                />
                <div className="flex items-start gap-1">
                  <img
                    src="/companion/cat-orange.png"
                    alt="Rera, an orange cat, as a brick mosaic"
                    className="h-20 w-36 rounded-[2px] object-cover"
                  />
                  <img
                    src="/companion/cat-tabby.png"
                    alt="Area, a tabby cat, as a brick mosaic"
                    className="h-20 w-14 rounded-[2px] object-cover object-[50%_28%]"
                  />
                </div>
                <p className="marginalia absolute bottom-1 left-3 text-lg leading-none">
                  Rera &amp; Area
                </p>
              </div>
              <p className="marginalia pt-2 text-xl leading-snug">
                my two supervisors.
                <br />
                they answer in the chat.
              </p>
            </div>
          </div>
        </div>

        {/* ── The bench: fold-out page ───────────────────────────────── */}
        <div id="telemetry" className="mt-14 scroll-mt-24 lg:mt-20">
          <div className="flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                The bench: what I build on and with.
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Boards, chips, and edge-AI pipelines from real projects — plus a
                little sandbox you can poke&nbsp;at.
              </p>
            </div>

            <div className="w-full rounded-md border border-border bg-card p-1 md:w-auto">
              <div
                className="scroll-strip flex"
                role="tablist"
                aria-label="Bench views"
              >
              {[
                { id: 'bench', label: 'Play with the board', icon: Gauge },
                { id: 'chips', label: 'The chips I work on', icon: Cpu },
                { id: 'pipelines', label: 'Edge AI pipelines', icon: Sparkles },
              ].map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={cn(
                      'flex min-h-[40px] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded px-3 py-2 text-[13px] transition-colors md:flex-none',
                      isActive
                        ? 'bg-primary font-semibold text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <Icon className="size-3.5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
              </div>
            </div>
          </div>

          <div className="mt-8">
            {activeTab === 'bench' && <HardwarePlayground />}

            {activeTab === 'chips' && (
              <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    name: 'STM32 (ARM Cortex-M3)',
                    clock: '72 MHz',
                    note: 'FreeRTOS five-task kernel',
                    detail: 'Blue Pill · DMA · I2C/SPI',
                  },
                  {
                    name: 'ESP32 / ESP32-P4',
                    clock: '240 MHz',
                    note: 'Dual-core RISC-V / Xtensa',
                    detail: 'Thermal telemetry · edge web',
                  },
                  {
                    name: 'Renesas RA6M3',
                    clock: '120 MHz',
                    note: 'RT-Thread RTOS + LVGL',
                    detail: 'On-metal graphics · 60 FPS',
                  },
                  {
                    name: 'AVR ATmega328P / 8051',
                    clock: '16 MHz',
                    note: 'Low-level assembly & C',
                    detail: 'PWM timers · direct port I/O',
                  },
                ].map((chip) => (
                  <div key={chip.name} className="bg-card p-5">
                    <div className="measure text-xs text-muted-foreground">{chip.clock}</div>
                    <div className="mt-1.5 text-[15px] font-semibold leading-snug">
                      <HyphenSafe text={chip.name} />
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      <HyphenSafe text={chip.note} />
                    </div>
                    <div className="mt-3 text-xs text-primary">{chip.detail}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'pipelines' && (
              <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
                {[
                  {
                    model: 'YOLOv8n microplastic detection',
                    figure: '22 ms per frame',
                    note: 'A quantized model that counts particles on the phone itself, with no cloud round trip.',
                    tags: 'TFLite · Edge Impulse',
                  },
                  {
                    model: 'ARUGA fall & inactivity engine',
                    figure: '30 FPS real time',
                    note: 'Reads 33 body points from a camera and judges a fall from angles and speed alone.',
                    tags: 'MediaPipe · OpenCV',
                  },
                  {
                    model: 'O.I.N.K. thermal stream',
                    figure: '8 Hz stream',
                    note: 'A 768-pixel infrared array over Wi-Fi, with fever thresholds that fire on their own.',
                    tags: 'MLX90640 · Flutter',
                  },
                ].map((pipe) => (
                  <div key={pipe.model} className="bg-card p-5">
                    <div className="measure text-xs text-primary">{pipe.figure}</div>
                    <div className="mt-1.5 text-[15px] font-semibold leading-snug">{pipe.model}</div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{pipe.note}</p>
                    <div className="mt-3 text-xs text-muted-foreground">{pipe.tags}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="marginalia mt-6 text-xl leading-snug">
            every number here is measured on real hardware — the same figures
            appear in the project write-ups below.
          </p>
        </div>
      </div>
    </section>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={label}
      className="inline-flex min-h-[44px] items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
    >
      {children}
    </a>
  )
}
