-- =====================================================================
-- Persona enrichment for the 11 lighter Kenya clients (BANKING DB)
-- ---------------------------------------------------------------------
-- Adds richer transaction histories, support tickets + messages, and one
-- hardship loan (Faith) so each client tells a distinct story on their 360.
-- Run AFTER seed_kenya_rm_clients_banking.sql, then run the matching
-- seed_kenya_personas_callcenter.sql on the call-center project.
--
-- New IDs use fresh infixes (`bbbb` txns, `2222` tickets/messages) so they
-- never collide with the rows from the first seed. Idempotent.
-- Conventions: see docs/banking_db_reference.md.
-- =====================================================================

-- ---------------------------------------------------------------------
-- Faith Chebet (10) — hardship: a personal loan now at risk of default.
-- ---------------------------------------------------------------------
insert into loans (id, customer_id, type, principal_amount, remaining_balance, interest_rate, term_months, monthly_payment, next_payment_date, disbursement_date, status, market) values
  ('10a11c10-0010-4010-a010-000000000001','11ce0010-0010-4010-a010-000000000010','personal',900000,540000,16.0,48,18500,'2026-06-25','2024-02-25','active','kenya')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- TRANSACTIONS (story-bearing; ~4 per client). Primary account is
-- aa11ceNN-1111-4111-a0NN-000000000001 for every client.
-- ---------------------------------------------------------------------
insert into transactions (id, account_id, date, description, merchant, category, amount, balance_after, type, status, reference, is_unusual, unusual_reason, market) values
  -- 08 Mary Wanjiku — KQ cabin crew, saving for a UK Master's
  ('ff11ce08-bbbb-4008-a008-000000000001','aa11ce08-1111-4111-a008-000000000001','2026-05-25T09:00:00+00','Standing order — Masters fund','SELF / SAVINGS','transfer',20000,200000,'debit','completed','SO-MSC-08',false,null,'kenya'),
  ('ff11ce08-bbbb-4008-a008-000000000002','aa11ce08-1111-4111-a008-000000000001','2026-05-12T19:30:00+00','Duty Free — Heathrow T4','WORLD DUTY FREE','shopping',18500,201500,'debit','completed','POS-LHR-08',false,null,'kenya'),
  ('ff11ce08-bbbb-4008-a008-000000000003','aa11ce08-1111-4111-a008-000000000001','2026-05-08T13:00:00+00','Groceries','NAIVAS KILIMANI','groceries',5400,207000,'debit','completed','POS-08-22',false,null,'kenya'),
  ('ff11ce08-bbbb-4008-a008-000000000004','aa11ce08-1111-4111-a008-000000000001','2026-05-03T07:40:00+00','Ride to JKIA','LITTLE CAB','transport',1200,219000,'debit','completed','LC-08-91',false,null,'kenya'),

  -- 09 Samuel Kiprop — Safaricom engineer, KYC pending, first-time investor
  ('ff11ce09-bbbb-4009-a009-000000000001','aa11ce09-1111-4111-a009-000000000001','2026-05-04T08:00:00+00','Rent — Roysambu','LANDLORD M-PESA','transfer',25000,70000,'debit','completed','RENT-09',false,null,'kenya'),
  ('ff11ce09-bbbb-4009-a009-000000000002','aa11ce09-1111-4111-a009-000000000001','2026-05-15T18:00:00+00','Zuku Fibre','ZUKU','utilities',3500,66500,'debit','completed','ZUKU-09',false,null,'kenya'),
  ('ff11ce09-bbbb-4009-a009-000000000003','aa11ce09-1111-4111-a009-000000000001','2026-05-10T12:30:00+00','Lunch','JAVA HOUSE','restaurants',1300,89000,'debit','completed','POS-09-3',false,null,'kenya'),
  ('ff11ce09-bbbb-4009-a009-000000000004','aa11ce09-1111-4111-a009-000000000001','2026-05-09T20:00:00+00','Airtime','SAFARICOM','transport',1000,90000,'debit','completed','AIR-09',false,null,'kenya'),

  -- 10 Faith Chebet — lost her job; loan repayment now bouncing
  ('ff11ce10-bbbb-4010-a010-000000000001','aa11ce10-1111-4111-a010-000000000001','2026-05-25T09:00:00+00','Personal loan repayment — RETURNED (NSF)','KCB LOAN COLLECTION','other',18500,55500,'debit','failed','LN-PER-10',true,'Personal loan installment (KES 18,500, ref LN-PER-10) bounced — no salary credit received in May after employer payroll stopped. Customer at risk of arrears / default.','kenya'),
  ('ff11ce10-bbbb-4010-a010-000000000002','aa11ce10-1111-4111-a010-000000000001','2026-05-14T10:00:00+00','From family — M-Pesa','M-PESA','transfer',8000,74000,'credit','completed','MP-10-2',false,null,'kenya'),
  ('ff11ce10-bbbb-4010-a010-000000000003','aa11ce10-1111-4111-a010-000000000001','2026-05-06T11:00:00+00','Groceries (reduced)','QUICKMART','groceries',2200,66000,'debit','completed','POS-10-5',false,null,'kenya'),
  ('ff11ce10-bbbb-4010-a010-000000000004','aa11ce10-1111-4111-a010-000000000001','2026-05-02T08:00:00+00','Loan repayment — March','KCB LOAN COLLECTION','other',18500,68200,'debit','completed','LN-PER-10-M',false,null,'kenya'),

  -- 11 Daniel Mwangi — Deloitte manager, disciplined saver, eyeing a mortgage
  ('ff11ce11-bbbb-4011-a011-000000000001','aa11ce11-2222-4222-a011-000000000002','2026-05-02T09:00:00+00','Monthly transfer to Goal Saver','SELF / SAVINGS','transfer',200000,3400000,'credit','completed','SO-SAV-11',false,null,'kenya'),
  ('ff11ce11-bbbb-4011-a011-000000000002','aa11ce11-1111-4111-a011-000000000001','2026-05-06T14:00:00+00','School fees — Brookhouse','BROOKHOUSE SCHOOL','transfer',180000,1620000,'debit','completed','FEE-11',false,null,'kenya'),
  ('ff11ce11-bbbb-4011-a011-000000000003','aa11ce11-1111-4111-a011-000000000001','2026-05-11T20:00:00+00','Dinner — Cinabar','CINABAR LAVINGTON','restaurants',7800,1612200,'debit','completed','POS-11-7',false,null,'kenya'),
  ('ff11ce11-bbbb-4011-a011-000000000004','aa11ce11-1111-4111-a011-000000000001','2026-05-01T08:00:00+00','Dividend — Equity Group','EQUITY GROUP DIVIDEND','investment',64000,1684000,'credit','completed','DIV-11',false,null,'kenya'),

  -- 12 Esther Nyambura — "Mama Esther Groceries", expanding to a 2nd shop
  ('ff11ce12-bbbb-4012-a012-000000000001','aa11ce12-1111-4111-a012-000000000001','2026-05-18T17:00:00+00','Supplier payment — wholesale stock','MAHITAJI WHOLESALERS','transfer',180000,360000,'debit','completed','PO-12-3',false,null,'kenya'),
  ('ff11ce12-bbbb-4012-a012-000000000002','aa11ce12-1111-4111-a012-000000000001','2026-05-17T19:00:00+00','Daily till settlement','M-PESA TILL 884221','transfer',52000,540000,'credit','completed','TILL-12-2',false,null,'kenya'),
  ('ff11ce12-bbbb-4012-a012-000000000003','aa11ce12-1111-4111-a012-000000000001','2026-05-10T08:00:00+00','Shop rent — Gikomba','LANDLORD','transfer',35000,420000,'debit','completed','RENT-12',false,null,'kenya'),
  ('ff11ce12-bbbb-4012-a012-000000000004','aa11ce12-1111-4111-a012-000000000001','2026-05-09T18:30:00+00','Daily till settlement','M-PESA TILL 884221','transfer',47000,455000,'credit','completed','TILL-12-1',false,null,'kenya'),

  -- 13 Peter Omondi — Nation Media journalist, irregular income, no card abroad
  ('ff11ce13-bbbb-4013-a013-000000000001','aa11ce13-1111-4111-a013-000000000001','2026-05-14T15:00:00+00','Freelance feature — payment','THE CONTINENT MEDIA','transfer',45000,175000,'credit','completed','FRL-13',false,null,'kenya'),
  ('ff11ce13-bbbb-4013-a013-000000000002','aa11ce13-1111-4111-a013-000000000001','2026-05-12T09:00:00+00','Flight — assignment Kampala','UGANDA AIRLINES','travel',22000,130000,'debit','completed','FLT-13',false,null,'kenya'),
  ('ff11ce13-bbbb-4013-a013-000000000003','aa11ce13-1111-4111-a013-000000000001','2026-05-13T13:00:00+00','Card declined — Kampala hotel','SPEKE HOTEL','travel',0,130000,'debit','failed','DECL-13',true,'Card declined abroad (Kampala) — no international usage profile on file. Friction point; candidate for a travel-friendly card.','kenya'),
  ('ff11ce13-bbbb-4013-a013-000000000004','aa11ce13-1111-4111-a013-000000000001','2026-05-05T18:00:00+00','Groceries','CARREFOUR','groceries',4100,152000,'debit','completed','POS-13-2',false,null,'kenya'),

  -- 14 Lucy Wairimu — EABL marketing manager, lifestyle, premier-banking upsell
  ('ff11ce14-bbbb-4014-a014-000000000001','aa11ce14-1111-4111-a014-000000000001','2026-05-20T16:00:00+00','Holiday booking — Zanzibar','TURKISH AIRLINES','travel',180000,740000,'debit','completed','TRV-14',false,null,'kenya'),
  ('ff11ce14-bbbb-4014-a014-000000000002','aa11ce14-2222-4222-a014-000000000002','2026-05-02T09:00:00+00','Transfer to Goal Saver','SELF / SAVINGS','transfer',120000,1500000,'credit','completed','SO-SAV-14',false,null,'kenya'),
  ('ff11ce14-bbbb-4014-a014-000000000003','aa11ce14-1111-4111-a014-000000000001','2026-05-11T13:00:00+00','Brunch — Artcaffe','ARTCAFFE SARIT','restaurants',6500,920000,'debit','completed','POS-14-9',false,null,'kenya'),
  ('ff11ce14-bbbb-4014-a014-000000000004','aa11ce14-1111-4111-a014-000000000001','2026-05-07T17:00:00+00','Shopping — Sarit','SARIT CENTRE','shopping',23000,926500,'debit','completed','POS-14-4',false,null,'kenya'),

  -- 15 John Maina — county clerk, account used purely as salary pass-through (dormant)
  ('ff11ce15-bbbb-4015-a015-000000000001','aa11ce15-1111-4111-a015-000000000001','2026-05-01T10:30:00+00','ATM cash withdrawal','KCB ATM — KIAMBU','transfer',60000,15000,'debit','completed','ATM-15-5',false,null,'kenya'),
  ('ff11ce15-bbbb-4015-a015-000000000002','aa11ce15-1111-4111-a015-000000000001','2026-04-01T10:15:00+00','ATM cash withdrawal','KCB ATM — KIAMBU','transfer',62000,8000,'debit','completed','ATM-15-4',false,null,'kenya'),

  -- 16 Cynthia Adhiambo — Adhiambo Logistics, scaling the fleet
  ('ff11ce16-bbbb-4016-a016-000000000001','aa11ce16-1111-4111-a016-000000000001','2026-05-19T11:00:00+00','Fuel — fleet (Total cards)','TOTAL ENERGIES','transport',95000,1155000,'debit','completed','FUEL-16',false,null,'kenya'),
  ('ff11ce16-bbbb-4016-a016-000000000002','aa11ce16-1111-4111-a016-000000000001','2026-05-15T17:00:00+00','Contract payment — Bidco haulage','BIDCO AFRICA','transfer',380000,1250000,'credit','completed','INV-16-23',false,null,'kenya'),
  ('ff11ce16-bbbb-4016-a016-000000000003','aa11ce16-1111-4111-a016-000000000001','2026-05-05T09:00:00+00','Driver salaries (x6)','PAYROLL','salary',240000,870000,'debit','completed','PAY-16',false,null,'kenya'),
  ('ff11ce16-bbbb-4016-a016-000000000004','aa11ce16-1111-4111-a016-000000000001','2026-05-03T14:00:00+00','Truck repair — Isuzu','ISUZU EA','other',85000,1110000,'debit','completed','REP-16',false,null,'kenya'),

  -- 17 Brian Mutua — young professional, building toward a car loan
  ('ff11ce17-bbbb-4017-a017-000000000001','aa11ce17-1111-4111-a017-000000000001','2026-05-02T09:00:00+00','Car deposit savings','SELF / SAVINGS','transfer',25000,135000,'debit','completed','SO-CAR-17',false,null,'kenya'),
  ('ff11ce17-bbbb-4017-a017-000000000005','aa11ce17-1111-4111-a017-000000000001','2026-05-04T08:00:00+00','Rent — Kileleshwa','LANDLORD','transfer',45000,90000,'debit','completed','RENT-17',false,null,'kenya'),
  ('ff11ce17-bbbb-4017-a017-000000000002','aa11ce17-1111-4111-a017-000000000001','2026-05-09T19:00:00+00','Gym membership','SMART GYMS','entertainment',6000,84000,'debit','completed','POS-17-1',false,null,'kenya'),
  ('ff11ce17-bbbb-4017-a017-000000000003','aa11ce17-1111-4111-a017-000000000001','2026-05-12T20:00:00+00','Dinner','MISONO','restaurants',5200,78800,'debit','completed','POS-17-2',false,null,'kenya'),

  -- 18 Catherine Njoki — Uber driver, fee-sensitive, volatile income
  ('ff11ce18-bbbb-4018-a018-000000000001','aa11ce18-1111-4111-a018-000000000001','2026-05-20T21:00:00+00','Uber weekly payout','UBER BV','salary',14500,40000,'credit','completed','UBR-18-3',false,null,'kenya'),
  ('ff11ce18-bbbb-4018-a018-000000000002','aa11ce18-1111-4111-a018-000000000001','2026-05-18T08:00:00+00','Monthly account maintenance fee','KCB FEES','fees',650,25500,'debit','completed','FEE-18',true,'Flat monthly maintenance fee on a low, volatile balance — repeatedly flagged by the customer as disproportionate to how little they keep on deposit.','kenya'),
  ('ff11ce18-bbbb-4018-a018-000000000003','aa11ce18-1111-4111-a018-000000000001','2026-05-15T20:00:00+00','Fuel','SHELL MLOLONGO','transport',3000,26150,'debit','completed','FUEL-18',false,null,'kenya'),
  ('ff11ce18-bbbb-4018-a018-000000000004','aa11ce18-1111-4111-a018-000000000001','2026-05-13T21:00:00+00','Uber weekly payout','UBER BV','salary',11200,29150,'credit','completed','UBR-18-2',false,null,'kenya')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- SUPPORT TICKETS (open/in_progress so they hit the action queue).
