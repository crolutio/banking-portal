## ADDED Requirements

### Requirement: RM copilot API route exists
The system SHALL expose a POST endpoint at `/api/rm-chat` that accepts `{ messages, userId, currentPage }` and returns a streamed AI response using the Gemini model.

#### Scenario: RM sends a question about a client
- **WHEN** the RM copilot receives a POST with `userId` set to a client ID and a user message
- **THEN** the system SHALL return a streamed Gemini response using an RM-specific system prompt

#### Scenario: Missing API key
- **WHEN** the `GOOGLE_GENERATIVE_AI_API_KEY` environment variable is not set
- **THEN** the system SHALL return HTTP 500 with an error message

### Requirement: Client profile resolved dynamically
The system SHALL fetch the client's profile from the `profiles` table using the provided `userId` and include the client's actual `full_name` in the system prompt. The system SHALL NOT hardcode any customer name.

#### Scenario: Valid client ID
- **WHEN** `userId` matches a profile in the banking DB
- **THEN** the system prompt SHALL reference the client by their `full_name` from the profile

#### Scenario: Unknown client ID
- **WHEN** `userId` does not match any profile
- **THEN** the system SHALL return a response indicating the client was not found

### Requirement: Banking data included in context
The system SHALL fetch the following from the banking DB for the given `userId`: accounts, cards, loans, transactions (last 30 via account IDs), risk_alerts, support_tickets, and support_messages for each ticket. All data SHALL be included in the system prompt.

#### Scenario: Client with full banking data
- **WHEN** the client has accounts, cards, loans, transactions, risk alerts, and support tickets
- **THEN** all data categories SHALL appear in the system prompt sent to Gemini

#### Scenario: Client with no banking data
- **WHEN** the client has no accounts, cards, loans, or tickets
- **THEN** the system prompt SHALL indicate empty/zero counts for each category and the AI SHALL still respond

### Requirement: Support tickets include full message threads
The system SHALL fetch all `support_tickets` for the client and for each ticket, fetch all `support_messages` ordered by `created_at` ascending. The full thread SHALL be included in the system prompt.

#### Scenario: Ticket with messages
- **WHEN** a client has a support ticket with 4 messages
- **THEN** all 4 messages (with sender_type, content, created_at) SHALL appear in the system prompt under that ticket

### Requirement: Call center conversations included with cap
The system SHALL fetch conversations from the call center DB for the given `userId` (as `customer_id`), ordered by `updated_at` descending, limited to 10. For each conversation, the system SHALL fetch all messages ordered by `created_at` ascending.

#### Scenario: Client with 15 conversations
- **WHEN** the client has 15 conversations in the call center DB
- **THEN** only the 10 most recently updated conversations (with their messages) SHALL be included

#### Scenario: Call center DB unreachable
- **WHEN** the call center Supabase client fails to connect or returns an error
- **THEN** the system SHALL proceed with empty conversations and still return a response using banking data only

### Requirement: Product catalog included in context
The system SHALL fetch all rows from the `products` table and include them in the system prompt so the AI can reference specific products, rates, and features when making recommendations.

#### Scenario: Products available
- **WHEN** the products table has 20 rows
- **THEN** all 20 products (name and description) SHALL appear in the system prompt

### Requirement: RM persona in system prompt
The system prompt SHALL instruct the AI to act as an intelligent advisor to the relationship manager — not as a customer-facing chatbot. The tone SHALL be professional, analytical, and action-oriented. The AI SHALL reference specific data points when making recommendations.

#### Scenario: RM asks what to discuss with a client
- **WHEN** the RM asks "What should I discuss first with this customer?"
- **THEN** the AI SHALL reference actual client data (balances, loans, alerts, support history) and suggest specific discussion points

#### Scenario: RM asks for product recommendation
- **WHEN** the RM asks "What product should I recommend?"
- **THEN** the AI SHALL reference the product catalog and the client's financial profile to recommend specific products by name with rationale

### Requirement: Client 360 page uses RM copilot
The client 360 page at `/rm-workspace/[clientId]` SHALL use `/api/rm-chat` instead of `/api/chat`. The copilot description SHALL NOT mention that it is the same AI as the banking assistant.

#### Scenario: RM opens client 360
- **WHEN** the RM navigates to `/rm-workspace/[clientId]`
- **THEN** the copilot section SHALL use the `/api/rm-chat` endpoint and display a description appropriate for an RM tool
