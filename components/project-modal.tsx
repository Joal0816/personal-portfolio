'use client'

import Image from 'next/image'
import { Dialog } from '@base-ui/react/dialog'
import { Check, X, ExternalLink, User } from 'lucide-react'
import { GithubIcon } from '@/components/brand-icons'
import { Button } from '@/components/ui/button'
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
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 grid max-h-[90vh] w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 grid-rows-[auto_1fr] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
          {project && (
            <>
              {/* Image header */}
              <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-muted">
                <Image
                  src={project.image || '/placeholder.svg'}
                  alt={`${project.title} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 42rem"
                  className="object-cover"
                />
                <Dialog.Close
                  className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-lg border border-border bg-background/80 text-foreground backdrop-blur-md transition-all duration-200 hover:bg-accent active:scale-95"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </Dialog.Close>
              </div>

              {/* Content */}
              <div className="overflow-y-auto p-6 sm:p-8">
                <span className="font-mono text-xs uppercase tracking-widest text-primary">
                  {project.category}
                </span>
                <Dialog.Title className="mt-2 text-2xl font-bold tracking-tight">
                  {project.title}
                </Dialog.Title>

                {/* Role */}
                {project.role && (
                  <p className="mt-2 flex items-center gap-1.5 font-mono text-sm text-primary/80">
                    <User className="size-3.5" />
                    {project.role}
                  </p>
                )}

                <Dialog.Description className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                  {project.longDescription}
                </Dialog.Description>

                {/* Features */}
                <h4 className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Key features
                </h4>
                <ul className="mt-3 grid gap-2.5">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-pretty">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <h4 className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Tech stack
                </h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 font-mono text-xs text-secondary-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                {/* Action buttons */}
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.demo && project.demo !== '#' && (
                    <Button
                      render={<a href={project.demo} target="_blank" rel="noopener noreferrer" />}
                      nativeButton={false}
                      size="lg"
                      className="gap-1.5"
                    >
                      Live Demo
                      <ExternalLink className="size-4" />
                    </Button>
                  )}
                  {project.repo && project.repo !== '#' && (
                    <Button
                      render={<a href={project.repo} target="_blank" rel="noopener noreferrer" />}
                      nativeButton={false}
                      size="lg"
                      variant="outline"
                      className="gap-1.5"
                    >
                      <GithubIcon className="size-4" />
                      View Code
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
