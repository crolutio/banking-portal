# Global theme

## Requirements

### Requirement: Brand accent color

The application SHALL use **#e10801** as the main interactive accent for primary actions (including primary buttons, key links, and focus rings) expressed through design tokens mapped to Tailwind `primary` semantics.

#### Scenario: Light mode primary button

- **WHEN** a user views a standard primary button in light mode
- **THEN** the button fill reflects the brand accent **#e10801** (via semantic `--primary`), and the label meets contrast requirements against that fill.

#### Scenario: Focus visibility

- **WHEN** a keyboard user focuses an interactive control that uses the default ring token
- **THEN** the focus indicator is visible and derives from the same accent family as `--primary` / `--ring`.

### Requirement: Light mode surfaces

In light mode, the application SHALL use a **white** background for the main page canvas and card-like surfaces unless a component explicitly requires a different pattern (e.g., nested muted strip).

#### Scenario: Default page background

- **WHEN** a user views any dashboard route in light mode with default layout
- **THEN** the base application background is white (`#ffffff` or equivalent via `--background`).

#### Scenario: Card surfaces

- **WHEN** a user views a card component that uses semantic card background tokens
- **THEN** the card background is white unless overridden by a documented variant.

### Requirement: Dark mode surfaces

In dark mode, the application SHALL use a **very dark gray** (not pure black) for the main page canvas and card-like surfaces, with foreground and border tokens adjusted to maintain readable contrast.

#### Scenario: Default dark canvas

- **WHEN** a user enables dark mode (or uses system dark)
- **THEN** the base application background is a very dark gray via `--background`, and body text remains readable.

#### Scenario: Card on dark canvas

- **WHEN** a user views card components in dark mode
- **THEN** card backgrounds remain slightly distinguishable from the page background (via `--card` vs `--background`) without switching to pure white.

### Requirement: Cohesive semantic usage

UI code SHALL prefer semantic color utilities (`primary`, `background`, `foreground`, `muted`, `border`, `sidebar-*`) over hard-coded hex or unrelated palette names (e.g., legacy green literals) for layout chrome and shared components, except where external libraries require explicit colors.

#### Scenario: Replacing legacy accent literals

- **WHEN** implementation touches a shared layout or dashboard component that previously hard-coded the old green accent
- **THEN** that usage is updated to semantic tokens or theme-compatible classes so the new accent applies consistently.
