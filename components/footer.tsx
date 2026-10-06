import { ArrowUp } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'

export function Footer() {
  // Keep "Iligan City, Philippines" together so the line never orphans it
  const placeLine = `${profile.role} · ${profile.location.replace(', ', ',\u00A0')}`

  return (
    <footer className="bg-cloth text-cloth-foreground">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
        <div className="flex flex-col items-start justify-between gap-9 sm:flex-row sm:items-end">
          {/* Left: the stamp */}
          <div className="min-w-0">
            <p className="foil-stamp font-display text-3xl font-extrabold leading-none tracking-tight">
              {profile.callsign}
            </p>
            <p className="mt-3 text-[15px] font-semibold">{profile.fullName}</p>
            <p className="mt-1 text-sm text-cloth-foreground/80">{placeLine}</p>
            <p className="marginalia on-cloth mt-4 text-xl leading-none">
              thanks for reading my notebook.
            </p>
          </div>

          {/* Right: routes out */}
          <div className="flex flex-col items-start gap-5 sm:items-end">
            <div className="flex items-center gap-2">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex size-11 items-center justify-center rounded-md border border-cloth-foreground/25 text-cloth-foreground/90 transition-colors hover:bg-cloth-foreground/12 hover:text-cloth-foreground sm:size-10"
              >
                <GithubIcon className="size-4" />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex size-11 items-center justify-center rounded-md border border-cloth-foreground/25 text-cloth-foreground/90 transition-colors hover:bg-cloth-foreground/12 hover:text-cloth-foreground sm:size-10"
              >
                <LinkedinIcon className="size-4" />
              </a>
              <a
                href={profile.socials.email}
                aria-label="Email"
                className="inline-flex size-11 items-center justify-center rounded-md border border-cloth-foreground/25 text-cloth-foreground/90 transition-colors hover:bg-cloth-foreground/12 hover:text-cloth-foreground sm:size-10"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className="size-4">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </a>
            </div>

            <a
              href="#top"
              className="inline-flex min-h-[40px] items-center gap-2 rounded-md border border-cloth-foreground/25 px-3.5 py-2 text-sm text-cloth-foreground/90 transition-colors hover:bg-cloth-foreground/12 hover:text-cloth-foreground"
            >
              <span>Back to the first page</span>
              <ArrowUp className="size-4" />
            </a>

            <p className="measure text-xs text-cloth-foreground/65">
              © {new Date().getFullYear()} {profile.fullName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
