---
name: Joseph Vergara — Portfolio
description: A personal portfolio presented as one person's hand-kept engineering lab notebook.
colors:
  paper: "oklch(0.945 0.012 120)"
  paper-card: "oklch(0.985 0.006 115)"
  ink: "oklch(0.255 0.017 250)"
  ink-soft: "oklch(0.445 0.018 250)"
  maroon: "oklch(0.435 0.135 25)"
  cloth: "oklch(0.3 0.095 25)"
  cloth-text: "oklch(0.975 0.008 115)"
  foil: "oklch(0.75 0.115 85)"
  tape: "oklch(0.885 0.036 85)"
  olive: "oklch(0.52 0.05 130)"
  rule: "oklch(0.822 0.014 118)"
  paper-night: "oklch(0.215 0.016 252)"
  paper-night-card: "oklch(0.262 0.018 252)"
  ink-night: "oklch(0.93 0.011 115)"
  ink-night-soft: "oklch(0.735 0.014 250)"
  maroon-night: "oklch(0.65 0.115 28)"
  cloth-night: "oklch(0.26 0.085 25)"
  foil-night: "oklch(0.8 0.11 85)"
  tape-night: "oklch(0.45 0.032 80)"
  rule-night: "oklch(0.36 0.018 252)"
  destructive: "oklch(0.52 0.19 27)"
  destructive-night: "oklch(0.7 0.16 25)"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Schibsted Grotesk, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  heading:
    fontFamily: "Bricolage Grotesque, Schibsted Grotesk, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  note:
    fontFamily: "Caveat, Schibsted Grotesk, cursive"
    fontSize: "1.375rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
  data:
    fontFamily: "Spline Sans Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  body-sm:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "normal"
  caption:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  micro:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sm: "2px"
  md: "6px"
  lg: "6px"
  pill: "999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.maroon}"
    textColor: "{colors.cloth-text}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  button-outline:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
  photo-print:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "8px"
  ledger-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "20px 0"
  field:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
  cloth-band:
    backgroundColor: "{colors.cloth}"
    textColor: "{colors.cloth-text}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "24px 0"
  index-tab:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "10px 16px"
  chat-bubble:
    backgroundColor: "{colors.paper-night-card}"
    textColor: "{colors.ink-night}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
---

# Overview

This portfolio is one person's hand-kept engineering lab notebook, opened on the
table. Evidence is taped in — a graduation photo print, project screenshots, a
certificate ledger — and the margins are annotated in plain language. The
category default for a developer portfolio (terminal-green hero, badge grids,
dark chrome, a card row per section) is refused outright; so is the previous
cyber/terminal identity, which is treated as anti-reference only.

The notebook world is anchored in real material on hand: the MSU-IIT graduation
regalia (maroon and gold), the olive studio backdrop of the portrait, and the
quadrille paper every firmware engineer keeps on the bench. Light theme is the
page in daylight. Dark theme is the same notebook under a desk lamp — warm light
on ink-blue paper, gold foil catching it — never an inverted recolor.

The interface recedes and the evidence leads. A mixed audience (recruiters,
clients, developer peers) gets a person first, proof second, and a contact route
within seconds; the technical depth is present for whoever wants it, in a bench
sandbox the visitor can poke at.

# Colors

Four materials, one rationed accent.

- **Paper** (`paper`, `paper-card`): pale olive-grey quadrille ground in
  daylight; ink-blue (`paper-night`) at night. Cards and photo-print borders are
  a lighter sheet of the same stock.
- **Ink** (`ink`, `ink-soft`): graphite. `ink-soft` is pencil for secondary
  lines; it never drops below 4.5:1 on paper.
- **Maroon** (`maroon`, `cloth`): the regalia. Maroon is rationed to action and
  identity — buttons, links, active states, and the cloth binding of the page
  (top bar, footer). `cloth` is the deeper, permanent binding tone used in both
  themes so the binding reads as cloth in daylight and at night.
- **Gold foil** (`foil`): stamping only — the callsign on the binding, the
  underline of the active index tab, the lamp glow in dark. Never a body-text
  color, never a gradient.
- **Tape** (`tape`) is masking-tape beige (warm brown at night); **olive** is
  the studio backdrop carried into small status text; **destructive** is for
  form errors only.

Dark theme values are a designed night palette, not an inversion: maroon lifts
to `maroon-night`, tape warms to `tape-night`, foil brightens to `foil-night`.
Every text pair passes 4.5:1 (3:1 for display sizes) in both themes.

# Typography

- **Bricolage Grotesque (800)** is the stamped display voice: name, section
  headings, project titles. Width and optical-size axes let it read like a
  notebook cover label rather than default web type. Display size caps at
  4.75rem, tracking floors at -0.035em.
- **Schibsted Grotesk** carries all reading text at 15–20px with generous
  leading (1.7). Measure is held to 60–70 characters.
