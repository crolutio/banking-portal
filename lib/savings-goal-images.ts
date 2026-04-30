import type { SavingsGoalCategory } from "@/lib/types"

/** Old stock paths from seeds / DB before custom art in /public */
const LEGACY_IMAGE_URL: Record<string, string> = {
  "/maldives-beach-resort-tropical-paradise.jpg": "/japan.webp",
  "/macbook-pro-laptop-sleek-modern.jpg": "/macbook-pro.jpg",
  "/safety-umbrella-protection-financial-security.jpg": "/emergency.webp",
  "/wedding-celebration-rings-romantic.jpg": "/wedding.jpg",
}

/**
 * Resolves the hero image for a savings goal. Supabase stores `image_url`; seeds often
 * still point at removed stock assets — we remap those and match your custom files by name/category.
 */
export function resolveSavingsGoalImageUrl(
  name: string,
  category: SavingsGoalCategory,
  imageUrlFromDb: string | null | undefined,
): string {
  const raw = (imageUrlFromDb ?? "").trim()
  const normalized = raw.startsWith("/") ? raw : raw ? `/${raw}` : ""
  if (normalized && LEGACY_IMAGE_URL[normalized]) {
    return LEGACY_IMAGE_URL[normalized]
  }

  const n = name.trim().toLowerCase()
  if (n.includes("japan") || n.includes("maldives")) return "/japan.webp"
  if (n.includes("macbook")) return "/macbook-pro.jpg"
  if (n.includes("emergency")) return "/emergency.webp"
  if (n.includes("wedding")) return "/wedding.jpg"

  if (!normalized) {
    if (category === "emergency") return "/emergency.webp"
    if (category === "wedding") return "/wedding.jpg"
  }

  return normalized
}
