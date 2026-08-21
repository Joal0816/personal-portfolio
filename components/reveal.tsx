'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type RevealProps = {
  children: React.ReactNode
  /** Delay in ms before the reveal transition starts once in view. */
  delay?: number
  /** Direction the element travels from as it fades in. */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  /** Render as a different element (e.g. 'li', 'article'). Defaults to 'div'. */
  as?: React.ElementType
}

const hiddenByDirection: Record<NonNullable<RevealProps['direction']>, string> = {
  up: 'translate-y-6',
  down: '-translate-y-6',
  left: 'translate-x-6',
  right: '-translate-x-6',
  none: '',
}

/**
 * Lightweight scroll-reveal wrapper built on IntersectionObserver + CSS
 * transitions — no animation library required. Respects reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  as: Tag = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Honor users who prefer reduced motion — show immediately.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none',
        visible
          ? 'translate-x-0 translate-y-0 opacity-100'
          : `opacity-0 ${hiddenByDirection[direction]}`,
        className,
      )}
    >
      {children}
    </Tag>
  )
}
