## Why

The banking portal should visually and verbally align with **e& (Etisalat &)** so it reads as one credible telecom / tech brand rather than a generic product UI. This change updates presentation and copy only; behavior and integrations stay the same.

## What Changes

- **Color system**: Primary accent becomes **#E00800** (e& Red); light surfaces stay **white (#FFFFFF)**; minimal palette—no new arbitrary colors; secondary tones only for hierarchy.
- **Typography**: Sans-serif stack aligned to Suisse International with **Arial** fallback; weights limited to Regular, Medium, Bold; headlines bold and unpunctuated at end; body Regular; primary CTAs use **bold text in solid rectangular fills** (no ghost buttons as primary actions).
- **Copy**: Rewrite visible UI strings to a clear, direct, human tone (use “you”); short sentences; no fluff, clichés, buzzwords, or exaggerated marketing.
- **Layout**: Clean grid, generous whitespace, left-aligned English UI (no global centering); structured, consistent alignment.
- **Logo**: Top-left for English UI; clear space; no recoloring or distortion of the logo asset.
- **Continuum**: Introduce a subtle **horizontal** gradient line (green → dark green → burgundy → red), left → right—used sparingly as heading underline, section divider, or highlight—**one per section**, minimal.
- **Imagery & illustration**: Prefer natural human photography; avoid staged stock, CGI, and cliché corporate shots; any illustration stays flat, geometric, palette-only—no 3D or gradients inside illustrations.

## Capabilities

### New Capabilities

- `brand-content`: Tone of voice, headline rules, and alignment requirements for user-visible English copy across the app.

### Modified Capabilities

- `global-theme`: Brand accent, surfaces, semantic token usage, typography scale, primary CTA presentation, Continuum element, layout/spacing principles, and logo placement—requirements updated to match e& guidelines.

## Impact

- **Frontend**: Global CSS / Tailwind tokens, shared layout (header/sidebar), button and link variants, typography utilities, and any component that hard-codes colors or marketing copy.
- **Assets**: Logo usage and any hero/marketing imagery references (replace or recrop toward authentic photography where applicable).
- **Tests / snapshots**: Visual or copy snapshots may need updates; no API or business-logic contract changes.
