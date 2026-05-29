-- =========================================================================
-- KENYA — CALL CENTER CONVERSATIONS SEED
-- Run in the CALL CENTER Supabase SQL Editor.
-- Prerequisite: seed_kenya_callcenter_customers.sql must be run first.
--
-- 6 conversations (3 per client) spanning the channels we showcase
-- (chat, whatsapp, email, voice) and sentiment mix (positive, neutral, negative).
--
-- Conversation ID convention:  cc11ce<persona>-<seq>-4<seq>-b<seq>-<padding>
-- =========================================================================


-- -------------------------------------------------------------------------
-- WANJIRU KAMAU — 3 conversations
-- -------------------------------------------------------------------------

INSERT INTO conversations (
  id, customer_id, subject, channel, status, priority,
  last_message, created_at, updated_at,
  source, handover_required, sentiment, last_message_time, market
) VALUES

-- 1. Push-notification "login from Mombasa" — recent, escalated, negative
('cc11ce01-0001-4001-b001-000000000001',
 '11ce0001-0001-4001-a001-000000000001',
 'Push alert: login attempt from Mombasa',
 'voice', 'escalated', 'high',
 'Security team confirmed the device has been blocked and your account is secure.',
 NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days' + INTERVAL '2 hours',
 'banking', true, 'negative', NOW() - INTERVAL '3 days' + INTERVAL '2 hours',
 'kenya'),

-- 2. M-Pesa to bank reconciliation — older, resolved, positive
('cc11ce01-0001-4001-b001-000000000002',
 '11ce0001-0001-4001-a001-000000000001',
 'M-Pesa top-up not reflecting in bank balance',
 'chat', 'resolved', 'medium',
 'Resolved — the KES 8,000 has been credited and a goodwill KES 200 fee waiver applied.',
 NOW() - INTERVAL '12 days', NOW() - INTERVAL '12 days' + INTERVAL '45 minutes',
 'banking', false, 'positive', NOW() - INTERVAL '12 days' + INTERVAL '45 minutes',
 'kenya'),

-- 3. WhatsApp: card declined at supermarket — older, resolved, neutral
('cc11ce01-0001-4001-b001-000000000003',
 '11ce0001-0001-4001-a001-000000000001',
 'Debit card declined at Naivas — daily limit?',
 'whatsapp', 'resolved', 'low',
 'Daily POS limit increased to KES 200,000 for the rest of the month as requested.',
 NOW() - INTERVAL '30 days', NOW() - INTERVAL '30 days' + INTERVAL '20 minutes',
 'banking', false, 'neutral', NOW() - INTERVAL '30 days' + INTERVAL '20 minutes',
 'kenya')

ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  last_message = EXCLUDED.last_message,
  updated_at = EXCLUDED.updated_at,
  sentiment = EXCLUDED.sentiment,
  market = EXCLUDED.market;


-- -------------------------------------------------------------------------
-- OTIENO OUMA — 3 conversations
-- -------------------------------------------------------------------------

INSERT INTO conversations (
  id, customer_id, subject, channel, status, priority,
  last_message, created_at, updated_at,
  source, handover_required, sentiment, last_message_time, market
) VALUES

-- 1. Email: branch promised next-day clearing on cheque, still pending — open, negative
('cc11ce02-0002-4002-b002-000000000001',
 '11ce0002-0002-4002-a002-000000000002',
 'Cheque clearing taking longer than promised',
 'email', 'open', 'high',
 'I appreciate the explanation but I need the funds available by tomorrow to clear supplier payments.',
 NOW() - INTERVAL '8 days', NOW() - INTERVAL '6 days',
 'banking', false, 'negative', NOW() - INTERVAL '6 days',
 'kenya'),

-- 2. WhatsApp: sub-account for KEMSA tender funds — older, resolved, neutral
('cc11ce02-0002-4002-b002-000000000002',
 '11ce0002-0002-4002-a002-000000000002',
 'Need a sub-account for KEMSA tender funds',
 'whatsapp', 'resolved', 'medium',
 'Sub-account KE07033KCB2200000004000 opened and linked to your SME current account.',
 NOW() - INTERVAL '25 days', NOW() - INTERVAL '24 days',
 'banking', false, 'neutral', NOW() - INTERVAL '24 days',
 'kenya'),

-- 3. Chat: fleet card declined at fuel station — recent, resolved, neutral
('cc11ce02-0002-4002-b002-000000000003',
 '11ce0002-0002-4002-a002-000000000002',
 'Business debit declined at Shell Mlolongo',
 'chat', 'resolved', 'medium',
 'Per-transaction limit raised from KES 50,000 to KES 75,000 for fleet fuel purchases.',
 NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days' + INTERVAL '35 minutes',
 'banking', false, 'neutral', NOW() - INTERVAL '6 days' + INTERVAL '35 minutes',
 'kenya')

ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  last_message = EXCLUDED.last_message,
  updated_at = EXCLUDED.updated_at,
  sentiment = EXCLUDED.sentiment,
  market = EXCLUDED.market;


-- -------------------------------------------------------------------------
-- Verify
-- -------------------------------------------------------------------------
SELECT c.name AS customer, co.subject, co.channel, co.status, co.sentiment, co.created_at
FROM conversations co
JOIN customers c ON co.customer_id = c.id
WHERE co.market = 'kenya'
ORDER BY c.name, co.created_at DESC;
