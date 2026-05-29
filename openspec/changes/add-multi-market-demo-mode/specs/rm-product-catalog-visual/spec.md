## ADDED Requirements

### Requirement: Product catalog page filters by active market

The `/rm-workspace/products` page SHALL read the active market from `MarketContext` and filter the displayed catalog by `market = currentMarket`. The category grouping and visual card rendering SHALL be unchanged in structure; only the source rows differ per market.

#### Scenario: Default market view
- **WHEN** the user lands on the products page with `currentMarket = 'default'`
- **THEN** the page SHALL render the existing UAE product set, grouped by category as before

#### Scenario: Kenya market view
- **WHEN** the user switches to `currentMarket = 'kenya'` while on the products page
- **THEN** the page SHALL re-fetch and render the Kenyan catalog (Treasury Bills KES, M-Pesa link, NSE Equity Unit Trust, SME Working Capital, etc.), grouped under the same category headers

#### Scenario: Live switch
- **WHEN** the active market changes while the page is mounted
- **THEN** the page SHALL re-fetch products under the new market filter without requiring a manual reload
