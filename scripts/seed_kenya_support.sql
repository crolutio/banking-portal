-- =========================================================================
-- KENYA — SUPPORT TICKETS + MESSAGES SEED (Banking DB)
-- Run in the BANKING Supabase SQL Editor.
-- Prerequisite: seed_kenya_profiles.sql must be run first.
--
-- 4 tickets (2 per client), ~15 messages total.
-- Mirrors the UAE narrative beats:
--   Sarah's "card blocked while travelling" → Wanjiru's "card blocked in Kigali"
--   Sarah's "foreign transaction fee waiver" → Wanjiru's "salary advance early repayment"
--   Mohammed's "business statement for visa" → Otieno's "audited statements for tender"
--   Mohammed's "international wire fees"   → Otieno's "USD wire from DRC client"
-- =========================================================================


-- -------------------------------------------------------------------------
-- WANJIRU KAMAU — 2 tickets
-- -------------------------------------------------------------------------

INSERT INTO support_tickets (
  id, user_id, subject, status, priority, assigned_to, created_at, updated_at, market
) VALUES
('dd11ce01-1111-4111-a001-000000000001',
 '11ce0001-0001-4001-a001-000000000001',
 'Card blocked during Kigali trip — urgent',
 'open', 'high',
 '11ce0003-0003-4003-a003-000000000003',
 NOW() - INTERVAL '5 days', NOW() - INTERVAL '4 days', 'kenya'),

('dd11ce01-1111-4111-a001-000000000002',
 '11ce0001-0001-4001-a001-000000000001',
 'Salary advance — can I repay early without penalty?',
 'in_progress', 'medium',
 '11ce0003-0003-4003-a003-000000000003',
 NOW() - INTERVAL '18 days', NOW() - INTERVAL '17 days', 'kenya')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = EXCLUDED.updated_at,
  market = EXCLUDED.market;


-- -------------------------------------------------------------------------
-- OTIENO OUMA — 2 tickets
-- -------------------------------------------------------------------------

INSERT INTO support_tickets (
  id, user_id, subject, status, priority, assigned_to, created_at, updated_at, market
) VALUES
('dd11ce02-1111-4111-a002-000000000001',
 '11ce0002-0002-4002-a002-000000000002',
 'Audited statements needed for KEMSA tender',
 'in_progress', 'high',
 '11ce0003-0003-4003-a003-000000000003',
 NOW() - INTERVAL '7 days', NOW() - INTERVAL '6 days', 'kenya'),

