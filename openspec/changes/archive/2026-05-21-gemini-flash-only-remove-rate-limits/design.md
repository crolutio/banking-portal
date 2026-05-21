## Context

The streaming chat route (`app/api/chat/route.ts`) initializes `gemma-3-27b-it` and, on detected rate-limit or quota-style errors, rebuilds the chat with `gemma-3-12b-it`. The LangGraph agent (`lib/agent/langgraph-agent.ts`) hard-codes `gemma-3-27b-it` in multiple places. The Google Generative AI SDK usage stays the same; only the model id and error-handling branch change.

## Goals / Non-Goals

**Goals:**

- Use exactly **`gemini-3-flash-preview`** everywhere `getGenerativeModel` is used for this app’s Gemini-powered flows (chat + agent).
- Delete rate-limit detection logic and any retry path that swaps models.
- Keep streaming and agent behavior otherwise unchanged.

**Non-Goals:**

- Changing Perplexity, research, or other non–Google-AI routes.
- Adding retries with backoff, queues, or user-facing quota messaging beyond existing error handling.
- Centralizing the model string in env/config (optional follow-up; can hard-code per spec unless product asks otherwise).

## Decisions

1. **Constant model id** — Use the literal `gemini-3-flash-preview` in code (same pattern as current literals). **Rationale:** Matches current style and proposal scope; env override can be a later change.

2. **No fallback** — Remove the `isRateLimit` branch and second `getGenerativeModel` call; let errors surface. **Rationale:** Explicit product choice; avoids hidden model switches.

3. **Align agent with chat** — Update every `getGenerativeModel` in `langgraph-agent.ts` to the same model so agent and chat stay consistent. **Rationale:** Single “only ever queried” model across the app’s Google AI usage.

## Risks / Trade-offs

- **[Risk] Provider rejects or renames `gemini-3-flash-preview`** → Mitigation: deploy knowing the id must match Google’s current offering; fix model string if the API returns invalid model.

- **[Risk] Higher exposure to 429 without fallback** → Mitigation: acceptable trade-off per proposal; operators can monitor logs and adjust quotas or add retries later without restoring a second model.

## Migration Plan

1. Implement code changes and run existing tests / manual chat smoke test.
2. Deploy; no database or schema migration.
3. **Rollback:** Revert the commit restoring previous model ids and fallback (if needed).

## Open Questions

- None for minimal scope; confirm `gemini-3-flash-preview` remains the correct id in the target Google AI project before release.
