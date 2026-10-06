# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16.3 (App Router) + React 19, Tailwind CSS v4, shadcn/base-ui primitives, PWA (manifest + service worker), @vercel/analytics. Contact endpoint lives at `app/api/contact` (POST) with the `resend` package installed; the route today acknowledges the request and the form dispatches through the visitor's own mail client (mailto). Package manager is pnpm (`pnpm-lock.yaml`); a `package-lock.json` also exists. No dependency additions are wanted for the redesign.

## Users

Primary audience (confirmed by user probe): a mixed general audience — recruiters and hiring managers, potential clients, and developer peers — arriving from a résumé, a link, or search. Their job: find out who Joseph Vergara is, see evidence of what he has actually built, judge whether he fits a role or a project, and reach him. They are not all engineers, so the work has to read at a glance to a non-specialist while still holding up to a developer who reads the details.

## Product Purpose

A personal portfolio and showcase for Joseph Alan B. Vergara ("Joal"), an embedded-systems and edge-AI engineer in Iligan City, Philippines. It presents his education, research collaborations, projects, certifications, skills, and contact routes in one page, plus two interactive extras: an AI companion chat and a hardware playground. Success means a visitor understands the person and the work quickly, trusts the evidence, and makes contact — or simply enjoys the visit.

## Positioning

The mechanism no neighbouring portfolio can copy: real, running hardware work shown as living evidence — a hands-on microcontroller bench (CLI, pinout, protocol analyzer, edge-AI benchmark, live telemetry), projects backed by real screenshots and published Hackster.io write-ups, and two cats who answer questions in the chat. Warmth and personality are part of the product, not decoration on top of it.

## Operating Context

Single scrolling page with anchor navigation (About, Projects, Certifications, Contact) plus a hero and a hardware/telemetry band. Visited on laptops and phones, in both light and dark themes, sometimes installed as a PWA. Visitors may download a résumé PDF, copy an email address, open a certificate, filter a project list, open a project detail dialog, and chat with the companion. Contact happens through the visitor's mail client, phone, or social profiles.

## Capabilities and Constraints

- All content is authored in `lib/portfolio-data.ts` (profile, education, experiences, certifications, leadership, skill groups, projects) and `lib/companion-data.ts` (three chat characters and their scripted replies). These files are the product truth; the UI must not invent claims, metrics, customers, or dates.
- Features that must survive the redesign: hero, about, projects with filtering/search + project modal (specs, code snippet, architecture flow), certifications with viewer, contact form + direct email cards, footer, navbar with active-section tracking, theme toggle with genuine light **and** dark themes, PWA install prompt, AI companion (three characters: Joal, Rera, Area — restyle, never remove), hardware playground (CLI terminal, GPIO pinout, protocol analyzer, edge-AI benchmark, live sensor stream).
- The contact API contract and routing (`POST /api/contact`) are frozen.
- Purely presentational artifacts of the previous visual world (cyber HUD cursor, cyber sound effects, HUD chrome, scanline/laser effects) are being replaced and may be removed.
- No new runtime dependencies. Résumé PDFs live at `/resume.pdf` and `/VERGARA CV 2026.pdf`.
- Open decision for the user: nothing blocking. Two optional upgrades exist (real photos of the hardware, and wiring the contact form to Resend) and are noted under Evidence.

## Brand Commitments

- Name and callsign: Joseph Alan B. Vergara, "Joal". Institution: Mindanao State University – Iligan Institute of Technology (MSU-IIT), College of Computer Studies. Location: Iligan City, Philippines.
- Two cats, Rera (orange) and Area (tabby), are part of the voice and must stay visible in the companion.
- The incumbent cyber/terminal identity (cyan-on-near-black, HUD brackets, terminal labels, sound effects) is explicitly **not** a commitment: the user asked for a full replacement. It is treated as anti-reference only.
- No formal brand system was confirmed before this work. The one piece of real identity material on hand is the graduation portrait with MSU-IIT academic regalia in maroon and gold.

## Evidence on Hand

- `public/profile.jpg` — real graduation portrait (toga, maroon and gold sash, MSU-IIT seal, olive studio backdrop). Primary human imagery.
- `public/projects/*` — real screenshots of every listed project (15 images).
- `public/companion/*` — character art for Joal, Rera, Area.
- `public/certificates/TECH|OTHERS/*` — real certificate scans and PDFs (15 entries).
- `public/resume.pdf`, `public/VERGARA CV 2026.pdf` — résumé downloads.
- Absences future work must not fabricate: no customer logos, no testimonials, no employer list, no published-paper citations, no photos of the actual hardware benches or the cats in real life (the companion art is stylised), and no metrics beyond the ones already written in `lib/portfolio-data.ts`.

## Product Principles

1. Person first, engineer second — the human leads the page; the technical depth is there for whoever wants it.
2. Evidence over adjectives — every claim on the page points at something real: a screenshot, a certificate, a repo, a write-up.
3. Warm and plain-spoken — jargon-heavy HUD language is warmed into normal, grounded English without losing a single fact.
4. Reachable in seconds — a mixed audience finds name, work, and contact route fast, at any screen size, in either theme.
5. Playfulness is allowed to be itself — the cats, the bench, and the small interactions carry the personality; nothing needs to pretend to be a control room.

## Accessibility & Inclusion

General audience expectations: readable contrast in both themes, keyboard-operable controls with visible focus, reduced-motion support, touch targets of at least 44px on mobile, and semantic landmarks/labels throughout. Visitors are not assumed to be engineers.
