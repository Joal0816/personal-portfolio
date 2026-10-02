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

type Filter = 'All' | ProjectCategory

export function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const [selected, setSelected] = useState<Project | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const filters: Filter[] = ['All', ...projectCategories]

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: projects.length }
    for (const p of projects) {
      map[p.category] = (map[p.category] || 0) + 1
    }
    return map
  }, [])

  function openProject(project: Project) {
    setSelected(project)
    setModalOpen(true)
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
            <span>[SYS_MODULE // 02] DEPLOYED WORK & REPOSITORIES</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="max-w-2xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
                Engineering Projects & Systems
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

        {/* Filter Pills */}
        <Reveal delay={80}>
          <div
            className="mt-8 flex flex-wrap gap-2"
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
                  onClick={() => setFilter(f)}
                  className={cn(
                    'rounded-lg border px-3.5 py-1.5 font-mono text-xs transition-all duration-200 flex items-center gap-1.5',
                    isActive
                      ? 'border-primary bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/20'
                      : 'border-border/80 bg-secondary/30 text-muted-foreground hover:border-primary/40 hover:text-foreground',
                  )}
                >
                  <span>{f.toUpperCase()}</span>
                  <span
                    className={cn(
                      'text-[10px] px-1.5 py-0.2 rounded font-mono',
                      isActive ? 'bg-primary-foreground/20 text-primary-foreground' : 'text-primary'
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
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {visible.map((project, i) => (
            <Reveal as="article" key={project.title} delay={i * 40}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/10">
                {/* Image Section */}
                <div
                  onClick={() => openProject(project)}
                  className="relative aspect-[16/10] overflow-hidden border-b border-border/60 bg-muted cursor-pointer"
                >
                  <Image
                    src={project.image || '/placeholder.svg'}
                    alt={`${project.title} telemetry preview`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />

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
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between rounded bg-background/90 px-2.5 py-1 text-[11px] font-mono border border-border/80 text-muted-foreground backdrop-blur-md">
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
                <div className="flex flex-1 flex-col p-6">
                  {/* Title & Click to Inspect */}
                  <div
                    onClick={() => openProject(project)}
                    className="cursor-pointer"
                  >
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
                      <span
                        key={tag}
                        className="rounded border border-border/70 bg-secondary/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => openProject(project)}
                      className="inline-flex items-center gap-1 text-primary font-bold hover:underline"
                    >
                      <span>INSPECT_SPECS</span>
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.demo && project.demo !== '#' && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors p-1"
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
                          className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors p-1"
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
          ))}
        </div>

        {visible.length === 0 && (
          <div className="mt-10 rounded-2xl border border-border bg-card p-12 text-center">
            <p className="font-mono text-sm text-muted-foreground">
              NO UNITS LOGGED UNDER THIS FILTER CATEGORY.
            </p>
          </div>
        )}
      </div>

      {/* Detail Technical Modal */}
      <ProjectModal
        project={selected}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </section>
  )
}
