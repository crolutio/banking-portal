-- =========================================================================
-- KENYA — CALL CENTER MESSAGES SEED
-- Run in the CALL CENTER Supabase SQL Editor.
-- Prerequisite: seed_kenya_callcenter_conversations.sql must be run first.
--
-- ~32 messages across the 6 conversations.
-- Message ID convention:  dd11ce<persona>-<conv>-4<conv>-c<conv>-<seq_padded>
-- =========================================================================


-- =========================================================================
-- WANJIRU — Conv 1: Push alert: login attempt from Mombasa  (voice, escalated)
-- =========================================================================

INSERT INTO messages (
  id, conversation_id, sender_type, sender_customer_id,
  content, created_at, source, channel, market
) VALUES
('dd11ce01-0001-4001-c001-000000000001',
 'cc11ce01-0001-4001-b001-000000000001',
 'customer', '11ce0001-0001-4001-a001-000000000001',
 'I just got a push notification on my phone saying someone logged into my account from Mombasa. I am in Nairobi. Please secure my account immediately.',
 NOW() - INTERVAL '3 days', 'banking', 'voice', 'kenya'),

('dd11ce01-0001-4001-c001-000000000002',
 'cc11ce01-0001-4001-b001-000000000001',
 'ai', NULL,
 'I see the alert on your file, Wanjiru. I have already placed a 30-minute hold on outbound transfers and blocked the new device pending verification. Connecting you to our security team now.',
 NOW() - INTERVAL '3 days' + INTERVAL '2 minutes', 'banking', 'voice', 'kenya'),

('dd11ce01-0001-4001-c001-000000000003',
 'cc11ce01-0001-4001-b001-000000000001',
 'agent', NULL,
 'Hi Wanjiru, security team here. The login was from a Samsung device on an MTN Mombasa IP — definitely not yours. We have permanently blocked the device, rotated your session tokens, and the temporary outbound hold is now lifted. Please change your password through the app when convenient.',
 NOW() - INTERVAL '3 days' + INTERVAL '90 minutes', 'banking', 'voice', 'kenya'),

('dd11ce01-0001-4001-c001-000000000004',
 'cc11ce01-0001-4001-b001-000000000001',
 'customer', '11ce0001-0001-4001-a001-000000000001',
 'Thank you for the quick response. Should I also worry about my Goal Saver and USD wallet?',
 NOW() - INTERVAL '3 days' + INTERVAL '110 minutes', 'banking', 'voice', 'kenya'),

('dd11ce01-0001-4001-c001-000000000005',
 'cc11ce01-0001-4001-b001-000000000001',
 'agent', NULL,
 'All three accounts are linked to the same login, so by securing the login we have secured all of them. No outbound transfers were attempted from any account. You are fully protected.',
 NOW() - INTERVAL '3 days' + INTERVAL '2 hours', 'banking', 'voice', 'kenya')
ON CONFLICT (id) DO NOTHING;


-- =========================================================================
-- WANJIRU — Conv 2: M-Pesa top-up not reflecting  (chat, resolved, positive)
-- =========================================================================

INSERT INTO messages (
  id, conversation_id, sender_type, sender_customer_id,
  content, created_at, source, channel, market
) VALUES
('dd11ce01-0002-4002-c002-000000000001',
 'cc11ce01-0001-4001-b001-000000000002',
 'customer', '11ce0001-0001-4001-a001-000000000001',
 'I topped up KES 8,000 from M-Pesa to my current account about an hour ago. M-Pesa shows the transaction completed but it has not reflected in my bank balance. Reference QGT3X4P9LM.',
 NOW() - INTERVAL '12 days', 'banking', 'chat', 'kenya'),

('dd11ce01-0002-4002-c002-000000000002',
 'cc11ce01-0001-4001-b001-000000000002',
 'ai', NULL,
 'Looking up reference QGT3X4P9LM now. I can see it was received on our side at 14:32 but a settlement batch issue held it in suspense. I have manually released it — please refresh your balance.',
 NOW() - INTERVAL '12 days' + INTERVAL '3 minutes', 'banking', 'chat', 'kenya'),

('dd11ce01-0002-4002-c002-000000000003',
 'cc11ce01-0001-4001-b001-000000000002',
 'customer', '11ce0001-0001-4001-a001-000000000001',
 'Yes, it is showing now. Thank you. M-Pesa charged me KES 200 for the transfer though — is that normal for a same-bank top-up?',
 NOW() - INTERVAL '12 days' + INTERVAL '20 minutes', 'banking', 'chat', 'kenya'),

