'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Terminal as TerminalIcon,
  Cpu,
  Activity,
  Zap,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Send,
  Radio,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Gauge,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { cyberAudio } from '@/lib/cyber-sound'

type PlaygroundTab = 'cli' | 'pinout' | 'protocol' | 'ai_bench' | 'telemetry'

type GpioPin = {
  id: string
  name: string
  label: string
  mode: 'OUTPUT' | 'INPUT' | 'PWM' | 'I2C' | 'UART'
  state: boolean
  voltage: string
  color: string
}

export function HardwarePlayground() {
  const [activeTab, setActiveTab] = useState<PlaygroundTab>('cli')
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [clockFreq, setClockFreq] = useState<'8MHz' | '16MHz' | '72MHz' | '240MHz'>('72MHz')
  const [pwmDuty, setPwmDuty] = useState(65)
  const [selectedProtocol, setSelectedProtocol] = useState<'I2C' | 'SPI' | 'UART'>('I2C')
  const [baudRate, setBaudRate] = useState<number>(115200)
  const [streamingActive, setStreamingActive] = useState(true)

  // Audio helper
  function playClick() {
    if (audioEnabled) cyberAudio.click()
  }

  function toggleAudio() {
    const next = !audioEnabled
    setAudioEnabled(next)
    if (next) {
      cyberAudio.systemEngaged()
    }
  }

  // Pin state
  const [pins, setPins] = useState<GpioPin[]>([
    { id: 'pa5', name: 'PA5', label: 'USER_LED_01', mode: 'OUTPUT', state: true, voltage: '3.3V', color: 'emerald' },
    { id: 'pc13', name: 'PC13', label: 'BOARD_STATUS', mode: 'OUTPUT', state: false, voltage: '0.0V', color: 'cyan' },
    { id: 'pa8', name: 'PA8', label: 'TIM1_CH1_PWM', mode: 'PWM', state: true, voltage: '2.14V', color: 'amber' },
    { id: 'pb6', name: 'PB6', label: 'I2C1_SCL', mode: 'I2C', state: true, voltage: '3.3V', color: 'blue' },
    { id: 'pb7', name: 'PB7', label: 'I2C1_SDA', mode: 'I2C', state: false, voltage: '0.0V', color: 'blue' },
    { id: 'pa9', name: 'PA9', label: 'USART1_TX', mode: 'UART', state: true, voltage: '3.3V', color: 'purple' },
    { id: 'pa10', name: 'PA10', label: 'USART1_RX', mode: 'UART', state: false, voltage: '0.0V', color: 'purple' },
    { id: 'pb12', name: 'PB12', label: 'SPI2_NSS', mode: 'OUTPUT', state: true, voltage: '3.3V', color: 'pink' },
  ])

  function togglePin(id: string) {
    setPins((prev) =>
      prev.map((pin) => {
        if (pin.id === id) {
          const nextState = !pin.state
          if (audioEnabled) cyberAudio.pinToggle(nextState)
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

  // CLI State
  const [commandInput, setCommandInput] = useState('')
  const [terminalLogs, setTerminalLogs] = useState<Array<{ text: string; type?: 'info' | 'success' | 'warn' | 'dim' | 'accent' }>>([
    { text: 'SYSTEM_BOOT: FreeRTOS v10.5.1 on STM32F103C8T6 (ARM Cortex-M3 @ 72MHz)', type: 'accent' },
    { text: 'TELEMETRY: Hardware buses configured. Type "help" or click quick commands below.', type: 'dim' },
  ])
  const terminalBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [terminalLogs])

  function handleCliSubmit(e?: React.FormEvent, manualCmd?: string) {
    if (e) e.preventDefault()
    const raw = manualCmd !== undefined ? manualCmd : commandInput
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    playClick()

    const newLogs = [...terminalLogs, { text: `joal@stm32-freertos:~$ ${cmd}`, type: 'accent' as const }]

    switch (cmd) {
      case 'help':
        newLogs.push(
          { text: 'AVAILABLE FIRMWARE COMMANDS:', type: 'info' },
          { text: '  status     - Query MCU silicon status, clock speed & FreeRTOS heap', type: 'dim' },
          { text: '  pins       - Dump current GPIO pinout states and voltage levels', type: 'dim' },
          { text: '  rtos       - Print FreeRTOS Task Control Block (TCB) schedule', type: 'dim' },
          { text: '  benchmark  - Execute simulated INT8 edge AI TinyML inference test', type: 'dim' },
          { text: '  sensors    - Read MLX90640 thermal array & telemetry bus sensors', type: 'dim' },
          { text: '  neofetch   - Display engineering profile & silicon summary', type: 'dim' },
          { text: '  clear      - Clear terminal screen buffer', type: 'dim' }
        )
        break

      case 'status':
        newLogs.push(
          { text: `[SYS_HEALTH] MCU: STM32F103C8T6 | CORE: Cortex-M3 @ ${clockFreq}`, type: 'success' },
          { text: `[RTOS_HEAP] Free: 48,240 bytes / 65,536 bytes (73.6% headroom)`, type: 'info' },
          { text: `[UPTIME] Tick Count: 284,912 ms | Scheduling: Preemptive Priority`, type: 'dim' },
          { text: `[POWER_STATE] Active Run Mode | Bus Voltage: 3.308V | Temp: 38.6°C`, type: 'info' }
        )
        break

      case 'pins':
        newLogs.push(
          { text: '--- GPIO REGISTER DUMP (PORT A & B) ---', type: 'info' }
        )
        pins.forEach((p) => {
          newLogs.push({
            text: `  [${p.name.padEnd(5)}] ${p.label.padEnd(16)} | ${p.mode.padEnd(7)} | STATE: ${p.state ? 'HIGH (1)' : 'LOW  (0)'} | ${p.voltage}`,
            type: p.state ? 'success' : 'dim',
          })
        })
        break

      case 'rtos':
        newLogs.push(
          { text: 'Task Name       | State   | Prio | Stack Rem | CPU Load', type: 'info' },
          { text: '----------------+---------+------+-----------+---------', type: 'dim' },
          { text: 'vSensThermal    | Running |  4   | 348 words |  28.4%', type: 'success' },
          { text: 'vEdgeInference  | Ready   |  3   | 512 words |  42.1%', type: 'success' },
          { text: 'vOledRender     | Blocked |  2   | 180 words |   8.2%', type: 'info' },
          { text: 'vTelemetryMqtt  | Blocked |  2   | 220 words |  14.5%', type: 'info' },
          { text: 'IDLE            | Ready   |  0   |  64 words |   6.8%', type: 'dim' }
        )
        break

      case 'benchmark':
        newLogs.push(
          { text: '>> INITIATING TINYML EDGE AI INFERENCE BENCHMARK...', type: 'info' },
          { text: '   Target: INT8 Quantized YOLOv8n (3.2M params) on ESP32-P4 / Edge NPU', type: 'dim' },
          { text: '   Frame Size: 192x192 Grayscale | Kernel: Edge Impulse / CMSIS-NN', type: 'dim' },
          { text: '   [==========] Inference completed in 18.2 ms (54.9 FPS)', type: 'success' },
          { text: '   Peak RAM: 4.1 MB | Zero-Copy DMA: ENABLED | Quantization Loss: < 0.8%', type: 'info' }
        )
        if (audioEnabled) cyberAudio.benchmarkSuccess()
        break

      case 'sensors':
        newLogs.push(
          { text: '[MLX90640 IR MATRIX] 32x24 (768 pixels) @ 4Hz stream: Core Max 38.6°C', type: 'success' },
          { text: '[DS18B20 1-WIRE] Substrate Temp: 29.35°C (±0.06°C resolution)', type: 'info' },
          { text: '[MPU6050 6-AXIS] Accel: [X:+0.02g, Y:-0.01g, Z:+0.99g] | Gyro: [0.0°/s]', type: 'dim' }
        )
        break

      case 'neofetch':
        newLogs.push(
          { text: '  ██████╗  ██████╗  █████╗ ██╗     ', type: 'accent' },
          { text: '  ██╔══██╗██╔═══██╗██╔══██╗██║     ', type: 'accent' },
          { text: '  ██████╔╝██║   ██║███████║██║     ', type: 'accent' },
          { text: '  JOSEPH ALAN B. VERGARA // JOAL', type: 'info' },
          { text: '  ROLE: Embedded Systems & Edge AI Engineer', type: 'success' },
          { text: '  INSTITUTION: MSU-IIT (BS Computer Applications)', type: 'dim' },
          { text: '  STACK: C/C++, FreeRTOS, TinyML, STM32, ESP32, Python, Next.js', type: 'info' }
        )
        break

      case 'clear':
        setTerminalLogs([])
        setCommandInput('')
        return

      default:
        newLogs.push({
          text: `Command not recognized: "${raw}". Type "help" for valid firmware commands.`,
          type: 'warn',
        })
        break
    }

    setTerminalLogs(newLogs)
    setCommandInput('')
  }

  // Protocol Packet State
  const [packetLog, setPacketLog] = useState<Array<{ id: number; proto: string; hex: string; desc: string; time: string }>>([
    { id: 1, proto: 'I2C', hex: '0x33 0x02 0x1A 0xFF [ACK]', desc: 'MLX90640 Subpage 0 Frame Read', time: '12:00:01.204' },
    { id: 2, proto: 'UART', hex: '$GPGGA,120002.00,0813.68,N,12414.71,E,1,08,1.0*42', desc: 'NMEA GPS Telemetry Packet', time: '12:00:02.100' },
  ])
  const [isInjecting, setIsInjecting] = useState(false)

  function injectPacket() {
    setIsInjecting(true)
    if (audioEnabled) cyberAudio.packetBurst()

    const id = Date.now()
    const now = new Date()
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds()}`

    let hex = ''
    let desc = ''

    if (selectedProtocol === 'I2C') {
      const randVal = Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0')
      hex = `[START] 0x33 0x04 0x${randVal} 0xAA [ACK] [STOP]`
      desc = `I2C Read Register 0x04 -> Sensor byte: 0x${randVal}`
    } else if (selectedProtocol === 'SPI') {
      const b1 = Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0')
      const b2 = Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0')
      hex = `MOSI: [0x40 0x${b1} 0x${b2}] | MISO: [0x00 0xFF 0x12]`
      desc = `SPI SSD1306 Display DMA Frame Sync`
    } else {
      hex = `[SOF] 0x55 0xAA [LEN:08] [TEMP:38.2C] [CRC:OK]`
      desc = `UART Serial Telemetry Frame @ ${baudRate} bps`
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
    if (audioEnabled) cyberAudio.click()

    const interval = setInterval(() => {
      setBenchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setBenchRunning(false)
          if (audioEnabled) cyberAudio.benchmarkSuccess()
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

  useEffect(() => {
    if (!streamingActive) return
    const interval = setInterval(() => {
      setSensorValues((v) => ({
        coreTemp: +(38.2 + Math.sin(Date.now() / 2000) * 0.8).toFixed(1),
        busVoltage: +(3.305 + Math.random() * 0.008).toFixed(3),
        freeRtosTick: v.freeRtosTick + 10,
        freeHeap: +(48.0 + Math.random() * 0.4).toFixed(1),
      }))
    }, 1000)
    return () => clearInterval(interval)
  }, [streamingActive])

  // Derive fall classification
  const isFallAlert = fallPitch > 60 && fallDropVel > 2.5
  const isFallWarning = (fallPitch > 45 || fallDropVel > 1.8) && !isFallAlert

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card/75 backdrop-blur-xl shadow-2xl">
      {/* Decorative Top Cyber Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 bg-secondary/40 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="relative flex size-7 shrink-0 items-center justify-center rounded border border-primary/40 bg-primary/10 text-primary">
            <Cpu className="size-4 animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-foreground">
                SILICON_TELEMETRY // HARDWARE LAB
              </span>
              <span className="hidden sm:inline-block rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[9px] text-primary border border-primary/20">
                ACTIVE RIG
              </span>
            </div>
            <p className="font-mono text-[10px] text-muted-foreground hidden sm:block">
              Interactive Microcontroller, FreeRTOS CLI & Edge AI Protocol Sandbox
            </p>
          </div>
        </div>

        {/* Global Controls: Audio & Telemetry Stream */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {/* Audio Synthesizer Toggle */}
          <button
            type="button"
            onClick={toggleAudio}
            title={audioEnabled ? 'Audio Synthesizer Engaged (Click to Mute)' : 'Enable Web Audio Synth Chirps'}
            className={cn(
              'flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] transition-all',
              audioEnabled
                ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.25)]'
                : 'border-border/80 bg-secondary/50 text-muted-foreground hover:border-primary/40 hover:text-foreground'
            )}
          >
            {audioEnabled ? <Volume2 className="size-3.5" /> : <VolumeX className="size-3.5" />}
            <span>AUDIO: {audioEnabled ? 'ENGAGED' : 'MUTED'}</span>
          </button>

          {/* Clock Rate Selector */}
          <div className="hidden md:flex items-center rounded-lg border border-border/80 bg-secondary/30 p-0.5 text-[10px]">
            {(['8MHz', '16MHz', '72MHz', '240MHz'] as const).map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() => {
                  setClockFreq(freq)
                  playClick()
                }}
                className={cn(
                  'rounded px-1.5 py-0.5 transition-colors',
                  clockFreq === freq
                    ? 'bg-primary text-primary-foreground font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {freq}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex overflow-x-auto border-b border-border/60 bg-secondary/20 px-3 sm:px-6 pt-2 scrollbar-none gap-1.5">
        {[
          { id: 'cli', label: 'UART // CLI TERMINAL', icon: TerminalIcon },
          { id: 'pinout', label: 'CHIP PINOUT & GPIO', icon: Sliders },
          { id: 'protocol', label: 'PROTOCOL ANALYZER', icon: Activity },
          { id: 'ai_bench', label: 'EDGE AI BENCHMARK', icon: Sparkles },
          { id: 'telemetry', label: 'LIVE SENSOR STREAM', icon: Gauge },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id as PlaygroundTab)
                playClick()
              }}
              className={cn(
                'group flex items-center gap-1.5 whitespace-nowrap rounded-t-lg border-t border-x px-3 py-2 font-mono text-xs transition-all',
                isActive
                  ? 'border-border/80 bg-card text-primary font-bold shadow-sm -mb-px border-b-card'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/40'
              )}
            >
              <Icon className={cn('size-3.5', isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Interactive Tab Body */}
      <div className="p-4 sm:p-6 min-h-[360px]">
        {/* TAB 1: FIRMWARE CLI TERMINAL */}
        {activeTab === 'cli' && (
          <div className="space-y-4">
            {/* Quick command buttons */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
              <span className="text-muted-foreground text-[10px] mr-1">QUICK_COMMANDS:</span>
              {['help', 'status', 'pins', 'rtos', 'benchmark', 'sensors', 'neofetch', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => handleCliSubmit(undefined, cmd)}
                  className="rounded border border-primary/30 bg-primary/5 px-2 py-1 text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-sm transition-all"
                >
                  [{cmd}]
                </button>
              ))}
            </div>

            {/* Terminal Screen Container */}
            <div className="relative rounded-xl border border-border/80 bg-black/90 p-4 font-mono text-xs text-emerald-400 shadow-inner min-h-[240px] max-h-[300px] overflow-y-auto">
              <div className="space-y-1.5">
                {terminalLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'leading-relaxed whitespace-pre-wrap font-mono text-[11px] sm:text-xs',
                      log.type === 'accent' && 'text-cyan-400 font-bold',
                      log.type === 'info' && 'text-foreground/90',
                      log.type === 'success' && 'text-emerald-400',
                      log.type === 'warn' && 'text-amber-400',
                      log.type === 'dim' && 'text-muted-foreground'
                    )}
                  >
                    {log.text}
                  </div>
                ))}
                <div ref={terminalBottomRef} />
              </div>
            </div>

            {/* Terminal Input Line */}
            <form onSubmit={handleCliSubmit} className="flex gap-2">
              <div className="relative flex-1 flex items-center">
                <span className="absolute left-3 font-mono text-xs text-primary font-bold">
                  $&gt;
                </span>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => {
                    setCommandInput(e.target.value)
                    if (audioEnabled) cyberAudio.keyTap(0.015)
                  }}
                  placeholder="Enter firmware command (e.g. status, pins, rtos, benchmark, help)..."
                  className="w-full rounded-lg border border-border/80 bg-secondary/40 pl-8 pr-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 font-mono text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all shrink-0"
              >
                <Send className="size-3.5" />
                <span className="hidden sm:inline">EXECUTE</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: CHIP PINOUT & GPIO TESTER */}
        {activeTab === 'pinout' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-muted-foreground border-b border-border/60 pb-3">
              <div>
                <span className="text-foreground font-bold">STM32F103 LQFP-48 / GPIO MATRIX</span>
                <span className="ml-2 text-primary">Target: 3.3V Logic Level</span>
              </div>
              <div className="text-[11px] text-muted-foreground">
                Click any pin card to toggle logic state (HIGH/LOW) with audio feedback.
              </div>
            </div>

            {/* GPIO Pins Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
              {pins.map((pin) => (
                <button
                  key={pin.id}
                  type="button"
                  onClick={() => togglePin(pin.id)}
                  className={cn(
                    'group relative rounded-xl border p-3 text-left transition-all hover:scale-[1.02] active:scale-[0.99]',
                    pin.state
                      ? 'border-emerald-500/60 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                      : 'border-border/70 bg-secondary/30 opacity-70 hover:opacity-100'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">{pin.name}</span>
                    <span
                      className={cn(
                        'size-2.5 rounded-full transition-all',
                        pin.state
                          ? 'bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse'
                          : 'bg-muted-foreground/30'
                      )}
                    />
                  </div>
                  <div className="mt-1 text-[11px] font-semibold text-primary truncate">
                    {pin.label}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <span className="rounded bg-secondary/80 px-1.5 py-0.5 text-muted-foreground">
                      {pin.mode}
                    </span>
                    <span className={cn('font-bold', pin.state ? 'text-emerald-400' : 'text-muted-foreground')}>
                      {pin.state ? 'HIGH (3.3V)' : 'LOW (0.0V)'}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* PWM Duty Cycle & Oscilloscope Simulator */}
            <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-xs">
                  <Zap className="size-4 text-amber-400" />
                  <span className="font-bold text-foreground">TIM1_CH1 PWM GENERATOR & OSCILLOSCOPE TRACE</span>
                </div>
                <div className="text-xs text-amber-400 font-bold">
                  DUTY CYCLE: {pwmDuty}% | FREQ: 10.0 kHz
                </div>
              </div>

              {/* Slider */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-muted-foreground">0%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={pwmDuty}
                  onChange={(e) => {
                    setPwmDuty(Number(e.target.value))
                    if (audioEnabled) cyberAudio.click(0.015)
                  }}
                  className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <span className="text-[10px] text-muted-foreground">100%</span>
              </div>

              {/* Animated SVG Square Wave based on duty cycle */}
              <div className="mt-3 h-16 w-full rounded-lg border border-border/60 bg-black/60 p-2 overflow-hidden flex items-center">
                <svg className="w-full h-full" viewBox="0 0 600 60" preserveAspectRatio="none">
                  <path
                    d={`M 0 50 L ${100 * (1 - pwmDuty / 100)} 50 L ${100 * (1 - pwmDuty / 100)} 10 L 100 10 L 100 50 L ${200 - 100 * (pwmDuty / 100)} 50 L ${200 - 100 * (pwmDuty / 100)} 10 L 200 10 L 200 50 L ${300 - 100 * (pwmDuty / 100)} 50 L ${300 - 100 * (pwmDuty / 100)} 10 L 300 10 L 300 50 L ${400 - 100 * (pwmDuty / 100)} 50 L ${400 - 100 * (pwmDuty / 100)} 10 L 400 10 L 400 50 L ${500 - 100 * (pwmDuty / 100)} 50 L ${500 - 100 * (pwmDuty / 100)} 10 L 500 10 L 500 50 L 600 50`}
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROTOCOL ANALYZER */}
        {activeTab === 'protocol' && (
          <div className="space-y-5 font-mono">
            {/* Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">PROTOCOL:</span>
                {(['I2C', 'SPI', 'UART'] as const).map((proto) => (
                  <button
                    key={proto}
                    type="button"
                    onClick={() => {
                      setSelectedProtocol(proto)
                      playClick()
                    }}
                    className={cn(
                      'rounded-lg px-2.5 py-1 text-xs transition-all',
                      selectedProtocol === proto
                        ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                        : 'border border-border/70 bg-secondary/40 text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {proto}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">BAUD:</span>
                <select
                  value={baudRate}
                  onChange={(e) => setBaudRate(Number(e.target.value))}
                  className="rounded-lg border border-border/70 bg-secondary/50 px-2 py-1 text-xs text-foreground outline-none"
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
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 text-xs font-bold hover:bg-emerald-500/30 transition-all active:scale-95"
                >
                  <Play className={cn('size-3.5', isInjecting && 'animate-spin')} />
                  <span>INJECT_PACKET</span>
                </button>
              </div>
            </div>

            {/* Packet Log Inspector */}
            <div className="rounded-xl border border-border/80 bg-black/85 p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[10px] text-muted-foreground border-b border-border/40 pb-2">
                <span>TIME & PROTOCOL</span>
                <span>PACKET HEX DUMP / BUS TRACE</span>
              </div>
              <div className="space-y-2 max-h-[220px] overflow-y-auto">
                {packetLog.map((pkt) => (
                  <div
                    key={pkt.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 rounded bg-secondary/20 p-2 border border-border/40 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-muted-foreground">{pkt.time}</span>
                      <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[9px] font-bold text-primary">
                        {pkt.proto}
                      </span>
                      <span className="text-[11px] text-foreground font-medium truncate max-w-xs">
                        {pkt.desc}
                      </span>
                    </div>
                    <code className="text-[11px] text-emerald-400 font-mono bg-black/50 px-2 py-0.5 rounded break-all">
                      {pkt.hex}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EDGE AI BENCHMARK */}
        {activeTab === 'ai_bench' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {/* Benchmark 1: YOLOv8n INT8 Microplastics */}
            <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-foreground">YOLOv8n Microplastic Detection</h4>
                  <span className="text-[10px] text-muted-foreground">Mobile & Edge NPU Inference</span>
                </div>
                <span className="text-emerald-400 text-[10px] font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  INT8 QUANT
                </span>
              </div>

              {/* Progress bar when running */}
              {benchRunning && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>INFERENCING 50 VALIDATION FRAMES...</span>
                    <span>{benchProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-100"
                      style={{ width: `${benchProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Results grid */}
              {benchResults && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-border/60">
                  <div className="rounded bg-background/60 p-2 border border-border/60">
                    <div className="text-[9px] text-muted-foreground">LATENCY</div>
                    <div className="text-emerald-400 font-bold text-sm">{benchResults.latency} ms</div>
                  </div>
                  <div className="rounded bg-background/60 p-2 border border-border/60">
                    <div className="text-[9px] text-muted-foreground">THROUGHPUT</div>
                    <div className="text-primary font-bold text-sm">{benchResults.fps} FPS</div>
                  </div>
                  <div className="rounded bg-background/60 p-2 border border-border/60">
                    <div className="text-[9px] text-muted-foreground">CONFIDENCE</div>
                    <div className="text-cyan-400 font-bold text-sm">{benchResults.confidence}%</div>
                  </div>
                  <div className="rounded bg-background/60 p-2 border border-border/60">
                    <div className="text-[9px] text-muted-foreground">MEM USE</div>
                    <div className="text-foreground font-bold text-sm">{benchResults.memory}</div>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={runAiBenchmark}
                disabled={benchRunning}
                className="w-full rounded-lg bg-primary py-2 text-primary-foreground font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="size-3.5" />
                <span>{benchRunning ? 'RUNNING BENCHMARK...' : 'RUN INFERENCE BENCHMARK'}</span>
              </button>
            </div>

            {/* Benchmark 2: ARUGA Kinematic Fall Simulator */}
            <div className="rounded-xl border border-border/80 bg-secondary/20 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-foreground">ARUGA 33-pt Kinematic Fall Engine</h4>
                  <span className="text-[10px] text-muted-foreground">Biomechanical Vector Classifier</span>
                </div>
                <span
                  className={cn(
                    'text-[10px] font-bold px-2 py-0.5 rounded border',
                    isFallAlert
                      ? 'border-destructive bg-destructive/20 text-destructive animate-pulse'
                      : isFallWarning
                      ? 'border-amber-500 bg-amber-500/20 text-amber-400'
                      : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                  )}
                >
                  {isFallAlert ? 'FALL_EVENT_TRIGGERED' : isFallWarning ? 'UNSTABLE_GAIT' : 'AMBULATION_NORMAL'}
                </span>
              </div>

              {/* Sliders for kinematic pitch and velocity */}
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-muted-foreground">Torso Pitch Angle:</span>
                    <span className="font-bold text-foreground">{fallPitch}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    value={fallPitch}
                    onChange={(e) => {
                      setFallPitch(Number(e.target.value))
                      if (audioEnabled) cyberAudio.click(0.01)
                    }}
                    className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-muted-foreground">Vertical Drop Accel:</span>
                    <span className="font-bold text-foreground">{fallDropVel.toFixed(1)} G</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="4.0"
                    step="0.1"
                    value={fallDropVel}
                    onChange={(e) => {
                      setFallDropVel(Number(e.target.value))
                      if (audioEnabled) cyberAudio.click(0.01)
                    }}
                    className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              </div>

              <div className="rounded bg-background/70 p-2.5 border border-border/70 text-[11px] text-muted-foreground">
                <span className="text-foreground font-semibold">ALGORITHM LOGIC:</span> Triggers alert when Spine Angle &gt; 60° and Vertical Accel &gt; 2.5G simultaneously without cloud dependence.
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: LIVE SENSOR STREAM */}
        {activeTab === 'telemetry' && (
          <div className="space-y-5 font-mono">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2 text-xs">
                <Radio className="size-4 text-emerald-400 animate-pulse" />
                <span className="font-bold text-foreground">CONTINUOUS TELEMETRY STREAM</span>
              </div>
              <button
                type="button"
                onClick={() => setStreamingActive((v) => !v)}
                className={cn(
                  'rounded px-2.5 py-1 text-xs border font-bold transition-all',
                  streamingActive
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                    : 'border-border/70 bg-secondary text-muted-foreground'
                )}
              >
                STREAM: {streamingActive ? 'RUNNING' : 'PAUSED'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="rounded-xl border border-border/80 bg-secondary/30 p-3.5">
                <div className="text-[10px] text-muted-foreground">CORE_TEMPERATURE</div>
                <div className="mt-1 text-xl font-bold text-foreground">{sensorValues.coreTemp}°C</div>
                <div className="mt-1 text-[10px] text-emerald-400">Nominal thermal band</div>
              </div>

              <div className="rounded-xl border border-border/80 bg-secondary/30 p-3.5">
                <div className="text-[10px] text-muted-foreground">BUS_VOLTAGE_VCC</div>
                <div className="mt-1 text-xl font-bold text-cyan-400">{sensorValues.busVoltage} V</div>
                <div className="mt-1 text-[10px] text-muted-foreground">Regulated 3.3V rail</div>
              </div>

              <div className="rounded-xl border border-border/80 bg-secondary/30 p-3.5">
                <div className="text-[10px] text-muted-foreground">FREERTOS_TICK</div>
                <div className="mt-1 text-xl font-bold text-primary">{sensorValues.freeRtosTick}</div>
                <div className="mt-1 text-[10px] text-muted-foreground">1 kHz SysTick timer</div>
              </div>

              <div className="rounded-xl border border-border/80 bg-secondary/30 p-3.5">
                <div className="text-[10px] text-muted-foreground">HEAP_AVAILABLE</div>
                <div className="mt-1 text-xl font-bold text-emerald-400">{sensorValues.freeHeap} KB</div>
                <div className="mt-1 text-[10px] text-muted-foreground">heap_4 allocator</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
