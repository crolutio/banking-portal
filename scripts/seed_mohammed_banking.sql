-- =========================================================================
-- MOHAMMED ALI — BANKING DB SEED
-- Run in Banking Supabase SQL Editor
-- Customer: 22222222-2222-2222-2222-222222222222
-- RM James:  51880b1d-3935-49dd-bac6-9469d33d3ee3
-- =========================================================================

-- -------------------------------------------------------------------------
-- STEP 1: Verify profile exists
-- -------------------------------------------------------------------------
SELECT id, full_name, email, assigned_rm_id
FROM profiles
WHERE id = '22222222-2222-2222-2222-222222222222';


-- -------------------------------------------------------------------------
-- STEP 2: Check existing loans
-- -------------------------------------------------------------------------
SELECT id, customer_id, type, principal_amount, remaining_balance, status
FROM loans
WHERE customer_id = '22222222-2222-2222-2222-222222222222';


-- -------------------------------------------------------------------------
-- STEP 3: Insert a personal loan (skip if Mohammed already has loans)
-- Columns: id, customer_id, product_id, type, principal_amount,
--          remaining_balance, interest_rate, term_months, monthly_payment,
--          next_payment_date, disbursement_date, status
-- -------------------------------------------------------------------------
INSERT INTO loans (
  id, customer_id, type,
  principal_amount, remaining_balance, interest_rate,
  term_months, monthly_payment, status,
  disbursement_date, next_payment_date
) VALUES (
  'aa002222-0001-4001-a001-000000000001',
  '22222222-2222-2222-2222-222222222222',
  'personal',
  75000.00, 52000.00, 5.50,
  36, 2260.00, 'active',
  '2024-06-15', CURRENT_DATE + INTERVAL '12 days'
)
ON CONFLICT (id) DO UPDATE SET
  remaining_balance = EXCLUDED.remaining_balance,
  status = EXCLUDED.status,
  next_payment_date = EXCLUDED.next_payment_date;


-- -------------------------------------------------------------------------
-- STEP 4: Verify loans after insert
-- -------------------------------------------------------------------------
SELECT id, type, principal_amount, remaining_balance, status
FROM loans
WHERE customer_id = '22222222-2222-2222-2222-222222222222';


-- -------------------------------------------------------------------------
-- STEP 5: Insert support ticket
-- Columns: id, user_id, subject, status (ticket_status enum),
--          priority (ticket_priority enum), assigned_to, created_at, updated_at
-- -------------------------------------------------------------------------
INSERT INTO support_tickets (
  id, user_id, subject, status, priority, assigned_to, created_at, updated_at
) VALUES (
  'aa002222-0002-4002-a002-000000000001',
  '22222222-2222-2222-2222-222222222222',
  'Business account statement for visa',
  'in_progress', 'medium',
  '51880b1d-3935-49dd-bac6-9469d33d3ee3',
  '2024-12-17T08:40:00Z', '2024-12-17T12:15:00Z'
)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = EXCLUDED.updated_at;


-- -------------------------------------------------------------------------
-- STEP 6: Insert a second support ticket
-- -------------------------------------------------------------------------
INSERT INTO support_tickets (
  id, user_id, subject, status, priority, assigned_to, created_at, updated_at
) VALUES (
  'aa002222-0002-4002-a002-000000000002',
  '22222222-2222-2222-2222-222222222222',
  'International wire transfer fees',
  'open', 'low',
  NULL,
  '2025-01-10T10:00:00Z', '2025-01-10T10:00:00Z'
)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = EXCLUDED.updated_at;


-- -------------------------------------------------------------------------
-- STEP 7: Verify tickets
-- -------------------------------------------------------------------------
SELECT id, subject, status, priority FROM support_tickets
WHERE user_id = '22222222-2222-2222-2222-222222222222';


-- -------------------------------------------------------------------------
-- STEP 8: Insert support messages for ticket 1
-- Columns: id, ticket_id, sender_type, sender_id, content, created_at
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
-- STEP 9: Insert support messages for ticket 2
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
-- STEP 10: Verify messages
-- -------------------------------------------------------------------------
SELECT sm.id, sm.ticket_id, sm.sender_type, LEFT(sm.content, 60) AS content_preview
FROM support_messages sm
JOIN support_tickets st ON sm.ticket_id = st.id
WHERE st.user_id = '22222222-2222-2222-2222-222222222222'
ORDER BY sm.created_at;
