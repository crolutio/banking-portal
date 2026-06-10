-- =====================================================================
-- Seed: call-center threads for the 4 hero Kenya clients (CALL CENTER DB)
-- ---------------------------------------------------------------------
-- Run this on the CALL CENTER Supabase project, AFTER the banking script.
-- customers.id == banking profiles.id (same UUID). market='kenya', source='banking'.
--
-- Heroes: 04 Joseph Karanja (SME), 05 Aisha Mohamed (HNW),
--         06 David Kimani (CHURN — the headline), 07 Grace Achieng (diaspora).
--
-- Idempotent: ON CONFLICT (id) DO NOTHING.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. CUSTOMERS (mirror the banking profile UUIDs)
-- ---------------------------------------------------------------------
insert into customers (id, name, email, phone, tier, market, language, preferred_language, kyc_status) values
  ('11ce0004-0004-4004-a004-000000000004','Joseph Karanja','joseph.karanja@email.co.ke','+254712345004','premium','kenya','English','en','verified'),
  ('11ce0005-0005-4005-a005-000000000005','Aisha Mohamed','aisha.mohamed@email.co.ke','+254712345005','enterprise','kenya','English','en','verified'),
  ('11ce0006-0006-4006-a006-000000000006','David Kimani','david.kimani@email.co.ke','+254712345006','standard','kenya','English','en','verified'),
  ('11ce0007-0007-4007-a007-000000000007','Grace Achieng','grace.achieng@email.co.ke','+254712345007','premium','kenya','English','en','verified')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- 2. CONVERSATIONS
-- ---------------------------------------------------------------------
insert into conversations (id, customer_id, subject, channel, status, priority, sentiment, last_message, last_message_time, handling_mode, source, handover_required, market, created_at, updated_at) values
  -- 06 DAVID KIMANI — the churn headline
  ('cc11ce06-0001-4006-b006-000000000001','11ce0006-0006-4006-a006-000000000006','Considering moving my accounts to another bank','voice','escalated','high','negative','Unless someone senior actually calls me back, I am closing this account by the end of the month.','2026-05-19T09:42:00+00','ai','banking',true,'kenya','2026-05-19T09:30:00+00','2026-05-19T09:42:00+00'),
  -- 04 JOSEPH KARANJA — SME working capital
  ('cc11ce04-0001-4004-b004-000000000001','11ce0004-0004-4004-a004-000000000004','Cash flow tight before supplier payments','chat','resolved','medium','neutral','I will send through the last six months of invoices so we can look at an overdraft facility.','2026-05-15T12:20:00+00','ai','banking',false,'kenya','2026-05-15T12:00:00+00','2026-05-15T12:20:00+00'),
  -- 05 AISHA MOHAMED — HNW, eyeing a competitor's returns
  ('cc11ce05-0001-4005-b005-000000000001','11ce0005-0005-4005-a005-000000000005','Are these the best returns you can offer me?','chat','open','medium','neutral','I would like to compare what your wealth desk can do versus what I have been quoted elsewhere.','2026-05-12T10:15:00+00','ai','banking',true,'kenya','2026-05-12T10:00:00+00','2026-05-12T10:15:00+00'),
  -- 07 GRACE ACHIENG — diaspora savings opportunity
  ('cc11ce07-0001-4007-b007-000000000001','11ce0007-0007-4007-a007-000000000007','Best way to grow the money I send home','whatsapp','resolved','low','positive','That sounds perfect — please send me the details of the diaspora savings plan.','2026-05-18T16:30:00+00','ai','banking',false,'kenya','2026-05-18T16:10:00+00','2026-05-18T16:30:00+00')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- 3. MESSAGES
