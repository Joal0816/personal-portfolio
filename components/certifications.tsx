'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Award, ExternalLink, X } from 'lucide-react'
import { certifications } from '@/lib/portfolio-data'
import { Reveal } from '@/components/reveal'

export function Certifications() {
  const [selected, setSelected] = useState<(typeof certifications)[number] | null>(null)

  return (
    <section id="certifications" className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <Reveal>
          <p className="mb-3 font-mono text-sm text-primary">03 / Certifications</p>
          <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Training & Workshops
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
            Continuous learning through industry-recognized certifications and hands-on workshops.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <Reveal key={cert.name} delay={i * 40}>
              <button
                type="button"
                onClick={() => setSelected(cert)}
                className="group flex w-full items-start gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary/50 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Award className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-foreground leading-tight">
                    {cert.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-primary">
                    {cert.issuer}
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                    {cert.date}
                  </p>
                </div>
                <ExternalLink className="mt-1 size-3.5 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-primary" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative mx-4 max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h3 className="font-semibold text-foreground">{selected.name}</h3>
                <p className="font-mono text-xs text-primary">{selected.date}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-secondary/40 text-foreground transition-all hover:bg-accent active:scale-95"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Certificate Image */}
            <div className="overflow-y-auto p-4" style={{ maxHeight: 'calc(90vh - 80px)' }}>
              {selected.image.endsWith('.pdf') ? (
                <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-secondary/30 p-8 text-center">
                  <Award className="size-12 text-primary" />
                  <p className="text-sm text-muted-foreground">PDF certificate</p>
                  <a
                    href={selected.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
                  >
                    <ExternalLink className="size-4" />
                    Open PDF
                  </a>
                </div>
              ) : (
                <Image
                  src={selected.image}
                  alt={selected.name}
                  width={800}
                  height={600}
                  className="w-full rounded-lg border border-border object-contain"
                  unoptimized
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
