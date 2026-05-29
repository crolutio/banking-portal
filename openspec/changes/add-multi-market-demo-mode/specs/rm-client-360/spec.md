## ADDED Requirements

### Requirement: 360 page reads market from context for formatting

The `/rm-workspace/[clientId]` page SHALL read the active market from `MarketContext` and use it as the default for currency formatting on metric tiles (Total Balance, Liabilities, Inflow, Outflow, etc.). Per-account currency overrides (e.g., USD diaspora accounts) SHALL continue to take precedence.

#### Scenario: Kenyan client 360 view
- **WHEN** the page is loaded for a Kenyan client with `currentMarket = 'kenya'`
- **THEN** the aggregate metric tiles SHALL render values formatted in KES by default

#### Scenario: USD account row inside Kenyan client view
- **WHEN** an individual account row has `currency = 'USD'`
- **THEN** that row SHALL render in USD regardless of the active market

### Requirement: 360 page does not require an explicit market filter on ID-disambiguated reads

The 360 page's sub-fetches (profile by id, accounts/cards/loans/transactions by customer_id) SHALL continue to use ID-disambiguated queries without an explicit `.eq('market', m)` filter, because the client UUID itself belongs to exactly one market.

#### Scenario: Client UUID determines market implicitly
- **WHEN** the URL path includes a Kenyan client UUID
- **THEN** all sub-fetches SHALL return only that client's data (which by construction is `market = 'kenya'`) with no risk of returning cross-market rows
