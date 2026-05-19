## Context

The banking app has two Supabase projects: a banking DB (profiles, accounts, cards, loans, transactions, risk_alerts, support_tickets, support_messages, products) and a call center DB (customers, conversations, messages). The existing `/api/chat` route is an 850-line file with 15+ retail scenario detectors, hardcoded customer context, and a retail-facing persona. The RM 360 view at `/rm-workspace/[clientId]` currently uses `useChat` pointed at `/api/chat` with `userId: clientId`, which means the AI receives the client's banking data but with the wrong persona and no call center context.

The `products` table has been created in the banking DB with 20 rows covering loans, cards, deposits, insurance, and investments. The RM sidebar currently has Dashboard, Risk & Compliance, Admin Console, and Audit Log.

## Goals / Non-Goals

**Goals:**
- Dedicated `/api/rm-chat` route with RM persona that fetches from both databases
- Client name resolved dynamically from the profile (not hardcoded)
- Full support ticket threads (tickets + messages) included in the AI context
- Call center conversations capped at 10 per client, with their message threads
- Product catalog included so the AI can make specific product recommendations
- Products page in RM workspace for browsing the catalog
- Products link in RM sidebar navigation

**Non-Goals:**
- Modifying the existing `/api/chat` retail route
- Adding scenario detectors (dispute flows, spending analysis, etc.) to the RM copilot
- Real-time or streaming call center data
- Product recommendation engine or scoring — the AI reasons about fit from descriptions
- CRUD operations on products (read-only catalog)

## Decisions

### 1. Separate route vs branching in `/api/chat`
**Decision**: New `/api/rm-chat` route.
**Rationale**: The retail route is 850 lines with complex scenario detection logic. Branching would increase coupling and risk breaking the retail flow. A separate route is ~150 lines, easy to reason about, and can evolve independently.
**Alternative considered**: `if (currentPage === "/rm-workspace")` branch inside `/api/chat` — rejected due to complexity and maintenance risk.

### 2. Data fetching strategy
**Decision**: Fetch all data server-side in the API route, assemble into a single system prompt.
**Rationale**: Same pattern as `/api/chat`. The RM copilot needs a holistic view — asking follow-up questions about loans and then support history should work without re-fetching. Total token budget is manageable: profile + accounts + cards + loans + transactions(30) + risk_alerts + tickets(with messages) + conversations(10 with messages) + products(20) fits comfortably within Gemini's context window.
**Alternative considered**: Lazy-loading sections on demand — rejected because the AI needs the full picture to give good cross-domain advice ("Mohammed has a suspicious login conversation AND a business loan — discuss security posture").

### 3. Call center conversation cap
**Decision**: Fetch latest 10 conversations per client, ordered by `updated_at` desc, with all messages for each.
**Rationale**: Conversations are short (typically 4-8 messages). 10 conversations * ~6 messages = ~60 messages — modest token cost. Capping prevents edge cases where a long-time customer has dozens of old conversations.

### 4. Support ticket inclusion
**Decision**: Fetch all tickets for the client with full message threads.
**Rationale**: Tickets are fewer than conversations (typically 0-5 per customer) and thread depth is shallow. Full context lets the AI reference specific exchanges ("The agent promised stamped statements within 24 hours").

### 5. Products page architecture
**Decision**: Server-side page at `/rm-workspace/products` fetching from the `products` table. Simple card-based layout.
**Rationale**: 20 products, read-only, no filtering needed. A single Supabase query, rendered as cards with name and description. Keeps it simple.

## Risks / Trade-offs

- **Token usage**: Including full threads for tickets + 10 conversations + 20 product descriptions could approach 8-10K tokens of context. Gemini handles this fine, but costs slightly more per request than a leaner prompt. → Mitigation: Cap conversations at 10, keep product descriptions focused.
- **Call center client dependency**: If the call center Supabase project is unreachable, the RM copilot should still work with banking data only. → Mitigation: Wrap call center fetch in try/catch, proceed with empty conversations on failure.
- **Stale product catalog**: Products are static seed data. If products change in the DB, the AI sees updated info but the products page cache may lag. → Mitigation: No caching on the products page (it's a small dataset).
