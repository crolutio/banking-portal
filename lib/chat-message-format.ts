/**
 * Normalizes assistant chat text for display: fixes glued list markers and
 * paragraph breaks so numbered lists and sentences don't run together.
 */
export function normalizeChatMessageDisplayText(text: string): string {
  if (!text) return ""

  return (
    text
      // "…: 1I have" / "…: 1Issued" → insert ". " after the list index
      .replace(/([:：])\s*(\d{1,2})([A-Z])(?=\s|[a-z])/g, "$1 $2. $3")
      // Normalize "1)" list markers from scenario prompts to the renderer's "1." format.
      .replace(/(^|\n)(\s*)(\d{1,2})\)\s+/gm, "$1$2$3. ")
      // Same at line start
      .replace(/(^|\n)(\s*)(\d{1,2})([A-Z])(?=\s|[a-z])/gm, "$1$2$3. $4")
      // Remove repeated lead-ins that sometimes get emitted as the first list item.
      .replace(
        /(following steps:\s*)1\.\s*I have\s+(?:(?:immediately|already)\s+)?(?:taken|completed)\s+(?:the\s+)?following steps(?:\s+to\s+[^.]+)?\.\s+/gi,
        "$1\n\n1. "
      )
      .replace(/(following steps:)(?!\s*\n\s*\n)\s*/gi, "$1\n\n")
      // Paragraph break before "2. Title" when it follows end punctuation + single space
      .replace(/([.!?]) (?=\d{1,2}\.\s+[A-Z])/g, "$1\n\n")
  )
}
