## 1. RM Sidebar

- [x] 1.1 Define `rmNavItems` array in `app-shell.tsx` with RM-specific nav items (Dashboard, My Clients, Alerts, Schedule) pointing to `/rm-workspace`
- [x] 1.2 Update the `Sidebar` component to check `currentRole` and render `rmNavItems` when role is `relationship_manager`, otherwise render existing `navItems`

## 2. RM Dashboard (Level 1)

- [x] 2.1 Rewrite `app/(dashboard)/rm-workspace/page.tsx` as the RM dashboard: fetch assigned clients from `profiles` table, fetch accounts for AUM calculation, fetch risk alerts for portfolio
- [x] 2.2 Add portfolio summary stat cards (client count, total AUM, at-risk clients, pending actions)
- [x] 2.3 Add client list with name, segment, balance, and "View 360" link to `/rm-workspace/[clientId]`
- [x] 2.4 Add risk alerts section showing alerts for the RM's client portfolio
- [x] 2.5 Add next-best-actions section derived from client data (open tickets, active alerts, upcoming payments)

## 3. Client 360 Route (Level 2)

- [x] 3.1 Create `app/(dashboard)/rm-workspace/[clientId]/page.tsx` with client profile header and back navigation
- [x] 3.2 Fetch and display client accounts, cards, and loans from banking DB
- [x] 3.3 Fetch and display recent transactions from banking DB (via account IDs)
- [x] 3.4 Fetch and display risk alerts and support tickets from banking DB
- [x] 3.5 Fetch and display conversations from call center DB using `createCallCenterClient()`
- [x] 3.6 Compute and display financial snapshot tiles (total balance, liabilities, inflow, outflow, top category)

## 4. RM Copilot

- [x] 4.1 Add copilot section to the 360 page using `useChat({ api: "/api/chat" })` with the client's userId
- [x] 4.2 Add starter prompt buttons that send pre-defined questions to the chat API
- [x] 4.3 Display streaming AI responses with loading state

## 5. Cleanup

- [x] 5.1 Remove mock data imports from the RM workspace pages
- [x] 5.2 Remove the old `RMWorkspacePage360` function and unused imports from the original `page.tsx`