('dd11ce01-0002-4002-c002-000000000004',
 'cc11ce01-0001-4001-b001-000000000002',
 'ai', NULL,
 'M-Pesa charges a sender fee on their side regardless of destination — that KES 200 is theirs, not ours. As a goodwill gesture for the delay you experienced, I have credited KES 200 to your account.',
 NOW() - INTERVAL '12 days' + INTERVAL '25 minutes', 'banking', 'chat', 'kenya'),

('dd11ce01-0002-4002-c002-000000000005',
 'cc11ce01-0001-4001-b001-000000000002',
 'customer', '11ce0001-0001-4001-a001-000000000001',
 'Wow, that is genuinely above and beyond. Thank you!',
 NOW() - INTERVAL '12 days' + INTERVAL '45 minutes', 'banking', 'chat', 'kenya')
ON CONFLICT (id) DO NOTHING;


-- =========================================================================
-- WANJIRU — Conv 3: Card declined at Naivas  (whatsapp, resolved, neutral)
-- =========================================================================

INSERT INTO messages (
  id, conversation_id, sender_type, sender_customer_id,
  content, created_at, source, channel, market
) VALUES
('dd11ce01-0003-4003-c003-000000000001',
 'cc11ce01-0001-4001-b001-000000000003',
 'customer', '11ce0001-0001-4001-a001-000000000001',
 'My debit card was just declined at Naivas Westlands trying to pay KES 21,000 for groceries. Is there a problem with my account?',
 NOW() - INTERVAL '30 days', 'banking', 'whatsapp', 'kenya'),

('dd11ce01-0003-4003-c003-000000000002',
 'cc11ce01-0001-4001-b001-000000000003',
 'ai', NULL,
 'No issue with your account, Wanjiru. The transaction declined because you have already used KES 145,000 of your KES 150,000 daily POS limit today. Would you like me to increase the limit?',
 NOW() - INTERVAL '30 days' + INTERVAL '1 minute', 'banking', 'whatsapp', 'kenya'),

('dd11ce01-0003-4003-c003-000000000003',
 'cc11ce01-0001-4001-b001-000000000003',
 'customer', '11ce0001-0001-4001-a001-000000000001',
 'Yes please, raise it to KES 200,000 for the rest of the month.',
 NOW() - INTERVAL '30 days' + INTERVAL '4 minutes', 'banking', 'whatsapp', 'kenya'),

('dd11ce01-0003-4003-c003-000000000004',
 'cc11ce01-0001-4001-b001-000000000003',
 'ai', NULL,
 'Done — your daily POS limit is now KES 200,000 until end of month, after which it reverts to KES 150,000. You can retry the Naivas transaction now.',
 NOW() - INTERVAL '30 days' + INTERVAL '20 minutes', 'banking', 'whatsapp', 'kenya')
ON CONFLICT (id) DO NOTHING;


-- =========================================================================
-- OTIENO — Conv 1: Cheque clearing delay  (email, open, negative)
-- =========================================================================

INSERT INTO messages (
  id, conversation_id, sender_type, sender_customer_id,
  content, created_at, source, channel, market
) VALUES
('dd11ce02-0001-4001-c001-000000000001',
 'cc11ce02-0002-4002-b002-000000000001',
 'customer', '11ce0002-0002-4002-a002-000000000002',
 'I deposited a KES 1.8M cheque from Carrefour Kenya at the Industrial Area branch 4 days ago. The branch officer said next-day clearing given the issuer. It is still not cleared and my suppliers are waiting.',
 NOW() - INTERVAL '8 days', 'banking', 'email', 'kenya'),

('dd11ce02-0001-4001-c001-000000000002',
 'cc11ce02-0002-4002-b002-000000000001',
 'ai', NULL,
 'Looking at the cheque now — I can see it is held under "additional verification" because the amount is over the KES 1M auto-clearing threshold for a new payor relationship. Escalating to clearing operations for priority handling.',
 NOW() - INTERVAL '7 days' + INTERVAL '6 hours', 'banking', 'email', 'kenya'),

('dd11ce02-0001-4001-c001-000000000003',
 'cc11ce02-0002-4002-b002-000000000001',
 'agent', NULL,
 'Hi Otieno, this is Peter. I have personally pushed your cheque through clearing — funds will reflect by 14:00 tomorrow. I also want to talk about pre-clearing arrangements for your large recurring payors so this does not happen again. Can we jump on a 15-minute call?',
 NOW() - INTERVAL '6 days' + INTERVAL '3 hours', 'banking', 'email', 'kenya'),

('dd11ce02-0001-4001-c001-000000000004',
 'cc11ce02-0002-4002-b002-000000000001',
 'customer', '11ce0002-0002-4002-a002-000000000002',
 'I appreciate the explanation but I need the funds available by tomorrow to clear supplier payments.',
 NOW() - INTERVAL '6 days', 'banking', 'email', 'kenya')
