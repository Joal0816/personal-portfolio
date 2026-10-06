'use client'

import { useState, useEffect } from 'react'
import {
  NotebookPen,
  Cpu,
  Activity,
  Zap,
  Play,
  Sliders,
  Gauge,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type PlaygroundTab = 'cli' | 'pinout' | 'protocol' | 'ai_bench' | 'telemetry'

type NoteKind = 'board' | 'pins' | 'tasks' | 'ai' | 'sensors' | 'who'

type GpioPin = {
  id: string
  name: string
  label: string
  mode: 'OUTPUT' | 'INPUT' | 'PWM' | 'I2C' | 'UART'
  state: boolean
  voltage: string
}

export function HardwarePlayground() {
  const [activeTab, setActiveTab] = useState<PlaygroundTab>('cli')
  const [clockFreq, setClockFreq] = useState<'8MHz' | '16MHz' | '72MHz' | '240MHz'>('72MHz')
  const [pwmDuty, setPwmDuty] = useState(65)
  const [selectedProtocol, setSelectedProtocol] = useState<'I2C' | 'SPI' | 'UART'>('I2C')
  const [baudRate, setBaudRate] = useState<number>(115200)
  const [streamingActive, setStreamingActive] = useState(true)

  // Pin state
  const [pins, setPins] = useState<GpioPin[]>([
    { id: 'pa5', name: 'PA5', label: 'USER_LED_01', mode: 'OUTPUT', state: true, voltage: '3.3V' },
    { id: 'pc13', name: 'PC13', label: 'BOARD_STATUS', mode: 'OUTPUT', state: false, voltage: '0.0V' },
    { id: 'pa8', name: 'PA8', label: 'TIM1_CH1_PWM', mode: 'PWM', state: true, voltage: '2.14V' },
    { id: 'pb6', name: 'PB6', label: 'I2C1_SCL', mode: 'I2C', state: true, voltage: '3.3V' },
    { id: 'pb7', name: 'PB7', label: 'I2C1_SDA', mode: 'I2C', state: false, voltage: '0.0V' },
    { id: 'pa9', name: 'PA9', label: 'USART1_TX', mode: 'UART', state: true, voltage: '3.3V' },
    { id: 'pa10', name: 'PA10', label: 'USART1_RX', mode: 'UART', state: false, voltage: '0.0V' },
    { id: 'pb12', name: 'PB12', label: 'SPI2_NSS', mode: 'OUTPUT', state: true, voltage: '3.3V' },
  ])

  function togglePin(id: string) {
    setPins((prev) =>
      prev.map((pin) => {
        if (pin.id === id) {
          const nextState = !pin.state
          return {
            ...pin,
            state: nextState,
            voltage: nextState ? '3.3V' : '0.0V',
          }
        }
        return pin
      })
    )
  }

  // Bench notes — the fold-out notebook page for this board. Poke a reading
  // and it gets written down here: measurements on ruled paper, no console.
  const [notes, setNotes] = useState<Array<{ id: number; kind: NoteKind }>>([
    { id: 1, kind: 'board' },
  ])

  function writeNote(kind: NoteKind) {
    setNotes((prev) => [{ id: Date.now(), kind }, ...prev.filter((n) => n.kind !== kind)])
  }

  function freshPage() {
    setNotes([{ id: Date.now(), kind: 'board' }])
  }

  // Protocol Packet State
  const [packetLog, setPacketLog] = useState<Array<{ id: number; proto: string; hex: string; desc: string; time: string }>>([
    { id: 1, proto: 'I2C', hex: '0x33 0x02 0x1A 0xFF [ACK]', desc: 'MLX90640 subpage 0 frame read', time: '12:00:01.204' },
    { id: 2, proto: 'UART', hex: '$GPGGA,120002.00,0813.68,N,12414.71,E,1,08,1.0*42', desc: 'NMEA GPS telemetry packet', time: '12:00:02.100' },
  ])
  const [isInjecting, setIsInjecting] = useState(false)

  function injectPacket() {
    setIsInjecting(true)

    const id = Date.now()
    const now = new Date()
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds()}`

    let hex = ''
    let desc = ''

    if (selectedProtocol === 'I2C') {
      const randVal = Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0')
      hex = `[START] 0x33 0x04 0x${randVal} 0xAA [ACK] [STOP]`
      desc = `I2C read register 0x04 → sensor byte 0x${randVal}`
    } else if (selectedProtocol === 'SPI') {
      const b1 = Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0')
      const b2 = Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0')
      hex = `MOSI: [0x40 0x${b1} 0x${b2}] | MISO: [0x00 0xFF 0x12]`
      desc = 'SPI SSD1306 display DMA frame sync'
    } else {
      hex = `[SOF] 0x55 0xAA [LEN:08] [TEMP:38.2C] [CRC:OK]`
      desc = `UART serial telemetry frame @ ${baudRate} bps`
    }

    setTimeout(() => {
      setPacketLog((prev) => [{ id, proto: selectedProtocol, hex, desc, time: timeStr }, ...prev.slice(0, 7)])
      setIsInjecting(false)
    }, 180)
  }

  // Edge AI Benchmark State
  const [benchRunning, setBenchRunning] = useState(false)
  const [benchProgress, setBenchProgress] = useState(0)
  const [benchResults, setBenchResults] = useState<{
    latency: number
    fps: number
    particlesDetected: number
    confidence: number
    memory: string
  } | null>({
    latency: 21.4,
    fps: 46.7,
    particlesDetected: 7,
    confidence: 96.8,
    memory: '4.1 MB',
  })

  // ARUGA Fall state simulator
  const [fallPitch, setFallPitch] = useState(18)
  const [fallDropVel, setFallDropVel] = useState(0.8)

  function runAiBenchmark() {
    setBenchRunning(true)
    setBenchProgress(0)

    const interval = setInterval(() => {
      setBenchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setBenchRunning(false)
          setBenchResults({
            latency: +(17 + Math.random() * 6).toFixed(1),
            fps: +(42 + Math.random() * 12).toFixed(1),
            particlesDetected: Math.floor(4 + Math.random() * 8),
            confidence: +(94 + Math.random() * 5).toFixed(1),
            memory: '4.1 MB INT8',
          })
          return 100
        }
        return prev + 20
      })
    }, 70)
  }

  // Real-time sensor simulation
  const [sensorValues, setSensorValues] = useState({
    coreTemp: 38.4,
    busVoltage: 3.308,
    freeRtosTick: 312940,
    freeHeap: 48.2,
  })

  const [spectrumBars, setSpectrumBars] = useState<number[]>([
    25, 40, 65, 80, 50, 30, 45, 75, 90, 60, 40, 70, 85, 55, 35, 60, 70, 45, 30, 50, 65, 40, 25, 35,
  ])

  useEffect(() => {
    if (!streamingActive) return
    const interval = setInterval(() => {
      setSensorValues((v) => ({
        coreTemp: +(38.2 + Math.sin(Date.now() / 2000) * 0.8).toFixed(1),
        busVoltage: +(3.305 + Math.random() * 0.008).toFixed(3),
        freeRtosTick: v.freeRtosTick + 10,
        freeHeap: +(48.0 + Math.random() * 0.4).toFixed(1),
      }))

      setSpectrumBars((bars) =>
        bars.map((_, i) => Math.floor(20 + Math.abs(Math.sin((Date.now() / 700) + i * 0.4) * 65) + Math.random() * 15))
      )
    }, 600)
    return () => clearInterval(interval)
  }, [streamingActive])

  // Derive fall classification
  const isFallAlert = fallPitch > 60 && fallDropVel > 2.5
  const isFallWarning = (fallPitch > 45 || fallDropVel > 1.8) && !isFallAlert

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-page">
      {/* Header — a tape label on the fold-out sheet */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-secondary/40 px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-card text-primary">
            <Cpu className="size-4" />
          </div>
          <div>
            <p className="text-[15px] font-semibold leading-tight">
              A little hardware bench you can poke at
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              A simulated microcontroller board — same interfaces as the real
              thing, nothing to break.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-muted-foreground sm:inline">clock</span>
          <div className="flex items-center rounded-md border border-border bg-card p-0.5">
            {(['8MHz', '16MHz', '72MHz', '240MHz'] as const).map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() => setClockFreq(freq)}
                className={cn(
                  'measure min-h-[32px] rounded px-2 py-1 text-[11px] transition-colors',
                  clockFreq === freq
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {freq}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="scroll-strip flex border-b border-border px-2 pt-1 sm:px-4"
        role="tablist"
        aria-label="Bench tools"
      >
        {[
          { id: 'cli', label: 'Bench notes', icon: NotebookPen },
          { id: 'pinout', label: 'Pins & PWM', icon: Sliders },
          { id: 'protocol', label: 'Wire traffic', icon: Activity },
          { id: 'ai_bench', label: 'AI benchmarks', icon: Sparkles },
          { id: 'telemetry', label: 'Live readings', icon: Gauge },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-active={isActive}
              onClick={() => setActiveTab(tab.id as PlaygroundTab)}
              className={cn(
                'index-tab flex min-h-[42px] shrink-0 items-center gap-1.5 whitespace-nowrap px-3.5 py-2 text-[13px] transition-colors',
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="size-3.5" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab body */}
      <div className="min-h-[360px] p-4 sm:p-6">
        {/* TAB 1: BENCH NOTES */}
        {activeTab === 'cli' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="marginalia mr-1 text-lg leading-none">poke a reading:</span>
              {[
                { kind: 'board' as const, label: 'What’s on the board' },
                { kind: 'pins' as const, label: 'Pin register' },
                { kind: 'tasks' as const, label: 'Task load' },
                { kind: 'ai' as const, label: 'AI timing' },
                { kind: 'sensors' as const, label: 'Sensor log' },
                { kind: 'who' as const, label: 'Who built this' },
              ].map((spot) => (
                <button
                  key={spot.kind}
                  type="button"
                  onClick={() => writeNote(spot.kind)}
                  className="min-h-[32px] rounded-sm border border-border bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  {spot.label}
                </button>
              ))}
              {notes.length > 1 && (
                <button
                  type="button"
                  onClick={freshPage}
                  className="pencil-underline ml-1 text-xs text-muted-foreground"
                  data-active="true"
                >
                  fresh page
                </button>
              )}
            </div>

            <div className="quadrille max-h-[320px] min-h-[240px] space-y-3 overflow-y-auto rounded-md border border-border bg-secondary/30 p-3.5">
              {notes.map((note) => (
                <BenchNote key={note.id} kind={note.kind} clockFreq={clockFreq} pins={pins} />
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PINS & PWM */}
        {activeTab === 'pinout' && (
          <div className="space-y-6">
            <div className="flex flex-col gap-2 border-b border-border pb-3 text-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="font-medium">
                STM32F103 — the pins and what they&apos;re doing
                <span className="ml-2 text-xs font-normal text-muted-foreground">3.3 V logic</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Tap a pin to flip it high or low.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {pins.map((pin) => (
                <button
                  key={pin.id}
                  type="button"
                  onClick={() => togglePin(pin.id)}
                  aria-pressed={pin.state}
                  className={cn(
                    'rounded-md border p-3 text-left transition-colors',
                    pin.state
                      ? 'border-primary/50 bg-primary/8'
                      : 'border-border bg-secondary/30 hover:border-primary/30'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="measure text-xs font-semibold">{pin.name}</span>
                    <span
                      aria-hidden
                      className={cn(
                        'size-2.5 rounded-full transition-colors',
                        pin.state ? 'bg-primary' : 'bg-muted-foreground/25'
                      )}
                    />
                  </div>
                  <div className="mt-1 truncate text-xs text-primary">{pin.label}</div>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="rounded-sm bg-secondary/70 px-1.5 py-0.5 text-muted-foreground">
                      {pin.mode}
                    </span>
                    <span className={cn('measure', pin.state ? 'text-primary' : 'text-muted-foreground')}>
                      {pin.state ? 'HIGH 3.3 V' : 'LOW 0.0 V'}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* PWM generator */}
            <div className="rounded-md border border-border bg-secondary/20 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="size-4 text-primary" />
                  <span className="font-medium">PWM generator &amp; scope trace</span>
                </div>
                <p className="measure text-xs text-primary">
                  duty {pwmDuty}% · 10.0 kHz
                </p>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <span className="measure text-[11px] text-muted-foreground">0%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={pwmDuty}
                  aria-label="PWM duty cycle"
                  onChange={(e) => setPwmDuty(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
                />
                <span className="measure text-[11px] text-muted-foreground">100%</span>
              </div>

              <div className="quadrille relative mt-3 flex h-20 w-full items-center overflow-hidden rounded-md border border-border bg-card p-2">
                <svg className="relative z-10 h-full w-full" viewBox="0 0 600 60" preserveAspectRatio="none">
                  <path
                    d={`M 0 50 L ${100 * (1 - pwmDuty / 100)} 50 L ${100 * (1 - pwmDuty / 100)} 10 L 100 10 L 100 50 L ${200 - 100 * (pwmDuty / 100)} 50 L ${200 - 100 * (pwmDuty / 100)} 10 L 200 10 L 200 50 L ${300 - 100 * (pwmDuty / 100)} 50 L ${300 - 100 * (pwmDuty / 100)} 10 L 300 10 L 300 50 L ${400 - 100 * (pwmDuty / 100)} 50 L ${400 - 100 * (pwmDuty / 100)} 10 L 400 10 L 400 50 L ${500 - 100 * (pwmDuty / 100)} 50 L ${500 - 100 * (pwmDuty / 100)} 10 L 500 10 L 500 50 L 600 50`}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WIRE TRAFFIC */}
        {activeTab === 'protocol' && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">bus:</span>
                {(['I2C', 'SPI', 'UART'] as const).map((proto) => (
                  <button
                    key={proto}
                    type="button"
                    onClick={() => setSelectedProtocol(proto)}
                    className={cn(
                      'measure min-h-[32px] rounded-md px-2.5 py-1 text-xs transition-colors',
                      selectedProtocol === proto
                        ? 'bg-primary text-primary-foreground font-semibold'
                        : 'border border-border bg-secondary/40 text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {proto}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs text-muted-foreground" htmlFor="baud-select">
                  speed
                </label>
                <select
                  id="baud-select"
                  value={baudRate}
                  onChange={(e) => setBaudRate(Number(e.target.value))}
                  className="min-h-[32px] rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground outline-none"
                >
                  <option value={9600}>9600 bps</option>
                  <option value={115200}>115200 bps</option>
                  <option value={460800}>460800 bps</option>
                  <option value={921600}>921600 bps</option>
                </select>

                <button
                  type="button"
                  onClick={injectPacket}
                  disabled={isInjecting}
                  className="inline-flex min-h-[32px] items-center gap-1.5 rounded-md border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground active:scale-95"
                >
                  <Play className={cn('size-3.5', isInjecting && 'animate-spin')} />
                  <span>Send a packet</span>
                </button>
              </div>
            </div>

            <div className="rounded-md border border-border bg-secondary/20 p-3.5">
              <div className="flex items-center justify-between border-b border-border pb-2 text-[11px] text-muted-foreground">
                <span>time &amp; bus</span>
                <span>bytes on the wire</span>
              </div>
              <div className="max-h-[240px] space-y-2 overflow-y-auto pt-2">
                {packetLog.map((pkt) => (
                  <div
                    key={pkt.id}
                    className="flex flex-col gap-1 rounded-md border border-border bg-card p-2.5 transition-colors hover:border-primary/40 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="measure text-[11px] text-muted-foreground">{pkt.time}</span>
                      <span className="measure rounded-sm bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                        {pkt.proto}
                      </span>
                      <span className="truncate text-xs text-foreground">{pkt.desc}</span>
                    </div>
                    <code className="measure break-all rounded-sm bg-secondary/60 px-2 py-1 text-[11px] text-foreground/85">
                      {pkt.hex}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: AI BENCHMARKS */}
        {activeTab === 'ai_bench' && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* YOLO benchmark */}
            <div className="space-y-3 rounded-md border border-border bg-secondary/20 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-[15px] font-semibold leading-snug">
                    Counting microplastics through a microscope
                  </h4>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    YOLOv8n, shrunk to fit on a phone
                  </p>
                </div>
                <span className="measure shrink-0 rounded-sm border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  INT8
                </span>
              </div>

              {benchRunning && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>running 50 validation frames…</span>
                    <span className="measure">{benchProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full bg-primary transition-all duration-100"
                      style={{ width: `${benchProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {benchResults && (
                <dl className="measure grid grid-cols-2 gap-2 border-t border-border pt-3 text-xs sm:grid-cols-4">
                  <div>
                    <dt className="text-muted-foreground">speed</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-primary">
                      {benchResults.latency} ms
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">frames</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-primary">
                      {benchResults.fps} FPS
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">confidence</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-foreground">
                      {benchResults.confidence}%
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">memory</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-foreground">
                      {benchResults.memory}
                    </dd>
                  </div>
                </dl>
              )}

              <button
                type="button"
                onClick={runAiBenchmark}
                disabled={benchRunning}
                className="min-h-[40px] w-full rounded-md bg-primary py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
              >
                {benchRunning ? 'Running…' : 'Run the benchmark'}
              </button>
            </div>

            {/* Fall detector simulator */}
            <div className="space-y-3 rounded-md border border-border bg-secondary/20 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-[15px] font-semibold leading-snug">
                    Spotting a fall from body angles
                  </h4>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    ARUGA — the rules the camera runs
                  </p>
                </div>
                <span
                  className={cn(
                    'shrink-0 rounded-sm border px-2 py-0.5 text-[10px] font-semibold',
                    isFallAlert
                      ? 'border-destructive bg-destructive/15 text-destructive'
                      : isFallWarning
                      ? 'border-primary/40 bg-primary/10 text-primary'
                      : 'border-border bg-secondary/60 text-muted-foreground'
                  )}
                >
                  {isFallAlert ? 'Fall detected' : isFallWarning ? 'Unsteady' : 'Walking normally'}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-muted-foreground">Torso pitch angle</span>
                    <span className="measure font-semibold">{fallPitch}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    value={fallPitch}
                    aria-label="Torso pitch angle in degrees"
                    onChange={(e) => setFallPitch(Number(e.target.value))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
                  />
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-muted-foreground">Vertical drop acceleration</span>
                    <span className="measure font-semibold">{fallDropVel.toFixed(1)} G</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="4.0"
                    step="0.1"
                    value={fallDropVel}
                    aria-label="Vertical drop acceleration in G"
                    onChange={(e) => setFallDropVel(Number(e.target.value))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
                  />
                </div>
              </div>

              <p className="rounded-md border border-border bg-card p-2.5 text-xs leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">The rule: </span>
                the alarm fires when the spine tilts past 60° <em>and</em> the
                drop exceeds 2.5 G at the same time — all on the device, no
                server involved.
              </p>
            </div>
          </div>
        )}

        {/* TAB 5: LIVE READINGS */}
        {activeTab === 'telemetry' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
              <p className="text-sm font-medium">Live readings from the board</p>
              <button
                type="button"
                onClick={() => setStreamingActive((v) => !v)}
                aria-pressed={streamingActive}
                className={cn(
                  'min-h-[32px] rounded-md border px-2.5 py-1 text-xs font-medium transition-colors',
                  streamingActive
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : 'border-border bg-secondary text-muted-foreground'
                )}
              >
                {streamingActive ? 'Streaming — pause' : 'Paused — resume'}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Core temperature', value: `${sensorValues.coreTemp} °C`, note: 'within the normal band' },
                { label: 'Bus voltage', value: `${sensorValues.busVoltage} V`, note: 'regulated 3.3 V rail' },
                { label: 'Kernel ticks', value: `${sensorValues.freeRtosTick}`, note: '1 kHz system timer' },
                { label: 'Free memory', value: `${sensorValues.freeHeap} KB`, note: 'of 64 KB total' },
              ].map((m) => (
                <div key={m.label} className="rounded-md border border-border bg-secondary/25 p-3.5">
                  <div className="text-[11px] text-muted-foreground">{m.label}</div>
                  <div className="measure mt-1 text-xl font-semibold">{m.value}</div>
                  <div className="mt-1 text-[11px] text-muted-foreground">{m.note}</div>
                </div>
              ))}
            </div>

            <div className="rounded-md border border-border bg-card p-3.5">
              <div className="flex items-center justify-between border-b border-border pb-2 text-[11px]">
                <span className="text-muted-foreground">signal on the bus — 24 channels</span>
                <span className="measure text-primary">100 kSa/s</span>
              </div>
              <div className="flex h-16 items-end justify-between gap-1 pt-3">
                {spectrumBars.map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-primary/70 transition-all duration-300"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-md border border-border bg-secondary/20 p-4">
              <div className="flex flex-col gap-1 border-b border-border pb-2 text-xs sm:flex-row sm:items-center sm:justify-between">
                <span className="font-medium">How busy each task is</span>
                <span className="measure text-muted-foreground">
                  FreeRTOS v10.5.1 · preemptive priority
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
                {[
                  { name: 'Edge inference (tiny AI)', load: 42.1 },
                  { name: 'Thermal sensor read', load: 28.4 },
                  { name: 'Telemetry over Wi-Fi', load: 14.5 },
                  { name: 'Display drawing', load: 8.2 },
                ].map((task) => (
                  <div key={task.name} className="space-y-1">
                    <div className="flex justify-between">
                      <span>{task.name}</span>
                      <span className="measure font-semibold text-primary">{task.load}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-700"
                        style={{ width: `${task.load}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-border pt-3">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Free memory</span>
                  <span className="measure text-primary">
                    {sensorValues.freeHeap} KB of 64 KB
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-1000"
                    style={{ width: `${(sensorValues.freeHeap / 64) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── A bench note: one ruled reading written on the fold-out page ───────── */
function BenchNote({
  kind,
  clockFreq,
  pins,
}: {
  kind: NoteKind
  clockFreq: string
  pins: GpioPin[]
}) {
  const heading = {
    board: ['What’s on the board', 'FreeRTOS v10.5.1'],
    pins: ['Pin register — ports A & B', '3.3 V logic'],
    tasks: ['How busy each task is', 'preemptive priority'],
    ai: ['Edge-AI timing', 'INT8 · CMSIS-NN'],
    sensors: ['Sensor log', 'core max 38.6 °C'],
    who: ['Who built this bench', 'MSU-IIT'],
  }[kind]

  const rows: Array<[string, string]> =
    kind === 'board'
      ? [
          ['chip', `STM32F103C8T6 · Cortex-M3 @ ${clockFreq}`],
          ['memory', '48,240 bytes free of 65,536 (73.6% headroom)'],
          ['uptime', '284,912 ms · preemptive priority scheduling'],
          ['power', 'run mode · bus 3.308 V · 38.6 °C'],
        ]
      : kind === 'tasks'
      ? [
          ['vSensThermal', 'running · prio 4 · 348 words left · 28.4% load'],
          ['vEdgeInference', 'ready · prio 3 · 512 words left · 42.1% load'],
          ['vOledRender', 'blocked · prio 2 · 180 words left · 8.2% load'],
          ['vTelemetryMqtt', 'blocked · prio 2 · 220 words left · 14.5% load'],
          ['IDLE', 'ready · prio 0 · 64 words left · 6.8% load'],
        ]
      : kind === 'ai'
      ? [
          ['target', 'INT8 YOLOv8n (3.2M params) on ESP32-P4 / edge NPU'],
          ['frame', '192×192 grayscale · Edge Impulse / CMSIS-NN'],
          ['speed', '18.2 ms per frame — 54.9 FPS'],
          ['memory', 'peak RAM 4.1 MB · zero-copy DMA on'],
          ['loss', 'quantization loss < 0.8%'],
        ]
      : kind === 'sensors'
      ? [
          ['MLX90640', '32×24 IR matrix (768 pixels) @ 4 Hz — core max 38.6 °C'],
          ['DS18B20', 'substrate 29.35 °C (±0.06 °C)'],
          ['MPU6050', 'accel [X:+0.02g, Y:-0.01g, Z:+0.99g] · gyro 0.0 °/s'],
        ]
      : [
          ['name', 'Joseph Alan B. Vergara — “Joal”'],
          ['role', 'embedded systems & edge AI engineer'],
          ['school', 'MSU-IIT, BS Computer Applications'],
          ['stack', 'C/C++, FreeRTOS, TinyML, STM32, ESP32, Python, Next.js'],
          ['home', 'Iligan City, Philippines'],
        ]

  // Measurement earns the mono face; plain words stay in the reading face.
  const mono = kind !== 'who'

  return (
    <div className="animate-settle-soft rounded-md border border-border bg-card p-3.5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-border pb-2">
        <p className="text-sm font-semibold">{heading[0]}</p>
        <p className="meta">{heading[1]}</p>
      </div>

      {kind === 'pins' ? (
        <ul className="mt-2.5 space-y-1.5">
          {pins.map((p) => (
            <li key={p.id} className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 text-xs">
              <span className="measure w-11 shrink-0 font-semibold">{p.name}</span>
              <span className="min-w-0 flex-1 truncate text-muted-foreground">{p.label}</span>
              <span className="shrink-0 rounded-sm bg-secondary/70 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                {p.mode}
              </span>
              <span
                className={cn('measure shrink-0', p.state ? 'text-primary' : 'text-muted-foreground')}
              >
                {p.state ? `HIGH ${p.voltage}` : `LOW ${p.voltage}`}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <dl className="mt-2.5 space-y-1.5">
          {rows.map(([label, value]) => (
            <div key={label} className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 text-xs">
              <dt className="w-24 shrink-0 text-muted-foreground">{label}</dt>
              <dd className={cn('min-w-0 flex-1 text-foreground/90', mono && 'measure')}>
                {value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
