## ADDED Requirements

### Requirement: Briefing API route exists
The system SHALL expose a POST endpoint at `/api/rm-briefing` that accepts `{ clientId }` and returns a structured JSON response containing the AI briefing, action recommendations, and conversation digest for that client.

#### Scenario: Valid client ID
- **WHEN** the endpoint receives a POST with a valid `clientId`
- **THEN** the system SHALL respond with HTTP 200 and a JSON body matching the briefing schema

#### Scenario: Unknown client ID
- **WHEN** `clientId` does not match a profile in the banking DB
- **THEN** the system SHALL respond with HTTP 404 and a JSON error body

#### Scenario: Missing API key
- **WHEN** the `GOOGLE_GENERATIVE_AI_API_KEY` environment variable is not set
- **THEN** the system SHALL respond with HTTP 500 and an error message

### Requirement: Briefing response uses structured JSON schema
The briefing API SHALL return a JSON object with the following fields:
- `briefing` (string): 2–3 sentence narrative summary
- `main_concern` (string): 1 sentence describing the client's top concern
- `next_best_action` (string): 1 sentence with an actionable RM step
- `opportunity` (string): 1 sentence identifying a product recommendation
- `conversation_digest` (object): containing `total_count`, `open_count`, `sentiment_trend`, `recent_topics` (string array, max 3), and `open_requests` (string array)

#### Scenario: Successful AI generation
- **WHEN** Gemini returns a valid structured response
- **THEN** the API SHALL return the JSON exactly as specified

#### Scenario: AI returns malformed output
- **WHEN** Gemini returns invalid JSON or missing required fields
- **THEN** the API SHALL respond with HTTP 502 and the UI SHALL fall back to a hardcoded briefing

### Requirement: Briefing aggregates data from both databases
The briefing route SHALL fetch profile, accounts, cards, loans, recent transactions, support tickets (with messages), call center conversations (with messages, capped at 10), and the product catalog before invoking Gemini.

#### Scenario: All data available
- **WHEN** the client has data in both banking and call center DBs
- **THEN** the briefing prompt SHALL include all categories of data

#### Scenario: Call center DB unreachable
- **WHEN** the call center fetch fails or returns an error
- **THEN** the briefing SHALL proceed with banking data only and still return a valid response

### Requirement: Briefing panel renders at top of 360 page
The client 360 page at `/rm-workspace/[clientId]` SHALL render a Briefing Panel immediately below the client header card and above all other content sections.

#### Scenario: RM opens client 360
- **WHEN** the RM navigates to `/rm-workspace/[clientId]`
- **THEN** the Briefing Panel SHALL appear as the first content section below the header

#### Scenario: Briefing loading
- **WHEN** the briefing API call is in progress
- **THEN** the panel SHALL render a skeleton state with shimmer placeholders for the narrative and three action cards

### Requirement: Briefing panel displays narrative and three action cards
The Briefing Panel SHALL render the AI narrative as the top section, followed by three labeled cards displaying main concern, next best action, and opportunity.

#### Scenario: Briefing loaded successfully
- **WHEN** the briefing API returns a successful response
- **THEN** the panel SHALL display the `briefing` text and three cards labeled "Key Concern", "Next Best Action", and "Opportunity"

#### Scenario: Refresh requested
- **WHEN** the RM clicks the Refresh button on the panel
- **THEN** the panel SHALL clear the localStorage cache and re-call the API

### Requirement: Briefing falls back gracefully on failure
If the briefing API call fails, times out (>10 seconds), or returns malformed data, the panel SHALL display a hardcoded fallback briefing keyed by `clientId`.

#### Scenario: API timeout
- **WHEN** the briefing API does not respond within 10 seconds
- **THEN** the panel SHALL render the hardcoded fallback for that `clientId` and SHALL display an inline "AI unavailable" indicator with a retry button

#### Scenario: Unknown client without fallback
- **WHEN** the client has no hardcoded fallback and the API fails
- **THEN** the panel SHALL display a generic "Briefing unavailable" message with a retry button

### Requirement: Briefing is cached in localStorage
The Briefing Panel SHALL cache successful API responses in `localStorage` under the key `rm-briefing-<clientId>` with a 1-hour TTL.

#### Scenario: Returning to same client within 1 hour
- **WHEN** the RM navigates back to a client within 1 hour of generating their briefing
- **THEN** the panel SHALL render the cached briefing immediately without re-calling the API

#### Scenario: Cache expired
- **WHEN** the cached briefing is older than 1 hour
- **THEN** the panel SHALL discard the cache and trigger a fresh API call

### Requirement: Conversation digest displays sentiment and topics
The Briefing Panel SHALL display a Conversation Digest section showing total conversation count, open count, sentiment trend, and up to 3 recent topics.

#### Scenario: Client has conversations
- **WHEN** the client has at least one conversation in the call center DB
- **THEN** the digest SHALL display the counts, sentiment label, and topic list

#### Scenario: Client has no conversations
- **WHEN** the client has zero conversations
- **THEN** the digest SHALL display "No recent conversations"

### Requirement: Open requests are highlighted in the digest
If the conversation digest contains open requests, they SHALL be rendered as a separate "Open Requests" list with a highlighted visual treatment.

#### Scenario: Client has open requests
- **WHEN** `open_requests` array is non-empty
- **THEN** the digest SHALL render each open request as a bulleted item under an "Open Requests" heading
