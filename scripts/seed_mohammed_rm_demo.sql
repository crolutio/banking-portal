-- Mohammed Ali RM demo data (banking + call center)
-- Run in Supabase SQL Editor. Customer id: 22222222-2222-2222-2222-222222222222

-- ---------------------------------------------------------------------------
-- 1) Verify profile
-- ---------------------------------------------------------------------------
SELECT id, full_name, email, assigned_rm_id
FROM profiles
WHERE id = '22222222-2222-2222-2222-222222222222';

-- ---------------------------------------------------------------------------
-- 2) Banking: business loan (uses customer_id — matches app queries)
-- ---------------------------------------------------------------------------
INSERT INTO loans (
  id,
  customer_id,
  product_id,
  type,
  principal_amount,
  remaining_balance,
  interest_rate,
  term_months,
  monthly_payment,
  status,
  disbursement_date,
  next_payment_date
)
SELECT
  'aaaa2222-0001-0001-0001-000000000001',
  '22222222-2222-2222-2222-222222222222',
  (SELECT id FROM loan_products WHERE name = 'Business Loan' LIMIT 1),
  'business',
  250000.00,
  187500.00,
  7.25,
  60,
  4975.00,
  'active',
  '2023-03-01',
  CURRENT_DATE + INTERVAL '14 days'
WHERE EXISTS (SELECT 1 FROM profiles WHERE id = '22222222-2222-2222-2222-222222222222')
ON CONFLICT (id) DO UPDATE SET
  customer_id = EXCLUDED.customer_id,
  remaining_balance = EXCLUDED.remaining_balance,
  status = EXCLUDED.status,
  next_payment_date = EXCLUDED.next_payment_date;

-- If your loans table still uses user_id instead of customer_id, run this instead:
-- UPDATE loans SET user_id = '22222222-2222-2222-2222-222222222222'
-- WHERE id = 'aaaa2222-0001-0001-0001-000000000001';

-- ---------------------------------------------------------------------------
-- 3) Banking: support ticket (shown in unified Support section)
-- ---------------------------------------------------------------------------
INSERT INTO support_tickets (id, user_id, subject, status, priority, assigned_to, created_at, updated_at)
VALUES (
  'aaaa1003-0001-0001-0001-000000000003',
  '22222222-2222-2222-2222-222222222222',
  'Business account statement for visa',
  'in_progress',
  'medium',
  '51880b1d-3935-49dd-bac6-9469d33d3ee3',
  '2024-12-17T08:40:00Z',
  '2024-12-17T12:15:00Z'
)
ON CONFLICT (id) DO UPDATE SET
  user_id = EXCLUDED.user_id,
  status = EXCLUDED.status,
  updated_at = EXCLUDED.updated_at;

INSERT INTO support_messages (id, ticket_id, sender_id, sender_type, content, created_at)
VALUES
  ('abcd1003-0001-0001-0001-000000000001', 'aaaa1003-0001-0001-0001-000000000003', '22222222-2222-2222-2222-222222222222', 'user',
   'Need official statements for my business account for visa processing. Last 6 months.', '2024-12-17T08:40:00Z'),
  ('abcd1003-0002-0001-0001-000000000002', 'aaaa1003-0001-0001-0001-000000000003', '51880b1d-3935-49dd-bac6-9469d33d3ee3', 'agent',
   'Got it. We will prepare stamped statements and email them within 24 hours.', '2024-12-17T12:15:00Z')
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 4) Call center: conversations + message history (run on CALL CENTER project)
-- ---------------------------------------------------------------------------
-- Conversation: potential account takeover (Mohammed storyline)
INSERT INTO conversations (
  id, customer_id, subject, channel, status, priority, last_message,
  created_at, updated_at, source, handover_required, sentiment, last_message_time
) VALUES (
  'moh-conv-0001-0001-0001-000000000001',
  '22222222-2222-2222-2222-222222222222',
  'Suspicious login attempts detected',
  'chat',
  'escalated',
  'high',
  'We have secured your account and blocked the unrecognized device.',
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '1 day',
  'banking',
  true,
  'negative',
  NOW() - INTERVAL '1 day'
)
ON CONFLICT (id) DO UPDATE SET
  customer_id = EXCLUDED.customer_id,
  status = EXCLUDED.status,
  last_message = EXCLUDED.last_message;

INSERT INTO messages (
  id, conversation_id, sender_type, sender_customer_id, content, created_at, source, channel
) VALUES
  ('moh-msg-0001-0001-0001-000000000001', 'moh-conv-0001-0001-0001-000000000001', 'customer', '22222222-2222-2222-2222-222222222222',
   'I got alerts about logins from a device I do not recognize. Is my account safe?', NOW() - INTERVAL '2 days', 'banking', 'chat'),
  ('moh-msg-0001-0001-0001-000000000002', 'moh-conv-0001-0001-0001-000000000001', 'ai', NULL,
   'I see three failed login attempts from an unknown device. I have placed a temporary hold on outbound transfers while we verify.', NOW() - INTERVAL '2 days' + INTERVAL '3 minutes', 'banking', 'chat'),
  ('moh-msg-0001-0001-0001-000000000003', 'moh-conv-0001-0001-0001-000000000001', 'agent', NULL,
   'We have secured your account and blocked the unrecognized device. Please confirm your recent business payments were made by you.', NOW() - INTERVAL '1 day', 'banking', 'chat')
ON CONFLICT (id) DO NOTHING;

-- Conversation: liquidity / statement request
INSERT INTO conversations (
  id, customer_id, subject, channel, status, priority, last_message,
  created_at, updated_at, source, handover_required, sentiment, last_message_time
) VALUES (
  'moh-conv-0002-0001-0001-000000000002',
  '22222222-2222-2222-2222-222222222222',
  'Account balance inquiry',
  'email',
  'active',
  'medium',
  'Your current balance across accounts is AED 139,500.',
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '4 days',
  'banking',
  false,
  'neutral',
  NOW() - INTERVAL '4 days'
)
ON CONFLICT (id) DO UPDATE SET
  customer_id = EXCLUDED.customer_id,
  last_message = EXCLUDED.last_message;

INSERT INTO messages (
  id, conversation_id, sender_type, sender_customer_id, content, created_at, source, channel
) VALUES
  ('moh-msg-0002-0001-0001-000000000001', 'moh-conv-0002-0001-0001-000000000002', 'customer', '22222222-2222-2222-2222-222222222222',
   'Can you confirm my total balance and whether my business loan payment posted?', NOW() - INTERVAL '5 days', 'banking', 'email'),
  ('moh-msg-0002-0001-0001-000000000002', 'moh-conv-0002-0001-0001-000000000002', 'ai', NULL,
   'Your current balance across accounts is AED 139,500. Your last loan payment of AED 4,975 posted on the 1st.', NOW() - INTERVAL '4 days', 'banking', 'email')
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 5) Verification queries
-- ---------------------------------------------------------------------------
-- Banking DB:
SELECT id, type, remaining_balance, status FROM loans
WHERE customer_id = '22222222-2222-2222-2222-222222222222'
   OR user_id = '22222222-2222-2222-2222-222222222222';

SELECT id, subject, status FROM support_tickets
WHERE user_id = '22222222-2222-2222-2222-222222222222';

-- Call center DB:
SELECT id, subject, status, channel FROM conversations
WHERE customer_id = '22222222-2222-2222-2222-222222222222';

SELECT conversation_id, COUNT(*) AS message_count FROM messages
WHERE conversation_id IN (
  'moh-conv-0001-0001-0001-000000000001',
  'moh-conv-0002-0001-0001-000000000002'
)
GROUP BY conversation_id;
