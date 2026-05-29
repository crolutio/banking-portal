/**
 * Persona ID Mapping
 *
 * Two coexisting shapes:
 *
 *   1. CUSTOMER_IDS (legacy flat map by display name)
 *      Preserved for back-compat. Existing code that grabs a UAE persona
 *      by name (e.g. `CUSTOMER_IDS["Sarah Chen"]`) keeps working unchanged.
 *
 *   2. PERSONA_IDS[market][role] (new, market-aware)
 *      The structured form used by role resolution. Each market has exactly
 *      one persona per role plus optional secondary "_b" customers used in
 *      multi-customer demo flows.
 *
 * The single source of truth for persona UUIDs lives below. CUSTOMER_IDS
 * is derived from PERSONA_IDS.default so the two never drift.
 */

import type { Market } from "./markets"

/** Roles we resolve to a concrete persona per market. */
export type DemoRole =
  | "retail_customer"        // primary retail persona (UAE: Sarah, Kenya: Wanjiru)
  | "retail_customer_b"      // secondary retail persona (UAE: Mohammed, Kenya: Otieno)
  | "relationship_manager"   // RM (UAE: James, Kenya: Peter)
  | "risk_compliance"        // Risk & Compliance (UAE: David, Kenya: Grace)
  | "admin"                  // System Administrator (UAE: Sysadmin, Kenya: Njeri)

/**
 * Per-market persona table. Add a new market by adding a new top-level key
 * and seeding the corresponding `market = '<slug>'` rows in Supabase.
 */
export const PERSONA_IDS: Record<Market, Record<DemoRole, string>> = {
  default: {
    retail_customer:      "4e140685-8f38-49ff-aae0-d6109c46873d", // Sarah Chen
    retail_customer_b:    "22222222-2222-2222-2222-222222222222", // Mohammed Ali
    relationship_manager: "51880b1d-3935-49dd-bac6-9469d33d3ee3", // James Rodriguez
    risk_compliance:      "2be06428-7933-41f5-a426-f27478e75c1c", // David Kim
    admin:                "730b0c66-1feb-432a-9718-e3a9755eea7b", // System Administrator
  },
  kenya: {
    retail_customer:      "11ce0001-0001-4001-a001-000000000001", // Wanjiru Kamau
    retail_customer_b:    "11ce0002-0002-4002-a002-000000000002", // Otieno Ouma
    relationship_manager: "11ce0003-0003-4003-a003-000000000003", // Peter Mwangi
    risk_compliance:      "11ce0004-0004-4004-a004-000000000004", // Grace Wanjiku
    admin:                "11ce0005-0005-4005-a005-000000000005", // Njeri Otieno
  },
}

/**
 * Resolve a persona UUID for a given (market, role) pair. Always returns
 * a valid string for the canonical roles defined in DemoRole.
 */
export function getPersonaId(market: Market, role: DemoRole): string {
  return PERSONA_IDS[market]?.[role] ?? PERSONA_IDS.default[role]
}

/**
 * Legacy display-name → UUID map. Kept for backwards compatibility with
 * code that hardcodes a persona by name. Prefer PERSONA_IDS for new code.
 */
export const CUSTOMER_IDS = {
  // UAE personas (also accessible by display name)
  "Sarah Chen":            PERSONA_IDS.default.retail_customer,
  "Mohammed Ali":          PERSONA_IDS.default.retail_customer_b,
  "James Rodriguez":       PERSONA_IDS.default.relationship_manager,
  "David Kim":             PERSONA_IDS.default.risk_compliance,
  "System Administrator":  PERSONA_IDS.default.admin,

  // Kenya personas (also accessible by display name)
  "Wanjiru Kamau":         PERSONA_IDS.kenya.retail_customer,
  "Otieno Ouma":           PERSONA_IDS.kenya.retail_customer_b,
  "Peter Mwangi":          PERSONA_IDS.kenya.relationship_manager,
  "Grace Wanjiku":         PERSONA_IDS.kenya.risk_compliance,
  "Njeri Otieno":          PERSONA_IDS.kenya.admin,

  // Additional UAE customers from database (unchanged, used elsewhere)
  "Aisha Al-Farsi":   "33ec752e-c91d-45a6-a572-33ccae68dca5",
  "Carlos Rodriguez": "28b23c5a-9aa5-40c3-ac6f-6ec247ef862d",
  "Chen Wei":         "6c165fda-1c9b-4fae-81e1-009bbf83e3b2",
  "Elena Petrova":    "ecf771d5-0596-4bd9-9396-df32134d8479",
  "Juan Perez":       "ad1988d9-7ffb-4780-b5ca-30b9a6a27761",
  "Maria Gonzalez":   "171bbf16-0325-4519-a23e-c46ec8e2c614",
  "Omar Al-Sayed":    "617d19d8-fb2c-40f3-89f5-df066098224a",
  "Priya Nair":       "f22f4bcf-9e02-4862-b110-f815ca281c7b",
  "Sofia Martinez":   "e19c619c-f21f-4cb3-91ad-c9b8052fe918",
} as const

/** Get customer ID by display name. */
export function getCustomerId(name: string): string | undefined {
  return CUSTOMER_IDS[name as keyof typeof CUSTOMER_IDS]
}

/** Get customer display name by ID. Finds across all markets. */
export function getCustomerName(id: string): string | undefined {
  return Object.entries(CUSTOMER_IDS).find(([, customerId]) => customerId === id)?.[0]
}

/**
 * Default demo user ID. Kept pointing at Sarah Chen so existing callers
 * that import this constant keep their UAE behavior. Market-aware callers
 * should use `getPersonaId(market, 'retail_customer')` instead.
 */
export const DEFAULT_USER_ID = CUSTOMER_IDS["Sarah Chen"]
