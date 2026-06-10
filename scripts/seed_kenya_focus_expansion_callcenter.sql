-- =====================================================================
-- Kenya RM book — FOCUS EXPANSION (CALL CENTER DB)
-- ---------------------------------------------------------------------
-- Companion to seed_kenya_focus_expansion_banking.sql. One conversation +
-- messages per new client (NN 19–28), same UUID as banking.
--   • Dormant (19–22): OLD, neutral, resolved threads — reinforces the
--     "no recent engagement" story (and keeps them OFF the churn radar).
--   • SME/HNW (23–26): current, on-topic opportunity threads.
--   • Churn (27–28): negative, escalated, human-handled calls — these add
--     a negative-call churn signal so they rank under Churn Defence.
--
-- Constraints honoured: tier ∈ {standard,premium,enterprise} (VIP→enterprise);
-- handling_mode ∈ {human,ai}; market='kenya'; source='banking'; insert order
-- customers → conversations → messages. Idempotent (ON CONFLICT DO NOTHING).
-- conv id bb11ceNN-0001-.. ; message id bb11ceNN-100X-..
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. customers
-- ---------------------------------------------------------------------
insert into customers (id, name, email, phone, language, preferred_language, tier, kyc_status, market, created_at)
values
  ('11ce0019-0019-4019-a019-000000000019','Ann Wambui','ann.wambui@example.co.ke','+254700000019','English','en','standard','verified','kenya','2019-03-11'),
  ('11ce0020-0020-4020-a020-000000000020','Kevin Ochieng','kevin.ochieng@example.co.ke','+254700000020','English','en','standard','verified','kenya','2021-07-22'),
  ('11ce0021-0021-4021-a021-000000000021','Margaret Njeri','margaret.njeri@example.co.ke','+254700000021','English','en','standard','verified','kenya','2018-10-05'),
  ('11ce0022-0022-4022-a022-000000000022','Stephen Kariuki','stephen.kariuki@example.co.ke','+254700000022','English','en','standard','verified','kenya','2017-06-18'),
  ('11ce0023-0023-4023-a023-000000000023','Lillian Wairimu','lillian.wairimu@example.co.ke','+254700000023','English','en','premium','verified','kenya','2018-02-14'),
  ('11ce0024-0024-4024-a024-000000000024','Patrick Omondi','patrick.omondi@example.co.ke','+254700000024','English','en','premium','verified','kenya','2016-09-30'),
  ('11ce0025-0025-4025-a025-000000000025','Susan Mwende','susan.mwende@example.co.ke','+254700000025','English','en','enterprise','verified','kenya','2015-05-20'),
  ('11ce0026-0026-4026-a026-000000000026','James Githinji','james.githinji@example.co.ke','+254700000026','English','en','enterprise','verified','kenya','2014-03-08'),
  ('11ce0027-0027-4027-a027-000000000027','Mercy Akinyi','mercy.akinyi@example.co.ke','+254700000027','English','en','standard','verified','kenya','2020-11-12'),
  ('11ce0028-0028-4028-a028-000000000028','Robert Mwangi','robert.mwangi@example.co.ke','+254700000028','English','en','standard','verified','kenya','2019-04-19')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- 2. conversations
