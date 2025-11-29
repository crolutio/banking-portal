"use client"

import { AIBankerChatInterface } from "@/components/ai/ai-banker-chat-interface"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function AIBankerPageContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || searchParams.get("scope") ? undefined : undefined
  
  // Construct a more complex initial message if scope is present? 
  // For now, let's just use 'q' parameter for the prompt.
  const prompt = searchParams.get("q") || undefined

  return (
    <div className="h-[calc(100vh-4rem)] p-4">
      <div className="h-full bg-background rounded-xl border shadow-sm overflow-hidden">
        <AIBankerChatInterface initialMessage={prompt} />
      </div>
    </div>
  )
}

export default function AIBankerPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AIBankerPageContent />
    </Suspense>
  )
}
