/**
 * Customer ID Mapping
 * 
 * This file provides easy access to customer IDs for use in JSON payloads.
 * Maps customer names to their corresponding database IDs.
 */

export const CUSTOMER_IDS = {
  // Existing demo users
  "Sarah Chen": "4e140685-8f38-49ff-aae0-d6109c46873d",
  "Fatima Hassan": "e9c42918-fad4-422f-b4ba-24bb5943bb67",
  "James Rodriguez": "51880b1d-3935-49dd-bac6-9469d33d3ee3",
  "David Kim": "2be06428-7933-41f5-a426-f27478e75c1c",
  "System Administrator": "730b0c66-1feb-432a-9718-e3a9755eea7b",
  
  // Additional customers from database
  "Aisha Al-Farsi": "33ec752e-c91d-45a6-a572-33ccae68dca5",
  "Carlos Rodriguez": "28b23c5a-9aa5-40c3-ac6f-6ec247ef862d",
  "Chen Wei": "6c165fda-1c9b-4fae-81e1-009bbf83e3b2",
  "Elena Petrova": "ecf771d5-0596-4bd9-9396-df32134d8479",
  "Juan Perez": "ad1988d9-7ffb-4780-b5ca-30b9a6a27761",
  "Maria Gonzalez": "171bbf16-0325-4519-a23e-c46ec8e2c614",
  "Omar Al-Sayed": "617d19d8-fb2c-40f3-89f5-df066098224a",
  "Priya Nair": "f22f4bcf-9e02-4862-b110-f815ca281c7b",
  "Sofia Martinez": "e19c619c-f21f-4cb3-91ad-c9b8052fe918",
} as const

/**
 * Get customer ID by name
 */
export function getCustomerId(name: string): string | undefined {
  return CUSTOMER_IDS[name as keyof typeof CUSTOMER_IDS]
}

/**
 * Get customer name by ID
 */
export function getCustomerName(id: string): string | undefined {
  return Object.entries(CUSTOMER_IDS).find(([_, customerId]) => customerId === id)?.[0]
}

/**
 * Default demo user ID (Sarah Chen)
 */
export const DEFAULT_USER_ID = CUSTOMER_IDS["Sarah Chen"]
