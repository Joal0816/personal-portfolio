'use client'

import { useEffect, useState } from 'react'
import { Download, X, Terminal } from 'lucide-react'
import { cyberAudio } from '@/lib/cyber-sound'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

const DISMISSAL_KEY = 'jv_pwa_install_dismissed'

export function InstallPwa() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isDismissed, setIsDismissed] = useState(true)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if previously dismissed
    try {
      if (localStorage.getItem(DISMISSAL_KEY) === 'true') {
        return
      }
    } catch {
      // localStorage may fail in restricted/private contexts
    }

    setIsDismissed(false)

    // Check if already in standalone mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true

    if (isStandalone) {
      setIsInstalled(true)
      return
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    cyberAudio.click()
    if (!deferredPrompt) return

    await deferredPrompt.prompt()
    try {
      const choice = await deferredPrompt.userChoice
      if (choice.outcome === 'accepted') {
        setIsInstalled(true)
      }
    } catch {
      // Prompt interaction failed or canceled
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    cyberAudio.click()
    setIsDismissed(true)
    try {
      localStorage.setItem(DISMISSAL_KEY, 'true')
    } catch {
      // localStorage error fallback
    }
  }

  // Hidden until prompt is available, hidden after install, hidden if dismissed or unsupported
  if (!deferredPrompt || isDismissed || isInstalled) {
    return null
  }

  return (
    <aside
      role="dialog"
      aria-label="Install Portfolio Progressive Web App"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm rounded-xl border border-cyan-500/40 bg-[#0a0e17]/95 p-4 text-foreground shadow-[0_0_25px_rgba(6,182,212,0.25)] backdrop-blur-xl sm:left-auto sm:right-6 sm:bottom-6"
    >
      {/* HUD Corner Tech Accents */}
      <span className="pointer-events-none absolute -top-px -left-px h-2.5 w-2.5 border-t-2 border-l-2 border-cyan-400" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-2.5 w-2.5 border-b-2 border-r-2 border-cyan-400" />

      {/* Top Status Header */}
      <div className="flex items-center justify-between gap-2 border-b border-cyan-500/20 pb-2">
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="relative flex size-2 items-center justify-center">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="font-bold text-cyan-400">STATUS:</span>
          <span className="text-muted-foreground">SYS_ONLINE</span>
          <span className="text-border/80">•</span>
          <span className="hidden items-center gap-1 text-[10px] text-cyan-400/80 sm:inline-flex">
            <Terminal className="size-2.5" />
            <span>PWA_READY</span>
          </span>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss installation prompt"
          className="rounded p-1 text-muted-foreground transition-colors hover:bg-cyan-500/10 hover:text-cyan-400"
        >
          <X className="size-3.5" />
        </button>
      </div>

      {/* Body Readout */}
      <div className="mt-2.5 space-y-1">
        <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-300">
          Standalone App Available
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Install the portfolio for instant desktop &amp; mobile access with offline capability.
        </p>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={handleInstallClick}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-500 px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.55)] active:scale-[0.98]"
      >
        <Download className="size-3.5" />
        <span>INSTALL PORTFOLIO</span>
      </button>
    </aside>
  )
}
