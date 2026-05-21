## ADDED Requirements

### Requirement: Outreach drafting API route exists
The system SHALL expose a POST endpoint at `/api/rm-draft-outreach` that accepts `{ clientId, opportunity, channel, tone }` and returns a streamed AI-generated outreach message.

#### Scenario: Valid request
- **WHEN** the endpoint receives a POST with valid `clientId`, `opportunity`, `channel`, and `tone`
- **THEN** the system SHALL respond with HTTP 200 and a streamed text body containing the drafted message

#### Scenario: Unknown client ID
- **WHEN** `clientId` does not match a profile in the banking DB
- **THEN** the system SHALL respond with HTTP 404

#### Scenario: Missing API key
- **WHEN** `CLAUDE_API_KEY` is not set
- **THEN** the system SHALL respond with HTTP 500

### Requirement: Drafts are channel-aware
The drafting prompt SHALL produce content appropriate to the channel — emails include subject + body and sign-off; SMS and WhatsApp messages are compact and informal.

#### Scenario: Email channel
- **WHEN** `channel === "email"`
- **THEN** the output SHALL include a "Subject:" line followed by a multi-paragraph body and an RM sign-off

#### Scenario: SMS channel
- **WHEN** `channel === "sms"`
- **THEN** the output SHALL be a single block of plain text under approximately 200 characters with no subject line

#### Scenario: WhatsApp channel
- **WHEN** `channel === "whatsapp"`
- **THEN** the output SHALL be a single block of conversational text suitable for a chat interface

### Requirement: Drafts respect requested tone
The drafting prompt SHALL adapt phrasing to the requested tone (`warm`, `direct`, or `formal`).

#### Scenario: Warm tone
- **WHEN** `tone === "warm"`
- **THEN** the message SHALL open with a personal greeting and use empathetic language

#### Scenario: Direct tone
- **WHEN** `tone === "direct"`
- **THEN** the message SHALL be concise, action-led, and skip pleasantries

#### Scenario: Formal tone
- **WHEN** `tone === "formal"`
- **THEN** the message SHALL use professional banking language and formal salutations

### Requirement: Outreach dialog appears from the briefing panel
The Client Briefing Panel SHALL render a "Draft outreach" button in the quick-action chip row that opens the Outreach Dialog when clicked.

#### Scenario: RM clicks Draft outreach
- **WHEN** the RM clicks "Draft outreach" with a successfully loaded briefing
- **THEN** the system SHALL open the Outreach Dialog pre-populated with the briefing's `opportunity` text and the default channel ("email") and tone ("warm")

### Requirement: Outreach dialog renders streamed draft
The Outreach Dialog SHALL display the AI-generated draft as it streams from the API, with editable text once streaming completes.

#### Scenario: Draft generation
- **WHEN** the dialog is opened
- **THEN** the system SHALL call `/api/rm-draft-outreach` and render the streamed tokens into the editable text area

#### Scenario: Channel changed
- **WHEN** the RM changes the channel selector
- **THEN** the system SHALL re-call the API and replace the draft

#### Scenario: Tone changed
- **WHEN** the RM changes the tone selector
- **THEN** the system SHALL re-call the API and replace the draft

### Requirement: Send action emits a toast confirmation
The Outreach Dialog SHALL include a "Send" action button that closes the dialog and emits a success toast referencing the selected channel.

#### Scenario: Demo send
- **WHEN** the RM clicks "Send"
- **THEN** the dialog SHALL close and a toast SHALL display the text `"Sent to <clientName> via <channel>"` for at least 3 seconds

#### Scenario: Cancel
- **WHEN** the RM clicks "Cancel" or closes the dialog
- **THEN** the dialog SHALL close without emitting a toast and the draft SHALL be discarded
