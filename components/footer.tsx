import { ArrowUp, Terminal, Radio } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-card/40 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Left: copyright and location telemetry */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 font-mono text-xs text-foreground font-bold">
              <span>{profile.fullName.toUpperCase()}</span>
              <span className="text-primary font-mono text-[10px]">// EMBEDDED SYS & EDGE AI</span>
            </div>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">
              MSU-IIT • {profile.location} • &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED
            </p>
          </div>

          {/* Center: social links */}
          <div className="flex items-center gap-2">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-border/80 bg-secondary/40 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10 hover:text-primary"
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-border/80 bg-secondary/40 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10 hover:text-primary"
            >
              <LinkedinIcon className="size-4" />
            </a>
          </div>

          {/* Right: back to top */}
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-secondary/40 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10 hover:text-primary"
          >
            <span>TOP_OF_STACK</span>
            <ArrowUp className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
