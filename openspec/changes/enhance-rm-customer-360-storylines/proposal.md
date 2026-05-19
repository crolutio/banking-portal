## Why

The relationship manager experience needs to demonstrate Stanley's requested "360 degree customer view" in a concrete, client-facing way. The current RM flow does not yet provide a dedicated, side-by-side storyline for two distinct customers with clearly different risks, needs, and recommended actions.

## What Changes

- Add a dedicated RM 360 customer view that presents an actionable customer summary for a selected customer.
- Include two curated RM customer storylines in the demo flow: Sarah Chen and Mohammed Ali, each with distinct risk themes, opportunity themes, and recommended next actions.
- Add a lightweight RM-facing natural-language copilot section on the RM 360 view, scoped to answering questions about the currently selected customer.
- Ensure the copilot response format emphasizes explainability (recommendation, reason, evidence, confidence) for stakeholder trust in demo scenarios.

## Capabilities

### New Capabilities
- `rm-customer-360`: Relationship-manager-facing 360 customer page behavior, including required sections, customer context switching, and priority insight presentation.
- `rm-customer-copilot`: Relationship-manager natural-language customer Q&A behavior constrained to selected-customer context with explainable responses.

### Modified Capabilities
- `<none>`

## Impact

- Affected UI: RM workspace and client detail/360 presentation surfaces.
- Affected UX behavior: customer switching in RM context, recommendation and risk visualization, and in-page RM copilot interaction.
- Affected data usage: existing customer/account/transaction/support/risk data mapped into deterministic storyline sections for Sarah and Mohammed.
- Demo impact: supports a 30-minute E2E storyline aligned to partner/client expectations around proactive issue identification and cross-sell guidance.
