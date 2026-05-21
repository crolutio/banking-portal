## ADDED Requirements

### Requirement: Portfolio Pulse API route exists
The system SHALL expose a POST endpoint at `/api/rm-portfolio-pulse` that accepts `{ rmId }` and returns up to 3 flagged clients with reason and urgency.

#### Scenario: Valid RM
- **WHEN** the endpoint receives a POST with a valid `rmId` that has assigned clients
- **THEN** the system SHALL respond with HTTP 200 and a JSON body `{ items: PulseItem[] }` where each item has `clientId`, `clientName`, `reason`, and `urgency` ("high" | "medium" | "low")

#### Scenario: RM with no clients
- **WHEN** the RM has no assigned clients
- **THEN** the system SHALL respond with HTTP 200 and `{ items: [] }`

#### Scenario: AI generation fails
- **WHEN** the underlying briefing calls fail or time out
- **THEN** the system SHALL respond with HTTP 200 and a hardcoded fallback list for known demo RMs, or `{ items: [] }` otherwise

### Requirement: Pulse row renders on the workspace dashboard
The workspace dashboard at `/rm-workspace` SHALL render a Portfolio Pulse row immediately above the "My Clients" card.

#### Scenario: Dashboard load
- **WHEN** the RM lands on the workspace dashboard
- **THEN** the page SHALL call `/api/rm-portfolio-pulse` and render a skeleton row until the response arrives

#### Scenario: Items returned
- **WHEN** the API returns one or more items
- **THEN** the row SHALL render each item as a card with the urgency icon, client name, one-line reason, and a click target that navigates to that client's 360

#### Scenario: Empty items
- **WHEN** the API returns zero items
- **THEN** the row SHALL render a neutral state message ("No urgent client signals right now") or hide entirely

### Requirement: Pulse items are visually distinguishable by urgency
Pulse cards SHALL use distinct iconography and color treatment per urgency level.

#### Scenario: High urgency
- **WHEN** `urgency === "high"`
- **THEN** the card SHALL display a warning icon and amber/red border accent

#### Scenario: Medium urgency
- **WHEN** `urgency === "medium"`
- **THEN** the card SHALL display a star icon and primary color accent

#### Scenario: Low urgency
- **WHEN** `urgency === "low"`
- **THEN** the card SHALL display a neutral icon and muted border treatment
