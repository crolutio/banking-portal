## ADDED Requirements

### Requirement: Single Google Generative AI model

The application SHALL use only the model id **`gemini-3-flash-preview`** for all invocations of `getGenerativeModel` (or equivalent) that serve in-app AI chat streaming and the LangGraph agent backed by Google Generative AI.

#### Scenario: Chat route uses one model

- **WHEN** the chat API handles a request that calls Google Generative AI for completion
- **THEN** the model id SHALL be `gemini-3-flash-preview` and SHALL NOT be replaced by another model during that request.

#### Scenario: LangGraph agent uses the same model

- **WHEN** the LangGraph agent performs generation with Google Generative AI
- **THEN** the model id SHALL be `gemini-3-flash-preview` for every such call site in that module.

### Requirement: No automatic model fallback

The application SHALL NOT detect rate limits or quota errors for the purpose of switching to a secondary model or re-instantiating the client with a different model id.

#### Scenario: API error without model swap

- **WHEN** the Google API returns an error (including HTTP 429 or messages indicating rate limits or resource exhaustion)
- **THEN** the application SHALL NOT retry the same user intent using a different model id; it SHALL fail or report the error according to existing error paths.
