## ADDED Requirements

### Requirement: Customer-scoped RM copilot
The system SHALL provide a natural-language copilot section in the RM 360 experience that answers questions only about the currently selected customer.

#### Scenario: RM asks customer-specific question
- **WHEN** the relationship manager submits a natural-language question in the copilot for a selected customer
- **THEN** the response is generated within the context of that selected customer only.

### Requirement: Explainable response contract
The system SHALL format each copilot answer with explicit explainability components: recommendation, reason, evidence, and confidence.

#### Scenario: Copilot response is returned
- **WHEN** the copilot returns an answer to the relationship manager
- **THEN** the output includes a recommendation statement, rationale, customer-grounded evidence points, and a confidence level.

### Requirement: Customer context changes copilot output
The system SHALL produce different responses for different selected customers when the same RM question is asked.

#### Scenario: Same question across two customers
- **WHEN** the relationship manager asks the same question for Sarah Chen and Mohammed Ali
- **THEN** the copilot responses differ in recommendation and evidence according to each selected customer's data context.

### Requirement: RM-oriented prompt affordances
The system SHALL provide RM-oriented starter prompts to accelerate customer analysis in demo and live-assist flows.

#### Scenario: RM views copilot before typing
- **WHEN** the relationship manager opens the copilot section
- **THEN** the interface displays customer-analysis starter prompts such as top risk, recommended product, and first discussion topic.
