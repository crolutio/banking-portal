"use client"

import { Globe, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMarket } from "@/lib/market-context"
import { MARKETS, MARKET_CONFIG, type Market } from "@/lib/markets"

/**
 * Subtle market switcher.
 *
 * Visual intent: looks like a region/locale indicator (small Globe icon
 * with the country's flag chip overlaid), not a "demo data swap" button.
 * Reviewers and customers see a quiet indicator; demo operators recognize
 * the affordance and click it.
 *
 * On switch we router.refresh() so server components re-fetch under the new
 * market. Client components that read useMarket() re-render automatically.
 */
export function MarketSwitcher() {
  const router = useRouter()
  const { market, config, setMarket, isHydrated } = useMarket()

  const handleSelect = (next: Market) => {
    if (next === market) return
    setMarket(next)
    // Force server components to re-fetch with the new market.
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9"
          aria-label={`Active market: ${config.label}`}
          title={`Market: ${config.label}`}
        >
          <Globe className="h-4 w-4" />
          {isHydrated && (
            <span
              aria-hidden
              className="absolute -bottom-0.5 -right-0.5 text-[11px] leading-none drop-shadow-sm"
            >
              {config.flag}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          Demo market
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {MARKETS.map((slug) => {
          const cfg = MARKET_CONFIG[slug]
          const isActive = slug === market
          return (
            <DropdownMenuItem
              key={slug}
              onClick={() => handleSelect(slug)}
              className="flex items-center gap-3 py-2"
            >
              <span className="text-base leading-none" aria-hidden>
                {cfg.flag}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-tight">
                  {cfg.label}
                </p>
                <p className="text-[11px] text-muted-foreground leading-tight">
                  {cfg.currency} · {cfg.locale}
                </p>
              </div>
              {isActive && <Check className="h-4 w-4 text-primary shrink-0" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
