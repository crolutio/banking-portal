-- =========================================================================
-- MOHAMMED ALI — STORYLINE PATCH (Banking DB)
-- "The Growing Entrepreneur"
-- Run in Banking Supabase SQL Editor
-- =========================================================================

-- -------------------------------------------------------------------------
-- STEP 1: Add recent business transactions (last 30 days)
-- His existing txns are from Nov 2025 — need fresh ones
-- -------------------------------------------------------------------------
INSERT INTO transactions (account_id, date, description, amount, type, category, status, balance_after)
VALUES
  -- Salary / Business revenue (recent)
  ('aaaa2222-1111-1111-1111-111111111111', NOW() - INTERVAL '2 days', 'Client Invoice Payment — Al Noor Trading', 42000, 'credit', 'salary', 'completed', 89500),
  ('aaaa2222-1111-1111-1111-111111111111', NOW() - INTERVAL '15 days', 'Business Revenue — Q1 consulting', 38000, 'credit', 'salary', 'completed', 75000),

  -- Business operations
  ('aaaa2222-1111-1111-1111-111111111111', NOW() - INTERVAL '1 day', 'Office Rent — DIFC', 12000, 'debit', 'utilities', 'completed', 77500),
  ('aaaa2222-1111-1111-1111-111111111111', NOW() - INTERVAL '3 days', 'Supplier Payment — Al Futtaim Group', 8500, 'debit', 'other', 'completed', 81000),
  ('aaaa2222-1111-1111-1111-111111111111', NOW() - INTERVAL '5 days', 'Supplier Payment — Emirates Steel', 15200, 'debit', 'other', 'completed', 74300),
  ('aaaa2222-1111-1111-1111-111111111111', NOW() - INTERVAL '7 days', 'Staff Salaries — 3 employees', 21000, 'debit', 'transfer', 'completed', 68800),
  ('aaaa2222-1111-1111-1111-111111111111', NOW() - INTERVAL '8 days', 'Etisalat Business — office internet + phones', 890, 'debit', 'utilities', 'completed', 67910),

  -- Loan payments
  ('aaaa2222-1111-1111-1111-111111111111', NOW() - INTERVAL '10 days', 'Business Loan Payment', 4975, 'debit', 'transfer', 'completed', 62935),
  ('aaaa2222-1111-1111-1111-111111111111', NOW() - INTERVAL '10 days', 'Mortgage Payment', 8200, 'debit', 'transfer', 'completed', 54735),
  ('aaaa2222-1111-1111-1111-111111111111', NOW() - INTERVAL '10 days', 'Personal Loan Payment', 2260, 'debit', 'transfer', 'completed', 52475),

  -- International / expansion
  ('aaaa2222-1111-1111-1111-111111111111', NOW() - INTERVAL '4 days', 'International Wire — UK supplier (GBP)', 18500, 'debit', 'transfer', 'completed', 70000),
  ('aaaa2222-1111-1111-1111-111111111111', NOW() - INTERVAL '6 days', 'Trade License Renewal — DED', 4500, 'debit', 'fees', 'completed', 73800),
  ('aaaa2222-1111-1111-1111-111111111111', NOW() - INTERVAL '12 days', 'Business Trip — Riyadh flights + hotel', 3200, 'debit', 'travel', 'completed', 59735),

  -- Personal
  ('aaaa2222-1111-1111-1111-111111111111', NOW() - INTERVAL '2 days', 'Carrefour — groceries', 480, 'debit', 'groceries', 'completed', 89020),
  ('aaaa2222-1111-1111-1111-111111111111', NOW() - INTERVAL '4 days', 'LPM Restaurant — dinner', 650, 'debit', 'restaurants', 'completed', 87870),
  ('aaaa2222-1111-1111-1111-111111111111', NOW() - INTERVAL '9 days', 'DEWA — electricity', 520, 'debit', 'utilities', 'completed', 67390),

  -- Emergency fund deposit
  ('aaaa2222-2222-2222-2222-222222222222', NOW() - INTERVAL '14 days', 'Transfer from Current — monthly savings', 5000, 'credit', 'transfer', 'completed', 50000);

