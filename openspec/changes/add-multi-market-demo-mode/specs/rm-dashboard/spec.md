## ADDED Requirements

### Requirement: Dashboard is scoped to the market-aware RM identity

The `/rm-workspace` dashboard SHALL list only clients whose `assigned_rm_id` matches the current market's RM persona AND whose own `market` value matches the active market. When the active market changes, the dashboard SHALL re-fetch and re-render under the new market's RM identity and client list.

#### Scenario: Switch from default to kenya
- **WHEN** the RM is on the dashboard with `currentMarket = 'default'` (James Rodriguez resolved as RM) and switches to `currentMarket = 'kenya'`
- **THEN** the dashboard SHALL re-resolve the RM identity to Peter Mwangi and SHALL fetch and display the two Kenyan retail clients as the My Clients list

#### Scenario: Stats reflect active market
- **WHEN** the dashboard renders under a non-default market
- **THEN** Portfolio Clients, Total AUM, At-Risk Clients, and Pending Actions counts SHALL be computed from the active market's client set only

### Requirement: Inline main_concern row respects market-scoped cache keys

The dashboard's "My Clients" row SHALL surface the cached briefing's `main_concern` for the active client, reading from the market-scoped briefing cache. A briefing cached under `default` SHALL NOT be surfaced when the active market is `kenya` and vice versa.

#### Scenario: No cross-market cache leak
- **WHEN** a briefing has been cached for a UAE client with the same UUID-shape as a hypothetical Kenyan client
- **THEN** the dashboard SHALL NOT display the UAE briefing's `main_concern` on any Kenyan client row
