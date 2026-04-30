## 1. Theme tokens (globals)

- [x] 1.1 Convert **#e10801** to OKLCH (or document hex bridge) and set `--primary`, `--ring`, `--sidebar-primary`, and aligned tokens (`--chart-1` where it represents the brand accent) in `:root` per `design.md`.
- [x] 1.2 Ensure light mode `--background`, `--card`, `--popover` remain **white**; tune `--foreground`, `--muted`, `--border` for readability on white.
- [x] 1.3 Set dark mode `--background` and `--card` to **very dark gray** (not `#000`); align `--foreground`, `--muted`, `--border`, and sidebar tokens for contrast on dark gray.
- [x] 1.4 Keep **success** (and other semantics) visually distinct from **primary** so success states do not read as generic brand red unless product explicitly requires it.

## 2. App shell & meta

- [x] 2.1 Update `themeColor` in `app/layout.tsx` viewport (and any other meta theme-color) to match the new brand accent or appropriate dark variant.
- [x] 2.2 Smoke-test `ThemeProvider` (light / dark / system): no flash of wrong background on load.

## 3. Component sweep

- [x] 3.1 Grep the codebase for legacy accent literals (`emerald`, `#10b981`, old oklch greens tied to the previous primary) and replace with semantic classes or CSS variables.
- [x] 3.2 Review high-visibility screens (home, accounts, chat header, sidebar) for hard-codedRGB in inline styles; migrate to tokens where feasible.
- [x] 3.3 Spot-check charts (Recharts, etc.) for colors that bypass CSS variables; adjust palette or classNames to match the new scheme.

## 4. Verification

- [x] 4.1 Manual pass: primary buttons, links, focus rings, badges, and sidebar active states in **light** and **dark** mode.
- [x] 4.2 Confirm WCAG contrast for primary button label and default body text on white and on very dark gray backgrounds (fix token adjustments if needed).
