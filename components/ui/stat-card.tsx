import type React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  description?: string
  trend?: { value: number; direction: "up" | "down" }
  icon?: React.ElementType
  className?: string
}

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  description,
  trend,
  icon: Icon,
  className,
}: StatCardProps) {
  const effectiveChange = trend?.value ?? change

  const getTrendIcon = () => {
    if (effectiveChange === undefined) return null
    if (effectiveChange > 0) return <TrendingUp className="h-3 w-3 text-emerald-500" />
    if (effectiveChange < 0) return <TrendingDown className="h-3 w-3 text-red-500" />
    return <Minus className="h-3 w-3 text-muted-foreground" />
  }

  const getTrendColor = () => {
    if (effectiveChange === undefined) return ""
    if (effectiveChange > 0) return "text-emerald-500"
    if (effectiveChange < 0) return "text-red-500"
    return "text-muted-foreground"
  }

  return (
    <Card className={cn("bg-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && !effectiveChange && !changeLabel && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {(effectiveChange !== undefined || changeLabel) && (
          <div className="flex items-center gap-1 mt-1">
            {getTrendIcon()}
            <span className={cn("text-xs", getTrendColor())}>
              {effectiveChange !== undefined && `${effectiveChange >= 0 ? "+" : ""}${effectiveChange}%`}
              {changeLabel && <span className="text-muted-foreground ml-1">{changeLabel}</span>}
              {description && <span className="text-muted-foreground ml-1">{description}</span>}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
