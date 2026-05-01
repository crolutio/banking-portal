import type React from "react"
import { cn } from "@/lib/utils"
import { Continuum } from "@/components/ui/continuum"

interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
  /** Show the e& Continuum line under the title (one per page section). */
  continuum?: boolean
}

export function PageHeader({
  title,
  description,
  children,
  className,
  continuum,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8", className)}>
      <div className="min-w-0 max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground text-balance">{title}</h1>
        {continuum && <Continuum className="mt-3 max-w-md" />}
        {description && (
          <p className="text-muted-foreground mt-3 text-pretty font-normal">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2 shrink-0">{children}</div>}
    </div>
  )
}
