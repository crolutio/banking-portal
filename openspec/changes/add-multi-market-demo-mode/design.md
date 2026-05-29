## Context

The current demo runs on a single seeded dataset (UAE personas, AED-denominated, English-Gulf naming, UAE merchants and ticket subjects) split across two Supabase projects — a banking DB (`profiles`, `accounts`, `cards`, `loans`, `transactions`, `support_tickets`, `support_messages`, `products`) and a call-center DB (`customers`, `conversations`, `messages`). Persona identities are mapped in `lib/customer-ids.ts` as a flat `name → uuid` record, and the active user per role is selected by `lib/role-context.tsx` via two parallel `Record<UserRole, string>` maps (banking + call center).

All persona reads in the app are done directly against the Supabase client (`createClient().from('x').select('...').eq('customer_id', currentBankingUserId)` style). AI surfaces (`/api/rm-briefing`, `/api/rm-chat`, `/api/rm-portfolio-pulse`, `/api/rm-draft-outreach`, `/api/chat`) hydrate the same Supabase data and pass it to Claude (RM-side) or Gemini (customer-side) with system prompts that implicitly assume UAE context.

A prior attempt to "rename on the fly" (Sarah Chen → Amina Odhiambo) without changing the underlying data was rejected because transactions, merchants, ticket subjects, and conversation content remained UAE-shaped. The demo audience could tell.

## Goals / Non-Goals

**Goals:**

- Allow a presenter to switch the entire demo dataset between UAE and Kenya from the top bar in one click, with no rebuild and no server restart.
- Keep the UAE flow byte-for-byte identical when `market = 'default'` (the load-time default), so existing demos and screenshots don't regress.
- Make the dataset isolation enforceable at the query layer (forgetting the filter should be a discoverable mistake, not a silent data-leak between markets).
- Make adding a third market a matter of seeding data + adding an enum value, not refactoring the app.
- Keep the switcher control deliberately quiet — visible to the presenter, invisible to a casual audience scanning the UI.

**Non-Goals:**

- Production-grade tenant isolation. This is a demo dataset and a demo control. We are not building Postgres RLS, JWT-encoded market claims, audit trails, or any of the safety mechanics a real multi-tenant SaaS would need.
- Cross-market persona linkage (e.g., "the same person in two markets"). Personas are fully parallel rows with no linkage.
- Localizing the *app chrome* (no Swahili UI strings, no RTL flip, no time-zone-aware rendering). Only the dataset and AI prompt context change.
- Currency conversion. AED accounts stay AED, KES accounts stay KES, USD accounts stay USD. We do not auto-convert balances between markets.
- Per-market app-shell theming (different colors, logos, fonts per market). The brand chrome stays the same; only the data underneath changes.

## Decisions

### 1. Dataset isolation: `market` column on every persona table

Chosen over (a) parallel tables per market (`profiles_ke`, `accounts_ke`, …), (b) separate Supabase projects, and (c) display-layer aliasing.

- **Why not parallel tables**: schema migrations multiply by N, app code branches on table name at every read site, joins fragment, adding a third market is a code change rather than a data change.
- **Why not separate projects**: doubles Supabase cost, doubles ops burden, requires keeping schemas in sync, and is wildly out of proportion for a demo dataset.
- **Why not display-layer aliasing**: we already tried it. Transactions, merchants, and ticket subjects remain UAE-shaped no matter how you rename the persona.
- **Why a column wins**: single schema, joins stay natural, queries gain one `.eq('market', m)` clause, indexing on `(market)` keeps reads cheap, third-market expansion is a seed script + enum addition.

### 2. Filter enforcement: app-layer helper, not Postgres RLS

A small `marketScoped(table)` helper that auto-injects `.eq('market', currentMarket)` for persona reads. Forgotten filters are catchable in code review and via a one-shot `rg "\.from\(['\"]profiles['\"]\)" app/` audit.

- **Why not RLS**: requires session variables (`SET LOCAL app.market = '...'`) round-tripped on every request, Supabase RLS policies authored and maintained per table, and adds genuine debugging friction. The protection it buys is worth a lot in production multi-tenant but worth nothing in a demo where the only "tenant" boundary is "which dropdown the presenter clicked."
- **Trade-off accepted**: if a future engineer adds a new Supabase read without using the helper, it could leak across markets. The mitigation is convention (helper exists, used everywhere) plus the small surface area (only ~10–15 read sites across the app today).

### 3. ID-disambiguated reads skip the market filter

Reads of the form `.eq('id', clientId)` or `.eq('customer_id', clientId)` where `clientId` is itself a market-bound UUID don't need an extra `.eq('market', m)`. The UUID carries the market binding. Adding a redundant market filter would force the caller to know which market the ID belongs to, which defeats the point of opaque UUIDs.

