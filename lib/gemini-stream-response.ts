/**
 * Gemini SDK stream → incremental text deltas.
 * Used with AI SDK data streams (`createDataStreamResponse` + `formatDataStreamPart`)
 * so useChat gets `revisionId` updates (SWR) and tokens render incrementally.
 *
 * Handles both incremental chunks and cumulative snapshots per SSE event.
 */
export async function* iterateGeminiTextDeltas(
  result: { stream: AsyncIterable<{ text: () => string }> },
): AsyncGenerator<string, void, unknown> {
  let seen = ""
  for await (const chunk of result.stream) {
    const full = typeof chunk.text === "function" ? chunk.text() : ""
    if (!full) continue

    let delta = ""
    if (seen !== "" && full.startsWith(seen)) {
      delta = full.slice(seen.length)
      seen = full
    } else if (seen === "") {
      delta = full
      seen = full
    } else {
      delta = full
      seen += full
    }

    if (delta) yield delta
  }
}

/** @deprecated Use iterateGeminiTextDeltas + AI SDK data stream for chat UI */
export function GoogleGenerativeAIStream(
  result: { stream: AsyncIterable<{ text: () => string }> },
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder()
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const delta of iterateGeminiTextDeltas(result)) {
          controller.enqueue(encoder.encode(delta))
        }
        controller.close()
      } catch (e) {
        controller.error(e)
      }
    },
  })
}

const STREAMING_HEADERS: Record<string, string> = {
  "Cache-Control": "no-store, no-transform",
  "X-Accel-Buffering": "no",
}

/** Plain UTF-8 stream (non–AI-SDK protocol); prefer data stream for useChat. */
export function StreamingTextResponse(
  stream: ReadableStream<Uint8Array>,
  init?: { headers?: HeadersInit },
): Response {
  const headers = new Headers(init?.headers)
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "text/plain; charset=utf-8")
  }
  for (const [k, v] of Object.entries(STREAMING_HEADERS)) {
    if (!headers.has(k)) headers.set(k, v)
  }
  return new Response(stream, { headers })
}
