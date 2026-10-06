'use client'

import { GraduationCap, Briefcase, Trophy } from 'lucide-react'
import { profile, skillGroups, education, experiences, leadership } from '@/lib/portfolio-data'
import { Reveal } from '@/components/reveal'

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 pt-14 pb-12 sm:px-8 md:pt-18 md:pb-14">
      <div className="grid gap-10 lg:grid-cols-[10rem_1fr] lg:gap-14">
        {/* Margin rail */}
        <div className="lg:pt-2">
          <p className="marginalia text-2xl leading-tight lg:sticky lg:top-24">
            who I am,
            <br />
            in plain words
          </p>
        </div>

        <div className="min-w-0">
          <Reveal>
            <h2 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              I like making small, stubborn computers do useful things.
            </h2>
          </Reveal>

          <Reveal delay={80} tilt={-0.3}>
            <div className="mt-8 max-w-[68ch] space-y-5 text-lg leading-relaxed text-foreground/85">
              <p>{profile.bio}</p>
              <p>
                Most of my work sits where hardware meets software: writing the
                firmware that runs on a chip, teaching it to read sensors
                reliably, and then getting that data somewhere a person can act
                on it. Lately that has meant tiny AI models that run on the
                device itself, so nothing has to travel to a server to make a
                decision.
              </p>
            </div>
          </Reveal>

          {/* Education & research — ruled entries */}
          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-14">
            <div>
              <h3 className="flex items-center gap-2.5 text-xl font-bold tracking-tight">
                <GraduationCap className="size-5 text-primary" />
                School
              </h3>
              <ul className="mt-5 border-t border-border">
                {education.map((edu) => (
                  <li key={edu.degree} className="border-b border-border py-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="text-[17px] font-semibold leading-snug">{edu.degree}</h4>
                      <span className="meta">{edu.period}</span>
                    </div>
                    {edu.major && (
                      <p className="mt-1 text-sm font-medium text-primary">{edu.major}</p>
                    )}
                    <p className="mt-1 text-sm text-muted-foreground">{edu.school}</p>
                    {edu.gpa && (
                      <p className="measure mt-2 inline-block rounded-sm bg-secondary px-2 py-1 text-xs text-secondary-foreground">
                        {edu.gpa.replace('CGPA: ', 'CGPA ')}
                      </p>
                    )}
                    {edu.description && (
                      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                        {edu.description}
                      </p>
                    )}
                    {edu.highlights && (
                      <ul className="mt-2.5 space-y-1.5">
                        {edu.highlights.map((h) => (
                          <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-foreground/80">
                            <span aria-hidden className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-primary/70" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-2.5 text-xl font-bold tracking-tight">
                <Briefcase className="size-5 text-primary" />
                Research I&apos;m part of
              </h3>
              <ul className="mt-5 border-t border-border">
                {experiences.map((exp) => (
                  <li key={exp.role} className="border-b border-border py-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="text-[17px] font-semibold leading-snug">{exp.role}</h4>
                      <span className="meta">{exp.period}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-primary">{exp.organization}</p>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>
                    {exp.tags && (
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {exp.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-border/80 bg-secondary/80 px-2.5 py-1 text-xs text-foreground font-medium"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Leadership */}
          <div className="mt-14">
            <h3 className="flex items-center gap-2.5 text-xl font-bold tracking-tight">
              <Trophy className="size-5 text-primary" />
              Around campus
            </h3>
            <ul className="mt-5 grid gap-x-12 gap-y-6 border-t border-border pt-6 sm:grid-cols-2">
              {leadership.map((item) => (
                <li key={item.role}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-[15px] font-semibold leading-snug">{item.role}</h4>
                    <span className="meta">{item.period}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-primary">{item.organization}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills — a parts list */}
          <Reveal tilt={0.3}>
            <div className="mt-16">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h3 className="text-2xl font-bold tracking-tight">What I work with</h3>
                <p className="marginalia text-xl leading-none">
                  the toolkit, sorted by shelf
                </p>
              </div>

              <div className="mt-7 grid gap-x-12 gap-y-8 sm:grid-cols-2">
                {skillGroups.map((group) => (
                  <div key={group.category} className="border-t border-border pt-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="text-[15px] font-semibold">{group.category}</h4>
                      <span className="shrink-0 text-xs text-muted-foreground">{group.tag}</span>
                    </div>
                    <ul className="mt-3 flex flex-wrap gap-x-3.5 gap-y-2">
                      {group.skills.map((skill) => (
                        <li key={skill} className="text-sm leading-relaxed text-foreground/85">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
