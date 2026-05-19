-- =========================================================================
-- MOHAMMED ALI — CALL CENTER DB SEED
-- Run in Call Center Supabase SQL Editor
-- Customer: 22222222-2222-2222-2222-222222222222
-- =========================================================================

-- -------------------------------------------------------------------------
-- STEP 1: Check if Mohammed exists as a call center customer
-- -------------------------------------------------------------------------
SELECT id, name, email FROM customers
WHERE id = '22222222-2222-2222-2222-222222222222';


-- -------------------------------------------------------------------------
-- STEP 2: Upsert Mohammed as a call center customer (needed for FK)
-- Columns: id, name, email, phone, language, tier, kyc_status
-- -------------------------------------------------------------------------
INSERT INTO customers (id, name, email, phone, tier, kyc_status)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'Mohammed Ali',
  'mohammed.ali@email.com',
  '+971501234567',
  'premium',
  'verified'
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tier = EXCLUDED.tier;


-- -------------------------------------------------------------------------
-- STEP 3: Check existing conversations for Mohammed
-- -------------------------------------------------------------------------
SELECT id, subject, status, channel FROM conversations
WHERE customer_id = '22222222-2222-2222-2222-222222222222';


-- -------------------------------------------------------------------------
-- STEP 4: Conversation 1 — Suspicious login (chat, escalated)
-- Columns: id, customer_id, subject, channel, status, priority,
--          last_message, created_at, updated_at, source,
--          handover_required, sentiment, last_message_time
-- -------------------------------------------------------------------------
INSERT INTO conversations (
  id, customer_id, subject, channel, status, priority,
  last_message, created_at, updated_at,
  source, handover_required, sentiment, last_message_time
) VALUES (
  'cc002222-0001-4001-b001-000000000001',
  '22222222-2222-2222-2222-222222222222',
  'Suspicious login attempts detected',
  'chat', 'escalated', 'high',
  'We have secured your account and blocked the unrecognized device.',
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '1 day',
  'banking', true, 'negative',
  NOW() - INTERVAL '1 day'
)
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  last_message = EXCLUDED.last_message,
  updated_at = EXCLUDED.updated_at;


-- -------------------------------------------------------------------------
-- STEP 5: Messages for conversation 1
-- Columns: id, conversation_id, sender_type, sender_customer_id,
--          content, created_at, source, channel
-- -------------------------------------------------------------------------
INSERT INTO messages (id, conversation_id, sender_type, sender_customer_id, content, created_at, source, channel)
VALUES
  ('dd002222-0001-4001-c001-000000000001',
   'cc002222-0001-4001-b001-000000000001',
   'customer', '22222222-2222-2222-2222-222222222222',
   'I just received alerts about login attempts from a device I do not recognize. Is my account safe?',
   NOW() - INTERVAL '2 days', 'banking', 'chat'),

  ('dd002222-0001-4001-c001-000000000002',
   'cc002222-0001-4001-b001-000000000001',
   'ai', NULL,
   'I can see three failed login attempts from an unrecognized device in the last hour. As a precaution, I have placed a temporary hold on outbound transfers while we verify your identity.',
   NOW() - INTERVAL '2 days' + INTERVAL '3 minutes', 'banking', 'chat'),

  ('dd002222-0001-4001-c001-000000000003',
   'cc002222-0001-4001-b001-000000000001',
   'customer', '22222222-2222-2222-2222-222222222222',
   'That is worrying. I did not try to log in from any new device. Can you block that device completely?',
   NOW() - INTERVAL '2 days' + INTERVAL '10 minutes', 'banking', 'chat'),

  ('dd002222-0001-4001-c001-000000000004',
   'cc002222-0001-4001-b001-000000000001',
   'ai', NULL,
   'I am escalating this to our security team for immediate review. In the meantime, the device has been blocked and your outbound transfers remain on hold.',
   NOW() - INTERVAL '2 days' + INTERVAL '12 minutes', 'banking', 'chat'),

  ('dd002222-0001-4001-c001-000000000005',
   'cc002222-0001-4001-b001-000000000001',
   'agent', NULL,
   'Hi Mohammed, this is the security team. We have secured your account and permanently blocked the unrecognized device. Could you please confirm that your recent business payments of AED 12,400 and AED 8,750 were authorized by you?',
   NOW() - INTERVAL '1 day', 'banking', 'chat'),

  ('dd002222-0001-4001-c001-000000000006',
   'cc002222-0001-4001-b001-000000000001',
   'customer', '22222222-2222-2222-2222-222222222222',
   'Yes, both of those payments were mine. Thank you for acting quickly on this.',
   NOW() - INTERVAL '1 day' + INTERVAL '30 minutes', 'banking', 'chat')
