## Why

The app currently uses a generic emerald-forward palette that does not match the desired brand direction. Aligning the UI to a consistent accent (**#e10801**) with explicit light (white) and dark (very dark gray) surfaces improves visual identity and readability across the banking portal.

## What Changes

- Redefine global CSS variables / Tailwind theme tokens so **primary accent** is **#e10801** (with accessible foreground-on-accent contrast).
- Set **light mode** default surfaces to **white** (`#ffffff` or equivalent) for page/card backgrounds; keep muted borders and secondary text tuned for white backgrounds.
- Set **dark mode** default surfaces to **very dark gray** (not pure black) for page/card backgrounds; tune foreground and muted colors for contrast on dark gray.
- Propagate updates through shared UI primitives (buttons, links, focus rings, badges, sidebar, charts where theme-bound) so the scheme feels cohesive—not isolated accent swaps.

## Capabilities

### New Capabilities

- `global-theme`: Defines requirement-level behavior for global light/dark color tokens (accent, backgrounds, semantic colors derived from the accent where applicable).

### Modified Capabilities

- _(none — no existing specs under `openspec/specs/` to delta.)_

## Impact

- **Code**: `app/globals.css` (and/or Tailwind v4 theme config), `components/theme-provider.tsx` if needed, any hard-coded emerald/brand colors in layouts or dashboard components.
- **Dependencies**: None beyond existing Tailwind/CSS setup.
- **Systems**: Visual/regression check in browser (light + dark + system theme).
