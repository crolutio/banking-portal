-- =====================================================================
-- Kenya RM book — DEPTH PASS (banking DB)
-- ---------------------------------------------------------------------
-- Fixes the three things that made the stories feel thin/broken:
--   A. REPAIR the two hero profiles. Pre-existing May-23 profiles
--      ("Grace Wanjiku" @04, "Njeri Otieno" @05) blocked the seed's
--      `ON CONFLICT (id) DO NOTHING`, so the *customers* rows became
--      Joseph Karanja / Aisha Mohamed but the *profiles* kept the wrong
--      names, no segment, and NO RM assignment — which is why the SME
--      and HNW heroes never appeared in the workspace. We overwrite them.
--   B. BACKDATE tenure so nobody reads "Client since 8 June 2026".
--   C. CARDS for every client that had none (only 01/02 did).
--   D. A few SECOND ACCOUNTS so thin retail clients aren't single-account.
--   E. SUPPORT TICKETS (there were zero) so each 360 has real open work,
--      aligned to docs/kenya-personas.md.
--
-- Safe to re-run: section A/B are UPDATEs; C–E are INSERT … ON CONFLICT
-- (id) DO NOTHING. Every row sets market='kenya'.
-- =====================================================================

-- ---------------------------------------------------------------------
-- A. Repair the hero profiles (04 Joseph Karanja, 05 Aisha Mohamed)
-- ---------------------------------------------------------------------
update profiles set
  full_name      = 'Joseph Karanja',
  segment        = 'Premium',
  kyc_status     = 'Verified',
  assigned_rm_id = '11ce0003-0003-4003-a003-000000000003',
  phone          = coalesce(phone, '+254722114004'),
  avatar_url     = coalesce(avatar_url, '/placeholder.svg?height=40&width=40'),
  market         = 'kenya'
where id = '11ce0004-0004-4004-a004-000000000004';

update profiles set
  full_name      = 'Aisha Mohamed',
  segment        = 'VIP',
  kyc_status     = 'Verified',
  assigned_rm_id = '11ce0003-0003-4003-a003-000000000003',
  phone          = coalesce(phone, '+254733115005'),
  avatar_url     = coalesce(avatar_url, '/placeholder.svg?height=40&width=40'),
  market         = 'kenya'
where id = '11ce0005-0005-4005-a005-000000000005';

-- Keep the customers rows' names in lockstep (already correct, but make sure).
update customers set name = 'Joseph Karanja' where id = '11ce0004-0004-4004-a004-000000000004';
update customers set name = 'Aisha Mohamed'  where id = '11ce0005-0005-4005-a005-000000000005';

-- ---------------------------------------------------------------------
-- B. Backdate tenure (profiles + customers + accounts; loans → disbursement)
-- ---------------------------------------------------------------------
with tenure(cid, joined) as (values
  ('11ce0001-0001-4001-a001-000000000001','2017-04-10'::timestamptz), -- Wanjiru Kamau
  ('11ce0002-0002-4002-a002-000000000002','2015-08-22'::timestamptz), -- Otieno Ouma
  ('11ce0004-0004-4004-a004-000000000004','2016-06-15'::timestamptz), -- Joseph Karanja (SME)
  ('11ce0005-0005-4005-a005-000000000005','2012-02-09'::timestamptz), -- Aisha Mohamed (HNW)
  ('11ce0006-0006-4006-a006-000000000006','2017-01-20'::timestamptz), -- David Kimani (~9 yrs)
  ('11ce0007-0007-4007-a007-000000000007','2019-09-03'::timestamptz), -- Grace Achieng
  ('11ce0008-0008-4008-a008-000000000008','2018-05-12'::timestamptz), -- Mary Wanjiku
  ('11ce0009-0009-4009-a009-000000000009','2025-02-18'::timestamptz), -- Samuel Kiprop (recent)
  ('11ce0010-0010-4010-a010-000000000010','2020-07-30'::timestamptz), -- Faith Chebet
  ('11ce0011-0011-4011-a011-000000000011','2014-11-05'::timestamptz), -- Daniel Mwangi
  ('11ce0012-0012-4012-a012-000000000012','2019-03-25'::timestamptz), -- Esther Nyambura
  ('11ce0013-0013-4013-a013-000000000013','2021-10-14'::timestamptz), -- Peter Omondi
  ('11ce0014-0014-4014-a014-000000000014','2016-02-19'::timestamptz), -- Lucy Wairimu
  ('11ce0015-0015-4015-a015-000000000015','2022-06-08'::timestamptz), -- John Maina (dormant)
  ('11ce0016-0016-4016-a016-000000000016','2018-09-17'::timestamptz), -- Cynthia Adhiambo
  ('11ce0017-0017-4017-a017-000000000017','2022-01-11'::timestamptz), -- Brian Mutua
  ('11ce0018-0018-4018-a018-000000000018','2023-04-26'::timestamptz)  -- Catherine Njoki
)
update profiles p set created_at = t.joined from tenure t where p.id = t.cid::uuid;

