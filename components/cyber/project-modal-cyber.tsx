'use client'

import Image from 'next/image'
import { Dialog } from '@base-ui/react/dialog'
import { Check, X, ExternalLink, Cpu, Terminal, Radio } from 'lucide-react'
import { GithubIcon } from '@/components/brand-icons'
import { Button } from '@/components/ui/button'
import type { Project } from '@/lib/portfolio-data'

type ProjectModalProps = {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectModalCyber({ project, open, onOpenChange }: ProjectModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 flex max-h-[90dvh] w-[calc(100vw-1.5rem)] sm:w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl transition-all duration-300 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
          {project && (
            <>
              {/* Image & Header Banner */}
              <div className="relative aspect-[16/9] max-h-48 sm:max-h-64 shrink-0 overflow-hidden border-b border-border/70 bg-muted">
                <Image
                  src={project.image || '/placeholder.svg'}
                  alt={`${project.title} technical snapshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, 42rem"
                  className="object-cover"
                />

                {/* Overlaid Header Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5 sm:gap-2">
                  <span className="rounded bg-background/90 px-2 sm:px-2.5 py-1 font-mono text-[10px] sm:text-[11px] font-bold text-primary border border-border/80 backdrop-blur-md">
                    {project.category}
                  </span>
                  {project.badge && (
                    <span className="rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-1 font-mono text-[9px] sm:text-[10px] font-bold backdrop-blur-md">
                      {project.badge}
                    </span>
                  )}
                </div>

                <Dialog.Close
                  className="absolute right-3 top-3 inline-flex size-10 sm:size-9 items-center justify-center rounded-lg border border-border bg-background/90 text-foreground backdrop-blur-md transition-all duration-200 hover:bg-primary/20 hover:text-primary active:scale-95 shadow-md z-10"
                  aria-label="Close"
                >
                  <X className="size-5 sm:size-4" />
                </Dialog.Close>

                {/* Title over image bottom */}
                <div className="absolute bottom-3 left-4 right-4">
                  <Dialog.Title className="text-lg sm:text-2xl font-extrabold tracking-tight text-foreground drop-shadow leading-tight">
                    {project.title}
                  </Dialog.Title>
                </div>
              </div>

              {/* Scrollable Technical Dossier */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-5 sm:space-y-6">
                {/* Role / Authorship */}
                {project.role && (
                  <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs font-mono text-primary">
                    <Terminal className="size-3.5 shrink-0" />
                    <span className="break-words">ROLE: {project.role}</span>
                  </div>
                )}

                {/* Hardware Telemetry Spec Banner if available */}
                {project.telemetrySpec && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 rounded-xl border border-border/80 bg-secondary/30 p-3 font-mono text-xs">
                    <div>
                      <div className="text-[10px] text-muted-foreground">TARGET_SILICON</div>
                      <div className="font-bold text-foreground truncate">{project.telemetrySpec.target}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground">COMM_PROTOCOL</div>
                      <div className="font-bold text-primary truncate">{project.telemetrySpec.protocol}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground">SYSTEM_TIMING</div>
                      <div className="font-bold text-emerald-400 truncate">{project.telemetrySpec.latency || 'Real-Time'}</div>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                    TECHNICAL ARCHITECTURE
                  </h4>
                  <Dialog.Description className="text-pretty text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {project.longDescription}
                  </Dialog.Description>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2.5">
                    KEY ENGINEERING DELIVERABLES
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-foreground/90 bg-secondary/20 border border-border/50 rounded-lg p-2.5"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span className="text-pretty">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code Snippet & Pipeline Flow if available */}
                {project.architectureFlow && (
                  <div>
                    <h4 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                      SYSTEM DATAFLOW PIPELINE
                    </h4>
                    <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                      {project.architectureFlow.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <span className="rounded bg-secondary/70 border border-border/80 px-2 py-1 text-foreground/90 font-medium">
                            {step}
                          </span>
                          {idx < project.architectureFlow!.length - 1 && (
                            <span className="text-primary font-bold">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {project.codeSnippet && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        CORE FIRMWARE / ALGORITHM LOGIC
                      </h4>
                      <span className="font-mono text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        {project.codeSnippet.filename}
                      </span>
                    </div>
                    <pre className="max-h-48 overflow-y-auto rounded-xl border border-border/70 bg-black/85 p-3 text-[11px] text-emerald-400 font-mono leading-relaxed whitespace-pre-wrap">
                      {project.codeSnippet.code}
                    </pre>
                  </div>
                )}

                {/* Tech Stack */}
                <div>
                  <h4 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                    TECHNOLOGY STACK & PROTOCOLS
                  </h4>
                  <ul className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded border border-border/80 bg-secondary/50 px-2.5 py-1 font-mono text-xs text-foreground/80"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 border-t border-border/60">
                  {project.demo && project.demo !== '#' && (
                    <Button
                      render={<a href={project.demo} target="_blank" rel="noopener noreferrer" />}
                      nativeButton={false}
                      size="lg"
                      className="w-full sm:w-auto min-h-[44px] gap-2 font-mono text-xs tracking-wider uppercase font-bold bg-primary text-primary-foreground hover:bg-primary/90 justify-center"
                    >
                      <ExternalLink className="size-4" />
                      {project.demoLabel || 'Launch Telemetry / Demo'}
                    </Button>
                  )}
                  {project.repo && project.repo !== '#' && (
                    <Button
                      render={<a href={project.repo} target="_blank" rel="noopener noreferrer" />}
                      nativeButton={false}
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto min-h-[44px] gap-2 font-mono text-xs tracking-wider uppercase hover:border-primary/50 justify-center"
                    >
                      <GithubIcon className="size-4" />
                      {project.repoLabel || 'Source Code'}
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