ON CONFLICT (id) DO NOTHING;


-- -------------------------------------------------------------------------
-- STEP 6: Verify conversation 1 messages
-- -------------------------------------------------------------------------
SELECT id, sender_type, LEFT(content, 80) AS preview, created_at
FROM messages
WHERE conversation_id = 'cc002222-0001-4001-b001-000000000001'
ORDER BY created_at;


-- -------------------------------------------------------------------------
-- STEP 7: Add messages to existing "Account balance inquiry" conversation
-- (already exists as e2222222-2222-2222-2222-222222222222)
-- -------------------------------------------------------------------------
INSERT INTO messages (id, conversation_id, sender_type, sender_customer_id, content, created_at, source, channel)
VALUES
  ('dd002222-0002-4002-c002-000000000001',
   'e2222222-2222-2222-2222-222222222222',
   'customer', '22222222-2222-2222-2222-222222222222',
   'Can you confirm my total balance across all accounts and whether my last business loan payment has posted?',
   NOW() - INTERVAL '5 days', 'banking', 'email'),

  ('dd002222-0002-4002-c002-000000000002',
   'e2222222-2222-2222-2222-222222222222',
   'ai', NULL,
   'Your current combined balance across both accounts is AED 139,500. Your last loan payment of AED 4,975 posted successfully on the 1st of this month.',
   NOW() - INTERVAL '4 days' + INTERVAL '2 hours', 'banking', 'email'),

  ('dd002222-0002-4002-c002-000000000003',
   'e2222222-2222-2222-2222-222222222222',
   'customer', '22222222-2222-2222-2222-222222222222',
   'Great, thank you. One more thing — can I get a breakdown of my emergency fund transactions for the last 3 months?',
   NOW() - INTERVAL '4 days' + INTERVAL '4 hours', 'banking', 'email'),

  ('dd002222-0002-4002-c002-000000000004',
   'e2222222-2222-2222-2222-222222222222',
   'ai', NULL,
   'Your Emergency Fund account (ending 7891) had 2 deposits totalling AED 10,000 and no withdrawals in the last 3 months. The current balance is AED 50,000.',
   NOW() - INTERVAL '4 days' + INTERVAL '5 hours', 'banking', 'email')
ON CONFLICT (id) DO NOTHING;


-- -------------------------------------------------------------------------
-- STEP 8: Add messages to existing WhatsApp conversation
-- (already exists as 9c120766-ef1c-48fd-aa58-f7617faafb61)
-- -------------------------------------------------------------------------
INSERT INTO messages (id, conversation_id, sender_type, sender_customer_id, content, created_at, source, channel)
VALUES
  ('dd002222-0003-4003-c003-000000000001',
   '9c120766-ef1c-48fd-aa58-f7617faafb61',
   'customer', '22222222-2222-2222-2222-222222222222',
   'Hi, I want to increase my credit card limit. How do I apply?',
   NOW() - INTERVAL '1 day', 'banking', 'whatsapp'),

  ('dd002222-0003-4003-c003-000000000002',
   '9c120766-ef1c-48fd-aa58-f7617faafb61',
   'ai', NULL,
   'Hello Mohammed! You can apply for a credit limit increase through the app under Cards > Request Limit Increase, or I can start the process for you here. Would you like me to check your eligibility?',
   NOW() - INTERVAL '1 day' + INTERVAL '1 minute', 'banking', 'whatsapp'),

  ('dd002222-0003-4003-c003-000000000003',
   '9c120766-ef1c-48fd-aa58-f7617faafb61',
   'customer', '22222222-2222-2222-2222-222222222222',
   'Yes please, check my eligibility.',
   NOW() - INTERVAL '1 day' + INTERVAL '5 minutes', 'banking', 'whatsapp'),

  ('dd002222-0003-4003-c003-000000000004',
   '9c120766-ef1c-48fd-aa58-f7617faafb61',
   'ai', NULL,
   'Based on your account history and income, you are eligible for an increase from AED 25,000 to AED 40,000. Shall I submit the request?',
   NOW() - INTERVAL '1 day' + INTERVAL '6 minutes', 'banking', 'whatsapp')
ON CONFLICT (id) DO NOTHING;


-- -------------------------------------------------------------------------
-- STEP 9: Verify all conversation messages
-- -------------------------------------------------------------------------
SELECT c.subject, COUNT(m.id) AS message_count
FROM conversations c
LEFT JOIN messages m ON m.conversation_id = c.id
WHERE c.customer_id = '22222222-2222-2222-2222-222222222222'
GROUP BY c.id, c.subject
ORDER BY c.created_at;
