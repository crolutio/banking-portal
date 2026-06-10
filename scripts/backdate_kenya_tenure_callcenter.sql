-- =====================================================================
-- Backdate tenure for the Kenya clients (CALL CENTER DB)
-- ---------------------------------------------------------------------
-- Aligns each call-center customer's created_at with their banking join date
-- (same tenure as backdate_kenya_tenure_banking.sql). Conversation/message
-- dates are already set per thread and are left untouched.
-- Idempotent.
-- =====================================================================

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
update customers c set created_at = t.joined
from tenure t where c.id = t.cid::uuid;

-- =====================================================================
-- Done (call center tenure).
-- =====================================================================
