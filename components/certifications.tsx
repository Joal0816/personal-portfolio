'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Dialog } from '@base-ui/react/dialog'
import { ExternalLink, X } from 'lucide-react'
import { certifications } from '@/lib/portfolio-data'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

type TrackFilter = 'ALL' | 'TECH' | 'ACADEMIC' | 'BUSINESS_DATA'
const tracks: { id: TrackFilter; label: string; categories?: string[] }[] = [
  { id: 'ALL', label: 'Everything' },
  { id: 'TECH', label: 'Tech & embedded', categories: ['Hackathon & AI', 'Edge AI & Professional', 'Quantum Computing', 'Smart Agriculture & IoT', 'Innovation Award', 'RTOS & Embedded', 'Professional Dev', 'Open Source'] },
  { id: 'ACADEMIC', label: 'Academic & honors', categories: ['Academic Honors', 'Academic Merit', 'Academic Records', 'Research Colloquium'] },
  { id: 'BUSINESS_DATA', label: 'Data & entrepreneurship', categories: ['Technopreneurship', 'Data & Analytics'] },
]

export function Certifications() {
  const [selected, setSelected] = useState<(typeof certifications)[number] | null>(null)
  const [activeTrack, setActiveTrack] = useState<TrackFilter>('ALL')
  const filteredCerts = useMemo(() => {
    const categories = tracks.find((track) => track.id === activeTrack)?.categories
    return categories ? certifications.filter((cert) => categories.includes(cert.category)) : certifications
  }, [activeTrack])
  const latest = certifications[0]

  return (
    <section id="certifications" className="relative border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">Certificates &amp; the record.</h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">Real certificates from hackathons, workshops, and academic recognition. Browse newest first, or choose a track.</p>
            </div>
            <p className="text-sm text-muted-foreground" role="status" aria-live="polite">{filteredCerts.length} of {certifications.length} entries</p>
          </div>
        </Reveal>

        <div className="mt-8 grid items-center gap-6 border-y border-border py-6 sm:grid-cols-[16rem_1fr]">
          <button type="button" onClick={() => setSelected(latest)} aria-label={`Preview latest certificate: ${latest.name}`} className="overflow-hidden rounded-xl bg-secondary">
            <Image src={latest.preview} alt={`${latest.name} certificate`} width={640} height={453} sizes="(max-width: 640px) 90vw, 256px" className="aspect-[1.414/1] w-full object-contain" />
          </button>
          <div>
            <h3 className="text-2xl font-bold tracking-tight">Latest certificate: {latest.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{latest.issuer} · {latest.date}</p>
            <button type="button" onClick={() => setSelected(latest)} className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary">View certificate<ExternalLink aria-hidden="true" className="size-4" /></button>
          </div>
        </div>

        <div className="scroll-strip mt-6 flex gap-2 pb-2" role="group" aria-label="Filter certificates by track">
          {tracks.map((track) => (
            <button key={track.id} type="button" aria-pressed={activeTrack === track.id} onClick={() => setActiveTrack(track.id)} className={cn('min-h-11 shrink-0 rounded-full border px-4 py-2 text-sm transition-colors', activeTrack === track.id ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:text-foreground')}>{track.label}</button>
          ))}
        </div>

        <ul className="mt-3">
          {filteredCerts.map((cert) => (
            <li key={cert.name} className="border-b border-border">
              <button type="button" onClick={() => setSelected(cert)} className="group grid w-full grid-cols-[5rem_1fr] items-center gap-4 rounded-xl py-4 text-left transition-colors hover:bg-secondary/50 sm:grid-cols-[7rem_1fr_auto] sm:px-3">
                <Image src={cert.preview} alt="" width={160} height={114} sizes="112px" className="aspect-[1.414/1] w-full rounded-md bg-secondary object-contain" />
                <span className="min-w-0">
                  <span className="block text-sm text-muted-foreground">{cert.date}</span>
                  <span className="mt-1 block text-base font-semibold leading-snug group-hover:text-primary">{cert.name}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{cert.issuer}</span>
                  <span className="mt-2 block text-xs text-muted-foreground">{cert.category}</span>
                </span>
                <span className="hidden items-center gap-2 text-sm text-primary sm:inline-flex">Open<ExternalLink aria-hidden="true" className="size-4" /></span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Dialog.Root open={Boolean(selected)} onOpenChange={(open) => { if (!open) setSelected(null) }}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px]" />
          <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 flex max-h-[92dvh] w-[calc(100vw-1.5rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-background shadow-2xl">
            {selected && <>
              <div className="flex items-start justify-between gap-3 border-b border-border p-4 sm:px-6">
                <div className="min-w-0">
                  <Dialog.Title className="text-base font-semibold leading-snug sm:text-lg">{selected.name}</Dialog.Title>
                  <Dialog.Description className="mt-1 text-sm text-muted-foreground">{selected.issuer} · {selected.date}</Dialog.Description>
                </div>
                <Dialog.Close aria-label="Close certificate viewer" className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-secondary text-foreground"><X className="size-5" /></Dialog.Close>
              </div>
              <div className="overflow-y-auto p-4 sm:p-6">
                <a href={selected.image} target="_blank" rel="noopener noreferrer" className="mb-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"><ExternalLink className="size-4" />{selected.image.endsWith('.pdf') ? 'Open the full PDF' : 'Open original image'}</a>
                <Image src={selected.preview} alt={`${selected.name} certificate scan`} width={900} height={650} sizes="(max-width: 768px) 95vw, 850px" className="h-auto w-full rounded-md object-contain" />
                {selected.image.endsWith('.pdf') && <p className="mt-3 text-sm text-muted-foreground">Preview of the first page. Open the PDF for the full-resolution document and any additional pages.</p>}
              </div>
            </>}
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  )
}
