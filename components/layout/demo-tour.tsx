"use client"

import { useEffect } from "react"
import { driver, type Config } from "driver.js"
import "driver.js/dist/driver.css"

const REPLAY_EVENT = "rm:start-tour"

const TOUR_CONFIG: Config = {
  showProgress: true,
  smoothScroll: true,
  allowClose: true,
  // Show a Close (✕) button on every popover, alongside Back/Next, so the
  // tour can always be exited. ESC and clicking the overlay also dismiss it.
  showButtons: ["next", "previous", "close"],
  overlayColor: "rgba(2, 6, 23, 0.6)",
  nextBtnText: "Next",
  prevBtnText: "Back",
  doneBtnText: "Got it",
  steps: [
    {
      popover: {
        title: "Welcome 👋",
        description:
          "This is an <b>AI copilot for bank relationship managers</b>. You're exploring it as <b>Peter Mwangi</b>, an RM at NCBA Bank with 27 demo clients — all data is fictional. Here's a 30-second tour.",
      },
    },
    {
      element: '[data-tour="nav-today"]',
      popover: {
        title: "Today",
        description:
          "Your daily triage. The AI ranks your most pressing client work and gives you a morning briefing.",
        side: "right",
        align: "start",
      },
    },
    {
      element: '[data-tour="nav-atlas"]',
      popover: {
        title: "Atlas — your whole-book AI",
        description:
          'Ask anything across all your clients, by text or voice: "Who\'s about to churn?", "Where\'s my biggest opportunity?", or "Draft outreach for me."',
        side: "right",
        align: "start",
      },
    },
    {
      element: '[data-tour="nav-day-plan"]',
      popover: {
        title: "Day Plan",
        description: "An AI-built plan for today — who to call, when, and what to say.",
        side: "right",
        align: "start",
      },
    },
    {
      element: '[data-tour="nav-clients"]',
      popover: {
        title: "Clients",
        description: "Search and filter your whole book by segment (SME, high-net-worth) and risk.",
        side: "right",
        align: "start",
      },
    },
    {
      element: '[data-tour="nav-retention"]',
      popover: {
        title: "Retention",
        description: "The churn radar — who's most likely to leave, why, and the money at risk.",
        side: "right",
        align: "start",
      },
    },
    {
      element: '[data-tour="nav-focus"]',
      popover: {
        title: "Focus",
        description:
          "Steer the AI's priorities — SME growth, high-net-worth retention, churn defence, or dormant reactivation. Flip it and every list re-ranks instantly.",
        side: "right",
        align: "start",
      },
    },
    {
      popover: {
        title: "Your turn 🚀",
        description:
          'Open <b>Atlas</b> and ask "who\'s about to churn this week?" — or tap the mic to talk to it. Replay this tour anytime with the <b>?</b> button up top.',
      },
    },
  ],
}

/**
 * Embedded demo onboarding: a guided step-by-step tour highlighting the RM
 * workspace. Auto-runs on every page load (desktop only — it points at the
 * persistent sidebar), and replays on the `rm:start-tour` window event (fired
 * by the topbar's help button). Always exitable via the ✕ button, ESC, or by
 * clicking the overlay. Mounted once inside the app shell.
 */
export function DemoTour() {
  useEffect(() => {
    const run = () => driver(TOUR_CONFIG).drive()
    const onReplay = () => run()
    window.addEventListener(REPLAY_EVENT, onReplay)

    let timer: ReturnType<typeof setTimeout> | undefined
    try {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches
      if (isDesktop) {
        // Let the sidebar mount before highlighting it.
        timer = setTimeout(run, 400)
      }
    } catch {
      // matchMedia unavailable — skip auto-start.
    }

    return () => {
      window.removeEventListener(REPLAY_EVENT, onReplay)
      if (timer) clearTimeout(timer)
    }
  }, [])

  return null
}

/** Fire from anywhere (e.g. the topbar "?" button) to replay the tour. */
export function startDemoTour() {
  window.dispatchEvent(new Event(REPLAY_EVENT))
}
