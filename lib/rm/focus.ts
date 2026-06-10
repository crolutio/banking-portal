"use client"

// ---------------------------------------------------------------------------
// RM "Focus" settings — the steering knobs that tell the AI what to prioritise
// this week (SME push, HNW retention, churn defence, …). Persisted to
// localStorage and shared across the Today / Clients / Retention pages via a
// tiny external store (useSyncExternalStore) so changing focus on one surface
// instantly re-ranks the others without a provider in the tree.
// ---------------------------------------------------------------------------

import { useSyncExternalStore } from "react"

export type FocusPriority = "balanced" | "sme" | "hnw" | "churn" | "dormant"
export type FocusTone = "concise" | "consultative" | "data_heavy"

export interface FocusSettings {
  /** What the AI should weight most heavily when ranking the book. */
  priority: FocusPriority
  /** 0–100. How aggressively to flag risk/churn (raises low-signal clients). */
  riskSensitivity: number
  /** Auto-draft outreach for the top priority each morning. */
  autoDraft: boolean
  /** Voice of AI-generated copy. */
  tone: FocusTone
}

export const DEFAULT_FOCUS: FocusSettings = {
  priority: "balanced",
  riskSensitivity: 50,
  autoDraft: true,
  tone: "consultative",
}

export const FOCUS_PRIORITY_META: Record<
  FocusPriority,
  { label: string; blurb: string; banner: string }
> = {
  balanced: {
    label: "Balanced",
    blurb: "Weigh risk and opportunity evenly across the whole book.",
    banner: "Balancing risk and opportunity across your whole portfolio",
  },
  sme: {
    label: "SME Growth",
    blurb: "Prioritise business clients — working capital, overdrafts, cash management.",
    banner: "Focusing on SME & business clients this week",
  },
  hnw: {
    label: "High-Net-Worth Retention",
    blurb: "Prioritise VIP / Premium clients — wealth, idle cash, white-glove service.",
    banner: "Focusing on high-net-worth retention this week",
  },
  churn: {
    label: "Churn Defence",
    blurb: "Surface flight-risk clients first — act before they leave.",
    banner: "Defending against churn — flight-risk clients first",
  },
  dormant: {
    label: "Dormant Reactivation",
    blurb: "Prioritise low-activity clients with reactivation potential.",
    banner: "Reactivating dormant & low-engagement clients",
  },
}

export const FOCUS_TONE_META: Record<FocusTone, { label: string; blurb: string }> = {
  concise: { label: "Concise", blurb: "Short, to-the-point guidance." },
  consultative: { label: "Consultative", blurb: "Warm, advisory, relationship-first." },
  data_heavy: { label: "Data-heavy", blurb: "Lead with numbers and evidence." },
}

const STORAGE_KEY = "rm-focus-settings"

// --- external store -------------------------------------------------------

let current: FocusSettings = DEFAULT_FOCUS
let hydrated = false
const listeners = new Set<() => void>()

function read(): FocusSettings {
  if (typeof window === "undefined") return DEFAULT_FOCUS
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_FOCUS
    return { ...DEFAULT_FOCUS, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_FOCUS
  }
}

function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return
  current = read()
  hydrated = true
}

function emit() {
  for (const l of listeners) l()
}

export function setFocus(patch: Partial<FocusSettings>) {
  ensureHydrated()
  current = { ...current, ...patch }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current))
  } catch {
    // best-effort
  }
  emit()
}

function subscribe(cb: () => void): () => void {
  ensureHydrated()
  listeners.add(cb)
  return () => listeners.delete(cb)
}

function getSnapshot(): FocusSettings {
  ensureHydrated()
  return current
}

/**
 * Read + write the active focus settings. Re-renders every consumer when any
 * surface changes them.
 */
export function useFocus(): [FocusSettings, (patch: Partial<FocusSettings>) => void] {
  const value = useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_FOCUS)
  return [value, setFocus]
}