-- ---------------------------------------------------------------------
insert into conversations (id, customer_id, subject, channel, status, priority, sentiment, handling_mode, source, market, created_at, updated_at, last_message, last_message_time)
values
  ('bb11ce19-0001-4001-a019-000000000019','11ce0019-0019-4019-a019-000000000019','Statement letter for a visa application','email','resolved','low','neutral','ai','banking','kenya','2024-03-04','2024-03-04','Sent the stamped statement, thanks.','2024-03-04'),
  ('bb11ce20-0001-4001-a020-000000000020','11ce0020-0020-4020-a020-000000000020','Graduate account options after campus','chat','resolved','low','neutral','ai','banking','kenya','2024-12-09','2024-12-09','Okay, I''ll think about it.','2024-12-09'),
  ('bb11ce21-0001-4001-a021-000000000021','11ce0021-0021-4021-a021-000000000021','Mobile app login help','whatsapp','resolved','low','neutral','ai','banking','kenya','2025-01-18','2025-01-18','Got in, thanks.','2025-01-18'),
  ('bb11ce22-0001-4001-a022-000000000022','11ce0022-0022-4022-a022-000000000022','When does the KTDA tea bonus reflect?','voice','resolved','low','neutral','ai','banking','kenya','2024-10-29','2024-10-29','Great, see it now.','2024-10-29'),
  ('bb11ce23-0001-4001-a023-000000000023','11ce0023-0023-4023-a023-000000000023','Opening a third salon — financing options','whatsapp','open','medium','positive','ai','banking','kenya', now() - interval '3 days', now() - interval '3 days','Yes please, let''s talk financing!', now() - interval '3 days'),
  ('bb11ce24-0001-4001-a024-000000000024','11ce0024-0024-4024-a024-000000000024','Hedging the euro on my next shipment','email','open','high','neutral','human','banking','kenya', now() - interval '2 days', now() - interval '2 days','What hedging options do I have?', now() - interval '2 days'),
  ('bb11ce25-0001-4001-a025-000000000025','11ce0025-0025-4025-a025-000000000025','Putting my idle cash to work','chat','open','medium','neutral','ai','banking','kenya', now() - interval '5 days', now() - interval '5 days','I''d like a proper plan for it.', now() - interval '5 days'),
  ('bb11ce26-0001-4001-a026-000000000026','11ce0026-0026-4026-a026-000000000026','Just sold my business — what next?','chat','open','high','positive','human','banking','kenya', now() - interval '1 day', now() - interval '1 day','Looking forward to your advice.', now() - interval '1 day'),
  ('bb11ce27-0001-4001-a027-000000000027','11ce0027-0027-4027-a027-000000000027','Your app failed my transfer again','voice','escalated','high','negative','human','banking','kenya', now() - interval '1 day', now() - interval '1 day','If it fails once more I''m moving banks.', now() - interval '1 day'),
  ('bb11ce28-0001-4001-a028-000000000028','11ce0028-0028-4028-a028-000000000028','Three weeks and my dispute is still open','voice','escalated','high','negative','human','banking','kenya', now() - interval '2 days', now() - interval '2 days','Fix it or I''m closing everything.', now() - interval '2 days')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- 3. messages
