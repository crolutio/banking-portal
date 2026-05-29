/**
 * Market-aware prompt context for AI routes.
 *
 * Each AI route (RM briefing, RM chat, RM draft outreach, customer chat)
 * prepends the block returned by `buildMarketContext(market)` to its
 * system prompt. The block grounds the model in the right currency,
 * country, payment rails, common merchants, and regulatory references
 * for the active market so output references feel native, not transplanted.
 *
 * Two flavors:
 *   - `buildMarketContext(market)`            → full block for RM-side prompts
 *   - `buildLightMarketContext(market)`       → terser block for customer chat
 *
 * Adding a new market: add an entry to `MARKET_AI_CONTEXTS`.
 */

import { MARKET_CONFIG, type Market } from "../markets"

interface MarketAIContext {
  /** Common payment rails / digital wallets ("M-Pesa, PesaLink, EFT", "Apple Pay, Samsung Pay"). */
  paymentRails: string
  /** Common retail merchants — used as concrete reference points in narratives. */
  commonMerchants: string
  /** Regulatory + statutory references used in messaging copy and AI explanations. */
  regulatoryRefs: string
  /** Time zone phrase used in copy ("GMT+4", "EAT (GMT+3)"). */
  timezone: string
  /** Notable verbatim phrasings to either favour or avoid. */
  toneNotes: string
}

const MARKET_AI_CONTEXTS: Record<Market, MarketAIContext> = {
  default: {
    paymentRails: "card networks (Visa, Mastercard), SWIFT for international wires, IBAN-based local transfers, Apple Pay and Samsung Pay are widely used",
    commonMerchants: "Carrefour, Spinneys, Lulu, Noon, Talabat, Careem, Uber, DEWA (utilities), Etisalat/Du (telecom), Emirates and flydubai airlines",
    regulatoryRefs: "Central Bank of the UAE (CBUAE), Emirates ID for KYC, Wage Protection System (WPS) for salary, RTA for transport",
    timezone: "Gulf Standard Time (GMT+4)",
    toneNotes: "Professional, slightly formal. The UAE is multicultural and expat-heavy — assume English fluency. Reference \"AED\" or \"dirhams\" naturally.",
  },
  kenya: {
    paymentRails: "M-Pesa (the dominant mobile money rail, with Pay Bill and Buy Goods/Till numbers), PesaLink for instant inter-bank transfers, EFT/RTGS for higher-value, SWIFT for international wires",
    commonMerchants: "Naivas, Carrefour Kenya, Quickmart, Tuskys, Java House, Artcaffe, Uber, Bolt, KPLC (electricity), Nairobi Water, Safaricom (telecom and fibre), Kenya Airways, Shell and Rubis (fuel)",
    regulatoryRefs: "Central Bank of Kenya (CBK), Kenya Revenue Authority (KRA) for tax (PAYE, VAT, corporation tax), NSSF (pension), NHIF/SHA (health), KMRC for affordable housing loans, KEMSA and government parastatals as common SME counterparties",
    timezone: "East Africa Time (EAT, GMT+3)",
    toneNotes: "Warm and direct. Kenyan English is fluent and professional — no need to over-explain local terms but feel free to reference KES, M-Pesa, PesaLink, KRA, etc. by name. Avoid Americanisms like \"checking account\" — use \"current account\".",
  },
}

/**
 * Full market-context block intended for RM-side prompts (briefing, chat,
 * draft outreach). Around 8–12 lines — enough to ground the model without
 * dominating the prompt budget.
 */
export function buildMarketContext(market: Market): string {
  const cfg = MARKET_CONFIG[market]
  const ai = MARKET_AI_CONTEXTS[market]
  return `MARKET CONTEXT — ${cfg.label}
- Country: ${cfg.country}
- Currency: ${cfg.currency} (locale ${cfg.locale}, ~${cfg.usdToHomeRate} ${cfg.currency} per 1 USD)
- Time zone: ${ai.timezone}
- Payment rails: ${ai.paymentRails}
- Common merchants and counterparties: ${ai.commonMerchants}
- Regulatory and statutory references: ${ai.regulatoryRefs}
- Tone: ${ai.toneNotes}

Format every monetary amount as ${cfg.currency} with thousands separators (e.g., ${cfg.currency} 1,250,000). Non-${cfg.currency} balances (typically USD wallets) should keep their native currency code. Reference local merchants, rails, and regulators by name where they apply to the data you see — do not invent new ones.`
}

/**
 * Lighter, customer-facing variant. Same essentials but no banker-jargon
 * payment-rails enumeration. Used by the customer chat where verbosity
 * costs tokens and the user is the customer, not the RM.
 */
export function buildLightMarketContext(market: Market): string {
  const cfg = MARKET_CONFIG[market]
  const ai = MARKET_AI_CONTEXTS[market]
  return `MARKET CONTEXT — ${cfg.label}
- The customer banks in ${cfg.country}, in ${cfg.currency} (${cfg.locale}).
- Payment rails available: ${ai.paymentRails}
- Local merchants and rails (Naivas, KPLC, M-Pesa, PesaLink, KRA, etc. for Kenya; Carrefour, DEWA, Etisalat for UAE) may appear in transactions — reference them naturally when relevant.

Always format money as ${cfg.currency} with thousands separators (e.g., ${cfg.currency} 12,500). Keep replies concise and human.`
}
