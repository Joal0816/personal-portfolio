'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import {
  Terminal,
  Activity,
  Zap,
  Sparkles,
  ArrowRight,
  Code2,
  Sliders,
  Maximize2
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ComparePreset {
  id: string
  command: string
  title: string
  description: string
  tells: { name: string; position: { top: string; left: string } }[]
}

const PRESETS: ComparePreset[] = [
  {
    id: 'clarify',
    command: '/clarify',
    title: 'Grounded Tone & Hierarchy',
    description: 'Stripped loud neon status HUDs, military brackets, and dense terminal jargon into warm, honest notes.',
    tells: [
      { name: 'Cyber HUD badge', position: { top: '15%', left: '18%' } },
      { name: 'Scanline / glow slop', position: { top: '38%', left: '8%' } },
      { name: 'ALL-CAPS bracket tags', position: { top: '65%', left: '16%' } },
    ]
  },
  {
    id: 'distill',
    command: '/distill',
    title: 'Artifact-First Clarity',
    description: 'Swapped faux CRT radar animations for an open engineering lab notebook with real MSU-IIT graduation evidence.',
    tells: [
      { name: 'Fake radar sweep', position: { top: '22%', left: '72%' } },
      { name: 'Laser card beams', position: { top: '50%', left: '75%' } },
      { name: 'Overdense metrics', position: { top: '78%', left: '60%' } },
    ]
  },
  {
    id: 'typeset',
    command: '/typeset',
    title: 'Readable Typography',
    description: 'Replaced monospace text fatigue with high-contrast Bricolage & Schibsted Grotesk, plus genuine handwritten margin notes.',
    tells: [
      { name: 'Monospace body fatigue', position: { top: '48%', left: '22%' } },
      { name: 'Low-contrast cyan glow', position: { top: '28%', left: '32%' } },
      { name: 'Unbounded text widths', position: { top: '62%', left: '30%' } },
    ]
  }
]

