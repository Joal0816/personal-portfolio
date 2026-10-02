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
import { cn } from '@/lib/utils'

export function Hero() {
  const [activeTelemetryTab, setActiveTelemetryTab] = useState<'specs' | 'pipeline'>('specs')

  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center justify-center overflow-hidden pt-20 pb-16 md:py-24"
    >
      {/* Background Matrix & Lighting */}
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className="tech-dots pointer-events-none absolute inset-0 opacity-20" />

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
            <div className="animate-fade-up mb-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 font-mono text-xs text-foreground/90 backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-primary font-bold">STATUS:</span>
              <span className="font-mono text-muted-foreground">{profile.status}</span>
            </div>

            {/* Main Headline */}
            <div className="animate-fade-up space-y-2" style={{ animationDelay: '80ms' }}>
              <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-6xl leading-[1.08]">
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
              className="animate-fade-up mt-5 max-w-2xl text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground"
              style={{ animationDelay: '160ms' }}
            >
              {profile.tagline}{' '}
              <span className="text-foreground/85">
                Specialized in FreeRTOS multithreading, STM32 & ESP32 bare metal, TinyML edge computer vision, and real-time sensor telemetry.
              </span>
            </p>

            {/* CTA action cluster */}
            <div
              className="animate-fade-up mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: '240ms' }}
            >
              <Button
                render={<a href="#projects" />}
                nativeButton={false}
                size="lg"
                className="gap-2 font-mono text-xs sm:text-sm tracking-wider uppercase bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:shadow-primary/35 transition-all"
              >
                <span>View Projects</span>
                <ArrowDown className="size-4" />
              </Button>

              <Button
                render={<a href="#contact" />}
                nativeButton={false}
                size="lg"
                variant="outline"
                className="font-mono text-xs sm:text-sm tracking-wider uppercase border-border/80 hover:border-primary/60 hover:bg-secondary/40"
              >
                Get In Touch
              </Button>

              <Button
                render={<a href="/resume.pdf" download />}
                nativeButton={false}
                size="lg"
                variant="ghost"
                className="gap-2 font-mono text-xs sm:text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20"
              >
                <Download className="size-4" />
                Resume PDF
              </Button>
            </div>

            {/* Social channels with telemetry micro-labels */}
            <div
              className="animate-fade-up mt-8 flex items-center gap-3"
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
            className="animate-fade-up flex flex-col items-center lg:items-end shrink-0"
            style={{ animationDelay: '200ms' }}
          >
            {/* Tech Frame with Corner Brackets */}
            <div className="relative group">
              {/* Outer decorative cyber chassis */}
              <div className="absolute -inset-2.5 rounded-2xl border border-primary/20 bg-primary/5 -z-10 group-hover:border-primary/40 transition-colors" />

              {/* Corner tech tick marks */}
              <div className="absolute -top-1.5 -left-1.5 size-3 border-t-2 border-l-2 border-primary" />
              <div className="absolute -top-1.5 -right-1.5 size-3 border-t-2 border-r-2 border-primary" />
              <div className="absolute -bottom-1.5 -left-1.5 size-3 border-b-2 border-l-2 border-primary" />
              <div className="absolute -bottom-1.5 -right-1.5 size-3 border-b-2 border-r-2 border-primary" />

              {/* Top coordinates label */}
              <div className="absolute -top-6 left-1 flex items-center gap-1.5 text-[9px] font-mono text-muted-foreground">
                <Radio className="size-3 text-primary animate-pulse" />
                <span>ILIGAN CITY // 8.2280° N, 124.2452° E</span>
              </div>

              {/* Image Container */}
              <div className="relative size-60 sm:size-72 overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
                <Image
                  src="/profile.jpg"
                  alt="Joseph Alan B. Vergara"
                  width={320}
                  height={320}
                  className="h-full w-full object-cover grayscale-[25%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  priority
                />

                {/* Overlaid scanline and corner HUD elements */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2 left-2 right-2 rounded bg-background/90 px-2.5 py-1.5 backdrop-blur-md border border-border/80 text-[11px] font-mono flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-foreground">
                    <Zap className="size-3 text-primary" />
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
            <div className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded bg-primary/10 text-primary border border-primary/30">
                <TerminalIcon className="size-3.5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-mono font-bold tracking-wider text-foreground uppercase">
                  SYSTEM_TELEMETRY // HARDWARE & STACK SPECIFICATION
                </h3>
                <p className="text-[11px] font-mono text-muted-foreground">
                  Target Architectures, Deterministic Kernels & Edge Accelerators
                </p>
              </div>
            </div>

            {/* Toggle tabs */}
            <div className="flex items-center rounded-lg border border-border bg-secondary/50 p-1 font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveTelemetryTab('specs')}
                className={cn(
                  'rounded px-3 py-1 transition-all',
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
                  'rounded px-3 py-1 transition-all',
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
          {activeTelemetryTab === 'specs' ? (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4 text-xs font-mono">
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
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 text-xs font-mono">
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
      className="inline-flex items-center gap-2 rounded border border-border/80 bg-secondary/40 px-3 py-2 text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10 hover:text-primary hover:shadow-lg hover:shadow-primary/10"
    >
      {children}
    </a>
  )
}
