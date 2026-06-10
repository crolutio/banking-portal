-- =====================================================================
-- Kenya RM book — FOCUS EXPANSION (banking DB)
-- ---------------------------------------------------------------------
-- Adds 10 new clients (NN 19–28) so EACH Focus setting surfaces a clearly
-- different, varied set on the Today / Clients / Retention surfaces:
--   • Dormant   : 19 Ann Wambui, 20 Kevin Ochieng, 21 Margaret Njeri, 22 Stephen Kariuki
--   • SME       : 23 Lillian Wairimu (salon chain), 24 Patrick Omondi (exporter)
--   • HNW       : 25 Dr. Susan Mwende (surgeon), 26 James Githinji (business-sale liquidity)
--   • Churn     : 27 Mercy Akinyi (digital-experience), 28 Robert Mwangi (service dispute)
-- Each has a DISTINCT story even within the same bucket. All assigned to
-- the Kenya RM (…0003). Companion: seed_kenya_focus_expansion_callcenter.sql.
--
-- Dormancy rule the app uses (use-portfolio.ts): no open tickets, no
-- is_unusual txns, churn<20, <=1 account, balance<150k. So the four dormant
-- clients deliberately have ONE thin account, OLD last activity, and NO
-- ticket / unusual txn / negative call.
--
-- UUID schemes (NN = 19..28): profile/customer 11ce00NN-..; account
-- aa11ceNN-000X-..; card cc11ceNN-1111/2222-..; loan 10a11cNN-..; txn
-- ff11ceNN-000X-..; ticket dd11ceNN-7777-..; ticket msg dd11ceNN-8888-..
-- FK order: profiles → customers → accounts → cards → loans → transactions
--           → support_tickets → support_messages. Idempotent (ON CONFLICT DO NOTHING).
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. profiles
-- ---------------------------------------------------------------------
insert into profiles (id, email, full_name, role, avatar_url, phone, segment, kyc_status, assigned_rm_id, market, created_at)
values
  ('11ce0019-0019-4019-a019-000000000019','ann.wambui@example.co.ke','Ann Wambui','retail_customer','/placeholder.svg?height=40&width=40','+254700000019','Standard','Verified','11ce0003-0003-4003-a003-000000000003','kenya','2019-03-11'),
  ('11ce0020-0020-4020-a020-000000000020','kevin.ochieng@example.co.ke','Kevin Ochieng','retail_customer','/placeholder.svg?height=40&width=40','+254700000020','Standard','Verified','11ce0003-0003-4003-a003-000000000003','kenya','2021-07-22'),
  ('11ce0021-0021-4021-a021-000000000021','margaret.njeri@example.co.ke','Margaret Njeri','retail_customer','/placeholder.svg?height=40&width=40','+254700000021','Standard','Verified','11ce0003-0003-4003-a003-000000000003','kenya','2018-10-05'),
  ('11ce0022-0022-4022-a022-000000000022','stephen.kariuki@example.co.ke','Stephen Kariuki','retail_customer','/placeholder.svg?height=40&width=40','+254700000022','Standard','Verified','11ce0003-0003-4003-a003-000000000003','kenya','2017-06-18'),
  ('11ce0023-0023-4023-a023-000000000023','lillian.wairimu@example.co.ke','Lillian Wairimu','retail_customer','/placeholder.svg?height=40&width=40','+254700000023','Premium','Verified','11ce0003-0003-4003-a003-000000000003','kenya','2018-02-14'),
  ('11ce0024-0024-4024-a024-000000000024','patrick.omondi@example.co.ke','Patrick Omondi','retail_customer','/placeholder.svg?height=40&width=40','+254700000024','Premium','Verified','11ce0003-0003-4003-a003-000000000003','kenya','2016-09-30'),
  ('11ce0025-0025-4025-a025-000000000025','susan.mwende@example.co.ke','Susan Mwende','retail_customer','/placeholder.svg?height=40&width=40','+254700000025','VIP','Verified','11ce0003-0003-4003-a003-000000000003','kenya','2015-05-20'),
  ('11ce0026-0026-4026-a026-000000000026','james.githinji@example.co.ke','James Githinji','retail_customer','/placeholder.svg?height=40&width=40','+254700000026','VIP','Verified','11ce0003-0003-4003-a003-000000000003','kenya','2014-03-08'),
  ('11ce0027-0027-4027-a027-000000000027','mercy.akinyi@example.co.ke','Mercy Akinyi','retail_customer','/placeholder.svg?height=40&width=40','+254700000027','At Risk','Verified','11ce0003-0003-4003-a003-000000000003','kenya','2020-11-12'),
  ('11ce0028-0028-4028-a028-000000000028','robert.mwangi@example.co.ke','Robert Mwangi','retail_customer','/placeholder.svg?height=40&width=40','+254700000028','Standard','Verified','11ce0003-0003-4003-a003-000000000003','kenya','2019-04-19')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- 2. customers (FK target for accounts/cards/loans)
