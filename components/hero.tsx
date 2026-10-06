'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronRight, Mail, Activity, Sparkles, Cpu, Layers } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { profile } from '@/lib/portfolio-data'
import { HardwarePlayground } from '@/components/hardware-playground'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* iOS 26 Apple Intelligence Volumetric Aurora */}
      <div className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 size-[54rem] rounded-full opacity-40 dark:opacity-30 blur-3xl [background:radial-gradient(circle_at_center,#0071e3_0%,#af52de_35%,#34c759_65%,transparent_75%)] animate-pulse duration-[10000ms]" />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 items-center">
          {/* Left Column: VisionOS Keynote Studio Showcase */}
          <div className="min-w-0">
            {/* Apple Intelligence Luminous Chip */}
            <div className="inline-flex items-center gap-2 rounded-full spatial-island ai-halo px-4 py-1.5 text-xs font-medium text-foreground mb-6">
              <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>BS Computer Applications (Major in Embedded Systems)</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 mb-6">
              {/* VisionOS Volumetric Portrait Frame with Chromatic Rim */}
              <div className="relative size-28 sm:size-32 shrink-0 rounded-[30px] overflow-hidden p-1.5 ai-halo bg-gradient-to-b from-white/90 via-white/40 to-transparent dark:from-white/30 dark:via-white/10 dark:to-transparent shadow-2xl border border-white/50 dark:border-white/20">
                <div className="relative size-full rounded-[24px] overflow-hidden">
                  <Image
                    src="/profile.jpg"
                    alt="Joseph Vergara"
                    fill
                    priority
                    className="object-cover object-[50%_15%]"
                  />
                </div>
              </div>

              <div>
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.08]">
                  Joseph Vergara
                </h1>
                <p className="mt-1 text-base sm:text-lg font-medium text-primary">
                  Embedded Systems &amp; Edge AI Engineer
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Mindanao State University – Iligan Institute of Technology
                </p>
              </div>
            </div>

            {/* Subtitle / Tagline */}
            <p className="text-lg sm:text-xl font-normal text-muted-foreground leading-relaxed max-w-xl">
              I write the software that lives directly on hardware — firmware, real-time systems, and small AI models that run without the cloud.
            </p>

            {/* iOS 26 Holographic Action Controls */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="ios-btn-primary ai-halo px-6 py-3 text-sm shadow-lg"
              >
                <span>Explore Work</span>
                <ChevronRight className="size-4" />
              </a>

              <a
                href="#contact"
                className="ios-btn-secondary px-5 py-3 text-sm"
              >
                <Mail className="size-4 text-muted-foreground" />
                <span>Contact</span>
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="ios-btn-secondary size-11 p-0"
                aria-label="GitHub profile"
              >
                <GithubIcon className="size-4" />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="ios-btn-secondary size-11 p-0"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon className="size-4" />
              </a>
            </div>

            {/* Silicon Metrics Cards */}
            <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg border-t border-border/80 pt-6">
              <div>
                <span className="block text-2xl font-bold tracking-tight text-foreground">1.96</span>
                <span className="text-xs text-muted-foreground">MSU-IIT CGPA</span>
              </div>
              <div>
                <span className="block text-2xl font-bold tracking-tight text-foreground">15+</span>
                <span className="text-xs text-muted-foreground">Hardware Projects</span>
              </div>
              <div>
                <span className="block text-2xl font-bold tracking-tight text-foreground">0ms</span>
                <span className="text-xs text-muted-foreground">Edge Inference Latency</span>
              </div>
            </div>
          </div>

          {/* Right Column: VisionOS Spatial Instruments Bench */}
          <div className="relative min-w-0">
            <div className="spatial-glass ai-halo p-2 sm:p-3 overflow-hidden">
              {/* Traffic Lights Titlebar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                  <span className="size-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                  <span className="size-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                  <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                    Instruments — Live Workbench
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-500">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    ONLINE
                  </span>
                </div>
              </div>

              {/* Hardware Playground Container */}
              <div className="p-2 sm:p-4">
                <HardwarePlayground />
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry anchor & The bench heading */}
        <div id="telemetry" className="mt-16 scroll-mt-24 border-t border-border/80 pt-12 md:mt-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-2">
                <Activity className="size-3.5" />
                <span>Xcode Instruments Telemetry</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                The bench: what I build on and with.
              </h2>
              <p className="mt-2 text-base text-muted-foreground max-w-xl">
                Microcontroller benches, real-time RTOS schedules, and edge AI benchmarks from real hardware.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
