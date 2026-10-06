'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { ExternalLink, X, FileText, Award } from 'lucide-react'
import { certifications } from '@/lib/portfolio-data'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

type TrackFilter = 'ALL' | 'TECH' | 'ACADEMIC' | 'BUSINESS_DATA'

export function Certifications() {
  const [selected, setSelected] = useState<(typeof certifications)[number] | null>(null)
  const [activeTrack, setActiveTrack] = useState<TrackFilter>('ALL')

  // Lock body scroll and handle Escape key when certificate viewer is open
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

  const filteredCerts = useMemo(() => {
    if (activeTrack === 'ALL') return certifications
    if (activeTrack === 'TECH') {
      return certifications.filter((c) =>
        ['Hackathon & AI', 'Edge AI & Professional', 'Quantum Computing', 'Smart Agriculture & IoT', 'Innovation Award', 'RTOS & Embedded', 'Professional Dev', 'Open Source'].includes(c.category)
      )
    }
    if (activeTrack === 'ACADEMIC') {
      return certifications.filter((c) =>
        ['Academic Honors', 'Academic Merit', 'Academic Records', 'Research Colloquium'].includes(c.category)
      )
    }
    if (activeTrack === 'BUSINESS_DATA') {
      return certifications.filter((c) =>
        ['Technopreneurship', 'Data & Analytics'].includes(c.category)
      )
    }
    return certifications
  }, [activeTrack])

  return (
    <section id="certifications" className="relative border-t border-border">
      <div className="relative mx-auto max-w-6xl px-5 pt-14 pb-12 sm:px-8 md:pt-18 md:pb-14">
        <div className="grid gap-10 lg:grid-cols-[10rem_1fr] lg:gap-14">
          {/* Margin rail */}
          <div>
            <p className="marginalia text-2xl leading-tight lg:sticky lg:top-24">
              the paper
              <br />
              trail
            </p>
          </div>

          <div className="min-w-0">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <h2 className="max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                    Certificates &amp; the record.
                  </h2>
                  <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                    Hackathons, symposiums, seminars, and academic recognition —
                    every one of these is a scan of the real document. Tap a row
                    to open it.
                  </p>
                </div>
                <p className="meta">
                  {filteredCerts.length} of {certifications.length} entries
                </p>
              </div>
            </Reveal>

            {/* Track filter — index tabs */}
            <Reveal delay={60}>
              <div
                className="scroll-strip mt-9 flex border-b border-border"
                role="tablist"
                aria-label="Filter certificates by track"
              >
                {[
                  { id: 'ALL', label: 'Everything' },
                  { id: 'TECH', label: 'Tech & embedded' },
                  { id: 'ACADEMIC', label: 'Academic & honors' },
                  { id: 'BUSINESS_DATA', label: 'Data & entrepreneurship' },
                ].map((track) => {
                  const isActive = activeTrack === track.id
                  return (
                    <button
                      key={track.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      data-active={isActive}
                      onClick={() => setActiveTrack(track.id as TrackFilter)}
                      className={cn(
                        'index-tab min-h-[42px] shrink-0 whitespace-nowrap px-4 py-2.5 text-sm transition-colors',
                        isActive
                          ? 'text-primary font-semibold'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {track.label}
                    </button>
                  )
                })}
              </div>
            </Reveal>

            {/* The ledger */}
            <ul className="mt-2">
              {filteredCerts.map((cert) => (
                <li key={cert.name}>
                  <button
                    type="button"
                    onClick={() => setSelected(cert)}
                    className="group flex w-full flex-col gap-2 border-b border-border py-5 text-left transition-colors hover:bg-card/70 sm:grid sm:grid-cols-[7.5rem_1fr_auto] sm:items-baseline sm:gap-x-4 sm:gap-y-1"
                  >
                    <span className="meta">{cert.date}</span>

                    <span className="min-w-0">
                      <span className="flex items-start gap-2">
                        <span className="mt-0.5 shrink-0 text-primary">
                          {cert.image.endsWith('.pdf') ? (
                            <FileText className="size-4" />
                          ) : (
                            <Award className="size-4" />
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[15px] font-semibold leading-snug transition-colors group-hover:text-primary">
                            {cert.name}
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                            {cert.issuer}
                          </span>
                        </span>
                      </span>
                    </span>

                    <span className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:flex-nowrap sm:justify-end">
                      <span className="whitespace-nowrap rounded-sm border border-border bg-secondary/60 px-2 py-0.5 text-[11px] text-secondary-foreground">
                        {cert.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-primary">
                        <span className="pencil-underline">Open</span>
                        <ExternalLink className="size-3" />
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Certificate viewer */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/35 p-3 backdrop-blur-[2px] sm:p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-border bg-card shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3.5 sm:px-6">
              <div className="min-w-0">
                <h3 className="truncate text-[15px] font-semibold leading-tight sm:text-base">
                  {selected.name}
                </h3>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {selected.issuer} · {selected.date}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close certificate viewer"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-secondary/60 text-foreground transition-colors hover:border-primary/50 hover:text-primary active:scale-95 sm:size-8"
              >
                <X className="size-5 sm:size-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-6">
              {selected.image.endsWith('.pdf') ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-secondary/40 px-4 py-2">
                    <span className="truncate text-xs text-muted-foreground">{selected.name}</span>
                    <a
                      href={selected.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <ExternalLink className="size-3.5" />
                      <span>Open the full PDF</span>
                    </a>
                  </div>
                  <iframe
                    src={selected.image}
                    title={selected.name}
                    className="h-[60vh] w-full rounded-md border border-border bg-card"
                  />
                </div>
              ) : (
                <div className="photo-print rounded-[3px] p-2.5">
                  <Image
                    src={selected.image}
                    alt={selected.name}
                    width={900}
                    height={650}
                    className="h-auto w-full rounded-[2px] object-contain"
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
