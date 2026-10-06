'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { X, SendHorizonal, Sparkles } from 'lucide-react'
import {
  CHARACTERS,
  CHARACTER_ORDER,
  getReply,
  type CharacterId,
} from '@/lib/companion-data'
import { cn } from '@/lib/utils'

interface ChatMessage {
  id: string
  sender: 'bot' | 'user'
  text: string
  time: string
}

interface CharacterTheme {
  accent: string
  avatarCrop: string
  typingLabel: string
  roleNote: string
  inputPlaceholder: string
}

const CHARACTER_THEMES: Record<CharacterId, CharacterTheme> = {
  joal: {
    accent: 'text-primary',
    avatarCrop: '50% 20%',
    typingLabel: 'Joal is thinking…',
    roleNote: 'the engineer himself',
    inputPlaceholder: 'Ask Joal about firmware, edge AI…',
  },
  rera: {
    accent: 'text-[#885629] dark:text-amber-300',
    avatarCrop: '32% 40%',
    typingLabel: 'Rera is batting at the keys…',
    roleNote: 'orange, chaos, no thoughts',
    inputPlaceholder: 'Offer Rera treats, or say hi…',
  },
  area: {
    accent: 'text-olive dark:text-olive',
    avatarCrop: '50% 24%',
    typingLabel: 'Area is considering it…',
    roleNote: 'tabby, naps, judgment',
    inputPlaceholder: 'Ask Area politely…',
  },
}

