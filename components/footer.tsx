import { ArrowUp } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="font-mono text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js.
        </p>
        <a
          href="#top"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-3 py-2 font-mono text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
        >
          Back to top
          <ArrowUp className="size-4" />
        </a>
      </div>
    </footer>
  )
}
