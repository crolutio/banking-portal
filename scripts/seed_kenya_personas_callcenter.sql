-- =====================================================================
-- Persona enrichment for the 11 lighter Kenya clients (CALL CENTER DB)
-- ---------------------------------------------------------------------
-- Adds a call-center customer row + one conversation thread for each of the
-- 11 clients. Faith (10) and Catherine (18) are NEGATIVE (retention signals);
-- John (15) gets an OLD resolved thread then silence (his "dormant" story);
-- the rest are opportunity threads. Run AFTER seed_kenya_personas_banking.sql.
--
-- customers.id == banking profiles.id. tier ∈ {standard, premium, enterprise}.
-- handling_mode ∈ {human, ai}. market='kenya', source='banking'. Idempotent.
-- Conventions: see docs/callcenter_db_reference.md.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. CUSTOMERS (mirror banking profile UUIDs)
-- ---------------------------------------------------------------------
insert into customers (id, name, email, phone, tier, market, language, preferred_language, kyc_status) values
  ('11ce0008-0008-4008-a008-000000000008','Mary Wanjiku','mary.wanjiku@email.co.ke','+254712345008','standard','kenya','English','en','verified'),
  ('11ce0009-0009-4009-a009-000000000009','Samuel Kiprop','samuel.kiprop@email.co.ke','+254712345009','standard','kenya','English','en','pending'),
  ('11ce0010-0010-4010-a010-000000000010','Faith Chebet','faith.chebet@email.co.ke','+254712345010','standard','kenya','English','en','verified'),
  ('11ce0011-0011-4011-a011-000000000011','Daniel Mwangi','daniel.mwangi@email.co.ke','+254712345011','premium','kenya','English','en','verified'),
  ('11ce0012-0012-4012-a012-000000000012','Esther Nyambura','esther.nyambura@email.co.ke','+254712345012','premium','kenya','English','en','verified'),
  ('11ce0013-0013-4013-a013-000000000013','Peter Omondi','peter.omondi@email.co.ke','+254712345013','standard','kenya','English','en','verified'),
  ('11ce0014-0014-4014-a014-000000000014','Lucy Wairimu','lucy.wairimu@email.co.ke','+254712345014','premium','kenya','English','en','verified'),
  ('11ce0015-0015-4015-a015-000000000015','John Maina','john.maina@email.co.ke','+254712345015','standard','kenya','English','en','pending'),
  ('11ce0016-0016-4016-a016-000000000016','Cynthia Adhiambo','cynthia.adhiambo@email.co.ke','+254712345016','premium','kenya','English','en','verified'),
  ('11ce0017-0017-4017-a017-000000000017','Brian Mutua','brian.mutua@email.co.ke','+254712345017','standard','kenya','English','en','verified'),
  ('11ce0018-0018-4018-a018-000000000018','Catherine Njoki','catherine.njoki@email.co.ke','+254712345018','standard','kenya','English','en','verified')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- 2. CONVERSATIONS
