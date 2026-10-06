'use client'

import { useEffect, useState } from 'react'
import { Lamp, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
    setTheme(stored)
    document.documentElement.classList.add(stored)
  }, [])

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(next)
    localStorage.setItem('theme', next)
  }

  // Prevent hydration mismatch by rendering nothing until mounted
  if (!mounted) {
    return (
      <div className="inline-flex size-10 sm:size-9 items-center justify-center rounded-md border border-border bg-secondary/40" />
    )
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme === 'dark'
          ? 'Switch to daylight page (light mode)'
          : 'Switch to lamp light (dark mode)'
      }
      title={theme === 'dark' ? 'Daylight page' : 'Under the lamp'}
      className="inline-flex size-10 sm:size-9 items-center justify-center rounded-md border border-border bg-card text-foreground transition-all duration-200 hover:border-primary/50 hover:text-primary active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {theme === 'dark' ? (
        <Sun className="size-4 transition-transform duration-200" />
      ) : (
        <Lamp className="size-4 transition-transform duration-200" />
      )}
    </button>
  )
}