-- ---------------------------------------------------------------------
insert into customers (id, name, email, phone, preferred_language, tier, preferred_channel, market, created_at)
values
  ('11ce0019-0019-4019-a019-000000000019','Ann Wambui','ann.wambui@example.co.ke','+254700000019','English','standard','app','kenya','2019-03-11'),
  ('11ce0020-0020-4020-a020-000000000020','Kevin Ochieng','kevin.ochieng@example.co.ke','+254700000020','English','standard','app','kenya','2021-07-22'),
  ('11ce0021-0021-4021-a021-000000000021','Margaret Njeri','margaret.njeri@example.co.ke','+254700000021','English','standard','app','kenya','2018-10-05'),
  ('11ce0022-0022-4022-a022-000000000022','Stephen Kariuki','stephen.kariuki@example.co.ke','+254700000022','English','standard','sms','kenya','2017-06-18'),
  ('11ce0023-0023-4023-a023-000000000023','Lillian Wairimu','lillian.wairimu@example.co.ke','+254700000023','English','premium','whatsapp','kenya','2018-02-14'),
  ('11ce0024-0024-4024-a024-000000000024','Patrick Omondi','patrick.omondi@example.co.ke','+254700000024','English','premium','email','kenya','2016-09-30'),
  ('11ce0025-0025-4025-a025-000000000025','Susan Mwende','susan.mwende@example.co.ke','+254700000025','English','premium','email','kenya','2015-05-20'),
  ('11ce0026-0026-4026-a026-000000000026','James Githinji','james.githinji@example.co.ke','+254700000026','English','premium','email','kenya','2014-03-08'),
  ('11ce0027-0027-4027-a027-000000000027','Mercy Akinyi','mercy.akinyi@example.co.ke','+254700000027','English','standard','app','kenya','2020-11-12'),
  ('11ce0028-0028-4028-a028-000000000028','Robert Mwangi','robert.mwangi@example.co.ke','+254700000028','English','standard','app','kenya','2019-04-19')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- 3. accounts  (dormant clients get exactly ONE thin account)
