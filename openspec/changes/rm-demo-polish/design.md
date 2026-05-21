## Context

The RM 360 page (`/rm-workspace/[clientId]`) and RM workspace dashboard (`/rm-workspace`) both exist and work. The 360 page has an AI Workspace tab section at the top (Briefing + Copilot tabs) and a data grid below. The dashboard has a client list, an NBA sidebar fed from real alerts/tickets, a (real) Portfolio Alerts card, and a (fake) Today's Schedule card.

This change adds two demo-grade interactive AI features and several layout cleanups, all aimed at the NCBA demo narrative.

## Goals / Non-Goals

**Goals:**
- Add one visceral "AI doing work" moment per page (Draft Outreach on 360, Portfolio Pulse on dashboard).
- Remove stale / empty / hardcoded UI sections that hurt demo immersion.
- Make the briefing actionable from inside its panel (don't make the RM scroll to find next step).

**Non-Goals:**
- Real outbound message delivery (Email/SMS/WhatsApp). Toast-only for demo.
- Real-time portfolio scanning. Pulse is generated on dashboard load, not streamed.
- Multi-RM tenancy. The pulse uses the current RM's assigned clients only.

## Decisions

### 1. Draft Outreach: single API route, channel-aware prompts

**Decision**: `/api/rm-draft-outreach` accepts `{ clientId, opportunity, channel, tone }` and returns a streamed text response. Frontend uses `streamText` consumption to type the message live.

**Rationale**: The "watch words appear" effect is the demo payoff. Streaming is essentially free with Claude + `streamText`. Channel-aware prompts (Email = subject + body, SMS/WhatsApp = compact + emoji-light) make the output feel native to each medium.

**Schema**:
```
POST /api/rm-draft-outreach
{
  clientId: string,
  opportunity: string,           // text from the Opportunity card
  channel: "email" | "sms" | "whatsapp",
  tone: "warm" | "direct" | "formal"
}
→ streamed text/plain (or AI SDK data stream)
```

### 2. Outreach Dialog: client component, no global state

**Decision**: `<OutreachDialog>` is a controlled Radix Dialog component. State (open, channel, tone, draft text) lives in the briefing panel; the Dialog only renders. No global store.

**Rationale**: One trigger location (briefing panel), one consumer. Global state would be over-engineered.

### 3. Portfolio Pulse: cached briefing → hardcoded fallback

**Decision**: `/api/rm-portfolio-pulse` accepts `{ rmId }` and returns up to 3 flagged clients with reason + urgency. Implementation reads cached briefings from localStorage (client-side, can't directly), so we'll go server-side with a simpler approach: read each assigned client's last briefing from a server cache (or skip cache entirely and just call the briefing route once per client). For demo simplicity:

- Server reads the 3 clients assigned to the RM
- For each, attempts a fresh `generateObject` briefing call in parallel (parallelism = 3, fits in 8–10s)
- Pulls `main_concern` + a fabricated urgency score
- If any client times out (>15s), falls back to a hardcoded pulse list for that RM

**Alternative considered**: Have the dashboard read each client's briefing cache via `useEffect` → fetch per client. Rejected — would create N calls and N skeleton states. One server call returning a sorted list is cleaner.

**Risk**: 3 parallel briefing calls = ~3× the cost of one briefing on each dashboard load. Acceptable for demo (small client portfolio). For production this would need a daily cron.

### 4. `main_concern` on dashboard rows: client-side cache read

**Decision**: The dashboard reads `localStorage[rm-briefing-<clientId>]` for each assigned client and renders the cached `main_concern` if fresh. No fetch fallback — if no cache, no extra line shown.

**Rationale**: Avoids triggering 100 briefings to render a sidebar element. The pulse row already covers proactivity for un-visited clients. The dashboard row enhancement is just "if RM has visited this client recently, show what concerned the AI then."

**Alternative considered**: Read all briefings server-side and pass as initial props. Rejected — too eager; demo only has 3 clients but we want a pattern that scales.

### 5. Sticky 360 header: CSS-only, no scroll listener

**Decision**: Wrap the existing client header `<Card>` in a sticky container (`sticky top-0 z-20`). Add a thin border-bottom and slight backdrop-blur for the "floating header" look. No JS scroll listener.

**Rationale**: CSS sticky is well-supported, no scroll-watcher overhead, no flicker.

**Trade-off**: The whole card stays sticky (avatar + metric tiles + everything). A more polished version would collapse to a thin bar (just avatar + name + balance) as you scroll. We can iterate, but full-card sticky is good enough for the demo and zero risk.

### 6. Quick-action chips in briefing

**Decision**: A horizontal row of small buttons under the three insight tiles in `ClientBriefingPanel`:
- `[Draft outreach]` → opens OutreachDialog (uses the briefing's `opportunity` text)
- `[Refresh]` → moved from the header to here (header gets cleaner; refresh becomes one of the actions)

**Rationale**: Co-locates actions with insights. Removes the header refresh button to avoid duplication.

### 7. Removed sections

**Decision**: Delete in code (not gate behind flag). Risk Alerts card and Today's Schedule widget are demo-only mockery; removing them is a one-way improvement.

## Risks / Trade-offs

- **Pulse API latency**: 3 parallel briefings = ~8–10s before the cohort row renders. Show a skeleton; if it exceeds 15s, use the hardcoded fallback. Caching to localStorage on success.
- **Outreach drafts could be off-tone or hallucinate facts**: the prompt will be tightly scoped — "Draft a {tone} {channel} message from RM to {clientName} about {opportunity}. Use only this context: ..." with the same data the briefing has. Risk is similar to current chat.
- **Sticky header may overlap dropdowns**: `z-20` should suffice; if it fights with another `z-*` element, bump to `z-30`. Will check during smoke test.

## Migration Plan

1. Create openspec artifacts (this change).
2. Layout cleanup (kill cards, sticky header, quick-action chips) — independent, ship first.
3. Portfolio Pulse — server route + component + dashboard integration.
4. Draft Outreach — server route + Dialog + briefing integration.
5. Surface main_concern on dashboard rows (small client-side enhancement).
6. Smoke test all flows in dev.
