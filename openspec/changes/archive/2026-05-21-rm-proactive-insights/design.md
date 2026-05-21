## Context

The banking app has a working RM 360 page at `/rm-workspace/[clientId]` and a working RM Copilot chat at `/api/rm-chat`. Both fetch from banking (profiles, accounts, cards, loans, transactions, support_tickets, support_messages, products) and call center (conversations, messages) databases. The current page shows data; it does not synthesize insights.

The products table has 20 rows with rich free-text descriptions and no structure. The products page renders them as a flat grid of cards, each showing the full description — making the catalog text-heavy and hard to scan.

The demo audience is a Kenyan bank (NCBA). Currency display has already been switched to KES, names have been swapped to Kenyan names, and 4 storyline scripts are seeded.

## Goals / Non-Goals

**Goals:**
- Surface 3 concrete proactive insights per client (main concern, next best action, opportunity) at the top of the 360 page
- Provide a one-glance conversation digest (count, sentiment trend, recent topics, open requests)
- Make the product catalog scannable in under 5 seconds by grouping by category and showing structured metrics
- Add Kenyan-specific investment products to the catalog so the AI can make culturally relevant recommendations
- Live AI generation with a graceful fallback so the demo never breaks

**Non-Goals:**
- Modifying the existing `/api/rm-chat` chat route
- Building a product detail drill-down route (`/products/[id]`)
- Persisting briefings to the database (live-only with localStorage caching)
- Real-time briefing updates (refresh button is enough)
- Briefing audit trail or RM feedback capture
- Cross-channel sentiment analytics beyond the simple trend display

## Decisions

### 1. Separate `/api/rm-briefing` route vs. extending `/api/rm-chat`

**Decision**: New dedicated route.

**Rationale**: The chat route streams free-form markdown. The briefing needs structured JSON for the UI to render three distinct cards. Mixing the two would force the chat route to detect intent and switch modes, adding complexity. A dedicated route can configure Gemini for structured output (`responseMimeType: "application/json"`) without affecting chat behavior.

**Alternative considered**: Add a `mode: "briefing" | "chat"` flag to `/api/rm-chat` — rejected because it couples two response contracts in one route.

### 2. Live AI call with hardcoded fallback

**Decision**: Always attempt live generation on page load. If the call fails or exceeds 10 seconds, fall back to a hardcoded briefing keyed by `clientId` for the two demo customers.

**Rationale**: Live generation is the demo's "wow" moment — the AI literally writes the briefing while the RM watches. But a stalled API mid-demo would be catastrophic. Hardcoded briefings for Amina Odhiambo and Brian Kariuki act as a safety net. Any other client uses a generic fallback ("Briefing unavailable, refresh to retry").

**Alternative considered**: Pre-compute briefings nightly and store in DB — rejected because it removes the "wow" and adds infrastructure (cron, migrations) for a 30-min demo.

### 3. localStorage caching with 1-hour TTL

**Decision**: After a successful generation, cache the JSON in `localStorage` under key `rm-briefing-<clientId>` with a 1-hour TTL. On page load, prefer the cache if fresh.

**Rationale**: During the demo, the RM may navigate between clients and return. A cached briefing renders instantly. The TTL is short enough that stale data won't appear in production scenarios. A manual "Refresh" button bypasses the cache.

### 4. Structured Gemini output schema

**Decision**: Use Gemini's structured output mode with this schema:

```json
{
  "briefing": "string (2-3 sentences, narrative)",
  "main_concern": "string (1 sentence)",
  "next_best_action": "string (1 sentence, actionable)",
  "opportunity": "string (1 sentence, product-specific)",
  "conversation_digest": {
    "total_count": "number",
    "open_count": "number",
    "sentiment_trend": "positive | neutral | negative | mixed",
    "recent_topics": ["string", "string", "string"],
    "open_requests": ["string"]
  }
}
```

**Rationale**: Reliable parsing in the frontend, no markdown to interpret, clean separation between sections.

### 5. Products schema extension (non-breaking)

