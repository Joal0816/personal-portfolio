'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Award, ExternalLink, X, FileText, CheckCircle2, Terminal } from 'lucide-react'
import { certifications } from '@/lib/portfolio-data'
import { Reveal } from '@/components/reveal'

export function Certifications() {
  const [selected, setSelected] = useState<(typeof certifications)[number] | null>(null)

  return (
    <section id="certifications" className="relative border-t border-border/80 bg-card/30 py-24 md:py-32">
      {/* Background accents */}
      <div className="tech-dots pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex items-center gap-2 font-mono text-xs text-primary mb-3">
            <Terminal className="size-3.5" />
            <span>[SYS_LOG // 04] CREDENTIALS & TECHNICAL EXHIBITIONS</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="max-w-2xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
                Certifications & Symposiums
              </h2>
              <p className="mt-3 max-w-xl text-pretty text-muted-foreground text-sm sm:text-base">
                Conferences, hackathons, RTOS exhibits, and technical workshops across Mindanao and international webinar circuits.
              </p>
            </div>
            <div className="font-mono text-xs text-muted-foreground bg-secondary/50 border border-border/80 px-3 py-1.5 rounded-lg w-fit">
              LOGGED: <span className="text-primary font-bold">{certifications.length}</span> RECORDS
            </div>
          </div>
        </Reveal>

        {/* Certifications Grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <Reveal key={cert.name} delay={i * 30}>
              <button
                type="button"
                onClick={() => setSelected(cert)}
                className="group relative flex h-full w-full flex-col justify-between rounded-xl border border-border/80 bg-card/60 p-5 text-left backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                      <Award className="size-4" />
                    </span>
                    {cert.category && (
                      <span className="rounded bg-secondary/80 border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {cert.category}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                    {cert.name}
                  </h3>

                  <p className="mt-2 font-mono text-[11px] text-muted-foreground leading-relaxed">
                    {cert.issuer}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-primary font-medium">{cert.date}</span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground group-hover:text-primary transition-colors">
                    <span>VIEW</span>
                    <ExternalLink className="size-3" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-md p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/70 px-6 py-4 bg-secondary/30">
              <div>
                <h3 className="font-bold text-base text-foreground leading-tight">{selected.name}</h3>
                <p className="font-mono text-xs text-primary mt-0.5">{selected.issuer} • {selected.date}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-background/80 text-foreground transition-all hover:bg-accent active:scale-95"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Content view */}
            <div className="overflow-y-auto p-4 sm:p-6" style={{ maxHeight: 'calc(90vh - 85px)' }}>
              {selected.image.endsWith('.pdf') ? (
                <div className="flex flex-col items-center gap-4 rounded-xl border border-border/80 bg-secondary/20 p-10 text-center">
                  <FileText className="size-16 text-primary" />
                  <div>
                    <h4 className="font-bold text-foreground">Document: PDF Certificate</h4>
                    <p className="font-mono text-xs text-muted-foreground mt-1">{selected.name}</p>
                  </div>
                  <a
                    href={selected.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90"
                  >
                    <ExternalLink className="size-4" />
                    Open PDF in New Window
                  </a>
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-xl border border-border bg-black/40">
                  <Image
                    src={selected.image}
                    alt={selected.name}
                    width={900}
                    height={650}
                    className="w-full object-contain"
                    unoptimized
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
