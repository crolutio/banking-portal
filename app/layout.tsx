import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { RoleProvider } from "@/lib/role-context"
import { ThemeProvider } from "@/components/theme-provider"
import { FloatingChatProvider } from "@/components/ai/floating-chat-context"
import { FloatingChatBubble } from "@/components/ai/floating-chat-bubble"
import "./globals.css"

export const metadata: Metadata = {
  title: "Etisalat Digital Banking",
  description: "Your accounts, cards, and payments in one secure place.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#E00800",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="bank-of-the-future-theme"
          disableTransitionOnChange
        >
          <RoleProvider>
            <FloatingChatProvider>
              {children}
              <FloatingChatBubble />
            </FloatingChatProvider>
          </RoleProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
