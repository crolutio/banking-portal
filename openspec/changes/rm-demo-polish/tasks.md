## 1. Layout Cleanup (ship first — independent)

- [ ] 1.1 Remove the Risk Alerts card from `app/(dashboard)/rm-workspace/[clientId]/page.tsx` (including the `riskAlerts` state and fetch)
- [ ] 1.2 Remove the Today's Schedule widget from `app/(dashboard)/rm-workspace/page.tsx`
- [ ] 1.3 Add `sticky top-0 z-20` (plus `bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60`) to the client header `<Card>` on the 360 page; verify it doesn't conflict with the role switcher or app shell

## 2. Briefing Quick-Action Chips

- [ ] 2.1 Add a chip row under the three insight tiles in `components/rm/client-briefing-panel.tsx`
- [ ] 2.2 Move the existing "Refresh" button from the panel header to the chip row (header keeps just the title + cached/offline badges)
- [ ] 2.3 Add a "Draft outreach" chip that opens the new Outreach Dialog (lifted state in the panel; pass `clientId`, `clientName`, `opportunity` props)
- [ ] 2.4 Disable the Draft outreach chip if the briefing is empty or only a fallback (no real opportunity text)

## 3. Briefing Cache Reader Utility

- [ ] 3.1 Create `lib/rm/briefing-cache.ts` exporting `readCachedBriefing(clientId)` and `clearCachedBriefing(clientId)` that wrap the localStorage layer used by `ClientBriefingPanel`
- [ ] 3.2 Refactor `ClientBriefingPanel` to use this shared helper instead of its inline cache functions

## 4. Surface main_concern on Dashboard Rows

- [ ] 4.1 In `app/(dashboard)/rm-workspace/page.tsx`, on mount, read `readCachedBriefing(clientId)` for each assigned client and store the result in a `Record<clientId, BriefingResponse>` state
- [ ] 4.2 Render the cached `main_concern` as a third line under name/email in the client row with a small AlertCircle icon
- [ ] 4.3 Omit the line entirely if no cached briefing exists for that client

## 5. Portfolio Pulse — API Route

- [ ] 5.1 Create `app/api/rm-portfolio-pulse/route.ts` accepting POST `{ rmId }`
- [ ] 5.2 Query banking DB for the RM's assigned clients (cap to top 5 by total balance)
- [ ] 5.3 For each assigned client, attempt a `generateObject` call against Claude with a tightly scoped schema `{ reason: string, urgency: "high" | "medium" | "low" }` based on the client's accounts/loans/tickets summary
- [ ] 5.4 Run those calls in parallel with `Promise.allSettled` and a 15-second overall budget
- [ ] 5.5 Sort by urgency (high → medium → low), take top 3, return as `{ items: PulseItem[] }`
- [ ] 5.6 On failure or timeout, return a hardcoded fallback list (Amina + Brian + a third synthetic flag) keyed off the demo RM ID

## 6. Portfolio Pulse — UI Component & Wiring

- [ ] 6.1 Create `components/rm/portfolio-pulse-row.tsx` rendering up to 3 cards in a horizontal scroll/grid, each with urgency icon, client name, reason, and Link to client 360
- [ ] 6.2 Implement skeleton state matching the briefing panel's visual language (gradient border, animated pulse)
- [ ] 6.3 Implement empty state ("No urgent client signals right now")
- [ ] 6.4 Wire the component into `app/(dashboard)/rm-workspace/page.tsx` above the "My Clients" card; pass `rmId = currentBankingUserId`

## 7. Draft Outreach — API Route

- [ ] 7.1 Create `app/api/rm-draft-outreach/route.ts` accepting POST `{ clientId, opportunity, channel, tone }`
- [ ] 7.2 Fetch the same client context the briefing route fetches (profile, accounts, loans, recent transactions, support tickets) — reuse `fetchBanking` helpers; cap data to keep prompt under 6KB
- [ ] 7.3 Build a channel-and-tone-aware system prompt: explicit format rules for email/sms/whatsapp and language guidance for warm/direct/formal
- [ ] 7.4 Call Claude via `streamText` and return `result.toDataStreamResponse()`
- [ ] 7.5 Return 404 if client unknown, 500 if `CLAUDE_API_KEY` missing

## 8. Draft Outreach — Dialog Component

- [ ] 8.1 Create `components/rm/outreach-dialog.tsx` using `@radix-ui/react-dialog` (existing in repo)
- [ ] 8.2 Props: `open`, `onOpenChange`, `clientId`, `clientName`, `opportunity`
- [ ] 8.3 Internal state: `channel` (email default), `tone` (warm default), `draft` (streamed text)
- [ ] 8.4 On open: call `/api/rm-draft-outreach` via `fetch` + `ReadableStream` reader; append chunks to `draft` state for typing effect
- [ ] 8.5 On channel/tone change: abort current stream, call API again with new params
- [ ] 8.6 Render channel as a `<Tabs>` and tone as a row of pill buttons
- [ ] 8.7 Render the draft in a `<Textarea>` (editable) once streaming completes
- [ ] 8.8 Send button: closes dialog, fires `sonner` toast `"Sent to ${clientName} via ${channel}"`
- [ ] 8.9 Cancel button: closes dialog and discards the draft

## 9. Build / Verify

- [ ] 9.1 `npx tsc --noEmit` returns zero errors
- [ ] 9.2 Manual smoke: open Amina's 360 — sticky header works, briefing chips render, draft outreach Dialog opens and streams, refresh chip works, no Risk Alerts card
- [ ] 9.3 Manual smoke: workspace dashboard — Portfolio Pulse row renders skeleton then real items, no Today's Schedule widget, client rows show cached concern after visiting a 360 page
