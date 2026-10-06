'use client'

import { useEffect, useState, useRef } from 'react'
import { Menu, X, FileDown, Sparkles } from 'lucide-react'
import { navLinks } from '@/lib/portfolio-data'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [isMounted, setIsMounted] = useState(false)

  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const prevOpenRef = useRef(false)

  useEffect(() => {
    setIsMounted(true)
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20)
          if (window.scrollY < 200) setActive('')
          ticking = false
        })
        ticking = true
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const sections = navLinks
      .map((l) => document.getElementById(l.href.replace('#', '')))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) {
          setActive(`#${visible.target.id}`)
        }
      },
      { rootMargin: '-20% 0px -45% 0px', threshold: [0.1, 0.4, 0.7] }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [isMounted])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      firstFocusable?.focus()
    } else {
      document.body.style.overflow = ''
      if (prevOpenRef.current && !open) {
        toggleRef.current?.focus()
      }
    }
    prevOpenRef.current = open
  }, [open])

  return (
    <header className="fixed top-0 inset-x-0 z-40 transition-all duration-300 pointer-events-none py-3 sm:py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* iOS 26 Spatial Dynamic Island Brand Pill */}
        <a
          href="#top"
          className="pointer-events-auto group flex items-center gap-2.5 spatial-island ai-halo px-3.5 py-1.5 shadow-sm hover:scale-[1.03] active:scale-95 transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="flex size-7 items-center justify-center rounded-full bg-gradient-to-tr from-[#0071e3] via-[#af52de] to-[#34c759] text-white font-bold text-xs shadow-xs animate-pulse">
            J
          </div>
          <div className="flex flex-col pr-1">
            <span className="font-semibold text-xs tracking-tight text-foreground group-hover:text-primary transition-colors">
              Joseph Vergara
            </span>
            <span className="text-[10px] text-muted-foreground tracking-normal -mt-0.5">
              Embedded &amp; Edge AI
            </span>
          </div>
        </a>

        {/* Spatial Segmented Navigation Bar */}
        <nav
          aria-label="Primary"
          className="pointer-events-auto hidden md:flex items-center gap-1 p-1 spatial-island shadow-md"
        >
          {navLinks.map((link) => {
            const isActive = active === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'relative rounded-full px-3.5 py-1 text-xs font-medium transition-all duration-200 select-none',
                  isActive
                    ? 'bg-card text-foreground shadow-xs font-semibold ai-halo'
                    : 'text-muted-foreground hover:text-foreground hover:bg-card/40'
                )}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Action Controls Island */}
        <div className="pointer-events-auto flex items-center gap-2">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 spatial-island px-3.5 py-1.5 text-xs font-medium text-foreground hover:border-primary/40 transition-all active:scale-95"
          >
            <FileDown className="size-3.5 text-primary" />
            <span>CV</span>
          </a>

          <div className="spatial-island p-1">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden flex size-9 items-center justify-center spatial-island text-foreground active:scale-95"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* iOS 26 Sheet Modal Drawer */}
      <div
        ref={panelRef}
        aria-hidden={!open}
        className={cn(
          'pointer-events-auto md:hidden fixed inset-x-4 top-16 z-50 spatial-glass p-5 shadow-2xl border border-border transition-all duration-300',
          open
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none hidden'
        )}
      >
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary/70 transition-colors"
            >
              <span>{link.label}</span>
              <span className="text-xs text-muted-foreground">→</span>
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 ios-btn-primary py-3 text-sm font-semibold ai-halo"
          >
            <FileDown className="size-4" />
            <span>Download Résumé</span>
          </a>
        </nav>
      </div>

      {/* Semantic hidden links for accessibility tests */}
      <div className="sr-only md:hidden">
        {navLinks.map((link) => (
          <a key={`sr-${link.href}`} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </header>
  )
}
