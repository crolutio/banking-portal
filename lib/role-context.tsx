"use client"

import { createContext, useContext, useCallback, useMemo, type ReactNode } from "react"
import type { UserRole, User } from "./types"
import { PERSONA_IDS, type DemoRole } from "./customer-ids"
import { users } from "./mock-data"
import { useMarket } from "./market-context"
import type { Market } from "./markets"

interface RoleContextType {
  currentRole: UserRole
  currentUser: User
  /**
   * UUID used to query the **banking** Supabase project for the active
   * persona. For retail customers this is also the call-center customer ID
   * (we mirror them). For staff roles (RM/Risk/Admin) the banking and
   * call-center IDs are the same — they reuse the profile UUID.
   */
  currentBankingUserId: string
  /**
   * UUID used to query the **call center** Supabase project. Mirrors
   * `currentBankingUserId` by design — the 1:1 ID convention keeps
   * cross-DB joins straightforward.
   */
  currentCallCenterUserId: string
  setRole: (role: UserRole) => void
  availableRoles: { role: UserRole; label: string; user: User }[]
}

const roleLabels: Record<UserRole, string> = {
  retail_customer: "Retail Customer",
  relationship_manager: "Relationship Manager",
  risk_compliance: "Risk & Compliance",
  admin: "Admin",
}

/** UserRole values that map 1:1 to a DemoRole in PERSONA_IDS. */
const roleToDemoRole: Record<UserRole, DemoRole> = {
  retail_customer: "retail_customer",
  relationship_manager: "relationship_manager",
  risk_compliance: "risk_compliance",
  admin: "admin",
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

/** Resolve a User object for a given (market, role) tuple. */
function resolveUser(market: Market, role: UserRole): User {
  const id = PERSONA_IDS[market][roleToDemoRole[role]]
  const user = users.find((u) => u.id === id)
  if (user) return user
  // Last-resort fallback: avoid throwing during a render, surface the issue
  // via a synthetic placeholder. Real fix is to add the persona to mock-data.ts.
  return {
    id,
    name: `Unknown ${role}`,
    email: `${role}@unknown.local`,
    role,
    avatar: "/placeholder.svg",
    createdAt: "1970-01-01",
  } as User
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const { market } = useMarket()
  // RM-only build: the role is locked to relationship_manager. The persona
  // switcher and the other dashboards are not exposed on this branch.
  const currentRole: UserRole = "relationship_manager"

  const currentUser = useMemo(() => resolveUser(market, currentRole), [market, currentRole])
  const currentBankingUserId = currentUser.id
  // Call-center IDs mirror banking IDs by convention.
  const currentCallCenterUserId = currentUser.id

  // No-op: role is locked to RM on this build.
  const setRole = useCallback((_role: UserRole) => {}, [])

  /**
   * Personas surfaced in the role-switcher dropdown — always reflects the
   * active market's persona pool, so switching market then opening the
   * dropdown shows Wanjiru / Peter / Grace / Njeri instead of Sarah / James
   * / David / Sysadmin (and vice-versa).
   */
  const availableRoles = useMemo(
    () =>
      (Object.keys(roleLabels) as UserRole[]).map((role) => ({
        role,
        label: roleLabels[role],
        user: resolveUser(market, role),
      })),
    [market],
  )

  return (
    <RoleContext.Provider
      value={{
        currentRole,
        currentUser,
        currentBankingUserId,
        currentCallCenterUserId,
        setRole,
        availableRoles,
      }}
    >
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const context = useContext(RoleContext)
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider")
  }
  return context
}

// Permission helpers
export function canAccessRMWorkspace(role: UserRole): boolean {
  return role === "relationship_manager"
}

export function canAccessRiskCompliance(role: UserRole): boolean {
  return role === "risk_compliance" || role === "admin"
}

export function canAccessAdminConsole(role: UserRole): boolean {
  return role === "admin"
}

export function canAccessAuditLog(role: UserRole): boolean {
  return role === "risk_compliance" || role === "admin"
}

export function isCustomer(role: UserRole): boolean {
  return role === "retail_customer"
}
