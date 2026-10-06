'use client'

import { useEffect, useState, useRef } from 'react'
import { Menu, X, FileDown } from 'lucide-react'
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
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      // Above the first section nothing is "current" — clear the tab highlight.
      if (window.scrollY < 240) setActive('')
    }
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
      const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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
        else setActive('')
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
          ? 'shadow-[0_1px_0_var(--border),0_10px_24px_-18px_color-mix(in_oklch,var(--graphite)_45%,transparent)]'
          : 'shadow-[0_1px_0_color-mix(in_oklch,var(--border)_60%,transparent)]',
      )}
    >
      {/* Cloth binding of the notebook */}
      <div className="bg-cloth text-cloth-foreground">
        <nav className="mx-auto flex h-16 max-w-6xl 2xl:max-w-7xl items-center justify-between px-3 sm:px-6">
          {/* Cover stamp — gold foil on maroon cloth */}
          <a
            href="#top"
            onClick={(e) => {
              if (open) handleLinkClick(e, '#top')
            }}
            aria-label="Joseph Vergara Portfolio - Back to top"
            className="group flex min-h-[44px] items-center gap-2.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foil focus-visible:ring-offset-2 focus-visible:ring-offset-cloth shrink-0"
          >
            <span className="foil-stamp font-display text-xl font-extrabold leading-none tracking-tight">
              {profile.callsign}
            </span>
            <span className="hidden sm:block h-6 w-px bg-cloth-foreground/25" />
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="text-[13px] font-semibold tracking-tight">
                {profile.name}
              </span>
              <span className="text-[10px] text-cloth-foreground/75">
                Iligan City · MSU-IIT
              </span>
            </span>
          </a>

          {/* Divider tabs */}
          <div className="hidden items-center gap-0.5 xl:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  data-active={isActive}
                  className={cn(
                    'index-tab inline-flex min-h-[36px] items-center rounded-t-md px-3 py-1.5 text-xs tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foil',
                    isActive
                      ? 'bg-background text-foreground font-semibold'
                      : 'text-cloth-foreground/85 hover:bg-cloth-foreground/10 hover:text-cloth-foreground',
                  )}
                >
                  <span>{link.label}</span>
                </a>
              )
            })}

            <div className="ml-3 flex items-center gap-2 pl-3 border-l border-cloth-foreground/20">
              <a
                href="/resume.pdf"
                download
                className="inline-flex min-h-[36px] items-center gap-1.5 rounded-md border border-cloth-foreground/30 px-3 py-1.5 text-xs text-cloth-foreground transition-colors duration-200 hover:bg-cloth-foreground/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foil active:scale-95"
              >
                <FileDown className="size-3.5" />
                <span>Résumé</span>
              </a>
              <ThemeToggle />
            </div>
          </div>

          {/* Compact controls (below xl) */}
          <div className="flex items-center gap-2 xl:hidden">
            <a
              href="/resume.pdf"
              download
              className="hidden sm:inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-cloth-foreground/30 px-3 py-1.5 text-xs text-cloth-foreground transition-colors duration-200 hover:bg-cloth-foreground/12 active:scale-95"
            >
              <FileDown className="size-3.5" />
              <span>Résumé</span>
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
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-cloth-foreground/30 text-cloth-foreground transition-colors duration-200 hover:bg-cloth-foreground/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foil active:scale-95"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Tabbed contents panel */}
      <div
        ref={panelRef}
        id="navbar-menu-panel"
        role="region"
        aria-label="Site Navigation Menu"
        className={cn(
          'overflow-y-auto border-b border-border bg-background/97 backdrop-blur-xl transition-all duration-300 xl:hidden shadow-lift',
          isMounted && open
            ? 'max-h-[calc(100dvh-4rem)] opacity-100 py-5 pointer-events-auto'
            : 'max-h-0 opacity-0 py-0 pointer-events-none',
        )}
      >
        <div className="mx-auto flex max-w-6xl flex-col px-5 sm:px-6 space-y-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="marginalia text-lg leading-none">contents</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {profile.name} — {profile.role}
              </p>
            </div>
            <span className="measure text-[11px] text-muted-foreground">
              {navLinks.length} tabs
            </span>
          </div>

          <div className="flex flex-col border-t border-border">
            {navLinks.map((link) => {
              const isActive = active === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={cn(
                    'flex min-h-[52px] items-center justify-between border-b border-border px-1 py-3 text-base transition-colors active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded',
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-foreground/85 hover:text-primary',
                  )}
                >
                  <span>{link.label}</span>
                  <span className="measure text-[11px] text-muted-foreground">
                    {link.href}
                  </span>
                </a>
              )
            })}
          </div>

          <a
            href="/resume.pdf"
            download
            onClick={() => {
              setOpen(false)
              document.body.style.overflow = ''
            }}
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99]"
          >
            <FileDown className="size-4" />
            <span>Download the résumé (PDF)</span>
          </a>
        </div>
      </div>
    </header>
  )
}
