/**
 * Shared client-side cache helpers for RM briefings.
 *
 * Used by both `ClientBriefingPanel` (writer + reader) and the workspace
 * dashboard (reader-only, to surface cached `main_concern` per client row).
 */

import type { BriefingResponse } from "@/lib/rm/client-briefings"
import { DEFAULT_MARKET, type Market } from "@/lib/markets"

const CACHE_PREFIX = "rm-briefing-"
// 5 minutes — short enough that demos always start fresh between rehearsals,
// long enough that clicking around within a single demo session feels instant.
// The "Regenerate" button on the briefing card lets the presenter force a
// fresh run at any time regardless of TTL.
export const BRIEFING_CACHE_TTL_MS = 5 * 60 * 1000

interface CacheEntry {
  briefing: BriefingResponse
  cachedAt: number
}

/**
 * Cache keys are namespaced by market so a UAE briefing cached under
 * Brian Khoury's clientId can never be served when the same clientId is
 * looked up under the Kenya market (and vice versa). The default-market
 * key omits the suffix so existing cached entries from before the
 * multi-market migration remain readable.
 */
function cacheKey(clientId: string, market: Market = DEFAULT_MARKET): string {
  return market === DEFAULT_MARKET
    ? `${CACHE_PREFIX}${clientId}`
    : `${CACHE_PREFIX}${market}-${clientId}`
}

export function readCachedBriefing(
  clientId: string,
  market: Market = DEFAULT_MARKET,
): BriefingResponse | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(cacheKey(clientId, market))
    if (!raw) return null
    const entry = JSON.parse(raw) as CacheEntry
    if (Date.now() - entry.cachedAt > BRIEFING_CACHE_TTL_MS) return null
    return entry.briefing
  } catch {
    return null
  }
}

export function writeCachedBriefing(
  clientId: string,
  briefing: BriefingResponse,
  market: Market = DEFAULT_MARKET,
) {
  if (typeof window === "undefined") return
  try {
    const entry: CacheEntry = { briefing, cachedAt: Date.now() }
    window.localStorage.setItem(cacheKey(clientId, market), JSON.stringify(entry))
  } catch {
    // Storage full or disabled — silently ignore.
  }
}

export function clearCachedBriefing(
  clientId: string,
  market: Market = DEFAULT_MARKET,
) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.removeItem(cacheKey(clientId, market))
  } catch {
    // ignore
  }
}
