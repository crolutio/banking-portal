## Context

This change implements Stanley's partner request for a demonstrable 360-degree customer view in a frontline banking context, specifically through the relationship manager workflow. The current project already supports role-based navigation and seeded customer data, but it does not provide a focused RM 360 experience with explicit dual-customer contrast storytelling and a natural-language customer copilot.

Stakeholders need a concise 30-minute demo that proves: (1) proactive issue visibility, (2) targeted opportunity recommendations, and (3) practical natural-language support for RM decisions at the point of engagement.

Constraints:
- Reuse existing seeded data and current RM route structure where possible.
- Keep scope demo-centric and deterministic; avoid broad architecture expansion.
- Ensure customer-specific explainability in outputs to build stakeholder trust.

## Goals / Non-Goals

**Goals:**
- Provide an RM 360 view capable of showing customer health, risks, opportunities, and recommended actions for two demo customers (Sarah Chen and Mohammed Ali).
- Introduce customer switching within RM context to show same UX producing different outcomes by customer context.
- Add an RM copilot section for natural-language questions limited to the selected customer.
- Standardize copilot response structure for demo reliability: recommendation, reason, evidence, and confidence.

**Non-Goals:**
- Building a generalized multi-tenant CRM platform.
- Training or deploying new ML models.
- Replacing existing global dashboard navigation patterns.
- Implementing production-grade workflow automation beyond demo needs.

## Decisions

### Decision 1: Anchor 360 functionality in the relationship manager experience
- **Choice:** Implement the 360 and copilot as RM-specific presentation behavior rather than a new global profile type.
- **Rationale:** Matches partner ask (frontline staff preparation), minimizes surface-area changes, and keeps demo flow focused.
- **Alternatives considered:**
  - New standalone "360 module" route for all roles (rejected: larger navigation/permission changes)
  - Customer-role-side 360 page (rejected: does not mirror teller/RM workflow ask)

### Decision 2: Use two curated customer storylines with deterministic differentiation
- **Choice:** Define explicit storyline behaviors for Sarah Chen and Mohammed Ali.
- **Rationale:** Demonstrates adaptive intelligence clearly with minimal risk of inconsistent output.
- **Alternatives considered:**
  - Dynamic story generation from arbitrary customer list (rejected: demo reliability risk)
  - Single-customer demo (rejected: weak proof of contextual adaptation)

### Decision 3: Constrain copilot to selected-customer context only
- **Choice:** RM copilot answers only customer-scoped questions tied to the active 360 subject.
- **Rationale:** Prevents broad, ambiguous queries and supports explainability expectations.
- **Alternatives considered:**
  - Open-ended bank-wide assistant (rejected: higher hallucination/scope risk)
  - No copilot, static cards only (rejected: weaker "agentic" demonstration)

### Decision 4: Require explainability block in each copilot answer
- **Choice:** Responses include recommendation, reason, evidence, confidence.
- **Rationale:** Increases trust and aligns with partner/client expectation for practical AI guidance.
- **Alternatives considered:**
  - Free-form conversational output (rejected: less auditable for stakeholder demos)

## Risks / Trade-offs

- **[Risk]** Overfitting the experience to demo personas only ? **Mitigation:** Keep capability definitions customer-agnostic in spec wording while using two demo fixtures for implementation.
- **[Risk]** Data inconsistency across seeded domains may weaken narrative coherence ? **Mitigation:** Define deterministic derivation rules for risks/opportunities from available seeded records.
- **[Risk]** Copilot responses may become too generic if context assembly is thin ? **Mitigation:** Require customer evidence bullets and confidence in every response format.
- **[Trade-off]** Deterministic behavior improves demo reliability but reduces perceived spontaneity.
- **[Trade-off]** RM-only scope speeds delivery but postpones teller/service-team UX parity.

## Migration Plan

1. Introduce RM 360 capability behavior and customer-switching requirements in specs.
2. Add RM copilot capability requirements with strict response contract.
3. Implement storyline derivation and UI sections for Sarah and Mohammed.
4. Validate end-to-end demo script flow (same question, distinct customer-specific answers).

Rollback strategy:
- Feature-level rollback to existing RM workspace behavior by disabling new 360 panel and copilot section while preserving existing role and dashboard routes.

## Open Questions

- Should the copilot support only predefined prompt chips in demo mode, or free-text plus chips?
- Do we need explicit compliance disclaimers in the UI for recommendation cards/coplay output?
- Should customer switching be visible globally in RM workspace or only inside the 360 section?
- Are there mandatory KPI counters (conversion uplift, issue prevention) required in the demo screen itself or only in verbal narration?