The helper is therefore only applied to "list reads" — `select('*').eq('assigned_rm_id', rmId)`, `select('*')` on `profiles` to enumerate, product catalog browsing, etc.

### 4. Product catalog: full duplication per market, not `market = NULL` for shared

Each product belongs to exactly one market. Treasury Bills appears twice — `(market='default', rate_pct=5)` and `(market='kenya', rate_pct=17)` — even though "T-Bills" as a concept is universal.

- **Why not NULL-means-shared**: queries become `.or('market.eq.kenya,market.is.null')`, which is harder to read and harder to reason about for AI prompt construction (which catalog does Claude see?). Per-market rates would also need runtime selection.
- **Why duplication wins**: same product *concept* but different tagline, rate, minimum, and key features per market — and that per-market styling is actually a demo asset, not a maintenance burden. 28 + ~20 = ~48 rows total; cost is negligible.

### 5. Persona linkage: fully parallel, no cross-market FK

Sarah Chen (`default`) and Wanjiru Kamau (`kenya`) are unrelated rows with unrelated UUIDs. No `persona_link_id`, no "same persona, different market" affordance.

- **Considered**: adding `persona_link UUID` on `profiles` so the system "knows" Sarah and Wanjiru are mirror personas. Rejected as YAGNI — there's no current UX requirement that benefits from knowing the linkage, and the linkage would muddy the data model.

### 6. Cross-DB ID convention preserved

A Kenyan client has the same UUID in `profiles.id` (banking) and `customers.id` (call center), matching the existing convention used by Sarah and Mohammed. Seed scripts allocate the UUIDs first and use them in both DBs.

- **Why**: every conversation-fetching path today does `.eq('customer_id', clientId)` against the call-center DB using the banking `profiles.id`. Changing this would force a translation layer everywhere for zero gain.

### 7. Market identity: `(market, role) → uuid` resolution

`lib/customer-ids.ts` restructures from `{ "Sarah Chen": "uuid" }` to:

```ts
{
  default: { customer_a: "uuid", customer_b: "uuid", rm: "uuid", risk: "uuid", admin: "uuid" },
  kenya:   { customer_a: "uuid", customer_b: "uuid", rm: "uuid", risk: "uuid", admin: "uuid" },
}
```

`lib/role-context.tsx` then resolves the active user as `IDS[currentMarket][currentRole]`. Flipping the market swaps the resolved UUID for the same role, so the RM, R&C, and Admin personas all become Kenyan when `market = 'kenya'`. This keeps the role switcher's mental model intact (you're switching between *roles*, not between *people*) while letting the market dropdown swap the underlying identities.

### 8. Persistence: `localStorage`, not session-only and not URL-encoded

