-- =========================================================================
-- SARAH CHEN — STORYLINE PATCH (Banking DB)
-- "The Frustrated Traveler"
-- Run in Banking Supabase SQL Editor
-- =========================================================================

-- -------------------------------------------------------------------------
-- STEP 1: Delete the fraud-demo transactions (last 7 days)
-- These muddy the traveler storyline
-- -------------------------------------------------------------------------
DELETE FROM transactions
WHERE account_id IN (
  'aaaa1111-1111-1111-1111-111111111111',
  'aaaa1111-2222-2222-2222-222222222222',
  'aaaa1111-3333-3333-3333-333333333333'
)
AND date >= NOW() - INTERVAL '7 days'
AND (
  description ILIKE '%shell company%'
  OR description ILIKE '%crypto%'
  OR description ILIKE '%high-risk corridor%'
  OR description ILIKE '%structuring pattern%'
  OR description ILIKE '%wagering%'
  OR description ILIKE '%ATM cash advance - overseas%'
);

-- -------------------------------------------------------------------------
-- STEP 2: Add recent travel & dining transactions (last 30 days)
-- These reinforce the "frequent traveler, heavy diner" story
-- -------------------------------------------------------------------------
INSERT INTO transactions (account_id, date, description, amount, type, category, status, balance_after)
VALUES
  -- Suspicious transactions (keep for fraud demo)
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '1 day', 'Online purchase — unfamiliar electronics merchant (Shenzhen)', 2450, 'debit', 'shopping', 'completed', 33261),
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '4 days', 'ATM withdrawal — Bucharest, Romania', 3600, 'debit', 'other', 'completed', 36165),

  -- Week 1: London trip expenses
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '3 days', 'British Airways — LHR round trip', 4200, 'debit', 'travel', 'completed', 40350),
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '3 days', 'Hilton London Bankside — 4 nights', 3800, 'debit', 'travel', 'completed', 36550),
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '2 days', 'Uber London — Heathrow to hotel', 85, 'debit', 'transport', 'completed', 36465),
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '2 days', 'The Wolseley — dinner', 420, 'debit', 'restaurants', 'completed', 36045),
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '2 days', 'Dishoom King''s Cross — lunch', 165, 'debit', 'restaurants', 'completed', 35880),
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '1 day', 'Foreign transaction fee — GBP purchases', 127, 'debit', 'fees', 'completed', 35753),
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '1 day', 'Pret A Manger London', 42, 'debit', 'restaurants', 'completed', 35711),

  -- Week 2: Dubai dining and regular spend
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '8 days', 'Nobu Dubai — team dinner', 1850, 'debit', 'restaurants', 'completed', 42200),
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '9 days', 'Zuma DIFC — client lunch', 890, 'debit', 'restaurants', 'completed', 41310),
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '10 days', 'Emirates Skywards — annual membership', 2400, 'debit', 'travel', 'completed', 38910),
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '10 days', 'La Petite Maison — dinner', 680, 'debit', 'restaurants', 'completed', 38230),

  -- Week 3: Regular expenses + salary
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '15 days', 'Salary Credit — TechCorp LLC', 28000, 'credit', 'salary', 'completed', 72550),
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '14 days', 'Personal Loan Payment', 1521, 'debit', 'transfer', 'completed', 71029),
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '16 days', 'Carrefour — groceries', 340, 'debit', 'groceries', 'completed', 70689),
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '17 days', 'DEWA — electricity', 385, 'debit', 'utilities', 'completed', 70304),
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '18 days', 'Etisalat — mobile plan', 299, 'debit', 'utilities', 'completed', 70005),

  -- Week 4: Previous Singapore trip
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '22 days', 'Singapore Airlines — SIN return', 3100, 'debit', 'travel', 'completed', 66905),
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '21 days', 'Marina Bay Sands — 3 nights', 2900, 'debit', 'travel', 'completed', 64005),
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '20 days', 'CÉ LA VI Singapore — dinner', 380, 'debit', 'restaurants', 'completed', 63625),
  ('aaaa1111-1111-1111-1111-111111111111', NOW() - INTERVAL '20 days', 'Foreign transaction fee — SGD purchases', 95, 'debit', 'fees', 'completed', 63530);

-- -------------------------------------------------------------------------
-- STEP 2b: Flag the suspicious transactions
-- -------------------------------------------------------------------------
UPDATE transactions
SET is_unusual = true,
    unusual_reason = 'Unknown electronics merchant in Shenzhen — no prior purchase history with this vendor'
