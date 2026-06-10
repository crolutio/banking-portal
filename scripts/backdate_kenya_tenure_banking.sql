-- =====================================================================
-- Backdate tenure for the Kenya clients (BANKING DB)
-- ---------------------------------------------------------------------
-- The seeds created everyone "today", so the 360 shows "Client since
-- <today>". This backdates origination dates so each client has a realistic
-- length of stay, account age, and loan origination — without touching the
-- (intentionally recent) transaction activity.
--
-- Tenure is chosen to fit each persona's story:
--   - David Kimani joined 2017 → a "nine-year customer" (matches his call).
--   - Samuel Kiprop & John Maina are recent / KYC-pending.
--   - HNW / SME long-standing clients go back the furthest.
--
-- Idempotent: UPDATEs are safe to re-run.
-- =====================================================================

with tenure(cid, joined) as (values
  ('11ce0001-0001-4001-a001-000000000001','2017-04-10'::timestamptz), -- Wanjiru Kamau
  ('11ce0002-0002-4002-a002-000000000002','2015-08-22'::timestamptz), -- Otieno Ouma
  ('11ce0004-0004-4004-a004-000000000004','2016-06-15'::timestamptz), -- Joseph Karanja (SME)
  ('11ce0005-0005-4005-a005-000000000005','2012-02-09'::timestamptz), -- Aisha Mohamed (HNW, long-standing)
  ('11ce0006-0006-4006-a006-000000000006','2017-01-20'::timestamptz), -- David Kimani (≈9 years)
  ('11ce0007-0007-4007-a007-000000000007','2019-09-03'::timestamptz), -- Grace Achieng (diaspora)
  ('11ce0008-0008-4008-a008-000000000008','2018-05-12'::timestamptz), -- Mary Wanjiku
  ('11ce0009-0009-4009-a009-000000000009','2025-02-18'::timestamptz), -- Samuel Kiprop (recent, KYC pending)
  ('11ce0010-0010-4010-a010-000000000010','2020-07-30'::timestamptz), -- Faith Chebet
  ('11ce0011-0011-4011-a011-000000000011','2014-11-05'::timestamptz), -- Daniel Mwangi (HNW)
  ('11ce0012-0012-4012-a012-000000000012','2019-03-25'::timestamptz), -- Esther Nyambura (SME)
  ('11ce0013-0013-4013-a013-000000000013','2021-10-14'::timestamptz), -- Peter Omondi
  ('11ce0014-0014-4014-a014-000000000014','2016-02-19'::timestamptz), -- Lucy Wairimu (HNW)
  ('11ce0015-0015-4015-a015-000000000015','2022-06-08'::timestamptz), -- John Maina (opened, went dormant, KYC pending)
  ('11ce0016-0016-4016-a016-000000000016','2018-09-17'::timestamptz), -- Cynthia Adhiambo (SME)
  ('11ce0017-0017-4017-a017-000000000017','2022-01-11'::timestamptz), -- Brian Mutua (young professional)
  ('11ce0018-0018-4018-a018-000000000018','2023-04-26'::timestamptz)  -- Catherine Njoki (Uber)
)
-- 1. Profile join date → drives "Client since" on the 360.
update profiles p set created_at = t.joined
from tenure t where p.id = t.cid::uuid;

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
-- 2. Customer record (FK target) — keep its origin aligned with the profile.
update customers c set created_at = t.joined
from tenure t where c.id = t.cid::uuid;

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
-- 3. Accounts — opened when the client joined (good enough for the demo;
--    secondary savings/fx wallets share the join date).
update accounts a set created_at = t.joined
from tenure t where a.customer_id = t.cid::uuid;

-- 4. Loans — origination = the (already backdated) disbursement date, so the
--    loan looks like it was taken out years ago, not today.
update loans set created_at = disbursement_date::timestamptz
where customer_id::text like '11ce00%' and disbursement_date is not null;

-- =====================================================================
-- Verify:
--   select full_name, created_at::date as client_since from profiles
--   where assigned_rm_id = '11ce0003-0003-4003-a003-000000000003' order by created_at;
-- =====================================================================