- Survives reload (important — presenters reload pages mid-demo).
- Survives navigation.
- Not URL-encoded so screenshots and shared links don't accidentally leak the market choice.
- Initial render reads from `localStorage` with `'default'` fallback. (SSR-safe: the provider is `"use client"` and reads `localStorage` only inside a `useEffect`-gated initial sync, then triggers a single re-render. Until the sync completes the app renders against `'default'`, which matches the legacy single-market behavior and won't cause hydration mismatches.)

### 9. Switcher placement: header icon button next to theme switcher

The market switcher mounts in the header right cluster, immediately left of the existing theme switcher, as a `variant="ghost" size="icon"` button with a `Languages` (or `Globe`) lucide icon. No visible text label. `sr-only` text "Switch market" for accessibility. Dropdown opens to two items, each with a small flag emoji + country code + market name.

- Visually indistinguishable from incidental tooling. A retail customer in the demo flow won't ask about it.
- Co-located with the theme switcher — the demoer's eye learns the pattern once.
- Dropdown is the dominant UX surface, not the trigger, so misclicks are recoverable.

### 10. AI prompt market context: per-request injection, not separate routes

The five AI routes accept an optional `market` field. They inject a `MARKET CONTEXT` block into their system prompts:

```
MARKET CONTEXT
==============
Bank locale: Kenya (UAE for 'default')
Currency: KES (AED for 'default')
Dominant P2P rail: M-Pesa (cards/IBAN for 'default')
Common merchants: Naivas, Carrefour, Java House, Uber, KPLC, NHIF, KRA
Regulatory references: KRA tax, NHIF, NSSF (vs. UAE: DEWA, FAB, Etisalat)
```

The product catalog passed into the prompts is also market-filtered, so when Claude is asked to suggest products it draws from the Kenyan catalog when the active market is Kenya.

- **Why not separate routes**: would double the API surface area, double the surface area for prompt drift, and provide no benefit beyond the one `if market == 'kenya'` branch the per-request approach uses.

### 11. Currency formatting: per-row override stays authoritative

`formatCurrency(amount, currency)` continues to honor the explicit currency arg (per-account, per-transaction). The market default only applies when no explicit currency is provided.

- A USD diaspora account in Kenya market still renders as `USD 5,000`, not `KES 5,000`. This is correct — the account is in dollars.

## Risks / Trade-offs

- **[Cross-market data leakage via forgotten `.eq('market', …)`]** → Mitigation: the `marketScoped()` helper exists and is used consistently; a one-shot `rg "from\(['\"](profiles|accounts|cards|loans|transactions|support_tickets|products|customers|conversations|messages)['\"]\)" app/` audit during code review catches stragglers. Acceptable risk because the only consequence is a demo showing the wrong dataset, not a real privacy breach.
- **[Seed drift between markets]** → As the UAE dataset evolves (new transactions, new tickets) the Kenyan parallel can fall behind. Mitigation: keep the Kenyan seed scripts in `scripts/` alongside the UAE ones; treat them as a paired set during future changes. Acceptable because the demo storyline is stable and dataset additions are rare.
- **[AI prompt context divergence per market]** → Each AI route now has two slightly different system prompts (one base + one market-conditioned block). Risk of one route updating its base prompt while another doesn't. Mitigation: centralize the MARKET CONTEXT block builder in a shared helper (`lib/ai/market-context.ts`) so the five routes share one source of truth.
- **[Switcher discoverability for the presenter]** → Deliberately subtle styling means a brand-new presenter might not find it. Mitigation: include in the demo runbook ("globe icon, top right, next to theme"). Acceptable because the audience-facing benefit (invisible to casual observers) outweighs the presenter-onboarding cost.
- **[`localStorage` market mismatch with default-loaded data]** → On first hydration the UI renders with `market = 'default'` until the `localStorage` read completes, then re-renders with the persisted choice. Brief flash possible. Mitigation: the re-render is one tick; if it becomes visible, gate the initial dashboard render on the market context being hydrated (small skeleton). Acceptable as a v1 trade-off.
- **[Role context circular dependency]** → `RoleContext` now depends on `MarketContext` to resolve user IDs. The `MarketProvider` must wrap the `RoleProvider`. Documented in `app/layout.tsx`; obvious from runtime errors if reversed.

## Migration Plan

1. Ship the schema additions to both Supabase projects (additive, no destructive changes). All existing rows backfill to `market = 'default'`. The current demo continues to work without any app changes.
2. Ship the app-side scaffolding (`lib/markets.ts`, `MarketContext`, `marketScoped` helper, `MarketSwitcher` UI) defaulted to `market = 'default'`. Switcher dropdown initially renders only the UAE option (Kenya disabled with "Coming soon"). Verify nothing regresses.
3. Run the Kenyan seed scripts against both Supabase projects. Verify the rows land with `market = 'kenya'` and don't appear in any UAE-default view.
4. Enable the Kenya option in the switcher. End-to-end click-test: switch to Kenya → workspace shows Peter Mwangi as RM → click Wanjiru → 360 page shows KES accounts, Kenyan transactions, Kenyan tickets, Kenyan AI briefing → switch back to UAE → all UAE personas/data return.
5. Update the AI route system prompts to consume the `market` field and inject the MARKET CONTEXT block. Verify briefings for Kenyan clients return Kenya-grounded language ("Kileleshwa mortgage" not "Dubai Marina apartment").

**Rollback**: every change is additive. To revert, simply ignore the `market` column in app code — all rows fall back to `default` and the app behaves exactly as it did pre-change. The Kenyan seeds can be left in the DB (they sit dormant under `market = 'kenya'`) or dropped with one `DELETE FROM x WHERE market = 'kenya'` per table.

## Open Questions

- Should the customer-facing `/api/chat` (Gemini) get the MARKET CONTEXT block, or stay generic? Recommended: yes, give it the block too, since a Kenyan customer asking "what's my next bill?" should hear "KPLC" not "DEWA". Light touch — Gemini handles short context blocks well.
- Should the Kenyan call-center conversations seed include a few Swahili-flavored greetings ("Habari", "Asante") in customer messages for authenticity, or stay fully English? Lean toward 1–2 light touches for flavor without forcing the AI to handle non-English content.
- For the Kenyan persona avatars, do we reuse DiceBear (current behavior for non-spotlight personas) or attempt to source new portraits? Recommended: DiceBear initially, swap to portraits only if a portrait set surfaces.
