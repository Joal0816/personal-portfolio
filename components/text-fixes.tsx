import { Fragment } from 'react'

/**
 * Typography helpers for the notebook: keep long words intact, and let long
 * addresses wrap only where a reader expects them to.
 */

/** Hyphenated compounds (Dual-Core, Cortex-M3) never break after their hyphen. */
export function HyphenSafe({ text }: { text: string }) {
  const parts = text.split(/(\s+)/)
  return (
    <>
      {parts.map((part, i) =>
        part.includes('-') && /[A-Za-z0-9]/.test(part) ? (
          <span key={i} className="whitespace-nowrap">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}

/** Emails wrap at @ and dots — never mid-address. */
export function EmailText({ email, className }: { email: string; className?: string }) {
  const segments = email.split(/(@|\.)/)
  return (
    <span className={className}>
      {segments.map((seg, i) => (
        <Fragment key={i}>
          {seg}
          {(seg === '@' || seg === '.') && <wbr />}
        </Fragment>
      ))}
    </span>
  )
}
