## 1. Chat API (`app/api/chat/route.ts`)

- [x] 1.1 Replace `getGenerativeModel` so the only model id is `gemini-3-flash-preview` (use `const` for the model if it is no longer reassigned).
- [x] 1.2 Remove the comment and logic for “Model fallback” and the outer `try`/`catch` that detects rate limits, maps 429/quota messages, and re-instantiates the model with `gemma-3-12b-it`.
- [x] 1.3 Keep a single streaming path: call `sendMessageStream` once and return `StreamingTextResponse`; on failure, let errors propagate to the existing outer handler (or rethrow) without switching models.

## 2. LangGraph agent (`lib/agent/langgraph-agent.ts`)

- [x] 2.1 Update every `genAI.getGenerativeModel({ model: ... })` call site to use `gemini-3-flash-preview` (both occurrences currently using `gemma-3-27b-it`).

## 3. Verification

- [x] 3.1 Search the repo for `gemma-3-27b-it`, `gemma-3-12b-it`, and “fallback” / “rate limit” in the chat route to confirm no leftover dual-model behavior.
- [x] 3.2 Run the project test or lint script if present; manually smoke-test chat streaming once with a valid API key.