with tenure(cid, joined) as (values
  ('11ce0001-0001-4001-a001-000000000001','2017-04-10'::timestamptz),
  ('11ce0002-0002-4002-a002-000000000002','2015-08-22'::timestamptz),
  ('11ce0004-0004-4004-a004-000000000004','2016-06-15'::timestamptz),
  ('11ce0005-0005-4005-a005-000000000005','2012-02-09'::timestamptz),
  ('11ce0006-0006-4006-a006-000000000006','2017-01-20'::timestamptz),
  ('11ce0007-0007-4007-a007-000000000007','2019-09-03'::timestamptz),
  ('11ce0008-0008-4008-a008-000000000008','2018-05-12'::timestamptz),
  ('11ce0009-0009-4009-a009-000000000009','2025-02-18'::timestamptz),
  ('11ce0010-0010-4010-a010-000000000010','2020-07-30'::timestamptz),
  ('11ce0011-0011-4011-a011-000000000011','2014-11-05'::timestamptz),
  ('11ce0012-0012-4012-a012-000000000012','2019-03-25'::timestamptz),
  ('11ce0013-0013-4013-a013-000000000013','2021-10-14'::timestamptz),
  ('11ce0014-0014-4014-a014-000000000014','2016-02-19'::timestamptz),
  ('11ce0015-0015-4015-a015-000000000015','2022-06-08'::timestamptz),
  ('11ce0016-0016-4016-a016-000000000016','2018-09-17'::timestamptz),
  ('11ce0017-0017-4017-a017-000000000017','2022-01-11'::timestamptz),
  ('11ce0018-0018-4018-a018-000000000018','2023-04-26'::timestamptz)
)
update customers c set created_at = t.joined from tenure t where c.id = t.cid::uuid;

-- Accounts opened when the client joined (secondary wallets share the date;
-- the three NEW accounts added in section D set their own later dates).
with tenure(cid, joined) as (values
  ('11ce0001-0001-4001-a001-000000000001','2017-04-10'::timestamptz),
  ('11ce0002-0002-4002-a002-000000000002','2015-08-22'::timestamptz),
  ('11ce0004-0004-4004-a004-000000000004','2016-06-15'::timestamptz),
  ('11ce0005-0005-4005-a005-000000000005','2012-02-09'::timestamptz),
  ('11ce0006-0006-4006-a006-000000000006','2017-01-20'::timestamptz),
  ('11ce0007-0007-4007-a007-000000000007','2019-09-03'::timestamptz),
  ('11ce0008-0008-4008-a008-000000000008','2018-05-12'::timestamptz),
  ('11ce0009-0009-4009-a009-000000000009','2025-02-18'::timestamptz),
  ('11ce0010-0010-4010-a010-000000000010','2020-07-30'::timestamptz),
  ('11ce0011-0011-4011-a011-000000000011','2014-11-05'::timestamptz),
  ('11ce0012-0012-4012-a012-000000000012','2019-03-25'::timestamptz),
  ('11ce0013-0013-4013-a013-000000000013','2021-10-14'::timestamptz),
  ('11ce0014-0014-4014-a014-000000000014','2016-02-19'::timestamptz),
  ('11ce0015-0015-4015-a015-000000000015','2022-06-08'::timestamptz),
  ('11ce0016-0016-4016-a016-000000000016','2018-09-17'::timestamptz),
  ('11ce0017-0017-4017-a017-000000000017','2022-01-11'::timestamptz),
  ('11ce0018-0018-4018-a018-000000000018','2023-04-26'::timestamptz)
)
update accounts a set created_at = t.joined from tenure t where a.customer_id = t.cid::uuid;

