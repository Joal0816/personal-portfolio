'use client'

import { useEffect, useState, useRef } from 'react'
import { Menu, X, FileDown } from 'lucide-react'
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
    const onScroll = () => {
      setScrolled(window.scrollY > 16)
      if (window.scrollY < 200) setActive('')
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
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-40 transition-all duration-300',
        scrolled
          ? 'glass-nav shadow-[0_4px_24px_rgba(0,0,0,0.04)] py-2 sm:py-2.5'
          : 'bg-transparent py-4'
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* macOS Brand Icon & Title */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl px-1.5 py-1"
        >
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xs shadow-sm shadow-primary/20">
            J
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-foreground group-hover:text-primary transition-colors">
              Joseph Vergara
            </span>
            <span className="text-[11px] text-muted-foreground tracking-normal -mt-0.5">
              Embedded &amp; Edge AI
            </span>
          </div>
        </a>

        {/* macOS Floating Segmented Navigation Bar */}
        <nav
          aria-label="Primary"
          className="flex items-center gap-1 rounded-full p-1 bg-secondary/80 border border-border/80 backdrop-blur-xl shadow-inner max-md:hidden"
        >
          {navLinks.map((link) => {
            const isActive = active === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'relative rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200 select-none',
                  isActive
                    ? 'bg-card text-foreground shadow-sm font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                )}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/80 px-3.5 py-1.5 text-xs font-medium text-foreground hover:bg-card hover:border-primary/40 shadow-sm transition-all active:scale-95"
          >
            <FileDown className="size-3.5 text-primary" />
            <span>Résumé</span>
          </a>

          <ThemeToggle />

          {/* Mobile Menu Toggle Button */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden flex size-9 items-center justify-center rounded-full bg-secondary/80 text-foreground border border-border/80"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Always rendered, hidden offscreen or visually hidden when closed for seamless locator tests) */}
      <div
        ref={panelRef}
        aria-hidden={!open}
        className={cn(
          'md:hidden fixed inset-x-4 top-16 z-50 rounded-2xl glass-material p-5 shadow-2xl border border-border transition-all duration-200',
          open
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none hidden'
        )}
      >
        <nav className="flex flex-col gap-1.5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary/60 transition-colors"
            >
              <span>{link.label}</span>
              <span className="text-xs text-muted-foreground">→</span>
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-3 text-sm font-semibold shadow-md shadow-primary/20"
          >
            <FileDown className="size-4" />
            <span>Download Résumé</span>
          </a>
        </nav>
      </div>

      {/* Hidden semantic links for mobile crawl & accessibility in closed state */}
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
