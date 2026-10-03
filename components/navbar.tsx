'use client'

import { useEffect, useState, useRef } from 'react'
import { Menu, X, FileDown, Terminal } from 'lucide-react'
import { navLinks, profile } from '@/lib/portfolio-data'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')
  const [isMounted, setIsMounted] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const prevOpenRef = useRef(open)

  useEffect(() => {
    setIsMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-close dropdown panel if window resizes to full inline desktop breakpoint (>= 1280px)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1280 && open) {
        setOpen(false)
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open])

  // Body scroll lock and focus management
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      // Shift focus into the panel for screen readers and keyboard users
      const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      firstFocusable?.focus()
    } else {
      document.body.style.overflow = ''
      // Return focus to the toggle button on close
      if (prevOpenRef.current && !open) {
        toggleRef.current?.focus()
      }
    }
    prevOpenRef.current = open
  }, [open])

  // Outside click and Escape key dismissal
  useEffect(() => {
    if (!open) return

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('touchstart', handlePointerDown, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('touchstart', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  // Track active section in view
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace('#', ''))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(`#${visible[0].target.id}`)
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: 0 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Smooth-scroll navigation that closes the panel first
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    document.body.style.overflow = ''

    const targetId = href.replace('#', '')
    if (href === '#top' || targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open
          ? 'border-b border-border/70 bg-background/85 shadow-lg shadow-black/20 backdrop-blur-xl'
          : 'border-b border-border/20 bg-background/40 backdrop-blur-md',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl 2xl:max-w-7xl items-center justify-between px-3 sm:px-6">
        {/* Brand / Callsign - Guaranteed unclipped across all screen widths */}
        <a
          href="#top"
          onClick={(e) => {
            if (open) handleLinkClick(e, '#top')
          }}
          aria-label="Joseph Vergara Portfolio - Back to top"
          className="group flex items-center gap-2 sm:gap-2.5 font-mono text-sm tracking-tight text-foreground shrink-0 rounded-lg p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <div className="relative flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-card p-1 text-primary transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_16px_rgba(6,182,212,0.4)] group-hover:scale-105">
            <img
              src="/icon.svg"
              alt="Joseph Vergara Logo"
              className="size-7 object-contain transition-transform group-hover:scale-110"
            />
            <span className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-emerald-400 border border-background shadow-[0_0_8px_#10b981]" />
          </div>
          <div className="flex flex-col shrink-0">
            <div className="flex items-center gap-1.5 font-bold tracking-wider whitespace-nowrap">
              <span className="text-foreground">{profile.name.toUpperCase()}</span>
              <span className="text-[10px] text-primary font-mono font-normal hidden sm:inline shrink-0">[EMBEDDED]</span>
            </div>
            <span className="text-[9px] font-mono text-muted-foreground hidden sm:block whitespace-nowrap">
              MSU-IIT // 4TH YR COMAPPS
            </span>
          </div>
        </a>

        {/* Status Beacon - Displayed inline only at 2xl (>=1536px) where width math guarantees breathing room */}
        <div className="hidden 2xl:flex items-center gap-2 rounded-full border border-border/80 bg-secondary/50 px-3 py-1 font-mono text-[11px] text-muted-foreground shadow-[0_0_12px_-3px_color-mix(in_oklch,var(--primary)_20%,transparent)] shrink-0">
          <span className="relative flex size-2.5 items-center justify-center">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="status-beacon relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-foreground/90 font-medium">STATUS:</span>
          <span className="text-primary font-mono">SYS_ONLINE // LOW-LATENCY</span>
        </div>

        {/* Full Desktop Nav Links - Displayed inline at xl and above (>=1280px) */}
        <div className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'group relative min-h-[36px] inline-flex items-center rounded-md px-3 py-1.5 font-mono text-xs tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  isActive
                    ? 'text-primary font-semibold bg-primary/10 border border-primary/30 shadow-[0_0_8px_rgba(6,182,212,0.15)]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40 border border-transparent',
                )}
              >
                <span className="mr-1 text-[10px] text-primary/60 group-hover:text-primary">
                  {link.code || '00'}
                </span>
                {link.label.toUpperCase()}
              </a>
            )
          })}

          <div className="ml-2 flex items-center gap-2 border-l border-border/60 pl-3">
            <a
              href="/resume.pdf"
              download
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono text-xs text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95"
            >
              <FileDown className="size-3.5" />
              <span>RESUME</span>
            </a>
            <ThemeToggle />
          </div>
        </div>

        {/* Compact Navigation Controls - Displayed below xl (<1280px) */}
        <div className="flex items-center gap-2 xl:hidden">
          {/* Direct Resume Download Button - Visible on tablets/compact desktop (>=640px) */}
          <a
            href="/resume.pdf"
            download
            className="hidden sm:inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono text-xs text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95"
          >
            <FileDown className="size-3.5" />
            <span>RESUME</span>
          </a>

          <ThemeToggle />

          <button
            ref={toggleRef}
            id="navbar-toggle"
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="navbar-menu-panel"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border bg-secondary/50 text-foreground transition-all duration-200 hover:bg-accent hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Top-Anchored Dropdown Panel - Drops cleanly from top header */}
      <div
        ref={panelRef}
        id="navbar-menu-panel"
        role="region"
        aria-label="Site Navigation Menu"
        className={cn(
          'overflow-y-auto border-t border-border/80 bg-background/95 backdrop-blur-2xl transition-all duration-300 xl:hidden shadow-2xl shadow-black/40',
          isMounted && open
            ? 'max-h-[calc(100dvh-4rem)] opacity-100 py-4 pointer-events-auto'
            : 'max-h-0 opacity-0 py-0 pointer-events-none',
        )}
      >
        <div className="mx-auto flex max-w-6xl flex-col px-4 sm:px-6 space-y-3">
          {/* Panel Header & Status Beacon */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-border/50">
            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                <Terminal className="size-3.5 text-primary" />
                SYS_NAV // CORE
              </span>
              <span className="text-emerald-500 font-bold sm:hidden">ONLINE</span>
            </div>

            {/* Status Beacon inside panel */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-secondary/60 px-3 py-1 font-mono text-[11px] text-muted-foreground w-fit shadow-[0_0_12px_-3px_color-mix(in_oklch,var(--primary)_20%,transparent)]">
              <span className="relative flex size-2.5 items-center justify-center">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="status-beacon relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-foreground/90 font-medium">STATUS:</span>
              <span className="text-primary font-mono">SYS_ONLINE // LOW-LATENCY</span>
            </div>
          </div>

          {/* Numbered Nav Links */}
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = active === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={cn(
                    'flex min-h-[44px] items-center justify-between rounded-lg px-3.5 py-2.5 font-mono text-sm transition-all active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    isActive
                      ? 'bg-primary/10 text-primary font-medium border border-primary/20 shadow-[0_0_12px_rgba(6,182,212,0.1)]'
                      : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground border border-transparent',
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs text-primary/70 font-mono font-semibold">[{link.code || '00'}]</span>
                    <span className="tracking-wide">{link.label.toUpperCase()}</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground/60">{link.href}</span>
                </a>
              )
            })}
          </div>

          {/* Full Resume Action in Panel */}
          <div className="pt-2 border-t border-border/50 flex flex-col sm:flex-row gap-2">
            <a
              href="/resume.pdf"
              download
              onClick={() => {
                setOpen(false)
                document.body.style.overflow = ''
              }}
              className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 py-2.5 px-4 font-mono text-xs text-primary font-medium transition-all hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99]"
            >
              <FileDown className="size-4" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
