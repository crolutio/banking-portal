## ADDED Requirements

### Requirement: RM dashboard shows assigned client list from database

The RM dashboard at `/rm-workspace` SHALL fetch and display all clients assigned to the current RM from the banking database (`profiles` table where `assigned_rm_id` matches the RM's banking user ID).

#### Scenario: RM with assigned clients sees client list
- **WHEN** the RM navigates to `/rm-workspace`
- **THEN** the page displays a list of assigned clients with name, segment, total balance (from accounts table), and a link to their 360 view

#### Scenario: RM with no assigned clients sees empty state
- **WHEN** the RM navigates to `/rm-workspace` and has no assigned clients
- **THEN** the page displays an empty state message

### Requirement: RM dashboard shows portfolio summary stats

The dashboard SHALL display summary statistics: total client count, total AUM (sum of all client account balances), count of at-risk clients, and count of pending actions.

#### Scenario: Stats reflect real data
- **WHEN** the RM dashboard loads
- **THEN** the stats cards show client count, AUM, at-risk count, and pending action count calculated from the fetched data

### Requirement: RM dashboard shows risk alerts for portfolio

The dashboard SHALL display risk alerts associated with the RM's assigned clients, fetched from the `risk_alerts` table.

#### Scenario: RM sees portfolio alerts
- **WHEN** the RM dashboard loads and clients have risk alerts
- **THEN** an alerts section shows alert titles, severity, and status for the RM's client portfolio

### Requirement: RM dashboard shows next-best-actions

The dashboard SHALL display actionable recommendations for the RM's clients based on their data (open tickets, risk alerts, upcoming payments).

#### Scenario: RM sees prioritized actions
- **WHEN** the RM dashboard loads
- **THEN** a next-best-actions section shows prioritized actions with client name, action description, and priority level