-- ---------------------------------------------------------------------
insert into messages (id, conversation_id, sender_type, sender_customer_id, content, is_internal, channel, source, market, created_at)
values
  -- 19 Ann (dormant, old)
  ('bb11ce19-1001-4001-a019-000000000019','bb11ce19-0001-4001-a019-000000000019','customer','11ce0019-0019-4019-a019-000000000019','Hi, I need a stamped bank statement for a visa application.',false,'email','banking','kenya','2024-03-04'),
  ('bb11ce19-1002-4001-a019-000000000019','bb11ce19-0001-4001-a019-000000000019','ai',null,'Of course — I''ve emailed your stamped six-month statement. Anything else?',false,'email','banking','kenya','2024-03-04'),
  -- 20 Kevin (dormant, old)
  ('bb11ce20-1001-4001-a020-000000000020','bb11ce20-0001-4001-a020-000000000020','customer','11ce0020-0020-4020-a020-000000000020','I just graduated. What happens to my student account now?',false,'chat','banking','kenya','2024-12-09'),
  ('bb11ce20-1002-4001-a020-000000000020','bb11ce20-0001-4001-a020-000000000020','ai',null,'Congratulations! We can move you to a graduate account with no monthly fee for the first year. Want me to set it up?',false,'chat','banking','kenya','2024-12-09'),
  -- 21 Margaret (dormant, old)
  ('bb11ce21-1001-4001-a021-000000000021','bb11ce21-0001-4001-a021-000000000021','customer','11ce0021-0021-4021-a021-000000000021','I can''t log into the mobile app.',false,'whatsapp','banking','kenya','2025-01-18'),
  ('bb11ce21-1002-4001-a021-000000000021','bb11ce21-0001-4001-a021-000000000021','ai',null,'Let''s reset that — I''ve sent a secure re-activation link. You should be back in shortly.',false,'whatsapp','banking','kenya','2025-01-18'),
  -- 22 Stephen (dormant, old, seasonal)
  ('bb11ce22-1001-4001-a022-000000000022','bb11ce22-0001-4001-a022-000000000022','customer','11ce0022-0022-4022-a022-000000000022','When will my KTDA tea bonus show up in my account?',false,'voice','banking','kenya','2024-10-29'),
  ('bb11ce22-1002-4001-a022-000000000022','bb11ce22-0001-4001-a022-000000000022','ai',null,'KTDA bonuses post within 48 hours of release. I can set an alert so you''re notified the moment it lands.',false,'voice','banking','kenya','2024-10-29'),
  -- 23 Lillian (SME, positive)
  ('bb11ce23-1001-4001-a023-000000000023','bb11ce23-0001-4001-a023-000000000023','customer','11ce0023-0023-4023-a023-000000000023','Glow is doing really well — I want to open a third branch in a mall. Can you help with financing and card machines?',false,'whatsapp','banking','kenya', now() - interval '3 days'),
  ('bb11ce23-1002-4001-a023-000000000023','bb11ce23-0001-4001-a023-000000000023','ai',null,'That''s exciting! We can look at a fit-out loan against your till cash-flow plus POS terminals for all three branches. Your RM will reach out.',false,'whatsapp','banking','kenya', now() - interval '3 days'),
  -- 24 Patrick (SME exporter, neutral)
  ('bb11ce24-1001-4001-a024-000000000024','bb11ce24-0001-4001-a024-000000000024','customer','11ce0024-0024-4024-a024-000000000024','My EU buyers pay in euros 60 days out and the FX swings eat my margin. What hedging can you offer on my next shipment?',false,'email','banking','kenya', now() - interval '2 days'),
  ('bb11ce24-1002-4001-a024-000000000024','bb11ce24-0001-4001-a024-000000000024','agent',null,'We can set up a forward contract to lock your euro rate, plus LPO/trade finance to bridge the 60-day gap. Let me bring in our treasury desk.',false,'email','banking','kenya', now() - interval '2 days'),
  -- 25 Susan (HNW, neutral)
  ('bb11ce25-1001-4001-a025-000000000025','bb11ce25-0001-4001-a025-000000000025','customer','11ce0025-0025-4025-a025-000000000025','I''ve got a large balance just sitting in my current account. I want a real plan to grow it, including some offshore exposure.',false,'chat','banking','kenya', now() - interval '5 days'),
  ('bb11ce25-1002-4001-a025-000000000025','bb11ce25-0001-4001-a025-000000000025','ai',null,'Understood. Our wealth desk can build a diversified plan — money-market, bonds, and an offshore allocation. I''ll have your RM arrange a review.',false,'chat','banking','kenya', now() - interval '5 days'),
  -- 26 James (HNW, positive)
  ('bb11ce26-1001-4001-a026-000000000026','bb11ce26-0001-4001-a026-000000000026','customer','11ce0026-0026-4026-a026-000000000026','I''ve just sold my stake in the company and the proceeds are in. I need help investing it and with estate planning.',false,'chat','banking','kenya', now() - interval '1 day'),
  ('bb11ce26-1002-4001-a026-000000000026','bb11ce26-0001-4001-a026-000000000026','agent',null,'Congratulations on the exit. This is exactly what our private wealth and trust teams handle — let''s structure the proceeds and set up estate planning. Your RM will call today.',false,'chat','banking','kenya', now() - interval '1 day'),
  -- 27 Mercy (CHURN — digital experience, negative escalated)
  ('bb11ce27-1001-4001-a027-000000000027','bb11ce27-0001-4001-a027-000000000027','customer','11ce0027-0027-4027-a027-000000000027','This is the third time your app has failed a transfer this week. My friend''s neobank does it instantly. If it fails once more I''m moving my salary there.',false,'voice','banking','kenya', now() - interval '1 day'),
  ('bb11ce27-1002-4001-a027-000000000027','bb11ce27-0001-4001-a027-000000000027','agent',null,'I''m really sorry, Mercy. I''m escalating the app and M-Pesa integration issues right now and flagging your account to your RM for a personal call today.',false,'voice','banking','kenya', now() - interval '1 day'),
  ('bb11ce27-1003-4001-a027-000000000027','bb11ce27-0001-4001-a027-000000000027','customer','11ce0027-0027-4027-a027-000000000027','I appreciate it, but I need to actually see it fixed this time.',false,'voice','banking','kenya', now() - interval '1 day'),
  -- 28 Robert (CHURN — service dispute, negative escalated)
  ('bb11ce28-1001-4001-a028-000000000028','bb11ce28-0001-4001-a028-000000000028','customer','11ce0028-0028-4028-a028-000000000028','It''s been three weeks on my double-charge dispute with zero progress. I''ve lost confidence in this bank — fix it or I''m closing everything and moving.',false,'voice','banking','kenya', now() - interval '2 days'),
  ('bb11ce28-1002-4001-a028-000000000028','bb11ce28-0001-4001-a028-000000000028','agent',null,'That''s not acceptable and I''m sorry, Robert. I''m taking personal ownership of the dispute, reversing the duplicate charge today, and your RM will call to make this right.',false,'voice','banking','kenya', now() - interval '2 days')
on conflict (id) do nothing;

-- =====================================================================
-- Verify:
--   select count(*) from conversations where customer_id::text like '11ce002%'; -- expect 10
-- =====================================================================
