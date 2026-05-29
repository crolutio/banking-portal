## 1. Database schema additions

- [x] 1.1 Author `scripts/add_market_column_banking.sql` — `ALTER TABLE` adding `market TEXT NOT NULL DEFAULT 'default'` to `profiles`, `accounts`, `cards`, `loans`, `transactions`, `support_tickets`, `support_messages`, `products`
- [x] 1.2 Add `(market)` indexes in the same script for `transactions`, `support_messages`, and `products`
- [x] 1.3 Author `scripts/add_market_column_callcenter.sql` — `ALTER TABLE` adding `market` to `customers`, `conversations`, `messages`; add `(market)` index on `messages`
- [x] 1.4 Run both scripts against their respective Supabase projects; verify all pre-existing rows now have `market = 'default'` and no row was modified beyond the column add

## 2. Kenyan seed data — banking DB

- [x] 2.1 Author `scripts/seed_kenya_profiles.sql` — insert 5 profiles (Wanjiru Kamau, Otieno Ouma, Peter Mwangi, Grace Wanjiku, Njeri Otieno) with `market = 'kenya'`, set `assigned_rm_id` on the two retail clients to Peter Mwangi's UUID
- [x] 2.2 Author `scripts/seed_kenya_accounts_cards.sql` — ~4 accounts (KES current + savings per client, plus optional USD diaspora for Wanjiru) and ~3 cards (debit + credit per client where appropriate) with `market = 'kenya'`
- [x] 2.3 Author `scripts/seed_kenya_loans.sql` — 2–3 loans for Wanjiru (mortgage on Nairobi apartment, asset finance for car, optional salary advance) and 2–3 for Otieno (SME working capital, commercial asset finance, LPO/invoice discounting facility), all KES with `market = 'kenya'`
- [x] 2.4 Author `scripts/seed_kenya_transactions.sql` — 80–120 transactions across all accounts, KES-denominated, with Kenyan merchants (Naivas, Carrefour Kenya, Java House, Uber, Bolt, KPLC, NHIF, NSSF, KRA, Shell, Rubis, M-Pesa transfers, salary credits, school fees)
- [x] 2.5 Author `scripts/seed_kenya_support.sql` — 4 tickets (2 per client) mirroring the UAE narrative beats with Kenyan-context subjects, plus ~15 messages across them
- [x] 2.6 Author `scripts/seed_kenya_products.sql` — 18–22 product rows with `market = 'kenya'` covering Accounts, Cards, Loans, Investments, Insurance/Bancassurance, Digital/Mobile; rates and minimums grounded in Kenyan market

> Plus a discovered patch: banking `customers` table needed its own `market` column and a Kenyan upsert (`patch_market_column_customers.sql`, `seed_kenya_customers_table.sql`) because production renamed `accounts.user_id → accounts.customer_id` with a FK to a separate `customers` table not represented in local migrations.

## 3. Kenyan seed data — call center DB

- [x] 3.1 Author `scripts/seed_kenya_callcenter_customers.sql` — 2 `customers` rows using the **same UUIDs** as the Kenyan retail clients' `profiles.id` from step 2.1
- [x] 3.2 Author `scripts/seed_kenya_callcenter_conversations.sql` — ~12 conversations across both customers with varied `channel` (chat, whatsapp, voice) and `sentiment` (positive, neutral, negative); subjects mirror UAE beats with Kenyan context
- [x] 3.3 Author `scripts/seed_kenya_callcenter_messages.sql` — ~60 messages across the conversations; mixed `sender_type` (user, agent, ai)

## 4. App-side market scaffolding

- [x] 4.1 Create `lib/markets.ts` — `Market` type (`'default' | 'kenya'`), `MARKETS` array, display labels, default currency per market, default locale per market
- [x] 4.2 Create `lib/market-context.tsx` — `MarketProvider` with `useState`, `localStorage` persistence under a stable key, SSR-safe hydration (read inside `useEffect`), `useMarket` hook
- [x] 4.3 Create `lib/market-filter.ts` — `byMarket(query, market)` helper that returns `query.eq('market', market)`; documented vs. ID-disambiguated reads
- [x] 4.4 Wrap `app/layout.tsx` with `<MarketProvider>` outside `<RoleProvider>` so role resolution can read the active market

## 5. Market switcher UI

- [x] 5.1 Create `components/market-switcher.tsx` — Globe icon ghost button with overlaid country flag, DropdownMenu listing available markets, calls `setMarket` on select
- [x] 5.2 Mount `<MarketSwitcher />` in `components/layout/app-shell.tsx` header between `<NotificationBell />` and `<ThemeToggle />`; only renders for RM/R&C/Admin roles so customer demos stay clean

