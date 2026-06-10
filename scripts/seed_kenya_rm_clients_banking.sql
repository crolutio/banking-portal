-- =====================================================================
-- Seed: 15 additional Kenya clients for the RM triage demo (BANKING DB)
-- ---------------------------------------------------------------------
-- Run this on the BANKING Supabase project.
-- Then run scripts/seed_kenya_rm_clients_callcenter.sql on the CALL CENTER project.
--
-- All clients are assigned to RM Peter Mwangi (11ce0003-...-0003), market='kenya'.
-- UUID scheme mirrors the existing Kenya seed (11ce000N-...). New clients use
-- indices 04..18 (01/02 = Wanjiru/Otieno, 03 = the RM).
--
-- Idempotent: every insert is ON CONFLICT (id) DO NOTHING, so re-running is safe.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. PROFILES (15)
-- ---------------------------------------------------------------------
insert into profiles (id, email, full_name, role, avatar_url, phone, segment, kyc_status, assigned_rm_id, market) values
  ('11ce0004-0004-4004-a004-000000000004','joseph.karanja@email.co.ke','Joseph Karanja','retail_customer','/placeholder.svg?height=40&width=40','+254712345004','Premium','Verified','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('11ce0005-0005-4005-a005-000000000005','aisha.mohamed@email.co.ke','Aisha Mohamed','retail_customer','/placeholder.svg?height=40&width=40','+254712345005','VIP','Verified','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('11ce0006-0006-4006-a006-000000000006','david.kimani@email.co.ke','David Kimani','retail_customer','/placeholder.svg?height=40&width=40','+254712345006','At Risk','Verified','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('11ce0007-0007-4007-a007-000000000007','grace.achieng@email.co.ke','Grace Achieng','retail_customer','/placeholder.svg?height=40&width=40','+254712345007','Premium','Verified','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('11ce0008-0008-4008-a008-000000000008','mary.wanjiku@email.co.ke','Mary Wanjiku','retail_customer','/placeholder.svg?height=40&width=40','+254712345008','Standard','Verified','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('11ce0009-0009-4009-a009-000000000009','samuel.kiprop@email.co.ke','Samuel Kiprop','retail_customer','/placeholder.svg?height=40&width=40','+254712345009','Standard','Pending','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('11ce0010-0010-4010-a010-000000000010','faith.chebet@email.co.ke','Faith Chebet','retail_customer','/placeholder.svg?height=40&width=40','+254712345010','At Risk','Verified','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('11ce0011-0011-4011-a011-000000000011','daniel.mwangi@email.co.ke','Daniel Mwangi','retail_customer','/placeholder.svg?height=40&width=40','+254712345011','Premium','Verified','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('11ce0012-0012-4012-a012-000000000012','esther.nyambura@email.co.ke','Esther Nyambura','retail_customer','/placeholder.svg?height=40&width=40','+254712345012','Standard','Verified','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('11ce0013-0013-4013-a013-000000000013','peter.omondi@email.co.ke','Peter Omondi','retail_customer','/placeholder.svg?height=40&width=40','+254712345013','Standard','Verified','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('11ce0014-0014-4014-a014-000000000014','lucy.wairimu@email.co.ke','Lucy Wairimu','retail_customer','/placeholder.svg?height=40&width=40','+254712345014','Premium','Verified','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('11ce0015-0015-4015-a015-000000000015','john.maina@email.co.ke','John Maina','retail_customer','/placeholder.svg?height=40&width=40','+254712345015','Standard','Pending','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('11ce0016-0016-4016-a016-000000000016','cynthia.adhiambo@email.co.ke','Cynthia Adhiambo','retail_customer','/placeholder.svg?height=40&width=40','+254712345016','Premium','Verified','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('11ce0017-0017-4017-a017-000000000017','brian.mutua@email.co.ke','Brian Mutua','retail_customer','/placeholder.svg?height=40&width=40','+254712345017','Standard','Verified','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('11ce0018-0018-4018-a018-000000000018','catherine.njoki@email.co.ke','Catherine Njoki','retail_customer','/placeholder.svg?height=40&width=40','+254712345018','At Risk','Verified','11ce0003-0003-4003-a003-000000000003','kenya')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- 1b. CUSTOMERS (banking-side) — accounts/cards/loans.customer_id FK to here.
--     Same UUID as the profile (profiles.customer_id stays null, matching the
--     existing Kenya clients). Must be inserted BEFORE accounts.
-- ---------------------------------------------------------------------
insert into customers (id, name, email, phone, tier, market) values
  ('11ce0004-0004-4004-a004-000000000004','Joseph Karanja','joseph.karanja@email.co.ke','+254712345004','premium','kenya'),
  ('11ce0005-0005-4005-a005-000000000005','Aisha Mohamed','aisha.mohamed@email.co.ke','+254712345005','vip','kenya'),
  ('11ce0006-0006-4006-a006-000000000006','David Kimani','david.kimani@email.co.ke','+254712345006','standard','kenya'),
  ('11ce0007-0007-4007-a007-000000000007','Grace Achieng','grace.achieng@email.co.ke','+254712345007','premium','kenya'),
  ('11ce0008-0008-4008-a008-000000000008','Mary Wanjiku','mary.wanjiku@email.co.ke','+254712345008','standard','kenya'),
  ('11ce0009-0009-4009-a009-000000000009','Samuel Kiprop','samuel.kiprop@email.co.ke','+254712345009','standard','kenya'),
  ('11ce0010-0010-4010-a010-000000000010','Faith Chebet','faith.chebet@email.co.ke','+254712345010','standard','kenya'),
  ('11ce0011-0011-4011-a011-000000000011','Daniel Mwangi','daniel.mwangi@email.co.ke','+254712345011','premium','kenya'),
  ('11ce0012-0012-4012-a012-000000000012','Esther Nyambura','esther.nyambura@email.co.ke','+254712345012','standard','kenya'),
  ('11ce0013-0013-4013-a013-000000000013','Peter Omondi','peter.omondi@email.co.ke','+254712345013','standard','kenya'),
  ('11ce0014-0014-4014-a014-000000000014','Lucy Wairimu','lucy.wairimu@email.co.ke','+254712345014','premium','kenya'),
  ('11ce0015-0015-4015-a015-000000000015','John Maina','john.maina@email.co.ke','+254712345015','standard','kenya'),
  ('11ce0016-0016-4016-a016-000000000016','Cynthia Adhiambo','cynthia.adhiambo@email.co.ke','+254712345016','premium','kenya'),
  ('11ce0017-0017-4017-a017-000000000017','Brian Mutua','brian.mutua@email.co.ke','+254712345017','standard','kenya'),
  ('11ce0018-0018-4018-a018-000000000018','Catherine Njoki','catherine.njoki@email.co.ke','+254712345018','standard','kenya')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- 2. ACCOUNTS
--    Primary current account for every client (drives AUM + list balance).
--    SME clients (04, 12, 16) use type 'business'. HNW/Premium get extra
--    savings / fx wallets. account_number uses a fresh '02NN...' range so it
--    never collides with the existing '011...' numbers.
-- ---------------------------------------------------------------------
insert into accounts (id, customer_id, name, type, currency, balance, available_balance, account_number, iban, status, market) values
  -- 04 Joseph Karanja — SME
  ('aa11ce04-1111-4111-a004-000000000001','11ce0004-0004-4004-a004-000000000004','Karanja Hardware — Business Current','business','KES',3200000,2980000,'02040001','KE07033KCB02040001000','active','kenya'),
  -- 05 Aisha Mohamed — HNW
  ('aa11ce05-1111-4111-a005-000000000001','11ce0005-0005-4005-a005-000000000005','Personal Current Account','current','KES',2500000,2500000,'02050001','KE07033KCB02050001000','active','kenya'),
  ('aa11ce05-2222-4222-a005-000000000002','11ce0005-0005-4005-a005-000000000005','Wealth Reserve Savings','savings','KES',12000000,12000000,'02050002','KE07033KCB02050002000','active','kenya'),
  ('aa11ce05-3333-4333-a005-000000000003','11ce0005-0005-4005-a005-000000000005','Diaspora USD Wallet','fx_wallet','USD',45000,45000,'02050003','KE07033KCB02050003000','active','kenya'),
  -- 06 David Kimani — CHURN (balance drained, savings emptied)
  ('aa11ce06-1111-4111-a006-000000000001','11ce0006-0006-4006-a006-000000000006','Personal Current Account','current','KES',180000,180000,'02060001','KE07033KCB02060001000','active','kenya'),
  ('aa11ce06-2222-4222-a006-000000000002','11ce0006-0006-4006-a006-000000000006','Goal Saver','savings','KES',25000,25000,'02060002','KE07033KCB02060002000','active','kenya'),
  -- 07 Grace Achieng — diaspora opportunity
  ('aa11ce07-1111-4111-a007-000000000001','11ce0007-0007-4007-a007-000000000007','Personal Current Account','current','KES',640000,640000,'02070001','KE07033KCB02070001000','active','kenya'),
  ('aa11ce07-3333-4333-a007-000000000003','11ce0007-0007-4007-a007-000000000007','Diaspora USD Wallet','fx_wallet','USD',22000,22000,'02070003','KE07033KCB02070003000','active','kenya'),
  -- 08 Mary Wanjiku
  ('aa11ce08-1111-4111-a008-000000000001','11ce0008-0008-4008-a008-000000000008','Personal Current Account','current','KES',220000,220000,'02080001','KE07033KCB02080001000','active','kenya'),
  -- 09 Samuel Kiprop
  ('aa11ce09-1111-4111-a009-000000000001','11ce0009-0009-4009-a009-000000000009','Personal Current Account','current','KES',95000,95000,'02090001','KE07033KCB02090001000','active','kenya'),
  -- 10 Faith Chebet — at risk
  ('aa11ce10-1111-4111-a010-000000000001','11ce0010-0010-4010-a010-000000000010','Personal Current Account','current','KES',60000,60000,'02100001','KE07033KCB02100001000','active','kenya'),
  -- 11 Daniel Mwangi — premium
  ('aa11ce11-1111-4111-a011-000000000001','11ce0011-0011-4011-a011-000000000011','Personal Current Account','current','KES',1800000,1800000,'02110001','KE07033KCB02110001000','active','kenya'),
  ('aa11ce11-2222-4222-a011-000000000002','11ce0011-0011-4011-a011-000000000011','Goal Saver','savings','KES',3400000,3400000,'02110002','KE07033KCB02110002000','active','kenya'),
  -- 12 Esther Nyambura — SME (small)
  ('aa11ce12-1111-4111-a012-000000000001','11ce0012-0012-4012-a012-000000000012','Mama Esther Groceries — Business','business','KES',540000,505000,'02120001','KE07033KCB02120001000','active','kenya'),
  -- 13 Peter Omondi
  ('aa11ce13-1111-4111-a013-000000000001','11ce0013-0013-4013-a013-000000000013','Personal Current Account','current','KES',130000,130000,'02130001','KE07033KCB02130001000','active','kenya'),
  -- 14 Lucy Wairimu — premium
  ('aa11ce14-1111-4111-a014-000000000001','11ce0014-0014-4014-a014-000000000014','Personal Current Account','current','KES',920000,920000,'02140001','KE07033KCB02140001000','active','kenya'),
  ('aa11ce14-2222-4222-a014-000000000002','11ce0014-0014-4014-a014-000000000014','Goal Saver','savings','KES',1500000,1500000,'02140002','KE07033KCB02140002000','active','kenya'),
  -- 15 John Maina
  ('aa11ce15-1111-4111-a015-000000000001','11ce0015-0015-4015-a015-000000000015','Personal Current Account','current','KES',75000,75000,'02150001','KE07033KCB02150001000','active','kenya'),
  -- 16 Cynthia Adhiambo — SME
  ('aa11ce16-1111-4111-a016-000000000001','11ce0016-0016-4016-a016-000000000016','Adhiambo Logistics — Business','business','KES',1250000,1180000,'02160001','KE07033KCB02160001000','active','kenya'),
  -- 17 Brian Mutua
  ('aa11ce17-1111-4111-a017-000000000001','11ce0017-0017-4017-a017-000000000017','Personal Current Account','current','KES',160000,160000,'02170001','KE07033KCB02170001000','active','kenya'),
  -- 18 Catherine Njoki — at risk
  ('aa11ce18-1111-4111-a018-000000000001','11ce0018-0018-4018-a018-000000000018','Personal Current Account','current','KES',40000,40000,'02180001','KE07033KCB02180001000','active','kenya')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- 3. LOANS (SME / mortgage colour for a couple of hero clients)
-- ---------------------------------------------------------------------
insert into loans (id, customer_id, type, principal_amount, remaining_balance, interest_rate, term_months, monthly_payment, next_payment_date, disbursement_date, status, market) values
  ('10a11c04-0004-4004-a004-000000000001','11ce0004-0004-4004-a004-000000000004','business',2000000,1450000,14.5,36,68500,'2026-07-05','2025-02-05','active','kenya'),
  ('10a11c06-0006-4006-a006-000000000001','11ce0006-0006-4006-a006-000000000006','mortgage',9500000,7800000,13.0,240,118000,'2026-07-01','2021-09-01','delinquent','kenya'),
  ('10a11c16-0016-4016-a016-000000000001','11ce0016-0016-4016-a016-000000000016','business',800000,520000,15.0,24,38500,'2026-07-12','2025-06-12','active','kenya')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- 4. TRANSACTIONS
--    Hero clients (04,05,06,07) get richer histories with story signals.
--    Other clients get a salary credit + one debit so balances look alive.
-- ---------------------------------------------------------------------
insert into transactions (id, account_id, date, description, merchant, category, amount, balance_after, type, status, reference, is_unusual, unusual_reason, market) values
  -- 06 DAVID KIMANI — the churn story: salary stopped, savings/funds moved to Equity
  ('ff11ce06-aaaa-4006-a006-000000000001','aa11ce06-1111-4111-a006-000000000001','2026-04-01T08:00:00+00','Salary - March 2026','TUSKYS PAYROLL','salary',360000,1680000,'credit','completed','SAL-2026-03',false,null,'kenya'),
  ('ff11ce06-aaaa-4006-a006-000000000002','aa11ce06-1111-4111-a006-000000000001','2026-04-16T10:30:00+00','Transfer to Equity Bank','EQUITY BANK - ACCT 0150xxxx','transfer',1500000,180000,'debit','completed','TRF-EQ-0416',true,'Large outbound transfer to a competitor bank (KES 1,500,000). Customer moved the bulk of liquid savings externally — primary churn / account-migration signal.','kenya'),
  ('ff11ce06-aaaa-4006-a006-000000000003','aa11ce06-2222-4222-a006-000000000002','2026-04-16T10:35:00+00','Savings sweep to Equity Bank','EQUITY BANK - ACCT 0150xxxx','transfer',575000,25000,'debit','completed','TRF-EQ-0416B',true,'Goal Saver emptied into the same external transfer. Savings balance fell from KES 600,000 to KES 25,000.','kenya'),
  ('ff11ce06-aaaa-4006-a006-000000000004','aa11ce06-1111-4111-a006-000000000001','2026-05-02T09:00:00+00','Standing order setup — Equity Bank','EQUITY BANK','transfer',0,180000,'debit','pending','SO-EQ-0502',true,'Customer set up a recurring standing order to route future salary to Equity Bank. No KCB salary credit received for May — income redirection in progress.','kenya'),
  ('ff11ce06-aaaa-4006-a006-000000000005','aa11ce06-1111-4111-a006-000000000001','2026-05-10T14:00:00+00','KPLC Token','KPLC PREPAID','utilities',4500,175500,'debit','completed','KPLC-55021',false,null,'kenya'),

  -- 04 JOSEPH KARANJA — SME working-capital story
  ('ff11ce04-aaaa-4004-a004-000000000001','aa11ce04-1111-4111-a004-000000000001','2026-05-19T09:00:00+00','Customer payment — Bidco order','BIDCO AFRICA','transfer',850000,3200000,'credit','completed','INV-2041',false,null,'kenya'),
  ('ff11ce04-aaaa-4004-a004-000000000002','aa11ce04-1111-4111-a004-000000000001','2026-05-15T11:00:00+00','Supplier payment — cement stock','BAMBURI CEMENT','transfer',1200000,2350000,'debit','completed','PO-7782',true,'Large supplier outflow ahead of receivables — recurring working-capital squeeze for this SME.','kenya'),
  ('ff11ce04-aaaa-4004-a004-000000000003','aa11ce04-1111-4111-a004-000000000001','2026-05-12T16:00:00+00','POS settlement — daily sales','PESAPAL SETTLEMENT','transfer',310000,3550000,'credit','completed','PSP-0512',false,null,'kenya'),
  ('ff11ce04-aaaa-4004-a004-000000000004','aa11ce04-1111-4111-a004-000000000001','2026-05-05T08:30:00+00','Business loan repayment','KCB ASSET FINANCE','other',68500,3240000,'debit','completed','LN-BIZ-04',false,null,'kenya'),

  -- 05 AISHA MOHAMED — HNW idle-cash story
  ('ff11ce05-aaaa-4005-a005-000000000001','aa11ce05-1111-4111-a005-000000000001','2026-05-01T08:00:00+00','Dividend — Safaricom PLC','SAFARICOM DIVIDEND','investment',420000,2500000,'credit','completed','DIV-SCOM-26',false,null,'kenya'),
  ('ff11ce05-aaaa-4005-a005-000000000002','aa11ce05-1111-4111-a005-000000000001','2026-05-03T12:00:00+00','Rental income — Kilimani apt','TENANT TRANSFER','transfer',180000,2320000,'credit','completed','RENT-0503',false,null,'kenya'),
  ('ff11ce05-aaaa-4005-a005-000000000003','aa11ce05-1111-4111-a005-000000000001','2026-05-09T18:00:00+00','Dinner — Talisman','TALISMAN KAREN','restaurants',9800,2310200,'debit','completed','POS-1190',false,null,'kenya'),

  -- 07 GRACE ACHIENG — diaspora story (USD inflows)
  ('ff11ce07-aaaa-4007-a007-000000000001','aa11ce07-3333-4333-a007-000000000003','2026-05-18T15:00:00+00','Remittance from UK — Wise','WISE / TRANSFERWISE','transfer',3500,22000,'credit','completed','WISE-5521',false,null,'kenya'),
  ('ff11ce07-aaaa-4007-a007-000000000002','aa11ce07-1111-4111-a007-000000000001','2026-05-10T10:00:00+00','FX conversion USD→KES','KCB TREASURY','transfer',260000,640000,'credit','completed','FX-0510',false,null,'kenya'),
  ('ff11ce07-aaaa-4007-a007-000000000003','aa11ce07-1111-4111-a007-000000000001','2026-05-11T09:00:00+00','M-Pesa to mother','M-PESA','transfer',30000,610000,'debit','completed','MPESA-7781',false,null,'kenya'),

  -- Lighter clients: a salary credit + one debit each
  ('ff11ce08-aaaa-4008-a008-000000000001','aa11ce08-1111-4111-a008-000000000001','2026-05-01T08:00:00+00','Salary - May 2026','KENYA AIRWAYS PAYROLL','salary',140000,220000,'credit','completed','SAL-08-05',false,null,'kenya'),
  ('ff11ce08-aaaa-4008-a008-000000000002','aa11ce08-1111-4111-a008-000000000001','2026-05-06T13:00:00+00','Naivas groceries','NAIVAS','groceries',6200,213800,'debit','completed','POS-08-1',false,null,'kenya'),
  ('ff11ce09-aaaa-4009-a009-000000000001','aa11ce09-1111-4111-a009-000000000001','2026-05-01T08:00:00+00','Salary - May 2026','SAFARICOM PAYROLL','salary',85000,95000,'credit','completed','SAL-09-05',false,null,'kenya'),
  ('ff11ce10-aaaa-4010-a010-000000000001','aa11ce10-1111-4111-a010-000000000001','2026-04-28T08:00:00+00','Salary - April 2026','BRITAM PAYROLL','salary',72000,60000,'credit','completed','SAL-10-04',true,'No May salary credit received — possible income disruption for an at-risk client.','kenya'),
  ('ff11ce11-aaaa-4011-a011-000000000001','aa11ce11-1111-4111-a011-000000000001','2026-05-01T08:00:00+00','Salary - May 2026','DELOITTE PAYROLL','salary',480000,1800000,'credit','completed','SAL-11-05',false,null,'kenya'),
  ('ff11ce12-aaaa-4012-a012-000000000001','aa11ce12-1111-4111-a012-000000000001','2026-05-14T17:00:00+00','Daily M-Pesa till settlement','M-PESA TILL 884221','transfer',48000,540000,'credit','completed','TILL-0514',false,null,'kenya'),
  ('ff11ce13-aaaa-4013-a013-000000000001','aa11ce13-1111-4111-a013-000000000001','2026-05-01T08:00:00+00','Salary - May 2026','NATION MEDIA PAYROLL','salary',110000,130000,'credit','completed','SAL-13-05',false,null,'kenya'),
  ('ff11ce14-aaaa-4014-a014-000000000001','aa11ce14-1111-4111-a014-000000000001','2026-05-01T08:00:00+00','Salary - May 2026','EABL PAYROLL','salary',390000,920000,'credit','completed','SAL-14-05',false,null,'kenya'),
  ('ff11ce15-aaaa-4015-a015-000000000001','aa11ce15-1111-4111-a015-000000000001','2026-05-01T08:00:00+00','Salary - May 2026','COUNTY GOVT PAYROLL','salary',68000,75000,'credit','completed','SAL-15-05',false,null,'kenya'),
  ('ff11ce16-aaaa-4016-a016-000000000001','aa11ce16-1111-4111-a016-000000000001','2026-05-16T16:00:00+00','Logistics contract payment','DHL KENYA','transfer',420000,1250000,'credit','completed','INV-16-22',false,null,'kenya'),
  ('ff11ce17-aaaa-4017-a017-000000000001','aa11ce17-1111-4111-a017-000000000001','2026-05-01T08:00:00+00','Salary - May 2026','EQUITY PAYROLL','salary',125000,160000,'credit','completed','SAL-17-05',false,null,'kenya'),
  ('ff11ce18-aaaa-4018-a018-000000000001','aa11ce18-1111-4111-a018-000000000001','2026-04-30T08:00:00+00','Salary - April 2026','UBER KENYA','salary',55000,40000,'credit','completed','SAL-18-04',true,'Declining balance and reduced inflows for an at-risk client — monitor for churn.','kenya')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- 5. SUPPORT TICKETS (banking side) — heroes + a couple at-risk for the
--    "pending actions" queue. Messages added for the hero tickets.
-- ---------------------------------------------------------------------
insert into support_tickets (id, user_id, subject, status, priority, assigned_to, market) values
  ('dd11ce06-1111-4111-a006-000000000001','11ce0006-0006-4006-a006-000000000006','Requesting account closure / final statement','open','high','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('dd11ce04-1111-4111-a004-000000000001','11ce0004-0004-4004-a004-000000000004','Working-capital / overdraft enquiry for the business','in_progress','medium','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('dd11ce05-1111-4111-a005-000000000001','11ce0005-0005-4005-a005-000000000005','Better returns on my cash balance?','open','medium','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('dd11ce07-1111-4111-a007-000000000001','11ce0007-0007-4007-a007-000000000007','Best way to save my income from abroad','open','low','11ce0003-0003-4003-a003-000000000003','kenya'),
  ('dd11ce18-1111-4111-a018-000000000001','11ce0018-0018-4018-a018-000000000018','Unhappy with new monthly maintenance fees','open','high','11ce0003-0003-4003-a003-000000000003','kenya')
on conflict (id) do nothing;

insert into support_messages (id, ticket_id, sender_type, content, market) values
  ('ee11ce06-1111-4111-a006-000000000001','dd11ce06-1111-4111-a006-000000000001','user','Please send me the steps to close my account and a final statement. I have moved most of my money to Equity already.','kenya'),
  ('ee11ce04-1111-4111-a004-000000000001','dd11ce04-1111-4111-a004-000000000001','user','Cash is tight before my supplier payments clear. Do you offer an overdraft or invoice financing for the business?','kenya'),
  ('ee11ce05-1111-4111-a005-000000000001','dd11ce05-1111-4111-a005-000000000001','user','I have a large balance just sitting there. A friend at another bank is getting much better returns — what can you offer?','kenya'),
  ('ee11ce07-1111-4111-a007-000000000001','dd11ce07-1111-4111-a007-000000000001','user','I send money home from the UK every month. What is the smartest way to grow it instead of leaving it idle?','kenya'),
  ('ee11ce18-1111-4111-a018-000000000001','dd11ce18-1111-4111-a018-000000000001','user','These new charges are too much for the little I keep here. I am thinking of leaving.','kenya')
on conflict (id) do nothing;

-- =====================================================================
-- Done (banking). Verify with:
--   select full_name, segment from profiles where assigned_rm_id = '11ce0003-0003-4003-a003-000000000003' order by full_name;
-- =====================================================================
