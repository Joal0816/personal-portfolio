---
name: Joseph Vergara — Hand-Kept Engineering Notebook
description: A personal engineering portfolio shaped like a working notebook: real project evidence, ruled lists, taped-in imagery, concise annotations, and a clear route to contact.
colors:
  notebook-paper: "oklch(0.945 0.012 120)" # design intent; not the current CSS value
  graphite-ink: "oklch(0.255 0.017 250)" # design intent; not the current CSS value
  regalia-maroon: "oklch(0.435 0.135 25)" # design intent; not the current CSS value
  gold-foil: "oklch(0.75 0.115 85)" # design intent; not the current CSS value
  active-light-background: "#f5f5f7"
  active-light-foreground: "#1d1d1f"
  active-light-primary: "#0071e3"
  active-dark-background: "#000000"
  active-dark-foreground: "#f5f5f7"
  active-dark-primary: "#2997ff"
typography:
  intended-display: "Bricolage Grotesque"
  intended-body: "Schibsted Grotesk"
  intended-margin-note: "Caveat"
  intended-measurement: "Spline Sans Mono"
  active-sans: "-apple-system, BlinkMacSystemFont, system-ui, sans-serif"
  active-mono: "SF Mono, Menlo, Monaco, Consolas, monospace"
rounded:
  base: "14px"
  small: "calc(base * 0.6)"
  medium: "calc(base * 0.8)"
  large: "base"
  larger: "calc(base * 1.4)"
---

# Hand-Kept Engineering Notebook

## Overview
The portfolio is a personal engineering notebook for recruiters, clients, and developer peers. It introduces Joseph first, presents evidence through projects and academic work, and keeps contact and résumé actions easy to find. Its design direction uses quadrille paper, graphite-like text, restrained identity colors, photo prints, masking tape, marginal notes, and measured technical details. The light and dark themes should feel like the same notebook under different light.

The current page is a single scroll with a hero, interactive hardware bench, about section, projects, certifications, contact section, and footer. Project details and certificate previews open in dialogs. Preserve the existing section order and interactions when updating content.

## Colors

The design direction calls for quiet paper and ink neutrals, MSU-IIT maroon for identity and important actions, and gold only for small stamped details. These target values are carried forward from the Impeccable sidecar; the live CSS does not currently use them as the primary palette.

| Token | Intended direction | Active light theme | Active dark theme |
| --- | --- | --- | --- |
| Background | Olive-grey notebook paper | `#f5f5f7` | `#000000` |
| Foreground | Graphite ink | `#1d1d1f` | `#f5f5f7` |
| Card | Printed sheet | `rgba(255, 255, 255, 0.85)` | `rgba(28, 28, 30, 0.85)` |
| Primary | Maroon in the intended system | `#0071e3` | `#2997ff` |
| Secondary | Pale paper treatment | `#e8e8ed` | `#2c2c2e` |
| Muted text | Pencil/secondary ink | `#66666c` | `#a1a1a6` |
| Border | One quiet hairline | `rgba(0, 0, 0, 0.08)` | `rgba(255, 255, 255, 0.12)` |

The active CSS also sets `--foil` to the theme surface and `--olive` to green. Treat this as documented implementation drift, not as evidence that gold and maroon are currently rendered. Do not expand the active palette without a separately approved visual change.

## Typography
The intended type roles are Bricolage Grotesque for display, Schibsted Grotesk for body copy, Caveat for brief margin notes, and Spline Sans Mono for real measurements. The current layout loads those font files, but the active aliases in `app/globals.css` resolve to system/Apple-style sans and mono stacks instead. Do not describe the intended font roles as active until the CSS aliases use them.

Keep headings compact and legible, prose easy to scan, margin notes brief, and monospaced type limited to real technical data. Never use handwriting or mono for long body copy.

## Layout
Use the existing responsive single-page structure. The hero introduces the person and offers work, contact, and résumé actions. The hardware bench follows as an interactive feature. About, projects, certifications, and contact continue down the page, with the footer closing the notebook.

Projects use a featured print followed by ruled entries, category filters, search, date sorting, evidence-backed status chips, and a project detail dialog. Keep project titles, category, status, date, technologies, and available links clear. Do not invent role, result, or completion details. At narrow widths, keep controls reachable and let content stack naturally; at wider widths, use the existing split layouts and denser ruled rows.

The current responsive breakpoints are 640px, 768px, 1024px, and 1280px. Preserve keyboard operation, visible focus, semantic headings, accessible dialog names, and touch targets of at least 44px where the component already provides them.

## Elevation & Depth
Use thin borders and soft offset shadows to suggest paper resting on a surface. The active `.photo-print`, `.shadow-page`, `.shadow-lift`, and `.tape` utilities supply the current print, panel, and tape depth. Keep elevation subordinate to evidence and text. The page honors `prefers-reduced-motion`; retain that behavior when changing transitions.

Some active navigation and companion styles still use blur, gradients, and stronger Tailwind shadows. They are part of the current hybrid implementation and were not changed during this documentation sync. Avoid adding more decorative effects; remove or restyle these only in a separately scoped visual pass.

## Shapes
The root radius is 0.875rem (14px), with derived Tailwind radii and smaller component-specific corners. Keep controls and dialogs comfortably rounded, while photo-print edges stay close to square. Avoid oversized pill and squircle shapes as the page's default geometry.

## Components

- **Navigation:** fixed, responsive section links and a compact mobile menu; keep labels and focus states clear.
- **Hero:** portrait, name, concise profile copy, and work/contact/résumé actions.
- **Hardware bench:** interactive simulation presented as a lab instrument; distinguish simulation from physical-device results.
- **Project index:** category controls, search, date sort, a featured project print, and ruled project entries.
- **Project dialog:** accessible title, project status and evidence, description, technologies, and only the available repository/demo links.
- **Certifications:** featured certificate and browsable certificate entries with original-document links where available.
- **Contact:** form and direct contact routes, preserving the existing dispatch behavior.
- **Companion:** optional chat panel; keep it secondary to the portfolio content and preserve its keyboard and reduced-motion behavior.

Reuse these components and the existing Tailwind/CSS utilities. Do not add a second card or token system.

## Do’s and Don’ts

- Do lead with real, verifiable project and academic evidence.
- Do keep status labels and links explicit and accurate.
- Do use photo-print, ruled-list, quadrille, and brief margin-note treatments where they already fit.
- Do maintain responsive stacking, keyboard access, visible focus, and reduced motion.
- Do keep maroon and gold as the intended identity colors in design proposals; note that the active palette is currently blue and neutral.
- Don’t claim the target palette or display fonts are live until implementation confirms it.
- Don’t add generic gradients, glass panels, motion, or dependencies during a content update.
- Don’t present simulations as hardware measurements or undocumented work as completed.

## Implementation Snapshot (2026-11-02)
This snapshot records the active CSS without changing it. Source: `app/globals.css` and `app/layout.tsx`. The light and dark values in the table above are the current theme tokens. The intended maroon/gold palette and the loaded display fonts are not wired to the active aliases. A few navigation and companion elements still use glass/gradient styling. This distinction keeps the approved design direction and shipped implementation facts visible in one place.
