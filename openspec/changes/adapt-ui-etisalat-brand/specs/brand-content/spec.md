## ADDED Requirements

### Requirement: Tone of voice for user-visible English copy

All user-visible English strings SHALL be **clear, concise, and confident**, written in a **human** voice that addresses the user as **“you”**. Copy SHALL avoid fluff, clichés, buzzwords, exaggerated marketing claims, and long sentences where a shorter sentence suffices.

#### Scenario: Rewriting hype

- **WHEN** existing UI copy uses exaggerated or filler marketing language
- **THEN** it is rewritten to a short, direct statement that preserves the same user-facing outcome.

#### Scenario: Addressing the user

- **WHEN** the product explains an action or outcome to the user
- **THEN** the wording prefers direct address (“you”, imperatives) over abstract corporate voice.

### Requirement: Headline punctuation and length

Headlines (page titles, section titles, and comparable heading copy) SHALL be **short and punchy**, SHALL use **Bold** presentation per typography rules, and SHALL **not** end with sentence-ending punctuation such as periods.

#### Scenario: Section title

- **WHEN** a user reads a section heading that is a phrase rather than a full sentence
- **THEN** the heading does not end with a period.

### Requirement: Consistency of meaning after copy changes

Rewritten copy SHALL preserve the **meaning** of user actions: button labels SHALL still describe the same operation, errors SHALL still explain the same failure mode, and navigation SHALL still route to the same destinations.

#### Scenario: Primary action label

- **WHEN** a primary button previously initiated a payment submission
- **THEN** after copy revision it still clearly initiates payment submission without changing behavior.
