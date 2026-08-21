import { profile, skillGroups } from '@/lib/portfolio-data'

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <p className="mb-3 font-mono text-sm text-primary">01 / About</p>
      <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
        Engineer by trade, craftsperson by habit.
      </h2>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-5 text-pretty text-lg leading-relaxed text-muted-foreground">
          <p>{profile.bio}</p>
          <p>{profile.intro}</p>
        </div>

        <div className="grid gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="rounded-xl border border-border bg-card p-5"
            >
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {group.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 font-mono text-sm text-secondary-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