function getFormattedTime(): string {
  const d = new Date()
  const hours = d.getHours().toString().padStart(2, '0')
  const minutes = d.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

export function AiCompanion() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState<CharacterId>('joal')
  const [threads, setThreads] = useState<Record<CharacterId, ChatMessage[]>>({
    joal: [],
    rera: [],
    area: [],
  })
  const [hasGreeted, setHasGreeted] = useState<Record<CharacterId, boolean>>({
    joal: false,
    rera: false,
    area: false,
  })
  const [isTyping, setIsTyping] = useState(false)
  const [avatarReaction, setAvatarReaction] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [hasPwaPrompt, setHasPwaPrompt] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reactionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hintDismissedRef = useRef(false)

  // The greeting note waits until the opening spread has scrolled away
  // entirely — at every window size — so it can never settle on the hero's
  // reading matter, and it steps away again the moment the hero returns.
  useEffect(() => {
    const onScroll = () => {
      if (hintDismissedRef.current || isOpen) return
      const hero = document.getElementById('top')
      if (hero) {
        setShowHint(hero.getBoundingClientRect().bottom < 8)
      } else {
        setShowHint(window.scrollY > 600)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isOpen])

  // Listen for PWA prompt banner to dynamically adjust bottom offsets and avoid collision
  useEffect(() => {
    const checkPwa = () => {
      const el = document.querySelector('aside[aria-label="Install Portfolio Progressive Web App"]')
      setHasPwaPrompt(!!el)
    }
    checkPwa()
    const observer = new MutationObserver(checkPwa)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  const activeChar = CHARACTERS[activeId]
  const currentTheme = CHARACTER_THEMES[activeId]
  const currentMessages = threads[activeId] || []

  // Auto-scroll to newest message — inside the thread's own scroll area only,
  // never the page (and never on mount).
  const scrollToBottom = useCallback(() => {
    const box = messagesEndRef.current?.parentElement
    if (box) box.scrollTop = box.scrollHeight
  }, [])

  const hasScrolledRef = useRef(false)
  useEffect(() => {
    if (!hasScrolledRef.current) {
      hasScrolledRef.current = true
      return
    }
    if (isOpen) scrollToBottom()
  }, [currentMessages, isTyping, scrollToBottom, isOpen])

  // Trigger initial greeting when character is first viewed in open panel
  const triggerGreetingIfNeeded = useCallback(
    (charId: CharacterId) => {
      if (hasGreeted[charId]) return

      setIsTyping(true)
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)

      typingTimeoutRef.current = setTimeout(() => {
        const greetingMsg: ChatMessage = {
          id: `greet_${charId}_${Date.now()}`,
          sender: 'bot',
          text: CHARACTERS[charId].greeting,
          time: getFormattedTime(),
        }

        setThreads((prev) => ({
          ...prev,
          [charId]: [...(prev[charId] || []), greetingMsg],
        }))
        setHasGreeted((prev) => ({ ...prev, [charId]: true }))
        setIsTyping(false)

        setAvatarReaction(true)
        if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current)
        reactionTimeoutRef.current = setTimeout(() => setAvatarReaction(false), 400)
      }, 600)
    },
    [hasGreeted],
  )

  // When panel opens: trigger greeting if needed & focus input
  useEffect(() => {
    if (isOpen) {
      setShowHint(false)
      triggerGreetingIfNeeded(activeId)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 150)
    }
  }, [isOpen, activeId, triggerGreetingIfNeeded])

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
      if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current)
    }
  }, [])

  const handleSwitchCharacter = (targetId: CharacterId) => {
    if (targetId === activeId) return
    setActiveId(targetId)
    triggerGreetingIfNeeded(targetId)
  }

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend ?? inputValue).trim()
    if (!text || isTyping) return

    setInputValue('')

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text,
      time: getFormattedTime(),
    }

    setThreads((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), userMsg],
    }))

    setIsTyping(true)
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)

    const delay = 500 + Math.floor(Math.random() * 350)

    typingTimeoutRef.current = setTimeout(() => {
      const replyText = getReply(activeId, text)
      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: replyText,
        time: getFormattedTime(),
      }

      setThreads((prev) => ({
        ...prev,
        [activeId]: [...(prev[activeId] || []), botMsg],
      }))
      setIsTyping(false)

      setAvatarReaction(true)
      if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current)
      reactionTimeoutRef.current = setTimeout(() => setAvatarReaction(false), 400)
    }, delay)
  }

  return (
    <>
      {/* Launcher — a photo print taped to the corner of the page */}
      <div
        className={cn(
          'fixed z-50 transition-all duration-300 ease-out select-none',
          hasPwaPrompt ? 'companion-launcher-bottom-pwa' : 'companion-launcher-bottom',
          isOpen ? 'pointer-events-none opacity-0 scale-90' : 'pointer-events-auto opacity-100 scale-100',
        )}
      >
        {/* Welcome note — compact, hugging the corner, and gone near the top */}
        {showHint && (
          <aside
            role="status"
            aria-live="polite"
            className="animate-companion-hint-float pointer-events-auto absolute bottom-full right-0 mb-2 flex w-max max-w-[15rem] items-center gap-2 rounded-md border border-border bg-card px-3 py-2 shadow-page sm:max-w-xs"
          >
            <p className="marginalia min-w-0 text-base leading-tight">
              Joal &amp; the cats are in — tap the portrait
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                hintDismissedRef.current = true
                setShowHint(false)
              }}
              aria-label="Dismiss the companion hint"
              className="relative ml-1 inline-flex size-6 sm:size-4 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground touch-target-expand"
            >
              <X className="size-3" />
            </button>
          </aside>
        )}

        {/* Launcher button */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open the chat with Joal and his cats"
          aria-expanded={isOpen}
          className={cn(
            'photo-print group relative flex size-16 items-center justify-center rounded-md p-1.5',
            'transition-all duration-300 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          )}
        >
          <span
            aria-hidden
            className="tape absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 rounded-[2px] [transform:rotate(-2deg)]"
          />
          <div className="relative size-full overflow-hidden rounded-[2px]">
            <img
              src={activeChar.photo}
              alt={activeChar.name}
              className={cn(
                'size-full object-cover transition-transform duration-300 group-hover:scale-105',
                (activeId === 'rera' || activeId === 'area') && 'animate-companion-blink',
              )}
              style={{ objectPosition: currentTheme.avatarCrop }}
            />
          </div>
        </button>
      </div>

      {/* The chat — a pocket notebook in the corner */}
      <section
        ref={panelRef}
        role="dialog"
        aria-modal="false"
        aria-label="Chat with Joal and his cats"
        className={cn(
          'fixed z-50 flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 ease-out shadow-lift',
          'companion-panel-pos',
          isOpen
            ? 'pointer-events-auto opacity-100 scale-100 origin-bottom-right'
            : 'pointer-events-none opacity-0 scale-95 origin-bottom-right',
        )}
      >
        {/* Header */}
        <header className="relative shrink-0 border-b border-border bg-secondary/40 px-3.5 pb-2.5 pt-3 companion-header-compact">
          <span
            aria-hidden
            className="tape absolute -top-1 left-1/2 h-3.5 w-16 -translate-x-1/2 rounded-[2px] [transform:rotate(-1deg)]"
          />

          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <div
                className={cn(
                  'relative size-11 shrink-0 overflow-hidden rounded-full border border-border companion-avatar-compact',
                  avatarReaction ? 'animate-companion-pop' : 'animate-companion-bob',
                )}
              >
                <img
                  src={activeChar.photo}
                  alt={activeChar.name}
                  className={cn(
                    'size-full object-cover transition-transform duration-300',
                    (activeId === 'rera' || activeId === 'area') && 'animate-companion-blink',
                  )}
                  style={{ objectPosition: currentTheme.avatarCrop }}
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <h3 className="truncate text-[15px] font-bold leading-tight">
                    {activeChar.name}
                  </h3>
                  <span className={cn('truncate text-xs', currentTheme.accent)}>
                    {activeChar.species}
                  </span>
                </div>
                <p className="marginalia truncate text-base leading-tight">
                  {currentTheme.roleNote}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close the chat"
              className="relative inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring touch-target-expand"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Character switcher */}
          <div className="mt-3 flex items-center gap-1 rounded-md border border-border bg-card p-1">
            {CHARACTER_ORDER.map((id) => {
              const char = CHARACTERS[id]
              const isActive = activeId === id

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSwitchCharacter(id)}
                  aria-selected={isActive}
                  aria-label={`Switch to ${char.name} (${char.species})`}
                  className={cn(
                    'flex min-h-[38px] flex-1 items-center justify-center gap-1.5 rounded px-2 py-1.5 text-xs transition-colors',
                    isActive
                      ? 'bg-secondary font-semibold text-foreground'
                      : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground',
                  )}
                >
                  <span className="relative size-5 shrink-0 overflow-hidden rounded-full">
                    <img
                      src={char.photo}
                      alt=""
                      className="size-full object-cover"
                      style={{ objectPosition: CHARACTER_THEMES[id].avatarCrop }}
                    />
                  </span>
                  <span className="truncate">{char.name}</span>
                </button>
              )
            })}
          </div>
        </header>

        {/* Messages */}
        <div
          role="log"
          aria-live="polite"
          aria-label={`Conversation with ${activeChar.name}`}
          className="ruled flex-1 min-h-[70px] overflow-y-auto overscroll-contain px-3.5 py-3 sm:min-h-[100px]"
        >
          {currentMessages.map((msg) => {
            const isBot = msg.sender === 'bot'

            return (
              <div
                key={msg.id}
                className={cn('mb-3 flex flex-col', isBot ? 'items-start' : 'items-end')}
              >
                <div
                  className={cn(
                    'max-w-[85%] rounded-md px-3.5 py-2.5 text-[13px] leading-relaxed shadow-[0_1px_1px_color-mix(in_oklch,var(--graphite)_12%,transparent)]',
                    isBot
                      ? 'border border-border bg-secondary/50 text-foreground'
                      : 'bg-primary text-primary-foreground',
                  )}
                >
                  <p className="whitespace-pre-line break-words">{msg.text}</p>
                </div>

                <div className="mt-1 flex items-center gap-1.5 px-1 text-[10px] text-muted-foreground">
                  <span>{isBot ? activeChar.name : 'You'}</span>
                  <span aria-hidden>·</span>
                  <span className="measure">{msg.time}</span>
                </div>
              </div>
            )
          })}

          {isTyping && (
            <div className="animate-settle-soft mb-3 flex flex-col items-start">
              <div className="flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-3.5 py-2.5">
                <div className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-primary animate-companion-dot-1" />
                  <span className="size-1.5 rounded-full bg-primary animate-companion-dot-2" />
                  <span className="size-1.5 rounded-full bg-primary animate-companion-dot-3" />
                </div>
                <span className="text-xs text-muted-foreground">{currentTheme.typingLabel}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions + input */}
        <footer className="shrink-0 border-t border-border bg-secondary/30 p-2.5">
          <div className="mb-2 flex items-center gap-1.5 overflow-x-auto pb-1 overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="marginalia flex shrink-0 items-center gap-1 pl-0.5 text-base leading-none">
              <Sparkles className="size-3" />
              try:
            </span>

            {activeChar.suggestions.map((suggestion, idx) => (
              <button
                key={`${activeId}_sug_${idx}`}
                type="button"
                onClick={() => handleSendMessage(suggestion)}
                disabled={isTyping}
                aria-label={`Ask: ${suggestion}`}
                className={cn(
                  'min-h-[36px] shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground',
                  'transition-colors hover:border-primary/50 hover:text-foreground active:scale-95 disabled:opacity-50 disabled:pointer-events-none touch-target-expand',
                )}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex items-center gap-2"
          >
            <div className="relative min-w-0 flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={currentTheme.inputPlaceholder}
                disabled={isTyping}
                aria-label={`Message ${activeChar.name}`}
                className={cn(
                  'w-full rounded-md border border-border bg-card px-3.5 py-2.5 text-base text-foreground leading-normal sm:py-2 sm:text-[13px]',
                  'transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40',
                  'disabled:opacity-60',
                )}
              />
            </div>

            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
              className={cn(
                'inline-flex size-11 shrink-0 items-center justify-center rounded-md border transition-all duration-200 sm:size-9',
                inputValue.trim() && !isTyping
                  ? 'border-transparent bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95'
                  : 'border-border bg-secondary/50 text-muted-foreground opacity-50 cursor-not-allowed',
              )}
            >
              <SendHorizonal className="size-4" />
            </button>
          </form>
        </footer>
      </section>
    </>
  )
}
