/**
 * Avatar URL resolver.
 *
 * Priority:
 *   1. Hand-curated portrait files in `/public` for known demo user IDs
 *      (the four photos shipped with the repo).
 *   2. Deterministic DiceBear illustration, seeded by the user's UUID so the
 *      same person always gets the same portrait across reloads.
 *
 * This way our spotlight clients (Sarah, Mohammed) and roles (RM, Admin) get
 * realistic photos, while every other user still gets a stable, recognizable
 * illustrated avatar without committing a placeholder image.
 */

const DICEBEAR_BASE = "https://api.dicebear.com/9.x"
const DEFAULT_STYLE = "personas"

const PORTRAIT_BY_ID: Record<string, string> = {
  // Sarah Chen — Premium retail customer (spotlight)
  "4e140685-8f38-49ff-aae0-d6109c46873d": "/professional-admin-portrait.png",
  // James Rodriguez — Relationship Manager
  "51880b1d-3935-49dd-bac6-9469d33d3ee3": "/professional-banker-portrait.jpg",
  // David Kim — Risk & Compliance
  "2be06428-7933-41f5-a426-f27478e75c1c": "/professional-man-portrait.png",
  // System Administrator
  "730b0c66-1feb-432a-9718-e3a9755eea7b": "/professional-woman-compliance.jpg",
}

export interface AvatarOptions {
  style?: string
  backgroundColor?: string[]
  size?: number
}

export function getAvatarUrl(seed: string, opts: AvatarOptions = {}): string {
  const curated = PORTRAIT_BY_ID[seed]
  if (curated) return curated

  const style = opts.style ?? DEFAULT_STYLE
  const params = new URLSearchParams({ seed: seed || "default" })

  if (opts.backgroundColor && opts.backgroundColor.length > 0) {
    params.set("backgroundColor", opts.backgroundColor.join(","))
  }
  if (opts.size) {
    params.set("size", String(opts.size))
  }

  return `${DICEBEAR_BASE}/${style}/svg?${params.toString()}`
}

/**
 * Resolves a final avatar URL with a DiceBear fallback when the source is
 * missing or just the generic placeholder we seed everywhere by default.
 */
export function resolveAvatarUrl(
  sourceUrl: string | null | undefined,
  fallbackSeed: string,
  opts: AvatarOptions = {},
): string {
  if (!sourceUrl) return getAvatarUrl(fallbackSeed, opts)
  if (sourceUrl.includes("placeholder.svg")) {
    return getAvatarUrl(fallbackSeed, opts)
  }
  return sourceUrl
}