-- ---------------------------------------------------------------------
insert into accounts (id, customer_id, name, type, currency, balance, available_balance, account_number, status, market, created_at)
values
  -- dormant
  ('aa11ce19-0001-4001-a019-000000000019','11ce0019-0019-4019-a019-000000000019','Personal Current Account','current','KES',42000,42000,'02190001','active','kenya','2019-03-11'),
  ('aa11ce20-0001-4001-a020-000000000020','11ce0020-0020-4020-a020-000000000020','Personal Current Account','current','KES',18500,18500,'02200001','active','kenya','2021-07-22'),
  ('aa11ce21-0001-4001-a021-000000000021','11ce0021-0021-4021-a021-000000000021','Personal Current Account','current','KES',65000,65000,'02210001','active','kenya','2018-10-05'),
  ('aa11ce22-0001-4001-a022-000000000022','11ce0022-0022-4022-a022-000000000022','Personal Current Account','current','KES',88000,88000,'02220001','active','kenya','2017-06-18'),
  -- SME: Lillian (salon)
  ('aa11ce23-0001-4001-a023-000000000023','11ce0023-0023-4023-a023-000000000023','Glow Salon & Spa — Business','business','KES',760000,760000,'02230001','active','kenya','2018-02-14'),
  -- SME: Patrick (exporter) — business + USD trade wallet
  ('aa11ce24-0001-4001-a024-000000000024','11ce0024-0024-4024-a024-000000000024','Omondi Exports — Business Current','business','KES',1400000,1400000,'02240001','active','kenya','2016-09-30'),
  ('aa11ce24-0002-4002-a024-000000000024','11ce0024-0024-4024-a024-000000000024','Export Trade USD Account','fx_wallet','USD',60000,60000,'02240002','active','kenya','2018-01-15'),
  -- HNW: Susan (surgeon) — current + wealth savings
  ('aa11ce25-0001-4001-a025-000000000025','11ce0025-0025-4025-a025-000000000025','Personal Current Account','current','KES',3200000,3200000,'02250001','active','kenya','2015-05-20'),
  ('aa11ce25-0002-4002-a025-000000000025','11ce0025-0025-4025-a025-000000000025','Wealth Reserve Savings','savings','KES',5500000,5500000,'02250002','active','kenya','2016-02-01'),
  -- HNW: James (liquidity event) — proceeds parked in current
  ('aa11ce26-0001-4001-a026-000000000026','11ce0026-0026-4026-a026-000000000026','Personal Current Account','current','KES',12000000,12000000,'02260001','active','kenya','2014-03-08'),
  -- Churn: Mercy (digital experience)
  ('aa11ce27-0001-4001-a027-000000000027','11ce0027-0027-4027-a027-000000000027','Personal Current Account','current','KES',240000,240000,'02270001','active','kenya','2020-11-12'),
  -- Churn: Robert (service dispute)
  ('aa11ce28-0001-4001-a028-000000000028','11ce0028-0028-4028-a028-000000000028','Personal Current Account','current','KES',520000,520000,'02280001','active','kenya','2019-04-19')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- 4. cards (dormant get a single debit; SME/HNW get debit + credit)
-- ---------------------------------------------------------------------
insert into cards (id, customer_id, account_id, type, brand, last_four, expiry_date, status,
                   credit_limit, spent_amount, cardholder_name, atm_limit, pos_limit, market)
values
  ('cc11ce19-1111-4111-a019-000000000019','11ce0019-0019-4019-a019-000000000019','aa11ce19-0001-4001-a019-000000000019','debit','Visa','4419','05/27','active',null,0,'ANN WAMBUI',40000,100000,'kenya'),
  ('cc11ce20-1111-4111-a020-000000000020','11ce0020-0020-4020-a020-000000000020','aa11ce20-0001-4001-a020-000000000020','debit','Visa','4420','09/27','active',null,0,'KEVIN OCHIENG',30000,80000,'kenya'),
  ('cc11ce21-1111-4111-a021-000000000021','11ce0021-0021-4021-a021-000000000021','aa11ce21-0001-4001-a021-000000000021','debit','Visa','4421','03/28','active',null,0,'MARGARET NJERI',40000,100000,'kenya'),
  ('cc11ce22-1111-4111-a022-000000000022','11ce0022-0022-4022-a022-000000000022','aa11ce22-0001-4001-a022-000000000022','debit','Visa','4422','11/27','active',null,0,'STEPHEN KARIUKI',40000,100000,'kenya'),
  ('cc11ce23-1111-4111-a023-000000000023','11ce0023-0023-4023-a023-000000000023','aa11ce23-0001-4001-a023-000000000023','debit','Mastercard','4423','02/29','active',null,0,'LILLIAN WAIRIMU',100000,500000,'kenya'),
  ('cc11ce23-2222-4222-a023-000000000023','11ce0023-0023-4023-a023-000000000023','aa11ce23-0001-4001-a023-000000000023','credit','Mastercard','9423','02/29','active',900000,260000,'LILLIAN WAIRIMU',100000,500000,'kenya'),
  ('cc11ce24-1111-4111-a024-000000000024','11ce0024-0024-4024-a024-000000000024','aa11ce24-0001-4001-a024-000000000024','debit','Visa','4424','06/28','active',null,0,'PATRICK OMONDI',150000,600000,'kenya'),
  ('cc11ce24-2222-4222-a024-000000000024','11ce0024-0024-4024-a024-000000000024','aa11ce24-0001-4001-a024-000000000024','credit','Visa','9424','06/28','active',2000000,540000,'PATRICK OMONDI',150000,600000,'kenya'),
  ('cc11ce25-1111-4111-a025-000000000025','11ce0025-0025-4025-a025-000000000025','aa11ce25-0001-4001-a025-000000000025','debit','Visa','4425','04/29','active',null,0,'SUSAN MWENDE',200000,1000000,'kenya'),
  ('cc11ce25-2222-4222-a025-000000000025','11ce0025-0025-4025-a025-000000000025','aa11ce25-0001-4001-a025-000000000025','credit','Visa','9425','04/29','active',2500000,310000,'SUSAN MWENDE',200000,1000000,'kenya'),
  ('cc11ce26-1111-4111-a026-000000000026','11ce0026-0026-4026-a026-000000000026','aa11ce26-0001-4001-a026-000000000026','debit','Visa','4426','08/28','active',null,0,'JAMES GITHINJI',200000,1000000,'kenya'),
  ('cc11ce26-2222-4222-a026-000000000026','11ce0026-0026-4026-a026-000000000026','aa11ce26-0001-4001-a026-000000000026','credit','Visa','9426','08/28','active',3000000,120000,'JAMES GITHINJI',200000,1000000,'kenya'),
  ('cc11ce27-1111-4111-a027-000000000027','11ce0027-0027-4027-a027-000000000027','aa11ce27-0001-4001-a027-000000000027','debit','Visa','4427','12/27','active',null,0,'MERCY AKINYI',60000,200000,'kenya'),
  ('cc11ce28-1111-4111-a028-000000000028','11ce0028-0028-4028-a028-000000000028','aa11ce28-0001-4001-a028-000000000028','debit','Visa','4428','07/28','active',null,0,'ROBERT MWANGI',80000,300000,'kenya')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- 5. loans (SME clients only)
