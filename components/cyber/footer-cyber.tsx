import { ArrowUp, Terminal, Radio } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'

export function FooterCyber() {
  return (
    <footer className="border-t border-border/80 bg-card/40 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row text-center sm:text-left">
          {/* Left: copyright and location telemetry */}
          <div className="flex flex-col items-center sm:items-start max-w-full">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 font-mono text-xs text-foreground font-bold">
              <span>{profile.fullName.toUpperCase()}</span>
              <span className="text-primary font-mono text-[10px]">// EMBEDDED SYS & EDGE AI</span>
            </div>
            <p className="mt-1 font-mono text-[10px] sm:text-[11px] text-muted-foreground break-words">
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
              className="inline-flex size-10 sm:size-9 items-center justify-center rounded-lg border border-border/80 bg-secondary/40 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10 hover:text-primary active:scale-95"
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex size-10 sm:size-9 items-center justify-center rounded-lg border border-border/80 bg-secondary/40 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10 hover:text-primary active:scale-95"
            >
              <LinkedinIcon className="size-4" />
            </a>
          </div>

          {/* Right: back to top */}
          <a
            href="#top"
            className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-border/80 bg-secondary/40 px-3.5 py-2 font-mono text-xs text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10 hover:text-primary active:scale-95"
          >
            <span>TOP_OF_STACK</span>
            <ArrowUp className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
