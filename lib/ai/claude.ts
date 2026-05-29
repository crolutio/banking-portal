/**
 * Centralised Claude (Anthropic) provider for the Vercel AI SDK.
 *
 * Reads `CLAUDE_API_KEY` from the environment (the project's existing var
 * name) and exposes typed model factories so routes can stay terse.
 *
 * Model split — by design:
 *
 *   claudeFast()    → Haiku 4.5. Used by latency-sensitive streaming routes
 *                     (RM Copilot chat, Draft Outreach). Anthropic positions
 *                     Haiku 4.5 as a drop-in for Sonnet 4 — quality is more
 *                     than good enough for conversational synthesis and
 *                     channel/tone-shifted writing.
 *
 *   claudeQuality() → Sonnet 4.6. Used wherever narrative depth or schema
 *                     fidelity matters more than latency. Both the RM Briefing
 *                     and Portfolio Pulse are pinned here directly — Haiku
 *                     produced structurally valid but lexically thinner
 *                     output, and both surfaces are headline AI artefacts on
 *                     the RM page.
 *
 *   claude()        → Back-compat alias for claudeQuality(). Anything that
 *                     hasn't been intentionally moved to Haiku stays here.
 *
 * `generateObjectWithFallback` (Haiku-first with silent Sonnet retry on
 * schema-validation failure) remains available for future structured-output
 * paths that prioritise latency over narrative depth.
 */

import { createAnthropic } from "@ai-sdk/anthropic"
import { generateObject } from "ai"

const apiKey = process.env.CLAUDE_API_KEY

export const claudeProvider = createAnthropic({
  apiKey: apiKey ?? "",
})

/** Quality model — Sonnet 4.6. Default for structured output. */
export const CLAUDE_MODEL_QUALITY = "claude-sonnet-4-6"

/** Fast model — Haiku 4.5. Default for user-facing streaming. */
export const CLAUDE_MODEL_FAST = "claude-haiku-4-5"

/** Back-compat: legacy `CLAUDE_MODEL` still points at the quality model. */
export const CLAUDE_MODEL = CLAUDE_MODEL_QUALITY

export function claudeQuality() {
  return claudeProvider(CLAUDE_MODEL_QUALITY)
}

export function claudeFast() {
  return claudeProvider(CLAUDE_MODEL_FAST)
}

/** Back-compat alias — old call sites stay on Sonnet unless they migrate. */
export function claude() {
  return claudeQuality()
}

export function isClaudeConfigured(): boolean {
  return Boolean(apiKey && apiKey.length > 0)
}

/**
 * Run `generateObject` on Haiku first; if it throws (typically because the
 * model output didn't validate against the schema), silently retry on
 * Sonnet. Returns whichever attempt succeeded.
 *
 * Use this for any structured-output path where Haiku's speed is worth
 * taking, but a schema failure would be user-visible (e.g. the AI Briefing
 * falling back to "pre-prepared notes").
 *
 * Logs which tier served the response so we can spot drift in production
 * logs — if Haiku is failing too often we can revisit the prompt or the
 * schema.
 *
 * Types: `generateObject` from the AI SDK exposes several overloads (schema
 * vs. enum vs. no-schema) which TS struggles to disambiguate through a
 * generic wrapper. Internally we pass through to the SDK with a loose cast
 * and let the call sites narrow the returned `object` to their schema's
 * `z.infer<...>` type.
 */
export async function generateObjectWithFallback(
  args: Record<string, unknown>,
  logTag = "[claude]",
): Promise<{ object: unknown }> {
  type LooseArgs = Parameters<typeof generateObject>[0]
  try {
    const result = await generateObject({
      ...(args as unknown as LooseArgs),
      model: claudeFast(),
    })
    return { object: result.object }
  } catch (fastErr: any) {
    console.warn(
      `${logTag} Haiku generateObject failed (${fastErr?.message ?? fastErr}); retrying on Sonnet.`,
    )
    const result = await generateObject({
      ...(args as unknown as LooseArgs),
      model: claudeQuality(),
    })
    return { object: result.object }
  }
}
