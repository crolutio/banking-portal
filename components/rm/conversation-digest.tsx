"use client"

import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
  AlertCircle,
  CalendarDays,
  Headphones,
  MessageSquare,
  Ticket,
  TrendingUp,
} from "lucide-react"
import type { ConversationDigest as Digest } from "@/lib/rm/client-briefings"

const SENTIMENT_STYLES: Record<string, string> = {
  positive:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900",
  neutral:
    "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900",
  negative:
    "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-900",
  mixed:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900",
}

const SENTIMENT_LABELS: Record<string, string> = {
  positive: "Positive tone",
  neutral: "Neutral tone",
  negative: "Tone needs attention",
  mixed: "Mixed signals",
}

export function ConversationDigest({ digest }: { digest: Digest }) {
  const hasConversations = digest.total_count > 0
  const sentimentClass =
    SENTIMENT_STYLES[digest.sentiment_trend] ?? SENTIMENT_STYLES.neutral
  const sentimentLabel =
    SENTIMENT_LABELS[digest.sentiment_trend] ?? digest.sentiment_trend

  if (!hasConversations) {
    return (
      <div className="rounded-lg border border-dashed p-4 flex items-center gap-3 text-sm text-muted-foreground">
        <MessageSquare className="h-4 w-4 shrink-0" />
        No conversations on file in the last 90 days.
      </div>
    )
  }

  const SentimentBadge = (
    <Badge
      variant="outline"
      className={cn("text-[10px] gap-1 cursor-help", sentimentClass)}
    >
      <TrendingUp className="h-3 w-3" />
      {sentimentLabel}
    </Badge>
  )

  return (
    <div className="rounded-lg border bg-card">
      {/* Header — self-introducing title + scope + sentiment */}
      <div className="px-4 py-3 border-b">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="h-4 w-4 text-primary shrink-0" />
              <h3 className="text-sm font-semibold">
                What this client has been telling us
              </h3>
              <Badge
                variant="outline"
                className="text-[10px] gap-1 font-normal text-muted-foreground"
              >
                <CalendarDays className="h-2.5 w-2.5" />
                Last 90 days
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground">
                {digest.total_count}
              </span>{" "}
              interaction{digest.total_count === 1 ? "" : "s"} across support
              tickets and the contact center
              {digest.open_count > 0 && (
                <>
                  {" "}
                  ·{" "}
                  <span className="font-medium text-amber-700 dark:text-amber-400">
                    {digest.open_count} still unresolved
                  </span>
                </>
              )}
            </p>
          </div>
          {digest.sentiment_reason ? (
            <TooltipProvider delayDuration={150}>
              <Tooltip>
                <TooltipTrigger asChild>{SentimentBadge}</TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  {digest.sentiment_reason}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            SentimentBadge
          )}
        </div>

        {/* Channel source breakdown */}
        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Ticket className="h-3 w-3" />
            {digest.tickets_count} support ticket
            {digest.tickets_count === 1 ? "" : "s"}
          </span>
          <span className="text-muted-foreground/40">·</span>
          <span className="inline-flex items-center gap-1">
            <Headphones className="h-3 w-3" />
            {digest.contact_center_count} contact-center conversation
            {digest.contact_center_count === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      {digest.recent_topics.length > 0 && (
        <div className="px-4 py-3 border-b">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">
            What they've been asking about
          </p>
          <ul className="space-y-1.5">
            {digest.recent_topics.slice(0, 3).map((topic, idx) => (
              <li key={idx} className="text-xs flex items-start gap-2">
                <span className="text-muted-foreground mt-0.5">•</span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {digest.open_requests.length > 0 && (
        <div className="px-4 py-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-b-lg">
          <p className="text-[11px] uppercase tracking-wide text-amber-700 dark:text-amber-300 mb-2 flex items-center gap-1.5">
            <AlertCircle className="h-3 w-3" />
            Still awaiting follow-up ({digest.open_requests.length})
          </p>
          <ul className="space-y-1.5">
            {digest.open_requests.map((req, idx) => (
              <li key={idx} className="text-xs flex items-start gap-2">
                <span className="text-amber-700 dark:text-amber-300 mt-0.5">
                  ›
                </span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