-- ---------------------------------------------------------------------
insert into conversations (id, customer_id, subject, channel, status, priority, sentiment, last_message, last_message_time, handling_mode, source, handover_required, market, created_at, updated_at) values
  ('cc11ce08-0001-4008-b008-000000000001','11ce0008-0008-4008-a008-000000000008','Using my card on international layovers','chat','resolved','low','positive','Great — I''ll look out for the travel card details and the education savings plan.','2026-05-13T10:20:00+00','ai','banking',false,'kenya','2026-05-13T10:00:00+00','2026-05-13T10:20:00+00'),
  ('cc11ce09-0001-4009-b009-000000000001','11ce0009-0009-4009-a009-000000000009','Finishing KYC and starting to invest','whatsapp','resolved','medium','neutral','Perfect, I''ll upload my ID and KRA PIN today and look at the money-market fund.','2026-05-09T14:30:00+00','ai','banking',false,'kenya','2026-05-09T14:10:00+00','2026-05-09T14:30:00+00'),
  ('cc11ce10-0001-4010-b010-000000000001','11ce0010-0010-4010-a010-000000000010','Lost my job — worried about my loan','voice','escalated','high','negative','If we can''t work something out I''ll have to move my banking somewhere cheaper and deal with the loan later.','2026-05-26T09:40:00+00','ai','banking',true,'kenya','2026-05-26T09:25:00+00','2026-05-26T09:40:00+00'),
  ('cc11ce11-0001-4011-b011-000000000001','11ce0011-0011-4011-a011-000000000011','Mortgage pre-qualification + investing idle cash','chat','resolved','medium','positive','Excellent — please have the mortgage desk and an investment adviser call me this week.','2026-05-07T11:30:00+00','ai','banking',false,'kenya','2026-05-07T11:05:00+00','2026-05-07T11:30:00+00'),
  ('cc11ce12-0001-4012-b012-000000000001','11ce0012-0012-4012-a012-000000000012','Financing a second shop','whatsapp','resolved','medium','positive','Asante — I''ll bring my M-Pesa statements so we can size the loan.','2026-05-16T15:10:00+00','ai','banking',false,'kenya','2026-05-16T14:50:00+00','2026-05-16T15:10:00+00'),
  ('cc11ce13-0001-4013-b013-000000000001','11ce0013-0013-4013-a013-000000000013','Card declined abroad on assignment','chat','resolved','medium','neutral','Thanks — set up the travel notifications and tell me about a card that works regionally.','2026-05-13T16:00:00+00','ai','banking',false,'kenya','2026-05-13T15:40:00+00','2026-05-13T16:00:00+00'),
  ('cc11ce14-0001-4014-b014-000000000001','11ce0014-0014-4014-a014-000000000014','Branch wait times + priority banking','chat','open','medium','neutral','I''d like a dedicated relationship manager and to hear about your wealth options.','2026-05-15T12:15:00+00','ai','banking',true,'kenya','2026-05-15T11:55:00+00','2026-05-15T12:15:00+00'),
  ('cc11ce15-0001-4015-b015-000000000001','11ce0015-0015-4015-a015-000000000015','Balance and statement request','chat','resolved','low','neutral','Thanks, got it.','2025-08-12T09:20:00+00','ai','banking',false,'kenya','2025-08-12T09:10:00+00','2025-08-12T09:20:00+00'),
  ('cc11ce16-0001-4016-b016-000000000001','11ce0016-0016-4016-a016-000000000016','Asset finance for two trucks','chat','resolved','medium','positive','Brilliant — I''ll send the contract and the quotes from Isuzu.','2026-05-17T10:40:00+00','ai','banking',false,'kenya','2026-05-17T10:20:00+00','2026-05-17T10:40:00+00'),
  ('cc11ce17-0001-4017-b017-000000000001','11ce0017-0017-4017-a017-000000000017','Car loan eligibility','whatsapp','resolved','low','neutral','Good to know — I''ll keep building my deposit and apply next month.','2026-05-12T17:25:00+00','ai','banking',false,'kenya','2026-05-12T17:10:00+00','2026-05-12T17:25:00+00'),
  ('cc11ce18-0001-4018-b018-000000000001','11ce0018-0018-4018-a018-000000000018','These monthly fees are too much','whatsapp','escalated','high','negative','A friend uses an account with no monthly fee. If you can''t match that I''ll just move — the fees eat my Uber money.','2026-05-19T08:30:00+00','ai','banking',true,'kenya','2026-05-19T08:10:00+00','2026-05-19T08:30:00+00')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- 3. MESSAGES
