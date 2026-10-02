'use client'

import { useState } from 'react'
import {
  Briefcase,
  GraduationCap,
  Trophy,
  Cpu,
  Binary,
  Layers,
  Sparkles,
  GitBranch,
  Terminal,
  Activity,
  CheckCircle,
} from 'lucide-react'
import { profile, skillGroups, education, experiences, leadership } from '@/lib/portfolio-data'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

export function About() {
  const [activeTab, setActiveTab] = useState<'all' | string>('all')

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-4 sm:px-6 py-24 md:py-32">
      {/* Section Header */}
      <Reveal>
        <div className="flex items-center gap-2 font-mono text-xs text-primary mb-3">
          <Terminal className="size-3.5" />
          <span>[SYS_SPEC // 01] ABOUT & SYSTEM PROFILE</span>
        </div>
        <h2 className="max-w-3xl text-balance text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Deterministic Firmware, Low-Power Silicon & Edge Vision.
        </h2>
      </Reveal>

      {/* Bio / Mission statement */}
      <Reveal delay={80}>
        <div className="mt-8 max-w-4xl space-y-4 text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground border-l-2 border-primary/40 pl-5">
          <p>
            {profile.bio}
          </p>
          <p className="text-foreground/80 font-mono text-sm">
            Current Focus: Integrating real-time sensor queues with deterministic RTOS multitasking (FreeRTOS / RT-Thread), deploying zero-latency TinyML models on resource-constrained devices, and bridging low-level protocols to cloud dashboards.
          </p>
        </div>
      </Reveal>

      {/* Telemetry Matrix Grid: Education & Research Timeline */}
      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        {/* Education Column */}
        <Reveal delay={120}>
          <div className="rounded-2xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-6">
              <h3 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-foreground">
                <GraduationCap className="size-4 text-primary" />
                ACADEMIC_TELEMETRY
              </h3>
              <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/30">
                ACTIVE
              </span>
            </div>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-border before:to-transparent">
              {education.map((edu, idx) => (
                <div key={edu.degree} className="relative group">
                  {/* Timeline Node */}
                  <div className="absolute -left-[27px] top-1.5 size-3 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-colors" />

                  <div className="rounded-xl border border-border/60 bg-secondary/30 p-4 transition-all hover:border-primary/40">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-foreground text-base">{edu.degree}</h4>
                        {edu.major && (
                          <p className="mt-0.5 font-mono text-xs font-semibold text-primary">
                            {edu.major}
                          </p>
                        )}
                        <p className="mt-1 text-xs text-muted-foreground">{edu.school}</p>
                      </div>
                      <span className="shrink-0 rounded bg-secondary/80 border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                        {edu.period}
                      </span>
                    </div>

                    {edu.gpa && (
                      <div className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                        <Activity className="size-3" />
                        <span>{edu.gpa}</span>
                      </div>
                    )}

                    {edu.description && (
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Experience & Research Collaborations */}
        <Reveal delay={160}>
          <div className="rounded-2xl border border-border/80 bg-card/50 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-6">
              <h3 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-foreground">
                <Briefcase className="size-4 text-primary" />
                RESEARCH_COLLABORATIONS
              </h3>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                IN PROGRESS
              </span>
            </div>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-border before:to-transparent">
              {experiences.map((exp) => (
                <div key={exp.role} className="relative group">
                  {/* Timeline Node */}
                  <div className="absolute -left-[27px] top-1.5 size-3 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-colors" />

                  <div className="rounded-xl border border-border/60 bg-secondary/30 p-4 transition-all hover:border-primary/40">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-foreground text-sm sm:text-base">{exp.role}</h4>
                        <p className="mt-0.5 font-mono text-xs text-primary">{exp.organization}</p>
                      </div>
                      <span className="shrink-0 rounded bg-secondary/80 border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                        {exp.period}
                      </span>
                    </div>

                    <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>

                    {exp.tags && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-primary/10 border border-primary/20 px-1.5 py-0.5 font-mono text-[10px] text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Leadership Activities */}
      <Reveal delay={200}>
        <div className="mt-12 rounded-2xl border border-border/80 bg-card/40 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-6">
            <h3 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-foreground">
              <Trophy className="size-4 text-primary" />
              COMMUNITY_&_LEADERSHIP
            </h3>
            <span className="font-mono text-[10px] text-muted-foreground">EXEC_COUNCIL</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {leadership.map((item) => (
              <div
                key={item.role}
                className="rounded-xl border border-border/60 bg-secondary/30 p-4 transition-all hover:border-primary/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{item.role}</h4>
                    <p className="mt-0.5 font-mono text-xs text-primary">{item.organization}</p>
                  </div>
                  <span className="shrink-0 rounded border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                    {item.period}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Technical Skills — Tech-Spec HUD Presentation */}
      <Reveal delay={240}>
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-primary mb-1">
                <Cpu className="size-3.5" />
                <span>[STACK_MANIFEST // CORE COMPETENCIES]</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-foreground">
                Technical Specifications & Capabilities
              </h3>
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              5 DOMAINS // 40+ VALIDATED TOOLS & PROTOCOLS
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div
                key={group.category}
                className="relative rounded-2xl border border-border/80 bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 group"
              >
                {/* Tech tag banner */}
                <div className="flex items-center justify-between pb-3 border-b border-border/50 mb-3.5">
                  <h4 className="font-bold text-sm text-foreground tracking-tight">
                    {group.category}
                  </h4>
                  <span className="font-mono text-[9px] font-semibold text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded">
                    [{group.tag}]
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded border border-border/70 bg-secondary/40 px-2 py-1 font-mono text-xs text-foreground/90 transition-all hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
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
