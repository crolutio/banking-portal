"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import {
  DEFAULT_MARKET,
  MARKET_CONFIG,
  type Market,
  type MarketConfig,
  getMarketConfig,
  isMarket,
} from "./markets"
import {
  formatCurrency as baseFormatCurrency,
  formatNumber as baseFormatNumber,
  formatDate as baseFormatDate,
  formatDateTime as baseFormatDateTime,
} from "./format"

interface MarketContextValue {
  /** The currently active market slug — always valid. */
  market: Market
  /** Full config for the active market (label, flag, currency, locale, …). */
  config: MarketConfig
  /** Switch markets for the current browser session (not persisted). */
  setMarket: (next: Market) => void
  /** True once the provider has mounted on the client (used to avoid SSR-only UI flashes). */
  isHydrated: boolean
}

const MarketContext = createContext<MarketContextValue | undefined>(undefined)

/**
 * Top-level provider that keeps the active market in sync across the app.
 *
 * Persistence model — by design:
 *   - Every full page load (browser refresh, dev-server restart, fresh tab)
 *     starts on DEFAULT_MARKET (UAE). This keeps demos reproducible: the
 *     presenter always opens to the canonical Sarah Chen / James Rodriguez
 *     story and chooses when to switch to Kenya.
 *   - Within a single session, the market switcher updates React state and
 *     persists across SPA navigation (because the provider stays mounted),
 *     but is intentionally NOT written to localStorage. A hard refresh
 *     resets to UAE.
 *   - `isHydrated` flips true on first client-side mount so components can
 *     guard against SSR-only UI (e.g. flag emoji) without flashing.
 */
export function MarketProvider({ children }: { children: ReactNode }) {
  const [market, setMarketState] = useState<Market>(DEFAULT_MARKET)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const setMarket = useCallback((next: Market) => {
    if (!isMarket(next)) return
    setMarketState(next)
  }, [])

  const value = useMemo<MarketContextValue>(
    () => ({
      market,
      config: getMarketConfig(market),
      setMarket,
      isHydrated,
    }),
    [market, setMarket, isHydrated],
  )

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>
}

/**
 * Hook for reading and switching the active market. Must be used inside a
 * <MarketProvider>. Throws a descriptive error otherwise so the missing-provider
 * bug is obvious during development.
 */
export function useMarket(): MarketContextValue {
  const ctx = useContext(MarketContext)
  if (!ctx) {
    throw new Error("useMarket must be used within a <MarketProvider>")
  }
  return ctx
}

/**
 * Re-export so consumers can import everything market-related from one module
 * if they prefer:
 *   import { useMarket, MARKET_CONFIG } from "@/lib/market-context"
 */
export { MARKET_CONFIG, type Market, type MarketConfig }


// ---------------------------------------------------------------------------
// Market-aware formatter hooks
// ---------------------------------------------------------------------------
//
// React components should prefer these over the bare functions in lib/format.ts.
// They bind the formatter to the active market's currency and locale so a
// callsite doesn't need to import market state and thread it through:
//
//   const fmt = useFormatCurrency()
//   <p>{fmt(account.balance)}</p>                // uses market currency
//   <p>{fmt(account.balance, account.currency)}</p> // override (e.g. USD wallet)
//
// Server components and non-React utilities should keep using the
// functions in lib/format.ts and pass currency/locale explicitly.

/**
 * Returns a currency formatter bound to the active market's currency and
 * locale. The returned function accepts an optional override currency for
 * per-callsite control (useful for FX wallets and multi-currency views).
 */
export function useFormatCurrency() {
  const { config } = useMarket()
  return useCallback(
    (amount: number, overrideCurrency?: string) =>
      baseFormatCurrency(amount, overrideCurrency ?? config.currency, config.locale),
    [config],
  )
}

/** Number formatter bound to the active market's locale. */
export function useFormatNumber() {
  const { config } = useMarket()
  return useCallback(
    (num: number) => baseFormatNumber(num, config.locale),
    [config],
  )
}

/** Date formatter bound to the active market's locale. */
export function useFormatDate() {
  const { config } = useMarket()
  return useCallback(
    (date: string | Date) => baseFormatDate(date, config.locale),
    [config],
  )
}

/** Date-time formatter bound to the active market's locale. */
export function useFormatDateTime() {
  const { config } = useMarket()
  return useCallback(
    (date: string | Date) => baseFormatDateTime(date, config.locale),
    [config],
  )
}
