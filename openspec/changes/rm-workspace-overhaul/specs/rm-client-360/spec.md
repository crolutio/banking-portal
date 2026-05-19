## ADDED Requirements

### Requirement: Client 360 page fetches all banking data for the selected client

The page at `/rm-workspace/[clientId]` SHALL fetch accounts, cards, loans, transactions, risk alerts, and support tickets for the given client from the banking database.

#### Scenario: RM navigates to a client's 360 view
- **WHEN** the RM navigates to `/rm-workspace/{clientId}`
- **THEN** the page fetches and displays the client's profile, accounts, cards, loans, recent transactions, risk alerts, and support tickets from the banking DB

#### Scenario: Client ID does not exist
- **WHEN** the RM navigates to `/rm-workspace/{invalidId}`
- **THEN** the page displays an error or "Client not found" message

### Requirement: Client 360 page fetches call center conversations

The 360 page SHALL also fetch conversations and messages from the call center database for the given client, showing their support interaction history.

#### Scenario: Client has call center conversations
- **WHEN** the 360 page loads and the client has conversations in the call center DB
- **THEN** a "Support History" section displays conversation topics, statuses, and message counts

#### Scenario: Client has no call center conversations
- **WHEN** the 360 page loads and the client has no call center conversations
- **THEN** the "Support History" section shows "No conversations found"

### Requirement: Client 360 page displays financial snapshot

The 360 page SHALL compute and display: total balance, total liabilities, recent inflow, recent outflow, and top spending category — all derived from the fetched banking data.

#### Scenario: Financial snapshot renders from DB data
- **WHEN** the 360 page loads
- **THEN** summary metric tiles show total balance, liabilities, inflow, outflow, and top spending category

### Requirement: Client 360 page has a back navigation to the RM dashboard

The 360 page SHALL include a "Back to Dashboard" link that returns to `/rm-workspace`.

#### Scenario: RM clicks back
- **WHEN** the RM clicks the back navigation on the 360 page
- **THEN** the browser navigates to `/rm-workspace`
