'use client'

import { useEffect, useState } from 'react'
import { Download, X } from 'lucide-react'

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
    try {
      if (localStorage.getItem(DISMISSAL_KEY) === 'true') {
        return
      }
    } catch {
      // localStorage may fail in restricted/private contexts
    }

    setIsDismissed(false)

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
    setIsDismissed(true)
    try {
      localStorage.setItem(DISMISSAL_KEY, 'true')
    } catch {
      // localStorage error fallback
    }
  }

  if (!deferredPrompt || isDismissed || isInstalled) {
    return null
  }

  return (
    <aside
      role="dialog"
      aria-label="Install Portfolio Progressive Web App"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm sm:left-auto sm:right-6 sm:bottom-6"
    >
      <div className="photo-print relative rounded-md border border-border p-4">
        <span
          aria-hidden
          className="tape absolute -top-2.5 left-8 h-5 w-20 rounded-[2px] [transform:rotate(-2deg)]"
        />

        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-[15px] font-semibold leading-snug">
              Keep this notebook in your pocket?
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Install it as an app for offline reading on your phone or desktop.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss installation prompt"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleInstallClick}
          className="mt-3.5 flex min-h-[40px] w-full items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98]"
        >
          <Download className="size-4" />
          <span>Install</span>
        </button>
      </div>
    </aside>
  )
}
