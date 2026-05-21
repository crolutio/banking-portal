## MODIFIED Requirements

### Requirement: Brand accent color

The application SHALL use **#E00800** (e& Red) as the main interactive accent for primary actions (including primary buttons, key links, and focus rings) expressed through design tokens mapped to Tailwind `primary` semantics.

#### Scenario: Light mode primary button

- **WHEN** a user views a standard primary button in light mode
- **THEN** the button fill reflects the brand accent **#E00800** (via semantic `--primary`), and the label meets contrast requirements against that fill.

#### Scenario: Focus visibility

- **WHEN** a keyboard user focuses an interactive control that uses the default ring token
- **THEN** the focus indicator is visible and derives from the same accent family as `--primary` / `--ring`.

## ADDED Requirements

### Requirement: Typography stack and weights

The application SHALL use a clean sans-serif stack intended to match **Suisse International**, with **Arial** as the primary fallback, and SHALL limit font weights used in the product UI to **Regular**, **Medium**, and **Bold** only.

#### Scenario: Body text weight

- **WHEN** a user reads default paragraph or descriptive UI text in English
- **THEN** the typeface uses the approved sans stack and **Regular** weight unless a component explicitly requires Medium for hierarchy.

#### Scenario: Headline weight

- **WHEN** a user views a page or section headline styled as a heading
- **THEN** the headline uses **Bold** weight within the approved weight set.

### Requirement: Primary call-to-action styling

Primary actions that advance the user’s main task SHALL use a **solid** rectangular control with **bold** label text. Primary CTAs SHALL NOT use a ghost (outline-only) or text-only style as the default primary treatment.

#### Scenario: Default primary button

- **WHEN** a user views the primary action on a form or dialog
- **THEN** the control presents as a filled rectangle and the label is **bold**.

#### Scenario: Secondary actions remain distinct

- **WHEN** a user views non-primary actions on the same surface
- **THEN** those actions MAY use outline, ghost, or muted styles without violating the primary CTA rule.

### Requirement: Continuum signature element

The application MAY render a **Continuum** element: a subtle **horizontal** gradient line progressing **left to right** through green, dark green, burgundy, and red. At most **one** Continuum element SHALL appear per logical section (e.g., per card, hero, or content section used as a section boundary).

#### Scenario: Orientation and placement

- **WHEN** Continuum is used as a heading underline or section divider
- **THEN** it is strictly horizontal and does not replace body text.

#### Scenario: Frequency cap

- **WHEN** a single viewport section is composed of multiple nested blocks that belong to the same section intent
- **THEN** Continuum appears at most once for that section.

### Requirement: Brand logo placement (English UI)

For English-language layouts, the brand logo SHALL appear in the **top-left** region of the application chrome with adequate clear space, and the logo asset SHALL NOT be stretched, recolored, or cropped in a way that changes its proportions.

#### Scenario: Desktop shell

- **WHEN** a user views the standard application header or sidebar header on a desktop-width layout
- **THEN** the logo is anchored top-left with padding consistent with the layout grid.

### Requirement: Layout alignment and spacing

Primary English UI content SHALL be **left-aligned** (not centered as the default reading axis). Layouts SHALL follow a consistent grid with **generous whitespace** and SHALL avoid overly dense stacking of controls and text.

#### Scenario: Default content alignment

- **WHEN** a user views a standard dashboard or article-style page in English
- **THEN** primary headings and body blocks align to the same left edge except where a component pattern explicitly requires centered media.

#### Scenario: Density

- **WHEN** a user scans a screen with multiple cards or form groups
- **THEN** spacing between groups remains visually breathable on common laptop breakpoints.

### Requirement: Imagery and illustration on branded surfaces

Marketing or hero imagery SHALL favor **real, human, natural** photography and SHALL avoid cliché staged corporate stock, CGI, or artificial-looking visuals. Illustrations, when used, SHALL be **flat**, minimal, and geometric and SHALL use only the brand palette; illustrations SHALL NOT use 3D effects or internal gradients.

#### Scenario: Hero or banner imagery

- **WHEN** a user views a landing or promotional banner inside the product chrome
- **THEN** photography reads natural and people-centered rather than synthetic or overly staged.

#### Scenario: Illustration discipline

- **WHEN** an illustration is shown instead of photography
- **THEN** it remains flat and palette-bound without gradient fills inside the illustration artwork.

### Requirement: Minimal palette for semantic colors

Beyond the e& Red primary and white/light surfaces, secondary and semantic colors (muted text, borders, success, warning, destructive, info) SHALL be used **sparingly** for hierarchy and state. New arbitrary accent colors SHALL NOT be introduced for layout chrome.

#### Scenario: Avoiding rainbow accents

- **WHEN** implementing a new dashboard widget or card pattern
- **THEN** developers use existing semantic tokens rather than ad-hoc hex colors for backgrounds and borders.