-- ---------------------------------------------------------------------
insert into loans (id, customer_id, type, principal_amount, remaining_balance, interest_rate, term_months, monthly_payment, next_payment_date, disbursement_date, status, market, created_at)
values
  ('10a11c23-0001-4001-a023-000000000023','11ce0023-0023-4023-a023-000000000023','business',1200000,640000,16.0,36,42200,(now()+interval '18 days')::date,'2024-03-10','active','kenya','2024-03-10'),
  ('10a11c24-0001-4001-a024-000000000024','11ce0024-0024-4024-a024-000000000024','lpo_discounting',6000000,3800000,15.0,24,289000,(now()+interval '9 days')::date,'2025-01-20','active','kenya','2025-01-20')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- 6. transactions
--    Dormant: a few OLD entries then silence (no is_unusual).
--    Churn (27/28): one is_unusual entry whose reason carries churn keywords.
-- ---------------------------------------------------------------------
insert into transactions (id, account_id, date, description, merchant, category, amount, balance_after, type, status, market, is_unusual, unusual_reason)
values
  -- 19 Ann Wambui (dormant; wedding fund completed, idle since 2024)
  ('ff11ce19-0001-4001-a019-000000000019','aa11ce19-0001-4001-a019-000000000019','2024-02-25','Salary — Kenyatta National Hospital','KNH','salary',92000,134000,'credit','completed','kenya',false,null),
  ('ff11ce19-0002-4001-a019-000000000019','aa11ce19-0001-4001-a019-000000000019','2024-03-02','Transfer to Wedding Committee','PesaLink','transfer',80000,54000,'debit','completed','kenya',false,null),
  ('ff11ce19-0003-4001-a019-000000000019','aa11ce19-0001-4001-a019-000000000019','2024-09-14','ATM withdrawal — Thika Road','KCB ATM','transport',12000,42000,'debit','completed','kenya',false,null),
  -- 20 Kevin Ochieng (dormant; graduated, salary now elsewhere)
  ('ff11ce20-0001-4001-a020-000000000020','aa11ce20-0001-4001-a020-000000000020','2024-11-05','HELB disbursement','HELB','transfer',26000,44500,'credit','completed','kenya',false,null),
  ('ff11ce20-0002-4001-a020-000000000020','aa11ce20-0001-4001-a020-000000000020','2024-11-20','Buy Goods — Naivas','Naivas','groceries',6000,38500,'debit','completed','kenya',false,null),
  ('ff11ce20-0003-4001-a020-000000000020','aa11ce20-0001-4001-a020-000000000020','2025-01-12','ATM withdrawal — Town','Equity ATM','transport',20000,18500,'debit','completed','kenya',false,null),
  -- 21 Margaret Njeri (dormant; moved daily banking to a fintech)
  ('ff11ce21-0001-4001-a021-000000000021','aa11ce21-0001-4001-a021-000000000021','2024-12-01','Salary — Tuskys Retail','Tuskys','salary',78000,143000,'credit','completed','kenya',false,null),
  ('ff11ce21-0002-4001-a021-000000000021','aa11ce21-0001-4001-a021-000000000021','2024-12-03','Transfer to mobile wallet','PesaLink','transfer',70000,73000,'debit','completed','kenya',false,null),
  ('ff11ce21-0003-4001-a021-000000000021','aa11ce21-0001-4001-a021-000000000021','2024-12-22','M-Pesa withdrawal','Safaricom','transport',8000,65000,'debit','completed','kenya',false,null),
  -- 22 Stephen Kariuki (dormant; seasonal — active only at harvest)
  ('ff11ce22-0001-4001-a022-000000000022','aa11ce22-0001-4001-a022-000000000022','2024-10-30','Tea bonus — KTDA','KTDA','salary',180000,250000,'credit','completed','kenya',false,null),
  ('ff11ce22-0002-4001-a022-000000000022','aa11ce22-0001-4001-a022-000000000022','2024-11-15','Agrovet supplies — fertiliser','Agrovet','shopping',95000,155000,'debit','completed','kenya',false,null),
  ('ff11ce22-0003-4001-a022-000000000022','aa11ce22-0001-4001-a022-000000000022','2024-12-10','School fees — term 1','PesaLink','transfer',67000,88000,'debit','completed','kenya',false,null),
  -- 23 Lillian Wairimu (SME salon; busy daily till)
  ('ff11ce23-0001-4001-a023-000000000023','aa11ce23-0001-4001-a023-000000000023','2026-06-06','Till settlement — Buy Goods','Glow Salon Till','transfer',58000,760000,'credit','completed','kenya',false,null),
  ('ff11ce23-0002-4001-a023-000000000023','aa11ce23-0001-4001-a023-000000000023','2026-06-04','Supplier — beauty products','Beauty Click Ltd','shopping',120000,702000,'debit','completed','kenya',false,null),
  ('ff11ce23-0003-4001-a023-000000000023','aa11ce23-0001-4001-a023-000000000023','2026-06-01','Shop rent — Westgate kiosk','Westgate','utilities',95000,822000,'debit','completed','kenya',false,null),
  ('ff11ce23-0004-4001-a023-000000000023','aa11ce23-0001-4001-a023-000000000023','2026-05-28','Staff payroll (6 stylists)','PesaLink','transfer',210000,917000,'debit','completed','kenya',false,null),
  -- 24 Patrick Omondi (SME exporter; USD inflows + FX)
  ('ff11ce24-0001-4001-a024-000000000024','aa11ce24-0002-4002-a024-000000000024','2026-06-03','EU buyer settlement — avocado consignment','Greenyard EU','transfer',38000,60000,'credit','completed','kenya',false,null),
  ('ff11ce24-0002-4001-a024-000000000024','aa11ce24-0001-4001-a024-000000000024','2026-06-02','FX conversion USD→KES','Treasury','transfer',2600000,1400000,'credit','completed','kenya',false,null),
  ('ff11ce24-0003-4001-a024-000000000024','aa11ce24-0001-4001-a024-000000000024','2026-05-29','Freight & cold chain — JKIA','Kenya Airways Cargo','travel',420000,1820000,'debit','completed','kenya',false,null),
  ('ff11ce24-0004-4001-a024-000000000024','aa11ce24-0001-4001-a024-000000000024','2026-05-20','KRA — export levy','KRA','fees',180000,2240000,'debit','completed','kenya',false,null),
  -- 25 Dr. Susan Mwende (HNW; large credits, little spend = idle)
  ('ff11ce25-0001-4001-a025-000000000025','aa11ce25-0001-4001-a025-000000000025','2026-06-01','Consultant salary — Aga Khan Hospital','Aga Khan','salary',950000,3200000,'credit','completed','kenya',false,null),
  ('ff11ce25-0002-4001-a025-000000000025','aa11ce25-0001-4001-a025-000000000025','2026-05-30','Private practice settlement','M-Pesa Paybill','salary',480000,2250000,'credit','completed','kenya',false,null),
  ('ff11ce25-0003-4001-a025-000000000025','aa11ce25-0001-4001-a025-000000000025','2026-05-25','Card spend — Artcaffe','Artcaffe','restaurants',6500,1770000,'debit','completed','kenya',false,null),
  -- 26 James Githinji (HNW; one large sale inflow then idle)
  ('ff11ce26-0001-4001-a026-000000000026','aa11ce26-0001-4001-a026-000000000026','2026-05-12','Proceeds — sale of shareholding','Escrow Advocates LLP','transfer',12000000,12000000,'credit','completed','kenya',false,null),
  ('ff11ce26-0002-4001-a026-000000000026','aa11ce26-0001-4001-a026-000000000026','2026-05-29','Standing order — golf club','Muthaiga GC','entertainment',45000,11955000,'debit','completed','kenya',false,null),
  -- 27 Mercy Akinyi (CHURN — digital experience). is_unusual carries churn keywords.
  ('ff11ce27-0001-4001-a027-000000000027','aa11ce27-0001-4001-a027-000000000027','2026-06-07','Failed app transfer (3 retries)','Mobile App','transfer',0,240000,'debit','failed','kenya',false,'Repeated digital-banking failures and a broken M-Pesa integration; customer comparing us to a neobank.'),
  ('ff11ce27-0002-4001-a027-000000000027','aa11ce27-0001-4001-a027-000000000027','2026-06-01','Salary — Andela','Andela','salary',420000,240000,'credit','completed','kenya',false,null),
  ('ff11ce27-0003-4001-a027-000000000027','aa11ce27-0001-4001-a027-000000000027','2026-05-30','M-Pesa top-up failed, reversed','Safaricom','transfer',15000,160000,'debit','failed','kenya',false,null),
  -- 28 Robert Mwangi (CHURN — service dispute). is_unusual carries churn keywords.
  ('ff11ce28-0001-4001-a028-000000000028','aa11ce28-0001-4001-a028-000000000028','2026-05-22','Disputed double charge — POS','Quickmart','shopping',24000,520000,'debit','completed','kenya',true,'Double-charged at POS; dispute unresolved for three weeks. Customer has lost trust and is threatening to close and move his banking elsewhere.'),
  ('ff11ce28-0002-4001-a028-000000000028','aa11ce28-0001-4001-a028-000000000028','2026-06-02','Salary — Bidco Africa','Bidco','salary',310000,544000,'credit','completed','kenya',false,null),
  ('ff11ce28-0003-4001-a028-000000000028','aa11ce28-0001-4001-a028-000000000028','2026-05-18','Card declined — fuel station','Rubis','transport',0,520000,'debit','failed','kenya',false,null)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- 7. support_tickets  (NONE for the dormant four — dormancy requires it)
