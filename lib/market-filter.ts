/**
 * Market-scoping helpers for Supabase queries.
 *
 * Every persona/dataset table now carries a `market` column. To keep read
 * sites uniform — and to make the eventual scoping audit (Batch 5) a
 * mechanical change rather than a hand-tuned one — every Supabase select
 * for a market-bound table should pipe through `byMarket()`.
 *
 * Example:
 *   const { data } = await byMarket(
 *     supabase.from("transactions").select("*"),
 *     market,
 *   ).order("date", { ascending: false })
 *
 * `market` is intentionally REQUIRED. There is no implicit fallback to
 * 'default' — pass it explicitly from a server-side request body or from
 * the client-side useMarket() hook. This makes accidental cross-market
 * leakage a compile-time error rather than a quiet runtime bug.
 *
 * Tables currently covered (see scripts/add_market_column_*.sql):
 *   Banking DB:      profiles, customers, accounts, cards, loans,
 *                    transactions, support_tickets, support_messages, products
 *   Call center DB:  customers, conversations, messages
 */

import type { Market } from "./markets"

/**
 * Tables that we know carry a `market` column. Used by callers that want
 * to detect at lint/review time whether a given read should be scoped.
 *
 * Keep this in sync with the ALTER TABLE statements in
 * scripts/add_market_column_banking.sql and add_market_column_callcenter.sql.
 */
export const MARKET_SCOPED_TABLES = [
  // Banking DB
  "profiles",
  "customers",
  "accounts",
  "cards",
  "loans",
  "transactions",
  "support_tickets",
  "support_messages",
  "products",
  // Call center DB
  "conversations",
  "messages",
] as const

export type MarketScopedTable = (typeof MARKET_SCOPED_TABLES)[number]

/**
 * Apply a market filter to a Supabase query. Returns the same query (and the
 * same TypeScript type) so it can be chained with `.select`, `.order`,
 * `.limit`, `.single`, `.eq`, etc.
 *
 *   const q = byMarket(supabase.from("loans").select("*"), market)
 *   const { data } = await q.eq("customer_id", clientId)
 *
 * If you need to filter a JOINed table by an aliased column name, pass the
 * column explicitly:
 *
 *   byMarket(query, market, "transactions.market")
 *
 * Implementation note: we intentionally use an unconstrained generic plus an
 * internal `any` cast on the runtime call. A self-referential constraint
 * like `T extends MarketFilterable<T>` causes TS2589 "Type instantiation is
 * excessively deep" when the inferred Supabase `PostgrestFilterBuilder`
 * type is fed back into the constraint check. Preserving `T` end-to-end
 * keeps downstream chained calls fully type-safe while bypassing the deep
 * inference inside the helper itself.
 */
export function byMarket<T>(query: T, market: Market, column = "market"): T {
  return (query as unknown as { eq: (c: string, v: string) => T }).eq(column, market)
}

/**
 * Same as byMarket but optional — if `market` is undefined the query is
 * returned unmodified. Useful at the edges of the app (e.g. early in a
 * migration, or for routes that genuinely want to query across markets).
 *
 * Prefer the strict `byMarket` everywhere else.
 */
export function byMarketOptional<T>(
  query: T,
  market: Market | undefined,
  column = "market",
): T {
  if (!market) return query
  return (query as unknown as { eq: (c: string, v: string) => T }).eq(column, market)
}