update loans set created_at = disbursement_date::timestamptz
where customer_id::text like '11ce00%' and disbursement_date is not null;

-- Targeted story fix: Faith Chebet's personal-loan repayment bounced (NSF) —
-- mark it delinquent so the hardship story is real on her 360 and she scores
-- on the Retention radar (delinquent loan = +15).
update loans set status = 'delinquent', next_payment_date = (now() - interval '12 days')::date
where customer_id = '11ce0010-0010-4010-a010-000000000010';

-- ---------------------------------------------------------------------
-- D. Second accounts for thin retail clients (depth). Done BEFORE cards
--    so the new accounts can carry a card if needed.
--    account_number scheme: 02NN000X (NN = persona number).
-- ---------------------------------------------------------------------
insert into accounts (id, customer_id, name, type, currency, balance, available_balance, account_number, status, market, created_at)
values
  ('aa11ce08-2222-4222-a008-000000000008','11ce0008-0008-4008-a008-000000000008',
   'Master''s Fund (UK)', 'savings', 'KES', 480000, 480000, '02080002', 'active', 'kenya', '2023-02-01'),
  ('aa11ce17-2222-4222-a017-000000000017','11ce0017-0017-4017-a017-000000000017',
   'Car Deposit Goal', 'savings', 'KES', 220000, 220000, '02170002', 'active', 'kenya', '2024-08-01'),
  ('aa11ce09-2222-4222-a009-000000000009','11ce0009-0009-4009-a009-000000000009',
   'Money Market Starter', 'savings', 'KES', 35000, 35000, '02090002', 'active', 'kenya', '2025-03-01')
on conflict (id) do nothing;

-- A few contributions so the new savings accounts aren't empty shells.
insert into transactions (id, account_id, date, description, merchant, category, amount, balance_after, type, status, market)
select v.id, a.id, v.dt, v.descr, v.merchant, v.cat::transaction_category, v.amount, v.bal_after, v.ttype::transaction_type, 'completed', 'kenya'
from (values
  ('ff11ce08-9001-4901-a008-000000000001'::uuid,'02080002','2025-12-01'::timestamptz,'Standing order — Master''s fund','Self transfer','transfer',40000,360000,'credit'),
  ('ff11ce08-9002-4901-a008-000000000002'::uuid,'02080002','2026-01-01'::timestamptz,'Standing order — Master''s fund','Self transfer','transfer',40000,400000,'credit'),
  ('ff11ce08-9003-4901-a008-000000000003'::uuid,'02080002','2026-02-01'::timestamptz,'Standing order — Master''s fund','Self transfer','transfer',40000,440000,'credit'),
  ('ff11ce17-9001-4901-a017-000000000001'::uuid,'02170002','2026-03-15'::timestamptz,'Car deposit top-up','Self transfer','transfer',50000,170000,'credit'),
  ('ff11ce17-9002-4901-a017-000000000002'::uuid,'02170002','2026-05-15'::timestamptz,'Car deposit top-up','Self transfer','transfer',50000,220000,'credit'),
  ('ff11ce09-9001-4901-a009-000000000001'::uuid,'02090002','2026-04-02'::timestamptz,'Initial MMF placement','Self transfer','investment',35000,35000,'credit')
) as v(id, acct_no, dt, descr, merchant, cat, amount, bal_after, ttype)
join accounts a on a.account_number = v.acct_no
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- C. Cards — every client 04–18 gets a debit card; wealthier / business
--    clients also get a credit card. (01/02 already have both.)
--    card id scheme: cc11ceNN-1111 (debit) / -2222 (credit).
--    account_id resolved from the (UNIQUE) account_number.
-- ---------------------------------------------------------------------
insert into cards (id, customer_id, account_id, type, brand, last_four, expiry_date, status,
                   credit_limit, spent_amount, cardholder_name, pin_set, contactless_enabled,
                   online_enabled, atm_limit, pos_limit, market)
