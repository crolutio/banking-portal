## 1. Database — Products Schema Extension

- [x] 1.1 Create `scripts/extend_products_schema.sql` — `ALTER TABLE products ADD COLUMN ...` for 9 new columns (category, icon, tagline, min_amount, max_amount, rate_pct, term_label, key_features, target_segment)
- [x] 1.2 In the same script, UPDATE all 20 existing products with `category`, `icon`, `tagline`, and `key_features` based on their descriptions
- [x] 1.3 In the same script, UPDATE existing products with `min_amount`, `max_amount`, `rate_pct`, `term_label` where applicable (loans have all, cards have credit limit range, insurance has coverage range, etc.)
- [x] 1.4 Include verification queries at the bottom of the script

## 2. Database — Investment Products

- [x] 2.1 Create `scripts/seed_investment_products.sql` with 8 INSERT statements for: Treasury Bills, Government Bonds, Money Market Fund, Equity Unit Trust, Eurobond, Green Bond, REIT, Sukuk (market-agnostic descriptions for reuse)
- [x] 2.2 Each product has full description, tagline, icon, category='investments', min/max amounts, rate (where applicable), target_segment, and 3–5 key_features
- [x] 2.3 Include verification query at the bottom showing all `category='investments'` rows

## 3. RM Briefing API Route

- [x] 3.1 Create `app/api/rm-briefing/route.ts` with POST handler accepting `{ clientId }`
- [x] 3.2 Reuse the data-fetching logic from `/api/rm-chat` (profile, accounts, cards, loans, transactions, support tickets with messages, call center conversations with messages capped at 10, products)
- [x] 3.3 Build structured prompt instructing Gemini to return JSON with `briefing`, `main_concern`, `next_best_action`, `opportunity`, and `conversation_digest`
- [x] 3.4 Configure Gemini with `responseMimeType: "application/json"` and a `responseSchema` for reliable structured output
- [x] 3.5 Parse Gemini's response, validate required fields, return as JSON with HTTP 200; return HTTP 502 if parsing fails

## 4. Hardcoded Briefing Fallbacks

- [x] 4.1 Create `lib/rm/client-briefings.ts` exporting a typed `BriefingResponse` interface matching the API schema
- [x] 4.2 Add hardcoded fallback briefings keyed by clientId for Amina Odhiambo and Brian Kariuki — each fallback narrative + 3 cards + digest reflects their storyline
- [x] 4.3 Add a generic fallback for unknown clients

## 5. Client Briefing Panel Component

- [x] 5.1 Create `components/rm/client-briefing-panel.tsx` — fetches `/api/rm-briefing` on mount, displays skeleton during load, renders briefing on success
- [x] 5.2 Implement 10-second timeout — if exceeded, use hardcoded fallback and show "AI unavailable" indicator with retry button
- [x] 5.3 Render narrative section (Sparkles icon + briefing text) + three action cards in a responsive grid (1 col mobile, 3 col desktop)
- [x] 5.4 Add Refresh button that clears localStorage cache and re-fetches
- [x] 5.5 Implement localStorage caching under key `rm-briefing-<clientId>` with 1-hour TTL — check cache on mount, use if fresh

## 6. Conversation Digest Component

- [x] 6.1 Create `components/rm/conversation-digest.tsx` accepting `digest` prop with the schema from the briefing response
- [x] 6.2 Render counts (total, open) + sentiment trend badge with appropriate color (positive=green, neutral=blue, negative=red, mixed=amber)
- [x] 6.3 Render up to 3 recent topics as bulleted list
- [x] 6.4 Render open requests under a separate "Open Requests" heading with highlight styling
- [x] 6.5 Handle empty digest case (no conversations)

## 7. Wire Briefing into Client 360 Page

- [x] 7.1 Import and render `ClientBriefingPanel` in `app/(dashboard)/rm-workspace/[clientId]/page.tsx` immediately below the client header card
- [x] 7.2 Pass `clientId` and `clientName` as props

## 8. Products Page Visual Redesign

- [x] 8.1 Update product fetch query in `app/(dashboard)/rm-workspace/products/page.tsx` to select all new columns
- [x] 8.2 Group fetched products by `category` (use Object.groupBy or reduce)
- [x] 8.3 Render each category as a section with header (icon + category label + count badge)
- [x] 8.4 Within each section, render compact product cards in a 2-column grid (1 col mobile, 3 col xl)
- [x] 8.5 Each card displays icon, name, tagline, metrics row (rate · amount range · term), and 3–5 key_features as bullets
- [x] 8.6 Add "Details" expand/collapse toggle that reveals full `description` text
- [x] 8.7 Update search filter to filter across name, tagline, and description; hide empty category sections
- [x] 8.8 Show "Other" section for products with null/unrecognized category as fallback
