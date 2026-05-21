## ADDED Requirements

### Requirement: Sidebar displays RM-specific navigation when role is relationship_manager

The sidebar SHALL display a distinct set of navigation items when `currentRole` is `relationship_manager`. The customer-facing items (Home, Accounts, Cards, Savings Goals, Loans, Investments, Rewards, Marketplace, Support) SHALL be replaced with RM-specific items.

#### Scenario: RM logs in and sees RM sidebar
- **WHEN** the current role is `relationship_manager`
- **THEN** the sidebar displays: Dashboard (`/rm-workspace`), My Clients (`/rm-workspace`), Alerts (`/rm-workspace`), Schedule (`/rm-workspace`)

#### Scenario: Non-RM user sees standard sidebar
- **WHEN** the current role is NOT `relationship_manager`
- **THEN** the sidebar displays the standard customer-facing navigation items (Home, Accounts, Cards, etc.)

### Requirement: RM sidebar preserves admin/risk items if user has access

The sidebar SHALL still show Risk & Compliance and Admin Console items if the RM role also has access to those sections (via existing permission helpers).

#### Scenario: RM with admin access sees combined sidebar
- **WHEN** the current role is `relationship_manager` AND the user has admin access
- **THEN** the sidebar displays RM items plus Admin Console and Audit Log items below a separator