ON CONFLICT (id) DO NOTHING;


-- =========================================================================
-- OTIENO — Conv 2: Sub-account for KEMSA tender  (whatsapp, resolved, neutral)
-- =========================================================================

INSERT INTO messages (
  id, conversation_id, sender_type, sender_customer_id,
  content, created_at, source, channel, market
) VALUES
('dd11ce02-0002-4002-c002-000000000001',
 'cc11ce02-0002-4002-b002-000000000002',
 'customer', '11ce0002-0002-4002-a002-000000000002',
 'I have just been shortlisted for a KEMSA tender. I need a separate sub-account to ring-fence the project funds so reconciliation is easier. Can you set one up linked to my SME current?',
 NOW() - INTERVAL '25 days', 'banking', 'whatsapp', 'kenya'),

('dd11ce02-0002-4002-c002-000000000002',
 'cc11ce02-0002-4002-b002-000000000002',
 'ai', NULL,
 'Congratulations on the shortlist! Yes — I can open a project sub-account under your existing SME mandate. It would inherit your signatories and statements would consolidate at month-end. Should I proceed?',
 NOW() - INTERVAL '25 days' + INTERVAL '5 minutes', 'banking', 'whatsapp', 'kenya'),

('dd11ce02-0002-4002-c002-000000000003',
 'cc11ce02-0002-4002-b002-000000000002',
 'customer', '11ce0002-0002-4002-a002-000000000002',
 'Yes please. Name it "KEMSA Project Account" and copy my accountant on the welcome pack.',
 NOW() - INTERVAL '24 days' + INTERVAL '4 hours', 'banking', 'whatsapp', 'kenya'),

('dd11ce02-0002-4002-c002-000000000004',
 'cc11ce02-0002-4002-b002-000000000002',
 'agent', NULL,
 'Done. Account number KE07033KCB2200000004000 is live and linked to your SME current. Welcome pack emailed to you and copied to accountant@ouma-trading.co.ke. Anything else for the tender prep?',
 NOW() - INTERVAL '24 days', 'banking', 'whatsapp', 'kenya')
ON CONFLICT (id) DO NOTHING;


-- =========================================================================
-- OTIENO — Conv 3: Fleet card declined at Shell  (chat, resolved, neutral)
-- =========================================================================

INSERT INTO messages (
  id, conversation_id, sender_type, sender_customer_id,
  content, created_at, source, channel, market
) VALUES
('dd11ce02-0003-4003-c003-000000000001',
 'cc11ce02-0002-4002-b002-000000000003',
 'customer', '11ce0002-0002-4002-a002-000000000002',
 'My business debit ****5582 was declined at Shell Mlolongo for KES 58,000 fuel for Truck 1. Per-transaction limit issue?',
 NOW() - INTERVAL '6 days', 'banking', 'chat', 'kenya'),

('dd11ce02-0003-4003-c003-000000000002',
 'cc11ce02-0002-4002-b002-000000000003',
 'ai', NULL,
 'Correct — your per-transaction limit on the business debit is KES 50,000. Fuel for a full diesel tank often exceeds that. I can raise it permanently to KES 75,000 for fuel category MCC, or KES 100,000 across the board. Which works?',
 NOW() - INTERVAL '6 days' + INTERVAL '2 minutes', 'banking', 'chat', 'kenya'),

('dd11ce02-0003-4003-c003-000000000003',
 'cc11ce02-0002-4002-b002-000000000003',
 'customer', '11ce0002-0002-4002-a002-000000000002',
 'Fuel-only is fine — KES 75,000.',
 NOW() - INTERVAL '6 days' + INTERVAL '10 minutes', 'banking', 'chat', 'kenya'),

('dd11ce02-0003-4003-c003-000000000004',
 'cc11ce02-0002-4002-b002-000000000003',
 'ai', NULL,
 'Done. Fuel MCC per-transaction limit on card ****5582 raised to KES 75,000 effective immediately. Driver can retry the transaction.',
 NOW() - INTERVAL '6 days' + INTERVAL '35 minutes', 'banking', 'chat', 'kenya')
ON CONFLICT (id) DO NOTHING;


-- -------------------------------------------------------------------------
-- Verify
-- -------------------------------------------------------------------------
SELECT c.name AS customer, co.subject, co.channel, COUNT(m.id) AS message_count
FROM conversations co
JOIN customers c ON co.customer_id = c.id
LEFT JOIN messages m ON m.conversation_id = co.id
WHERE co.market = 'kenya'
GROUP BY c.name, co.subject, co.channel, co.created_at
ORDER BY c.name, co.created_at DESC;
