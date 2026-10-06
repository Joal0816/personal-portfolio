'use client'

import { useEffect, useState } from 'react'

export function CyberHudCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const [isPointerFine, setIsPointerFine] = useState(false)

  useEffect(() => {
    // Only enable on precise pointing devices (mouse / trackpad)
    const media = window.matchMedia('(pointer: fine)')
    setIsPointerFine(media.matches)

    const onMediaChange = (e: MediaQueryListEvent) => setIsPointerFine(e.matches)
    media.addEventListener('change', onMediaChange)

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)

      const target = e.target as HTMLElement | null
      const isInteractive = Boolean(
        target?.closest('button, a, input, textarea, select, [role="button"], [data-interactive]')
      )
      setHovering(isInteractive)
    }

    const onMouseLeave = () => setVisible(false)
    const onMouseEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      media.removeEventListener('change', onMediaChange)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [visible])

  if (!isPointerFine || !enabled || !visible) return null

  return (
    <div
      className="pointer-events-none fixed z-40 transition-transform duration-75 ease-out select-none"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Reticle Circle */}
      <div
        className={`relative flex items-center justify-center rounded-full transition-all duration-200 ${
          hovering
            ? 'size-9 border border-primary/90 bg-primary/10 shadow-[0_0_12px_rgba(34,211,238,0.4)] scale-110'
            : 'size-6 border border-primary/40 bg-transparent'
        }`}
      >
        {/* Center dot */}
        <div className="size-1 rounded-full bg-primary" />

        {/* HUD Crosshairs */}
        <span className="absolute -top-1.5 h-1 w-px bg-primary/80" />
        <span className="absolute -bottom-1.5 h-1 w-px bg-primary/80" />
        <span className="absolute -left-1.5 h-px w-1 bg-primary/80" />
        <span className="absolute -right-1.5 h-px w-1 bg-primary/80" />

        {/* Small Coordinate readout when hovering interactive elements */}
        {hovering && (
          <div className="absolute left-6 top-6 whitespace-nowrap rounded border border-primary/30 bg-background/90 px-1.5 py-0.5 font-mono text-[9px] text-primary backdrop-blur-md shadow-lg animate-fade-in">
            <span>TARGET_LOCKED</span>
          </div>
        )}
      </div>
    </div>
  )
}
