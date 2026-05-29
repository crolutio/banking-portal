## ADDED Requirements

### Requirement: Outreach drafting is market-aware

The `/api/rm-draft-outreach` endpoint SHALL accept an optional `market` field in the request body. When present, the route SHALL inject a MARKET CONTEXT block into the Claude system prompt that informs the drafted message's locale conventions (currency formatting, channel norms, regional salutation style, language flavor where appropriate).

#### Scenario: Kenya WhatsApp draft
- **WHEN** the endpoint receives `{ clientId: <kenyan-uuid>, channel: 'whatsapp', tone: 'warm', market: 'kenya' }`
- **THEN** the streamed draft SHALL use Kenyan-context language (KES amounts, possibly light Swahili greetings like "Habari" if the tone is warm) and SHALL reference WhatsApp-appropriate brevity

#### Scenario: Default email draft (backwards compatibility)
- **WHEN** the endpoint receives a payload without a `market` field
- **THEN** behavior SHALL match the pre-change UAE drafting exactly

### Requirement: Outreach dialog reads market from context

The `OutreachDialog` component SHALL read the active market from `MarketContext` and include it in the POST body when calling `/api/rm-draft-outreach`.

#### Scenario: Market is forwarded
- **WHEN** the user clicks "Draft outreach" while `currentMarket = 'kenya'`
- **THEN** the API call SHALL include `market: 'kenya'` in the body