## 6. Identity resolution becomes market-aware

- [x] 6.1 Extend `lib/customer-ids.ts` with a new `PERSONA_IDS[market][role]` structure and `getPersonaId(market, role)` helper; kept legacy `CUSTOMER_IDS` map populated from it for back-compat (now includes Kenyan personas by display name too)
- [x] 6.2 Update `lib/role-context.tsx` to consume `useMarket()` and resolve `currentBankingUserId` (and new `currentCallCenterUserId`) and `currentUser` as a function of `(market, role)` via `PERSONA_IDS`
- [x] 6.3 `availableRoles` now enumerates the active market's persona pool via `resolveUser(market, role)`; 5 Kenyan personas added to `lib/mock-data.ts` so the role-switcher dropdown can render them

## 7. Currency formatting reads market context

- [x] 7.1 `lib/format.ts` formatters (`formatCurrency`, `formatNumber`, `formatDate`, `formatDateTime`) now accept an optional `locale`; `lib/market-context.tsx` exports market-bound hooks (`useFormatCurrency`, `useFormatNumber`, `useFormatDate`, `useFormatDateTime`) for React callsites
- [x] 7.2 RM 360 page metric tiles (Total Balance, Liabilities, Inflow, Outflow), per-account / per-loan / per-card / per-txn rows, and RM dashboard AUM tile all migrated to `useFormatCurrency()` — they now render KES when active market is Kenya

## 8. Persona/dataset reads go through `byMarket`

- [x] 8.1 Audited every `.from('<market-scoped-table>')` callsite across `app/`, `components/`, `lib/`; categorized — only RM `from("profiles")` and `from("products")` list-reads are true cross-customer enumerations needing market filter, all other reads are ID-disambiguated (scoped by `customer_id`/`user_id`/`account_id`/`conversation_id` → safe via parent scoping)
- [x] 8.2 List-reads now piped through `byMarket()`:
  - `app/(dashboard)/rm-workspace/page.tsx` — RM client list
  - `components/dashboards/rm-dashboard.tsx` — sister RM dashboard component
  - `app/(dashboard)/rm-workspace/products/page.tsx` — product catalog
  - `app/api/rm-portfolio-pulse/route.ts` — server-side RM client enumeration
  Also added `usdToHomeRate` to `MARKET_CONFIG` so portfolio AUM rollups use the correct FX rate per market (3.67 AED/USD, 130 KES/USD), and switched RM/360 currency tiles to `useFormatCurrency()` so they render KES when the active market is Kenya.
- [x] 8.3 Re-audited — no list-read remains unscoped on a market-bound table.

## 11. Products page market filter

- [x] 11.1 `app/(dashboard)/rm-workspace/products/page.tsx` now fetches with `byMarket(...)` and re-fetches when the market changes

## 9. AI routes accept and apply market context

- [x] 9.1 Created `lib/ai/market-context.ts` — `buildMarketContext(market)` (RM-side, full block) and `buildLightMarketContext(market)` (customer-side, terser). Both expand currency/locale/payment rails (M-Pesa, PesaLink, etc. for Kenya; Apple Pay/SWIFT/IBAN etc. for UAE), common merchants (Naivas, KPLC, KRA for Kenya; Carrefour, DEWA, Etisalat for UAE), and regulatory references (CBK + KRA + NSSF for Kenya; CBUAE + Emirates ID + WPS for UAE) into a prompt-ready block that is prepended to every system prompt.
- [x] 9.2 `app/api/rm-briefing/route.ts` — accepts `market` from body (defaults to `'default'`), scopes the product catalog read via `.eq("market", market)`, uses the market's `usdToHomeRate` for USD→home FX, swaps the hardcoded "AED" line for `${marketCfg.currency}`, and prepends `buildMarketContext(market)` to the system prompt. ID-disambiguated reads (accounts/cards/loans/tickets/etc. by `customer_id`/`user_id`) are documented as safe without an explicit market filter.
- [x] 9.3 `app/api/rm-chat/route.ts` — same treatment. Reads `market` from body, market-scopes the product catalog, swaps the FX rate and the "AED" lines, drops the hardcoded `Format currency as AED` guideline (now delegated to the prepended market block), and prepends the full RM-side context.
- [x] 9.4 `app/api/rm-portfolio-pulse/route.ts` — accepts `market` from body, scopes `from("profiles")` to `(assigned_rm_id, market)`, uses market-aware USD→home FX rate, injects market context into Claude prompts, includes Kenya RM fallback items
- [x] 9.5 `app/api/rm-draft-outreach/route.ts` — accepts `market` from body, market-aware FX for the `total balance` line, drops the hardcoded AED rule, prepends `buildMarketContext(market)` to the system prompt.
- [x] 9.6 `app/api/chat/route.ts` (customer-facing Gemini) — accepts `market` from body, uses the market's `usdToHomeRate` for both `totalBalance` and `availableCash`, drops the hardcoded `Format currency as AED` guideline, and prepends `buildLightMarketContext(market)` to the system prompt. Scenario-enhancement strings (loan + travel "Strategist", loan pre-approval, etc.) still embed `AED` literally — they are factually-driven narratives based on UAE-shaped data, and switching them is out of scope for this change.

