## ADDED Requirements

### Requirement: Copilot API is market-aware

The `/api/rm-chat` endpoint SHALL accept an optional `market` field in the request body. When present, the route SHALL filter all persona/dataset reads (the hydrated client snapshot, conversation history, product catalog references) by `market`, and SHALL inject a MARKET CONTEXT block into the Claude system prompt.

#### Scenario: Kenya copilot turn
- **WHEN** the endpoint receives `{ userId: <kenyan-uuid>, messages: [...], market: 'kenya' }`
- **THEN** the streamed reply SHALL use Kenyan-context language and SHALL reference only Kenyan products when suggesting cross-sell options

#### Scenario: Default copilot turn (backwards compatibility)
- **WHEN** the endpoint receives a payload without a `market` field
- **THEN** behavior SHALL match the pre-change UAE copilot exactly

### Requirement: Copilot client component forwards market

The 360 page's Copilot tab `useChat` invocation SHALL pass the active market in its `body` payload so each turn carries the correct market context to the API.

#### Scenario: Market forwarding
- **WHEN** the user sends a message in the Copilot tab while `currentMarket = 'kenya'`
- **THEN** the outbound request to `/api/rm-chat` SHALL include `market: 'kenya'` in the body
