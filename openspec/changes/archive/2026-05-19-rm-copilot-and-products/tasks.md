## 1. RM Copilot API Route

- [x] 1.1 Create `app/api/rm-chat/route.ts` with POST handler that accepts `{ messages, userId, currentPage }`
- [x] 1.2 Fetch client profile from `profiles` table by `userId`, return 404-style message if not found
- [x] 1.3 Fetch banking data: accounts, cards, loans, transactions (last 30 via account_ids), risk_alerts
- [x] 1.4 Fetch support tickets (`support_tickets` by `user_id`) with full message threads (`support_messages` by `ticket_id`)
- [x] 1.5 Fetch call center conversations (by `customer_id`, limit 10, ordered by `updated_at` desc) with messages for each, wrapped in try/catch for resilience
- [x] 1.6 Fetch full product catalog from `products` table
- [x] 1.7 Build RM-persona system prompt with client name from profile, all financial data, support threads, conversation threads, and product catalog
- [x] 1.8 Stream response via Gemini using the same pattern as `/api/chat` (startChat + sendMessageStream)

## 2. Client 360 Page Updates

- [x] 2.1 Change `useChat` in `/rm-workspace/[clientId]/page.tsx` from `api: "/api/chat"` to `api: "/api/rm-chat"`
- [x] 2.2 Update the copilot CardDescription to remove "Powered by the same AI as the banking assistant" text

## 3. Products Page

- [x] 3.1 Create `app/(dashboard)/rm-workspace/products/page.tsx` that fetches all products from the `products` table
- [x] 3.2 Render products as cards in a responsive grid (name as title, full description as body)
- [x] 3.3 Handle empty state when no products exist

## 4. RM Sidebar Navigation

- [x] 4.1 Add "Products" item to `rmNavItems` in `components/layout/app-shell.tsx` linking to `/rm-workspace/products`