-- ---------------------------------------------------------------------
insert into messages (id, conversation_id, sender_type, sender_customer_id, content, is_internal, channel, source, market, created_at) values
  -- 08 Mary
  ('bb11ce08-0001-4008-c008-000000000001','cc11ce08-0001-4008-b008-000000000001','customer','11ce0008-0008-4008-a008-000000000008','I''m cabin crew so I''m overseas constantly. My card sometimes fails abroad and the FX feels expensive. Anything better for me?',false,'chat','banking','kenya','2026-05-13T10:00:00+00'),
  ('bb11ce08-0001-4008-c008-000000000002','cc11ce08-0001-4008-b008-000000000001','ai',null,'A multi-currency travel card would fix the overseas declines and tighten the FX. I also see regular transfers to a "Masters fund" — an education savings plan could grow that pot faster. Want both flagged to your RM?',false,'chat','banking','kenya','2026-05-13T10:10:00+00'),
  ('bb11ce08-0001-4008-c008-000000000003','cc11ce08-0001-4008-b008-000000000001','customer','11ce0008-0008-4008-a008-000000000008','Great — I''ll look out for the travel card details and the education savings plan.',false,'chat','banking','kenya','2026-05-13T10:20:00+00'),
  -- 09 Samuel
  ('bb11ce09-0001-4009-c009-000000000001','cc11ce09-0001-4009-b009-000000000001','customer','11ce0009-0009-4009-a009-000000000009','My account still says KYC pending. What do I need to send, and once it''s done can I start a small investment?',false,'whatsapp','banking','kenya','2026-05-09T14:10:00+00'),
  ('bb11ce09-0001-4009-c009-000000000002','cc11ce09-0001-4009-b009-000000000001','ai',null,'Upload your national ID and KRA PIN in the app and KYC clears within a day. After that a money-market fund is a great first step — start from as little as KES 5,000.',false,'whatsapp','banking','kenya','2026-05-09T14:20:00+00'),
  ('bb11ce09-0001-4009-c009-000000000003','cc11ce09-0001-4009-b009-000000000001','customer','11ce0009-0009-4009-a009-000000000009','Perfect, I''ll upload my ID and KRA PIN today and look at the money-market fund.',false,'whatsapp','banking','kenya','2026-05-09T14:30:00+00'),
  -- 10 Faith (negative / hardship)
  ('bb11ce10-0001-4010-c010-000000000001','cc11ce10-0001-4010-b010-000000000001','customer','11ce0010-0010-4010-a010-000000000010','I was laid off last month. My loan repayment just bounced and I''m scared of CRB listing. I don''t know what to do.',false,'voice','banking','kenya','2026-05-26T09:25:00+00'),
  ('bb11ce10-0001-4010-c010-000000000002','cc11ce10-0001-4010-b010-000000000001','ai',null,'I''m sorry, Faith. We have hardship options — a short repayment holiday or a restructure to lower the monthly amount. I''m escalating you to a relationship manager who can set this up today.',false,'voice','banking','kenya','2026-05-26T09:33:00+00'),
  ('bb11ce10-0001-4010-c010-000000000003','cc11ce10-0001-4010-b010-000000000001','customer','11ce0010-0010-4010-a010-000000000010','If we can''t work something out I''ll have to move my banking somewhere cheaper and deal with the loan later.',false,'voice','banking','kenya','2026-05-26T09:40:00+00'),
  -- 11 Daniel (opportunity)
  ('bb11ce11-0001-4011-c011-000000000001','cc11ce11-0001-4011-b011-000000000001','customer','11ce0011-0011-4011-a011-000000000011','I''m looking at a townhouse in Karen around KES 22M. With my salary and the savings I hold here, what mortgage could I get?',false,'chat','banking','kenya','2026-05-07T11:05:00+00'),
  ('bb11ce11-0001-4011-c011-000000000002','cc11ce11-0001-4011-b011-000000000001','ai',null,'On your profile you''d comfortably pre-qualify, and that large Goal Saver balance is sitting idle — a money-market fund or T-bills would work it harder while you decide. Shall I have both desks reach out?',false,'chat','banking','kenya','2026-05-07T11:18:00+00'),
  ('bb11ce11-0001-4011-c011-000000000003','cc11ce11-0001-4011-b011-000000000001','customer','11ce0011-0011-4011-a011-000000000011','Excellent — please have the mortgage desk and an investment adviser call me this week.',false,'chat','banking','kenya','2026-05-07T11:30:00+00'),
  -- 12 Esther (opportunity)
  ('bb11ce12-0001-4012-c012-000000000001','cc11ce12-0001-4012-b012-000000000001','customer','11ce0012-0012-4012-a012-000000000012','Business is good and I want a second shop in Kawangware. What financing can you offer a business like mine?',false,'whatsapp','banking','kenya','2026-05-16T14:50:00+00'),
  ('bb11ce12-0001-4012-c012-000000000002','cc11ce12-0001-4012-b012-000000000001','ai',null,'Your daily M-Pesa till settlements give us a clear cash-flow picture, so a business expansion loan or a merchant overdraft would suit. Bring six months of statements and your RM can size it.',false,'whatsapp','banking','kenya','2026-05-16T15:00:00+00'),
  ('bb11ce12-0001-4012-c012-000000000003','cc11ce12-0001-4012-b012-000000000001','customer','11ce0012-0012-4012-a012-000000000012','Asante — I''ll bring my M-Pesa statements so we can size the loan.',false,'whatsapp','banking','kenya','2026-05-16T15:10:00+00'),
  -- 13 Peter (opportunity)
  ('bb11ce13-0001-4013-c013-000000000001','cc11ce13-0001-4013-b013-000000000001','customer','11ce0013-0013-4013-a013-000000000013','My card was declined at a hotel in Kampala while on assignment. Embarrassing. Can I get a card that just works when I travel?',false,'chat','banking','kenya','2026-05-13T15:40:00+00'),
  ('bb11ce13-0001-4013-c013-000000000002','cc11ce13-0001-4013-b013-000000000001','ai',null,'I''ve enabled regional usage and travel notifications now. Given your reporting trips, a credit card with no/low foreign fees would smooth this out — I''ll flag it to your RM.',false,'chat','banking','kenya','2026-05-13T15:52:00+00'),
  ('bb11ce13-0001-4013-c013-000000000003','cc11ce13-0001-4013-b013-000000000001','customer','11ce0013-0013-4013-a013-000000000013','Thanks — set up the travel notifications and tell me about a card that works regionally.',false,'chat','banking','kenya','2026-05-13T16:00:00+00'),
  -- 14 Lucy (service + upsell)
  ('bb11ce14-0001-4014-c014-000000000001','cc11ce14-0001-4014-b014-000000000001','customer','11ce0014-0014-4014-a014-000000000014','I keep waiting 40 minutes at the branch. For the balances I keep here, shouldn''t I have a dedicated contact?',false,'chat','banking','kenya','2026-05-15T11:55:00+00'),
  ('bb11ce14-0001-4014-c014-000000000002','cc11ce14-0001-4014-b014-000000000001','ai',null,'You qualify for priority banking, which comes with a named relationship manager and skip-the-queue service — plus access to our wealth desk for that idle balance. I''m escalating to set it up.',false,'chat','banking','kenya','2026-05-15T12:05:00+00'),
  ('bb11ce14-0001-4014-c014-000000000003','cc11ce14-0001-4014-b014-000000000001','customer','11ce0014-0014-4014-a014-000000000014','I''d like a dedicated relationship manager and to hear about your wealth options.',false,'chat','banking','kenya','2026-05-15T12:15:00+00'),
  -- 15 John (old, then silence — dormant)
  ('bb11ce15-0001-4015-c015-000000000001','cc11ce15-0001-4015-b015-000000000001','customer','11ce0015-0015-4015-a015-000000000015','Can I get my balance and last statement?',false,'chat','banking','kenya','2025-08-12T09:10:00+00'),
  ('bb11ce15-0001-4015-c015-000000000002','cc11ce15-0001-4015-b015-000000000001','ai',null,'Your balance is KES 75,000 and I''ve emailed your latest statement. Anything else?',false,'chat','banking','kenya','2025-08-12T09:15:00+00'),
  ('bb11ce15-0001-4015-c015-000000000003','cc11ce15-0001-4015-b015-000000000001','customer','11ce0015-0015-4015-a015-000000000015','Thanks, got it.',false,'chat','banking','kenya','2025-08-12T09:20:00+00'),
  -- 16 Cynthia (opportunity)
  ('bb11ce16-0001-4016-c016-000000000001','cc11ce16-0001-4016-b016-000000000001','customer','11ce0016-0016-4016-a016-000000000016','We''ve won a new haulage contract and need two more trucks. Can you finance them against the contract?',false,'chat','banking','kenya','2026-05-17T10:20:00+00'),
  ('bb11ce16-0001-4016-c016-000000000002','cc11ce16-0001-4016-b016-000000000001','ai',null,'Asset finance is a strong fit — the trucks secure the facility and your contract supports repayment. With your existing business loan history this should move quickly.',false,'chat','banking','kenya','2026-05-17T10:30:00+00'),
  ('bb11ce16-0001-4016-c016-000000000003','cc11ce16-0001-4016-b016-000000000001','customer','11ce0016-0016-4016-a016-000000000016','Brilliant — I''ll send the contract and the quotes from Isuzu.',false,'chat','banking','kenya','2026-05-17T10:40:00+00'),
  -- 17 Brian (opportunity)
  ('bb11ce17-0001-4017-c017-000000000001','cc11ce17-0001-4017-b017-000000000001','customer','11ce0017-0017-4017-a017-000000000017','I''ve been saving for a car. Am I eligible for an auto loan and what would the monthly repayment be?',false,'whatsapp','banking','kenya','2026-05-12T17:10:00+00'),
  ('bb11ce17-0001-4017-c017-000000000002','cc11ce17-0001-4017-b017-000000000001','ai',null,'With your steady salary and the deposit you''re building, you''d likely qualify. On a typical KES 1.5M auto loan over 4 years you''re looking at roughly KES 40,000/month. Your RM can run exact figures.',false,'whatsapp','banking','kenya','2026-05-12T17:18:00+00'),
  ('bb11ce17-0001-4017-c017-000000000003','cc11ce17-0001-4017-b017-000000000001','customer','11ce0017-0017-4017-a017-000000000017','Good to know — I''ll keep building my deposit and apply next month.',false,'whatsapp','banking','kenya','2026-05-12T17:25:00+00'),
  -- 18 Catherine (negative / fee-driven churn)
  ('bb11ce18-0001-4018-c018-000000000001','cc11ce18-0001-4018-b018-000000000001','customer','11ce0018-0018-4018-a018-000000000018','These monthly maintenance fees are eating my Uber money. I barely keep anything here and you still charge me. It''s not worth it.',false,'whatsapp','banking','kenya','2026-05-19T08:10:00+00'),
  ('bb11ce18-0001-4018-c018-000000000002','cc11ce18-0001-4018-b018-000000000001','ai',null,'I hear you, Catherine. There are lighter-fee account options that suit a variable income better, and I can request a goodwill reversal of this month''s fee. Let me escalate so an RM can move you to the right product.',false,'whatsapp','banking','kenya','2026-05-19T08:22:00+00'),
  ('bb11ce18-0001-4018-c018-000000000003','cc11ce18-0001-4018-b018-000000000001','customer','11ce0018-0018-4018-a018-000000000018','A friend uses an account with no monthly fee. If you can''t match that I''ll just move — the fees eat my Uber money.',false,'whatsapp','banking','kenya','2026-05-19T08:30:00+00')
on conflict (id) do nothing;

-- =====================================================================
-- Done (call-center enrichment). See docs/kenya-personas.md.
-- =====================================================================
