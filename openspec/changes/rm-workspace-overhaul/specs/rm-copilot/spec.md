## ADDED Requirements

### Requirement: Copilot uses the existing /api/chat backend with the client's userId

The copilot on the 360 page SHALL call `/api/chat` with `userId` set to the current client's ID, so the AI has full context of that client's financial data.

#### Scenario: RM asks copilot a question about the client
- **WHEN** the RM types a question in the copilot input and clicks "Ask"
- **THEN** the copilot sends the question to `/api/chat` with the client's userId, and streams the AI response

### Requirement: Copilot provides starter prompts

The copilot SHALL display clickable starter prompts relevant to the RM context (e.g., "What should I discuss first?", "What is the highest-priority risk?", "What product should I recommend?").

#### Scenario: RM clicks a starter prompt
- **WHEN** the RM clicks a starter prompt button
- **THEN** the prompt text is sent to `/api/chat` and the response streams into the copilot

### Requirement: Copilot responses are scoped to the selected client

The copilot SHALL pass `currentPage: "/rm-workspace"` to `/api/chat` so the AI knows the context is an RM reviewing a client, not a customer self-serving.

#### Scenario: Same question about different clients yields different answers
- **WHEN** the RM asks the same question on Sarah Chen's 360 page and then on Mohammed Ali's 360 page
- **THEN** the copilot returns different answers based on each client's distinct financial data
