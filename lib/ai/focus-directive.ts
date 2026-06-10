/**
 * Server-safe translation of the RM "Focus" settings into a prompt block.
 *
 * The Focus tab (lib/rm/focus.ts) is a "use client" module, so AI routes can't
 * import its runtime maps. Instead the client sends the raw focus values in the
 * request body and the route turns them into an instruction block with
 * `buildFocusDirective()`. This is how the RM's "this week, focus on SMEs / HNW
 * / churn", risk sensitivity, tone, and auto-draft toggle actually reach the
 * model — every RM-side AI route should prepend it to its system prompt.
 */

export type FocusPriorityKey = "balanced" | "sme" | "hnw" | "churn" | "dormant"
export type FocusToneKey = "concise" | "consultative" | "data_heavy"

export interface FocusInput {
  priority?: FocusPriorityKey
  riskSensitivity?: number
  autoDraft?: boolean
  tone?: FocusToneKey
  /** Human label for the priority, e.g. "SME Growth" (sent by the client). */
  label?: string
}

const PRIORITY_DIRECTIVE: Record<FocusPriorityKey, string> = {
  balanced: "Weigh churn risk and growth opportunity evenly across the whole book.",
  sme: "Prioritise SME / business clients — lead with working-capital, overdraft, cash-management and trade-finance angles. When two clients rank close, the SME comes first.",
  hnw: "Prioritise high-net-worth (VIP / Premium) clients — lead with wealth, idle-cash deployment and white-glove retention. When two clients rank close, the HNW client comes first.",
  churn: "Prioritise flight-risk clients above everything else — surface anyone showing churn signals first and frame each action as a save.",
  dormant: "Prioritise dormant / low-activity clients with reactivation potential — frame actions as re-engagement.",
}

const TONE_DIRECTIVE: Record<FocusToneKey, string> = {
  concise: "Keep it short and punchy — minimal words, lead with the action.",
  consultative: "Warm, advisory, relationship-first phrasing.",
  data_heavy: "Lead with the numbers and the evidence behind each recommendation.",
}

function isPriority(v: unknown): v is FocusPriorityKey {
  return typeof v === "string" && v in PRIORITY_DIRECTIVE
}
function isTone(v: unknown): v is FocusToneKey {
  return typeof v === "string" && v in TONE_DIRECTIVE
}

/**
 * Build the focus instruction block. Returns "" when no focus is supplied so
 * callers can safely interpolate it unconditionally.
 */
export function buildFocusDirective(f: FocusInput | undefined | null): string {
  if (!f) return ""
  const priority: FocusPriorityKey = isPriority(f.priority) ? f.priority : "balanced"
  const tone: FocusToneKey = isTone(f.tone) ? f.tone : "consultative"
  const sens = typeof f.riskSensitivity === "number" ? f.riskSensitivity : 50

  const sensLine =
    sens >= 70
      ? "Risk sensitivity is HIGH — err toward flagging risk; raise even low-signal clients."
      : sens <= 30
        ? "Risk sensitivity is LOW — only flag clear, well-evidenced risk."
        : "Risk sensitivity is balanced."

  const lines = [
    "RM FOCUS SETTINGS — the RM set these for this week. Obey them when ranking, framing, and recommending:",
    `- Priority: ${f.label ?? priority}. ${PRIORITY_DIRECTIVE[priority]}`,
    `- ${sensLine}`,
    `- Voice: ${TONE_DIRECTIVE[tone]}`,
  ]
  if (f.autoDraft) {
    lines.push("- Auto-draft is ON — assume outreach for the top client is already being prepared.")
  }
  return lines.join("\n")
}
