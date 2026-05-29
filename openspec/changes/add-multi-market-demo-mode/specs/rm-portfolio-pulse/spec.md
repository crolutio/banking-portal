## ADDED Requirements

### Requirement: Portfolio Pulse is market-scoped

The `/api/rm-portfolio-pulse` endpoint SHALL accept an optional `market` field in the request body. When present, the scan SHALL consider only clients with `assigned_rm_id = <rmId>` AND `market = <market>`, and SHALL inject a MARKET CONTEXT block into the LLM prompt used to author each item's one-line reason.

#### Scenario: Kenyan RM pulse
- **WHEN** the endpoint receives `{ rmId: <kenyan-rm-uuid>, market: 'kenya' }`
- **THEN** the returned items SHALL reference Kenyan clients only, and the reason strings SHALL use Kenyan-context language (e.g., "M-Pesa fee escalation", "Kileleshwa mortgage restructure opportunity")

#### Scenario: Default RM pulse (backwards compatibility)
- **WHEN** the endpoint receives `{ rmId: <uae-rm-uuid> }` with no market field
- **THEN** behavior SHALL match the pre-change UAE pulse exactly

### Requirement: Pulse row reads market from context

The `PortfolioPulseRow` component SHALL read the active market from `MarketContext` and include it in the POST body when calling `/api/rm-portfolio-pulse`.

#### Scenario: Market switch during dashboard view
- **WHEN** the RM is on the dashboard and switches market
- **THEN** the Pulse row SHALL re-fetch under the new market and re-render the loading state and then the new items
