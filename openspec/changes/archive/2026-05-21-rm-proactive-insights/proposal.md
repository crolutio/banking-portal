## Why

The current RM 360 page is a data dump — accounts, cards, loans, transactions, support. The RM has to read everything and draw their own conclusions, which is exactly the problem the demo positions us to solve: "the RM should manage 100 accounts instead of 10, with AI doing the hard work." Feedback from the client review explicitly called out:

- "There is almost no information/insights — there should be more clear information of the user."
- "There should be more proactive insights without asking, and a nicer UI."
- "The AI should say things like 'one of the main concerns of this user is to have a loan to purchase a house' — proactively, without the RM asking."
- "Would be interesting to have a summary of the conversations the user has had with the AI."
- "The product catalog should be more schematic — there is a lot of text."

This change shifts the 360 page from data-first to insights-first by adding a proactive AI briefing at the top, an automated conversation digest, and a visual schematic product catalog. It also expands the product catalog to include Kenyan-relevant investment products so the AI has richer recommendations to draw from.

## What Changes

- New API route `/api/rm-briefing` — accepts `{ clientId }`, fetches the same data as `/api/rm-chat`, calls Gemini with a structured prompt, returns JSON with `briefing`, `main_concern`, `next_best_action`, `opportunity`, and `conversation_digest`.
- New AI Briefing panel at the top of the RM 360 page — renders the structured response as a narrative + three action cards (Concern · NBA · Opportunity), plus a conversation digest with sentiment trend and recent topics.
- Briefing is generated live on page load with a graceful skeleton state; a hardcoded fallback per known client kicks in if the API fails or times out (>10s).
- Products table schema extended with `category`, `icon`, `tagline`, `min_amount`, `max_amount`, `rate_pct`, `term_label`, `key_features`, `target_segment`. The existing `description` column is kept for AI context.
- Products page redesigned — products grouped by category headers, rendered as compact visual cards (icon · name · tagline · key metrics row · features list). No drill-down route; all info on one page.
- 8 new investment products added to the catalog (T-Bills, T-Bonds, Money Market Fund, Equity Unit Trust, Eurobond, Green Bonds, REIT, Sukuk) — general products that work across markets so the catalog is reusable for future demos.

## Capabilities

### New Capabilities

- `rm-ai-briefing`: Proactive AI briefing panel that fetches a structured Gemini response containing the main concern, next best action, opportunity, and conversation digest for the client, then renders it as a narrative + action cards at the top of the 360 page.
- `rm-product-catalog-visual`: Visual schematic product catalog grouped by category, rendering each product as a card with icon, tagline, key metrics row, and 3–5 feature bullets.

### Modified Capabilities

_None — `rm-copilot` (chat) and `rm-products-page` (existing page) remain functional but are augmented. Behavior of existing requirements is unchanged; only new behavior is added._

## Impact

- **New files**: `app/api/rm-briefing/route.ts`, `components/rm/client-briefing-panel.tsx`, `components/rm/conversation-digest.tsx`, `lib/rm/client-briefings.ts` (hardcoded fallbacks)
- **Modified files**: `app/(dashboard)/rm-workspace/[clientId]/page.tsx` (add briefing panel at top), `app/(dashboard)/rm-workspace/products/page.tsx` (group by category, schematic cards)
- **DB changes**: `ALTER TABLE products` adds 8 new columns; INSERT 8 new investment products; UPDATE existing 20 products with category and structured fields
- **Dependencies**: No new packages — uses existing `@google/generative-ai`, `react-markdown`, lucide icons
- **No breaking changes** — existing `/api/rm-chat` and chat copilot are untouched
