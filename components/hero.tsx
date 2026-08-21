import { ArrowDown, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { profile } from '@/lib/portfolio-data'

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div
        className="pointer-events-none absolute -top-40 right-0 size-[36rem] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, var(--color-primary), transparent 70%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="animate-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="inline-block size-2 rounded-full bg-primary" />
            Available for new projects
          </p>

          <h1
            className="animate-fade-up text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
            style={{ animationDelay: '80ms' }}
          >
            {profile.name}.
            <span className="block text-muted-foreground">{profile.role}</span>
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
            style={{ animationDelay: '160ms' }}
          >
            {profile.tagline} {profile.intro}
          </p>

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
          </div>

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
      className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-secondary/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
    >
      {children}
    </a>
  )
}
