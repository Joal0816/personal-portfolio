'use client'

import Image from 'next/image'
import { ChevronRight, FileDown, Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { profile } from '@/lib/portfolio-data'
import { HardwarePlayground } from '@/components/hardware-playground'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 size-[54rem] rounded-full opacity-20 dark:opacity-15 blur-3xl [background:radial-gradient(circle_at_center,#0071e3_0%,#af52de_35%,transparent_70%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="min-w-0 lg:pt-10">
            <div className="relative mb-7 size-28 overflow-hidden rounded-[24px] border border-border shadow-lg sm:size-32">
              <Image src="/profile.jpg" alt={profile.fullName} fill priority sizes="(min-width: 640px) 128px, 112px" className="object-cover object-[50%_15%]" />
            </div>
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-3 text-lg font-medium text-primary sm:text-xl">{profile.role}</p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{profile.tagline}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="ios-btn-primary px-6 py-3 text-sm">
                <span>Explore Work</span><ChevronRight className="size-4" />
              </a>
              <a href="#contact" className="ios-btn-secondary px-5 py-3 text-sm">
                <Mail className="size-4" /><span>Contact</span>
              </a>
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-foreground underline-offset-4 hover:underline">
                <FileDown className="size-4" /><span>Résumé</span>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-5">
              <p className="inline-flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4 shrink-0" />{profile.location}</p>
              <div className="flex items-center gap-2">
                <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="ios-btn-secondary size-11 p-0" aria-label="GitHub profile"><GithubIcon className="size-4" /></a>
                <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="ios-btn-secondary size-11 p-0" aria-label="LinkedIn profile"><LinkedinIcon className="size-4" /></a>
              </div>
            </div>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">{profile.status}<br />{profile.institution}</p>
          </div>

          <div id="telemetry" className="relative min-w-0 scroll-mt-28">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">The bench</h2>
            <p className="mt-2 mb-5 max-w-lg text-sm leading-relaxed text-muted-foreground">Try a simulated microcontroller: inspect pins, explore protocols, and watch sensor readings change.</p>
            <div className="spatial-glass overflow-hidden p-2 sm:p-3">
              <div className="flex items-center gap-2 border-b border-border px-3 py-3">
                <div aria-hidden="true" className="flex gap-1.5"><span className="size-2.5 rounded-full bg-[#ff5f56]" /><span className="size-2.5 rounded-full bg-[#ffbd2e]" /><span className="size-2.5 rounded-full bg-[#27c93f]" /></div>
                <span className="ml-2 text-xs font-medium text-muted-foreground">Interactive workbench</span>
                <span className="ml-auto text-xs text-muted-foreground">Simulation</span>
              </div>
              <div className="p-1 sm:p-3"><HardwarePlayground /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
