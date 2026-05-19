## Why

The RM workspace currently skips the relationship manager's own context and dumps them directly into a customer detail view built on mock data. An RM landing on `/rm-workspace` should see **their world** — assigned clients, portfolio stats, alerts, and next best actions — then drill into any client for a full 360 view powered by real database data. The sidebar also shows customer-facing navigation (Accounts, Cards, Loans…) regardless of role, which is irrelevant when logged in as an RM.

## What Changes

- Replace the RM workspace landing page with an RM-centric dashboard showing assigned clients (from DB), portfolio AUM, at-risk clients, and aggregated next-best-actions.
- Add a new dynamic route `/rm-workspace/[clientId]` for the client 360 view, fetching all data from the banking DB (accounts, cards, loans, transactions, risk alerts, support tickets) and call center DB (conversations, messages).
- Wire the Relationship Copilot to the existing `/api/chat` backend (Gemini) by passing the selected client's userId, replacing hardcoded mock responses.
- Make the sidebar role-aware: when the current role is `relationship_manager`, replace customer-facing nav items with RM-specific items (Dashboard, My Clients, Alerts, Schedule).
- Remove dependency on `lib/mock-data.ts` for the RM workspace; all data comes from the database.

## Capabilities

### New Capabilities
- `rm-sidebar`: Role-aware sidebar that swaps navigation items when the user is a relationship manager.
- `rm-dashboard`: RM landing page showing assigned client list, portfolio stats, alerts, and next-best-actions from the banking DB.
- `rm-client-360`: Per-client 360 view at `/rm-workspace/[clientId]` pulling accounts, cards, loans, transactions, risk alerts, support tickets from banking DB and conversations from call center DB.
- `rm-copilot`: Relationship Copilot wired to `/api/chat` with the client's userId for real AI-powered answers about any client.

### Modified Capabilities

## Impact

- **Files modified**: `components/layout/app-shell.tsx` (sidebar), `app/(dashboard)/rm-workspace/page.tsx` (dashboard)
- **Files created**: `app/(dashboard)/rm-workspace/[clientId]/page.tsx` (360 route)
- **APIs used**: `/api/chat` (existing, no changes — just called with different userId), banking Supabase client, call center Supabase client
- **Dependencies**: No new packages. Uses existing `@supabase/supabase-js`, `ai` SDK's `useChat`, Gemini via `/api/chat`.
- **Data**: Requires clients assigned to the RM in `profiles.assigned_rm_id`. Existing seeded data for Sarah Chen and Mohammed Ali should work.
