# Banking DB — Complete Reference

> **Source of truth** for the **banking** Supabase project
> (`NEXT_PUBLIC_BANKING_SUPABASE_URL` / `NEXT_PUBLIC_BANKING_SUPABASE_PUBLISHABLE_DEFAULT_KEY`,
> via `lib/supabase/client.ts`). Built from live introspection + the constraint dump (June 2026).
> The old numbered `scripts/00x_create_*.sql` files are **stale** — trust this doc.
> Companion: [callcenter_db_reference.md](callcenter_db_reference.md).
>
> This project is a "vibecoded" build that was never cleaned up: it contains **far more
> tables than the app uses**, including a whole duplicated call-center schema. The
> [Tables that matter](#1-tables-the-app-actually-uses) section is what you need 95% of the time.

---

## 0. The golden rules (read before writing any seed)

1. **`market` is `NOT NULL` on every core table** — always set it. Values in use: `'default'` (UAE) and `'kenya'`. ⚠️ The exported `banking_db_schema.csv` was generated **before** the market migration and therefore **does not list the `market` column** — but it exists and is required on `profiles`, `customers`, `accounts`, `cards`, `loans`, `transactions`, `support_tickets`, `support_messages`, and the retail tables.
2. **`customer_id` is the join key, not `user_id`.** `accounts`, `cards`, `loans`, `savings_goals`, `portfolio_holdings`, `risk_profiles`, `reward_*`, `budgets`, `watchlist` all FK to **`customers(id)`** — *not* `profiles`. (The constraint names are suffixed `_v2_` from a past migration, e.g. `accounts_v2_customer_id_fkey`.)
3. **A "person" = two rows sharing one UUID:** one in `profiles` (identity / role / segment / RM link) and one in `customers` (the FK target for all financial data). **Insert `customers` before `accounts`.** `profiles.customer_id` is nullable and is left **null** for the Kenya personas — the shared `id` value *is* the link.
4. **Two different "sender" vocabularies.** Banking `support_messages.sender_type ∈ {user, agent, ai}` (CHECK-enforced; `customer` **fails**). The call-center DB uses `customer` instead — see companion doc.
5. **Cross-DB link:** the call-center project's `conversations.customer_id`, `customers.id`, and `messages.sender_customer_id` all equal **this DB's `profiles.id` / `customers.id`** (same UUID per person).
6. **`uuid` columns don't support `LIKE`.** To pattern-match an id (e.g. the `11ce00%` vanity range) cast first: `where customer_id::text like '11ce00%'`.

---

## 1. Tables the app actually uses

Column legend: **PK** primary key · **FK→** foreign key · **NN** not null · default shown in `code`.

### `profiles` — identity, role, RM assignment
The "who is this person" table. One row per user (retail customers, RMs, risk, admin).

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| `id` | uuid | NN | `gen_random_uuid()` | **PK**. Shared with `customers.id` and the call-center IDs. |
| `customer_id` | uuid | yes | null | FK→`customers(id)` ON DELETE SET NULL. **Left null** for Kenya personas (link is the shared `id`). |
| `email` | text | NN | | |
| `full_name` | text | NN | | |
| `role` | `user_role` enum | NN | `retail_customer` | `retail_customer \| relationship_manager \| risk_compliance \| admin` |
| `avatar_url` | text | yes | null | Usually `/placeholder.svg?height=40&width=40`. |
| `phone` | text | yes | null | |
| `segment` | `customer_segment` enum | yes | `Standard` | `VIP \| Premium \| Standard \| At Risk` |
| `kyc_status` | `kyc_status` enum | yes | `Pending` | `Verified \| Pending \| Review Required` |
| `assigned_rm_id` | uuid | yes | null | FK→`profiles(id)`. The RM who owns this client. |
| `market` | text | NN | | `default` / `kenya` (not in CSV; exists live). |
| `created_at` / `updated_at` | timestamptz | NN | `now()` | |

### `customers` — FK target for all financial data
Mirror of a person for the money side. **Must exist before** accounts/cards/loans.

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| `id` | uuid | NN | | **PK**. Same UUID as the matching `profiles.id`. |
| `name` | text | NN | | |
| `email` | text | NN | | UNIQUE. |
| `phone` | text | yes | | |
| `preferred_language` | text | yes | | |
| `tier` | text | yes | | Free text here (`premium`/`vip`/`standard` seen). No CHECK on the banking side. |
| `preferred_channel` | text | yes | | |
| `market` | text | NN | | |
| `created_at` | timestamptz | NN | `now()` | |

### `accounts` — bank accounts
| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| `id` | uuid | NN | `gen_random_uuid()` | **PK** |
| `customer_id` | uuid | NN | | FK→`customers(id)` ON DELETE **RESTRICT**. |
| `name` | text | NN | | e.g. "Personal Current Account". |
| `type` | `account_type` enum | NN | | `current \| savings \| business \| fx_wallet`. **SME = `business`.** |
| `currency` | text | NN | `'AED'` | `KES` / `USD` for Kenya. |
| `balance` | numeric(15,2) | NN | `0` | Ledger balance. |
| `available_balance` | numeric(15,2) | NN | `0` | Balance minus holds. |
| `account_number` | text | NN | | **UNIQUE**. Kenya existing uses `011…`; RM-clients seed uses `02NN…`. |
| `iban` | text | yes | null | |
| `status` | `account_status` enum | NN | `active` | `active \| frozen \| closed` |
| `market` | text | NN | | |
| `created_at` / `updated_at` | timestamptz | NN | `now()` | |

### `transactions` — ledger entries (the richest signal source)
| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| `id` | uuid | NN | `gen_random_uuid()` | **PK** |
| `account_id` | uuid | NN | | FK→`accounts(id)`. (No direct customer link — join via account.) |
| `date` | timestamptz | NN | `now()` | Business date of the txn. |
| `description` | text | NN | | |
| `merchant` | text | yes | null | |
| `category` | `transaction_category` enum | NN | `other` | See enum list. |
| `amount` | numeric | NN | | Positive magnitude; direction is in `type`. |
| `balance_after` | numeric | NN | | Running balance after this txn. |
| `type` | `transaction_type` enum | NN | | `credit \| debit` |
| `status` | `transaction_status` enum | NN | `completed` | `completed \| pending \| failed` |
| `reference` | text | yes | null | |
| `metadata` | jsonb | yes | `{}` | |
| `category_source` | text | yes | `'seed'` | `seed \| auto_rule \| …` how the category was set. |
| `category_confidence` | numeric | yes | `0.8` | |
| `category_reason` | text | yes | null | e.g. matched-keyword explanation. |
| `is_unusual` | boolean | yes | | ⚠️ live-only (not in CSV). Flags anomalies. |
| `unusual_reason` | text | yes | | ⚠️ live-only. **Free-text the AI reads** — churn/fraud/NSF signals live here. |
| `market` | text | NN | | live-only. |

### `cards`
| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| `id` | uuid | NN | `gen_random_uuid()` | **PK** |
| `customer_id` | uuid | NN | | FK→`customers(id)` ON DELETE CASCADE. |
| `account_id` | uuid | NN | | FK→`accounts(id)` ON DELETE CASCADE. |
| `type` | `card_type` enum | NN | | `debit \| credit \| virtual` |
| `brand` | `card_brand` enum | NN | `Visa` | `Visa \| Mastercard` |
| `last_four` | text | NN | | |
| `expiry_date` | text | NN | | |
| `status` | `card_status` enum | NN | `active` | `active \| frozen \| expired \| cancelled` |
| `credit_limit` | numeric | yes | null | Credit cards only. |
| `spent_amount` | numeric | yes | `0` | |
| `cardholder_name` | text | NN | | |
| `pin_set` | boolean | yes | `false` | |
| `contactless_enabled` | boolean | yes | `true` | |
| `online_enabled` | boolean | yes | `true` | |
| `atm_limit` | numeric | yes | `5000` | |
| `pos_limit` | numeric | yes | `10000` | |
| `market` | text | NN | | |
| `created_at` / `updated_at` | timestamptz | NN | `now()` | |

### `loans`
| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| `id` | uuid | NN | `gen_random_uuid()` | **PK** |
| `customer_id` | uuid | NN | | FK→`customers(id)` ON DELETE CASCADE. |
| `product_id` | uuid | yes | null | FK→`loan_products(id)`. |
| `type` | text | NN | | Plain text (`business`/`mortgage`/`personal`/…). NOT an enum on `loans`. |
| `principal_amount` | numeric | NN | | |
| `remaining_balance` | numeric | NN | | |
| `interest_rate` | numeric | NN | | Annual %. |
| `term_months` | integer | NN | | |
| `monthly_payment` | numeric | NN | | |
| `next_payment_date` | date | yes | null | |
| `disbursement_date` | date | yes | null | |
| `status` | text | NN | | Plain text (`active`/`delinquent`/`paid_off`). |
| `market` | text | NN | | |
| `created_at` / `updated_at` | timestamptz | NN | `now()` | |

### `loan_products` — loan catalog (market-agnostic)
`id` (PK) · `type` (`loan_type` enum) · `name` · `min_amount` · `max_amount` · `min_term_months` · `max_term_months` · `interest_rate` · `apr` · `features` (text[]) · `is_active` (bool, default true) · `created_at`.

### `support_tickets` — in-app support (banking side)
| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| `id` | uuid | NN | `gen_random_uuid()` | **PK** |
| `user_id` | uuid | NN | | FK→`profiles(id)` ON DELETE CASCADE. (Note: `profiles`, not `customers`.) |
| `subject` | text | NN | | |
| `status` | `ticket_status` enum | NN | `open` | `open \| in_progress \| resolved \| closed` |
| `priority` | `ticket_priority` enum | NN | `medium` | `low \| medium \| high` |
| `assigned_to` | uuid | yes | null | FK→`profiles(id)` — usually the RM. |
| `resolved_at` | timestamptz | yes | null | |
| `market` | text | NN | | |
| `created_at` / `updated_at` | timestamptz | NN | `now()` | |

### `support_messages` — messages within a ticket
| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| `id` | uuid | NN | `gen_random_uuid()` | **PK** |
| `ticket_id` | uuid | NN | | FK→`support_tickets(id)` ON DELETE CASCADE. |
| `sender_type` | text | NN | | **CHECK: `user \| agent \| ai`** (NOT `customer`). |
| `sender_id` | uuid | yes | null | FK→`profiles(id)`. |
| `content` | text | NN | | |
| `citations` | jsonb | yes | `[]` | |
| `market` | text | NN | | |
| `created_at` | timestamptz | NN | `now()` | |

### `products` — RM Products page catalog
`id` (PK) · `name` · `description` · `category` · `icon` · `tagline` · `min_amount` · `max_amount` · `rate_pct` · `term_label` · `key_features` (text[]) · `target_segment` · `market`.

### Retail surfaces (customer-facing app; `customer_id`→`customers`, all have `market`)
- `savings_goals` (+ `savings_goal_transactions`, `type` CHECK `{deposit, withdrawal}`)
- `portfolio_holdings` (NSE/T-bill/MMF holdings; has its own `currency`)
- `risk_profiles` (UNIQUE per customer; `score`, `category`)
- `reward_profiles` (UNIQUE per customer; `tier` CHECK `{Bronze, Silver, Gold, Platinum}`), `reward_activities`, `reward_redemptions`, `reward_catalog`
- `watchlist` (UNIQUE `(user_id, symbol)`), `budgets`

---

## 2. Enums (USER-DEFINED column types)

| Enum | Values |
|------|--------|
| `user_role` | retail_customer, relationship_manager, risk_compliance, admin |
| `customer_segment` | **VIP, Premium, Standard, At Risk** |
| `kyc_status` | Verified, Pending, Review Required |
| `account_type` | current, savings, business, fx_wallet |
| `account_status` | active, frozen, closed |
| `transaction_category` | groceries, restaurants, shopping, entertainment, utilities, transport, healthcare, travel, transfer, salary, investment, fees, other |
| `transaction_type` | credit, debit |
| `transaction_status` | completed, pending, failed |
| `card_type` | debit, credit, virtual |
| `card_brand` | Visa, Mastercard |
| `card_status` | active, frozen, expired, cancelled |
| `loan_type` | personal, mortgage, auto, business, credit_line |
| `loan_status` | active, paid_off, delinquent *(enum exists, but `loans.status` is plain text)* |
| `loan_application_status` | draft, submitted, under_review, approved, rejected, disbursed |
| `investment_type` | stock, bond, etf, mutual_fund, crypto |
| `risk_profile_category` | Conservative, Moderate, Aggressive |
| `savings_goal_category` | travel, shopping, home, education, emergency, vehicle, wedding, retirement, other |
| `savings_goal_status` | active, paused, completed, cancelled |
| `alert_severity` | low, medium, high, critical |
| `alert_type` | aml, kyc, fraud, policy_breach, unusual_activity |
| `alert_status` | open, investigating, resolved, escalated |
| `ticket_status` | open, in_progress, resolved, closed |
| `ticket_priority` | low, medium, high |
| `ai_confidence` | high, medium, low |
| `citation_type` | account_ledger, policy, product_terms, transaction_history, crm_notes, risk_rules |
| `audit_action_type` | ai_response, transfer, dispute, loan_application, card_action, policy_change, login |
| `connected_app_category` | shopping, entertainment, telecom, utilities, transport, food_delivery, travel, government |

> **Important:** `segment` only has the four tiers above. **"SME" and "HNW" are not segments** — derive SME from a `business`-type account/loan, and HNW from `VIP`/`Premium` + high balance.

---

## 3. Key constraints (FKs, checks, uniques)

**Foreign keys** (constraint names carry a legacy `_v2_` infix):
- `accounts.customer_id` → `customers(id)` **RESTRICT** · `accounts.account_number` **UNIQUE**
- `cards.customer_id` → `customers(id)` CASCADE · `cards.account_id` → `accounts(id)` CASCADE
- `loans.customer_id` → `customers(id)` CASCADE · `loans.product_id` → `loan_products(id)`
- `transactions.account_id` → `accounts(id)`
- `profiles.customer_id` → `customers(id)` SET NULL · `profiles.assigned_rm_id` → `profiles(id)`
- `support_tickets.user_id` → `profiles(id)` CASCADE · `support_tickets.assigned_to` → `profiles(id)`
- `support_messages.ticket_id` → `support_tickets(id)` CASCADE · `support_messages.sender_id` → `profiles(id)`
- `savings_goals.customer_id` → `customers(id)` CASCADE · `savings_goals.source_account_id` → `accounts(id)`
- `portfolio_holdings / risk_profiles / reward_* / budgets / reward_activities .customer_id` → `customers(id)` CASCADE
- `customers.email` **UNIQUE** · `risk_profiles` / `reward_profiles` **UNIQUE (customer_id)** · `watchlist` **UNIQUE (user_id, symbol)**

**Check constraints worth remembering:**
- `support_messages.sender_type ∈ {user, agent, ai}`
- `reward_profiles.tier ∈ {Bronze, Silver, Gold, Platinum}`
- `savings_goal_transactions.type ∈ {deposit, withdrawal}`

---

## 4. Legacy / unused tables (do NOT seed for RM demos)

This DB also contains a **duplicate, older copy of the call-center schema** plus AI-assistant tables. The RM app does **not** read these — the real call-center data is in the separate call-center project (companion doc).

- **Duplicate call-center copy:** `conversations`, `messages`, and a second `customers`-style flow, plus the entire **`cc_*` family** (`cc_conversations`, `cc_customers`, `cc_messages`, `cc_users`, `cc_agents`, `cc_orders`, `cc_inventory`, `cc_kb_articles`, `cc_macros`, `cc_playbooks`, `cc_qa_reviews`, `cc_gift_cards`, `cc_purchase_orders`, `cc_transfers`, `cc_audit_events`). These are a Shopify-style contact-center build that came bundled in the vibecode.
- **AI assistant:** `ai_conversations`, `ai_messages`, `ai_chat_history` (the customer-facing chatbot history).
- **Other:** `loan_applications`, `policies`, `agents`, `test_reload` (a scratch table — ignore).

---

## 5. Known personas & the Kenya UUID scheme

**Relationship Managers**
| Name | id | Market |
|------|----|--------|
| Peter Mwangi | `11ce0003-0003-4003-a003-000000000003` | kenya |
| James Rodriguez | `cd862aa5-…` / `51880b1d-…` (dupes exist) | default |
| Lisa Thompson | `24763e74-…` / `77777777-…` | default |

**Kenya vanity UUID scheme** — `11ce00NN-00NN-40NN-a0NN-0000000000NN`:
| NN | Person | Role / story |
|----|--------|------|
| 01 | Wanjiru Kamau | retail (Premium) — original demo client |
| 02 | Otieno Ouma | retail (Premium) — original demo (SME-ish) |
| 03 | **Peter Mwangi** | the RM |
| 04 | Joseph Karanja | SME hero (business acct + loan) |
| 05 | Aisha Mohamed | HNW hero (VIP, KES 14M + USD) |
| 06 | David Kimani | **churn hero** (Equity transfers, missing salary, delinquent mortgage, closure ticket) |
| 07 | Grace Achieng | diaspora hero (USD remittances) |
| 08–18 | Mary Wanjiku, Samuel Kiprop, Faith Chebet, Daniel Mwangi, Esther Nyambura, Peter Omondi, Lucy Wairimu, John Maina, Cynthia Adhiambo, Brian Mutua, Catherine Njoki | book depth + filter coverage (more SMEs: 12, 16; more At-Risk: 10, 18) |

Related per-entity ID prefixes used by the seed: accounts `aa11ceNN-…`, transactions `ff11ceNN-…`, loans `10a11cNN-…`, tickets `dd11ceNN-…`, support messages `ee11ceNN-…`.

**Known data bug:** a couple of Wanjiru's rows are mis-tagged `market='default'` despite being Kenyan.

---

## 6. Seeding recipe (banking side)

Order matters because of FKs:

```
profiles  →  customers  →  accounts  →  loans  →  transactions  →  support_tickets  →  support_messages
```

- Set `market` on **every** row.
- Use `ON CONFLICT (id) DO NOTHING` for idempotency.
- `customers` must precede `accounts` (RESTRICT FK).
- Canonical example: `scripts/seed_kenya_rm_clients_banking.sql`.
- The matching call-center threads go in the **other** project — see companion doc.
