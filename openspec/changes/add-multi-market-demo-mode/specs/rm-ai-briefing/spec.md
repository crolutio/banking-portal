## ADDED Requirements

### Requirement: Briefing API is market-aware

The `/api/rm-briefing` endpoint SHALL accept an optional `market` field in the request body. When present, the route SHALL scope every Supabase read (profile, accounts, transactions, tickets, conversations) by `market`, SHALL pass only the matching-market product catalog into the Claude system prompt, and SHALL include a MARKET CONTEXT block describing locale, currency, dominant payment rails, common merchants, and regulatory references for that market.

#### Scenario: Kenya briefing request
- **WHEN** the endpoint receives `{ clientId: <kenyan-uuid>, market: 'kenya' }`
- **THEN** the response narrative, key concern, next-best-action, and opportunity SHALL reference Kenyan context (KES amounts, Kenyan merchants, Kenyan banking products) and SHALL NOT reference UAE-specific entities (AED, DEWA, Dubai locations) unless explicitly part of the client's data

#### Scenario: Default (UAE) briefing request
- **WHEN** the endpoint receives `{ clientId: <uae-uuid> }` with no market field, or `{ clientId, market: 'default' }`
- **THEN** behavior SHALL match the pre-change UAE briefing exactly

### Requirement: Briefing client component passes the active market

The `ClientBriefingPanel` component SHALL read the active market from `MarketContext` and include it in the POST body when calling `/api/rm-briefing`. The cache key written to `localStorage` SHALL also include the market value so cached briefings from one market do not collide with another.

#### Scenario: Cache key uniqueness
- **WHEN** the panel caches a briefing for client X under market `default`, then the user switches to market `kenya` and views a client with a colliding UUID
- **THEN** the cache lookup for the kenya market SHALL miss (returning no stale UAE briefing) and trigger a fresh fetch