- **Caveat** is the handwriting in the margin — short notes of five words or
  fewer ("what I'm working on now", "the paper trail"). It is the notebook's own
  lettering; never body copy, never controls.
- **Spline Sans Mono** with tabular figures is reserved for real data and code:
  clocks, timings, pin names, hex dumps, file names. It is measurement, not
  costume.

Scale steps are explicit: 4.75rem display → 3rem section → 1.25rem subhead →
1.0625rem body → 0.9375rem body-sm → 0.8125rem label → 0.75rem data →
0.6875rem caption → 0.625rem micro. The small steps exist for tabular metadata
(ledger dates, chip counts, message timestamps) and never carry reading copy.

# Layout

Pages, not cards. The spread leads: a two-page hero (person on the left page,
"what I'm working on now" and section tabs on the right) with a gutter rule down
the middle at desktop. Sections below are pages in the same book, each with an
optional margin rail (handwritten note) and a ruled content column.

- Container: 1152px (max-w-6xl), 20px gutters on mobile, 32px at desktop.
- Vertical rhythm: 24–32px inside groups, 96–128px between sections. More space
  above a heading than below it.
- Content that is a list is a ruled list (education, research, project
  contents, the certificate ledger) — separated by hairlines, never by a grid of
  identical cards.
- Imagery appears as photo prints: white border, small radius, slight rotation,
  held by tape strips. One print is featured at large size per page; the rest
  are small and taped into lists.
- Responsive: one column below 1024px; margin rails collapse above their
  content; tab strips scroll horizontally rather than wrap; nothing exceeds the
  viewport at 390px.

# Elevation & Depth

Depth is paper on paper: one hairline weight (1px `rule`) and two shadow steps,
both with a real offset and soft blur.

- `shadow-page`: `0 1px 1px graphite/12%, 0 14px 32px -18px graphite/38%` — a
  sheet resting on the page (photo prints, panels, the chat).
- `shadow-lift`: `0 1px 1px graphite/14%, 0 22px 44px -20px graphite/42%` —
  picked-up paper (dialogs, the chat panel, the scrolled header).

No glows, no glass, no gradient text, no colored side-borders. The one glow in
the system is the desk lamp (`lamp-glow`, dark theme only): a warm radial pool
that breathes slowly at the top-right of the opening spread.

# Shapes

Stiff paper, not app chrome. Radius scale is 2px (photo prints, tape) and 6px
(everything else: buttons, inputs, panels). Rules and separators are square.
Buttons are compact rectangles with 1px borders on outline variants; the primary
button is a solid maroon block. Chips and tags are small squared-off labels,
never pills, except the chat's suggestion chips (`pill`, 999px, because they are
tap affordances in a pocket notebook) and the scrollbar thumb.

# Components

- **Cloth band (header/footer):** full-width deep-maroon cloth carrying the gold
  foil callsign. The header's section links are divider tabs; the active tab
  turns paper-colored with a 2px foil underline.
- **Button (primary / outline / ghost):** 46px tall, 6px radius, maroon block or
  1px outline. Hover lifts by color only; active presses 2% down. Focus ring is
  2px maroon at 2px offset.
- **Photo print:** paper-card sheet, 8px padding with a deeper bottom margin for
  the caption, 2px radius, `shadow-page`, optionally rotated up to 2°, held by
  tape strips (repeating warm gradient, 2px shadow, slight rotation).
- **Index tab:** an underline tab in the tab strips; active state is maroon text
  plus the foil rule.
- **Ledger row (certificates, project contents):** hairline-separated rows with
  tabular date at the left, title and issuer in the middle, actions at the
  right. Hover tints the row with paper-card and draws a pencil underline on the
  action label.
- **Field (inputs/textarea):** paper-card on a 1px rule, 46px tall, maroon caret,
  maroon focus border and ring. Errors name the problem in plain words beside
  the label.
- **Chat bubble:** bot bubbles are a secondary sheet with a hairline; user
  bubbles are solid maroon with cloth-text. Timestamps in data type.
- **Marginalia note:** Caveat in graphite, used in the margin rail and beside
  prints.

# Do's and Don'ts

**Do**

- Do let evidence lead: real screenshots, scans, repos, and measured figures.
- Do keep one hairline weight and one shadow grammar everywhere.
- Do ration maroon to action and identity, and gold to stamping.
- Do write labels in plain language ("What it does", "How the data flows",
  "Where should this go?").
- Do design both themes as first-class: daylight paper and lamplit night.
- Do keep data in tabular mono and code in mono — measurement earns it.

**Don't**

- Don't bring back terminal chrome: HUD brackets, scanlines, neon, blinking
  carets, ASCII logos, sound effects.
- Don't use cards as the page structure; same-size icon cards are the tell.
- Don't add kickers or numbered eyebrows above headings — the heading speaks.
- Don't use gradient text, glass, glow borders, or hard offset shadows.
- Don't set body copy in mono, and don't set long text in the handwriting face.
- Don't let an entrance animation hide content; things are visible by default.
