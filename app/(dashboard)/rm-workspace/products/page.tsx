"use client"

import { useEffect, useMemo, useState } from "react"
import { useRole } from "@/lib/role-context"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  BarChart3,
  Briefcase,
  Building2,
  Car,
  ChevronDown,
  ChevronUp,
  Coins,
  CreditCard,
  Gem,
  Globe,
  Home,
  Landmark,
  Leaf,
  LineChart,
  Loader2,
  Package,
  PieChart,
  PiggyBank,
  Plane,
  RefreshCcw,
  ScrollText,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Vault,
  Wallet,
  type LucideIcon,
} from "lucide-react"

type Product = {
  id: string
  name: string
  description: string
  category: string | null
  icon: string | null
  tagline: string | null
  min_amount: number | null
  max_amount: number | null
  rate_pct: number | null
  term_label: string | null
  key_features: string[] | null
  target_segment: string | null
}

const ICON_MAP: Record<string, LucideIcon> = {
  BarChart3,
  Briefcase,
  Building2,
  Car,
  Coins,
  CreditCard,
  Gem,
  Globe,
  Home,
  Landmark,
  Leaf,
  LineChart,
  Package,
  PieChart,
  PiggyBank,
  Plane,
  RefreshCcw,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Vault,
  Wallet,
}

type CategoryMeta = {
  label: string
  icon: LucideIcon
  description: string
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  loans: {
    label: "Loans",
    icon: Coins,
    description: "Personal, auto, and business financing",
  },
  mortgages: {
    label: "Mortgages",
    icon: Home,
    description: "Home purchase and refinance",
  },
  credit_lines: {
    label: "Credit Lines",
    icon: Wallet,
    description: "Revolving credit facilities",
  },
  cards: {
    label: "Credit Cards",
    icon: CreditCard,
    description: "Cashback, travel, and premium cards",
  },
  deposits: {
    label: "Savings & Deposits",
    icon: PiggyBank,
    description: "Earn returns on idle cash",
  },
  insurance: {
    label: "Insurance",
    icon: ShieldCheck,
    description: "Life and property protection",
  },
  investments: {
    label: "Investments",
    icon: LineChart,
    description: "Wealth-building products",
  },
}

const CATEGORY_ORDER = [
  "loans",
  "mortgages",
  "credit_lines",
  "cards",
  "deposits",
  "insurance",
  "investments",
]

function resolveIcon(name: string | null | undefined): LucideIcon {
  if (!name) return Package
  return ICON_MAP[name] ?? Package
}

function formatAmount(value: number | null): string {
  if (value === null || value === undefined) return ""
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`
  return value.toString()
}

function formatAmountRange(min: number | null, max: number | null): string | null {
  if (min === null && max === null) return null
  if (min !== null && max !== null) return `AED ${formatAmount(min)}–${formatAmount(max)}`
  if (min !== null) return `From AED ${formatAmount(min)}`
  if (max !== null) return `Up to AED ${formatAmount(max)}`
  return null
}

function groupByCategory(products: Product[]) {
  const groups: Record<string, Product[]> = {}
  for (const p of products) {
    const key = p.category && CATEGORY_META[p.category] ? p.category : "other"
    if (!groups[key]) groups[key] = []
    groups[key].push(p)
  }
  return groups
}

export default function ProductsPage() {
  const { currentRole } = useRole()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase
        .from("products")
        .select(
          "id, name, description, category, icon, tagline, min_amount, max_amount, rate_pct, term_label, key_features, target_segment",
        )
        .order("name")
      setProducts((data ?? []) as Product[])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return products
    const q = search.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.tagline?.toLowerCase().includes(q) ?? false) ||
        p.description.toLowerCase().includes(q),
    )
  }, [products, search])

  const grouped = useMemo(() => groupByCategory(filtered), [filtered])

  const orderedCategoryKeys = useMemo(() => {
    const keys = Object.keys(grouped)
    const known = CATEGORY_ORDER.filter((k) => keys.includes(k))
    const unknown = keys.filter((k) => !CATEGORY_ORDER.includes(k))
    return [...known, ...unknown]
  }, [grouped])

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  if (currentRole !== "relationship_manager") {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">Access restricted to Relationship Managers.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Product Catalog</h1>
          <p className="text-muted-foreground">
            {products.length} products across {Object.keys(CATEGORY_META).length} categories
          </p>
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, tagline, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Package className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground">
              {search ? "No products match your search." : "No products available."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {orderedCategoryKeys.map((categoryKey) => {
            const list = grouped[categoryKey]
            if (!list || list.length === 0) return null
            const meta =
              CATEGORY_META[categoryKey] ?? {
                label: "Other",
                icon: Package,
                description: "Uncategorized products",
              }
            const CategoryIcon = meta.icon
            return (
              <section key={categoryKey} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
                    <CategoryIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold">{meta.label}</h2>
                      <Badge variant="secondary" className="text-xs">
                        {list.length}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{meta.description}</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {list.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      expanded={expanded.has(product.id)}
                      onToggle={() => toggleExpanded(product.id)}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}

function ProductCard({
  product,
  expanded,
  onToggle,
}: {
  product: Product
  expanded: boolean
  onToggle: () => void
}) {
  const Icon = resolveIcon(product.icon)
  const amountRange = formatAmountRange(product.min_amount, product.max_amount)
  const hasMetrics = product.rate_pct !== null || amountRange || product.term_label

  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex-1 p-4 space-y-3">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-md bg-primary/10 text-primary shrink-0">
            <Icon className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold leading-tight">{product.name}</h3>
            {product.tagline && (
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                {product.tagline}
              </p>
            )}
          </div>
          {product.target_segment && (
            <Badge variant="outline" className="text-[10px] shrink-0">
              {product.target_segment}
            </Badge>
          )}
        </div>

        {hasMetrics && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs border-y py-2">
            {product.rate_pct !== null && (
              <div>
                <span className="font-semibold text-primary">{product.rate_pct}%</span>
                <span className="text-muted-foreground ml-1">rate</span>
              </div>
            )}
            {amountRange && (
              <div className="text-muted-foreground">
                <span className="font-medium text-foreground">{amountRange}</span>
              </div>
            )}
            {product.term_label && (
              <div className="text-muted-foreground">
                <span className="font-medium text-foreground">{product.term_label}</span>
              </div>
            )}
          </div>
        )}

        {product.key_features && product.key_features.length > 0 && (
          <ul className="space-y-1">
            {product.key_features.slice(0, 5).map((feature, idx) => (
              <li key={idx} className="text-xs flex items-start gap-2 leading-snug">
                <span className="text-primary mt-0.5">›</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {expanded && (
          <div className="text-xs text-muted-foreground leading-relaxed border-t pt-3">
            {product.description}
          </div>
        )}
      </CardContent>
      <div className="px-4 pb-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="w-full justify-center text-xs h-8"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3 w-3 mr-1" /> Hide details
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3 mr-1" /> Details
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}
