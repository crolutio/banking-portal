/**
 * Market registry — the single source of truth for which markets exist
 * and how each one is presented (currency, locale, label, flag).
 *
 * To add a new market:
 *   1. Add the slug to MARKETS
 *   2. Add a config entry to MARKET_CONFIG
 *   3. Seed data with that slug in the `market` column of every relevant table
 *
 * NOTE: keep the slug lowercase + ASCII — it gets written into the `market`
 * column on every persona/dataset table and is used as a localStorage key.
 */

export const MARKETS = ["default", "kenya"] as const

export type Market = (typeof MARKETS)[number]

export interface MarketConfig {
  /** Stable slug — must match the `market` column value in the database. */
  slug: Market
  /** Human-readable name shown in the switcher dropdown. */
  label: string
  /** Short label used in tight UI surfaces (badges, headers). */
  shortLabel: string
  /** Emoji flag for visual differentiation in dropdowns and badges. */
  flag: string
  /** Default ISO currency code (e.g. "AED", "KES"). */
  currency: string
  /** BCP-47 locale used for Intl number/date formatting. */
  locale: string
  /** Country phrase used in AI prompts and copy ("the UAE", "Kenya"). */
  country: string
  /** One-line description for AI prompts and tooltips. */
  description: string
  /**
   * Approximate FX rate: 1 USD = `usdToHomeRate` home-currency units.
   * Used by aggregate portfolio AUM tiles to convert USD-denominated
   * balances into the active market's currency for total-balance rollups.
   * Stale-but-plausible is fine for a demo — no live FX integration.
   */
  usdToHomeRate: number
}

export const MARKET_CONFIG: Record<Market, MarketConfig> = {
  default: {
    slug: "default",
    label: "United Arab Emirates",
    shortLabel: "UAE",
    flag: "🇦🇪",
    currency: "AED",
    locale: "en-AE",
    country: "the UAE",
    description: "UAE retail and business banking, AED-denominated.",
    usdToHomeRate: 3.67, // AED is pegged at ~3.67 per USD
  },
  kenya: {
    slug: "kenya",
    label: "Kenya",
    shortLabel: "KE",
    flag: "🇰🇪",
    currency: "KES",
    locale: "en-KE",
    country: "Kenya",
    description: "Kenyan retail and SME banking, KES-denominated with M-Pesa linkage.",
    usdToHomeRate: 130, // KES ~130 per USD (mid-2026 demo baseline)
  },
}

/**
 * Default (and currently only) market. The demo runs Kenya-only — the market
 * switcher has been removed from the UI, so every session resolves to Kenyan
 * personas (Wanjiru, Peter Mwangi, etc.) in KES. The `default`/UAE config is
 * retained in the registry but is no longer selectable.
 */
export const DEFAULT_MARKET: Market = "kenya"

/**
 * localStorage key reserved for the active market.
 *
 * Currently unused — `MarketProvider` deliberately does NOT persist market
 * choice so every fresh page load defaults to UAE for predictable demo
 * starts. Kept exported in case a future build wants opt-in persistence
 * (e.g. an admin toggle).
 */
export const MARKET_STORAGE_KEY = "banking-agent-active-market"

/**
 * Type guard: narrow an arbitrary string to a valid Market slug.
 * Safe to call on untrusted input from localStorage / query params.
 */
export function isMarket(value: unknown): value is Market {
  return typeof value === "string" && (MARKETS as readonly string[]).includes(value)
}

/** Convenience accessor — never throws, falls back to default config. */
export function getMarketConfig(market: Market): MarketConfig {
  return MARKET_CONFIG[market] ?? MARKET_CONFIG[DEFAULT_MARKET]
}
