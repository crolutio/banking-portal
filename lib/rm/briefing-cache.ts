/**
 * Shared client-side cache helpers for RM briefings.
 *
 * Used by both `ClientBriefingPanel` (writer + reader) and the workspace
 * dashboard (reader-only, to surface cached `main_concern` per client row).
 */

import type { BriefingResponse } from "@/lib/rm/client-briefings"

const CACHE_PREFIX = "rm-briefing-"
export const BRIEFING_CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

interface CacheEntry {
  briefing: BriefingResponse
  cachedAt: number
}

export function readCachedBriefing(clientId: string): BriefingResponse | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(`${CACHE_PREFIX}${clientId}`)
    if (!raw) return null
    const entry = JSON.parse(raw) as CacheEntry
    if (Date.now() - entry.cachedAt > BRIEFING_CACHE_TTL_MS) return null
    return entry.briefing
  } catch {
    return null
  }
}

export function writeCachedBriefing(clientId: string, briefing: BriefingResponse) {
  if (typeof window === "undefined") return
  try {
    const entry: CacheEntry = { briefing, cachedAt: Date.now() }
    window.localStorage.setItem(`${CACHE_PREFIX}${clientId}`, JSON.stringify(entry))
  } catch {
    // Storage full or disabled — silently ignore.
  }
}

export function clearCachedBriefing(clientId: string) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.removeItem(`${CACHE_PREFIX}${clientId}`)
  } catch {
    // ignore
  }
}
