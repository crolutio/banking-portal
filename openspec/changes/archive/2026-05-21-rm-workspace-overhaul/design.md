## Context

The RM workspace currently renders a 360 customer detail view as the landing page, built entirely on mock data from `lib/mock-data.ts`. The sidebar shows the same customer-facing navigation (Accounts, Cards, Loans…) regardless of role. The existing `/api/chat` route already fetches all banking data for a given userId and streams AI responses via Gemini — this backend needs no changes, just different callers.

Two database connections exist: banking DB (profiles, accounts, cards, loans, transactions, risk_alerts, support_tickets) and call center DB (conversations, messages). RLS policies already grant RM access to their assigned clients' data in the banking DB.

The current `rm-dashboard.tsx` component already fetches assigned clients from the banking DB via `profiles.assigned_rm_id` — its logic can be reused for Level 1.

## Goals / Non-Goals

**Goals:**
- RM lands on a dashboard showing their assigned clients, portfolio AUM, alerts, and actions — all from the banking DB.
- Clicking a client navigates to `/rm-workspace/[clientId]` for a full 360 view with real DB data from both banking and call center databases.
- The copilot on the 360 page uses the same `/api/chat` Gemini backend as the floating chat bubble, scoped to the selected client.
- The sidebar swaps to RM-specific navigation when the role is `relationship_manager`.

**Non-Goals:**
- Building a full CRM system (no client assignment, notes, or interaction logging).
- Real-time push updates (data is fetched on page load, no subscriptions).
- Separate pages for Alerts, Schedule, or Tasks — these are sections on the Level 1 dashboard.
- Changes to the `/api/chat` backend itself.
- Authentication changes or new RLS policies.

## Decisions

### 1. Single-page dashboard (Level 1) with sections, not separate routes

**Decision**: RM sidebar items (Dashboard, My Clients, Alerts, Schedule) are sections on the single `/rm-workspace` page rather than separate routes.

**Rationale**: Reduces implementation scope significantly. For a demo, scrolling to sections is sufficient. Deep-linking to sections can be added later with anchor links if needed.

**Alternative considered**: Separate routes (`/rm-workspace/alerts`, `/rm-workspace/schedule`). Rejected as over-engineering for demo scope.

### 2. Dynamic route for client 360: `/rm-workspace/[clientId]`

**Decision**: Use Next.js dynamic route `app/(dashboard)/rm-workspace/[clientId]/page.tsx`.

**Rationale**: Clean URL structure, supports deep-linking to a specific client, follows Next.js App Router conventions. The `[clientId]` is the profile UUID from the banking DB.

**Alternative considered**: State-driven on single page (Option A from exploration). Rejected because it prevents sharing/bookmarking a client view and makes the component unnecessarily complex.

### 3. Copilot uses existing `/api/chat` with client's userId

**Decision**: The 360 page's copilot calls `useChat({ api: "/api/chat" })` passing `body: { userId: clientId, currentPage: "/rm-workspace" }`.

**Rationale**: The `/api/chat` route already fetches all banking data for a given userId and builds a comprehensive Gemini prompt. Zero backend changes needed. The RM gets the same AI quality as the customer-facing chat.

**Alternative considered**: Building a separate RM-specific chat API. Rejected — unnecessary duplication, and the existing route already handles the RM page context.

### 4. Call center data fetched server-side in the 360 page component

**Decision**: The 360 page creates a call center Supabase client and fetches conversations + messages for the client directly in the component (client-side fetch in useEffect).

**Rationale**: Keeps the call center integration contained to one component. The call center client singleton already exists in `lib/supabase/call-center-client.ts`.

### 5. Sidebar swap via role check in app-shell.tsx

**Decision**: Define a separate `rmNavItems` array in `app-shell.tsx`. The Sidebar component checks `currentRole` and renders the appropriate nav items.

**Rationale**: Minimal change to existing architecture. The role context is already available in the sidebar. No new providers or context needed.

## Risks / Trade-offs

- **[RLS may block queries]** → The app uses the anon key (not authenticated as the RM user), so RLS policies for "RMs can view client X" won't actually be enforced. Mitigation: Use `createDirectClient()` (service role) for server-side fetches, or accept that the demo uses the anon key with permissive policies. For demo purposes, this is acceptable.

- **[Column naming inconsistency]** → Some tables use `user_id`, others use `customer_id` for the same FK to profiles. Mitigation: Query each table with its actual column name (already mapped from prior investigation).

- **[Call center data may be sparse]** → Mohammed Ali's call center data was seeded but may not fully match the demo storyline. Mitigation: The 360 view gracefully shows "No conversations found" when data is missing.

- **[Mock data removal]** → Removing mock data dependency means the RM workspace only works when the DB is seeded. Mitigation: The DB is already seeded for the demo; add loading states and empty states for robustness.
