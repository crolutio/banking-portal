## Why

Today the demo dataset is single-market (UAE: AED, English Gulf naming, UAE-style merchants and tickets). When demoing to a Kenyan audience the gap is immediately visible — currency labels, merchant names, ticket subjects ("London trip", "Dubai branch") and the persona pool all read as foreign. Trying to "rename on the fly" was attempted previously and rejected because the transactions, merchants, and conversation content stay UAE-shaped regardless of name changes — the *data* has to differ, not just the labels.

We need to be able to live-switch the entire app between two grounded datasets (UAE today, Kenya new) from the top bar, without rebuilding the project, restarting servers, or maintaining two codebases. The same demo flow must work in either market — same beats, same AI surfaces, same product catalog *shape* — just with locally authentic content.

## What Changes

### New: market dimension across all dataset tables

- Add `market TEXT NOT NULL DEFAULT 'default'` to every persona/dataset table in both DBs:
  - **Banking DB**: `profiles`, `accounts`, `cards`, `loans`, `transactions`, `support_tickets`, `support_messages`, `products`
  - **Call center DB**: `customers`, `conversations`, `messages`
- Existing rows backfill to `market = 'default'` so the current demo is unaffected.
- Index on `(market)` for the hot tables (`transactions`, `messages`, `support_messages`).

### New: Kenyan dataset (demo-minimum)

- **5 Kenyan profiles** (parallel to UAE): Wanjiru Kamau (Premium retail, mortgaged urban professional, regional traveller — mirrors Sarah Chen); Otieno Ouma (SME owner in imports/distribution, working-capital + asset-finance leveraged — mirrors Mohammed Ali); Peter Mwangi (RM, assigned to both Kenyan clients); Grace Wanjiku (Risk & Compliance); Njeri Otieno (System Admin).
- **~4 accounts, ~3 cards, ~5 loans** spread across the 2 Kenyan retail clients. Loans are persona-shaped: Wanjiru gets a mortgage + asset finance (car) + optional salary advance; Otieno gets SME working capital + commercial asset finance + LPO/invoice discounting.
- **~80–120 transactions** total, denominated in KES, with Kenyan merchants (Naivas, Carrefour Kenya, Java House, Uber, M-Pesa transfers, KPLC, NHIF, KRA, Shell/Rubis, school fees).
- **4 support tickets + ~15 messages** mirroring the narrative beats of the UAE personas (card blocked while travelling → "blocked in Kigali"; business statement for visa → "SME loan statement for tender").
- **~12 call-center conversations + ~60 messages** with Kenyan-context subjects and varied channels/sentiment.
- **~18–22 Kenyan products** spanning all existing catalog categories (Accounts, Cards, Loans, Investments, Insurance/Bancassurance, Digital/Mobile) with rates and naming grounded in the Kenyan market.

### New: market switcher + context

- New React context (`MarketContext`) holding `currentMarket: 'default' | 'kenya'`, with state persisted to `localStorage` so refresh survives.
- New icon-only header control next to the existing theme switcher — globe/languages lucide icon, no visible label, opens a dropdown with two options (UAE · Kenya). Deliberately styled to recede into existing header chrome so the audience doesn't notice it unless directed to.
- Switching market triggers a context update; all data-fetching components re-fetch under the new market filter.

### New: per-market identity resolution

- `lib/customer-ids.ts` restructured into a `{ market → { personaKey → uuid } }` shape.
- `lib/role-context.tsx` resolves the active user as a function of `(currentMarket, currentRole)`. Flipping market changes which UUID each role maps to (e.g., RM resolves to James in `default`, Peter in `kenya`).

### New: market-aware query helper

- Small `lib/supabase/market-query.ts` wrapper that auto-injects `.eq('market', currentMarket)` for table reads. All persona/dataset reads route through it. ID-disambiguated reads (e.g., `where id = <clientId>`) don't need market filtering because the UUID itself determines market.

### Modified: AI prompts gain market context

- `/api/rm-briefing`, `/api/rm-chat`, `/api/rm-portfolio-pulse`, `/api/rm-draft-outreach`, and `/api/chat` each accept a `market` field in the body and inject a small `MARKET CONTEXT` block into their Claude/Gemini system prompts: bank locale, currency, dominant payment rails (M-Pesa for Kenya), common merchants, tax/regulatory references (KRA/NHIF for Kenya). The product catalog passed into prompts is filtered by market so AI recommendations stay coherent with the visible catalog.

