## Context

The portal is a Next.js app using Tailwind v4 with semantic CSS variables in `app/globals.css` (with `styles/globals.css` kept in sync). Theme toggling remains class-based (`dark` on `<html>`). The live accent is documented as **#e10801** with Inter/Geist sans fonts. This change adopts official **e&** guidelines: **#E00800** primary red, restrained palette, Suisse-like typography with Arial fallback, Continuum gradient line, top-left logo, left-aligned English layouts, solid primary CTAs, and rewritten product copy—without altering routes, data fetching, or business rules.

## Goals / Non-Goals

**Goals:**

- Map **#E00800** to semantic tokens (`--primary`, `--ring`, `sidebar-primary`, chart accents where they represent the brand accent) and update OKLCH equivalents so components using `bg-primary`, `text-primary`, focus rings, and sidebar accents align automatically.
- Introduce a reusable **Continuum** primitive (horizontal gradient bar: green → dark green → burgundy → red, left to right) for headings, section breaks, or subtle emphasis—**at most one** per section.
- Apply **typography** rules globally: sans stack targeting Suisse International with Arial fallback; weights Regular / Medium / Bold only; body Regular; headlines Bold; primary CTAs **Bold on solid filled** rectangles.
- Enforce **layout**: generous spacing, grid-consistent alignment, **left-aligned** English UI; logo **top-left** with protected clear space.
- **Rewrite** user-visible strings to e& tone (direct, concise, “you”, no buzzwords); keep semantics of actions unchanged (same buttons, same flows).
- Prefer **authentic photography** on marketing surfaces; flat illustration only when needed, brand palette only, no 3D or illustrated gradients.

**Non-Goals:**

- Changing API contracts, auth, or transactional behavior.
- Replacing the product information architecture or renaming routes (unless copy-only labels require it).
- Licensing or embedding Suisse International font files—use stack + fallback unless commercial fonts are already cleared.

## Decisions

1. **Single source for tokens: `app/globals.css` (and mirrored `styles/globals.css`)**  
   - **Rationale**: Matches the existing archive pattern; avoids scattering hex values. Recompute OKLCH for **#E00800** for `--primary`, `--ring`, matching sidebar/chart tokens that currently mirror the accent.  
   - **Alternatives**: Tailwind config-only (rejected: project uses CSS-first tokens).

2. **Continuum as a small shared component + optional utility class**  
   - **Rationale**: Guarantees one horizontal implementation (gradient direction and stops) and reuse under headings or as `<hr>`-style dividers.  
   - **Alternatives**: Inline styles per page (rejected: inconsistent); SVG asset (optional later if CSS gradient is insufficient).

3. **Primary CTA = `Button` default variant (solid) with bold label**  
   - **Rationale**: Aligns with “no ghost as primary”; ghost/outline remain for secondary actions.  
   - **Alternatives**: New variant name (only if default cannot stay accessible on all surfaces).

4. **Copy changes: centralized message patterns where they exist; otherwise file-by-file**  
   - **Rationale**: i18n or shared `constants` may hold strings—prefer editing those entry points before deep leaf strings.  
   - **Alternatives**: Full i18n extraction (out of scope unless already planned).

5. **Imagery**  
   - **Rationale**: Replace obvious stock/CGI in obvious marketing blocks; use placeholders or curated assets consistent with “real, human, natural.”  
   - **Alternatives**: Banning all images (rejected: guidelines allow photography).

## Risks / Trade-offs

- **[Risk] Font files for Suisse International unavailable** → **Mitigation**: Ship Arial-backed stack first; swap font-face when assets and license are confirmed.  
- **[Risk] #E00800 vs. previous red shifts contrast on some custom components** → **Mitigation**: Verify primary-on-white and focus ring in light/dark; tune `--primary-foreground` if needed.  
- **[Risk] Copy rewrites affect tests or snapshots that assert exact text** → **Mitigation**: Update snapshots and test strings in one pass with copy changes.  
- **[Trade-off]** Dark mode remains supported for accessibility and existing behavior; e& guidelines emphasize light surfaces—dark tokens stay coherent but are not the branding hero case.

## Migration Plan

1. Land token + typography + Continuum + layout shell updates behind normal PR workflow (no feature flag required for a visual refresh).  
2. Sweep pages for hard-coded old accent hex or legacy greens; replace with semantic tokens.  
3. Replace marketing/hero imagery where clearly off-brand.  
4. Run visual smoke tests (light/dark), keyboard focus check, and lint/tests.  
5. Rollback: revert the branch; tokens are self-contained in CSS and components.

## Open Questions

- Whether **Suisse International** webfont files are approved for this product—until then Arial-backed stack is the default.  
- Exact **Continuum** color stops (brand PDF values) if marketing provides precise hexes; initial implementation uses CSS linear-gradient stops matching green → dark green → burgundy → red as agreed.