-- ---------------------------------------------------------------------
insert into messages (id, conversation_id, sender_type, sender_customer_id, content, is_internal, channel, source, market, created_at) values
  -- David Kimani (CHURN) ------------------------------------------------
  ('bb11ce06-0001-4006-c006-000000000001','cc11ce06-0001-4006-b006-000000000001','customer','11ce0006-0006-4006-a006-000000000006','I have been a customer for nine years but your charges keep going up and the service has gone downhill. I am seriously thinking of moving my salary and savings to Equity Bank.',false,'voice','banking','kenya','2026-05-19T09:30:00+00'),
  ('bb11ce06-0001-4006-c006-000000000002','cc11ce06-0001-4006-b006-000000000001','ai',null,'I am really sorry to hear that, David. I can see you have been with us a long time. May I ask which charges are the main concern so I can look at options to make this right?',false,'voice','banking','kenya','2026-05-19T09:33:00+00'),
  ('bb11ce06-0001-4006-c006-000000000003','cc11ce06-0001-4006-b006-000000000001','customer','11ce0006-0006-4006-a006-000000000006','It is the monthly fees and the FX rates. Honestly I have already moved KES 1.5 million to Equity and redirected my salary. I am just waiting to clear the last few debits here.',false,'voice','banking','kenya','2026-05-19T09:37:00+00'),
  ('bb11ce06-0001-4006-c006-000000000004','cc11ce06-0001-4006-b006-000000000001','customer','11ce0006-0006-4006-a006-000000000006','Unless someone senior actually calls me back, I am closing this account by the end of the month.',false,'voice','banking','kenya','2026-05-19T09:42:00+00'),

  -- Joseph Karanja (SME) ------------------------------------------------
  ('bb11ce04-0001-4004-c004-000000000001','cc11ce04-0001-4004-b004-000000000001','customer','11ce0004-0004-4004-a004-000000000004','Cash is always tight in the week before my customers pay but after I have already paid suppliers. Do you have anything for that gap?',false,'chat','banking','kenya','2026-05-15T12:00:00+00'),
  ('bb11ce04-0001-4004-c004-000000000002','cc11ce04-0001-4004-b004-000000000001','ai',null,'That timing gap is exactly what an overdraft or invoice-financing facility is designed for. Given your steady POS settlements, you would likely qualify. Shall I flag this to your relationship manager?',false,'chat','banking','kenya','2026-05-15T12:10:00+00'),
  ('bb11ce04-0001-4004-c004-000000000003','cc11ce04-0001-4004-b004-000000000001','customer','11ce0004-0004-4004-a004-000000000004','I will send through the last six months of invoices so we can look at an overdraft facility.',false,'chat','banking','kenya','2026-05-15T12:20:00+00'),

  -- Aisha Mohamed (HNW) -------------------------------------------------
  ('bb11ce05-0001-4005-c005-000000000001','cc11ce05-0001-4005-b005-000000000001','customer','11ce0005-0005-4005-a005-000000000005','I have a large amount just sitting in savings. A private banker at another institution quoted me a much better return on a similar balance.',false,'chat','banking','kenya','2026-05-12T10:00:00+00'),
  ('bb11ce05-0001-4005-c005-000000000002','cc11ce05-0001-4005-b005-000000000001','ai',null,'You are holding a significant idle balance, so it is worth a proper wealth review — money-market funds, T-bills and structured products could work much harder for you. I will arrange for our wealth desk to put together a comparison.',false,'chat','banking','kenya','2026-05-12T10:08:00+00'),
  ('bb11ce05-0001-4005-c005-000000000003','cc11ce05-0001-4005-b005-000000000001','customer','11ce0005-0005-4005-a005-000000000005','I would like to compare what your wealth desk can do versus what I have been quoted elsewhere.',false,'chat','banking','kenya','2026-05-12T10:15:00+00'),

  -- Grace Achieng (diaspora) -------------------------------------------
  ('bb11ce07-0001-4007-c007-000000000001','cc11ce07-0001-4007-b007-000000000001','customer','11ce0007-0007-4007-a007-000000000007','I send money home from the UK every month and it just sits in my account. What is the smartest way to actually grow it?',false,'whatsapp','banking','kenya','2026-05-18T16:10:00+00'),
  ('bb11ce07-0001-4007-c007-000000000002','cc11ce07-0001-4007-b007-000000000001','ai',null,'A diaspora savings plan lets you save in USD or KES with preferential FX and a higher rate than a current account. Given your regular remittances, a standing conversion into that plan would compound nicely.',false,'whatsapp','banking','kenya','2026-05-18T16:22:00+00'),
  ('bb11ce07-0001-4007-c007-000000000003','cc11ce07-0001-4007-b007-000000000001','customer','11ce0007-0007-4007-a007-000000000007','That sounds perfect — please send me the details of the diaspora savings plan.',false,'whatsapp','banking','kenya','2026-05-18T16:30:00+00')
on conflict (id) do nothing;

-- =====================================================================
-- Done (call center). Verify with:
--   select c.name, cv.subject, cv.sentiment, cv.status
--   from conversations cv join customers c on c.id = cv.customer_id
--   where cv.customer_id like '11ce00%' order by c.name;
-- =====================================================================
