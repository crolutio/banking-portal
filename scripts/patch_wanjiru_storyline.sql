-- =========================================================================
-- WANJIRU KAMAU — STORYLINE PATCH (Banking DB)
-- "The Mortgage Direct Debit That Bounced"
-- Run in Banking Supabase SQL Editor AFTER seed_kenya_transactions.sql
--
-- WHY THIS EXISTS
-- ---------------
-- Before this patch, Wanjiru had ZERO transactions flagged is_unusual=true,
-- so the briefing AI was inventing weak "salary timing" hooks ("Her salary
-- arrived on 21 May — flagged unusual…" — except nothing was actually
-- flagged in the data). That made her demo narrative anaemic compared to
-- Otieno's stuck-Carrefour-cheque story.
--
-- This patch gives Wanjiru a single, common, urgent retail-banking
-- problem grounded in her existing seeded data: her May mortgage direct
-- debit bounced. Now ~5 days overdue, CRB reporting clock ticking, RM
-- has a clear next action (call her, offer a 7-day grace and a temporary
-- standing-order top-up arrangement).
-- =========================================================================


-- -------------------------------------------------------------------------
-- STEP 1: Mark her most recent "Mortgage Payment" as a failed direct debit
-- The seed file shows this as a completed debit ~5 days ago. We flip it
-- to a returned/failed status and flag it as unusual so the briefing AI
-- has hard evidence to anchor on (instead of inventing flags from
-- inferred salary timing).
-- -------------------------------------------------------------------------
UPDATE transactions
SET status         = 'failed',
    description    = 'Mortgage Payment — RETURNED (NSF)',
    is_unusual     = true,
    unusual_reason = 'Direct debit returned: insufficient cleared funds at attempt time. '
                  || 'Mortgage installment of KES 198,000 (loan ref LN-MORT-001) now ~5 days overdue. '
                  || 'CRB reporting threshold reached at 7 days; late-payment penalty (KES 9,900) accrues from day 6. '
                  || 'No catch-up attempt scheduled and customer has not yet been contacted.'
WHERE id = 'ff11ce01-aaaa-4001-a001-000000000002';


-- -------------------------------------------------------------------------
-- STEP 2: Open a high-priority support ticket capturing Wanjiru's concern
-- Two messages: her panicked reach-out, then the agent's holding reply.
-- Gives the briefing AI rich conversational signal (sentiment = anxious,
-- topic = mortgage missed payment, open request = grace period + CRB
-- protection).
-- -------------------------------------------------------------------------
INSERT INTO support_tickets (id, user_id, subject, status, priority, created_at, updated_at)
VALUES
  ('dd11ce01-1111-4111-a001-000000000003',
   '11ce0001-0001-4001-a001-000000000001',
   'URGENT — mortgage direct debit bounced, worried about CRB',
   'open', 'high',
   NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day')
ON CONFLICT (id) DO UPDATE SET
  status       = EXCLUDED.status,
  priority     = EXCLUDED.priority,
  updated_at   = EXCLUDED.updated_at;

INSERT INTO support_messages (id, ticket_id, sender_type, sender_id, content, created_at)
VALUES
  ('ee11ce01-1111-4111-b001-000000000001',
   'dd11ce01-1111-4111-a001-000000000003',
   'user', '11ce0001-0001-4001-a001-000000000001',
   'Hi — I just got an SMS that my May mortgage payment didn''t go through. I had a couple of large outflows around that week (school fees + Kigali trip) and the DD must have hit when my balance was low. I''ve since topped up the account. Can the bank please re-attempt the debit this week and confirm nothing has been reported to CRB? I am genuinely worried — I am due for a rate review next month.',
   NOW() - INTERVAL '2 days'),

  ('ee11ce01-1111-4111-b001-000000000002',
   'dd11ce01-1111-4111-a001-000000000003',
   'agent', NULL,
   'Hi Wanjiru, thanks for reaching out. I can see the May installment of KES 198,000 was returned on 18 May (NSF) and is now 5 days overdue. We can usually re-present the DD within a 7-day grace window before anything is reported to CRB, but this needs RM sign-off. I am escalating this to your RM (Peter Mwangi) right now — he will call you today to confirm the re-attempt and walk you through options to avoid this happening again.',
   NOW() - INTERVAL '1 day' - INTERVAL '4 hours'),

  ('ee11ce01-1111-4111-b001-000000000003',
   'dd11ce01-1111-4111-a001-000000000003',
   'user', '11ce0001-0001-4001-a001-000000000001',
   'Thank you — please ask him to call before 5pm if possible, I have client meetings tomorrow morning. And yes, I would like to discuss a standing-order top-up or anything that prevents this from happening again.',
   NOW() - INTERVAL '1 day')
ON CONFLICT (id) DO NOTHING;


-- -------------------------------------------------------------------------
-- STEP 3: Fix stale salary month labels in the seed
-- The seed_kenya_transactions.sql file labels the three most recent salaries
-- "Salary - March", "Salary - February", "Salary - January" because it was
-- written when "NOW() - INTERVAL '2 days'" landed in March. With the demo
-- running today, "2 days ago" is May, and the AI was reading the mismatch
-- ("Salary - March" labelled on a credit dated 21 May) as a 7-week salary
-- delay — a hallucinated red flag that crowded out the real story.
--
-- This UPDATE relabels each salary by its actual posting month using
-- TO_CHAR(date, 'Month YYYY'), so labels always agree with dates no matter
-- when the seed was run. Idempotent.
-- -------------------------------------------------------------------------
UPDATE transactions
SET description = 'Salary - ' || TRIM(TO_CHAR(date, 'Month YYYY'))
WHERE account_id = 'aa11ce01-1111-4111-a001-000000000001'
  AND category   = 'salary'
  AND merchant   = 'ACME LIMITED PAYROLL';


-- -------------------------------------------------------------------------
-- STEP 4: Verify
-- -------------------------------------------------------------------------
SELECT id, description, status, is_unusual, LEFT(unusual_reason, 80) AS unusual_reason_preview
FROM transactions
WHERE id = 'ff11ce01-aaaa-4001-a001-000000000002';

SELECT id, subject, status, priority, created_at
FROM support_tickets
WHERE user_id = '11ce0001-0001-4001-a001-000000000001'
ORDER BY created_at DESC;

SELECT COUNT(*) AS message_count
FROM support_messages
WHERE ticket_id = 'dd11ce01-1111-4111-a001-000000000003';

SELECT description, TO_CHAR(date, 'YYYY-MM-DD') AS dt
FROM transactions
WHERE account_id = 'aa11ce01-1111-4111-a001-000000000001'
  AND category = 'salary'
ORDER BY date DESC;