## 10. Client components forward `market` to AI routes

- [x] 10.1 `components/rm/client-briefing-panel.tsx` — now reads `market` from `useMarket()`, includes it in the POST body, and the briefing `localStorage` cache key is namespaced by market via `lib/rm/briefing-cache.ts` so a UAE briefing for clientId X never collides with a Kenya briefing for clientId X. The default-market key omits the suffix so pre-migration cached entries remain readable. Workspace dashboard (`app/(dashboard)/rm-workspace/page.tsx`) reader updated to pass `market` to `readCachedBriefing`.
- [x] 10.2 360 page Copilot `useChat` now includes `market` in its `body` so each turn carries it (route consumer is wired in Batch 6 9.3)
- [x] 10.3 `components/rm/portfolio-pulse-row.tsx` now includes `market` in POST body and re-fetches when market changes
- [x] 10.4 `components/rm/outreach-dialog.tsx` — now reads `market` via `useMarket()` and includes it in the streamed draft request body; `generate` re-runs when market changes.
- [x] 10.5 Customer-facing chat invocations forward `market`:
  - `components/ai/floating-chat-bubble.tsx` — `useChat` body now includes `market`
  - `components/ai/ai-banker-chat-interface.tsx` — `useChat` body now includes `market`
  - Note: `lib/supportApi.ts` server-side fallback POST to `/api/chat` from the call center support flow is intentionally left market-less for now; it defaults to `'default'` server-side. The call center support bot path is a secondary surface; revisit only if a Kenyan support flow needs a hard-isolated bot.

## 11. Products page market filter

- [x] 11.1 `app/(dashboard)/rm-workspace/products/page.tsx` now fetches with `byMarket(...)` and re-fetches when the market changes

## 12. End-to-end verification

- [ ] 12.1 Default flow: load app fresh → market resolves to `default` → role-switch through all 4 roles → confirm UAE personas + data render identically to pre-change baseline
- [ ] 12.2 Kenya flow: switch market to Kenya → reload page → confirm market choice persisted from `localStorage` → role-switch through all 4 roles → confirm Kenyan personas resolve and Kenyan data renders
- [ ] 12.3 AI surfaces in Kenya: click Pulse card → 360 page → AI Briefing renders with Kenyan narrative and KES amounts → Copilot fires a starter prompt → response uses Kenyan context → Draft Outreach → WhatsApp + Warm → message references KES + Kenyan locale
- [ ] 12.4 Cross-market isolation: with `kenya` active, attempt to navigate to a UAE client UUID directly via URL → confirm 360 page renders (ID-disambiguated read returns the row) but stats/format default to KES; confirm `/rm-workspace` list shows zero UAE clients
- [ ] 12.5 Switcher subtlety check: load any customer page → confirm market switcher is visually quiet next to theme switcher; tooltip on hover reveals "Switch market"
- [x] 12.6 `npx tsc --noEmit` exits 0 across the project. The repo's `npm run lint` script targets ESLint but ESLint is not a dependency, so per-file IDE lints (the actual lint config in use) were swept across every touched file in Batches 1–7 — all clean.

## 13. Documentation

- [x] 13.1 Added a "Multi-Market Demo Mode (UAE / Kenya)" section near the top of `docs/DEMO_GUIDE.md` describing: where the market switcher lives (header, between bell + theme toggle, RM/R&C/Admin roles only), the `localStorage` key (`banking-agent-active-market`), the persona table per `(market, role)`, the full ordered list of seed scripts for both DBs (including the discovered `customers`-table patch + a Kenya-only cleanup snippet), and a 7-step suggested Kenya demo flow.
- [x] 13.2 Same section spells out that the portal defaults to UAE on a fresh browser, that the Kenya choice persists in `localStorage` across reloads/role-switches, and how to reset (clear the key or pick "Default (UAE)" in the switcher).

## 14. Archive

- [ ] 14.1 Once all tasks above are verified, archive this change with `openspec archive add-multi-market-demo-mode`
