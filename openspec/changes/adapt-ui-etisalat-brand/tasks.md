## 1. Global theme tokens and typography base

- [x] 1.1 Recompute OKLCH (or equivalent) for **#E00800** and update `--primary`, `--ring`, `sidebar-primary`, and chart tokens that mirror the brand accent in `app/globals.css` and keep `styles/globals.css` in sync.
- [x] 1.2 Update `@theme inline` / `--font-sans` to the Suisse International–first stack with **Arial** fallback; restrict configured weights to Regular, Medium, Bold where the framework exposes explicit weights.
- [x] 1.3 Audit `.dark` tokens so primary accent and rings remain coherent after the accent shift; verify contrast for primary labels and focus rings in light and dark.

## 2. Continuum signature element

- [x] 2.1 Add a reusable horizontal Continuum gradient (green → dark green → burgundy → red, left → right) as a small component or utility, documented for use under headings or as section dividers.
- [x] 2.2 Apply Continuum sparingly on key pages (e.g., hero or primary section heading)—**one per section**—and avoid duplicate bars within the same section.

## 3. Layout shell, logo, and alignment

- [x] 3.1 Ensure the brand logo sits **top-left** in the main chrome for English layouts with consistent padding / clear space; verify responsive breakpoints do not crop or distort the asset.
- [x] 3.2 Replace patterns that center all primary English content by default with left-aligned column layouts; tighten grid spacing for breathable whitespace without breaking responsive behavior.

## 4. Components and primary CTAs

- [x] 4.1 Ensure default **primary** `Button` (and equivalent controls) use solid fills with **bold** labels; reserve ghost/outline variants for secondary actions only.
- [x] 4.2 Sweep shared UI (links styled as primary actions, sidebar active states, badges) for hard-coded legacy accent hex or off-palette colors; route through semantic tokens.

## 5. Copy and brand voice (`brand-content`)

- [x] 5.1 Inventory user-visible strings (pages, dialogs, empty states, errors, navigation) and rewrite to e& tone: short, direct, “you”, no buzzwords; preserve action meaning and routes.
- [x] 5.2 Normalize headlines to **Bold**, short phrasing, **no trailing period** on phrase-style titles where applicable.
- [x] 5.3 Update tests, Storybook stories, and snapshots that assert exact copy so CI stays green.

## 6. Imagery and illustration

- [x] 6.1 Replace obvious staged stock, CGI, or cliché corporate hero/marketing images with more natural photography consistent with guidelines (or approved placeholders until assets arrive).
- [x] 6.2 If illustrations exist, flatten styling to simple geometric forms, brand palette only; remove 3D or internal illustration gradients.

## 7. Verification

- [x] 7.1 Run lint and unit/integration tests; fix failures from token or copy updates.
- [x] 7.2 Manual pass: light + dark mode, keyboard focus visibility, primary flows unchanged functionally.