-- These are mostly OPPORTUNITY tickets — they don't trip the churn radar.
-- (Catherine already has her fee-complaint ticket from the first seed.)
-- ---------------------------------------------------------------------
insert into support_tickets (id, user_id, subject, status, priority, assigned_to, market) values
  ('dd11ce08-2222-4008-a008-000000000001','11ce0008-0008-4008-a008-000000000008','Using my card on international layovers','open','medium','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('dd11ce09-2222-4009-a009-000000000001','11ce0009-0009-4009-a009-000000000009','How do I complete my KYC verification?','open','medium','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('dd11ce10-2222-4010-a010-000000000001','11ce0010-0010-4010-a010-000000000010','Can I pause or restructure my loan repayments?','open','high','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('dd11ce11-2222-4011-a011-000000000001','11ce0011-0011-4011-a011-000000000011','Mortgage for a Karen townhouse — what can I borrow?','in_progress','medium','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('dd11ce12-2222-4012-a012-000000000001','11ce0012-0012-4012-a012-000000000012','Financing to open a second shop','open','medium','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('dd11ce13-2222-4013-a013-000000000001','11ce0013-0013-4013-a013-000000000013','Card declined in Kampala on assignment','open','medium','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('dd11ce14-2222-4014-a014-000000000001','11ce0014-0014-4014-a014-000000000014','Long branch wait times — can I get priority banking?','open','medium','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('dd11ce16-2222-4016-a016-000000000001','11ce0016-0016-4016-a016-000000000016','Asset finance for two more trucks','in_progress','medium','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('dd11ce17-2222-4017-a017-000000000001','11ce0017-0017-4017-a017-000000000017','Am I eligible for a car loan?','open','low','11ce0003-0003-4003-a003-000000000003','kenya')
on conflict (id) do nothing;

insert into support_messages (id, ticket_id, sender_type, content, market) values
  ('ee11ce08-2222-4008-a008-000000000001','dd11ce08-2222-4008-a008-000000000001','user','I''m cabin crew and I''m abroad a lot. My card sometimes fails overseas and the FX rates feel steep. Is there a better card for me?','kenya'),
  ('ee11ce09-2222-4009-a009-000000000001','dd11ce09-2222-4009-a009-000000000001','user','My account still shows KYC pending. What do I need to send to finish it, and once done can I start a small investment?','kenya'),
  ('ee11ce10-2222-4010-a010-000000000001','dd11ce10-2222-4010-a010-000000000001','user','I lost my job last month and my loan repayment just bounced. Can we pause or restructure it before it hurts my CRB record?','kenya'),
  ('ee11ce11-2222-4011-a011-000000000001','dd11ce11-2222-4011-a011-000000000001','user','I''m looking at a townhouse in Karen around KES 22M. With my salary and savings, what mortgage could I qualify for?','kenya'),
  ('ee11ce12-2222-4012-a012-000000000001','dd11ce12-2222-4012-a012-000000000001','user','My shop is doing well and I want to open a second branch in Kawangware. What financing can the bank offer a business like mine?','kenya'),
  ('ee11ce13-2222-4013-a013-000000000001','dd11ce13-2222-4013-a013-000000000001','user','My card was declined at a hotel in Kampala while I was on assignment. Embarrassing. Can I get a card that just works when I travel?','kenya'),
  ('ee11ce14-2222-4014-a014-000000000001','dd11ce14-2222-4014-a014-000000000001','user','I keep waiting 40 minutes at the branch. For the balances I hold, shouldn''t I have a dedicated contact / priority banking?','kenya'),
  ('ee11ce16-2222-4016-a016-000000000001','dd11ce16-2222-4016-a016-000000000001','user','We''ve won a new haulage contract and need two more trucks. Can you finance the assets against the contract?','kenya'),
  ('ee11ce17-2222-4017-a017-000000000001','dd11ce17-2222-4017-a017-000000000001','user','I''ve been saving towards a car. Am I eligible for an auto loan, and what would the monthly repayment look like?','kenya')
on conflict (id) do nothing;

-- =====================================================================
-- Done (banking enrichment). See docs/kenya-personas.md for the stories.
-- =====================================================================
