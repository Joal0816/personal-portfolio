import { ArrowDown, Download, Mail } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { profile } from '@/lib/portfolio-data'

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {/* Grid background */}
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      {/* Gradient orb */}
      <div
        className="pointer-events-none absolute -top-40 right-0 size-[36rem] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, var(--color-primary), transparent 70%)',
        }}
      />

      {/* Secondary gradient */}
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 size-[28rem] rounded-full opacity-10 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, var(--color-primary), transparent 70%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-24">
        <div className="flex flex-col-reverse gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Text content */}
          <div className="flex-1 max-w-3xl">
            {/* Status badge */}
            <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Available for new projects
            </div>

            {/* Name */}
            <h1
              className="animate-fade-up text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
              style={{ animationDelay: '80ms' }}
            >
              {profile.name}
              <span className="block text-muted-foreground">{profile.role}</span>
            </h1>

            {/* Tagline */}
            <p
              className="animate-fade-up mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
              style={{ animationDelay: '160ms' }}
            >
              {profile.tagline}{' '}
              <span className="text-foreground/70">{profile.intro}</span>
            </p>

            {/* CTA buttons */}
            <div
              className="animate-fade-up mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: '240ms' }}
            >
              <Button
                render={<a href="#projects" />}
                nativeButton={false}
                size="lg"
                className="gap-2"
              >
                View Projects
                <ArrowDown className="size-4" />
              </Button>
              <Button
                render={<a href="#contact" />}
                nativeButton={false}
                size="lg"
                variant="outline"
              >
                Contact Me
              </Button>
              <Button
                render={<a href="/resume.pdf" download />}
                nativeButton={false}
                size="lg"
                variant="ghost"
                className="gap-2 text-muted-foreground"
              >
                <Download className="size-4" />
                Resume
              </Button>
            </div>

            {/* Social links */}
            <div
              className="animate-fade-up mt-10 flex items-center gap-3"
              style={{ animationDelay: '320ms' }}
            >
              <SocialLink href={profile.socials.github} label="GitHub">
                <GithubIcon className="size-5" />
              </SocialLink>
              <SocialLink href={profile.socials.linkedin} label="LinkedIn">
                <LinkedinIcon className="size-5" />
              </SocialLink>
              <SocialLink href={profile.socials.email} label="Email">
                <Mail className="size-5" />
              </SocialLink>
            </div>
          </div>

          {/* Profile picture */}
          <div
            className="animate-fade-up flex shrink-0 justify-center lg:justify-end"
            style={{ animationDelay: '200ms' }}
          >
            <div className="relative">
              <div className="size-64 overflow-hidden rounded-2xl border-2 border-border bg-card shadow-2xl shadow-primary/10 sm:size-72 lg:size-80">
                <Image
                  src="/profile.jpg"
                  alt="Joseph Vergara"
                  width={320}
                  height={320}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-3 -right-3 size-24 rounded-2xl border-2 border-primary/20" />
              <div className="absolute -left-3 -top-3 size-16 rounded-xl border-2 border-primary/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={label}
      className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-secondary/40 text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary hover:shadow-lg hover:shadow-primary/10"
    >
      {children}
    </a>
  )
}