WHERE account_id = 'aaaa1111-1111-1111-1111-111111111111'
  AND description ILIKE '%unfamiliar electronics merchant%'
  AND date >= NOW() - INTERVAL '7 days';

UPDATE transactions
SET is_unusual = true,
    unusual_reason = 'ATM withdrawal in Romania — no travel notice filed, outside normal geographic pattern'
WHERE account_id = 'aaaa1111-1111-1111-1111-111111111111'
  AND description ILIKE '%Bucharest%'
  AND date >= NOW() - INTERVAL '7 days';

-- -------------------------------------------------------------------------
-- STEP 3: Add support tickets for Sarah
-- -------------------------------------------------------------------------
INSERT INTO support_tickets (id, user_id, subject, status, priority, created_at, updated_at)
VALUES
  ('ee004e14-0001-4001-a001-000000000001',
   '4e140685-8f38-49ff-aae0-d6109c46873d',
   'Card blocked during London trip — urgent',
   'open', 'high',
   NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day'),

  ('ee004e14-0001-4001-a001-000000000002',
   '4e140685-8f38-49ff-aae0-d6109c46873d',
   'Foreign transaction fees — can these be waived?',
   'in_progress', 'medium',
   NOW() - INTERVAL '5 days', NOW() - INTERVAL '4 days')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = EXCLUDED.updated_at;

-- -------------------------------------------------------------------------
-- STEP 4: Add messages for ticket 1 (card blocked in London)
-- -------------------------------------------------------------------------
INSERT INTO support_messages (id, ticket_id, sender_type, sender_id, content, created_at)
VALUES
  ('ff004e14-0001-4001-b001-000000000001',
   'ee004e14-0001-4001-a001-000000000001',
   'user', '4e140685-8f38-49ff-aae0-d6109c46873d',
   'My card was blocked while I was trying to pay at a restaurant in London. This is the third time this has happened on a trip. Really frustrating.',
   NOW() - INTERVAL '2 days'),

  ('ff004e14-0001-4001-b001-000000000002',
   'ee004e14-0001-4001-a001-000000000001',
   'ai', NULL,
   'I apologize for the inconvenience. I can see your card was flagged by our fraud system due to a GBP transaction. I have temporarily unblocked it for the next 72 hours. For future trips, I recommend setting a travel notice in advance.',
   NOW() - INTERVAL '2 days' + INTERVAL '5 minutes'),

  ('ff004e14-0001-4001-b001-000000000003',
   'ee004e14-0001-4001-a001-000000000001',
   'user', '4e140685-8f38-49ff-aae0-d6109c46873d',
   'I did set a travel notice this time! I set one through the app before I left. This keeps happening and its embarrassing at restaurants. I need a card that actually works internationally.',
   NOW() - INTERVAL '1 day')
ON CONFLICT (id) DO NOTHING;

-- -------------------------------------------------------------------------
-- STEP 5: Add messages for ticket 2 (FX fees)
-- -------------------------------------------------------------------------
INSERT INTO support_messages (id, ticket_id, sender_type, sender_id, content, created_at)
VALUES
  ('ff004e14-0002-4002-b002-000000000001',
   'ee004e14-0001-4001-a001-000000000002',
   'user', '4e140685-8f38-49ff-aae0-d6109c46873d',
   'I just noticed I am being charged AED 127 in foreign transaction fees from my London trip, plus AED 95 from Singapore last month. I travel every few weeks for work — these fees add up. Is there a way to avoid them?',
   NOW() - INTERVAL '5 days'),

  ('ff004e14-0002-4002-b002-000000000002',
   'ee004e14-0001-4001-a001-000000000002',
   'agent', NULL,
   'Thank you for flagging this, Sarah. Your current credit card charges 2.99% on foreign transactions. I will check with your relationship manager about options that may offer lower or zero FX fees. There are cards in our range specifically designed for frequent travelers.',
   NOW() - INTERVAL '4 days')
ON CONFLICT (id) DO NOTHING;

-- -------------------------------------------------------------------------
-- STEP 6: Verify
-- -------------------------------------------------------------------------
SELECT category, COUNT(*) AS cnt, ROUND(SUM(ABS(amount))::numeric, 0) AS total
FROM transactions
WHERE account_id IN ('aaaa1111-1111-1111-1111-111111111111','aaaa1111-2222-2222-2222-222222222222','aaaa1111-3333-3333-3333-333333333333')
  AND date >= NOW() - INTERVAL '30 days'
GROUP BY category
ORDER BY total DESC;

SELECT id, subject, status, priority FROM support_tickets
WHERE user_id = '4e140685-8f38-49ff-aae0-d6109c46873d';
