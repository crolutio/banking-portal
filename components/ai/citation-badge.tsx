import type React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FileText, Database, BookOpen, ScrollText, Users, ShieldCheck } from "lucide-react"
import type { Citation } from "@/lib/types"

const citationIcons: Record<Citation["type"], React.ElementType> = {
  account_ledger: Database,
  policy: FileText,
  product_terms: BookOpen,
  transaction_history: ScrollText,
  crm_notes: Users,
  risk_rules: ShieldCheck,
}

const citationLabels: Record<Citation["type"], string> = {
  account_ledger: "Account Ledger",
  policy: "Policy",
  product_terms: "Product Terms",
  transaction_history: "Transactions",
  crm_notes: "CRM Notes",
  risk_rules: "Risk Rules",
}

interface CitationBadgeProps {
  citation?: Citation
  source?: string
  type?: Citation["type"]
  excerpt?: string
  className?: string
}

export function CitationBadge({ citation, source, type, excerpt, className }: CitationBadgeProps) {
  // Support both usage patterns: citation object or individual props
  const resolvedType = citation?.type ?? type ?? "policy"
  const resolvedSource = citation?.source ?? source ?? "Source"
  const resolvedExcerpt = citation?.excerpt ?? excerpt

  const Icon = citationIcons[resolvedType]

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className={cn(
              "gap-1.5 py-1 px-2 text-xs font-normal cursor-help",
              "bg-primary/5 border-primary/20 text-primary hover:bg-primary/10",
              className,
            )}
          >
            <Icon className="h-3 w-3" />
            {resolvedSource}
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-1">
            <p className="font-medium">{citationLabels[resolvedType]}</p>
            {resolvedExcerpt && <p className="text-xs text-muted-foreground">&ldquo;{resolvedExcerpt}&rdquo;</p>}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface DataUsedBadgesProps {
  dataUsed: string[]
  className?: string
}

export function DataUsedBadges({ dataUsed, className }: DataUsedBadgesProps) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {dataUsed.map((data, index) => (
        <Badge key={index} variant="secondary" className="text-xs font-normal py-0.5 px-2 bg-muted/50">
          {data}
        </Badge>
      ))}
    </div>
  )
}

interface ConfidenceIndicatorProps {
  confidence: "high" | "medium" | "low"
  className?: string
}

export function ConfidenceIndicator({ confidence, className }: ConfidenceIndicatorProps) {
  const colors = {
    high: "bg-emerald-500",
    medium: "bg-yellow-500",
    low: "bg-orange-500",
  }

  const labels = {
    high: "High Confidence",
    medium: "Medium Confidence",
    low: "Low Confidence",
  }

  return (
    <div className={cn("flex items-center gap-2 text-xs text-muted-foreground", className)}>
      <div className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "w-1.5 h-3 rounded-sm",
              i <= (confidence === "high" ? 2 : confidence === "medium" ? 1 : 0) ? colors[confidence] : "bg-muted",
            )}
          />
        ))}
      </div>
      <span>{labels[confidence]}</span>
    </div>
  )
}
