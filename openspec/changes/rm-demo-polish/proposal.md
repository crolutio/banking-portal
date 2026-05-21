## Why

The RM 360 page has the briefing + chat as tabs, but it still reads like a *catalog of data* with AI as a side panel. For the NCBA demo we need two visceral "AI is doing the work" moments and several layout cleanups that reinforce the narrative — "the RM manages 100 clients instead of 10 because AI does the research, drafts the messages, and surfaces the urgent ones".

Feedback after the last review:
- The chat is great but the AI never *acts* — it only advises. We need at least one "AI did 30 minutes of my work in 3 seconds" moment.
- The workspace dashboard is a passive directory. The RM walks in and has to read every client row to find what's important. The dashboard should *tell* them.
- The 360 page has empty/stale sections (Risk Alerts card with no data after the table was dropped; Today's Schedule with hardcoded times).
- Quick actions on the briefing don't exist — RM sees "next best action" but can't act from there.

## What Changes

### Two new "wow" capabilities

- **Draft Outreach** — A button on the briefing's Opportunity card opens a Dialog with an AI-drafted personal message to the client. Channel selector (Email · SMS · WhatsApp), tone selector (Warm · Direct · Formal), inline editing, "Send" CTA that fires a toast. Powered by a new `/api/rm-draft-outreach` route using Claude `streamText`.
- **Portfolio Pulse** — A horizontal cohort row above the client list on the RM workspace dashboard, showing 3 AI-flagged clients with a one-line reason ("⚠ Card friction during travel" / "★ 3-loan optimization opportunity") and an urgency tag. Click → that client's 360. Powered by cached briefings + a small hardcoded fallback so the demo never has a blank state.

### Layout polish

- **Kill the empty Risk Alerts card** on the 360 page (the `risk_alerts` table was removed; the section now always renders "No alerts").
- **Kill the hardcoded Today's Schedule widget** on the dashboard (Portfolio Pulse replaces its role of "what to focus on today").
- **Quick-action chips in the briefing panel** — under the three insight tiles, a row of buttons: `[Draft outreach]` (opens Pick 1) and `[Refresh briefing]`. Makes the briefing *actionable*.
- **Sticky 360 page client header** — when the RM scrolls into transactions/support, a thin bar with avatar + name + balance + key metrics stays visible at the top.
- **Surface `main_concern` on dashboard client rows** — each row in "My Clients" gets a third line under name/email showing the cached concern (e.g. "Concern: Card friction during travel"). Reads from `localStorage` cache; gracefully omits if no briefing has been generated for that client yet.

## Capabilities

### New Capabilities

- `rm-outreach-drafting`: AI-drafted personalized outreach messages with channel and tone selection. Pick 1.
- `rm-portfolio-pulse`: Proactive cohort-level AI flag bar on the dashboard. Pick 2.

### Modified Capabilities

- `rm-ai-briefing`: Gains quick-action chip row (Draft outreach, Refresh).
- `rm-client-360`: Removes Risk Alerts card. Adds sticky scroll behavior on the header.
- `rm-dashboard`: Removes Today's Schedule widget. Adds Portfolio Pulse cohort row. Adds inline `main_concern` line per client row when cached briefing exists.

## Impact

- **New files**: `app/api/rm-draft-outreach/route.ts`, `app/api/rm-portfolio-pulse/route.ts`, `components/rm/outreach-dialog.tsx`, `components/rm/portfolio-pulse-row.tsx`, `lib/rm/briefing-cache.ts` (shared cache reader).
- **Modified files**: `app/(dashboard)/rm-workspace/page.tsx`, `app/(dashboard)/rm-workspace/[clientId]/page.tsx`, `components/rm/client-briefing-panel.tsx`.
- **DB changes**: None.
- **Dependencies**: None (uses existing `@ai-sdk/anthropic`, `@radix-ui/react-dialog`, `sonner` for toasts — all already installed).
- **No breaking changes** — all additions or removals of demo-only / empty UI sections.
