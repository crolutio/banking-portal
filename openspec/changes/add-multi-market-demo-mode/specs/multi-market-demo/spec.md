## ADDED Requirements

### Requirement: Market dimension exists on all persona/dataset tables

Every table holding persona-bound or persona-derived data SHALL carry a `market` column of type `TEXT NOT NULL DEFAULT 'default'`. The banking DB tables `profiles`, `accounts`, `cards`, `loans`, `transactions`, `support_tickets`, `support_messages`, and `products`, and the call-center DB tables `customers`, `conversations`, and `messages`, SHALL each have this column.

#### Scenario: Existing rows after migration
- **WHEN** the migration runs against a database with pre-existing rows
- **THEN** every existing row SHALL have `market = 'default'` and no row SHALL be deleted or modified

#### Scenario: New seed inserts
- **WHEN** a seed script inserts rows for a non-default market
- **THEN** each inserted row SHALL specify an explicit `market` value matching the target market

### Requirement: Active market selection is held in a React context

The app SHALL expose a `MarketContext` with `{ currentMarket, setMarket, availableMarkets }`. The context SHALL persist the selected market to `localStorage` under a stable key and restore it on subsequent loads.

#### Scenario: First-ever load
- **WHEN** the user opens the app and `localStorage` contains no prior selection
- **THEN** `currentMarket` SHALL initialize to `'default'`

#### Scenario: Reload after switching
- **WHEN** the user switches markets and reloads the page
- **THEN** `currentMarket` SHALL be restored to the previously selected market value

#### Scenario: Programmatic switch
- **WHEN** a component calls `setMarket('kenya')`
- **THEN** `currentMarket` SHALL update synchronously and `localStorage` SHALL be written with the new value

### Requirement: Market switcher UI control is mounted in the header

A market switcher control SHALL be mounted in the app header, immediately adjacent to the existing theme switcher. It SHALL be rendered as an icon-only ghost button (no visible text label) using a locale-suggesting icon (e.g., `Languages` or `Globe`), and SHALL open a dropdown listing all available markets with their display labels.

#### Scenario: Click to open
- **WHEN** the user clicks the market switcher button
- **THEN** a dropdown SHALL open showing each available market as a selectable item

#### Scenario: Select a market
- **WHEN** the user selects a market option from the dropdown
- **THEN** the system SHALL call `setMarket(selected)` and close the dropdown

#### Scenario: Visual subtlety
- **WHEN** the switcher is rendered on any page
- **THEN** it SHALL match the visual weight of the theme switcher (same button variant, same size, no visible label text)

### Requirement: Dataset reads are scoped to the active market

A helper SHALL be provided that scopes table reads to the currently active market by injecting `.eq('market', currentMarket)`. Components that perform list reads on persona/dataset tables SHALL use this helper.

#### Scenario: List read with helper
- **WHEN** a component reads all rows from a market-scoped table via the helper
- **THEN** the query SHALL include `market = <currentMarket>` and SHALL return only rows matching that market

#### Scenario: ID-disambiguated read
- **WHEN** a component reads a single row by its UUID (e.g., `where id = <clientId>`)
- **THEN** the helper need not inject a market filter, because the UUID itself binds the row to one market

### Requirement: Per-role identity resolution is market-aware

The role context SHALL resolve the active banking and call-center user IDs as a function of `(currentMarket, currentRole)`. When the market changes, the resolved user IDs for every role SHALL also change to the corresponding personas in that market.

#### Scenario: Role+market resolution
- **WHEN** `currentRole = 'relationship_manager'` and `currentMarket = 'kenya'`
- **THEN** `currentBankingUserId` SHALL resolve to the Kenyan RM persona UUID, not the UAE RM

#### Scenario: Market switch while logged in as RM
- **WHEN** the RM is on `/rm-workspace` and switches market to `kenya`
- **THEN** the dashboard SHALL re-fetch and display the Kenyan RM's assigned clients, not the UAE RM's

### Requirement: AI routes accept and apply market context

Every AI surface that hydrates persona data — `/api/rm-briefing`, `/api/rm-chat`, `/api/rm-portfolio-pulse`, `/api/rm-draft-outreach`, and `/api/chat` — SHALL accept an optional `market` field in the request body. When provided, the route SHALL filter all persona/dataset reads by that market and SHALL inject a MARKET CONTEXT block into the LLM system prompt.

#### Scenario: Briefing request with kenya market
- **WHEN** `/api/rm-briefing` receives `{ clientId, market: 'kenya' }`
- **THEN** the route SHALL fetch client data scoped to `market = 'kenya'`, SHALL pass only the Kenyan product catalog into the LLM prompt, and SHALL include a MARKET CONTEXT block stating Kenya, KES, M-Pesa, and common Kenyan merchants

#### Scenario: Missing market parameter
- **WHEN** a route receives a request without a `market` field
- **THEN** the route SHALL default to `market = 'default'` for backwards compatibility

### Requirement: Currency formatting reads default from market context

`formatCurrency` SHALL use the active market's default currency when no explicit currency is supplied by the caller. Explicit per-row currency arguments SHALL continue to take precedence over the market default.

#### Scenario: No explicit currency, kenya active
- **WHEN** `formatCurrency(1000)` is called while `currentMarket = 'kenya'`
- **THEN** the formatted output SHALL use `KES` as the currency code

#### Scenario: Explicit currency override
- **WHEN** `formatCurrency(1000, 'USD')` is called while `currentMarket = 'kenya'`
- **THEN** the formatted output SHALL use `USD`, not `KES`
