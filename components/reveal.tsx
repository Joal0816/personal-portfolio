'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type RevealProps = {
  children: React.ReactNode
  /** Delay in ms before the settle starts once in view. */
  delay?: number
  /** Small rotation the element settles out of, like paper landing on a page. */
  tilt?: number
  className?: string
  /** Render as a different element (e.g. 'li', 'article'). Defaults to 'div'. */
  as?: React.ElementType
}

/**
 * Paper-settle wrapper: elements arrive the way a page settles onto a desk —
 * a short lift, a slight rotation, and a shadow that deepens into place.
 * IntersectionObserver + CSS transitions only. Content is never trapped
 * hidden: a short fallback reveals anything the observer misses, and
 * reduced-motion users see everything immediately.
 */
export function Reveal({
  children,
  delay = 0,
  tilt = 0,
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
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)

    // Safety net: nothing stays invisible because an observer never fired.
    const fallback = window.setTimeout(() => setVisible(true), 2500)

    return () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])

  return (
    <Tag
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: visible ? undefined : `translateY(14px) rotate(${tilt}deg)`,
      }}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
        visible ? 'opacity-100' : 'opacity-0',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
