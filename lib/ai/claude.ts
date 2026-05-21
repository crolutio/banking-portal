/**
 * Centralised Claude (Anthropic) provider for the Vercel AI SDK.
 *
 * Reads `CLAUDE_API_KEY` from the environment (the project's existing var name)
 * and exposes typed model factories so routes can stay terse.
 */

import { createAnthropic } from "@ai-sdk/anthropic"

const apiKey = process.env.CLAUDE_API_KEY

export const claudeProvider = createAnthropic({
  apiKey: apiKey ?? "",
})

/** Latest production-ready Sonnet — used for both briefing and RM chat. */
export const CLAUDE_MODEL = "claude-sonnet-4-6"

export function claude() {
  return claudeProvider(CLAUDE_MODEL)
}

export function isClaudeConfigured(): boolean {
  return Boolean(apiKey && apiKey.length > 0)
}
