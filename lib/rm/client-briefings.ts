/**
 * Hardcoded fallback briefings for the RM 360 page.
 *
 * Used when the live `/api/rm-briefing` call fails, times out, or returns
 * malformed JSON. Keyed by clientId. Storylines mirror the seeded data in
 * `scripts/patch_sarah_storyline.sql` and `scripts/patch_mohammed_storyline.sql`.
 */

import { CUSTOMER_IDS } from "@/lib/customer-ids"

export type SentimentTrend = "positive" | "neutral" | "negative" | "mixed"

export interface ConversationDigest {
  total_count: number
  open_count: number
  tickets_count: number
  contact_center_count: number
  sentiment_trend: SentimentTrend
  sentiment_reason?: string
  recent_topics: string[]
  open_requests: string[]
}

export interface BriefingResponse {
  briefing: string
  main_concern: string
  next_best_action: string
  opportunity: string
  conversation_digest: ConversationDigest
}

const SARAH_ID = CUSTOMER_IDS["Sarah Chen"]
const MOHAMMED_ID = "22222222-2222-2222-2222-222222222222"

const SARAH_FALLBACK: BriefingResponse = {
  briefing:
    "Sarah is a Premium client with AED 850,000 across accounts and a AED 125,000 savings balance sitting idle. She's recently flagged two suspicious card transactions and had her card blocked in London — frustration is starting to show. She also has frequent international travel and is paying 8.5% on a AED 300,000 personal loan, both of which are levers for retention.",
  main_concern:
    "Repeated card friction during international travel — most recently a block in London — is eroding her confidence in everyday card reliability.",
  next_best_action:
    "Proactively confirm her replacement card has arrived and offer to enable travel notifications + a Visa Signature upgrade before her next trip.",
  opportunity:
    "Pitch the Travel Rewards Card to eliminate FX fees and the High-Yield Savings Account to redeploy her idle AED 125,000 at up to 4.5%.",
  conversation_digest: {
    total_count: 9,
    open_count: 3,
    tickets_count: 2,
    contact_center_count: 7,
    sentiment_trend: "mixed",
    sentiment_reason:
      "Frustration on card friction during travel; positive feedback on resolution speed.",
    recent_topics: [
      "Card blocked in London",
      "Foreign transaction fees",
      "Suspicious transactions flagged",
    ],
    open_requests: [
      "Card blocked during London trip — urgent",
      "Foreign transaction fees — can these be waived?",
      "Travel notice: London trip",
    ],
  },
}

const MOHAMMED_FALLBACK: BriefingResponse = {
  briefing:
    "Mohammed is a high-value SME client carrying 3 active loans worth AED 4.2M in remaining balance and recurring large supplier wires. He's actively expanding his business and last week reported a security incident on his account. He's price-sensitive on wire fees and is asking for stamped statements — visa-related, signaling international travel or expansion plans.",
  main_concern:
    "Concentrated debt across 3 loans plus an unresolved security incident from last week — trust and debt structure both need attention in the same conversation.",
  next_best_action:
    "Open the meeting acknowledging the security incident, walk him through the resolution, then propose a debt consolidation review against his Business Expansion Loan eligibility.",
  opportunity:
    "Offer the Business Expansion Loan at 6.49% to consolidate his higher-rate facilities, and pair with the Life Protection Plan given his liabilities and family situation.",
  conversation_digest: {
    total_count: 6,
    open_count: 2,
    tickets_count: 2,
    contact_center_count: 4,
    sentiment_trend: "neutral",
    sentiment_reason:
      "Tone is professional and transactional; no major frustration but no enthusiasm either.",
    recent_topics: [
      "Business account statement for visa",
      "International wire transfer fees",
      "Security incident follow-up",
    ],
    open_requests: [
      "Business account statement for visa",
      "International wire transfer fees",
    ],
  },
}

const GENERIC_FALLBACK: BriefingResponse = {
  briefing:
    "Live AI briefing is currently unavailable. Use the data sections below to review this client's accounts, cards, loans, transactions, and support history. The Relationship Copilot at the bottom of the page can still answer specific questions.",
  main_concern: "Briefing unavailable — please retry.",
  next_best_action: "Click Refresh to attempt the AI briefing again.",
  opportunity: "Browse the product catalog to surface tailored recommendations.",
  conversation_digest: {
    total_count: 0,
    open_count: 0,
    tickets_count: 0,
    contact_center_count: 0,
    sentiment_trend: "neutral",
    recent_topics: [],
    open_requests: [],
  },
}

const FALLBACKS: Record<string, BriefingResponse> = {
  [SARAH_ID]: SARAH_FALLBACK,
  [MOHAMMED_ID]: MOHAMMED_FALLBACK,
}

export function getFallbackBriefing(clientId: string): BriefingResponse {
  return FALLBACKS[clientId] ?? GENERIC_FALLBACK
}

export function hasHardcodedFallback(clientId: string): boolean {
  return clientId in FALLBACKS
}
