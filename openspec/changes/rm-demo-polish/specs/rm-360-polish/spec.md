## ADDED Requirements

### Requirement: 360 page header is sticky on scroll
The client header card on `/rm-workspace/[clientId]` SHALL remain visible at the top of the viewport while the RM scrolls through the rest of the page content.

#### Scenario: RM scrolls past header
- **WHEN** the RM scrolls down past the header card's natural position
- **THEN** the header card SHALL stick to the top of the viewport with a subtle border and remain interactive

### Requirement: Briefing panel includes quick-action chips
The Client Briefing Panel SHALL render a row of quick-action chips immediately under the three insight tiles (Concern / Next Best Action / Opportunity).

#### Scenario: Briefing loaded successfully
- **WHEN** a briefing has been rendered
- **THEN** the panel SHALL render a chip row containing at minimum "Draft outreach" and "Refresh"

#### Scenario: Refresh chip
- **WHEN** the RM clicks the Refresh chip
- **THEN** the panel SHALL clear the localStorage cache and re-fetch the briefing (same behavior as the header refresh button it replaces)

### Requirement: Stale Risk Alerts card is removed
The 360 page SHALL no longer render the Risk Alerts card (the `risk_alerts` table is no longer available and the card always rendered empty).

#### Scenario: 360 page renders
- **WHEN** the RM opens a client 360 page
- **THEN** the page SHALL NOT display a Risk Alerts card section

## MODIFIED Requirements

### Requirement: Workspace dashboard removes hardcoded schedule widget
The workspace dashboard SHALL no longer render the hardcoded "Today's Schedule" widget. Proactive prioritization is provided by the Portfolio Pulse row instead.

#### Scenario: Dashboard loads
- **WHEN** the RM lands on `/rm-workspace`
- **THEN** the page SHALL NOT display a Today's Schedule widget

### Requirement: Workspace dashboard client rows show cached main concern
Each client row on `/rm-workspace` SHALL display an inline `main_concern` line under the client's email when a fresh briefing for that client is cached in localStorage.

#### Scenario: Cached briefing exists
- **WHEN** `localStorage[rm-briefing-<clientId>]` contains a non-expired briefing for the client
- **THEN** the row SHALL display the cached `main_concern` text as a third line with a small icon

#### Scenario: No cached briefing
- **WHEN** there is no cached briefing for the client
- **THEN** the row SHALL render normally with only name/email/balance

#### Scenario: Stale cached briefing
- **WHEN** the cached briefing is older than its TTL
- **THEN** the row SHALL NOT display the stale main_concern
