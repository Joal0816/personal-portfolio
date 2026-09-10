import { ArrowUp } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          {/* Left: copyright */}
          <div className="text-center sm:text-left">
            <p className="font-mono text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {profile.fullName}
            </p>
          </div>

          {/* Center: social links */}
          <div className="flex items-center gap-3">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-secondary/40 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
            >
              <GithubIcon className="size-4" />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-secondary/40 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
            >
              <LinkedinIcon className="size-4" />
            </a>
          </div>

          {/* Right: back to top */}
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3.5 py-2 font-mono text-sm text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground"
          >
            Back to top
            <ArrowUp className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
