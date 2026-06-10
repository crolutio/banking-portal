"use client"

import { useState, type ComponentProps } from "react"
import { Button } from "@/components/ui/button"
import { OutreachDialog } from "@/components/rm/outreach-dialog"
import { PenLine } from "lucide-react"

/**
 * A Button that opens the AI OutreachDialog (streams a draft from
 * /api/rm-draft-outreach). Reused on Today, Retention, and the 360 header so the
 * "Draft outreach" affordance is wired the same way everywhere.
 */
export function DraftOutreachButton({
  clientId,
  clientName,
  opportunity,
  label = "Draft outreach",
  variant = "outline",
  size = "sm",
  className,
}: {
  clientId: string
  clientName: string
  /** Seed context for the draft — the concern/opportunity to write around. */
  opportunity: string
  label?: string
  variant?: ComponentProps<typeof Button>["variant"]
  size?: ComponentProps<typeof Button>["size"]
  className?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={() => setOpen(true)}>
        <PenLine className="h-3.5 w-3.5" /> {label}
      </Button>
      <OutreachDialog
        open={open}
        onOpenChange={setOpen}
        clientId={clientId}
        clientName={clientName}
        opportunity={opportunity}
      />
    </>
  )
}
