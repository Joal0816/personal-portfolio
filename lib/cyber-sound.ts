/**
 * Cyber Web Audio Synthesizer
 * Generates tactile digital hardware audio feedback using pure Web Audio API.
 * No external audio files or network requests required.
 */

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

export const cyberAudio = {
  // Mechanical micro-switch tactile click
  click: (volume = 0.04) => {
    try {
      const ctx = getAudioContext()
      if (!ctx) return
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(1200, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.02)

      gain.gain.setValueAtTime(volume, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.03)
    } catch {
      // Audio context may be restricted
    }
  },

  // Soft digital terminal keystroke
  keyTap: (volume = 0.03) => {
    try {
      const ctx = getAudioContext()
      if (!ctx) return
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(880, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.015)

      gain.gain.setValueAtTime(volume, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.02)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.02)
    } catch {}
  },

  // GPIO Pin Toggle (pitch based on state: high = 960Hz, low = 480Hz)
  pinToggle: (stateHigh: boolean, volume = 0.04) => {
    try {
      const ctx = getAudioContext()
      if (!ctx) return
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'square'
      const freq = stateHigh ? 920 : 460
      osc.frequency.setValueAtTime(freq, ctx.currentTime)

      gain.gain.setValueAtTime(volume * 0.5, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.04)
    } catch {}
  },

  // Packet burst for UART / SPI transmission
  packetBurst: (volume = 0.035) => {
    try {
      const ctx = getAudioContext()
      if (!ctx) return
      const now = ctx.currentTime

      const freqs = [1046, 1318, 1567] // C6, E6, G6
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.02)

        gain.gain.setValueAtTime(0, now + idx * 0.02)
        gain.gain.linearRampToValueAtTime(volume, now + idx * 0.02 + 0.005)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.02 + 0.025)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now + idx * 0.02)
        osc.stop(now + idx * 0.02 + 0.03)
      })
    } catch {}
  },

  // Benchmark complete chime
  benchmarkSuccess: (volume = 0.05) => {
    try {
      const ctx = getAudioContext()
      if (!ctx) return
      const now = ctx.currentTime

      const notes = [659, 880, 1320] // E5, A5, E6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.06)

        gain.gain.setValueAtTime(volume, now + idx * 0.06)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.12)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now + idx * 0.06)
        osc.stop(now + idx * 0.06 + 0.14)
      })
    } catch {}
  },

  // Audio system engaged confirmation
  systemEngaged: (volume = 0.05) => {
    try {
      const ctx = getAudioContext()
      if (!ctx) return
      const now = ctx.currentTime

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(440, now)
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08)

      gain.gain.setValueAtTime(volume, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.1)
    } catch {}
  },
}
