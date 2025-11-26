"use client"

import { useRole, isCustomer } from "@/lib/role-context"
import { CustomerDashboard } from "@/components/dashboards/customer-dashboard"
import { RMDashboard } from "@/components/dashboards/rm-dashboard"
import { RiskDashboard } from "@/components/dashboards/risk-dashboard"

export default function HomePage() {
  const { currentRole } = useRole()

  if (isCustomer(currentRole)) {
    return <CustomerDashboard />
  }

  if (currentRole === "relationship_manager") {
    return <RMDashboard />
  }

  if (currentRole === "risk_compliance" || currentRole === "admin") {
    return <RiskDashboard />
  }

  return <CustomerDashboard />
}
