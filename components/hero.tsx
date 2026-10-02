'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ArrowDown,
  Download,
  Mail,
  Cpu,
  Activity,
  Zap,
  Radio,
  Terminal as TerminalIcon,
  Layers,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { profile } from '@/lib/portfolio-data'
import { HardwarePlayground } from '@/components/hardware-playground'
import { cn } from '@/lib/utils'

export function Hero() {
  const [activeTelemetryTab, setActiveTelemetryTab] = useState<'interactive' | 'specs' | 'pipeline'>('interactive')

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center justify-center overflow-hidden pt-20 pb-16 md:py-24"
    >
      {/* Background Matrix & Lighting */}
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className="tech-dots pointer-events-none absolute inset-0 opacity-20" />
      <div className="scanline-overlay pointer-events-none" />

      {/* Cyber Luminous Glows */}
      <div
        className="pointer-events-none absolute -top-48 right-0 size-[38rem] rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--color-primary), transparent 65%)',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-48 -left-32 size-[32rem] rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, var(--color-primary), transparent 70%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col-reverse gap-10 lg:flex-row lg:items-center lg:gap-14">
          {/* Main Column */}
          <div className="flex-1 max-w-3xl">
            {/* Top Status HUD Badge */}
            <div className="animate-fade-up mb-4 sm:mb-5 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 sm:px-3.5 py-1.5 font-mono text-xs text-foreground/90 backdrop-blur-md shadow-[0_0_15px_-3px_color-mix(in_oklch,var(--primary)_25%,transparent)] transition-all">
              <span className="relative flex size-2.5 items-center justify-center">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="status-beacon relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-primary font-bold tracking-wider">STATUS:</span>
              <span className="font-mono text-muted-foreground">{profile.status}</span>
              <span className="hidden sm:inline-block text-border/80">•</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-primary/80 font-mono">
                <Activity className="size-3 animate-pulse" />
                <span>SYS_ONLINE</span>
              </span>
            </div>

            {/* Main Headline */}
            <div className="animate-fade-up space-y-2" style={{ animationDelay: '80ms' }}>
              <h1 className="text-balance text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12] sm:leading-[1.08] break-words">
                <span>{profile.name}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-emerald-400">
                  {profile.role}
                </span>
              </h1>
              <p className="font-mono text-xs sm:text-sm tracking-widest text-primary/80 uppercase">
                {profile.subRole}
              </p>
            </div>

            {/* Intro paragraph */}
            <p
              className="animate-fade-up mt-4 sm:mt-5 max-w-2xl text-pretty text-sm sm:text-lg leading-relaxed text-muted-foreground"
              style={{ animationDelay: '160ms' }}
            >
              {profile.tagline}{' '}
              <span className="text-foreground/85">
                Specialized in FreeRTOS multithreading, STM32 & ESP32 bare metal, TinyML edge computer vision, and real-time sensor telemetry.
              </span>
            </p>

            {/* CTA action cluster */}
            <div
              className="animate-fade-up mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3"
              style={{ animationDelay: '240ms' }}
            >
              <Button
                render={<a href="#projects" />}
                nativeButton={false}
                size="lg"
                className="cyber-sheen w-full sm:w-auto min-h-[44px] gap-2 font-mono text-xs sm:text-sm tracking-wider uppercase bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:shadow-primary/35 transition-all justify-center"
              >
                <span>View Projects</span>
                <ArrowDown className="size-4" />
              </Button>

              <Button
                render={<a href="#contact" />}
                nativeButton={false}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto min-h-[44px] font-mono text-xs sm:text-sm tracking-wider uppercase border-border/80 hover:border-primary/60 hover:bg-secondary/40 justify-center"
              >
                Get In Touch
              </Button>

              <Button
                render={<a href="/resume.pdf" download />}
                nativeButton={false}
                size="lg"
                variant="ghost"
                className="w-full sm:w-auto min-h-[44px] gap-2 font-mono text-xs sm:text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 justify-center"
              >
                <Download className="size-4" />
                Resume PDF
              </Button>
            </div>

            {/* Social channels with telemetry micro-labels */}
            <div
              className="animate-fade-up mt-6 sm:mt-8 flex flex-wrap items-center gap-2 sm:gap-3"
              style={{ animationDelay: '300ms' }}
            >
              <SocialLink href={profile.socials.github} label="GitHub">
                <GithubIcon className="size-4" />
                <span className="text-xs font-mono">GitHub</span>
              </SocialLink>
              <SocialLink href={profile.socials.linkedin} label="LinkedIn">
                <LinkedinIcon className="size-4" />
                <span className="text-xs font-mono">LinkedIn</span>
              </SocialLink>
              <SocialLink href={profile.socials.email} label="Email">
                <Mail className="size-4" />
                <span className="text-xs font-mono">Email</span>
              </SocialLink>
            </div>
          </div>

          {/* Right Column: HUD Profile Chassis & Live Silicon Specs */}
          <div
            className="animate-fade-up flex flex-col items-center lg:items-end shrink-0 max-w-full px-2 sm:px-0"
            style={{ animationDelay: '200ms' }}
          >
            {/* Tech Frame with Corner Brackets & Hover Laser Beam */}
            <div className="relative group max-w-full hud-bracket-expand">
              {/* Outer decorative cyber chassis */}
              <div className="absolute -inset-2.5 rounded-2xl border border-primary/20 bg-primary/5 -z-10 group-hover:border-primary/50 group-hover:shadow-[0_0_25px_-5px_color-mix(in_oklch,var(--primary)_30%,transparent)] transition-all duration-300" />

              {/* Radar sweep background accent */}
              <div className="pointer-events-none absolute -inset-6 -z-20 overflow-hidden rounded-full opacity-20 group-hover:opacity-35 transition-opacity">
                <div className="size-full radar-sweep-cone" />
              </div>

              {/* Top coordinates label */}
              <div className="absolute -top-6 left-1 flex items-center gap-1.5 text-[9px] font-mono text-muted-foreground truncate max-w-full">
                <Radio className="size-3 text-primary animate-pulse shrink-0" />
                <span className="truncate">ILIGAN CITY // 8.2280° N, 124.2452° E</span>
              </div>

              {/* Image Container with Laser Beam on Hover */}
              <div className="relative size-56 sm:size-72 max-w-[calc(100vw-3.5rem)] overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
                <div className="card-laser-beam" />
                <Image
                  src="/profile.jpg"
                  alt="Joseph Alan B. Vergara"
                  width={320}
                  height={320}
                  className="h-full w-full object-cover grayscale-[25%] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                  priority
                />

                {/* Overlaid scanline and corner HUD elements */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2 left-2 right-2 rounded bg-background/90 px-2.5 py-1.5 backdrop-blur-md border border-border/80 text-[11px] font-mono flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-foreground">
                    <Zap className="size-3 text-primary animate-pulse" />
                    <span>CGPA: {profile.telemetry.cgpa}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold">SENIOR</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Telemetry & Hardware Matrix Banner */}
        <div
          id="telemetry"
          className="animate-fade-up mt-14 rounded-2xl border border-border/80 bg-card/60 p-4 sm:p-6 backdrop-blur-xl shadow-xl"
          style={{ animationDelay: '360ms' }}
        >
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-border/60">
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 shrink-0 items-center justify-center rounded bg-primary/10 text-primary border border-primary/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                <TerminalIcon className="size-3.5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-mono font-bold tracking-wider text-foreground uppercase">
                    SYSTEM_TELEMETRY // HARDWARE & STACK SPECIFICATION
                  </h3>
                  {/* Animated Oscilloscope / Digital Logic Indicator */}
                  <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 border border-primary/30 shadow-inner">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <svg className="w-16 h-3.5 text-primary" viewBox="0 0 64 14" fill="none">
                      <path
                        d="M0 7 H12 L16 1 L20 13 L24 7 H36 L40 2 L44 12 L48 7 H64"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="[stroke-dasharray:120] [stroke-dashoffset:120] animate-[waveform-flow_3s_linear_infinite]"
                      />
                    </svg>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold">10 kHz</span>
                  </div>
                </div>
                <p className="text-[11px] font-mono text-muted-foreground">
                  Target Architectures, Deterministic Kernels & Edge Accelerators
                </p>
              </div>
            </div>

            {/* Toggle tabs */}
            <div className="grid grid-cols-3 sm:flex items-center rounded-lg border border-border bg-secondary/50 p-1 font-mono text-xs w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTelemetryTab('interactive')}
                className={cn(
                  'rounded px-2.5 sm:px-3 py-2 sm:py-1 min-h-[36px] sm:min-h-0 text-center transition-all',
                  activeTelemetryTab === 'interactive'
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                INTERACTIVE RIG
              </button>
              <button
                type="button"
                onClick={() => setActiveTelemetryTab('specs')}
                className={cn(
                  'rounded px-2.5 sm:px-3 py-2 sm:py-1 min-h-[36px] sm:min-h-0 text-center transition-all',
                  activeTelemetryTab === 'specs'
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                ARCHITECTURES
              </button>
              <button
                type="button"
                onClick={() => setActiveTelemetryTab('pipeline')}
                className={cn(
                  'rounded px-2.5 sm:px-3 py-2 sm:py-1 min-h-[36px] sm:min-h-0 text-center transition-all',
                  activeTelemetryTab === 'pipeline'
                    ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                EDGE PIPELINES
              </button>
            </div>
          </div>

          {/* Tab content */}
          {activeTelemetryTab === 'interactive' ? (
            <div className="mt-4">
              <HardwarePlayground />
            </div>
          ) : activeTelemetryTab === 'specs' ? (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
              {/* Architecture 1 */}
              <div className="rounded-lg border border-border/60 bg-secondary/30 p-3 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between text-muted-foreground text-[10px]">
                  <span>SILICON_01</span>
                  <span className="text-emerald-400">72 MHz</span>
                </div>
                <div className="mt-1 font-bold text-foreground">STM32 (ARM Cortex-M3)</div>
                <div className="mt-1 text-[11px] text-muted-foreground">FreeRTOS 5-Task Kernel</div>
                <div className="mt-2 inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[9px] text-primary">
                  Blue Pill • DMA • I2C/SPI
                </div>
              </div>

              {/* Architecture 2 */}
              <div className="rounded-lg border border-border/60 bg-secondary/30 p-3 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between text-muted-foreground text-[10px]">
                  <span>SILICON_02</span>
                  <span className="text-emerald-400">240 MHz</span>
                </div>
                <div className="mt-1 font-bold text-foreground">ESP32 / ESP32-P4</div>
                <div className="mt-1 text-[11px] text-muted-foreground">Dual-Core RISC-V / Xtensa</div>
                <div className="mt-2 inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[9px] text-primary">
                  Thermal Telemetry • Edge Web
                </div>
              </div>

              {/* Architecture 3 */}
              <div className="rounded-lg border border-border/60 bg-secondary/30 p-3 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between text-muted-foreground text-[10px]">
                  <span>SILICON_03</span>
                  <span className="text-emerald-400">120 MHz</span>
                </div>
                <div className="mt-1 font-bold text-foreground">Renesas RA6M3</div>
                <div className="mt-1 text-[11px] text-muted-foreground">RT-Thread RTOS + LVGL</div>
                <div className="mt-2 inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[9px] text-primary">
                  Bare-Metal HMI • 60 FPS
                </div>
              </div>

              {/* Architecture 4 */}
              <div className="rounded-lg border border-border/60 bg-secondary/30 p-3 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between text-muted-foreground text-[10px]">
                  <span>SILICON_04</span>
                  <span className="text-emerald-400">16 MHz</span>
                </div>
                <div className="mt-1 font-bold text-foreground">AVR ATmega328P / 8051</div>
                <div className="mt-1 text-[11px] text-muted-foreground">Low-Level Assembly & C</div>
                <div className="mt-2 inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[9px] text-primary">
                  PWM Timers • Direct Port IO
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
              {/* Pipeline 1 */}
              <div className="rounded-lg border border-border/60 bg-secondary/30 p-3 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between text-muted-foreground text-[10px]">
                  <span>CV_MODEL // 01</span>
                  <span className="text-emerald-400 font-bold">22ms LATENCY</span>
                </div>
                <div className="mt-1 font-bold text-foreground">YOLOv8n Microplastic Detection</div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  INT8 quantized neural inference on mobile Android/iOS without cloud roundtrips.
                </p>
                <div className="mt-2 flex gap-1.5">
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] text-primary">TFLite</span>
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] text-primary">Edge Impulse</span>
                </div>
              </div>

              {/* Pipeline 2 */}
              <div className="rounded-lg border border-border/60 bg-secondary/30 p-3 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between text-muted-foreground text-[10px]">
                  <span>CV_MODEL // 02</span>
                  <span className="text-emerald-400 font-bold">30 FPS REAL-TIME</span>
                </div>
                <div className="mt-1 font-bold text-foreground">ARUGA 33-pt Kinematic Fall Engine</div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Zero-dataset biomechanical vectors tracking spine inclination and vertical drop velocity.
                </p>
                <div className="mt-2 flex gap-1.5">
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] text-primary">MediaPipe</span>
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] text-primary">OpenCV</span>
                </div>
              </div>

              {/* Pipeline 3 */}
              <div className="rounded-lg border border-border/60 bg-secondary/30 p-3 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between text-muted-foreground text-[10px]">
                  <span>THERMAL_STREAM // 03</span>
                  <span className="text-emerald-400 font-bold">8 Hz STREAM</span>
                </div>
                <div className="mt-1 font-bold text-foreground">O.I.N.K. Swine Febrile Telemetry</div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  MLX90640 768-pixel thermal arrays over ESP32 Wi-Fi with automated fever thresholds.
                </p>
                <div className="mt-2 flex gap-1.5">
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] text-primary">MLX90640</span>
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] text-primary">Flutter Web</span>
                </div>
              </div>
            </div>
          )}
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
      className="inline-flex min-h-[44px] items-center gap-2 rounded border border-border/80 bg-secondary/40 px-3.5 py-2 text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10 hover:text-primary hover:shadow-lg hover:shadow-primary/10 active:scale-95"
    >
      {children}
    </a>
  )
}
