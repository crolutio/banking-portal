import * as React from "react"

import { cn } from "@/lib/utils"

/** e& Continuum — horizontal gradient (green → burgundy → brand red). Use at most once per section. */
export function Continuum({ className }: { className?: string }) {
  return (
    <div
      role="presentation"
      aria-hidden
      className={cn("continuum-bar h-[3px] w-full", className)}
    />
  )
}
