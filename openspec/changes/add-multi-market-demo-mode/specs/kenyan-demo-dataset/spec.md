## ADDED Requirements

### Requirement: Kenyan persona pool exists in the banking DB

The banking DB SHALL contain five profiles tagged `market = 'kenya'`: two retail customers, one relationship manager, one risk & compliance user, and one system administrator. All five SHALL bear Kenyan names. The two retail customers SHALL have `assigned_rm_id` set to the Kenyan RM's UUID.

#### Scenario: Persona enumeration
- **WHEN** `SELECT * FROM profiles WHERE market = 'kenya'` is run
- **THEN** the result SHALL contain exactly five rows: Wanjiru Kamau (retail), Otieno Ouma (retail), Peter Mwangi (relationship_manager), Grace Wanjiku (risk_compliance), Njeri Otieno (admin)

#### Scenario: RM assignment
- **WHEN** the two Kenyan retail customers are queried
- **THEN** both rows SHALL have `assigned_rm_id` equal to Peter Mwangi's UUID

### Requirement: Kenyan customer A storyline mirrors Sarah Chen

Wanjiru Kamau (Kenyan customer A) SHALL represent a Premium urban professional with international travel patterns and consumer-leveraged finances. She SHALL hold a current account and a goal-saver/savings account (KES-denominated), one debit and one credit card, and SHALL be assigned 2–3 loans whose mix is consumer-flavored (e.g., mortgage on a Nairobi apartment, asset finance for a personal vehicle, optional salary advance). Her support tickets and call-center conversations SHALL mirror the "card friction during travel" beat with Kenyan-context locations (e.g., Kigali, Kampala) instead of London/Dubai.

#### Scenario: Loan portfolio shape
- **WHEN** loans assigned to Wanjiru are queried
- **THEN** the set SHALL include at least one mortgage/home loan and at least one asset finance loan, all in KES

#### Scenario: Conversation theming
- **WHEN** call-center conversations for Wanjiru are read
- **THEN** at least one SHALL reference travel-related card friction in a regional African destination, mirroring Sarah Chen's London beat

### Requirement: Kenyan customer B storyline mirrors Mohammed Ali

Otieno Ouma (Kenyan customer B) SHALL represent an SME owner in imports/distribution with business-leveraged finances. He SHALL hold an SME current account and optionally a foreign-currency account, one or two business cards, and SHALL be assigned 2–3 loans whose mix is business-flavored (e.g., SME working capital, asset finance for commercial vehicles/equipment, LPO or invoice discounting facility). His support tickets and call-center conversations SHALL mirror Mohammed's "business statement for visa/tender" and "international wire transfer" beats with Kenyan equivalents.

#### Scenario: Loan portfolio shape
- **WHEN** loans assigned to Otieno are queried
- **THEN** the set SHALL include at least one SME working capital loan and at least one commercial asset finance loan, all in KES

#### Scenario: Conversation theming
- **WHEN** call-center conversations for Otieno are read
- **THEN** at least one SHALL reference a business document request (tender, statement, certificate) and at least one SHALL reference an outbound cross-border payment or trade finance question

### Requirement: Kenyan transactions are denominated and merchanted authentically

Transactions for the two Kenyan retail customers SHALL be denominated in KES (with optional USD entries for accounts held in USD) and SHALL reference Kenyan-market merchants and payees, including but not limited to: M-Pesa transfers, Naivas, Carrefour Kenya, Java House, Uber, Bolt, KPLC (electricity), Nairobi Water, NHIF, NSSF, KRA, Shell, Rubis, salary credits from Kenyan employers, and school fees. Together the two customers SHALL hold approximately 80–120 transactions.

#### Scenario: KES denomination
- **WHEN** transactions for Kenyan accounts are queried
- **THEN** each SHALL reference an account whose `currency = 'KES'` (or `'USD'` for designated FX accounts), and SHALL NOT use `AED` as the underlying account currency

#### Scenario: Merchant authenticity
- **WHEN** the merchant field is enumerated across Kenyan transactions
- **THEN** at least 50% of debit transactions SHALL reference Kenyan merchants/payees from the list above

### Requirement: Kenyan call-center records exist with matching UUIDs

The call-center DB SHALL contain `customers` rows for both Kenyan retail customers using the **same UUIDs** as their `profiles.id` in the banking DB. Conversations and messages SHALL be seeded such that the two customers together hold approximately 10–14 conversations spanning multiple channels (chat, whatsapp, voice) and sentiment values (positive, neutral, negative), with approximately 50–70 total messages.

#### Scenario: Cross-DB ID consistency
- **WHEN** `customers.id` is compared with `profiles.id` for the two Kenyan retail personas
- **THEN** the UUIDs SHALL match exactly

#### Scenario: Channel and sentiment variety
- **WHEN** Kenyan conversations are read
- **THEN** the set SHALL include at least two distinct channels and at least two distinct sentiment values across the corpus

### Requirement: Kenyan product catalog exists with `market = 'kenya'`

The `products` table SHALL contain approximately 18–22 rows with `market = 'kenya'` spanning every category present in the existing UAE catalog: Accounts, Cards, Loans, Investments, Insurance/Bancassurance, and Digital/Mobile. Rates, minimums, taglines, and key features SHALL be grounded in the Kenyan banking market (e.g., Treasury Bills with rates and tenors matching Kenyan sovereign issuances; an M-Pesa-linked digital service; KES/USD fixed deposits).

#### Scenario: Category coverage
- **WHEN** distinct categories are enumerated across `products WHERE market = 'kenya'`
- **THEN** the categories SHALL include Accounts, Cards, Loans, Investments, Insurance, and Digital/Mobile

#### Scenario: Kenya-specific instruments
- **WHEN** the Kenyan catalog is queried
- **THEN** it SHALL include at minimum: Treasury Bills (KES, 91/182/364-day), a Money Market Fund (KES), an Equity Unit Trust (NSE), an SME Working Capital loan, an Asset Finance/Mortgage product, and an M-Pesa-linked digital service
