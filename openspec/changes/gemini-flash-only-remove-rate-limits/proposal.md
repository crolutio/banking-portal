## Why

The chat and agent paths currently use two Gemma models with automatic fallback when quota errors occur. That adds complexity the team does not want to maintain, and the product decision is to standardize on a single Gemini preview model for all generative calls.

## What Changes

- Remove the rate-limit detection and secondary-model retry path from the chat API.
- Use **only** `gemini-3-flash-preview` for every Google Generative AI request that currently uses `gemma-3-27b-it` / `gemma-3-12b-it` (chat streaming route and LangGraph agent).
- On API failure (including 429), surface the error to the client without silently switching models.

## Capabilities

### New Capabilities

- `generative-ai`: Single-model policy for Google Generative AI—only `gemini-3-flash-preview`; no multi-model fallback.

### Modified Capabilities

- _(none—existing `openspec/specs/global-theme/spec.md` is unrelated to AI routing.)_

## Impact

- **Code**: `app/api/chat/route.ts` (model selection and error handling), `lib/agent/langgraph-agent.ts` (model IDs).
- **Dependencies**: No new packages; same `@google/generative-ai` usage with a different model id string.
- **Behavior**: Users may see errors when the provider rate-limits or rejects requests, instead of a silent switch to a second model.
