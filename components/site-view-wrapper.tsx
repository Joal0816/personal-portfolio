'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Projects } from '@/components/projects'
import { Certifications } from '@/components/certifications'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

import { HeroCyber } from '@/components/cyber/hero-cyber'
import { AboutCyber } from '@/components/cyber/about-cyber'
import { ProjectsCyber } from '@/components/cyber/projects-cyber'
import { CertificationsCyber } from '@/components/cyber/certifications-cyber'
import { ContactCyber } from '@/components/cyber/contact-cyber'
import { FooterCyber } from '@/components/cyber/footer-cyber'
import { CyberHudCursor } from '@/components/cyber-hud-cursor'

import { Sliders, X, Sparkles, Terminal } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SiteViewWrapper() {
  const [sliderActive, setSliderActive] = useState(false)
  const [sliderPos, setSliderPos] = useState(50) // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false)

  const handleMove = useCallback((clientX: number) => {
    const percent = Math.max(0, Math.min(100, (clientX / window.innerWidth) * 100))
    setSliderPos(percent)
  }, [])

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return
      handleMove(e.touches[0].clientX)
    },
    [isDragging, handleMove]
  )

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return
      handleMove(e.clientX)
    },
    [isDragging, handleMove]
  )

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
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. REAL DOM: IMPECCABLE V2 (Full interactive site)
          ───────────────────────────────────────────────────────────── */}
      <div className="relative min-h-screen">
        <main className="overflow-x-hidden">
          <Hero />
          <About />
          <Projects />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. REAL DOM: CYBERPUNK V1 (Rendered over V2, clipped by slider)
          ───────────────────────────────────────────────────────────── */}
      {sliderActive && (
        <>
          <CyberHudCursor />
          <div
            className="absolute inset-0 z-30 overflow-hidden bg-[#070b12] text-foreground select-text"
            style={{
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            }}
          >
            <main className="overflow-x-hidden">
              <HeroCyber />
              <AboutCyber />
              <ProjectsCyber />
              <CertificationsCyber />
              <ContactCyber />
            </main>
            <FooterCyber />
          </div>

          {/* ─────────────────────────────────────────────────────────
              SLIDER VERTICAL DIVIDER & DRAGGABLE HANDLE
              ───────────────────────────────────────────────────────── */}
          <div
            className="fixed inset-y-0 z-50 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute inset-y-0 -left-0.5 w-1 bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.9)]" />

            {/* Draggable knob handle */}
            <div
              onMouseDown={(e) => {
                e.preventDefault()
                setIsDragging(true)
                handleMove(e.clientX)
              }}
              onTouchStart={(e) => {
                setIsDragging(true)
                handleMove(e.touches[0].clientX)
              }}
              className={cn(
                'pointer-events-auto absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center size-11 rounded-full border-2 border-white bg-amber-400 text-black shadow-2xl cursor-ew-resize transition-transform select-none',
                isDragging ? 'scale-125 shadow-amber-400/90 ring-4 ring-amber-300/50' : 'hover:scale-110'
              )}
              aria-label="Drag to compare Cyberpunk v1 and Impeccable v2 live"
            >
              <div className="flex items-center gap-0.5">
                <span className="w-0.5 h-4 bg-black rounded-full" />
                <span className="w-0.5 h-4 bg-black rounded-full" />
                <span className="w-0.5 h-4 bg-black rounded-full" />
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              TOP CONTROL BAR & BADGES
              ───────────────────────────────────────────────────────── */}
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full border border-amber-400/50 bg-[#0d1117]/95 px-5 py-2 shadow-2xl backdrop-blur-xl">
            <span className="flex items-center gap-1.5 font-mono text-xs text-cyan-400 font-bold">
              <Terminal className="size-3 text-cyan-400" />
              <span>LIVE CYBER V1</span>
            </span>

            <span className="text-xs text-muted-foreground font-mono hidden sm:inline">
              ← Drag Whole Website →
            </span>

            <span className="flex items-center gap-1.5 font-mono text-xs text-amber-300 font-bold">
              <span>IMPECCABLE V2</span>
              <Sparkles className="size-3 text-amber-400" />
            </span>

            <div className="h-4 w-px bg-border/60 mx-1" />

            <button
              type="button"
              onClick={() => setSliderActive(false)}
              className="flex items-center gap-1 rounded-full bg-secondary/80 px-2.5 py-1 text-xs text-foreground hover:bg-secondary transition-colors"
            >
              <X className="size-3.5" />
              <span>Close</span>
            </button>
          </div>
        </>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PERSISTENT LAUNCHER BUTTON (Bottom Left)
          ───────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-6 left-6 z-40 select-none">
        <button
          type="button"
          onClick={() => setSliderActive((v) => !v)}
          className={cn(
            'group relative flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-xs font-mono font-medium shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95',
            sliderActive
              ? 'border-border bg-card/90 text-muted-foreground hover:text-foreground'
              : 'border-amber-400/50 bg-[#0d1117]/95 text-amber-300 hover:border-amber-400'
          )}
        >
          {sliderActive ? (
            <>
              <X className="size-3.5" />
              <span>Exit Comparison</span>
            </>
          ) : (
            <>
              <span className="flex size-2 rounded-full bg-amber-400 animate-ping" />
              <Sliders className="size-3.5 text-amber-400" />
              <span>Compare Whole Site (v1 vs v2)</span>
            </>
          )}
        </button>
      </div>
    </>
  )
}
