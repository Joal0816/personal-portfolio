'use client'

import Image from 'next/image'
import { Dialog } from '@base-ui/react/dialog'
import { Check, X, ExternalLink, Code2, GitBranch, Wrench, NotebookText } from 'lucide-react'
import { GithubIcon } from '@/components/brand-icons'
import { Button } from '@/components/ui/button'
import { HyphenSafe } from '@/components/text-fixes'
import type { Project } from '@/lib/portfolio-data'

type ProjectModalProps = {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-foreground/35 backdrop-blur-[2px] transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 flex max-h-[90dvh] w-[calc(100vw-1.5rem)] sm:w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-lift transition-all duration-300 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
          {project && (
            <>
              {/* The photo print at the top of the page */}
              <div className="relative h-48 sm:h-64 w-full shrink-0 overflow-hidden border-b border-border bg-secondary">
                <div className="thumb-mat absolute inset-0">
                  <Image
                    src={project.image || '/placeholder.svg'}
                    alt={`${project.title} — project screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 42rem"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card via-card/70 to-transparent" />

                <div className="absolute left-4 top-3 flex flex-wrap items-center gap-1.5">
                  <span className="rounded-sm border border-border bg-card px-2 py-0.5 text-xs text-primary">
                    {project.category}
                  </span>
                  {project.badge && (
                    <span className="rounded-sm border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {project.badge}
                    </span>
                  )}
                </div>

                <Dialog.Close
                  className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:border-primary/50 hover:text-primary active:scale-95 sm:size-9"
                  aria-label="Close"
                >
                  <X className="size-5 sm:size-4" />
                </Dialog.Close>

                <div className="absolute bottom-2 left-4 right-4">
                  <Dialog.Title className="text-xl font-extrabold leading-tight tracking-tight sm:text-2xl">
                    {project.title}
                  </Dialog.Title>
                </div>
              </div>

              {/* The note itself */}
              <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
                {project.role && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">My part: </span>
                    {project.role}
                  </p>
                )}

                {project.telemetrySpec && (
                  <dl className="measure mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-border py-4 text-xs sm:grid-cols-3">
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
                  </dl>
                )}

                <div className="mt-6">
                  <h4 className="flex items-center gap-2 text-sm font-semibold">
                    <NotebookText className="size-4 text-primary" />
                    What it does
                  </h4>
                  <Dialog.Description className="mt-2.5 max-w-[64ch] text-pretty text-[15px] leading-relaxed text-foreground/85">
                    {project.longDescription}
                  </Dialog.Description>
                </div>

                <div className="mt-7">
                  <h4 className="flex items-center gap-2 text-sm font-semibold">
                    <Check className="size-4 text-primary" />
                    What I built
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-[15px] leading-relaxed">
                        <span
                          aria-hidden
                          className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-primary/70"
                        />
                        <span className="text-pretty">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {project.architectureFlow && (
                  <div className="mt-7">
                    <h4 className="flex items-center gap-2 text-sm font-semibold">
                      <GitBranch className="size-4 text-primary" />
                      How the data flows
                    </h4>
                    <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2">
                      {project.architectureFlow.map((step, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="measure rounded-sm border border-border bg-secondary/60 px-2.5 py-1.5 text-xs text-foreground/90">
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
                  </div>
                )}

                {project.codeSnippet && (
                  <div className="mt-7">
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="flex items-center gap-2 text-sm font-semibold">
                        <Code2 className="size-4 text-primary" />
                        The interesting part of the code
                      </h4>
                      <span className="measure shrink-0 text-xs text-muted-foreground">
                        {project.codeSnippet.filename}
                      </span>
                    </div>
                    <pre className="mt-3 max-h-52 overflow-y-auto rounded-md border border-border bg-secondary/50 p-4 text-xs leading-relaxed text-foreground/90">
                      <code>{project.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                <div className="mt-7">
                  <h4 className="flex items-center gap-2 text-sm font-semibold">
                    <Wrench className="size-4 text-primary" />
                    Tools &amp; parts
                  </h4>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-sm border border-border bg-secondary/60 px-2.5 py-1 text-xs text-secondary-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-col gap-2.5 border-t border-border pt-6 sm:flex-row sm:flex-wrap">
                  {project.demo && project.demo !== '#' && (
                    <Button
                      render={<a href={project.demo} target="_blank" rel="noopener noreferrer" />}
                      nativeButton={false}
                      size="lg"
                      className="min-h-[44px] gap-2 rounded-md bg-primary px-5 font-semibold text-primary-foreground hover:bg-primary/90"
                    >
                      <ExternalLink className="size-4" />
                      {project.demoLabel || 'Open the live build'}
                    </Button>
                  )}
                  {project.repo && project.repo !== '#' && (
                    <Button
                      render={<a href={project.repo} target="_blank" rel="noopener noreferrer" />}
                      nativeButton={false}
                      size="lg"
                      variant="outline"
                      className="min-h-[44px] gap-2 rounded-md px-5 font-semibold"
                    >
                      <GithubIcon className="size-4" />
                      {project.repoLabel || 'Source code'}
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
