'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Award, ExternalLink, X, FileText, CheckCircle2, Terminal } from 'lucide-react'
import { certifications } from '@/lib/portfolio-data'
import { Reveal } from '@/components/reveal'

export function Certifications() {
  const [selected, setSelected] = useState<(typeof certifications)[number] | null>(null)

  // Lock body scroll and handle Escape key when certificate modal is open
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selected])

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
        <div className="mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <Reveal key={cert.name} delay={i * 30}>
              <button
                type="button"
                onClick={() => setSelected(cert)}
                className="group relative flex h-full w-full flex-col justify-between rounded-xl border border-border/80 bg-card/60 p-4 sm:p-5 text-left backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 min-h-[44px]"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                      <Award className="size-4" />
                    </span>
                    {cert.category && (
                      <span className="rounded bg-secondary/80 border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground shrink-0">
                        {cert.category}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors break-words">
                    {cert.name}
                  </h3>

                  <p className="mt-2 font-mono text-[11px] text-muted-foreground leading-relaxed break-words">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-md p-3 sm:p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative flex max-h-[90dvh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/70 px-4 sm:px-6 py-3.5 sm:py-4 bg-secondary/30 gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm sm:text-base text-foreground leading-tight truncate">{selected.name}</h3>
                <p className="font-mono text-xs text-primary mt-0.5 truncate">{selected.issuer} • {selected.date}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close certificate viewer"
                className="inline-flex size-10 sm:size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background/80 text-foreground transition-all hover:bg-accent active:scale-95"
              >
                <X className="size-5 sm:size-4" />
              </button>
            </div>

            {/* Content view */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-6">
              {selected.image.endsWith('.pdf') ? (
                <div className="flex flex-col items-center gap-4 rounded-xl border border-border/80 bg-secondary/20 p-6 sm:p-10 text-center">
                  <FileText className="size-12 sm:size-16 text-primary" />
                  <div>
                    <h4 className="font-bold text-foreground text-sm sm:text-base">Document: PDF Certificate</h4>
                    <p className="font-mono text-xs text-muted-foreground mt-1 break-words">{selected.name}</p>
                  </div>
                  <a
                    href={selected.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-primary px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90"
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
                    className="w-full h-auto object-contain"
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
