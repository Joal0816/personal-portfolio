'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import {
  X,
  SendHorizonal,
  Sparkles,
  Bot,
  Radio,
  Terminal,
  Volume2,
  VolumeX,
} from 'lucide-react'
import {
  CHARACTERS,
  CHARACTER_ORDER,
  getReply,
  type CharacterId,
} from '@/lib/companion-data'
import { cyberAudio } from '@/lib/cyber-sound'
import { cn } from '@/lib/utils'

interface ChatMessage {
  id: string
  sender: 'bot' | 'user'
  text: string
  time: string
}

interface CharacterTheme {
  accentColor: string
  glowColor: string
  borderColor: string
  badgeBorder: string
  badgeBg: string
  badgeText: string
  botBubbleBg: string
  botBubbleBorder: string
  botBubbleText: string
  avatarCrop: string
  typingLabel: string
  statusCallsign: string
  inputPlaceholder: string
}

const CHARACTER_THEMES: Record<CharacterId, CharacterTheme> = {
  joal: {
    accentColor: '#06b6d4', // cyan-500
    glowColor: 'rgba(6, 182, 212, 0.35)',
    borderColor: 'border-cyan-500/40',
    badgeBorder: 'border-cyan-500/30',
    badgeBg: 'bg-cyan-500/10',
    badgeText: 'text-cyan-400',
    botBubbleBg: 'bg-[#061822]/90',
    botBubbleBorder: 'border-cyan-500/35',
    botBubbleText: 'text-cyan-50',
    avatarCrop: '50% 20%',
    typingLabel: 'Joal is analyzing...',
    statusCallsign: 'JOAL // EMBEDDED_SYS',
    inputPlaceholder: 'Ask Joal about firmware, Edge AI...',
  },
  rera: {
    accentColor: '#f59e0b', // amber-500
    glowColor: 'rgba(245, 158, 11, 0.35)',
    borderColor: 'border-amber-500/40',
    badgeBorder: 'border-amber-500/30',
    badgeBg: 'bg-amber-500/10',
    badgeText: 'text-amber-400',
    botBubbleBg: 'bg-[#211304]/90',
    botBubbleBorder: 'border-amber-500/35',
    botBubbleText: 'text-amber-50',
    avatarCrop: '32% 40%',
    typingLabel: 'Rera is batting at keys...',
    statusCallsign: 'RERA // ORANGE_CHAOS',
    inputPlaceholder: 'Offer Rera tuna, treats, or say hi...',
  },
  area: {
    accentColor: '#10b981', // emerald-500
    glowColor: 'rgba(16, 185, 129, 0.35)',
    borderColor: 'border-emerald-500/40',
    badgeBorder: 'border-emerald-500/30',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-400',
    botBubbleBg: 'bg-[#041a13]/90',
    botBubbleBorder: 'border-emerald-500/35',
    botBubbleText: 'text-emerald-50',
    avatarCrop: '50% 24%',
    typingLabel: 'Area is contemplating...',
    statusCallsign: 'AREA // TABBY_SUPERVISOR',
    inputPlaceholder: 'Inquire politely with Area...',
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
  const [showHint, setShowHint] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reactionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const activeChar = CHARACTERS[activeId]
  const currentTheme = CHARACTER_THEMES[activeId]
  const currentMessages = threads[activeId] || []

  // Safe audio trigger
  const playSound = useCallback(
    (action: 'click' | 'tap') => {
      if (!soundEnabled) return
      try {
        if (action === 'click') cyberAudio.click(0.03)
        if (action === 'tap') cyberAudio.keyTap(0.025)
      } catch {
        // Audio API may be restricted
      }
    },
    [soundEnabled],
  )

  // Auto-scroll to newest message
  const scrollToBottom = useCallback((smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: smooth ? 'smooth' : 'auto',
        block: 'end',
      })
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [currentMessages, isTyping, scrollToBottom])

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

        // Trigger bot avatar pop reaction
        setAvatarReaction(true)
        if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current)
        reactionTimeoutRef.current = setTimeout(() => setAvatarReaction(false), 400)
      }, 600)
    },
    [hasGreeted],
  )

  // When panel opens: trigger Joal greeting if not yet greeted & focus input
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
        playSound('click')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, playSound])

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
      if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current)
    }
  }, [])

  // Character switch handler
  const handleSwitchCharacter = (targetId: CharacterId) => {
    if (targetId === activeId) return
    playSound('click')
    setActiveId(targetId)
    triggerGreetingIfNeeded(targetId)
  }

  // Send message
  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend ?? inputValue).trim()
    if (!text || isTyping) return

    playSound('tap')
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

    // AI typing delay: 500ms - 850ms
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

      // Pop avatar reaction
      setAvatarReaction(true)
      if (reactionTimeoutRef.current) clearTimeout(reactionTimeoutRef.current)
      reactionTimeoutRef.current = setTimeout(() => setAvatarReaction(false), 400)
    }, delay)
  }

  return (
    <>
      {/* ====================================================================
          LAUNCHER BUTTON & FLOATING HINT (Positioned safely above bottom dock)
          Mobile: bottom-20 (80px), Desktop: bottom-6 (24px)
          ==================================================================== */}
      <div
        className={cn(
          'fixed z-50 transition-all duration-300 ease-out select-none',
          'bottom-20 right-4 sm:bottom-6 sm:right-6',
          isOpen ? 'pointer-events-none opacity-0 scale-90' : 'pointer-events-auto opacity-100 scale-100',
        )}
      >
        {/* Floating Unread / Welcome Hint Bubble */}
        {showHint && (
          <aside
            role="status"
            aria-live="polite"
            className="animate-companion-hint-float pointer-events-auto absolute -top-13 right-0 sm:right-1 flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-[#0a0e17]/95 px-3 py-1.5 text-xs text-foreground shadow-[0_0_18px_rgba(6,182,212,0.25)] backdrop-blur-xl whitespace-nowrap"
          >
            <div className="flex items-center gap-1.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[11px] font-bold tracking-wider text-cyan-400">
                AI UPLINK:
              </span>
              <span className="font-sans text-[11px] text-muted-foreground">
                Chat with Joal & cats
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setShowHint(false)
                playSound('click')
              }}
              aria-label="Dismiss AI companion hint"
              className="ml-1 inline-flex size-4 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/60"
            >
              <X className="size-3" />
            </button>

            {/* Downward triangle pointer */}
            <span className="absolute -bottom-1.5 right-6 size-0 border-x-4 border-x-transparent border-t-4 border-t-cyan-500/40" />
          </aside>
        )}

        {/* Circular Floating Launcher Button (Touch target >= 44px, 56px size) */}
        <button
          type="button"
          onClick={() => {
            playSound('click')
            setIsOpen(true)
          }}
          aria-label="Open AI virtual companion chat"
          aria-expanded={isOpen}
          className={cn(
            'group relative flex size-14 items-center justify-center rounded-full',
            'border bg-[#0a0e17]/90 backdrop-blur-xl transition-all duration-300',
            'hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400',
          )}
          style={{
            borderColor: currentTheme.accentColor,
            boxShadow: `0 0 20px -2px ${currentTheme.glowColor}, 0 4px 14px rgba(0,0,0,0.5)`,
          }}
        >
          {/* Subtle radar ping pulse ring */}
          <span
            className="animate-companion-radar-ping pointer-events-none absolute inset-0 rounded-full border opacity-50"
            style={{ borderColor: currentTheme.accentColor }}
          />

          {/* Avatar thumbnail preview */}
          <div className="relative size-11 overflow-hidden rounded-full border border-background/60">
            <img
              src={activeChar.photo}
              alt={activeChar.name}
              className={cn(
                'size-full object-cover transition-transform duration-300 group-hover:scale-110',
                (activeId === 'rera' || activeId === 'area') && 'animate-companion-blink',
              )}
              style={{ objectPosition: currentTheme.avatarCrop }}
            />
          </div>

          {/* Online green indicator badge */}
          <span className="absolute bottom-0 right-0 flex size-3.5 items-center justify-center rounded-full bg-background border border-border">
            <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
          </span>

          {/* AI Uplink Mini Label Tag */}
          <span
            className="absolute -top-1.5 -left-1 rounded-full border bg-[#0a0e17] px-1.5 py-0.2 font-mono text-[9px] font-bold tracking-wider"
            style={{
              borderColor: currentTheme.accentColor,
              color: currentTheme.accentColor,
            }}
          >
            AI
          </span>
        </button>
      </div>

      {/* ====================================================================
          EXPANDED COMPANION CHAT PANEL
          Position:
            Mobile: fixed bottom-20 left-3 right-3 (sits cleanly above bottom dock)
            Desktop: fixed bottom-6 right-6 w-[390px] h-[570px]
          ==================================================================== */}
      <section
        ref={panelRef}
        role="dialog"
        aria-modal="false"
        aria-label="AI Virtual Companion Chat"
        className={cn(
          'fixed z-50 flex flex-col overflow-hidden rounded-2xl',
          'border bg-[#0a0e17]/95 backdrop-blur-2xl transition-all duration-300 ease-out',
          'bottom-20 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6',
          'w-auto sm:w-[390px] h-[min(570px,calc(100dvh-6.5rem))]',
          isOpen
            ? 'pointer-events-auto opacity-100 scale-100 origin-bottom-right'
            : 'pointer-events-none opacity-0 scale-95 origin-bottom-right',
        )}
        style={{
          borderColor: currentTheme.accentColor,
          boxShadow: `0 0 35px -5px ${currentTheme.glowColor}, 0 20px 40px rgba(0,0,0,0.85)`,
        }}
      >
        {/* HUD Corner Tech Accents (4 crisp bracket corners matching active character) */}
        <span
          className="pointer-events-none absolute -top-px -left-px h-3.5 w-3.5 border-t-2 border-l-2 transition-colors duration-300"
          style={{ borderColor: currentTheme.accentColor }}
        />
        <span
          className="pointer-events-none absolute -top-px -right-px h-3.5 w-3.5 border-t-2 border-r-2 transition-colors duration-300"
          style={{ borderColor: currentTheme.accentColor }}
        />
        <span
          className="pointer-events-none absolute -bottom-px -left-px h-3.5 w-3.5 border-b-2 border-l-2 transition-colors duration-300"
          style={{ borderColor: currentTheme.accentColor }}
        />
        <span
          className="pointer-events-none absolute -bottom-px -right-px h-3.5 w-3.5 border-b-2 border-r-2 transition-colors duration-300"
          style={{ borderColor: currentTheme.accentColor }}
        />

        {/* Ambient Top Glow Laser Gradient */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-25 transition-opacity"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${currentTheme.accentColor} 0%, transparent 70%)`,
          }}
        />

        {/* ==================================================================
            HEADER: Status Line, Telemetry, Active Avatar & Character Switcher
            ================================================================== */}
        <header className="relative z-10 border-b border-border/70 bg-card/40 px-3.5 pt-3 pb-2.5 backdrop-blur-md">
          {/* Top Telemetry & Controls Row */}
          <div className="flex items-center justify-between pb-2 border-b border-border/40 text-[10px] font-mono">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-bold text-foreground">LINK ESTABLISHED</span>
              <span className="text-border">•</span>
              <span className="hidden sm:inline" style={{ color: currentTheme.accentColor }}>
                LOW_LATENCY // 12ms
              </span>
            </div>

            <div className="flex items-center gap-1">
              {/* Audio toggle button */}
              <button
                type="button"
                onClick={() => {
                  setSoundEnabled((v) => !v)
                  playSound('click')
                }}
                aria-label={soundEnabled ? 'Mute companion sound effects' : 'Enable companion sound effects'}
                className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary/60 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                {soundEnabled ? <Volume2 className="size-3.5" /> : <VolumeX className="size-3.5" />}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  playSound('click')
                  setIsOpen(false)
                }}
                aria-label="Close AI virtual companion"
                className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary/60 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Active Character Profile Row */}
          <div className="mt-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Circular Avatar with Idle Bob & Pop Reaction */}
              <div
                className={cn(
                  'relative size-12 shrink-0 rounded-full border-2 p-0.5 transition-all duration-300',
                  avatarReaction ? 'animate-companion-pop' : 'animate-companion-bob',
                )}
                style={{
                  borderColor: currentTheme.accentColor,
                  boxShadow: `0 0 14px -1px ${currentTheme.glowColor}`,
                }}
              >
                <div className="size-full overflow-hidden rounded-full bg-background">
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
              </div>

              {/* Character Identity & Callsign */}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold tracking-tight text-foreground truncate">
                    {activeChar.name}
                  </h3>
                  <span
                    className={cn(
                      'rounded px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider',
                      currentTheme.badgeBg,
                      currentTheme.badgeText,
                    )}
                  >
                    {activeChar.species}
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-1 font-mono text-[10px] text-muted-foreground truncate">
                  <Terminal className="size-2.5 shrink-0" style={{ color: currentTheme.accentColor }} />
                  <span className="truncate">{currentTheme.statusCallsign}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Character Switcher Tabs */}
          <div className="mt-2.5 flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/60 p-1">
            {CHARACTER_ORDER.map((id) => {
              const char = CHARACTERS[id]
              const theme = CHARACTER_THEMES[id]
              const isActive = activeId === id

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSwitchCharacter(id)}
                  aria-selected={isActive}
                  aria-label={`Switch companion to ${char.name} (${char.species})`}
                  className={cn(
                    'flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-mono transition-all',
                    isActive
                      ? 'bg-secondary text-foreground font-semibold shadow-sm'
                      : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground',
                  )}
                  style={{
                    border: isActive ? `1px solid ${theme.accentColor}` : '1px solid transparent',
                  }}
                >
                  <div
                    className="relative size-4.5 shrink-0 overflow-hidden rounded-full border"
                    style={{ borderColor: isActive ? theme.accentColor : 'transparent' }}
                  >
                    <img
                      src={char.photo}
                      alt={char.name}
                      className="size-full object-cover"
                      style={{ objectPosition: theme.avatarCrop }}
                    />
                  </div>
                  <span className="text-[11px] truncate">{char.name}</span>
                </button>
              )
            })}
          </div>
        </header>

        {/* ==================================================================
            MESSAGES CONTAINER
            role="log", aria-live="polite", character-themed bubbles
            ================================================================== */}
        <div
          role="log"
          aria-live="polite"
          aria-label={`Conversation with ${activeChar.name}`}
          className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 tech-grid"
          style={{ backgroundSize: '1.75rem 1.75rem' }}
        >
          {/* Welcome telemetry notice */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-1 rounded border border-border/60 bg-secondary/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground/80">
              <Radio className="size-2.5" style={{ color: currentTheme.accentColor }} />
              <span>THREAD_ID: {activeId.toUpperCase()}_SESSION</span>
            </span>
          </div>

          {/* Render Thread Messages */}
          {currentMessages.map((msg) => {
            const isBot = msg.sender === 'bot'

            return (
              <div
                key={msg.id}
                className={cn('flex flex-col', isBot ? 'items-start' : 'items-end')}
              >
                {/* Message Bubble */}
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed transition-all shadow-sm',
                    isBot
                      ? cn('rounded-tl-xs border', currentTheme.botBubbleBg, currentTheme.botBubbleBorder, currentTheme.botBubbleText)
                      : 'rounded-tr-xs border border-border/80 bg-secondary/80 text-foreground',
                  )}
                >
                  <p className="whitespace-pre-line break-words">{msg.text}</p>
                </div>

                {/* Subtitle / Timestamp */}
                <div className="mt-1 flex items-center gap-1 px-1 font-mono text-[9px] text-muted-foreground/70">
                  <span>{isBot ? activeChar.name.toUpperCase() : 'YOU'}</span>
                  <span>•</span>
                  <span>{msg.time}</span>
                </div>
              </div>
            )
          })}

          {/* Typing Indicator Bubble */}
          {isTyping && (
            <div className="flex flex-col items-start animate-fade-in">
              <div
                className={cn(
                  'flex items-center gap-2 rounded-2xl rounded-tl-xs border px-3.5 py-2.5 text-xs shadow-sm',
                  currentTheme.botBubbleBg,
                  currentTheme.botBubbleBorder,
                  currentTheme.botBubbleText,
                )}
              >
                {/* 3 Animated Bouncing Dots */}
                <div className="flex items-center gap-1">
                  <span
                    className="size-1.5 rounded-full animate-companion-dot-1"
                    style={{ backgroundColor: currentTheme.accentColor }}
                  />
                  <span
                    className="size-1.5 rounded-full animate-companion-dot-2"
                    style={{ backgroundColor: currentTheme.accentColor }}
                  />
                  <span
                    className="size-1.5 rounded-full animate-companion-dot-3"
                    style={{ backgroundColor: currentTheme.accentColor }}
                  />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {currentTheme.typingLabel}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ==================================================================
            FOOTER: Suggestion Chips & Text Input
            ================================================================== */}
        <footer className="relative z-10 border-t border-border/70 bg-card/50 p-2.5 backdrop-blur-md">
          {/* Quick Suggestion Chips */}
          <div className="mb-2 flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <span className="shrink-0 flex items-center gap-1 pl-0.5 text-[10px] font-mono text-muted-foreground/80">
              <Sparkles className="size-2.5" style={{ color: currentTheme.accentColor }} />
              <span>PROMPTS:</span>
            </span>

            {activeChar.suggestions.map((suggestion, idx) => (
              <button
                key={`${activeId}_sug_${idx}`}
                type="button"
                onClick={() => handleSendMessage(suggestion)}
                disabled={isTyping}
                aria-label={`Ask: ${suggestion}`}
                className={cn(
                  'shrink-0 rounded-full border border-border/80 bg-secondary/50 px-2.5 py-1 font-mono text-[10px] text-muted-foreground',
                  'transition-all hover:bg-secondary hover:text-foreground active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
                )}
                style={{
                  borderColor: undefined,
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Text Input Row */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={currentTheme.inputPlaceholder}
                disabled={isTyping}
                aria-label={`Message ${activeChar.name}`}
                className={cn(
                  'w-full rounded-xl border border-border/80 bg-background/80 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60',
                  'transition-colors focus:border-cyan-500/80 focus:bg-background focus:outline-none focus:ring-1 focus:ring-cyan-500/50',
                  'disabled:opacity-60',
                )}
              />
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message to AI companion"
              className={cn(
                'inline-flex size-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-200',
                inputValue.trim() && !isTyping
                  ? 'border-transparent text-black shadow-md hover:scale-105 active:scale-95'
                  : 'border-border/60 bg-secondary/40 text-muted-foreground opacity-40 cursor-not-allowed',
              )}
              style={{
                backgroundColor: inputValue.trim() && !isTyping ? currentTheme.accentColor : undefined,
                boxShadow:
                  inputValue.trim() && !isTyping
                    ? `0 0 14px -2px ${currentTheme.glowColor}`
                    : undefined,
              }}
            >
              <SendHorizonal className="size-4" />
            </button>
          </form>
        </footer>
      </section>
    </>
  )
}