select v.id, v.customer_id, a.id, v.ctype::card_type, v.brand::card_brand, v.last_four, v.expiry,
       v.status::card_status, v.credit_limit, v.spent, v.holder, true, true, true, v.atm, v.pos, 'kenya'
from (values
  -- debit cards (one per client on their primary account)
  ('cc11ce04-1111-4111-a004-000000000004'::uuid,'11ce0004-0004-4004-a004-000000000004'::uuid,'02040001','debit','Visa','4204','08/28','active',null::numeric,0::numeric,'JOSEPH KARANJA',100000::numeric,500000::numeric),
  ('cc11ce05-1111-4111-a005-000000000005'::uuid,'11ce0005-0005-4005-a005-000000000005'::uuid,'02050001','debit','Visa','4205','03/29','active',null,0,'AISHA MOHAMED',200000,1000000),
  ('cc11ce06-1111-4111-a006-000000000006'::uuid,'11ce0006-0006-4006-a006-000000000006'::uuid,'02060001','debit','Visa','4206','11/27','active',null,0,'DAVID KIMANI',60000,200000),
  ('cc11ce07-1111-4111-a007-000000000007'::uuid,'11ce0007-0007-4007-a007-000000000007'::uuid,'02070001','debit','Visa','4207','05/28','active',null,0,'GRACE ACHIENG',80000,300000),
  ('cc11ce08-1111-4111-a008-000000000008'::uuid,'11ce0008-0008-4008-a008-000000000008'::uuid,'02080001','debit','Visa','4208','02/29','active',null,0,'MARY WANJIKU',60000,250000),
  ('cc11ce09-1111-4111-a009-000000000009'::uuid,'11ce0009-0009-4009-a009-000000000009'::uuid,'02090001','debit','Visa','4209','09/28','active',null,0,'SAMUEL KIPROP',40000,150000),
  ('cc11ce10-1111-4111-a010-000000000010'::uuid,'11ce0010-0010-4010-a010-000000000010'::uuid,'02100001','debit','Visa','4210','07/27','active',null,0,'FAITH CHEBET',40000,120000),
  ('cc11ce11-1111-4111-a011-000000000011'::uuid,'11ce0011-0011-4011-a011-000000000011'::uuid,'02110001','debit','Visa','4211','04/29','active',null,0,'DANIEL MWANGI',150000,600000),
  ('cc11ce12-1111-4111-a012-000000000012'::uuid,'11ce0012-0012-4012-a012-000000000012'::uuid,'02120001','debit','Mastercard','4212','03/28','active',null,0,'ESTHER NYAMBURA',80000,400000),
  ('cc11ce13-1111-4111-a013-000000000013'::uuid,'11ce0013-0013-4013-a013-000000000013'::uuid,'02130001','debit','Visa','4213','10/27','active',null,0,'PETER OMONDI',50000,150000),
  ('cc11ce14-1111-4111-a014-000000000014'::uuid,'11ce0014-0014-4014-a014-000000000014'::uuid,'02140001','debit','Visa','4214','02/29','active',null,0,'LUCY WAIRIMU',120000,500000),
  ('cc11ce15-1111-4111-a015-000000000015'::uuid,'11ce0015-0015-4015-a015-000000000015'::uuid,'02150001','debit','Visa','4215','06/28','active',null,0,'JOHN MAINA',40000,100000),
  ('cc11ce16-1111-4111-a016-000000000016'::uuid,'11ce0016-0016-4016-a016-000000000016'::uuid,'02160001','debit','Mastercard','4216','09/28','active',null,0,'CYNTHIA ADHIAMBO',100000,500000),
  ('cc11ce17-1111-4111-a017-000000000017'::uuid,'11ce0017-0017-4017-a017-000000000017'::uuid,'02170001','debit','Visa','4217','01/29','active',null,0,'BRIAN MUTUA',50000,200000),
  ('cc11ce18-1111-4111-a018-000000000018'::uuid,'11ce0018-0018-4018-a018-000000000018'::uuid,'02180001','debit','Visa','4218','04/28','active',null,0,'CATHERINE NJOKI',30000,80000),
  -- credit cards (HNW / SME / heavy travel)
  ('cc11ce04-2222-4222-a004-000000000004'::uuid,'11ce0004-0004-4004-a004-000000000004'::uuid,'02040001','credit','Visa','9204','08/28','active',1500000,420000,'JOSEPH KARANJA',100000,500000),
  ('cc11ce05-2222-4222-a005-000000000005'::uuid,'11ce0005-0005-4005-a005-000000000005'::uuid,'02050001','credit','Visa','9205','03/29','active',3000000,180000,'AISHA MOHAMED',200000,1000000),
  ('cc11ce07-2222-4222-a007-000000000007'::uuid,'11ce0007-0007-4007-a007-000000000007'::uuid,'02070001','credit','Visa','9207','05/28','active',800000,95000,'GRACE ACHIENG',80000,300000),
  ('cc11ce08-2222-4222-a008-000000000008'::uuid,'11ce0008-0008-4008-a008-000000000008'::uuid,'02080001','credit','Visa','9208','02/29','active',500000,140000,'MARY WANJIKU',60000,250000),
  ('cc11ce11-2222-4222-a011-000000000011'::uuid,'11ce0011-0011-4011-a011-000000000011'::uuid,'02110001','credit','Visa','9211','04/29','active',1200000,160000,'DANIEL MWANGI',150000,600000),
  ('cc11ce12-2222-4222-a012-000000000012'::uuid,'11ce0012-0012-4012-a012-000000000012'::uuid,'02120001','credit','Mastercard','9212','03/28','active',1000000,310000,'ESTHER NYAMBURA',80000,400000),
  ('cc11ce14-2222-4222-a014-000000000014'::uuid,'11ce0014-0014-4014-a014-000000000014'::uuid,'02140001','credit','Visa','9214','02/29','active',1500000,520000,'LUCY WAIRIMU',120000,500000),
  ('cc11ce16-2222-4222-a016-000000000016'::uuid,'11ce0016-0016-4016-a016-000000000016'::uuid,'02160001','credit','Mastercard','9216','09/28','active',2000000,610000,'CYNTHIA ADHIAMBO',100000,500000)
) as v(id, customer_id, acct_no, ctype, brand, last_four, expiry, status, credit_limit, spent, holder, atm, pos)
join accounts a on a.account_number = v.acct_no
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- E. Support tickets (there were ZERO) — one current request per persona,
--    aligned to docs/kenya-personas.md. user_id → profiles(id); the RM
--    (…0003) is assigned. Subjects for churn cases include keywords the
--    Retention radar reads ("close", "charges too", "moving").
--    ticket id: dd11ceNN-7777 ; message id: dd11ceNN-8888 / -8889.
-- ---------------------------------------------------------------------
insert into support_tickets (id, user_id, subject, status, priority, assigned_to, market, created_at)
values
  ('dd11ce02-7777-4702-a702-000000000002','11ce0002-0002-4002-a002-000000000002','Cheque clearing delayed beyond value date','in_progress','medium','11ce0003-0003-4003-a003-000000000003','kenya', now() - interval '4 days'),
  ('dd11ce04-7777-4704-a704-000000000004','11ce0004-0004-4004-a004-000000000004','Overdraft facility enquiry to bridge supplier payments','open','high','11ce0003-0003-4003-a003-000000000003','kenya', now() - interval '2 days'),
  ('dd11ce05-7777-4705-a705-000000000005','11ce0005-0005-4005-a005-000000000005','Request for better returns on idle savings','open','medium','11ce0003-0003-4003-a003-000000000003','kenya', now() - interval '6 days'),
  ('dd11ce06-7777-4706-a706-000000000006','11ce0006-0006-4006-a006-000000000006','Request to close account by month-end','open','high','11ce0003-0003-4003-a003-000000000003','kenya', now() - interval '3 days'),
  ('dd11ce08-7777-4708-a708-000000000008','11ce0008-0008-4008-a008-000000000008','Card declined overseas — travel card request','open','low','11ce0003-0003-4003-a003-000000000003','kenya', now() - interval '8 days'),
  ('dd11ce09-7777-4709-a709-000000000009','11ce0009-0009-4009-a009-000000000009','Complete KYC verification to unlock investing','open','medium','11ce0003-0003-4003-a003-000000000003','kenya', now() - interval '5 days'),
  ('dd11ce10-7777-4710-a710-000000000010','11ce0010-0010-4010-a010-000000000010','Loan repayment hardship — restructure request','open','high','11ce0003-0003-4003-a003-000000000003','kenya', now() - interval '1 day'),
  ('dd11ce11-7777-4711-a711-000000000011','11ce0011-0011-4011-a011-000000000011','Mortgage pre-qualification enquiry','open','medium','11ce0003-0003-4003-a003-000000000003','kenya', now() - interval '7 days'),
  ('dd11ce12-7777-4712-a712-000000000012','11ce0012-0012-4012-a012-000000000012','Financing enquiry for a second shop','open','medium','11ce0003-0003-4003-a003-000000000003','kenya', now() - interval '9 days'),
  ('dd11ce13-7777-4713-a713-000000000013','11ce0013-0013-4013-a013-000000000013','Card declined in Kampala on assignment','open','medium','11ce0003-0003-4003-a003-000000000003','kenya', now() - interval '6 days'),
  ('dd11ce14-7777-4714-a714-000000000014','11ce0014-0014-4014-a014-000000000014','40-minute branch wait — request a dedicated contact','open','medium','11ce0003-0003-4003-a003-000000000003','kenya', now() - interval '5 days'),
  ('dd11ce16-7777-4716-a716-000000000016','11ce0016-0016-4016-a016-000000000016','Asset finance enquiry for two more trucks','open','medium','11ce0003-0003-4003-a003-000000000003','kenya', now() - interval '4 days'),
  ('dd11ce17-7777-4717-a717-000000000017','11ce0017-0017-4017-a017-000000000017','Auto-loan eligibility enquiry','open','low','11ce0003-0003-4003-a003-000000000003','kenya', now() - interval '10 days'),
  ('dd11ce18-7777-4718-a718-000000000018','11ce0018-0018-4018-a018-000000000018','Monthly charges too high — threatening to close and move banks','open','high','11ce0003-0003-4003-a003-000000000003','kenya', now() - interval '2 days')