--    Subjects for churn cases carry keywords the Retention radar reads.
-- ---------------------------------------------------------------------
insert into support_tickets (id, user_id, subject, status, priority, assigned_to, market, created_at)
values
  ('dd11ce23-7777-4723-a723-000000000023','11ce0023-0023-4023-a023-000000000023','Financing + POS terminals for a third salon branch','open','medium','11ce0003-0003-4003-a003-000000000003','kenya', now() - interval '3 days'),
  ('dd11ce24-7777-4724-a724-000000000024','11ce0024-0024-4024-a024-000000000024','Trade finance + euro FX hedging for EU export orders','open','high','11ce0003-0003-4003-a003-000000000003','kenya', now() - interval '2 days'),
  ('dd11ce25-7777-4725-a725-000000000025','11ce0025-0025-4025-a025-000000000025','Wealth management + offshore diversification for idle cash','open','medium','11ce0003-0003-4003-a003-000000000003','kenya', now() - interval '5 days'),
  ('dd11ce26-7777-4726-a726-000000000026','11ce0026-0026-4026-a026-000000000026','Investment placement + estate planning for sale proceeds','open','high','11ce0003-0003-4003-a003-000000000003','kenya', now() - interval '1 day'),
  ('dd11ce27-7777-4727-a727-000000000027','11ce0027-0027-4027-a027-000000000027','App keeps failing — considering moving my salary to a neobank','open','high','11ce0003-0003-4003-a003-000000000003','kenya', now() - interval '1 day'),
  ('dd11ce28-7777-4728-a728-000000000028','11ce0028-0028-4028-a028-000000000028','Unresolved dispute — I want to close and move my accounts','open','high','11ce0003-0003-4003-a003-000000000003','kenya', now() - interval '2 days')
