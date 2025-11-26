// Utility functions for formatting

export function formatCurrency(amount: number, currency = "AED"): string {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-AE").format(num)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-AE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat("en-AE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diffMs / (1000 * 60))

  if (diffMinutes < 60) return `${diffMinutes}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(date)
}

export function formatAccountNumber(accountNumber: string, masked = true): string {
  if (masked) {
    return "••••" + accountNumber.slice(-4)
  }
  return accountNumber
}

export function formatCardNumber(lastFour: string): string {
  return `•••• •••• •••• ${lastFour}`
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`
}

export function maskPII(text: string, type: "email" | "phone" | "name" | "account"): string {
  switch (type) {
    case "email":
      const [local, domain] = text.split("@")
      return `${local.slice(0, 2)}***@${domain}`
    case "phone":
      return `***-***-${text.slice(-4)}`
    case "name":
      const parts = text.split(" ")
      return parts.map((p, i) => (i === 0 ? p : p[0] + "***")).join(" ")
    case "account":
      return `****${text.slice(-4)}`
    default:
      return text
  }
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    groceries: "bg-emerald-500/20 text-emerald-400",
    restaurants: "bg-orange-500/20 text-orange-400",
    shopping: "bg-pink-500/20 text-pink-400",
    entertainment: "bg-purple-500/20 text-purple-400",
    utilities: "bg-blue-500/20 text-blue-400",
    transport: "bg-yellow-500/20 text-yellow-400",
    healthcare: "bg-red-500/20 text-red-400",
    travel: "bg-cyan-500/20 text-cyan-400",
    transfer: "bg-indigo-500/20 text-indigo-400",
    salary: "bg-green-500/20 text-green-400",
    investment: "bg-teal-500/20 text-teal-400",
    fees: "bg-gray-500/20 text-gray-400",
    other: "bg-gray-500/20 text-gray-400",
  }
  return colors[category] || colors.other
}

export function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    critical: "bg-red-500/20 text-red-400 border-red-500/30",
  }
  return colors[severity] || colors.low
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: "bg-emerald-500/20 text-emerald-400",
    open: "bg-yellow-500/20 text-yellow-400",
    investigating: "bg-blue-500/20 text-blue-400",
    resolved: "bg-emerald-500/20 text-emerald-400",
    escalated: "bg-red-500/20 text-red-400",
    closed: "bg-gray-500/20 text-gray-400",
    pending: "bg-yellow-500/20 text-yellow-400",
    completed: "bg-emerald-500/20 text-emerald-400",
    failed: "bg-red-500/20 text-red-400",
    frozen: "bg-blue-500/20 text-blue-400",
  }
  return colors[status] || colors.pending
}