on conflict (id) do nothing;

-- First (customer) message on each ticket; sender_type='user' (NOT 'customer').
insert into support_messages (id, ticket_id, sender_type, sender_id, content, market, created_at)
values
  ('dd11ce02-8888-4802-a802-000000000002','dd11ce02-7777-4702-a702-000000000002','user','11ce0002-0002-4002-a002-000000000002','My supplier cheque still hasn''t cleared and it''s past the value date. This is holding up a payment I need to make today.','kenya', now() - interval '4 days'),
  ('dd11ce04-8888-4804-a804-000000000004','dd11ce04-7777-4704-a704-000000000004','user','11ce0004-0004-4004-a004-000000000004','I''ve just paid Bamburi for cement but my customers settle in 30 days. Can we look at a short overdraft to bridge the gap?','kenya', now() - interval '2 days'),
  ('dd11ce05-8888-4805-a805-000000000005','dd11ce05-7777-4705-a705-000000000005','user','11ce0005-0005-4005-a005-000000000005','A private bank is offering me far better returns on my savings. What can you do before I move the funds?','kenya', now() - interval '6 days'),
  ('dd11ce06-8888-4806-a806-000000000006','dd11ce06-7777-4706-a706-000000000006','user','11ce0006-0006-4006-a006-000000000006','I''ve moved most of my money to Equity and I want to close this account by month-end. Unless someone senior calls me this is final.','kenya', now() - interval '3 days'),
  ('dd11ce08-8888-4808-a808-000000000008','dd11ce08-7777-4708-a708-000000000008','user','11ce0008-0008-4008-a008-000000000008','My card was declined again on a London layover. I travel constantly for work — I need a card that just works abroad.','kenya', now() - interval '8 days'),
  ('dd11ce09-8888-4809-a809-000000000009','dd11ce09-7777-4709-a709-000000000009','user','11ce0009-0009-4009-a009-000000000009','I want to finish my KYC so I can start a small money-market investment. What documents do you need?','kenya', now() - interval '5 days'),
  ('dd11ce10-8888-4810-a810-000000000010','dd11ce10-7777-4710-a710-000000000010','user','11ce0010-0010-4010-a010-000000000010','I lost my job last month and my loan repayment bounced. I''m worried about a CRB listing — can we restructure before this gets worse?','kenya', now() - interval '1 day'),
  ('dd11ce11-8888-4811-a811-000000000011','dd11ce11-7777-4711-a711-000000000011','user','11ce0011-0011-4011-a011-000000000011','I''m looking at a townhouse in Karen around 22M. Can you pre-qualify me for a mortgage and advise on my idle savings?','kenya', now() - interval '7 days'),
  ('dd11ce12-8888-4812-a812-000000000012','dd11ce12-7777-4712-a712-000000000012','user','11ce0012-0012-4012-a012-000000000012','Mama Esther Groceries is doing well and I want to open a second shop. Can we discuss financing against my till settlements?','kenya', now() - interval '9 days'),
  ('dd11ce13-8888-4813-a813-000000000013','dd11ce13-7777-4713-a713-000000000013','user','11ce0013-0013-4013-a013-000000000013','My card was declined in Kampala while I was on an assignment. I need something reliable for travel.','kenya', now() - interval '6 days'),
  ('dd11ce14-8888-4814-a814-000000000014','dd11ce14-7777-4714-a714-000000000014','user','11ce0014-0014-4014-a014-000000000014','I waited 40 minutes in the branch again. Can I have a dedicated contact instead of queuing every time?','kenya', now() - interval '5 days'),
  ('dd11ce16-8888-4816-a816-000000000016','dd11ce16-7777-4716-a716-000000000016','user','11ce0016-0016-4016-a016-000000000016','Adhiambo Logistics just won a new haulage contract. I need two more trucks — can we arrange asset finance?','kenya', now() - interval '4 days'),
  ('dd11ce17-8888-4817-a817-000000000017','dd11ce17-7777-4717-a717-000000000017','user','11ce0017-0017-4017-a017-000000000017','I''ve been saving for a car deposit. Could you tell me what I''d qualify for on an auto loan?','kenya', now() - interval '10 days'),
  ('dd11ce18-8888-4818-a818-000000000018','dd11ce18-7777-4718-a718-000000000018','user','11ce0018-0018-4018-a018-000000000018','These monthly charges are too high for what I earn driving Uber. A friend has a no-fee account — match it or I''m moving my account.','kenya', now() - interval '2 days')
