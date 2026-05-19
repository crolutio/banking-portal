## ADDED Requirements

### Requirement: Relationship manager 360 customer overview
The system SHALL provide a relationship-manager-facing 360 customer view that summarizes identity context, financial snapshot, prioritized risks/issues, prioritized opportunities, and recommended next actions for the currently selected customer.

#### Scenario: RM opens customer 360 view
- **WHEN** a relationship manager opens the customer 360 section for a selected customer
- **THEN** the interface displays customer identity context, financial summary, risk/issue highlights, opportunity recommendations, and next actions in a single consolidated view.

### Requirement: RM customer switching across two demo customers
The system SHALL allow the relationship manager to switch between at least two predefined demo customers (Sarah Chen and Mohammed Ali) and recompute 360 outputs based on the selected customer context.

#### Scenario: RM switches customer
- **WHEN** the relationship manager changes the selected customer from Sarah Chen to Mohammed Ali (or vice versa)
- **THEN** all 360 sections refresh to the newly selected customer context and SHALL present distinct storyline outcomes for risks, opportunities, and recommended actions.

### Requirement: Distinct storyline differentiation
The system SHALL present materially different storyline emphasis across the two demo customers so that identical RM workflows yield context-specific guidance.

#### Scenario: Same workflow, different customer outcomes
- **WHEN** the relationship manager reviews the 360 view for Sarah Chen and then for Mohammed Ali
- **THEN** the system shows different prioritized issues and different recommended opportunities aligned to each customer's profile and recent behavior.

### Requirement: Actionable priority ordering
The system SHALL prioritize displayed issues and opportunities in ranked order so the relationship manager can identify what to discuss first.

#### Scenario: RM identifies first talking point
- **WHEN** the relationship manager views risk and opportunity sections
- **THEN** each section is ordered by priority and the highest-priority item is clearly identifiable without additional navigation.
