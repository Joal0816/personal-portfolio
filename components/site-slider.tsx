'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Sliders, X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SiteSlider() {
  const [active, setActive] = useState(false)
  const [sliderPos, setSliderPos] = useState(50) // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false)
  const [isLight, setIsLight] = useState(false)
  const [docHeight, setDocHeight] = useState(12000)
  const containerRef = useRef<HTMLDivElement>(null)

  // Track light/dark class on documentElement
  useEffect(() => {
    const checkTheme = () => {
      setIsLight(document.documentElement.classList.contains('light'))
    }
    checkTheme()
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

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

  useEffect(() => {
    const updateHeight = () => {
      setDocHeight(document.documentElement.scrollHeight || 12000)
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [active])

  const v1ImageSrc = isLight ? '/v1-fullpage-light.webp' : '/v1-fullpage-dark.webp'

  return (
    <>
      {/* Floating launcher badge when inactive */}
      {!active ? (
        <div className="fixed bottom-6 left-6 z-50 select-none animate-in fade-in duration-300">
          <button
            type="button"
            onClick={() => setActive(true)}
            className="group relative flex items-center gap-2.5 rounded-full border border-amber-400/50 bg-[#0d1117]/95 px-4 py-2.5 text-xs font-mono font-medium text-amber-300 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:border-amber-400 active:scale-95"
          >
            <span className="flex size-2 rounded-full bg-amber-400 animate-ping" />
            <Sliders className="size-3.5 text-amber-400" />
            <span>Compare Whole Site (v1 vs v2)</span>
          </button>
        </div>
      ) : (
        <>
          {/* ─────────────────────────────────────────────────────────────
              WHOLE-WEBSITE PEEL OVERLAY
              Clips the V1 Cyberpunk version over the live page based on sliderPos %
              ───────────────────────────────────────────────────────────── */}
          <div
            ref={containerRef}
            className="pointer-events-none absolute inset-x-0 top-0 z-40 overflow-hidden select-none"
            style={{
              height: `${docHeight}px`,
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            }}
          >
            <div className="relative w-full h-full bg-[#070b12]">
              <img
                src={v1ImageSrc}
                alt="Cyberpunk V1 Portfolio View"
                className="w-full object-cover object-top"
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              FIXED SLIDER LINE & DRAGGABLE HANDLE
              ───────────────────────────────────────────────────────────── */}
          <div
            className="fixed inset-y-0 z-50 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute inset-y-0 -left-0.5 w-1 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]" />

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
                isDragging ? 'scale-125 shadow-amber-400/80 ring-4 ring-amber-300/40' : 'hover:scale-110'
              )}
              aria-label="Drag to compare Cyberpunk v1 and Impeccable v2"
            >
              <div className="flex items-center gap-0.5">
                <span className="w-0.5 h-4 bg-black rounded-full" />
                <span className="w-0.5 h-4 bg-black rounded-full" />
                <span className="w-0.5 h-4 bg-black rounded-full" />
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              TOP CONTROL BAR
              ───────────────────────────────────────────────────────────── */}
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full border border-amber-400/40 bg-[#0d1117]/95 px-5 py-2 shadow-2xl backdrop-blur-xl">
            <span className="flex items-center gap-1.5 font-mono text-xs text-cyan-400 font-bold">
              <span className="size-2 rounded-full bg-cyan-400" />
              <span>CYBER V1</span>
            </span>

            <span className="text-xs text-muted-foreground font-mono">← Drag Whole Website →</span>

            <span className="flex items-center gap-1.5 font-mono text-xs text-amber-300 font-bold">
              <span>IMPECCABLE V2</span>
              <span className="size-2 rounded-full bg-amber-400" />
            </span>

            <div className="h-4 w-px bg-border/60 mx-1" />

            <button
              type="button"
              onClick={() => setActive(false)}
              className="flex items-center gap-1 rounded-full bg-secondary/80 px-2.5 py-1 text-xs text-foreground hover:bg-secondary transition-colors"
              title="Exit whole-site slider"
            >
              <X className="size-3.5" />
              <span>Close</span>
            </button>
          </div>

          <div className="fixed bottom-6 left-6 z-50">
            <button
              type="button"
              onClick={() => setActive(false)}
              className="flex items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-2 text-xs font-mono text-muted-foreground shadow-lg backdrop-blur-md hover:text-foreground hover:border-primary transition-all"
            >
              <X className="size-3.5" />
              <span>Exit whole-site compare</span>
            </button>
          </div>
        </>
      )}
    </>
  )
}
