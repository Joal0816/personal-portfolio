---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

# Surface brief — the portfolio page (`app/page.tsx`)

Seed key: 96968944 (concept-seed, scope direction, mode experience, assigned index 4).
Scope: the single scrolling portfolio page and everything on it, in both themes, at mobile and desktop.
Visitor mode: Experience — the work leads from the first viewport; the interface recedes.

## Audience, job, action, proof, constraints

- Audience: mixed general audience (recruiters/hiring managers, potential clients, developer peers), not assumed to be engineers.
- Job: know who Joseph Vergara is within seconds, see real evidence of what he has built, judge fit, and reach him.
- Action/task: read → browse work → open a project or certificate → contact / download résumé.
- Proof/content: real project screenshots, real certificate scans and PDFs, published Hackster.io write-ups, live platforms, résumé PDFs, the graduation portrait. No invented claims or metrics.
- Constraints: every feature survives (hero, about, projects + modal, certifications, contact + mailto dispatch, PWA install, theme toggle with genuine light and dark, AI companion with 3 characters, hardware playground with 5 tools). `/api/contact` contract and routing frozen. No new dependencies. Old cyber/terminal artifacts (HUD cursor, sound effects, scanline chrome) may be removed.

## Chosen direction & memorable moment

Direction: **the hand-kept engineering lab notebook** (grounded candidate 4 of 7; the roll's assignment). Warm, personal, made-by-hand: quadrille paper, graphite, masking tape, taped-in photo prints, gold-foil stamping on a maroon cloth binding, pencil marginalia in plain language. Palette is anchored in the real graduation portrait (MSU-IIT maroon and gold, olive backdrop) rather than invented.
Memorable moment: the first viewport is an open notebook spread — the real graduation portrait taped in slightly askew with photo corners on the left page, and a handwritten "today's page" index card on the right — and the whole page keeps turning like that: evidence taped in, annotated in the margin, measured in ruled tabular figures.

## Unresolved decisions

- Real hardware/casual photos would replace or accompany the graduation portrait; user must supply.
- Whether the contact form should send through Resend again instead of mailto is the user's call (route already exists; not touched).

## Direction contract

THESIS: This is one person's hand-kept engineering notebook, open on the table — evidence taped in, margins annotated in plain language — and it refuses the category-default developer portfolio (terminal-green hero, badge grids, dark chrome, skill-card rows).

OWN-WORLD: Olive-grey quadrille notebook paper as the ground (daylight page in light; the same notebook under a desk lamp in dark), graphite ink, one rationed maroon (regalia) with gold-foil stamp details, masking-tape labels, photo prints with white borders and corner mounts, one hairline rule weight, tabular measurement figures. Recognisable with all content removed.

STORY: The visitor meets Joal as a person first, then reads the evidence page by page — the work, the credentials, the bench — and finds a contact route in seconds; the cats and the bench make the visit worth remembering.

FIRST VIEWPORT: A full-bleed open spread. Left page: the graduation portrait taped in at ~2° with photo corners, name set large in stamped display type, one plain sentence about what he does, three actions (see the work, get in touch, résumé). Right page: a taped index card "what I'm working on now" plus the tabbed divider edges for the sections. Primary action sits under the sentence on the left page. No card row, no metric row, no badges.

FORM: The hand-kept engineering lab notebook — grounded candidate 4 in my ordered list of seven (seed key 96968944). Signature interaction: **page-turn settle** — on load the taped portrait settles into the page and its tape strips flex; as the visitor scrolls, each section arrives as a page settling (slight lift, shadow deepening), margin notes are written in last, and gold index tabs light as sections pass. Motion grammar: exponential ease-out from visible defaults, rotation/translate/shadow only, nothing hidden longer than one settle, everything off under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
