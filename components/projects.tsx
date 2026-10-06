'use client'

import { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import {
  ArrowUpRight,
  ExternalLink,
  Search,
  X,
  Copy,
  Check,
  Cpu,
} from 'lucide-react'
import { GithubIcon } from '@/components/brand-icons'
import { Reveal } from '@/components/reveal'
import { ProjectModal } from '@/components/project-modal'
import { HyphenSafe } from '@/components/text-fixes'
import {
  projects,
  projectCategories,
  type Project,
  type ProjectCategory,
} from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'

type Filter = 'All' | ProjectCategory
type DrawerTab = 'specs' | 'code' | 'flow'

export function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [selected, setSelected] = useState<Project | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const [openDrawer, setOpenDrawer] = useState<string | null>(null)
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null)

  // The search hint is shortened on small screens so it never clips mid-word.
  const fullPlaceholder =
    'Search the notebooks — a chip, a protocol, a name (STM32, FreeRTOS, YOLO, I2C…)'
  const [searchPlaceholder, setSearchPlaceholder] = useState(fullPlaceholder)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const apply = () => setSearchPlaceholder(mq.matches ? 'Search the notebooks…' : fullPlaceholder)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filters: Filter[] = ['All', ...projectCategories]

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

  const featured = visible[0]
  const rest = visible.slice(1)

  function openProject(project: Project) {
    setSelected(project)
    setModalOpen(true)
  }

  function toggleDrawer(title: string, tab: DrawerTab) {
    const key = `${title}::${tab}`
    setOpenDrawer((prev) => (prev === key ? null : key))
  }

  function copyCode(title: string, code: string) {
    navigator.clipboard.writeText(code)
    setCopiedSnippet(title)
    setTimeout(() => setCopiedSnippet(null), 2000)
  }

  return (
    <section id="projects" className="relative border-t border-border bg-secondary/25">
      <div className="quadrille pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]" />

      <div className="relative mx-auto max-w-6xl px-5 pt-14 pb-12 sm:px-8 md:pt-18 md:pb-14">
        {/* Header */}
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                Things I&apos;ve built.
              </h2>
              <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                Firmware, tiny AI models, hardware rigs, and the web apps that
                make them useful. Every entry links to real code or a live build.
              </p>
            </div>
            <p className="meta">
              showing {visible.length} of {projects.length}
            </p>
          </div>
        </Reveal>

        {/* Search */}
        <Reveal delay={60}>
          <div className="mt-10 space-y-4">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 size-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="min-h-[46px] w-full rounded-md border border-border bg-card pl-10 pr-10 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 rounded p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Quick tags */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <span className="marginalia text-lg leading-none">by tag:</span>
              {popularTags.map((tag) => {
                const isSelected = selectedTag?.toLowerCase() === tag.toLowerCase()
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(isSelected ? null : tag)}
                    className={cn(
                      'min-h-[32px] rounded-sm border px-2.5 py-1 text-xs transition-colors',
                      isSelected
                        ? 'border-primary bg-primary text-primary-foreground font-semibold'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground',
                    )}
                  >
                    {tag}
                  </button>
                )
              })}
              {selectedTag && (
                <button
                  type="button"
                  onClick={() => setSelectedTag(null)}
                  className="pencil-underline ml-1 text-xs text-primary"
                  data-active="true"
                >
                  clear
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {/* Category index tabs */}
        <Reveal delay={80}>
          <div
            className="scroll-strip mt-8 -mx-5 flex border-b border-border px-5 sm:mx-0 sm:px-0"
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
                  data-active={isActive}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'index-tab flex min-h-[42px] shrink-0 items-center gap-2 whitespace-nowrap px-4 py-2.5 text-sm transition-colors',
                    isActive
                      ? 'text-primary font-semibold'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <span>{f === 'All' ? 'Everything' : f}</span>
                  <span className="measure text-[10px] text-muted-foreground">
                    {counts[f] || 0}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Featured entry — the big taped print */}
        {featured && (
          <Reveal as="article" className="mt-12" tilt={-0.4}>
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
              <div className="group">
                <div className="photo-print relative rounded-[3px] p-2.5">
                  <span
                    aria-hidden
                    className="tape absolute -top-2.5 left-8 h-5 w-20 rounded-[2px] [transform:rotate(-2deg)]"
                  />
                  <button
                    type="button"
                    onClick={() => openProject(featured)}
                    className="thumb-mat block w-full"
                    aria-label={`Open ${featured.title}`}
                  >
                    <Image
                      src={featured.image || '/placeholder.svg'}
                      alt={`${featured.title} — project screenshot`}
                      width={640}
                      height={420}
                      className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </button>
                </div>
              </div>

              <div className="min-w-0 lg:pt-2">
                <p className="marginalia text-xl leading-none">
                  {featured.category}
                  {featured.badge ? ` · ${featured.badge}` : ''}
                </p>
                <h3
                  className="mt-2 cursor-pointer text-3xl font-extrabold leading-tight tracking-tight transition-colors hover:text-primary sm:text-4xl"
                  onClick={() => openProject(featured)}
                >
                  {featured.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{featured.role}</p>
                <p className="mt-4 max-w-[54ch] text-pretty text-base leading-relaxed text-foreground/85">
                  {featured.description}
                </p>

                {featured.telemetrySpec && (
                  <dl className="measure mt-6 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-border pt-4 text-xs sm:grid-cols-4">
                    <div>
                      <dt className="text-muted-foreground">board</dt>
                      <dd className="mt-0.5 font-semibold text-foreground">
                        <HyphenSafe text={featured.telemetrySpec.target} />
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">link</dt>
                      <dd className="mt-0.5 font-semibold text-foreground">
                        <HyphenSafe text={featured.telemetrySpec.protocol} />
                      </dd>
                    </div>
                    {featured.telemetrySpec.latency && (
                      <div>
                        <dt className="text-muted-foreground">timing</dt>
                        <dd className="mt-0.5 font-semibold text-primary">
                          <HyphenSafe text={featured.telemetrySpec.latency} />
                        </dd>
                      </div>
                    )}
                    {featured.telemetrySpec.clockSpeed && (
                      <div>
                        <dt className="text-muted-foreground">clock</dt>
                        <dd className="mt-0.5 font-semibold text-foreground">
                          <HyphenSafe text={featured.telemetrySpec.clockSpeed} />
                        </dd>
                      </div>
                    )}
                  </dl>
                )}

                <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-1.5">
                  {featured.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-sm border border-border bg-card px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <button
                    type="button"
                    onClick={() => openProject(featured)}
                    className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    <span className="pencil-underline" data-active="true">
                      Read the full note
                    </span>
                    <ArrowUpRight className="size-4" />
                  </button>
                  {featured.demo && featured.demo !== '#' && (
                    <a
                      href={featured.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[40px] items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <ExternalLink className="size-4" />
                      {featured.demoLabel || 'Open it live'}
                    </a>
                  )}
                  {featured.repo && featured.repo !== '#' && (
                    <a
                      href={featured.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[40px] items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <GithubIcon className="size-4" />
                      {featured.repoLabel || 'Source code'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* The contents list */}
        {rest.length > 0 && (
          <ul className="mt-16 border-t border-border">
            {rest.map((project) => {
              const drawerKey =
                openDrawer && openDrawer.startsWith(`${project.title}::`)
                  ? openDrawer.split('::')[1]
                  : null

              return (
                <li key={project.title} className="border-b border-border">
                  <div className="group grid gap-x-6 gap-y-4 py-7 sm:grid-cols-[7.5rem_1fr_auto] sm:items-start">
                    {/* Small taped thumbnail */}
                    <div className="photo-print hidden rounded-[2px] p-1 sm:block">
                      <button
                        type="button"
                        onClick={() => openProject(project)}
                        className="thumb-mat block w-full"
                        aria-label={`Open ${project.title}`}
                      >
                        <Image
                          src={project.image || '/placeholder.svg'}
                          alt={`${project.title} thumbnail`}
                          width={220}
                          height={140}
                          className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </button>
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3
                          className="cursor-pointer text-xl font-bold leading-snug tracking-tight transition-colors hover:text-primary"
                          onClick={() => openProject(project)}
                        >
                          {project.title}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {project.category}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{project.role}</p>
                      <p className="mt-2.5 max-w-[62ch] text-pretty text-sm leading-relaxed text-foreground/85">
                        {project.description}
                      </p>

                      {/* Margin drawer: specs / code / flow — only the
                          sections this note actually has */}
                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                        {project.telemetrySpec && (
                          <button
                            type="button"
                            onClick={() => toggleDrawer(project.title, 'specs')}
                            className="pencil-underline inline-flex min-h-[32px] items-center text-xs text-muted-foreground"
                            data-active={drawerKey === 'specs'}
                          >
                            Specs
                          </button>
                        )}
                        {project.codeSnippet && (
                          <button
                            type="button"
                            onClick={() => toggleDrawer(project.title, 'code')}
                            className="pencil-underline inline-flex min-h-[32px] items-center text-xs text-muted-foreground"
                            data-active={drawerKey === 'code'}
                          >
                            Code
                          </button>
                        )}
                        {project.architectureFlow && (
                          <button
                            type="button"
                            onClick={() => toggleDrawer(project.title, 'flow')}
                            className="pencil-underline inline-flex min-h-[32px] items-center text-xs text-muted-foreground"
                            data-active={drawerKey === 'flow'}
                          >
                            How it flows
                          </button>
                        )}
                      </div>

                      {drawerKey && (
                        <div className="animate-settle-soft mt-3 rounded-md border border-border bg-card p-4">
                          {drawerKey === 'specs' && project.telemetrySpec && (
                            <dl className="measure grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs sm:grid-cols-4">
                              <div>
                                <dt className="text-muted-foreground">board</dt>
                                <dd className="mt-0.5 font-semibold text-foreground">
                                  <HyphenSafe text={project.telemetrySpec.target} />
                                </dd>
                              </div>
                              <div>
                                <dt className="text-muted-foreground">link</dt>
                                <dd className="mt-0.5 font-semibold text-foreground">
                                  <HyphenSafe text={project.telemetrySpec.protocol} />
                                </dd>
                              </div>
                              {project.telemetrySpec.latency && (
                                <div>
                                  <dt className="text-muted-foreground">timing</dt>
                                  <dd className="mt-0.5 font-semibold text-primary">
                                    <HyphenSafe text={project.telemetrySpec.latency} />
                                  </dd>
                                </div>
                              )}
                              {project.telemetrySpec.clockSpeed && (
                                <div>
                                  <dt className="text-muted-foreground">clock</dt>
                                  <dd className="mt-0.5 font-semibold text-foreground">
                                    <HyphenSafe text={project.telemetrySpec.clockSpeed} />
                                  </dd>
                                </div>
                              )}
                            </dl>
                          )}

                          {drawerKey === 'code' && project.codeSnippet && (
                            <div>
                              <div className="flex items-center justify-between gap-3">
                                <span className="measure text-xs text-muted-foreground">
                                  {project.codeSnippet.filename}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    copyCode(project.title, project.codeSnippet!.code)
                                  }
                                  className="inline-flex min-h-[32px] items-center gap-1.5 rounded-sm border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                                >
                                  {copiedSnippet === project.title ? (
                                    <>
                                      <Check className="size-3 text-primary" />
                                      <span>Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="size-3" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <pre className="mt-2.5 max-h-44 overflow-y-auto rounded-sm bg-secondary/60 p-3 text-xs leading-relaxed text-foreground/90">
                                <code>{project.codeSnippet.code}</code>
                              </pre>
                            </div>
                          )}

                          {drawerKey === 'flow' && project.architectureFlow && (
                            <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs">
                              {project.architectureFlow.map((step, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <span className="rounded-sm border border-border bg-secondary/60 px-2 py-1 text-foreground/90">
                                    {step}
                                  </span>
                                  {idx < project.architectureFlow!.length - 1 && (
                                    <span aria-hidden className="text-muted-foreground">
                                      →
                                    </span>
                                  )}
                                </li>
                              ))}
                            </ol>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
                      {project.demo && project.demo !== '#' && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[36px] items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
                        >
                          <ExternalLink className="size-3.5" />
                          <span>{project.demoLabel || 'Live'}</span>
                        </a>
                      )}
                      {project.repo && project.repo !== '#' && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[36px] items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
                        >
                          <GithubIcon className="size-3.5" />
                          <span>{project.repoLabel || 'Source code'}</span>
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => openProject(project)}
                        className="inline-flex min-h-[36px] items-center gap-1 text-xs font-semibold text-primary"
                      >
                        <span className="pencil-underline">Open note</span>
                        <ArrowUpRight className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}

        {visible.length === 0 && (
          <div className="mt-14 rounded-md border border-dashed border-border bg-card/60 p-12 text-center">
            <Cpu className="mx-auto size-7 text-muted-foreground/50" />
            <p className="mt-3 text-base font-semibold">Nothing on this page yet.</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              No project matches that search. Try a different word, or clear the
              filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilter('All')
                setSelectedTag(null)
                setSearchQuery('')
              }}
              className="mt-5 min-h-[40px] rounded-md border border-border bg-secondary/60 px-4 py-2 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
            >
              Reset everything
            </button>
          </div>
        )}
      </div>

      <ProjectModal project={selected} open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  )
}
