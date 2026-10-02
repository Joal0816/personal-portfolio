'use client'

import { useEffect, useState } from 'react'
import { Menu, X, Cpu, Terminal, FileDown } from 'lucide-react'
import { navLinks, profile } from '@/lib/portfolio-data'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
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

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border/70 bg-background/85 shadow-lg shadow-black/20 backdrop-blur-xl'
          : 'border-b border-border/20 bg-background/40 backdrop-blur-md',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand / Callsign */}
        <a
          href="#top"
          className="group flex items-center gap-2 sm:gap-2.5 font-mono text-sm tracking-tight text-foreground min-w-0"
        >
          <div className="relative flex size-8 shrink-0 items-center justify-center rounded border border-primary/40 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_15px_rgba(34,211,238,0.35)]">
            <Cpu className="size-4 transition-transform group-hover:scale-110" />
            <span className="absolute -bottom-0.5 -right-0.5 size-1.5 rounded-full bg-primary" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 font-bold tracking-wider truncate">
              <span className="truncate">{profile.name.toUpperCase()}</span>
              <span className="text-[10px] text-primary font-normal hidden sm:inline shrink-0">[EMBEDDED]</span>
            </div>
            <span className="text-[9px] font-mono text-muted-foreground hidden sm:block truncate">
              MSU-IIT // 4TH YR COMAPPS
            </span>
          </div>
        </a>

        {/* Status Beacon - Hidden on small screens */}
        <div className="hidden lg:flex items-center gap-2 rounded-full border border-border/80 bg-secondary/50 px-3 py-1 font-mono text-[11px] text-muted-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-foreground/90 font-medium">STATUS:</span>
          <span className="text-primary font-mono">SYS_ONLINE // LOW-LATENCY</span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'group relative rounded-md px-3 py-1.5 font-mono text-xs tracking-wider transition-all duration-200',
                  isActive
                    ? 'text-primary font-semibold bg-primary/10 border border-primary/30'
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
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <FileDown className="size-3" />
              <span>RESUME</span>
            </a>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="inline-flex size-10 sm:size-9 items-center justify-center rounded-lg border border-border bg-secondary/50 text-foreground transition-all duration-200 hover:bg-accent active:scale-95"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      <div
        className={cn(
          'overflow-y-auto border-t border-border bg-background/95 backdrop-blur-2xl transition-all duration-300 md:hidden shadow-2xl',
          isMounted && open ? 'max-h-[calc(100dvh-4rem)] opacity-100 py-4' : 'max-h-0 opacity-0 py-0 pointer-events-none',
        )}
      >
        <div className="mx-auto flex max-w-6xl flex-col px-4 sm:px-6 space-y-1">
          <div className="mb-2 flex items-center justify-between pb-2 border-b border-border/50 text-[10px] font-mono text-muted-foreground">
            <span>SYS_NAV // CORE</span>
            <span className="text-emerald-500 font-bold">ONLINE</span>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                'flex min-h-[44px] items-center justify-between rounded-lg px-3.5 py-2.5 font-mono text-sm transition-colors active:scale-[0.99]',
                active === link.href
                  ? 'bg-primary/10 text-primary font-medium border border-primary/20'
                  : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground border border-transparent',
              )}
            >
              <span>{link.label}</span>
              <span className="text-xs text-primary/60 font-mono">[{link.code || '00'}]</span>
            </a>
          ))}

          <div className="pt-2 border-t border-border/50 flex gap-2">
            <a
              href="/resume.pdf"
              download
              onClick={() => setOpen(false)}
              className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 py-2.5 font-mono text-xs text-primary font-medium transition-colors hover:bg-primary hover:text-primary-foreground active:scale-[0.99]"
            >
              <FileDown className="size-4" />
              DOWNLOAD RESUME
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
