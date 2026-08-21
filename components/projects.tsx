'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
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

  function openProject(project: Project) {
    setSelected(project)
    setModalOpen(true)
  }

  return (
    <section id="projects" className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <p className="mb-3 font-mono text-sm text-primary">02 / Projects</p>
          <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Selected work I&apos;m proud of.
          </h2>
        </Reveal>

        {/* Category filter pills */}
        <Reveal delay={80}>
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
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
                    'rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all duration-200',
                    isActive
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground',
                  )}
                >
                  {f}
                </button>
              )
            })}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {visible.map((project, i) => (
            <Reveal as="article" key={project.title} delay={i * 60}>
              <button
                type="button"
                onClick={() => openProject(project)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-muted">
                  <Image
                    src={project.image || '/placeholder.svg'}
                    alt={`${project.title} interface preview`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full border border-border bg-background/80 px-2.5 py-0.5 font-mono text-[0.7rem] text-muted-foreground backdrop-blur-md">
                    {project.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-pretty leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    View details
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-10 text-center font-mono text-sm text-muted-foreground">
            No projects in this category yet.
          </p>
        )}
      </div>

      <ProjectModal project={selected} open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  )
}