### Modified: currency + locale

- `lib/format.ts` reads default currency from market context (`AED` for default, `KES` for kenya). Per-row currency overrides still win (USD accounts continue to render as USD).

## Capabilities

### New Capabilities

- `multi-market-demo`: Live market switching across the demo dataset. Adds a `market` dimension to dataset tables, a `MarketContext` for the active selection, a header switcher control, and a market-aware query helper that scopes all dataset reads.
- `kenyan-demo-dataset`: A second, parallel demo dataset (5 personas, accounts, cards, loans, transactions, support, conversations, products) themed for the Kenyan market and tagged `market = 'kenya'`.

### Modified Capabilities

- `rm-ai-briefing`: Briefing API accepts and applies `market`; AI prompts gain a MARKET CONTEXT block and a market-filtered product catalog; conversation digest sources from market-scoped call-center data.
- `rm-product-catalog-visual`: Product catalog page filters by `currentMarket`; displays the Kenyan catalog when `kenya` is active.
- `rm-portfolio-pulse`: Cohort scan is scoped to the RM's assigned clients within the active market; reasons reference market-appropriate signals.
- `rm-outreach-drafting`: Draft Outreach API accepts `market` and grounds the generated message in market-appropriate context (locale, salutation conventions, channel norms — e.g., WhatsApp dominance for Kenya).
- `rm-client-360`: All sub-fetches (accounts, cards, loans, transactions, tickets) scoped by `clientId`, which itself belongs to one market; market-aware formatting for currency.
- `rm-dashboard`: My Clients, stats, and Portfolio Pulse all scoped to the market-aware RM identity; switching market while logged in as RM swaps the RM identity and reloads the assigned client list.
- `rm-copilot`: Copilot API accepts `market`; system prompt and any product references gain market context.

## Impact

- **New files**:
  - `lib/markets.ts` (single source of truth for the market enum, labels, default currency per market)
  - `lib/market-context.tsx` (React context provider + hook + `localStorage` persistence)
  - `lib/supabase/market-query.ts` (thin helper that wraps Supabase table reads to auto-inject `.eq('market', m)`)
  - `components/layout/market-switcher.tsx` (icon-only header control)
  - SQL: `scripts/add_market_column_banking.sql`, `scripts/add_market_column_callcenter.sql`
  - SQL seeds (banking): `scripts/seed_kenya_profiles.sql`, `seed_kenya_accounts_cards.sql`, `seed_kenya_loans.sql`, `seed_kenya_transactions.sql`, `seed_kenya_support.sql`, `seed_kenya_products.sql`
  - SQL seeds (call center): `scripts/seed_kenya_callcenter_customers.sql`, `seed_kenya_callcenter_conversations.sql`, `seed_kenya_callcenter_messages.sql`
- **Modified files**:
  - `app/layout.tsx` (mount `MarketProvider` outside `RoleProvider`)
  - `lib/customer-ids.ts` (restructure to `{ market: { personaKey: uuid } }`)
  - `lib/role-context.tsx` (resolve banking + call-center user IDs as a function of `(currentMarket, currentRole)`)
  - `lib/format.ts` (default currency from market context)
  - `components/layout/app-shell.tsx` (mount `<MarketSwitcher />` in header next to theme switcher)
  - All persona/dataset Supabase reads in `app/(dashboard)/**` and supporting components (route through `market-query` helper)
  - `app/api/rm-briefing/route.ts`, `app/api/rm-chat/route.ts`, `app/api/rm-portfolio-pulse/route.ts`, `app/api/rm-draft-outreach/route.ts`, `app/api/chat/route.ts` (accept `market`, inject MARKET CONTEXT block, filter product catalog passed into prompts)
  - `app/(dashboard)/rm-workspace/products/page.tsx` (market filter)
- **DB changes**: schema additions described above (additive only, all existing data defaults to `default`). No destructive changes. Two databases affected (banking + call center).
- **Dependencies**: None new. Uses existing React context, `localStorage`, `lucide-react` icons, existing Supabase clients.
- **No breaking changes** to existing demos — the UAE flow continues to work identically when `market = 'default'` (the load-time default).
