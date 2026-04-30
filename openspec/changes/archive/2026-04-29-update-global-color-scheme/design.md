## Context

The app uses Tailwind v4 with CSS variables in `app/globals.css` (`:root`, `.dark`, and `@theme inline`). Theme toggling is class-based (`dark` on `<html>` via `next-themes`). Today’s palette centers on emerald-style primaries; we are shifting to a red accent **#e10801**, white surfaces in light mode, and very dark gray (not pure black) surfaces in dark mode.

## Goals / Non-Goals

**Goals:**

- Centralize the new palette in **semantic tokens** (`--primary`, `--ring`, `--sidebar-primary`, chart tokens where appropriate) so components using `bg-primary`, `text-primary`, etc. pick up the scheme without one-off hex edits.
- Keep **light mode** page/card/popover backgrounds **white** and readable gray text hierarchy.
- Keep **dark mode** backgrounds **very dark gray** with adjusted borders, muted text, and accent/ring colors that remain visible.
- Preserve **accessible contrast** for primary buttons and links (foreground on primary, focus rings).

**Non-Goals:**

- Redesigning layout, typography scale, or component anatomy.
- Replacing logo assets or illustration colors outside theme-bound CSS.
- Third-party widget styling beyond what global CSS can influence.

## Decisions

1. **Single source of truth: `app/globals.css`**
   - **Rationale**: The project already defines `--primary`, `--background`, sidebar, and chart tokens here; updating `:root` and `.dark` avoids scattering hex values across dozens of components.
   - **Alternatives**: Per-component Tailwind arbitrary colors (rejected: unmaintainable); separate CSS file (acceptable later if tokens grow).

2. **Express brand red as OKLCH (or consistent hex) derived from #e10801**
   - **Rationale**: Existing tokens use `oklch(...)` for perceptual consistency; convert **#e10801** to OKLCH for `--primary`, `--ring`, `--sidebar-primary`, and chart-1 where those represent the main accent.
   - **Alternatives**: Raw hex in `@theme` (works but breaks consistency with the rest of the file).

3. **Primary vs accent**
   - **Decision**: Map the user’s “main accent” to **`--primary`** (and aligned tokens: ring, sidebar-primary, success accent if product treats success as brand-colored—see Risks). Keep **`--accent`** as subtle hover/surface accent unless product dictates otherwise; document in tasks if accent chip should also be #e10801.

4. **`layout.tsx` viewport `themeColor`**
   - **Decision**: Update meta theme color to match the new primary / brand strip (optional but recommended for mobile browser chrome).

5. **Hard-coded colors in TSX**
   - **Decision**: Grep for `emerald`, `#10b981`, old oklch literals, and replace with semantic classes (`text-primary`, `bg-primary/10`, etc.) where possible; only leave literals where charts or third-party config require explicit colors.

## Risks / Trade-offs

- **[Risk]** `--success` today mirrors old primary green; switching primary to red may make “success” states look red if tied to the same token.
  - **Mitigation**: Keep **success** as a distinct green (or neutral-ok) in tokens; only map **primary** to #e10801.

- **[Risk]** Charts using `--chart-*` may clash with the new brand until tuned.
  - **Mitigation**: Adjust chart tokens for harmony; verify key dashboards in light and dark.

- **[Risk]** Very saturated red on large backgrounds can feel harsh.
  - **Mitigation**: Use full #e10801 for CTAs and focus; keep page backgrounds white / dark gray per spec.

## Migration Plan

1. Land CSS token updates on a branch; smoke-test light/dark/system.
2. No database or API migration.
3. **Rollback**: Revert `globals.css` (and any TSX color tweaks) via git; no feature flags required.

## Open Questions

- Should **sidebar** use the same red for active nav as **primary**, or a slightly muted variant for large filled areas?
- Should **destructive** actions remain red-distinct from **primary** (recommended: keep destructive as a different hue or darker red).