on conflict (id) do nothing;

-- A first response on the three headline retention cases (sender_type='agent' = the RM).
insert into support_messages (id, ticket_id, sender_type, sender_id, content, market, created_at)
values
  ('dd11ce06-8889-4806-a806-000000000006','dd11ce06-7777-4706-a706-000000000006','agent','11ce0003-0003-4003-a003-000000000003','David, I''m sorry it''s reached this point — I''d like to call you personally today before you decide. Can I reach you this afternoon?','kenya', now() - interval '2 days'),
  ('dd11ce10-8889-4810-a810-000000000010','dd11ce10-7777-4710-a710-000000000010','agent','11ce0003-0003-4003-a003-000000000003','Faith, thank you for flagging this early — we have hardship options that protect your CRB status. Let''s set up a restructure this week.','kenya', now() - interval '20 hours'),
  ('dd11ce18-8889-4818-a818-000000000018','dd11ce18-7777-4718-a718-000000000018','agent','11ce0003-0003-4003-a003-000000000003','Catherine, I hear you on the fees. There''s a lighter product that fits your payout pattern, and I can reverse this month''s charge as a goodwill gesture.','kenya', now() - interval '1 day')
on conflict (id) do nothing;

-- =====================================================================
-- Verify (read-backs):
--   select full_name, segment, kyc_status, created_at::date "since"
--   from profiles where assigned_rm_id = '11ce0003-0003-4003-a003-000000000003'
--   order by created_at;
--   -- expect 17 clients incl. Joseph Karanja & Aisha Mohamed, none dated 2026-06-08.
--
--   select c.name, count(distinct ca.id) cards, count(distinct t.id) tickets
--   from customers c
--   left join cards ca on ca.customer_id = c.id
--   left join support_tickets t on t.user_id = c.id
--   where c.id::text like '11ce00%' group by c.name order by c.name;
-- =====================================================================