-- -------------------------------------------------------------------------
-- STEP 2: Re-insert support tickets (failed earlier due to RLS)
-- -------------------------------------------------------------------------
INSERT INTO support_tickets (id, user_id, subject, status, priority, assigned_to, created_at, updated_at)
VALUES
  ('aa002222-0002-4002-a002-000000000001',
   '22222222-2222-2222-2222-222222222222',
   'Business account statement for visa',
   'in_progress', 'medium',
   '51880b1d-3935-49dd-bac6-9469d33d3ee3',
   '2024-12-17T08:40:00Z', '2024-12-17T12:15:00Z'),

  ('aa002222-0002-4002-a002-000000000002',
   '22222222-2222-2222-2222-222222222222',
   'International wire transfer fees',
   'open', 'low',
   NULL,
   '2025-01-10T10:00:00Z', '2025-01-10T10:00:00Z')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = EXCLUDED.updated_at;

-- -------------------------------------------------------------------------
-- STEP 3: Support messages for ticket 1
-- -------------------------------------------------------------------------
INSERT INTO support_messages (id, ticket_id, sender_type, sender_id, content, created_at)
VALUES
  ('bb002222-0003-4003-a003-000000000001',
   'aa002222-0002-4002-a002-000000000001',
   'user', '22222222-2222-2222-2222-222222222222',
   'Hi, I need official stamped statements for my business account for the last 6 months. This is for visa processing — quite urgent.',
   '2024-12-17T08:40:00Z'),

  ('bb002222-0003-4003-a003-000000000002',
   'aa002222-0002-4002-a002-000000000001',
   'agent', '51880b1d-3935-49dd-bac6-9469d33d3ee3',
   'Got it, Mohammed. I will have the branch prepare stamped statements and email them to you within 24 hours.',
   '2024-12-17T12:15:00Z'),

  ('bb002222-0003-4003-a003-000000000003',
   'aa002222-0002-4002-a002-000000000001',
   'user', '22222222-2222-2222-2222-222222222222',
   'Thank you. Can you also include a salary certificate if that is something you can provide?',
   '2024-12-17T14:00:00Z'),

  ('bb002222-0003-4003-a003-000000000004',
   'aa002222-0002-4002-a002-000000000001',
   'agent', '51880b1d-3935-49dd-bac6-9469d33d3ee3',
   'Salary certificates are issued by your employer, but I can provide a bank reference letter confirming your account relationship and average balance. Would that help?',
   '2024-12-17T15:30:00Z')
ON CONFLICT (id) DO NOTHING;

-- -------------------------------------------------------------------------
-- STEP 4: Support messages for ticket 2
-- -------------------------------------------------------------------------
INSERT INTO support_messages (id, ticket_id, sender_type, sender_id, content, created_at)
VALUES
  ('bb002222-0003-4003-a003-000000000005',
   'aa002222-0002-4002-a002-000000000002',
   'user', '22222222-2222-2222-2222-222222222222',
   'What are the fees for international wire transfers to the UK? I need to send GBP 15,000.',
   '2025-01-10T10:00:00Z'),

  ('bb002222-0003-4003-a003-000000000006',
   'aa002222-0002-4002-a002-000000000002',
   'ai', NULL,
   'For international wires to the UK, the fee is AED 75 flat plus a 0.15% FX markup on the converted amount. For GBP 15,000, that would be approximately AED 75 + AED 105 = AED 180 total.',
   '2025-01-10T10:02:00Z')
ON CONFLICT (id) DO NOTHING;

-- -------------------------------------------------------------------------
-- STEP 5: Verify
-- -------------------------------------------------------------------------
SELECT category, COUNT(*) AS cnt, ROUND(SUM(ABS(amount))::numeric, 0) AS total
FROM transactions
WHERE account_id IN ('aaaa2222-1111-1111-1111-111111111111','aaaa2222-2222-2222-2222-222222222222')
  AND date >= NOW() - INTERVAL '30 days'
GROUP BY category
ORDER BY total DESC;

SELECT id, subject, status, priority FROM support_tickets
WHERE user_id = '22222222-2222-2222-2222-222222222222';
