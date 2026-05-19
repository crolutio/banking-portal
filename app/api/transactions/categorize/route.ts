import { NextResponse } from "next/server"
import { createDirectClient } from "@/lib/supabase/direct-client"
import { inferCategory } from "@/lib/transactions/categorize"

export async function POST() {
  const supabase = createDirectClient()

  const { data, error } = await supabase
    .from("transactions")
    .select(
      "id, description, merchant, category, category_source, category_confidence, amount, date",
    )
    .order("date", { ascending: false })
    .limit(500)

  if (error) {
    console.error("[categorize] Failed to fetch transactions", error.message)
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }

  const updates: any[] = []

  for (const tx of data ?? []) {
    const currentConfidence = Number(tx.category_confidence ?? 0)
    const shouldReclassify =
      !tx.category ||
      tx.category.trim() === "" ||
      tx.category_source === "seed" ||
      (tx.category_source === "auto_rule" && currentConfidence < 0.75)

    if (!shouldReclassify) continue

    const result = inferCategory({
      description: tx.description,
      merchant: tx.merchant,
      amount: typeof tx.amount === "number" ? tx.amount : Number(tx.amount),
    })

    if (!result.category) continue

    if (tx.category === result.category && currentConfidence >= result.confidence) continue

    updates.push({
      id: tx.id,
      category: result.category,
      category_source: "auto_rule",
      category_confidence: result.confidence,
      category_reason: result.reason,
    })
  }

  if (updates.length === 0) {
    return NextResponse.json({ processed: data?.length ?? 0, updated: 0 })
  }

  for (const update of updates) {
    const { id, ...fields } = update
    const { error: updateError } = await supabase.from("transactions").update(fields).eq("id", id)
    if (updateError) {
      console.error("[categorize] Failed to update transaction", updateError.message)
      return NextResponse.json({ error: "Failed to update categories" }, { status: 500 })
    }
  }

  return NextResponse.json({
    processed: data?.length ?? 0,
    updated: updates.length,
  })
}