export function ImpeccableCompare() {
  const [sliderPos, setSliderPos] = useState(48) // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false)
  const [activePreset, setActivePreset] = useState<ComparePreset>(PRESETS[0])
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100))
    setSliderPos(percent)
  }, [])

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }, [isDragging, handleMove])

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }, [isDragging, handleMove])

  const onEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onEnd)
      window.addEventListener('touchmove', onTouchMove)
      window.addEventListener('touchend', onEnd)
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onEnd)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onEnd)
    }
  }, [isDragging, onMouseMove, onTouchMove, onEnd])

  return (
    <section className="relative my-16 border-y border-border bg-card/60 py-16 backdrop-blur-md overflow-hidden">
      {/* Background paper texture & subtle radial accents */}
      <div className="quadrille pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
              <Sparkles className="size-3.5" />
              <span>Tailored Interface Study</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Before vs. After: <span className="text-primary italic">Impeccable UI/UX</span>
            </h2>
            <p className="mt-2 text-base sm:text-lg text-muted-foreground max-w-xl">
              Compare the original cyberpunk developer interface against the warm, tailored engineering lab notebook.
            </p>
          </div>

          {/* Quick preset selector buttons like impeccable.style */}
          <div className="flex flex-wrap items-center gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePreset(p)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-mono font-medium transition-all shadow-sm',
                  activePreset.id === p.id
                    ? 'border-primary bg-primary text-primary-foreground shadow-primary/20'
                    : 'border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground'
                )}
              >
                <span className={cn('size-1.5 rounded-full', activePreset.id === p.id ? 'bg-primary-foreground' : 'bg-primary')} />
                <span>{p.command}</span>
              </button>
            ))}
          </div>
        </div>

        {/* The Interactive Compare Canvas Frame */}
        <div
          ref={containerRef}
          onMouseDown={(e) => {
            setIsDragging(true)
            handleMove(e.clientX)
          }}
          onTouchStart={(e) => {
            setIsDragging(true)
            handleMove(e.touches[0].clientX)
          }}
          className="relative select-none aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl border border-border bg-background shadow-2xl overflow-hidden cursor-ew-resize group"
        >
          {/* ─────────────────────────────────────────────────────────────
              LAYER 1: AFTER (Impeccable Lab Notebook Version) - RIGHT/FULL
              ───────────────────────────────────────────────────────────── */}
          <div className="absolute inset-0 bg-[#0d1117] text-foreground p-6 sm:p-12 flex flex-col justify-between overflow-hidden">
            <div className="quadrille pointer-events-none absolute inset-0 opacity-60" />

            {/* Top Lab Header bar */}
            <div className="relative z-10 flex items-center justify-between border-b border-border/80 pb-4">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-primary tracking-wide text-lg sm:text-xl">JOAL</span>
                <span className="text-xs text-muted-foreground hidden sm:inline">Engineering Notebook · MSU-IIT</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-secondary/80 px-2.5 py-1 text-xs text-muted-foreground border border-border">
                  Daylight / Lamp toggle
                </span>
                <span className="rounded bg-primary/20 text-primary px-2.5 py-1 text-xs font-semibold">
                  v2.0 Impeccable
                </span>
              </div>
            </div>

            {/* Content Preview */}
            <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="marginalia text-primary text-lg block mb-1">who I am, in plain words</span>
                <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Joseph Vergara
                </h3>
                <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-primary mt-1">
                  Embedded Systems & Edge AI Engineer
                </p>
                <p className="mt-3 text-xs sm:text-base text-muted-foreground max-w-md leading-relaxed">
                  I write the software that lives directly on hardware — firmware, real-time operating systems, and small AI models that run without the cloud.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="inline-flex rounded-md bg-primary text-primary-foreground text-xs px-3.5 py-1.5 font-medium shadow-sm">
                    See the work ↓
                  </span>
                  <span className="inline-flex rounded-md border border-border text-xs px-3.5 py-1.5 text-muted-foreground">
                    Lab Notes
                  </span>
                </div>
              </div>

              {/* Taped photo thumbnail representation */}
              <div className="hidden sm:flex justify-end pr-6">
                <div className="relative p-2 pb-6 bg-[#1f242c] border border-border/90 rounded-[3px] shadow-lg [transform:rotate(1.5deg)]">
                  <span className="tape absolute -top-2 left-6 h-4 w-14 rounded-[2px] opacity-80" />
                  <div className="w-32 h-40 relative rounded-[2px] overflow-hidden">
                    <Image
                      src="/profile.jpg"
                      alt="Profile"
                      fill
                      className="object-cover object-[50%_15%]"
                    />
                  </div>
                  <span className="marginalia block text-[13px] text-center mt-1.5 text-muted-foreground">
                    graduation, MSU-IIT
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom watermark label */}
            <div className="relative z-10 flex justify-end">
              <span className="font-mono text-[10px] tracking-widest text-primary/70 uppercase">
                AFTER // IMPECCABLE TAILORED FIT
              </span>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              LAYER 2: BEFORE (Original Cyberpunk / Terminal Version) - LEFT
              Clipped dynamically by sliderPos %
              ───────────────────────────────────────────────────────────── */}
          <div
            className="absolute inset-0 bg-[#070b12] text-foreground p-6 sm:p-12 flex flex-col justify-between overflow-hidden border-r-2 border-primary/80"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            {/* Cyber scanline & cyan glow */}
            <div className="tech-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
            <div className="scanline-overlay pointer-events-none" />

            {/* Top Status HUD */}
            <div className="relative z-10 flex items-center justify-between border-b border-cyan-500/30 pb-4">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-cyan-400" />
                <span className="font-mono text-xs text-cyan-400 font-bold tracking-wider">
                  [SYS_STATUS // ONLINE: 100%]
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                <Activity className="size-3 text-emerald-400 animate-pulse" />
                <span className="text-emerald-400">CORE_V1_TERMINAL</span>
              </div>
            </div>

            {/* Cyberpunk Headline Content */}
            <div className="relative z-10 my-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-950/40 px-2.5 py-0.5 font-mono text-[10px] text-cyan-300 mb-2">
                  <Zap className="size-3 text-yellow-400 animate-pulse" />
                  <span>STATUS: OPERATIONAL // 4TH YEAR</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-primary">
                  JOSEPH VERGARA
                </h3>
                <p className="font-mono text-xs tracking-widest text-cyan-400/80 uppercase mt-1">
                  FIRMWARE // TINYML // FULL-STACK TELEMETRY
                </p>
                <p className="mt-3 text-xs sm:text-base font-mono text-muted-foreground max-w-md leading-relaxed">
                  Engineering at the intersection of bare-metal silicon, real-time operating systems, and edge intelligence.
                </p>
                <div className="mt-4 flex items-center gap-3 font-mono">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-cyan-400/60 bg-cyan-500/20 px-3.5 py-1.5 text-xs text-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    [INSPECT_SYS]
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/30 px-3.5 py-1.5 text-xs text-muted-foreground">
                    [NEOFETCH]
                  </span>
                </div>
              </div>

              {/* HUD Bracket profile chassis */}
              <div className="hidden sm:flex justify-end pr-6">
                <div className="relative p-2 rounded-xl border border-cyan-500/40 bg-cyan-950/20 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <div className="w-32 h-40 relative rounded-lg overflow-hidden border border-cyan-500/30">
                    <Image
                      src="/profile.jpg"
                      alt="Profile"
                      fill
                      className="object-cover object-[50%_15%] grayscale-[30%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-cyan-400">
                      ID: JOAL_VERGS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom before label */}
            <div className="relative z-10 flex justify-start">
              <span className="font-mono text-[10px] tracking-widest text-cyan-400 uppercase">
                BEFORE // OVER-TECHNICAL CYBER HUD
              </span>
            </div>

            {/* Callout Pins / Slop Tell Badges matching impeccable.style */}
            {activePreset.tells.map((tell, idx) => (
              <div
                key={idx}
                style={{ top: tell.position.top, left: tell.position.left }}
                className="absolute z-20 pointer-events-none transition-all duration-300"
              >
                <span className="inline-flex items-center gap-1 rounded bg-amber-400/90 text-black px-2 py-0.5 font-mono text-[10px] font-bold shadow-md">
                  {tell.name}
                </span>
              </div>
            ))}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              SLIDER HANDLE BAR & DRAG KNOB (matching impeccable.style)
              ───────────────────────────────────────────────────────────── */}
          <div
            className="absolute top-0 bottom-0 z-30 w-1 bg-amber-400 pointer-events-none transition-transform duration-75"
            style={{ left: `${sliderPos}%` }}
          >
            {/* The handle pill */}
            <div
              className={cn(
                'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center size-9 sm:size-10 rounded-full border-2 border-white bg-amber-400 text-black shadow-xl cursor-ew-resize pointer-events-auto transition-transform',
                isDragging ? 'scale-110 shadow-amber-500/50' : 'hover:scale-105'
              )}
            >
              <div className="flex items-center gap-0.5">
                <span className="w-0.5 h-3.5 bg-black rounded-full" />
                <span className="w-0.5 h-3.5 bg-black rounded-full" />
                <span className="w-0.5 h-3.5 bg-black rounded-full" />
              </div>
            </div>
          </div>

          {/* Floating Before / After Corner Labels */}
          <div className="absolute top-3 left-4 z-20 pointer-events-none">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-cyan-400 bg-black/60 px-2 py-0.5 rounded border border-cyan-500/30">
              Before (Cyber v1)
            </span>
          </div>
          <div className="absolute top-3 right-4 z-20 pointer-events-none">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary bg-black/60 px-2 py-0.5 rounded border border-primary/30">
              After (Impeccable v2)
            </span>
          </div>
        </div>

        {/* Descriptor Bar beneath the slider */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground px-2">
          <p className="flex items-center gap-2">
            <span className="text-foreground font-semibold">{activePreset.title}:</span>
            <span>{activePreset.description}</span>
          </p>
          <span className="font-mono text-[11px] shrink-0 text-primary">
            Drag the slider to compare →
          </span>
        </div>
      </div>
    </section>
  )
}
