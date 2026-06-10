# Call Center DB — Complete Reference

> **Source of truth** for the **call-center** Supabase project
> (`NEXT_PUBLIC_CALL_CENTER_SUPABASE_URL` / `NEXT_PUBLIC_CALL_CENTER_SUPABASE_ANON_KEY`,
> via `lib/supabase/call-center-client.ts`). Built from live data + the constraint dump (June 2026).
> Companion: [banking_db_reference.md](banking_db_reference.md).
>
> This is a **separate Supabase project** from the banking DB. It also contains a large
> standalone contact-center product schema (the `cc_*` / `calls` family) that the banking
> RM app does **not** touch. The RM 360 support panel only reads three tables:
> [`customers`](#customers), [`conversations`](#conversations), [`messages`](#messages).

---

## 0. The golden rules

1. **Same UUID as banking.** A client's `customers.id` here == their `profiles.id` (and `customers.id`) in the banking project. `conversations.customer_id` and `messages.sender_customer_id` use that same UUID. This is how the RM 360 page (which only knows the banking profile id) finds a client's call-center history.
2. **`market` + `source` columns exist** on `customers`, `conversations`, `messages`. ⚠️ The exported `callCenter_db_schema.csv` predates that migration and **omits them** — but they exist live. Set `market='kenya'` and `source='banking'` to match existing rows.
3. **Insert order:** `customers` → `conversations` → `messages` (FK `conversations.customer_id → customers(id)` is **ON DELETE RESTRICT**, so the customer must exist first).
4. **`tier` is CHECK-constrained:** `{standard, premium, enterprise}`. `'vip'` is **invalid** here — use `'enterprise'` for HNW.
5. **No `sender_type` CHECK on `messages`** → `customer / ai / agent / system` are all accepted (convention, not enforced). This differs from banking `support_messages` (which enforces `user/agent/ai`).
6. **`uuid` columns don't support `LIKE`** — cast: `where customer_id::text like '11ce00%'`.

---

## 1. Tables the RM/banking app uses

Column legend: **PK** primary key · **FK→** foreign key · **NN** not null · default in `code`.

### `customers`
Mirror of the banking person, on the call-center side.

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| `id` | uuid | NN | `uuid_generate_v4()` | **PK**. Set explicitly to the **banking `profiles.id`**. |
| `name` | text | NN | | |
| `email` | text | yes | null | UNIQUE. |
| `phone` | text | NN | | Required here (unlike banking). |
| `language` | text | yes | `'English'` | |
| `preferred_language` | text | yes | `'en'` | |
| `tier` | text | yes | `'standard'` | **CHECK `{standard, premium, enterprise}`** (HNW → `enterprise`). |
| `company` | text | yes | null | |
| `country` | text | yes | null | |
| `timezone` | text | yes | null | |
| `preferred_channel` | text | yes | null | |
| `kyc_status` | text | yes | `'verified'` | Plain text here (lowercase), unlike the banking enum. |
| `last_seen_at` | timestamptz | yes | null | |
| `market` | text | — | | live-only (not in CSV). Set `'kenya'`. |
| `created_at` / `updated_at` | timestamptz | yes | `now()` | |

### `conversations`
One row per support thread (voice / chat / whatsapp / email). The RM 360 lists these for a client.

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| `id` | uuid | NN | `uuid_generate_v4()` | **PK** |
| `customer_id` | uuid | yes | null | FK→`customers(id)` **ON DELETE RESTRICT**. = banking profile id. |
| `subject` | text | yes | null | Thread title. |
| `channel` | text | NN | `'app'` | `voice \| chat \| whatsapp \| email \| app` (free text; no DB check here). |
| `status` | text | NN | `'open'` | `open \| resolved \| escalated \| …` (free text). |
| `priority` | text | NN | `'medium'` | `low \| medium \| high` (free text). |
| `sentiment` | text | yes | null | `positive \| neutral \| negative`. |
| `sentiment_score` | numeric | yes | null | |
| `handling_mode` | text | NN | `'ai'` | **CHECK `{human, ai}`**. |
| `source` | text | yes | null | Set `'banking'` for these threads. |
| `handover_required` | boolean | yes | `false` | True when AI escalated to a human. |
| `assigned_agent_id` | uuid | yes | null | FK→`agents(id)` SET NULL. |
| `last_message` | text | yes | null | Denormalized preview of the latest message. |
| `last_message_time` | timestamptz | yes | null | |
| `start_time` | timestamptz | yes | null | |
| `escalation_risk` | boolean | yes | `false` | |
| `ai_confidence` | numeric | yes | null | |
| `sla_deadline` / `sla_remaining` / `sla_status` | tstz / int / text | yes | null | SLA tracking. |
| `queue` / `topic` / `industry` | text | yes | null | |
| `tags` | text[] | yes | `{}` | |
| `provider` / `provider_conversation_id` | text | yes | null | External provider linkage. |
| `market` | text | — | | live-only. Set `'kenya'`. |
| `created_at` / `updated_at` | timestamptz | NN | `now()` | |

### `messages`
Individual messages within a conversation. **The churn / intent language the AI reads lives here.**

| Column | Type | Null | Default | Notes |
|--------|------|------|---------|-------|
| `id` | uuid | NN | `uuid_generate_v4()` | **PK** |
| `conversation_id` | uuid | NN | | FK→`conversations(id)` ON DELETE CASCADE. |
| `sender_type` | text | NN | | `customer \| ai \| agent \| system` (**no DB check** — convention only). |
| `sender_customer_id` | uuid | yes | null | FK→`customers(id)` SET NULL. Set for `customer` messages (= profile id); null for ai/agent. |
| `sender_agent_id` | uuid | yes | null | FK→`agents(id)` SET NULL. For `agent` messages. |
| `content` | text | NN | | The message body. |
| `is_internal` | boolean | NN | `false` | Internal notes vs customer-visible. |
| `channel` | text | yes | null | Mirrors the conversation channel. |
| `source` | text | yes | null | Set `'banking'`. |
| `status` | text | yes | null | Delivery status. |
| `from_address` / `to_address` | text | yes | null | Email/phone addressing. |
| `provider` / `provider_message_id` | text | yes | null | |
| `metadata` | jsonb | yes | null | |
| `market` | text | — | | live-only. Set `'kenya'`. |
| `created_at` | timestamptz | NN | `now()` | Order threads by this. |

### `agents` (referenced by FKs)
`id` (PK) · `name` · `email` (unique) · `role` (CHECK `{agent, supervisor, admin}`) · `status` (CHECK `{online, away, busy, offline}`) · `avatar` · `team`. Only needed if you set `assigned_agent_id` / `sender_agent_id` (the Kenya seeds leave those null).

---

## 2. Constraints (gotchas)

- `customers.tier` CHECK → **`{standard, premium, enterprise}`** (no `vip`).
- `conversations.handling_mode` CHECK → **`{human, ai}`**.
- `conversations.customer_id` FK → `customers(id)` **ON DELETE RESTRICT** → insert customers first.
- `conversations.assigned_agent_id` FK → `agents(id)` SET NULL.
- `messages.conversation_id` FK → `conversations(id)` CASCADE.
- `messages.sender_customer_id` FK → `customers(id)` SET NULL; `messages.sender_agent_id` FK → `agents(id)` SET NULL.
- `messages` has **no `sender_type` CHECK** — free text.
- `customers.email`, `agents.email` are UNIQUE.

---

## 3. The rest of the DB (a full standalone contact-center product — NOT used by the RM app)

This project doubles as a richer omnichannel contact-center platform. None of it is read by the banking RM 360; **do not seed it for RM demos.** For awareness:

- **Cases & routing:** `cc_cases` (status/priority/type CHECKs), `cc_assignments`, `cc_audit_logs`.
- **Bank-side identity:** `cc_bank_customers` (its own `account_status`/`account_type`/`kyc_status`/`risk_level` CHECKs), `cc_identity_links`, `cc_comm_preferences`.
- **Outbound campaigns:** `cc_outbound_campaigns`, `cc_outbound_jobs`, `cc_outbound_attempts` (many status/outcome CHECKs).
- **Voice/telephony:** `calls`, `call_transcripts`, `cc_call_transcripts`, `cc_call_analysis`, `channel_messages`.
- **Agent automation & knowledge:** `cc_agent_flows`, `cc_agent_flow_versions`, `cc_agent_flow_runs`, `cc_knowledge_base`, `cc_integrations`, `cc_auth_sessions`, `cc_automation_events`, `cc_admin_inbox_items`.

> Note: the **banking** DB contains an older *duplicate* of `conversations`/`messages`/`customers` and a different `cc_*` family. They are unrelated to these. The live support history the app shows comes from **this** project's `conversations` + `messages`.

---

## 4. Cross-DB linkage (how the two projects connect)

```
            BANKING DB                          CALL-CENTER DB
   profiles.id  ─────────────┐        ┌──────  customers.id        (same UUID)
   customers.id ─────────────┴── = ───┴──────  conversations.customer_id
                                              └──────  messages.sender_customer_id
```

One UUID per person, written into **both** projects. The RM 360 page receives a banking `profiles.id` and queries this DB's `conversations` with `customer_id = <that id>`.

---

## 5. Sender vocabulary cheat-sheet (differs across DBs!)

| Context | Allowed sender values | Enforced? |
|---------|----------------------|-----------|
| Call-center `messages.sender_type` | `customer`, `ai`, `agent`, `system` | No (convention) |
| Banking `support_messages.sender_type` | `user`, `agent`, `ai` | **Yes — CHECK** (`customer` fails) |

---

## 6. Seeding recipe (call-center side)

Order: `customers` → `conversations` → `messages`. Set `market='kenya'`, `source='banking'`, `tier ∈ {standard,premium,enterprise}`, `handling_mode ∈ {human,ai}`. Leave `assigned_agent_id` / `sender_agent_id` null unless you also seed `agents`. Use `ON CONFLICT (id) DO NOTHING`. Canonical example: `scripts/seed_kenya_rm_clients_callcenter.sql`.
