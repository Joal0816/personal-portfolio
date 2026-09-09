'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

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
      <div className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-secondary/40" />
    )
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-secondary/40 text-foreground transition-all duration-200 hover:bg-accent hover:text-accent-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {theme === 'dark' ? (
        <Sun className="size-4 transition-transform duration-200" />
      ) : (
        <Moon className="size-4 transition-transform duration-200" />
      )}
    </button>
  )
}
