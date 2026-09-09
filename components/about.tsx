import { Briefcase, GraduationCap, Trophy } from 'lucide-react'
import { profile, skillGroups, education, experiences, leadership } from '@/lib/portfolio-data'
import { Reveal } from '@/components/reveal'

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <p className="mb-3 font-mono text-sm text-primary">01 / About</p>
        <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Engineer by trade, craftsperson by habit.
        </h2>
      </Reveal>

      {/* Bio */}
      <Reveal delay={80}>
        <div className="mt-12 max-w-3xl space-y-5 text-pretty text-lg leading-relaxed text-muted-foreground">
          <p>{profile.bio}</p>
          <p>{profile.intro}</p>
        </div>
      </Reveal>

      {/* Education & Experience */}
      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <Reveal delay={120}>
          <div>
            <h3 className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <GraduationCap className="size-4 text-primary" />
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu) => (
                <div
                  key={edu.degree}
                  className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                      {edu.major && (
                        <p className="mt-0.5 text-sm text-primary">{edu.major}</p>
                      )}
                      <p className="mt-1 text-sm text-muted-foreground">{edu.school}</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
                      {edu.period}
                    </span>
                  </div>
                  {edu.gpa && (
                    <p className="mt-2 font-mono text-xs text-primary">{edu.gpa}</p>
                  )}
                  {edu.description && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div>
            <h3 className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <Briefcase className="size-4 text-primary" />
              Experience
            </h3>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div
                  key={exp.role}
                  className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground">{exp.role}</h4>
                      <p className="mt-0.5 text-sm text-primary">{exp.organization}</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Leadership */}
      <Reveal delay={200}>
        <div className="mt-12">
          <h3 className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <Trophy className="size-4 text-primary" />
            Leadership & Activities
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {leadership.map((item) => (
              <div
                key={item.role}
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-foreground">{item.role}</h4>
                    <p className="mt-0.5 text-sm text-primary">{item.organization}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
                    {item.period}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Skills */}
      <Reveal delay={240}>
        <div className="mt-16">
          <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Technical Skills
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div
                key={group.category}
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
              >
                <h4 className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 font-mono text-xs text-secondary-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