on conflict (id) do nothing;

insert into support_messages (id, ticket_id, sender_type, sender_id, content, market, created_at)
values
  ('dd11ce23-8888-4823-a823-000000000023','dd11ce23-7777-4723-a723-000000000023','user','11ce0023-0023-4023-a023-000000000023','Glow is doing great and I''ve found a spot in a mall for a third branch. I need help with the fit-out and card terminals for all locations.','kenya', now() - interval '3 days'),
  ('dd11ce24-8888-4824-a824-000000000024','dd11ce24-7777-4724-a724-000000000024','user','11ce0024-0024-4024-a024-000000000024','My EU buyers settle in euros 60 days out and the rate swings hurt me. Can we set up trade finance and a hedge on my next shipment?','kenya', now() - interval '2 days'),
  ('dd11ce25-8888-4825-a825-000000000025','dd11ce25-7777-4725-a725-000000000025','user','11ce0025-0025-4025-a025-000000000025','I have a lot of cash just sitting in my current account. I''d like a proper plan to grow it, including some offshore exposure.','kenya', now() - interval '5 days'),
  ('dd11ce26-8888-4826-a826-000000000026','dd11ce26-7777-4726-a726-000000000026','user','11ce0026-0026-4026-a026-000000000026','I''ve just sold my stake in the company and the proceeds landed last week. I need advice on investing it and on estate planning.','kenya', now() - interval '1 day'),
  ('dd11ce27-8888-4827-a827-000000000027','dd11ce27-7777-4727-a727-000000000027','user','11ce0027-0027-4027-a027-000000000027','Your app has failed three transfers this week and the M-Pesa link is broken. A neobank friend pays instantly — I''m about to move my salary there.','kenya', now() - interval '1 day'),
  ('dd11ce28-8888-4828-a828-000000000028','dd11ce28-7777-4728-a728-000000000028','user','11ce0028-0028-4028-a028-000000000028','It''s been three weeks on my double-charge dispute with no resolution. I''ve lost confidence — I want to close and move my accounts.','kenya', now() - interval '2 days')
on conflict (id) do nothing;

-- A goodwill first response on the two churn cases (sender_type='agent' = the RM).
insert into support_messages (id, ticket_id, sender_type, sender_id, content, market, created_at)
values
  ('dd11ce27-8889-4827-a827-000000000027','dd11ce27-7777-4727-a727-000000000027','agent','11ce0003-0003-4003-a003-000000000003','Mercy, I''m sorry — that''s not the experience we want. I''m escalating the app and M-Pesa issues now and will call you today with a fix and a goodwill gesture.','kenya', now() - interval '18 hours'),
  ('dd11ce28-8889-4828-a828-000000000028','dd11ce28-7777-4728-a728-000000000028','agent','11ce0003-0003-4003-a003-000000000003','Robert, three weeks is far too long. I''m taking ownership of the dispute personally, reversing the duplicate charge today, and will call to rebuild your confidence.','kenya', now() - interval '1 day')
on conflict (id) do nothing;

-- =====================================================================
-- Verify:
--   select count(*) from profiles where assigned_rm_id='11ce0003-0003-4003-a003-000000000003'; -- expect 27
--   select full_name, segment from profiles where id::text like '11ce002%' order by id;
-- =====================================================================
