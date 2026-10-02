'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import {
  ArrowUpRight,
  ExternalLink,
  Cpu,
  Layers,
  Terminal,
  Activity,
  Zap,
  Code2,
  Search,
  X,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Workflow,
  Sparkles,
  GitBranch,
} from 'lucide-react'
import { GithubIcon } from '@/components/brand-icons'
import { Reveal } from '@/components/reveal'
import { ProjectModal } from '@/components/project-modal'
import {
  projects,
  projectCategories,
  type Project,
  type ProjectCategory,
} from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import { cyberAudio } from '@/lib/cyber-sound'

type Filter = 'All' | ProjectCategory
type DrawerTab = 'specs' | 'code' | 'flow'

export function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [selected, setSelected] = useState<Project | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  // Track expanded drawer tab per project title
  const [cardDrawers, setCardDrawers] = useState<Record<string, DrawerTab | null>>({})
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null)

  const filters: Filter[] = ['All', ...projectCategories]

  // Top popular tags for quick 1-click filtering
  const popularTags = [
    'FreeRTOS',
    'STM32',
    'ESP32',
    'YOLOv8',
    'OpenCV',
    'MediaPipe',
    'I2C',
    'TinyML',
    'Next.js',
  ]

  const visible = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = filter === 'All' || p.category === filter
      const matchesTag =
        !selectedTag || p.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase()))

      const q = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        (p.telemetrySpec?.target && p.telemetrySpec.target.toLowerCase().includes(q)) ||
        (p.telemetrySpec?.protocol && p.telemetrySpec.protocol.toLowerCase().includes(q))

      return matchesCategory && matchesTag && matchesSearch
    })
  }, [filter, selectedTag, searchQuery])

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: projects.length }
    for (const p of projects) {
      map[p.category] = (map[p.category] || 0) + 1
    }
    return map
  }, [])

  function openProject(project: Project) {
    cyberAudio.click(0.04)
    setSelected(project)
    setModalOpen(true)
  }

  function toggleCardDrawer(projectTitle: string, tab: DrawerTab) {
    cyberAudio.click(0.03)
    setCardDrawers((prev) => ({
      ...prev,
      [projectTitle]: prev[projectTitle] === tab ? null : tab,
    }))
  }

  function copyCode(projectTitle: string, code: string) {
    navigator.clipboard.writeText(code)
    cyberAudio.packetBurst(0.03)
    setCopiedSnippet(projectTitle)
    setTimeout(() => {
      setCopiedSnippet(null)
    }, 2000)
  }

  return (
    <section id="projects" className="relative border-t border-border/80 bg-card/20 py-24 md:py-32">
      {/* Background accents */}
      <div className="tech-dots pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-2 font-mono text-xs text-primary mb-3">
            <Terminal className="size-3.5" />
            <span>[SYS_MODULE // 02] DEPLOYED WORK &amp; FIRMWARE REPOSITORIES</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="max-w-2xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
                Engineering Projects &amp; Systems
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-muted-foreground text-sm sm:text-base">
                Embedded firmware, real-time operating systems, quantized TinyML edge models, and hardware-integrated web platforms.
              </p>
            </div>
            <div className="font-mono text-xs text-muted-foreground bg-secondary/50 border border-border/80 px-3 py-1.5 rounded-lg w-fit">
              COUNT: <span className="text-primary font-bold">{visible.length}</span> / {projects.length} UNITS
            </div>
          </div>
        </Reveal>

        {/* Live Search and Tag Filter Bar */}
        <Reveal delay={60}>
          <div className="mt-8 space-y-3">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 size-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by silicon, protocol, or tag (e.g. FreeRTOS, STM32, YOLO, I2C, ESP32)..."
                className="w-full rounded-xl border border-border/80 bg-secondary/30 pl-10 pr-10 py-2.5 font-mono text-xs sm:text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 rounded p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Quick Tag Pills */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
              <span className="text-[10px] text-muted-foreground mr-1">QUICK_TAGS:</span>
              {popularTags.map((tag) => {
                const isSelected = selectedTag?.toLowerCase() === tag.toLowerCase()
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSelectedTag(isSelected ? null : tag)
                      cyberAudio.click(0.02)
                    }}
                    className={cn(
                      'rounded-md px-2 py-0.5 text-[10px] transition-all border',
                      isSelected
                        ? 'border-primary bg-primary text-primary-foreground font-bold shadow-sm'
                        : 'border-border/70 bg-secondary/40 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                    )}
                  >
                    #{tag}
                  </button>
                )
              })}
              {selectedTag && (
                <button
                  type="button"
                  onClick={() => setSelectedTag(null)}
                  className="text-[10px] text-primary underline ml-1 hover:text-primary/80"
                >
                  CLEAR TAG
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {/* Filter Category Pills */}
        <Reveal delay={80}>
          <div
            className="mt-6 -mx-4 px-4 sm:mx-0 sm:px-0 flex overflow-x-auto sm:flex-wrap gap-2 pb-2 sm:pb-0 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]"
            role="tablist"
            aria-label="Filter projects by domain"
          >
            {filters.map((f) => {
              const isActive = filter === f
              return (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setFilter(f)
                    cyberAudio.click(0.02)
                  }}
                  className={cn(
                    'shrink-0 whitespace-nowrap rounded-lg border px-3.5 py-2 sm:py-1.5 font-mono text-xs transition-all duration-200 flex items-center gap-1.5 min-h-[38px] sm:min-h-[34px]',
                    isActive
                      ? 'border-primary bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/20'
                      : 'border-border/80 bg-secondary/30 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                  )}
                >
                  <span>{f.toUpperCase()}</span>
                  <span
                    className={cn(
                      'text-[10px] px-1.5 py-0.5 rounded font-mono',
                      isActive ? 'bg-primary-foreground/20 text-primary-foreground' : 'text-primary bg-primary/10'
                    )}
                  >
                    {counts[f] || 0}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Project Grid */}
        <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {visible.map((project, i) => {
            const activeDrawer = cardDrawers[project.title] || null
            const isSnippetCopied = copiedSnippet === project.title

            return (
              <Reveal as="article" key={project.title} delay={i * 40}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/10 hud-bracket-expand border-glow">
                  {/* Image Section with Cyan Vignette & Laser Beam on Hover */}
                  <div
                    onClick={() => openProject(project)}
                    className="relative aspect-[16/10] overflow-hidden border-b border-border/60 bg-muted cursor-pointer"
                  >
                    <Image
                      src={project.image || '/placeholder.svg'}
                      alt={`${project.title} telemetry preview`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Cybernetic scanning laser beam on hover */}
                    <div className="card-laser-beam" />

                    {/* Cyan vignette overlay on hover */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,transparent_30%,color-mix(in_oklch,var(--primary)_25%,transparent)_100%)]" />

                    {/* Gradient bottom overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent opacity-60" />

                    {/* Top Category Badge */}
                    <span className="absolute left-3 top-3 rounded bg-background/90 px-2 py-0.5 font-mono text-[10px] font-semibold text-primary border border-border backdrop-blur-md">
                      {project.category}
                    </span>

                    {/* Badge if present */}
                    {project.badge && (
                      <span className="absolute right-3 top-3 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 font-mono text-[10px] font-bold backdrop-blur-md">
                        {project.badge}
                      </span>
                    )}

                    {/* Quick specs pill on bottom of image */}
                    {project.telemetrySpec && (
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:left-3 sm:right-3 flex items-center justify-between rounded bg-background/90 px-2.5 py-1 text-[10px] sm:text-[11px] font-mono border border-border/80 text-muted-foreground backdrop-blur-md">
                        <div className="flex items-center gap-1.5 truncate">
                          <Cpu className="size-3 text-primary shrink-0" />
                          <span className="truncate text-foreground font-medium">
                            {project.telemetrySpec.target}
                          </span>
                        </div>
                        {project.telemetrySpec.latency && (
                          <span className="text-[10px] text-emerald-400 font-bold shrink-0 ml-2">
                            {project.telemetrySpec.latency}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-1 flex-col p-4 sm:p-6">
                    {/* Title & Click to Inspect */}
                    <div onClick={() => openProject(project)} className="cursor-pointer">
                      <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-pretty text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                    </div>

                    {/* Technical Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            setSelectedTag(tag)
                            cyberAudio.click(0.015)
                          }}
                          className="rounded border border-border/70 bg-secondary/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    {/* Interactive Telemetry / Code Drawer Trigger Toolbar */}
                    <div className="mt-5 pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-1.5 font-mono text-[11px]">
                      <span className="text-[10px] text-muted-foreground">TELEMETRY_DRAWER:</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => toggleCardDrawer(project.title, 'specs')}
                          className={cn(
                            'rounded px-2 py-1 transition-all border',
                            activeDrawer === 'specs'
                              ? 'border-primary bg-primary/20 text-primary font-bold'
                              : 'border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground'
                          )}
                        >
                          [SPECS]
                        </button>
                        {project.codeSnippet && (
                          <button
                            type="button"
                            onClick={() => toggleCardDrawer(project.title, 'code')}
                            className={cn(
                              'rounded px-2 py-1 transition-all border',
                              activeDrawer === 'code'
                                ? 'border-primary bg-primary/20 text-primary font-bold'
                                : 'border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground'
                            )}
                          >
                            [CODE]
                          </button>
                        )}
                        {project.architectureFlow && (
                          <button
                            type="button"
                            onClick={() => toggleCardDrawer(project.title, 'flow')}
                            className={cn(
                              'rounded px-2 py-1 transition-all border',
                              activeDrawer === 'flow'
                                ? 'border-primary bg-primary/20 text-primary font-bold'
                                : 'border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground'
                            )}
                          >
                            [FLOW]
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Expandable Quick Drawer Panel */}
                    {activeDrawer && (
                      <div className="mt-3 rounded-xl border border-primary/30 bg-black/80 p-3 font-mono text-xs animate-fade-in space-y-2">
                        {/* Drawer View: SPECS */}
                        {activeDrawer === 'specs' && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-[10px] text-primary border-b border-border/40 pb-1">
                              <span>HARDWARE SPECIFICATION INSIGHTS</span>
                              <span>TARGET_MCU</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[11px]">
                              <div className="rounded bg-secondary/30 p-1.5 border border-border/40">
                                <span className="text-[9px] text-muted-foreground block">SILICON</span>
                                <span className="font-bold text-foreground">
                                  {project.telemetrySpec?.target || 'Custom Architecture'}
                                </span>
                              </div>
                              <div className="rounded bg-secondary/30 p-1.5 border border-border/40">
                                <span className="text-[9px] text-muted-foreground block">PROTOCOL</span>
                                <span className="font-bold text-primary">
                                  {project.telemetrySpec?.protocol || 'SPI / I2C / Serial'}
                                </span>
                              </div>
                              <div className="rounded bg-secondary/30 p-1.5 border border-border/40">
                                <span className="text-[9px] text-muted-foreground block">LATENCY / TIMING</span>
                                <span className="font-bold text-emerald-400">
                                  {project.telemetrySpec?.latency || 'Real-time Deterministic'}
                                </span>
                              </div>
                              <div className="rounded bg-secondary/30 p-1.5 border border-border/40">
                                <span className="text-[9px] text-muted-foreground block">CLOCK / SPEED</span>
                                <span className="font-bold text-cyan-400">
                                  {project.telemetrySpec?.clockSpeed || 'Nominal Clock'}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Drawer View: CODE */}
                        {activeDrawer === 'code' && project.codeSnippet && (
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[10px] text-muted-foreground border-b border-border/40 pb-1">
                              <span className="text-cyan-400">{project.codeSnippet.filename}</span>
                              <button
                                type="button"
                                onClick={() => copyCode(project.title, project.codeSnippet!.code)}
                                className="flex items-center gap-1 rounded bg-secondary/60 px-1.5 py-0.5 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                              >
                                {isSnippetCopied ? (
                                  <>
                                    <Check className="size-3 text-emerald-400" />
                                    <span className="text-emerald-400">COPIED</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="size-3" />
                                    <span>COPY</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <pre className="max-h-40 overflow-y-auto rounded bg-black/60 p-2 text-[10px] text-foreground/90 font-mono leading-relaxed whitespace-pre-wrap">
                              {project.codeSnippet.code}
                            </pre>
                          </div>
                        )}

                        {/* Drawer View: FLOW */}
                        {activeDrawer === 'flow' && project.architectureFlow && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-[10px] text-muted-foreground border-b border-border/40 pb-1">
                              <span className="text-emerald-400">PIPELINE DATA FLOW</span>
                              <span>{project.architectureFlow.length} STAGES</span>
                            </div>
                            <div className="space-y-1.5">
                              {project.architectureFlow.map((step, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 rounded bg-secondary/20 px-2 py-1 text-[11px]"
                                >
                                  <span className="size-4 shrink-0 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[9px] font-bold">
                                    {idx + 1}
                                  </span>
                                  <span className="text-foreground/90">{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Bottom Action Footer */}
                    <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono">
                      <button
                        type="button"
                        onClick={() => openProject(project)}
                        className="inline-flex min-h-[36px] items-center gap-1 text-primary font-bold hover:underline py-1 px-1.5 rounded transition-colors"
                      >
                        <span>INSPECT_SPECS</span>
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>

                      <div className="flex items-center gap-1.5">
                        {project.demo && project.demo !== '#' && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors p-1.5 rounded border border-transparent hover:border-border/60 hover:bg-secondary/40"
                            title={project.demoLabel || 'Live Demo'}
                          >
                            <ExternalLink className="size-3.5" />
                            <span className="text-[11px]">{project.demoLabel ? 'DEMO' : 'LIVE'}</span>
                          </a>
                        )}
                        {project.repo && project.repo !== '#' && (
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors p-1.5 rounded border border-transparent hover:border-border/60 hover:bg-secondary/40"
                            title="View Repository"
                          >
                            <GithubIcon className="size-3.5" />
                            <span className="text-[11px]">CODE</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {visible.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-border/80 p-12 text-center font-mono">
            <Cpu className="mx-auto size-8 text-muted-foreground/40 mb-3" />
            <div className="text-sm font-bold text-foreground">NO MATCHING SYSTEMS FOUND</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Try adjusting your query or resetting the tag filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilter('All')
                setSelectedTag(null)
                setSearchQuery('')
              }}
              className="mt-4 rounded-lg bg-primary/10 border border-primary/30 px-3 py-1.5 text-xs text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all"
            >
              RESET ALL FILTERS
            </button>
          </div>
        )}
      </div>

      <ProjectModal project={selected} open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  )
}
