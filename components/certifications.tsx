import { Award } from 'lucide-react'
import { certifications } from '@/lib/portfolio-data'
import { Reveal } from '@/components/reveal'

export function Certifications() {
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
              <div className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary/50 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Award className="size-4" />
                </span>
                <div className="min-w-0">
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
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