('dd11ce02-1111-4111-a002-000000000002',
 '11ce0002-0002-4002-a002-000000000002',
 'Incoming USD wire from DRC client — delayed',
 'open', 'medium',
 NULL,
 NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days', 'kenya')
ON CONFLICT (id) DO UPDATE SET
  status = EXCLUDED.status,
  updated_at = EXCLUDED.updated_at,
  market = EXCLUDED.market;


-- -------------------------------------------------------------------------
-- MESSAGES — Wanjiru ticket 1 (card blocked in Kigali)
-- -------------------------------------------------------------------------

INSERT INTO support_messages (id, ticket_id, sender_type, sender_id, content, created_at, market)
VALUES
('bb11ce01-1111-4111-a001-000000000001',
 'dd11ce01-1111-4111-a001-000000000001',
 'user', '11ce0001-0001-4001-a001-000000000001',
 'Hi, my Mastercard ****9913 was blocked when I tried to pay for the hotel in Kigali this morning. I am here for a client meeting and need this resolved ASAP. I did notify the bank last week before flying out.',
 NOW() - INTERVAL '5 days', 'kenya'),

('bb11ce01-1111-4111-a001-000000000002',
 'dd11ce01-1111-4111-a001-000000000001',
 'agent', '11ce0003-0003-4003-a003-000000000003',
 'Hi Wanjiru, very sorry about that. I can see the travel notice on your file but the fraud system flagged the merchant on first attempt. I have unblocked the card and added a temporary higher limit for Rwanda until end of trip. Please retry the transaction.',
 NOW() - INTERVAL '5 days' + INTERVAL '40 minutes', 'kenya'),

('bb11ce01-1111-4111-a001-000000000003',
 'dd11ce01-1111-4111-a001-000000000001',
 'user', '11ce0001-0001-4001-a001-000000000001',
 'Payment went through, thank you. Can you also waive the FX markup on this hotel stay given the inconvenience?',
 NOW() - INTERVAL '5 days' + INTERVAL '2 hours', 'kenya'),

('bb11ce01-1111-4111-a001-000000000004',
 'dd11ce01-1111-4111-a001-000000000001',
 'agent', '11ce0003-0003-4003-a003-000000000003',
 'I will request a goodwill credit for the FX markup on this booking — approximately KES 1,250. Should reflect on your statement within 3 business days. I have also flagged your profile so future travel-flagged transactions in EAC countries auto-approve.',
 NOW() - INTERVAL '4 days', 'kenya')
ON CONFLICT (id) DO NOTHING;


-- -------------------------------------------------------------------------
-- MESSAGES — Wanjiru ticket 2 (salary advance early repayment)
-- -------------------------------------------------------------------------

INSERT INTO support_messages (id, ticket_id, sender_type, sender_id, content, created_at, market)
VALUES
('bb11ce01-1111-4111-a001-000000000005',
 'dd11ce01-1111-4111-a001-000000000002',
 'user', '11ce0001-0001-4001-a001-000000000001',
 'I have my salary advance with you (about KES 180k remaining). I am thinking of clearing it in one lump sum next month. Any early-settlement fee?',
 NOW() - INTERVAL '18 days', 'kenya'),

('bb11ce01-1111-4111-a001-000000000006',
 'dd11ce01-1111-4111-a001-000000000002',
 'ai', NULL,
 'Hi Wanjiru — for your salary advance facility there is no early-settlement penalty. You will save approximately KES 9,400 in future interest by clearing it now. Would you like me to prepare a settlement letter?',
 NOW() - INTERVAL '18 days' + INTERVAL '3 minutes', 'kenya'),

('bb11ce01-1111-4111-a001-000000000007',
 'dd11ce01-1111-4111-a001-000000000002',
 'user', '11ce0001-0001-4001-a001-000000000001',
 'Yes please. Also — once I clear it, can I redirect that KES 16k monthly to my Goal Saver?',
 NOW() - INTERVAL '17 days', 'kenya'),

('bb11ce01-1111-4111-a001-000000000008',
 'dd11ce01-1111-4111-a001-000000000002',
 'agent', '11ce0003-0003-4003-a003-000000000003',
 'Great plan. I can set up a standing order to your Goal Saver effective the month after settlement. Want me to make it KES 16k or round up to KES 20k?',
 NOW() - INTERVAL '17 days' + INTERVAL '4 hours', 'kenya')
ON CONFLICT (id) DO NOTHING;


-- -------------------------------------------------------------------------
-- MESSAGES — Otieno ticket 1 (audited statements for KEMSA tender)
-- -------------------------------------------------------------------------

INSERT INTO support_messages (id, ticket_id, sender_type, sender_id, content, created_at, market)
VALUES
('bb11ce02-1111-4111-a002-000000000001',
 'dd11ce02-1111-4111-a002-000000000001',
 'user', '11ce0002-0002-4002-a002-000000000002',
 'Need stamped + audited bank statements for both my SME current and USD trade accounts covering Jan 2024 to Mar 2026. KEMSA prequalification tender closes in 10 days. Can you email PDFs and courier hardcopies to my office?',
 NOW() - INTERVAL '7 days', 'kenya'),

('bb11ce02-1111-4111-a002-000000000002',
 'dd11ce02-1111-4111-a002-000000000001',
 'agent', '11ce0003-0003-4003-a003-000000000003',
 'On it, Otieno. The branch will prepare stamped statements within 48 hours and courier originals to your Industrial Area office. Email PDFs go out tonight. Anything else KEMSA is asking for that I can pre-empt — bank reference letter, tax compliance, etc.?',
 NOW() - INTERVAL '7 days' + INTERVAL '1 hour', 'kenya'),

('bb11ce02-1111-4111-a002-000000000003',
 'dd11ce02-1111-4111-a002-000000000001',
 'user', '11ce0002-0002-4002-a002-000000000002',
 'Yes — they want a bank reference letter confirming the relationship and average annual turnover. Also confirmation of available credit facilities (the LPO line + working capital).',
 NOW() - INTERVAL '6 days', 'kenya'),

('bb11ce02-1111-4111-a002-000000000004',
 'dd11ce02-1111-4111-a002-000000000001',
 'agent', '11ce0003-0003-4003-a003-000000000003',
 'Will include all three documents in the courier package: stamped statements, bank reference letter (with turnover figure), and facilities confirmation letter. You will receive a tracking number tomorrow.',
 NOW() - INTERVAL '6 days' + INTERVAL '6 hours', 'kenya')
ON CONFLICT (id) DO NOTHING;


-- -------------------------------------------------------------------------
-- MESSAGES — Otieno ticket 2 (delayed USD wire from DRC client)
-- -------------------------------------------------------------------------

INSERT INTO support_messages (id, ticket_id, sender_type, sender_id, content, created_at, market)
VALUES
('bb11ce02-1111-4111-a002-000000000005',
 'dd11ce02-1111-4111-a002-000000000002',
 'user', '11ce0002-0002-4002-a002-000000000002',
 'Expecting an incoming USD wire from TradeWell Trading in Kinshasa — should have hit my USD trade account yesterday but nothing yet. Reference USD 9,400. Can you check correspondent banking status?',
 NOW() - INTERVAL '2 days', 'kenya'),

('bb11ce02-1111-4111-a002-000000000006',
 'dd11ce02-1111-4111-a002-000000000002',
 'ai', NULL,
 'Hi Otieno — I can see an inbound USD 9,400 from TradeWell Trading sitting at our correspondent bank in New York since yesterday 14:32 UTC, held for compliance review on the originator KYC. Typical resolution is 24–48 hours. I have flagged it for priority review. Expect funds in your account by EOD tomorrow at latest.',
 NOW() - INTERVAL '2 days' + INTERVAL '8 minutes', 'kenya')
ON CONFLICT (id) DO NOTHING;


-- -------------------------------------------------------------------------
-- Verify
-- -------------------------------------------------------------------------
SELECT p.full_name, t.subject, t.status, t.priority, COUNT(m.id) AS messages
FROM support_tickets t
JOIN profiles p ON t.user_id = p.id
LEFT JOIN support_messages m ON m.ticket_id = t.id
WHERE t.market = 'kenya'
GROUP BY p.full_name, t.subject, t.status, t.priority, t.created_at
ORDER BY p.full_name, t.created_at;
