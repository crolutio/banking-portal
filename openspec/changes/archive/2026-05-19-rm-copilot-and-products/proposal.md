## Why

The RM 360 view includes a Relationship Copilot, but it currently calls the same `/api/chat` endpoint built for retail customers. That route hardcodes "Sarah Chen (Demo User)" in the system prompt, includes retail-specific scenario detectors (dispute flows, spending analysis), and fetches no call center data. When an RM asks "What should I discuss with Mohammed?", the AI has the wrong persona, the wrong name, and is missing half the client's history. A dedicated RM copilot route is needed that pulls the full client picture from both databases, includes the product catalog, and responds as an advisor to the RM — not to the customer.

Additionally, there is no products page in the RM workspace. RMs need to browse the full product catalog (loans, cards, deposits, insurance, investments) so they can make informed recommendations during client conversations.

## What Changes

- New API route `/api/rm-chat` — fetches client data from both banking and call center DBs, builds an RM-specific system prompt with the client's real name, and streams responses via Gemini.
- Client 360 copilot switches from `/api/chat` to `/api/rm-chat`, removes the "Powered by the same AI as the banking assistant" description.
- New Products page at `/rm-workspace/products` showing the full catalog from the `products` table.
- Products link added to the RM sidebar navigation.

## Capabilities

### New Capabilities
- `rm-copilot`: Dedicated RM copilot API route that fetches client profile, accounts, cards, loans, transactions, risk alerts, support tickets (with full message threads), call center conversations (capped at 10 per client with messages), and the product catalog — then builds an RM-persona system prompt and streams a response.
- `rm-products-page`: Products catalog page in the RM workspace that displays all bank products from the `products` table, browsable by the RM.

### Modified Capabilities

_None — the existing `/api/chat` retail route is left untouched._

## Impact

- **New files**: `app/api/rm-chat/route.ts`, `app/(dashboard)/rm-workspace/products/page.tsx`
- **Modified files**: `app/(dashboard)/rm-workspace/[clientId]/page.tsx` (switch API endpoint, update description), `components/layout/app-shell.tsx` (add Products to RM sidebar)
- **Dependencies**: Requires `products` table in banking DB (already created via `scripts/create_products_table.sql`), call center Supabase client (`lib/supabase/call-center-client.ts`)
- **No breaking changes** — retail `/api/chat` is untouched