**Decision**: Add nullable columns to the existing `products` table. Existing `description` stays as the AI's context source. New columns power the UI.

```sql
ALTER TABLE products ADD COLUMN category TEXT;          -- 'loans' | 'cards' | 'mortgages' | 'insurance' | 'investments' | 'deposits' | 'credit_lines'
ALTER TABLE products ADD COLUMN icon TEXT;              -- lucide icon name (e.g. 'CreditCard', 'TrendingUp')
ALTER TABLE products ADD COLUMN tagline TEXT;           -- 1-line value prop
ALTER TABLE products ADD COLUMN min_amount NUMERIC;     -- nullable
ALTER TABLE products ADD COLUMN max_amount NUMERIC;     -- nullable
ALTER TABLE products ADD COLUMN rate_pct NUMERIC;       -- nullable (cards/insurance have no rate)
ALTER TABLE products ADD COLUMN term_label TEXT;        -- e.g. "6–24 months" or "Annual"
ALTER TABLE products ADD COLUMN key_features TEXT[];    -- 3-5 bullets max
ALTER TABLE products ADD COLUMN target_segment TEXT;    -- 'Mass' | 'Premium' | 'Private'
```

**Rationale**: Existing products page and AI route keep working until the UI is updated. The UPDATE script backfills the new fields.

**Alternative considered**: New `products_v2` table — rejected as over-engineered for a demo.

### 6. Category grouping in the products page

**Decision**: Render a category header (icon + label + count) followed by a 2–3 column grid of compact cards within each category. No drill-down route; the full description is hidden behind an expandable "Details" toggle on each card.

**Rationale**: One-page navigation matches the demo flow. The RM scans categories, finds a relevant product, expands for full description if needed.

### 7. Investment products selection (market-agnostic)

**Decision**: Add 8 investment products that work across markets:
- Treasury Bills — short-term government securities
- Government Bonds — long-term sovereign debt
- Money Market Fund — short-duration cash management
- Equity Unit Trust — diversified equity mutual fund
- Eurobond — USD-denominated international debt
- Green Bond — ESG-aligned fixed income
- REIT (Real Estate Investment Trust) — property-backed
- Sukuk — Sharia-compliant fixed income

**Rationale**: These are universal investment categories present in virtually every retail bank's offering. They give the AI shots at meaningful recommendations (e.g., suggesting MMF for a customer with idle savings, REIT for a customer with property interest) without tying the demo to one market. Currency labels stay generic so the same catalog can be reused for future demos in any region.

## Risks / Trade-offs

- **Live AI latency**: Gemini structured output adds ~3–6 seconds to page load. → Mitigation: render skeleton immediately, briefing fills in. Use localStorage cache on subsequent visits.
- **API key exhaustion / quota**: Every 360 page visit hits the AI. → Mitigation: cache reduces re-calls; demo only has 2 active clients.
- **Hallucinated insights**: Live AI might invent products or misread data. → Mitigation: structured prompt constrains output; product catalog is provided in full so AI references real products; hardcoded fallback ensures demo storyline stays consistent.
- **Schema migration in production**: Adding 8 columns to `products` is safe (all nullable). Backfill UPDATE is idempotent. → Mitigation: SQL script gives the user a single file to run; verification queries included.
- **Category drift**: If new products are added without a category, they won't appear on the page. → Mitigation: UI shows an "Uncategorized" section as fallback; AI is instructed to only recommend categorized products.

## Migration Plan

1. Run `scripts/extend_products_schema.sql` — adds columns + UPDATEs existing 20 rows with category/icon/tagline/key_features.
2. Run `scripts/seed_investment_products.sql` — inserts 8 new investment products.
3. Deploy code: new `/api/rm-briefing` route, new `ClientBriefingPanel` component, updated products page.
4. Smoke test: load Amina's 360, confirm briefing renders within 10s. Load products page, confirm 7 category groups visible.
5. Rollback: revert deploy. Schema changes are non-breaking; columns can be dropped if needed via `ALTER TABLE products DROP COLUMN ...`.
